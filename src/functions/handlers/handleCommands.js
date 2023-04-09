const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} (/) has been passed through the handler !`)
            }
        }

        const clientId = `1011747576015507517`;
        const guildId = ``;

        const rest = new REST({ version: '10' }).setToken(process.env.token);

        try {
            console.log(`Starting refreshing  commands of (/) `);

            await rest.put(Routes.applicationCommands(clientId), { body: client.commandArray, });

            console.log(`Succesfully reloaded application commands (/)`);
        } catch (error) {
            console.error(error)
        }
    }
}