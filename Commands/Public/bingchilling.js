const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bingchilling")
    .setDescription("ICE CREAM"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        interaction.reply({content: "https://tenor.com/view/bing-gif-25601964", ephemeral: false});

    }
}