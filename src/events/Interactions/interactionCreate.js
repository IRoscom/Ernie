const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { color, role, verified } = require('../../../config.json');
const emoji = require('../../json/emoji.json');

module.exports = async (client, interaction) => {
    if (interaction.isButton()) {
        const embed = new MessageEmbed()
            .setColor(color)
        if (!interaction.member._roles.includes(verified)) return
        if (interaction.customId == 'captcha') {
            const random = Math.floor(Math.random() * emoji.length);
            const row = new MessageActionRow()
                .addComponents(buttons());
            embed.setDescription(`Для прохождения верификации нажмите на емодзи \`${emoji[random].name}\``)
            interaction.reply({ embeds: [embed], ephemeral: true, components: [row] });
            filter = i => i.customId == emoji[random].value && i.user.id == interaction.user.id
            collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });
            collector.on('collect', async i => {
                if (!i.guild.me.permissions.has('MANAGE_ROLES')) return i.update({ embeds: [embed.setDescription('У меня нет прав чтоб выдать вам роль. Обратитесь к администратору.')], components: [] })
                try {
                    if (role) await i.member.roles.add(role);
                    await i.member.roles.remove(verified);
                    i.update({ embeds: [embed.setDescription('Верификация пройдена.')], components: [] })
                } catch(err) {
                    console.error(err)
                    i.update({ embeds: [embed.setDescription('Кажется что-то пошло не так.').setFooter(`Ошибка: ${err.message}`)], components: []})
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