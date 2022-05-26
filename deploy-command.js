const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types');
const { token } = require('./config.json');

exports.registerCommands = function(clientId, guildId) {
    const commands = [
    new SlashCommandBuilder().setName('cToday').setDescription("今日の予定を確認します。"),
    new SlashCommandBuilder().setName('cTomorrow').setDescription("明日の予定を確認します。"),
    new SlashCommandBuilder().setName('cWeek').setDescription("今週の予定を確認します。")
    ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9'}).setToken(token);
    console.log(clientId,guildId);
    // rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    //     .then(() => console.log('Success registered application commands.'))
    //     .catch(console.error);
}