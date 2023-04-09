const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setName('clear')
        .setDescription('Delete up to 122 messages')
        .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to be deleted')),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if(amount < 1 || amount > 122) {
            return interaction.reply({ content: 'You need to enter a number between 1 and 122', ephemeral: true});
        }

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'An error occurred while trying to remove messages in this channel!', ephemeral: true });

        }) 
        return interaction.reply({ content: `\` ${amount} \` messages removed successfully!`, ephemeral: true });
    },
};