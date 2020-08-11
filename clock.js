var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90

// setInterval(drawClock, 1000);

drawClock();

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);

    requestAnimationFrame(drawClock);
}

function drawFace(ctx, radius) {
    // side
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.05, 0 , 2 * Math.PI);
    ctx.fillStyle = "#07f";
    ctx.fill();

    // background
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.03, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    for(num = 1; num < 61; num++){
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, radius * 1);
        ctx.rotate(-ang);

        if (num % 10 == 0) {
            drawHand(ctx, ang, 40, 10, "black");
            drawHand(ctx, ang, 40, 2, "white");
        } else if (num % 5 == 0) {
            drawHand(ctx, ang, 40, 4, "black");
        } else {
            drawHand(ctx, ang, 10, 1, "black");
        }
        ctx.rotate(ang);
        ctx.translate(0, -radius * 1);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    ctx.font = "50px Arial";
    ctx.textBaseline="middle";
    ctx.textAlign="center";

    ctx.fillText(hour + ":" + minute + ":" + second, 0, radius / 2);

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.4, radius * 0.04, "black");
    //minute
    minute=minute * Math.PI / 30;
    drawHand(ctx, minute, radius * 0.75, radius * 0.04, "black");
    // second
    second=(second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-pos);
}