const { REST, Routes } = require('discord.js')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const token = process.env.TOKEN
const clientId = process.env.CLIENTID
const guildId = process.env.GUILDID

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started Refreshing application (/) commands')
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        )

        console.log("Successfully reloaded application (/) commands")
    } catch (e) {
        console.log("Error", error)
    }
})()
