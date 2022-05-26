"use strict";

var _require = require("discord.js"),
    Client = _require.Client,
    Intents = _require.Intents;

var _require2 = require("./config.json"),
    token = _require2.token;

var register = require("./deploy-command.js");

var gGSpread = require("./getGoogleSpread.js");

var client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});
client.once('ready', function (e) {
  console.log('Ready');
});
client.on('messageCreate', function _callee(interaction) {
  var filter, collector;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(interaction.content);
          interaction.channel.send("Hello");

          filter = function filter(m) {
            return m.content.includes('discord');
          };

          collector = interaction.channel.createMessageCollector({
            filter: filter,
            time: 15000
          });
          collector.on('collect', function (m) {
            console.log("Collected ".concat(m.content));
          });
          collector.on('end', function (collected) {
            console.log("Collected ".concat(collected.size, " items"));
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
client.on('interactionCreate', function _callee2(interaction) {
  var commandName;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (interaction.isCommand()) {
            _context2.next = 2;
            break;
          }

          return _context2.abrupt("return");

        case 2:
          commandName = interaction.commandName;

          if (commandName === 'ctoday') {
            interaction.reply("今日の活動予定です。");
            gGSpread.CheckActivity(interaction.channel);
          } else if (commandName === 'ctomorrow') {
            interaction.reply("明日の活動予定です。");
            gGSpread.CheckTomorrowActivity(interaction.channel);
          } else if (commandName === 'cweek') {
            interaction.reply("今週の活動予定です。");
            gGSpread.CheckWeekActivity(interaction.channel);
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
client.login(token);