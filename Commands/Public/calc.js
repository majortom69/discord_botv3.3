const math = require('mathjs');

const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, But } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("calc")
    .setDescription("roma iz dumb")
    .addStringOption(option =>
        option.setName('equation')
            .setDescription('eq to calc')
            .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
       const equation = interaction.options.getString('equation');
       let result;
       try {
        result = math.evaluate(equation);
        } catch(error) {
        return interaction.reply({ content: 'you fucking dumbass', ephemeral: true });

        }
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Calculator')
            .setDescription(`The result of \`${equation}\` is **${result}**`);
        await interaction.reply({ embeds: [embed] });
    },
};
