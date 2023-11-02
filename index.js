const Discord = require("discord.js")
const dotenv = require("dotenv").config()
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const fs = require("fs")
const { Player } = require("discord-player")

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const LOAD_SLASH = process.argv[2] == "load"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES"
    ]
})

client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of commandFiles){
    const commands = require(`./commands/${file}`)
    client.slashcommands.set(commands.data.name, commands)
    if (LOAD_SLASH) commands.push(commands.data.toJSON())
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const commands = client.slashcommands.get(interaction.commandName)
            if (!commands) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await commands.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(TOKEN)
}
