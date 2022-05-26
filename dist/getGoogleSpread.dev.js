"use strict";

var request = require('request');

var _require = require('./config.json'),
    ScriptURL = _require.ScriptURL;

var options = {
  url: ScriptURL,
  method: 'GET',
  json: true
};

var returnTuday = function returnTuday() {
  var date = new Date(Date.now());
  var MyDateForm = date.getFullYear() + '-' + (Number(date.getMonth()) + 1).toString() + '-' + date.getDate();
  return MyDateForm;
};

var returnTomorrow = function returnTomorrow() {
  console.log(Date.now());
  console.log(Date.now() + 1000 * 60 * 60 * 24);
  var date = new Date(Date.now() + 1000 * 60 * 60 * 24);
  var MyDateForm = date.getFullYear() + '-' + (Number(date.getMonth()) + 1).toString() + '-' + date.getDate();
  return MyDateForm;
};

checkToday = function checkToday() {
  var today = new Date(Date.now());

  if (Number(today.getMonth()) + 1 < 10) {
    var strMonth = '0' + (Number(today.getMonth()) + 1).toString();
  } else {
    c;
    var strMonth = (Number(today.getMonth()) + 1).toString();
  }

  if (Number(today.getDate()) - 1 < 10) {
    var strDate = '0' + (Number(today.getDate()) - 1).toString();
  } else {
    var strDate = (Number(today.getDate()) - 1).toString();
  }

  return today.getFullYear() + '-' + strMonth + '-' + strDate;
};

checkTomorrow = function checkTomorrow() {
  var today = new Date(Date.now() + 1000 * 60 * 60 * 24);

  if (Number(today.getMonth()) + 1 < 10) {
    var strMonth = '0' + (Number(today.getMonth()) + 1).toString();
  } else {
    c;
    var strMonth = (Number(today.getMonth()) + 1).toString();
  }

  if (Number(today.getDate() - 1) < 10) {
    var strDate = '0' + (Number(today.getDate()) - 1).toString();
  } else {
    var strDate = (Number(today.getDate()) - 1).toString();
  }

  return today.getFullYear() + '-' + strMonth + '-' + strDate;
};

exports.CheckActivity = function (channel) {
  var Message = "";
  setdate = checkToday();
  request(options, function (error, response, body) {
    body.forEach(function (res) {
      if (res['date']) {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');

        if (setdate === date[0]) {
          // Message.push(returnTuday() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');
          channel.send('日付 : ' + returnTuday() + ',活動開始時間 : ' + res['res'] + ',活動 : ' + res['isres'] + '\n');

          if (res['isres'] == "〇") {
            // Message.push("今日は活動があります！ 活動開始時間は"+res['res']+"時です！");
            channel.send("今日は活動があります！ 活動開始時間は" + res['res'] + "時です！");
          } else {
            // Message.push("今日は活動日ではないです。")
            channel.send("今日の活動はありません。予習復習して、しっかり休んでください。");
          }
        }

        return Message;
      }
    });
  });
};

exports.CheckTomorrowActivity = function (channel) {
  var Message = "";
  setdate = checkTomorrow(); //明日の日付を取得するやつを作る。

  request(options, function (error, response, body) {
    body.forEach(function (res) {
      if (res['date']) {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');

        if (setdate === date[0]) {
          // Message.push(returnTuday() +',活動開始時間 : '+ res['res'] +',活動 : ' + res['isres'] + '\n');
          channel.send('日付 : ' + returnTomorrow() + ',活動開始時間 : ' + res['res'] + ',活動 : ' + res['isres'] + '\n');

          if (res['isres'] == "〇") {
            // Message.push("今日は活動があります！ 活動開始時間は"+res['res']+"時です！");
            channel.send("明日は活動があります！ 活動開始時間は" + res['res'] + "時です！");
          } else {
            // Message.push("今日は活動日ではないです。")
            channel.send("明日の活動はありません。お休みです。");
          }
        }

        return Message;
      }
    });
  });
}; //今日の日付を取得して、その日付の曜日を取得し一週間分の日付をstring型で取得する。


var checkweek = function checkweek() {
  var week = [];
  var today = new Date(Date.now());
  var weekday = ["日", "月", "火", "水", "木", "金", "土"];
  var todayDay = today.getDay();
  console.log(todayDay);

  for (var i = 0; i < 7; i++) {
    day = new Date(Date.now() + 1000 * 60 * 60 * 24 * (i - todayDay));

    if (Number(day.getMonth()) + 1 < 10) {
      var strMonth = '0' + (Number(day.getMonth()) + 1).toString();
    } else {
      c;
      var strMonth = (Number(day.getMonth()) + 1).toString();
    }

    if (Number(day.getDate()) - 1 < 10) {
      var strDate = '0' + (Number(day.getDate()) - 1).toString();
    } else {
      var strDate = (Number(day.getDate()) - 1).toString();
    }

    week[i] = day.getFullYear() + '-' + strMonth + '-' + strDate;
  }

  return week;
};

var returnweek = function returnweek() {
  var week = [];
  var today = new Date(Date.now());
  var weekday = ["日", "月", "火", "水", "木", "金", "土"];
  var todayDay = today.getDay();

  for (var i = 0; i < 7; i++) {
    day = new Date(Date.now() + 1000 * 60 * 60 * 24 * (i - todayDay));
    week[i] = day.getFullYear() + '-' + (Number(day.getMonth()) + 1).toString() + '-' + day.getDate();
  }

  return week;
};

exports.CheckWeekActivity = function (channel) {
  var Message = "";
  var weekday = ["日", "月", "火", "水", "木", "金", "土"];
  var week = returnweek();
  setdate = checkweek();
  request(options, function (error, response, body) {
    body.forEach(function (res) {
      if (res['date']) {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');

        for (var i = 0; i < 7; i++) {
          if (setdate[i] === date[0]) {
            if (res['isres'] == '〇') channel.send('日付 : ' + week[i] + "(".concat(weekday[i], ")") + ', 活動開始時間 : ' + res['res'].padStart(5) + ', 活動 : ' + res['isres']);else channel.send('日付 : ' + week[i] + "(".concat(weekday[i], ")") + ', 活動無し');
          }
        }
      }
    });
  });
};