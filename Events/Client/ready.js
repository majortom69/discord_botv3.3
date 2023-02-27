const { ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

module.exports = {
    name: "ready",
    once: true,
    execute( client ) {
        client.user.setPresence({
            activities: [{ name: `https://downgrad.w3spaces.com/`, type: ActivityType.Watching, status: 'dnd' }],
        });
        loadEvents(client);

        loadCommands(client);
        console.log(`the client is now ready`);
    }
}