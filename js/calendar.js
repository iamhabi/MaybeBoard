const dayViewElement = document.querySelector("h1");
const trElement = document.querySelectorAll("tr");

// Google Calendar ID
const calendarID = 'chanvinhong@gmail.com';
// Google API key
const calkey = 'AIzaSyAEOID_7LigNY-A55laTyFmelJYqaEwFk4';

var now = new Date();
var lastDate = new Date(now.getYear(), now.getMonth() + 1, 0).getDate();   // this month last date
var prevDate = new Date(now.getYear(), now.getMonth(), 0).getDate();       // last month last date
var firstDay = new Date(now.getFullYear(), now.getMonth()).getDay();       // this month first day

var month = now.getMonth();
var today = now.getDate();

let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var x = 7, y = 5;  // x: week y: Column

var cnt = prevDate - firstDay + 1; // date count

let cal = new Array();   // this month calendar event array
function calinfo() {     // Calendar Info
    var summary;
    var startDate, startDateTime;
    var endDate, endDateTime;
}

// Event background-color
var color = ['lightpink', 'greenyellow', 'lightgreen', 'lightsteelblue', 'lightsalmon' , 'paleturquoise'];

var eventCnt = Array.from({length: 31}, () => 1); // Event top px;  ex) top: eventCnt[0] * 25px;


// if first day start at Sat/Sun column = 5
if (firstDay < 5) {
    y = 4;
} else {
    const table = document.querySelector("table");
    table.innerHTML += "<tr></tr>";
}

drawCalendar();
getEvent();

setInterval(check(), 1000);  // Refresh when date changes

function drawCalendar() {
    // Display Date | Sep 1 Tue
    dayViewElement.innerHTML = monthArray[month] + " " + today + " " + dayArray[now.getDay()];

    // Previous Month
    for (i = 0; i < firstDay; i++) {
        trElement[0].innerHTML += "<td><p>" + cnt + "</p></td>";
        cnt++;
    }

    cnt = 1;

    let flag = 1;   // prevent draw skyblue twice
                    // today = background-color: skyblue
    for (i = firstDay; i < x; i++) {
        if (cnt == today && flag == 1) {
            trElement[0].innerHTML += "<td class='td" + cnt + "'style='background-color: skyblue;'><p>" + cnt + "</p></td>";
            flag = 0;
        } else {
            trElement[0].innerHTML += "<td class='td" + cnt + "'><p>" + cnt + "</p></td>";
        }
        cnt++;
    }

    for (i = 0; i < y; i++) {
        for (j = 0; j < x; j++) {
            if (cnt > lastDate) cnt = 1; // Next Month
            
            if (cnt == today && flag == 1) {
                trElement[i + 1].innerHTML += "<td class='td" + cnt + "'style='background-color: skyblue;'><p>" + cnt + "</p></td>";
            } else {
                trElement[i + 1].innerHTML += "<td class='td" + cnt + "'><p>" + cnt + "</p></td>";
            }
            cnt++;
        }
    }
}

function sortEventbyLength() { // Descending order
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
            if (arr[j] < arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                var temp = cal[j].summary;
                cal[j].summary = cal[j + 1].summary;
                cal[j + 1].summary = temp;

                var temp = cal[j].startDate;
                cal[j].startDate = cal[j + 1].startDate;
                cal[j + 1].startDate = temp;

                var temp = cal[j].endDate;
                cal[j].endDate = cal[j + 1].endDate;
                cal[j + 1].endDate = temp;

                var temp = cal[j].startDateTime;
                cal[j].startDateTime = cal[j + 1].startDateTime;
                cal[j + 1].startDateTime = temp;

                var temp = cal[j].endDateTime;
                cal[j].endDateTime = cal[j + 1].endDateTime;
                cal[j + 1].endDateTime = temp;

            }
        }
    }
}

function showEvent() {
    var c = 0;  // Color by event length

    for (i = 0; i < cal.length; i++) {
        var dateStart = new Date(cal[i].startDate).getDate();
        var dateTimeStart = new Date(cal[i].startDateTime).getDate();

        var dateEnd = new Date(cal[i].endDate).getDate();
        var dateTimeEnd = new Date(cal[i].endDateTime).getDate();

        var year = new Date(cal[i].startDate).getFullYear();
        
        if (year != 1970) {   /// Date
            c = dateEnd - dateStart - 1;
            if (c > 5) c = 5;

            const element = document.querySelector(".td" + dateStart);
            element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "; top: " + 25 * eventCnt[dateStart] + "px'>" + cal[i].summary + "</p>";
            eventCnt[dateStart]++;

            for (j = dateStart + 1; j < dateEnd; j++) {
                const element = document.querySelector(".td" + j);
                // element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "'>" + cal[i].summary + "</p>";
                element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "; top: " + 25 * eventCnt[j] + "px'>" + "" + "</p>";
                eventCnt[j]++;
            }
        } else {              /// DateTime
            c = dateTimeEnd - dateTimeStart;
            if (c > 5) c = 5;

            const element = document.querySelector(".td" + dateTimeStart);
            element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "; top: " + 25 * eventCnt[dateTimeStart] + "px'>" + cal[i].summary + "</p>";

            for (j = dateTimeStart + 1; j < dateTimeEnd + 1; j++) {
                const element = document.querySelector(".td" + j);
                // element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "'>" + cal[i].summary + "</p>";
                element.innerHTML += "<p class='summary' style='background-color:" + color[c] + "; top: " + 25 * eventCnt[j] + "px'>" + "" + "</p>";
                eventCnt[j]++;
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
        .then(data => {
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

                    if (data.items[i].start.date) {     /// date
                        cal[cnt].startDate = data.items[i].start.date;
                        cal[cnt].endDate = data.items[i].end.date;
                        cal[cnt].startDateTime = 0;
                        cal[cnt].endDateTime = 0;
                    } else {                            /// dateTime
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
            sortEventbyLength();
            showEvent();
        });
}

// Refresh when date changes
function check() {
    var now = new Date();

    if (now.getHours() == 0 && now.getMinutes() == 0 && now.getSeconds() == 0) {
        location.reload(true);
    }
}
