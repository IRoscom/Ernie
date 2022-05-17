const { Client, BaseCommandInteraction, MessageEmbed, MessageActionRow } = require('discord.js'),
    Ernie = require('../../tools/Ernie'),
    emoji = require('../../tools/json/emoji.json'),
    { settings } = require('../../../config.json');

/**
 * 
 * @param {Client} client 
 * @param {BaseCommandInteraction} interaction 
 * @returns 
 */

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
    if (interaction.isButton) {
        const embed = new MessageEmbed().setColor(settings.color)
        if (!interaction.member.roles.cache.get(settings.roles.verified)) return
        if (interaction.customId == 'captcha') {
            const random = Math.floor(Math.random() * emoji.length);
            const row = new MessageActionRow().addComponents(new Ernie(client, interaction).buttons())
            embed.setDescription(`Для прохождения верификации нажмите на эмодзи \`${emoji[random].name}\``);
            interaction.reply({ embeds: [embed], ephemeral: true, components: [row] });
            filter = i => i.customId == emoji[random].value && i.user.id == interaction.user.id
            collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });
            collector.on('collect', async i => {
                if (!i.guild.me.permissions.has('MANAGE_ROLES')) return i.update({ embeds: [embed.setDescription('У меня нет прав чтоб выдать вам роль. Обратитесь к администратору.')], components: [] });
                try {
                    if (settings.roles.role) await i.member.roles.add(settings.roles.role);
                    await i.member.roles.remove(settings.roles.verified);
                    i.update({ embeds: [embed.setDescription('Верификация пройдена.')], components: [] });
                } catch (err) {
                    console.error(err);
                    i.update({ embeds: [embed.setDescription('Кажется что-то пошло не так.').setFooter(`Ошибка: ${err.message}`)], components: [] })
                }
            })
        }

        // console.log(interaction)
        // new Ernie(client, interaction).verified();
    }
}