"use strict";

function interval() {
    var secs = new Date().getTime() / 1000;
    var current_time = new Date(secs * 1000);

    var marriage = new Date('2021-11-13T14:00:00');
    var time_since = new Date(current_time.getTime() - marriage.getTime()) / 1000;
    var seconds_since = time_since;
    var minutes_since = seconds_since / 60;
    var hours_since = minutes_since / 60;
    var days_since = hours_since / 24;

    var temp = time_since * -1;
    var weeks = Math.floor(temp / (60 * 60 * 24 * 7));
    temp = temp % (60 * 60 * 24 * 7);
    var days = Math.floor(temp / (60 * 60 * 24));
    temp = temp % (60 * 60 * 24);
    var hrs = Math.floor(temp / (60 * 60));
    temp = temp % (60 * 60);
    var min = Math.floor(temp / 60);
    temp = temp % (60);
    var sec = Math.floor(temp);

    var res = '';
    if(weeks > 0) {
        res = weeks.toString() + " Weeks<br>" + days.toString() + " Days<br>" + hrs.toString() + ":" + min.toString() + ":" + sec.toString();
    } else if(days > 0) {
        res = days.toString() + " Days<br>" + hrs.toString() + ":" + min.toString() + ":" + sec.toString();
    } else if(hrs > 0) {
        res = "Today in " + hrs.toString() + " hours, " + min.toString() + " minute(s), and " + sec.toString() + " second(s)";
    } else if(min > 0) {
        res = "Only " + min.toString() + " minute(s), and " + sec.toString() + " second(s) remain";
    } else if(time_since < -3600) {
        res = "The wedding is happening now!";
    } else {
        res = "Its been " + days_since.toFixed(3).toString() + " days since the wedding."
    }

    document.getElementById('time_info').innerHTML = "Current Date/Time<br><span style='font-size: 0.7em'>" + current_time.toString() + "</span><br><br>Wedding Date/Time<br><span style='font-size: 0.7em'>" + marriage.toString() + "</span><br><br>Count Down<br><br>" + res;
}

setInterval( interval, 333);