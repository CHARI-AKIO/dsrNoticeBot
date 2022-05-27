const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const register = require("./deploy-command.js");
const gGSpread = require("./getGoogleSpread.js");
const schedule = require("node-schedule");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let uniqueJobName = "specificURL";
let isSheduling = true

client.once('ready', e => {
    console.log('Ready');
});

client.on('interactionCreate', async interaction =>{

    if(!interaction.isCommand()) return;

    const{ commandName } = interaction;

    if(commandName === 'ctoday')
    {
        interaction.reply("今日の活動予定です。");
        gGSpread.CheckActivity(interaction.channel);
    }else if(commandName === 'ctomorrow')
    {
        interaction.reply("明日の活動予定です。");
        gGSpread.CheckTomorrowActivity(interaction.channel);
    }else if(commandName === 'cweek')
    {
        interaction.reply("今週の活動予定です。");
        gGSpread.CheckWeekActivity(interaction.channel);
    }else if(commandName === 'dsrinit')
    {
        interaction.reply("通知の送信を開始します。");
        isSheduling = true
        // Shedule job according to timed according to cron expression
        var job = schedule.scheduleJob(uniqueJobName,'* * 4,20 * * *', function(){
            if (!isSheduling) {
                console.log("Shedule will Stop!")
                let current_job = schedule.scheduledJobs[uniqueJobName];
                current_job.cancel();
                return;
            }else{
                gGSpread.CheckActivity(interaction.channel);
            }
        });
    }else if(commandName === 'dsrend')
    {
        interaction.reply("通知を停止します。");
        isSheduling = false;
    }
})

client.login(token);