const { Client, CommandInteraction } = require('discord.js'),
    Ernie = require('../tools/Ernie');

module.exports = {
    name: 'send',
    description: 'Отправить сообщение для верификации.',
    type: 'CHAT_INPUT',
    options: [
        {
            type: 'CHANNEL',
            name: 'channel',
            description: 'Канал для верификации.',
            channelTypes: ['GUILD_TEXT'],
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async run(client, interaction, args) {
        let embed = new Ernie(client, interaction).embed().embed
        let row = new Ernie(client, interaction).embed().row
        interaction.reply({ content: 'Отправлено', ephemeral: true })
        interaction.options.getChannel('channel').send({ embeds: [embed], components: [row] })
    }
}