const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');

// exports.registerCommands = function(clientId, guildId) {
    const commands = [
    new SlashCommandBuilder().setName('ctoday').setDescription("今日の予定を確認します。"),
    new SlashCommandBuilder().setName('ctomorrow').setDescription("明日の予定を確認します。"),
    new SlashCommandBuilder().setName('cweek').setDescription("今週の予定を確認します。"),
    new SlashCommandBuilder().setName('dsrinit').setDescription("通知の送信開始"),
    new SlashCommandBuilder().setName('dsrend').setDescription("通知の送信終了")
    ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9'}).setToken(token);
    console.log(clientId,guildId);
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Success registered application commands.'))
    .catch(console.error);
// }