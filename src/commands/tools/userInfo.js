const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Display information about a user')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('Select a user')),

    async execute(interaction, client) {


        //interaction.user é o objeto que representa o usuário que executou o comando
        //interaction.member é o objeto GuildMember, que representa o usuário na guilda específica

        const targetUser = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(targetUser.id);
        const joinedAt = member.joinedAt.toLocaleDateString('pt-BR');
        const createdAt = targetUser.createdAt.toLocaleDateString('pt-BR');
        const targetUserId = targetUser.id;


        const userEmbed = new EmbedBuilder()
                    .setDescription(`**${targetUser}**`)
                    .setColor([225, 105, 6])
                    .addFields(
                        {
                            name: `User information`, 
                            value: `Joined in server at \`${joinedAt}\`\nCreated account : ${createdAt}`
                        }
                        )
                    .setImage(targetUser.displayAvatarURL({ size: 512, format: 'png'}))
        
        await interaction.reply({
            embeds: [userEmbed]
        })
    },
};