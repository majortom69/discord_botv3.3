const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("happyshreksday")
    .setDescription("fuck you"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        setInterval(() =>{
            
            interaction.channel.send("<@543046142309433374> С днем рождения, шрек");

        }, 3000);
        

    }
}