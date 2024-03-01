const {
  createAudioResource,
  createAudioPlayer,
  getVoiceConnection,
  joinVoiceChannel,
} = require("@discordjs/voice");
const { google } = require("googleapis");
const ytdl = require("ytdl-core");
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});
async function searchYouTube(query) {
  const res = await youtube.search.list({
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
  });
  if (res.data.items.length > 0) {
    const videoId = res.data.items[0].id.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    return null;
  }
}
module.exports = {
  name: "youtube",
  description: "searches for a youtube video",
  async execute(message, args) {
    // query for the searched song
    const searchQuery = message.content.replace("!search ", "");
    const url = await searchYouTube(searchQuery);
    // play the song using same logic as !play
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

    const stream = ytdl(url, { filter: "audioonly" });
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    message.reply(`Now playing your requested song! 動画を流します！ \n ${url}`);
  },
};
