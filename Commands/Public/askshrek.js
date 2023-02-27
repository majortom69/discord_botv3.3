// 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
//chatGPT bot by major_tom69 2/27/2023
//backend requiered (located at ..\..\..\server\server.js)


const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require('openai');

const coonfiguration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(coonfiguration);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("askshrek")
    .setDescription(`ChatGPT by OpenAI`)
    .addStringOption(option => option.setName('question').setDescription(`question to chatGPT`).setRequired(true))
    .setDMPermission(true),
    async execute (interaction) {

        await interaction.deferReply();

        const question = interaction.options.getString('question');
        
        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 2000,
                temperature: 0.5,

            })

            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle(`${question}`)
            .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)

            
            await interaction.editReply({ embeds: [embed] });
        } catch(e) {
            return await interaction.editReply({ content: `Request failed with status code **${e.response.status}**`, ephemeral: true})
        }
    }


}
