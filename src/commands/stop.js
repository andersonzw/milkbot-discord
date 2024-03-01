const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  name: "stop",
  description: "stops the song",
  async execute(message, args) {
    if (message.content === "!stop") {
      const voiceConnection = getVoiceConnection(message.guild.id);
      if (voiceConnection) {
        voiceConnection.destroy(); // This stops any playing audio and disconnects the bot from the voice channel
        message.reply("Stopped playing and left the voice channel.");
      } else {
        message.reply("I am not in a voice channel.");
      }
    }
  },
};
