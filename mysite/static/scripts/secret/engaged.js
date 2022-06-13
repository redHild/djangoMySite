"use strict";

function interval() {
    var secs = new Date().getTime() / 1000;
    var current_time = new Date(secs * 1000);


    var engagement = new Date('2020-05-27T20:00:00');
    var time_since_engaged = new Date(current_time.getTime() - engagement.getTime()) / 1000;
    var seconds_since_engaged = time_since_engaged;
    var minutes_since_engaged = seconds_since_engaged / 60;
    var hours_since_engaged = minutes_since_engaged / 60;
    var days_since_engaged = hours_since_engaged / 24;
    var anniversary = (current_time.getMonth() == 4 && current_time.getDate() == 27);
    var mensiversary = (current_time.getDate() == 27 && !anniversary);


    var marriage = new Date('2021-11-13T14:00:00');
    var time_since_marriage = new Date(current_time.getTime() - marriage.getTime()) / 1000;
    var seconds_since_marriage = time_since_marriage;
    var minutes_since_marriage = seconds_since_marriage / 60;
    var hours_since_marriage = minutes_since_marriage / 60;
    var days_since_marriage = hours_since_marriage / 24;
    var anniversary_marriage = (current_time.getMonth() == 4 && current_time.getDate() == 27);
    var mensiversary_marriage = (current_time.getDate() == 27 && !anniversary_marriage);

    /*
    var width;
    if(current_time.getMonth() <= 4 && current_time.getDate() <= 26) {

    } else if(current_time.getMonth() >= 4 && current_time.getDate() >= 28) {

    } else {
        width = 100;
    }

    var last_anniversary =
    */

    document.getElementById('time_current').innerHTML = current_time.toString();

    document.getElementById('time_engaged').innerHTML = engagement.toString();
    document.getElementById('seconds_since_engaged').innerHTML = seconds_since_engaged.toFixed(3);
    document.getElementById('minutes_since_engaged').innerHTML = minutes_since_engaged.toFixed(3);
    document.getElementById('hours_since_engaged').innerHTML = hours_since_engaged.toFixed(3);
    document.getElementById('days_since_engaged').innerHTML = days_since_engaged.toFixed(3);
    document.getElementById('mensiversary').innerHTML = (mensiversary)?"Happy Mensiversary!":"";
    document.getElementById('anniversary').innerHTML = (anniversary)?"Happy Anniversary!":"";

    document.getElementById('time_marriage').innerHTML = marriage.toString();
    document.getElementById('seconds_since_marriage').innerHTML = seconds_since_marriage.toFixed(3);
    document.getElementById('minutes_since_marriage').innerHTML = minutes_since_marriage.toFixed(3);
    document.getElementById('hours_since_marriage').innerHTML = hours_since_marriage.toFixed(3);
    document.getElementById('days_since_marriage').innerHTML = days_since_marriage.toFixed(3);
    document.getElementById('mensiversary_marriage').innerHTML = (mensiversary_marriage)?"Happy Mensiversary!":"";
    document.getElementById('anniversary_marriage').innerHTML = (anniversary_marriage)?"Happy Anniversary!":"";
}

setInterval( interval, 100);