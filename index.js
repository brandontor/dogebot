const { error } = require('console')
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const token = process.env.TOKEN

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

client.once('ready', () => {
    console.log('Bot is online')
})

//If the interaction is not a command - do nothing

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (e) {
        console.log("There was an error", e)
        await interaction.reply({ content: `There was an error ${e.message}`, ephemeral: true })
    }
})

client.login(token)
