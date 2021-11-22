const { Client, Intents } = require('discord.js')
const { keys } = require('../config.json');
const LoadHandlers = require('./helpers/LoadHandlers');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    ws: {
        properties: { $browser: "Discord iOS" }
    }
});
new LoadHandlers(client).ready()
client.login(keys.token)