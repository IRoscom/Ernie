const { guild, channel, color } = require('../../../config.json');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = async (client) => {
    const channelAction = client.guilds.cache.get(guild).channels.cache.get(channel)
    console.log('Запустился')
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
    // channelAction.send({ embeds: [embed], components: [row] })
}