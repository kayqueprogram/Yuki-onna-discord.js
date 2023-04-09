const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const NewsAPI = require('newsapi');
require('dotenv').config();
const newsapi = new NewsAPI(process.env.news_api_key);

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setName('news')
        .setDescription('Send news about a topic')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('Enter the topic to be sent')
                .setRequired(true))
        .addIntegerOption(option => // Adiciona um parâmetro de número inteiro para o número de notícias a serem retornadas
            option.setName('quantity')
                .setDescription('Set the quantity to be sent (1-5)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        const topic = interaction.options.getString('topic');
        const quantity = interaction.options.getInteger('quantity') || 1; // Define o valor padrão para 1 se o parâmetro não for fornecido ou for inválido
        if (quantity < 1 || quantity > 5) { // Verifica se o valor fornecido está dentro do intervalo válido
            interaction.editReply('You can only set1 - 5');
            return;
        }

        newsapi.v2.everything({
            q: topic,
            language: 'pt',
            sortBy: 'publishedAt'
        }).then(response => {
            const articles = response.articles.slice(0, quantity); // Usa o parâmetro de quantidade para definir o número de notícias a serem retornadas
            if (articles.length === 0) {
                interaction.editReply(`No news about ${topic}.`);
                return;
            }

            const newsEmbeds = articles.map(article => {
                return new EmbedBuilder()
                    .setTitle(`${article.title}`)
                    .setURL(`${article.url}`)
                    .setColor('Red')
                    .setDescription(`${article.description}`)
                    .setImage(`${article.urlToImage}`)
                    .setTimestamp(new Date(article.publishedAt))
                    .setFooter({
                        text: `Author: ${article.author} | Source: ${article.source.name}`
                    });
            });

            interaction.editReply({ embeds: newsEmbeds });

        }).catch(error => {
            console.error(error);
            interaction.editReply('Sorry, an error occurred!');
        });
    },
};
