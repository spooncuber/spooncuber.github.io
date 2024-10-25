"use strict";

let startTime;
let timer;

function start() {
    startTime = new Date();
    timer = setInterval(function () {
        let endTime = new Date();
        let timeDifference = endTime - startTime;
        let minutes = Math.floor(timeDifference / 60000);
        let seconds = Math.floor((timeDifference % 60000) / 1000);
        let milliseconds = Math.floor((timeDifference % 1000)/100);
        if(minutes == 0){
            document.getElementById('stopwatch').innerText = seconds + '.' + milliseconds;
        }else{
            document.getElementById('stopwatch').innerText = minutes + ":" + seconds + '.' + milliseconds;
        }
    }, 0);
}

function stop() {
    clearInterval(timer);
}

function reset() {
    stopwatch.innerText = '0.000';
    startTime = null;
    endTime = null;
    timeDifference = null;
}
