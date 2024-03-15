const { getVoiceConnection } = require("@discordjs/voice");

// idleTimer.js
let idleTimers = new Map(); // Store timers by guildId

// Start or reset the timer for a specific guild
function startIdleTimer(message) {
  const guildId = message.guildId;
  stopIdleTimer(guildId); // Stop any existing timer

  const timer = setTimeout(() => {
    const connection = getVoiceConnection(guildId);
    console.log("leaving due to inactivity");
    if (connection) connection.destroy(); // Disconnect; // Execute the callback function when the timer ends
    idleTimers.delete(guildId); // Clean up
  }, 3000); // 2 minutes

  idleTimers.set(guildId, timer);
}

// Stop the timer for a specific guild
function stopIdleTimer(message) {
    const guildId = message.guildId
  if (idleTimers.has(guildId)) {
    clearTimeout(idleTimers.get(guildId));
    idleTimers.delete(guildId);
  }
}

module.exports = { startIdleTimer, stopIdleTimer };
