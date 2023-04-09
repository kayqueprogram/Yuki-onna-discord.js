const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setName('say-embed')
        .setDescription('send a message')
        .addStringOption(option =>
            option.setName('title').setDescription('title message').setRequired(true))
        .addStringOption(option =>
                    option.setName('message')
                        .setDescription('message text')
                        .setRequired(true)
        ),
    

    async execute(interaction) {
        await interaction.deferReply();

        const title = interaction.options.getString('title')
        const message = interaction.options.getString('message')

        const embedMessage = new EmbedBuilder()
            .setTitle(`${title}`)
            .setColor([225, 105, 6])
            .setDescription(`
                *${message}*
                      
            `)


        interaction.editReply({ embeds: [embedMessage] })
    },
};