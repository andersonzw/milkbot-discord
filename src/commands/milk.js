

module.exports = {
  name: "milk",
  description: "gokugoku",
  async execute(message, arg) {
    if (message.content === "!milk") {
      if (message.author.id === "390169119439454209") {
         sent = await message.reply("...");
      } else {
         sent = await message.reply("ごくごく！");
      }
      sent;
    }
  },
};
