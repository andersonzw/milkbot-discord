const crypto = require("crypto");

module.exports = {
  name: "track",
  description: "tracks a website and sends a ping when the site updates",
  async execute(message, arg) {
    const url = message.content.split(" ")[1];

    if (url.toLowerCase() === "stop") {
      clearInterval(checkWebpage);
      return message.reply("Stopping tracking...");
    }

    lastHash = "";
    refreshCount = 0;
    const status = await message.reply(
      `${new Date().toISOString()} Starting Tracking... ${url}`
    );
    async function checkWebpage() {
      refreshCount += 1;
      try {
        const channel = message.channelId;

        const fetch = (await import("node-fetch")).default;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const body = await response.text();

        let currentHash = crypto
          .createHash("sha256")
          .update(body)
          .digest("hex");

        if (lastHash && lastHash !== currentHash) {
          message.reply(`The webpage at ${url} has been updated.!`);
        }
        status.edit(`${new Date().toISOString()} Tracking... Count: ${refreshCount} \n
        ${url} \n
        lastHash = ${lastHash} \n
        currentHash = ${currentHash}
         `);
        lastHash = currentHash;
      } catch (error) {
        console.log(error);
      }
    }
    clearInterval(checkWebpage)
    setInterval(checkWebpage, 300000);
  },
};
