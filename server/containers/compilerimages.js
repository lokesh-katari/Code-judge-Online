const Docker = require("dockerode");

const docker = new Docker({ socketPath: "//./pipe/docker_engine" });
// /var/run/docker.sock
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
      AutoRemove: true,
      Binds: [],
      Mounts: [],
      Volumes: {
        [filePath]: {},
      },
    },
    Cmd: ["sh", "-c", `echo  "\" ${code}\""> ${filePath}   && node apps.js `],
  });
  await container.start();
  const startTime = new Date();
  const logsStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });
  const tle = setTimeout(async () => {
    console.log("Sending a TLE");
    await container.stop();
  }, 2000); // Adjust the time limit as needed

  const containerExitStatus = await container.wait();

  // Record the end time
  const endTime = new Date();

  // Calculate the execution time in milliseconds
  const executionTime = endTime - startTime;
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
  clearTimeout(tle);
  return { output, isError, executionTime };
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
      AutoRemove: true,
      Binds: [],
      Mounts: [],
      Volumes: {
        [filePath]: {},
      },
    },
    Cmd: ["sh", "-c", `echo  ${code} > "${filePath}" && python app.py  `],
  });
  await container.start();
  const startTime = new Date();

  const logsStream = await container.logs({
    follow: true,
    stdout: true,
    stderr: true,
  });

  const tle = setTimeout(async () => {
    console.log("Sending a TLE");
    await container.stop();
  }, 3000); // Adjust the time limit as needed

  const containerExitStatus = await container.wait();

  // Record the end time
  const endTime = new Date();

  // Calculate the execution time in milliseconds
  const executionTime = endTime - startTime;

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
  clearTimeout(tle);
  return { output, isError, executionTime };
};

module.exports = { nodejsCompiler, pythonCompiler };
