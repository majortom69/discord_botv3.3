const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Music system by major_tom69")
        .addSubcommand(subcommand =>
            subcommand.setName("play")
                .setDescription("play a song")
                .addStringOption(option =>
                    option.setName("query")
                        .setDescription("url here:")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("volume")
                .setDescription("set volume")
                .addNumberOption(option =>
                    option.setName("percent")
                        .setDescription("10 = 10%")
                        .setMinValue(1)
                        .setMaxValue(100)
                        .setDescription(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("options")
                .setDescription("set option")
                .addStringOption(option =>
                    option.setName("options")
                        .setDescription("select option")
                        .setDescription(true)
                        .addChoices(
                            {name: "queue", value: "queue"},
                            {name: "skip", value: "queue"},
                            {name: "pause", value: "queue"},
                            {name: "resume", value: "queue"},
                            {name: "stop", value: "queue"},
                        )
                )
        ),
    async execute(interaction) {
        const { options, member, guild, channel} = interaction;

        const subcommand = options.getSubcommand();
        const query = options.getString("query");
        const volume = options.getNumber("percent");
        const option = options.getString
    }
}