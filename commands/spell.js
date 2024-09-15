const { SlashCommandBuilder, InteractionCollector } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('dnd-spell')
        .setDescription('Use this command to lookup a dnd spell')
        .addStringOption(option =>
            option.setName('spell-name')
                .setDescription('The name of the spell')
                .setRequired(true)),
    async execute(interaction) {
        const spellName = interaction.options.getString('spell-name')

        const formattedSpellName = spellName.toLowerCase().replace(/\s+/g, '-');

        const response = await fetch(`https://www.dnd5eapi.co/api/spells/${formattedSpellName}`, {
            method: 'GET',
        })
        const data = await response.json()

        const sent = await interaction.reply({ content: "Ping!", fetchReply: true })
        interaction.editReply(`Bot latency is: ${sent.createdTimestamp - interaction.createdTimestamp} ms. API Latency: ${Math.round(interaction.client.ws.ping)}ms.`)
    },
}
