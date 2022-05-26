"use strict";

var request = require('request');

var _require = require('./config.json'),
    ScriptURL = _require.ScriptURL;

var options = {
  url: ScriptURL,
  method: 'GET',
  json: true
};

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
  console.log(todayDay);

  for (var i = 0; i < 7; i++) {
    day = new Date(Date.now() + 1000 * 60 * 60 * 24 * (i - todayDay));
    week[i] = day.getFullYear() + '-' + (Number(day.getMonth()) + 1).toString() + '-' + day.getDate();
  }

  return week;
};

exports.CheckActivity = function (channel) {
  var Message = "";
  var week = returnweek();
  setdate = checkweek();
  request(options, function (error, response, body) {
    body.forEach(function (res) {
      if (res['date']) {
        var rawDate = res['date'];
        var date = rawDate.match('[0-9]{4}-[0-9]{2}-[0-9]{2}');

        for (var i = 0; i < 7; i++) {
          if (setdate[i] === date[0]) {
            channel.send('日付 : ' + week[i] + ',活動開始時間 : ' + res['res'].padStart(5) + ',活動 : ' + res['isres']);
          }
        }
      }
    });
  });
};