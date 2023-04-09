const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setName('say')
    .setDescription('send a simple message')
    .addStringOption(option =>
    option.setName('message').setDescription('send message').setRequired(true)
    ),
    
    async execute(interaction) {
        interaction.reply({ content: interaction.options.getString('message')})
    },
};