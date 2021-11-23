const { guild, channel, color } = require('../../config.json');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

class sendMessage {
    constructor(client) {
        this.client = client
    }
    send() {
        const channelAction = this.client.guilds.cache.get(guild).channels.cache.get(channel)
        let embed = new MessageEmbed()
            .setTitle('Для прохождения верификации нажмите на кнопку.')
            .setColor(color)
            .setFooter('Ernie'),
            button = new MessageButton()
                .setCustomId('captcha')
                .setStyle('PRIMARY')
                .setLabel('Пройти')
                .setEmoji('🐺'),
            row = new MessageActionRow()
                .addComponents(button)
        return channelAction.send({ embeds: [embed], components: [row] })
    }
}

module.exports = sendMessage