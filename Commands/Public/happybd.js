const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("happybd")
    .setDescription("fuck you"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        setInterval(() =>{
            interaction.reply({content: "@<543046142309433374> С днем рождения, шрек", ephemeral: false});

        }, 3000);
        

    }
}