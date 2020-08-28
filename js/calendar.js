const dayViewElement = document.querySelector("h1");
const tableElement = document.querySelectorAll("tr");

// NOT WORK WHY?
const calendarID = 'chanvinhong@gmail.com';
const calkey = '';

var now = new Date();
var lastDate = new Date(now.getYear(), now.getMonth() + 1, 0).getDate();
var prevDate = new Date(now.getYear(), now.getMonth(), 0).getDate();
var firstDay = new Date(now.getFullYear(), now.getMonth()).getDay();
var month = now.getMonth();
var today = now.getDate();

let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var x = 7, y = 5;
var cnt = prevDate - firstDay + 1;

function calinfo() {
    var summary;
    var startDate, startDateTime;
    var endDate, endDateTime;
}

let cal = new Array();

if (firstDay < 5) y = 4;

drawCalendar();
getEvent();
// showEvent();

setInterval(check, 1000);

function drawCalendar() {
    dayViewElement.innerHTML = monthArray[now.getMonth()] + " " + today + " " + dayArray[now.getDay()];

    // Previous Month
    for (i = 0; i < firstDay; i++) {
        tableElement[0].innerHTML += "<td><p>" + cnt + "</p></td>";
        cnt++;
    }

    cnt = 1;
    for (i = firstDay; i < x; i++) {
        if (cnt == today) {
            tableElement[0].innerHTML += "<td class='td" + cnt + "'style='background-color: skyblue;'><p>" + cnt + "</p></td>";
        } else {
            tableElement[0].innerHTML += "<td class='td" + cnt + "'><p>" + cnt + "</p></td>";
        }
        cnt++;
    }

    for (i = 0; i < y; i++) {
        for (j = 0; j < x; j++) {
            if (cnt > lastDate) cnt = 1, f = 1; // Next Month
            
            if (cnt == today) {
                tableElement[i + 1].innerHTML += "<td class='td" + cnt + "'style='background-color: skyblue;'><p>" + cnt + "</p></td>";
            } else {
                tableElement[i + 1].innerHTML += "<td class='td" + cnt + "'><p>" + cnt + "</p></td>";
            }
            
            cnt++;
        }
    }
}

function showEvent() {
    for (i = 0; i < cal.length; i++) {
        var dateStart = new Date(cal[i].startDate).getDate();
        var dateTimeStart = new Date(cal[i].startDateTime).getDate();

        var dateEnd = new Date(cal[i].endDate).getDate();
        var dateTimeEnd = new Date(cal[i].endDateTime).getDate();

        if (dateStart > 0) {
            for (j = dateStart; j < dateEnd; j++) {
                const element = document.querySelector(".td" + j);
                element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
            }
        } else {
            for (j = dateTimeStart; j < dateTimeEnd + 1; j++) {
                const element = document.querySelector(".td" + j);
                element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
            }
        }
    }
}

function getEvent() {
    dayViewElement.innerHTML = monthArray[now.getMonth()] + " " + today + " " + dayArray[now.getDay()];
    let URL = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${calkey}`;

    fetch(URL)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            var now = new Date();
            var month = now.getMonth();
            var year = now.getFullYear();
            var cnt = 0;
            for (var i = 0; i < data.items.length; i++) {
                var date = new Date(data.items[i].start.date);
                var dateTime = new Date(data.items[i].start.dateTime);

                if ((dateTime.getMonth() == month && dateTime.getFullYear() == year) || (date.getMonth() == month && date.getFullYear() == year)) { 
                    cal[cnt] = new calinfo();
                    cal[cnt].summary = data.items[i].summary;
                    cal[cnt].startDate = data.items[i].start.date;
                    cal[cnt].startDateTime = data.items[i].start.dateTime;
                    cal[cnt].endDate = data.items[i].end.date;
                    cal[cnt].endDateTime = data.items[i].end.dateTime;
                    cnt++;
                }
            }
        })
        .then(function() {
            showEvent();
        });
}

// refresh when date change
function check() {
    var now = new Date();

    if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0) {
        location.reload(true);
    }
}