const ytdl = require("ytdl-core");
const {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
  
} = require("@discordjs/voice");

module.exports = {
  name: "play",
  description: "plays a linked url",
  async execute(message, args) {
    const voiceConnection = getVoiceConnection(message.guild.id);
    // join channel if not in one yet
    if (!voiceConnection) {
      // If member is in a vc, join that vc
      if (message.member.voice.channel) {
        connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
        });
      } else {
        message.reply(
          "You need to join a voice channel first! 先にボイスチャネルに入ってください！"
        );
        return;
      }
    }
    const url = message.content.split(" ")[1];
    if (ytdl.validateURL(url)) {
      const stream = ytdl(url, { filter: "audioonly" });
      const resource = createAudioResource(stream);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      message.reply("Now playing your requested song! 動画を流します！");
    } else {
      message.reply("Please provide a valid YouTube URL. リンクが違います！");
    }
  },
};
