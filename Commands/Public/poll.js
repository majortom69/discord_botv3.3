const {  SlashCommandBuilder, AttachmentBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { chart } = require('chart.js');




module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('говно, не работает')
        .addStringOption(option => option.setName('option1').setDescription('Option 1').setRequired(true))
        .addStringOption(option => option.setName('option2').setDescription('Option 2').setRequired(true))
        .addStringOption(option => option.setName('option3').setDescription('Option 3'))
        .addStringOption(option => option.setName('option4').setDescription('Option 4')),
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction 
    */
   
    async execute(interaction) {
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3');
        const option4 = interaction.options.getString('option4');

        const options = [option1, option2, option3, option4].filter(Boolean);
        const maxOptions = 4;
        const colors = ['Primary', 'Secondary', 'Success', 'Danger'];

        if (options.length < 2) {
            return interaction.reply('minimum 2 opt.');
        }

        if (options.length > maxOptions) {
            return interaction.reply(`You can provide a maximum of ${maxOptions} options for the poll.`);
        }

        const rows = [];
        const results = new Array(options.length).fill(0);

        for (let i = 0; i < options.length; i++) {
            const button = new ButtonBuilder()
                .setCustomId(i.toString())
                .setLabel(options[i])
                .setStyle(colors[i])
                .setEmoji('👍');

            rows.push(new ActionRowBuilder().addComponents(button));
        }

        const embed = new EmbedBuilder()
            .setTitle('Poll')
            .setDescription('Vote for an option by clicking on the button.')
            .addFields(
                options.map((option, index) => {
                    return { name: option, value: `0 votes (${(0).toFixed(2)}%)`, inline: true };
                })
            )
            .setColor('BLUE');

        const message = await interaction.reply({ embeds: [embed], components: rows });

        const filter = (interaction) => interaction.isButton() && interaction.message.id === message.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', (interaction) => {
            const index = parseInt(interaction.customId);
            results[index]++;

            const totalVotes = results.reduce((acc, cur) => acc + cur, 0);
            const percentages = results.map((count) => ((count / totalVotes) * 100).toFixed(2));

            const fields = options.map((option, index) => {
                const percentage = percentages[index];
                const value = `${results[index]} vote${results[index] !== 1 ? 's' : ''} (${percentage}%)`;
                return { name: option, value, inline: true };
            });

            const chartData = {
                type: 'bar',
                data: {
                    labels: options,
                    datasets: [
                        {
                            label: 'Votes',
                            data: results,
                            backgroundColor: colors.slice(0, options.length),
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },
                },
            };

            const chartImage = chart.buildChartImage(chartData);
            const attachment = new AttachmentBuilder(chartImage, 'chart.png');

            embed.fields = fields;
            embed.setImage('attachment://chart.png');

            interaction.editReply({ embeds: [embed], files: [attachment] });
        });

        collector.on('end', () => {
            const totalVotes = results.reduce((acc, cur) => acc + cur, 0);
            const percentages = results.map((count) => ((count / totalVotes) * 100).toFixed(2));

            const fields = options.map((option, index) => {
                const percentage = percentages[index];
                const value = `${results[index]} vote${results[index] !== 1 ? 's' : ''} (${percentage}%)`;
                return { name: option, value, inline: true };
            });

            const chartData = {
                type: 'bar',
                data: {
                    labels: options,
                    datasets: [
                        {
                            label: 'Votes',
                            data: results,
                            backgroundColor: colors.slice(0, options.length),
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                            },
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },
                },
            };

            const chartImage = chart.buildChartImage(chartData);
            const attachment = new AttachmentBuilder(chartImage, 'chart.png');

            embed.fields = fields;
            embed.setImage('attachment://chart.png');

            interaction.editReply({ embeds: [embed], files: [attachment] });
        });
    },
};
                