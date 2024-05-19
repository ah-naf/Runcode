const { spawn } = require("child_process");
const path = require("path");

const executeCpp = (filePath, userInput = "") => {
  return new Promise((resolve, reject) => {
    const outPath = path.join(path.dirname(filePath), "a.out");

    const compileProcess = spawn("g++", [filePath, "-o", outPath]);

    let compileError = "";

    compileProcess.on("error", (error) => {
      reject({ type: "Compilation Error", message: error.message });
    });

    compileProcess.stderr.on("data", (data) => {
      compileError += data.toString();
    });

    compileProcess.on("close", (code) => {
      if (code !== 0) {
        reject({
          type: "Compilation Error",
          message: `Compilation Failed:\n${compileError}`,
        });
        return;
      }

      const executeProcess = spawn(outPath);

      executeProcess.stdin.write(userInput);
      executeProcess.stdin.end();

      let output = "",
        runtimeError = "";

      executeProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      executeProcess.stderr.on("data", (data) => {
        runtimeError += data.toString();
      });

      executeProcess.on("error", (error) => {
        reject({ type: "Runtime Error", message: error.message });
      });

      executeProcess.on("close", (code) => {
        if (code !== 0) {
          reject({
            type: "Runtime Error",
            message: `Execution Failed:\n${
              runtimeError || "Unknown runtime error"
            }`,
          });
          return;
        }
        resolve(output);
      });
    });
  });
};

module.exports = { executeCpp };
