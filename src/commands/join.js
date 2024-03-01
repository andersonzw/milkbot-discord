const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  name: "join",
  description: "Joins a voice channel.",
  async execute(message, args) {
    if (message.member.voice.channel) {
      connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      message.reply(
        "I have successfully joined the voice channel! お邪魔します！"
      );
    } else {
      message.reply(
        "You need to join a voice channel first! 先にボイスチャネルに入ってください！"
      );
    }
  },
};
