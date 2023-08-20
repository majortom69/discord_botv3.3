
const { SlashCommandBuilder, ChatInputCommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle } = require("discord.js"); 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll.")
    .setDMPermission (false)
    .addStringOption (options => options
        .setName("question")
        .setDescription("Provide the question of the poll.")
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        
        const pollQuestion = interaction.options.getString("question");
        const pollEmbed = new EmbedBuilder()
        .setDescription("**Question:**\n" + pollQuestion)
        .setImage("https://i.ibb.co/vxdBKFd/Untitled-1.gif")
        .addFields([
            {name: "Yes's", value: "0", inline: true}, 
            {name: "No's", value: "0", inline: true}
        ])
        .setColor([104, 204, 156]);

        const replyObject = await interaction.reply ({embeds: [pollEmbed], fetchReply: true});
        const pollButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Yes")
            .setCustomId(`Poll-Yes-${replyObject.id}`)
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setLabel("No")
            .setCustomId(`Poll-No-${replyObject.id}`)
            .setStyle(ButtonStyle.Danger)
        )
        
        interaction.editReply({components: [pollButtons]});
        
    }
}

function generateRatioBar(yesCount, noCount) {
    const totalVotes = yesCount + noCount;
    const totalEmojis = 20;
    const yesEmojis = Math.round((yesCount / totalVotes) * totalEmojis);
    const noEmojis = totalEmojis - yesEmojis;

    const ratioBar = ":green_square:".repeat(yesEmojis) + ":red_square:".repeat(noEmojis);
    return ratioBar;
}