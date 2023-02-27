// reload commands by major_tom69 2/20/2023

const { 
    ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    Client } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("reload commands/events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
    .setName("events")
    .setDescription("Reload your events"))
    .addSubcommand((options) => options
    .setName("commands")
    .setDescription("Reload your commands")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch(subCommand) {
            case "commands" : {
                for( const [key, value] of client.commands)
                client.removeListener(`${key}`, value, true);
                loadCommands(client);
                interaction.reply({components: "Reloaded Commands", ephemeral: true});
            }
            break;
            case "events" : {
                for( const [key, value] of client.events)
                client.removeListener(`${key}`, value, true);
                loadEvents(client);
                interaction.reply({content: "Reloaded Events", ephemeral: true});

            }
            break;
            
        }

    }
}
