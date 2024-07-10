const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const TOKEN = 'DEIN_DISCORD_BOT_TOKEN';
const CLIENT_ID = 'DEINE_CLIENT_ID';
const GUILD_ID = 'DEINE_GUILD_ID';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
        name: 'hello',
        description: 'Replies with Hello!',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`Eingeloggt als ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'hello') {
        await interaction.reply('Hello!');
    }
});

client.login(TOKEN);
