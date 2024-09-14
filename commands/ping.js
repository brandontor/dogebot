const {SlashCommandBuilder, InteractionCollector} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the bots ping'),
    async execute(interaction) {
        const sent = await interaction.reply({content: "Ping!", fetchReply: true})
        interaction.editReply(`Bot latency is: ${sent.createdTimestamp - interaction.createdTimestamp} ms. API Latency: ${Math.round(interaction.client.ws.ping)}ms.`)
    },
}