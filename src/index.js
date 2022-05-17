const { keys } = require('../config.json'),
    { Client, Collection } = require('discord.js'),
    LoadHandlers = require('./tools/LoadHandlers'),
    client = new Client({
        intents: 32767,
        ws: {
            properties: { $browser: "Discord iOS" }
        }
    })

client.commands = new Collection();
new LoadHandlers(client).ready();

client.login(keys.token);