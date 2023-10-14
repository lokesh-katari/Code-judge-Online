module.exports = {
  apps: [
    {
      name: "client",
      script: "client/npm start",
    },
    {
      name: "server",
      script: "server/server.js",
    },
    {
      name: "consumer",
      script: "server/Utils/Consumer.js",
    },
    {
      name: "submitConsumer",
      script: "server/Utils/submitConsumer.js",
    },
  ],
};
