const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setName('ban')
    .setDescription('Bans a user from the server.')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to ban.')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the ban.')
        .setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.';

    const embedBan = new EmbedBuilder()
        .setTitle(`Banned ${member.user.tag}!`)
        .setColor([225, 105, 6])
        .setDescription(`**Reason:**\n*${reason}*`)
        .setTimestamp(Date.now())

    // Executa o ban
    await member.ban({ reason });

    // Envia uma mensagem confirmando o ban
    await interaction.reply({
     embeds: [embedBan]
    });
  },
};