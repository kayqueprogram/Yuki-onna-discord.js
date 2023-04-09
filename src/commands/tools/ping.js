const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return my ping!'),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        //`API Latency: ${client.ws.ping}\nClient ping: ${message.createdTimestamp - interaction.createdTimestamp}`

        const iconUser = client.user.displayAvatarURL();
        const tagBot = client.user.tag

        const newMessage = new EmbedBuilder()
            .setTitle('Pong! 🏓')
            .setColor('Random')
            .setThumbnail(iconUser)
            .setTimestamp(Date.now())
            .setFooter({
                text: `${client.user.tag}`
            })
            .addFields(
                {
                name: `API Latency:`,
                value: `${client.ws.ping}ms...`
            }, {
                name: `Client ping:`,
                value: `${message.createdTimestamp - interaction.createdTimestamp}...`
            })

        await interaction.editReply({
            embeds: [newMessage]
        })
        
    }
}