const dayViewElement = document.querySelector("h1");
const tableElement = document.querySelectorAll("tr");

const calendarID = 'chanvinhong@gmail.com';
const calkey = '';

var now = new Date();
var lastDate = new Date(now.getYear(), now.getMonth() + 1, 0).getDate();
var prevDate = new Date(now.getYear(), now.getMonth(), 0).getDate();
var firstDay = new Date(now.getFullYear(), now.getMonth()).getDay();
var month = now.getMonth();
var today = now.getDate();

let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            if (cnt > lastDate) cnt = 1; // Next Month
            
            if (cnt == today) {
                tableElement[i + 1].innerHTML += "<td class='td" + cnt + "'style='background-color: skyblue;'><p>" + cnt + "</p></td>";
            } else {
                tableElement[i + 1].innerHTML += "<td class='td" + cnt + "'><p>" + cnt + "</p></td>";
            }
            cnt++;
        }
    }
}

function sortEventbyLength() {
    var temp;
    var arr = new Array();

    for (j = 0; j < cal.length; j++) {
        var year = new Date(cal[j].startDate).getFullYear();
        if (year != 1970) {
            arr[j] = new Date(cal[j].endDate).getDate() - new Date(cal[j].startDate).getDate();
        } else {
            arr[j] = new Date(cal[j].endDateTime).getDate() - new Date(cal[j].startDateTime).getDate() + 1;
        }
    }
    
    for (i = 0; i < cal.length - 1; i++) {
        for (j = 0; j < cal.length - i - 1; j++) {
            // var year = new Date(cal[j].startDate).getFullYear();
            if (arr[j] < arr[j + 1]) {
                // summary = arr[j];
                // arr[j] = arr[j + 1];
                // arr[j + 1] = summary;
                // temp = cal[j].summary;
                // cal[j].summary = cal[j + 1].summary;
                // cal[j + 1] = temp;

                // if (year != 1970) {
                //     startDate = cal[j].startDate;
                //     cal[j].startDate = cal[j + 1].startDate;
                //     cal[j + 1].startDate = startDate;

                //     endDate = cal[j].endDate;
                //     cal[j].endDate = cal[j + 1].endDate;
                //     cal[j + 1].endDate = endDate;
                // } else {
                //     startDateTime = cal[j].startDateTime;
                //     cal[j].startDateTime = cal[j + 1].startDateTime;
                //     cal[j + 1].startDateTime = startDateTime;

                //     endDateTime = cal[j].endDateTime;
                //     cal[j].endDateTime = cal[j + 1].endDateTime;
                //     cal[j + 1].endDateTime = endDateTime;
                // }
            }
        }
    }
}

function showEvent() {
    for (i = 0; i < cal.length; i++) {
        var dateStart = new Date(cal[i].startDate).getDate();
        var dateTimeStart = new Date(cal[i].startDateTime).getDate();

        var dateEnd = new Date(cal[i].endDate).getDate();
        var dateTimeEnd = new Date(cal[i].endDateTime).getDate();

        var dateYear = new Date(cal[i].startDate).getFullYear();
        // var dateTimeYear = new Date(cal[i].startDateTime).getFullYear();
        
        if (dateYear != 1970) {
            const element = document.querySelector(".td" + dateStart);
            element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
            for (j = dateStart + 1; j < dateEnd; j++) {
                const element = document.querySelector(".td" + j);
                // element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
                element.innerHTML += "<p class='summary'>" + " " + "</p>";
            }
        } else {
            const element = document.querySelector(".td" + dateTimeStart);
            element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
            for (j = dateTimeStart+ 1; j < dateTimeEnd + 1; j++) {
                const element = document.querySelector(".td" + j);
                // element.innerHTML += "<p class='summary'>" + cal[i].summary + "</p>";
                element.innerHTML += "<p class='summary'>" + " " + "</p>";
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

                    if (data.items[i].start.date) {
                        cal[cnt].startDate = data.items[i].start.date;
                        cal[cnt].endDate = data.items[i].end.date;
                        cal[cnt].startDateTime = 0;
                        cal[cnt].endDateTime = 0;
                    } else {
                        cal[cnt].startDateTime = data.items[i].start.dateTime;
                        cal[cnt].endDateTime = data.items[i].end.dateTime;
                        cal[cnt].startDate = 0;
                        cal[cnt].endDate = 0;
                    }
                    cnt++;
                }
            }
        })
        .then(function() {
            // sortEventbyLength();
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
