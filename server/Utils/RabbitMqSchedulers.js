const amqp = require("amqplib");

const rabbitMqScheduler = async (language, code) => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  try {
    const queue = "codeCompile";
    let message = {
      language: language,
      code: code,
    };
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    channel.prefetch(1);
    channel.consume(queue, (msg) => {
      let message = msg.content.toString();
      console.log(message);
    });
  } catch (error) {
    console.log(error);
  }
  try {
  } catch (error) {
    console.log(error, "rabbit mq connection in queue");
  }
};
rabbitMqScheduler("lokesh1234", "lokesh");
