const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");


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
                .addIntegerOption(option =>
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
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;

        const subcommand = options.getSubcommand();
        const query = options.getString("query");
        const volume = options.getInteger("percent");
        const option = options.getString('options');
        const voiceChannel = member.voice.channel;
        
        const embed = new EmbedBuilder();

        if(!voiceChannel) {
            embed.setColor("Red").setDescription("join vc dumbas");
            return interaction.reply({ embed: [embed], ephemeral: true});
        }

        if(!member.voice.channelId == guild.members.me.voice.channelId) {
            embed.setColor("Red").setDescription(`Bot alredy in <#${guild.members.me.voice.channelId}>, you dumbass`);
            return interaction.reply({ embed: [embed], ephemeral: true});
        }

        try {
            switch (subcommand) {
                case "play":
                    client.distube.play(voiceChannel, query, {textChannel: channel, member: member });
                    return interaction.reply({ content: "request_recieved"});
                case "volume":
                    client.distube.setVolume({voiceChannel, volume });
                    return interaction.reply({ content: `volume set to ${volume}%`});
                case "settings":
                    const queue = await client.distube.getQueue(voiceChannel);

                    if(!queue){
                        embed.setColor("Red").setDescription("No queue dumbass");
                        return interaction.reply({ embed: [embed], ephemeral: true});
                    }

                    switch(option) {
                        case "skip":
                            await queue.skip(voiceChannel);
                            embed.setColor("Blue").setDescription("song has been skipped");
                            return interaction.reply({ embed: [embed], ephemeral: true});
                        case "stop":
                            await queue.stop(voiceChannel);
                            embed.setColor("Red").setDescription("song has been stopped");
                            return interaction.reply({ embed: [embed], ephemeral: true});
                        case "pause":
                            await queue.pause(voiceChannel);
                            embed.setColor("Orange").setDescription("song has been paused");
                            return interaction.reply({ embed: [embed], ephemeral: true});
                         case "resumed":
                            await queue.pause(voiceChannel);
                            embed.setColor("Green").setDescription("song has been paused");
                            return interaction.reply({ embed: [embed], ephemeral: true});
                        case "queue":
                            embed.setColor("Purple").setDescription(`${queue.songs.map(
                                (song, id) => `\n**${id +1}.** ${song.name} -\`${song.formattedDuration}\``
                            )}`);

                            return interaction.reply({ embed: [embed], ephemeral: true});
                    }
            }

        } catch(err) {
            console.log(err);

            embed.setColor("Red").setDescription("Stop breaking bot, you fucking dumbass");

            return interaction.reply({ embed: [embed], ephemeral: true});
        }
    }
}
//надо кагда гошан говорит насвай надо ему разговор подеживат есть жи мигана мигана
//
