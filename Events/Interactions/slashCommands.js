// Slash commands by major_tom69 2/19/2023


const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, client) {

        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "This commands is outdated.",
            ephemeral: true
        });

        if(command.developer && interaction.user.id !== "402031823519088640")
        return interaction.reply({
            content: "This commands is only avalible to major_tom69", 
            ephemeral: true
        });

        command.execute(interaction, client);

    }
}