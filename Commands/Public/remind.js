const { SlashCommandBuilder, Permissions, ChatInputCommandInteraction, } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder for a specified time')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('Time until the reminder (e.g. 5h30m)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message for the reminder')
        .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
  async execute(interaction) {
    // Check if user has permission to ping roles/members
    

    // Get the time and message options
    const timeOption = interaction.options.getString('time');
    const messageOption = interaction.options.getString('message');

    // Calculate the time until the reminder
    const timeUntilReminder = ms(timeOption);
    if (!timeUntilReminder || timeUntilReminder < 1000) {
      return interaction.reply({ content: 'Invalid time format. Please use the format: XhYm (e.g. 5h30m).', ephemeral: true });
    }

    // Set a timeout to send the reminder message
    setTimeout(() => {
      interaction.reply({ content: `${interaction.user}, ${messageOption}` });
    }, timeUntilReminder);
    
    await interaction.reply({ content: `Reminder set for ${timeOption}.`, ephemeral: true });
  },
};
