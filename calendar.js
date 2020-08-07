var now = new Date();
var lastDate = new Date(now.getYear(), now.getMonth() + 1, 0).getDate();
var prevDate = new Date(now.getYear(), now.getMonth(), 0).getDate();
var firstDay = new Date(now.getFullYear(), now.getMonth()).getDay();
var month = now.getMonth();
var today = now.getDate();

var x = 7, y = 5;
var cnt = prevDate - firstDay + 1;

if (firstDay < 5) y = 4;

document.write(month + 1);

document.write("<table>");
document.write("<tr>");

// Previous Month
for (i = 0; i < firstDay; i++) {
    document.write("<td style='background-color: white;'>" + cnt + "</td>");
    cnt++;
}

cnt = 1;
for (i = firstDay; i < x; i++) {
    document.write("<td style='background-color: white;'>" + cnt + "</td>");
    cnt++;
}

document.write("</tr>");

for (i = 0; i < y; i++) {
    document.write("<tr>");
    
    for (j = 0; j < x; j++) {
        if (cnt > lastDate) cnt = 1;

        if (cnt == today) {
            document.write("<td style='background-color: skyblue;'>" + cnt + "</td>");
        } else {
            document.write("<td style='background-color: white;'>" + cnt + "</td>");
        }
        cnt++;
    }

    document.write("</tr>");
}
document.write("</table>");