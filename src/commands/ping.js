module.exports = {
  name: "ping",
  description: "sends a ping request",
  async execute(message, args) {
    const sent = await message.reply("Pong!");
    sent.edit(
      `Pong! Round-trip latency: ${
        sent.createdTimestamp - message.createdTimestamp
      }ms`
    );
  },
};
