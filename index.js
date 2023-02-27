const { Client, GatewayIntentBits, Partials, Collection, ActivityType } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const {DisTube} = require("distube");
const {SpotifyPlugin} = require("@distube/spotify");

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates], 
    partials: [User, Message, GuildMember, ThreadMember] });

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);
module.exports = client;

client.login(client.config.token)