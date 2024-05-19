const { spawn } = require("child_process");

const executePy = (filePath, userInput = "") => {
  return new Promise((resolve, reject) => {
    const execute = spawn("python3", [filePath]);

    execute.stdin.write(userInput);
    execute.stdin.end();

    let output = "",
      errorOutput = "";

    execute.stdout.on("data", (data) => {
      output += data.toString();
    });

    execute.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    execute.on("error", (err) => {
      reject({ type: "runtime_error", message: err.message });
    });

    execute.on("close", (code) => {
      if (code !== 0) {
        reject({
          type: "runtime_error",
          message: `Execution failed:\n${errorOutput || "Unknown runtime error"}`,
        });
      } else {
        resolve(output);
      }
    });
  });
};

module.exports = { executePy };
