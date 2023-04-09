const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Display server information'),

    async execute(interaction, client) {

        const serverCreatedAt = interaction.guild.createdAt;
        const serverCreatedAtFormatted = new Intl.DateTimeFormat('pt-BR').format(serverCreatedAt);

        /*
        guild.fetchInvites().then((invites) => {
        const invite = invites.first();
        }).catch((err) => console.error(err))*/
        const iconServer = interaction.guild.iconURL({ size: 512, format: "png" });
        const guild = interaction.guild;
        
        /*const inviteURL = await guild.invites.create({ maxAge: 0, maxUses: 1 }).then(invites => invites[0]?.url);*/

        const onlineMembers = guild.members.cache.filter(member => member.presence?.status === 'online');
        const onlineMembersCount = onlineMembers.size;
        const idleMembers = guild.members.cache.filter(member => member.presence?.status === 'idle');
        const idleMembersCount = idleMembers.size;
        const dndMembers = guild.members.cache.filter(member => member.presence?.status === 'dnd');
        const dndMembersCount = dndMembers.size;
        const membersActived = onlineMembersCount + idleMembersCount + dndMembersCount;
        console.log(membersActived)
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} (${interaction.guild.id}) information`)
            .setColor([225, 105, 6])
            .addFields(
                {
                    name: 'Server owner',
                    value: `<@${interaction.guild.ownerId}>`
                },
                {
                    name: 'Server description',
                    value: `\n*${interaction.guild.description?.length >= 0 ? interaction.guild.description: 'This server does not have a description'}*`
                },
                {
                    name: 'Creation date',
                    value: `\`${serverCreatedAtFormatted}\``
                },
                {
                    name: '**Members / Online**',
                    value: `${interaction.guild.memberCount} | ${membersActived}`
                },
                {
                    name: 'Region',
                    value: `${interaction.guild.region >= 0 ? interaction.guild.region: 'Not defined'}`
                },

            )

            /* .setURL(inviteURL)*/
            .setThumbnail(iconServer)

        await interaction.reply({ embeds: [embed] })
    }
}