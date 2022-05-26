const request = require('request');
const { ScriptURL } = require('./config.json');

const options={
      url:ScriptURL,
      method:'GET',
      json:true,
}

const returnTuday = function() {
  const date = new Date(Date.now());
  const MyDateForm = date.getFullYear() + '-' + (Number(date.getMonth())+1).toString() + '-' + date.getDate();
  return MyDateForm;
} 

const returnTomorrow = function() {
    console.log(Date.now());
    console.log(Date.now() + 1000*60*60*24);
    const date = new Date(Date.now() + 1000*60*60*24);
    const MyDateForm = date.getFullYear() + '-' + (Number(date.getMonth())+1).toString() + '-' + date.getDate();
    return MyDateForm
}

checkToday = function(){
  var today = new Date(Date.now());
  if(Number(today.getMonth())+1 <10)
  {
    var strMonth = '0' + (Number(today.getMonth())+1).toString()
  }else
  {c
    var strMonth = (Number(today.getMonth())+1).toString()
  }
  if(Number(today.getDate())-1 <10)
  {
    var strDate = '0' + (Number(today.getDate())-1).toString()
  }else
  {
    var strDate = (Number(today.getDate())-1).toString();
  }
  return today.getFullYear() +'-' + strMonth + '-' +strDate;
}

checkTomorrow = function(){
  var today = new Date(Date.now() + 1000*60*60*24);
  if(Number(today.getMonth())+1 <10)
  {
    var strMonth = '0' + (Number(today.getMonth())+1).toString()
  }else
  {c
    var strMonth = (Number(today.getMonth())+1).toString()
  }
  if(Number(today.getDate()-1) <10)
  {
    var strDate = '0' + (Number(today.getDate())-1).toString()
  }else
  {
    var strDate = (Number(today.getDate())-1).toString();
  }
  return today.getFullYear() +'-' + strMonth + '-' +strDate;
}

exports.CheckActivity = function(channel){
  let Message = "";
  setdate = checkToday();
    request(options, function (error, response, body) {
    body.forEach(res => {
      if(res['date'])
      {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');
        if(setdate===date[0])
        {
          // Message.push(returnTuday() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');

          channel.send('日付 : ' + returnTuday() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');
          if(res['isres']=="〇")
          {
            // Message.push("今日は活動があります！ 活動開始時間は"+res['res']+"時です！");
            channel.send("今日は活動があります！ 活動開始時間は"+res['res']+"時です！");
          }else{
            // Message.push("今日は活動日ではないです。")
            channel.send("今日の活動はありません。予習復習して、しっかり休んでください。")
          }
        }
        return Message;
      }
    });
  });
}

exports.CheckTomorrowActivity = function(channel){
    let Message = "";
    setdate = checkTomorrow(); //明日の日付を取得するやつを作る。
    request(options, function (error, response, body) {
    body.forEach(res => {
      if(res['date'])
      {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');
        if(setdate===date[0])
        {
          // Message.push(returnTuday() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');

          channel.send('日付 : ' + returnTomorrow() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');
          if(res['isres']=="〇")
          {
            // Message.push("今日は活動があります！ 活動開始時間は"+res['res']+"時です！");
            channel.send("明日は活動があります！ 活動開始時間は"+res['res']+"時です！");
          }else{
            // Message.push("今日は活動日ではないです。")
            channel.send("明日の活動はありません。お休みです。")
          }
        }
        return Message;
      }
    });
  });
}

//今日の日付を取得して、その日付の曜日を取得し一週間分の日付をstring型で取得する。
const checkweek = function(){
let week = [];
const today = new Date(Date.now());
const weekday = ["日","月","火","水","木","金","土"];
const todayDay = today.getDay();
console.log(todayDay)
for(let i = 0 ; i < 7 ; i++ ){
    day = new Date(Date.now() + 1000*60*60*24*(i-todayDay))
    if(Number(day.getMonth())+1 <10)
    {
        var strMonth = '0' + (Number(day.getMonth())+1).toString()
    }else
    {c
        var strMonth = (Number(day.getMonth())+1).toString()
    }
    if(Number(day.getDate())-1 <10)
    {
        var strDate = '0' + (Number(day.getDate())-1).toString()
    }else
    {
        var strDate = (Number(day.getDate())-1).toString();
    }
    week[i] = day.getFullYear() +'-' + strMonth + '-' +strDate;
}
return week
}
const returnweek = function() {
    let week = [];
    const today = new Date(Date.now());
    const weekday = ["日","月","火","水","木","金","土"];
    const todayDay = today.getDay();
    for(let i = 0 ; i < 7 ; i++ ){
        day = new Date(Date.now() + 1000*60*60*24*(i-todayDay))
        week[i] = day.getFullYear() + '-' + (Number(day.getMonth())+1).toString() + '-' + day.getDate();
    }
    return week
}
exports.CheckWeekActivity = function(channel){
  let Message = "";
  const weekday = ["日","月","火","水","木","金","土"];
  let week = returnweek();
  setdate = checkweek();
    request(options, function (error, response, body) {
    body.forEach(res => {
      if(res['date'])
      {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');
        for(let i = 0; i < 7 ; i++) {
            if(setdate[i]===date[0])
            {
                if(res['isres']=='〇') channel.send('日付 : ' + week[i]+ `(${weekday[i]})` +', 活動開始時間 : '+ res['res'].padStart(5) +', 活動 : ' + res['isres']);
                else channel.send('日付 : ' + week[i]+ `(${weekday[i]})` +', 活動無し');
                
            }
        }
      }
    });
  });
}