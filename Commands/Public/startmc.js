const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");




module.exports = {
    data: new SlashCommandBuilder()
    .setName("startmc")
    .setDescription("Starts minecraft server"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {

        var exec = require('child_process').exec;
        exec('"C:\\Users\\mtom69\\Desktop\\mcserver\\start.bat"', function(err, stdout, stderr) {
            if(err) {
                console.log(err);
            } else if(stderr) {
                console.log(stderr)
            } else console.log(stdout);
        })
        //C:\Users\mtom69\Desktop\mc-server(1.18.2)
        

        interaction.reply({content: "server is starting", ephemeral: false});


    }
}