const Docker = require("dockerode");

const docker = new Docker({ socketPath: "//./pipe/docker_engine" });

const nodejsCompiler = async (code) => {
  console.log("this is compiler code", code);
  let output = "";
  let isError = false;
  const filePath = "/apps.js";
  // const encodedCode = btoa(code);
  // let newCode = `${code}`;

  const container = await docker.createContainer({
    Image: "node:latest",
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: true,
    StdinOnce: false,
    HostConfig: {
      // AutoRemove: true,
      Binds: [],
      Mounts: [],
      Volumes: {
        [filePath]: {},
      },
    },
    Cmd: ["sh", "-c", `echo  "\" ${code}\""> ${filePath}   && node apps.js `],
  });

  await container.start();
  const logsStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  logsStream.on("data", (chunk) => {
    const chunkString = chunk.toString();
    output += chunkString;

    // Check if the output contains any error indicators
    if (
      chunkString.toLowerCase().includes("error") ||
      chunkString.toLowerCase().includes("exception")
    ) {
      isError = true;
    }
  });

  // Capture the final output when the stream ends
  await new Promise((resolve) => {
    logsStream.on("end", resolve);
  });
  return { output, isError };
};
const pythonCompiler = async (code) => {
  let output = "";
  let isError = false;
  const filePath = "/app.py";
  const container = await docker.createContainer({
    Image: "python",
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    OpenStdin: true,
    StdinOnce: false,
    HostConfig: {
      // AutoRemove: true,
      Binds: [],
      Mounts: [],
      Volumes: {
        [filePath]: {},
      },
    },
    Cmd: ["sh", "-c", `echo  ${code} > "${filePath}" && python app.py  `],
  });

  await container.start();
  const logsStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  logsStream.on("data", (chunk) => {
    const chunkString = chunk.toString();
    output += chunkString;

    // Check if the output contains any error indicators
    if (
      chunkString.toLowerCase().includes("error") ||
      chunkString.toLowerCase().includes("exception")
    ) {
      isError = true;
    }
  });

  // Capture the final output when the stream ends
  await new Promise((resolve) => {
    logsStream.on("end", resolve);
  });
  return { output, isError };
};

module.exports = { nodejsCompiler, pythonCompiler };
