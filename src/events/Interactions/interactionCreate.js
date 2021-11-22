const { MessageEmbed, MessageButton, MessageActionRow, Guild } = require('discord.js');
const { color, role, verified } = require('../../../config.json');
const emoji = require('../../json/emoji.json');
const random = Math.floor(Math.random() * emoji.length);

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        // console.log(interaction.guild)
        const embed = new MessageEmbed()
            .setColor(color)
        if (interaction.customId == 'captcha') {
            const row = new MessageActionRow()
                .addComponents(buttons());
            embed.setDescription(`Для прохождения верификации нажмите на емодзи \`${emoji[random].name}\``)
            interaction.reply({ embeds: [embed], ephemeral: true, components: [row] });
            collector = interaction.channel.createMessageComponentCollector({ max: 1 });
            collector.on('collect', async i => {
                if (i.customId == emoji[random].value) {
                    if (!i.guild.me.permissions.has('MANAGE_ROLES')) return i.update({ embeds: [embed.setDescription('У меня нет прав чтоб выдать вам роль. Обратитесь к администратору.')], components: [] })
                    await i.member.roles.add(role);
                    await i.member.roles.remove(verified);
                    i.update({ embeds: [embed.setDescription('Верификация пройдена.')], components: [] })
                } else {
                    i.update({ embeds: [embed.setDescription('Верификация не пройдена.')], components: [] })
                }
            })
        }
    }
}

function buttons() {
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