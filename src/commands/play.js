const play = require("play-dl");
const {
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
  NoSubscriberBehavior,
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
    try {
      const url = message.content.split(" ")[1];

      let stream = await play.stream(url);
      let resource = createAudioResource(stream.stream, {
        inputType: stream.type,
      });

      let player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });
      player.play(resource);
      connection.subscribe(player);
      message.reply("Now playing your requested song! 動画を流します！");
    } catch (error) {
      message.reply("Invalid URL");
      console.log(error);
    }
  },
};
