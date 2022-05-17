const { settings } = require('../../config.json'),
    { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js'),
    emoji = require('./json/emoji.json')

class Ernie {
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    constructor(client, interaction) {
        this.client = client
        this.interaction = interaction
    }
    embed() {
        let embed = new MessageEmbed()
            .setDescription('Для прохождения верификации нажмите на кнопку.')
            .setColor(settings.color)
            .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL() }),
            button = new MessageButton()
                .setCustomId('captcha')
                .setStyle('PRIMARY')
                .setLabel('Пройти')
                .setEmoji('🐺'),
            row = new MessageActionRow()
                .addComponents(button)
        return {
            embed: embed,
            row: row
        }
    }

    buttons() {
        let data = [];
        for (const btnData of emoji) {
            let btn = new MessageButton()
                .setStyle('PRIMARY')
                .setEmoji(btnData.emoji)
                .setCustomId(btnData.value)
            data.push(btn);
        }
        return data
    }
}

module.exports = Ernie





