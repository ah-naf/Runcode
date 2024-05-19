const { spawn } = require("child_process");
const path = require("path");

const executeJava = (filePath, userInput) => {
  return new Promise((resolve, reject) => {
    const compileProcess = spawn("javac", [filePath]);
    const pathParts = filePath.split("/");
    const fileNameWithExtension = pathParts[pathParts.length - 1];
    const fileNameParts = fileNameWithExtension.split(".");
    const mainPart = fileNameParts[0];

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

      const executeDirectory = path.dirname(filePath);
      const executeProcess = spawn(
        "java",
        ["-cp", executeDirectory, mainPart],
        {
          cwd: executeDirectory,
        },
      );

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
            message: `Execution Failed:\n${runtimeError || "Unknown runtime error"}`,
          });
          return;
        }
        resolve(output);
      });
    });
  });
};

module.exports = { executeJava };
