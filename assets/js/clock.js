"use strict";


function start() {
    let startTime = new Date();
    let timer = setInterval(function () {
        let endTime = new Date();
        let timeDifference = endTime - startTime;
        // var seconds = Math.floor((timeDifference % 60000) / 1000);
        //var milliseconds = ('0' + Math.floor((timeDifference % 1000))).slice(-3);
        var seconds = Math.floor((timeDifference % 60000) / 1000);
        var milliseconds = Math.floor((timeDifference % 1000)/100);
        document.getElementById('stopwatch').innerText = seconds + '.' + milliseconds;
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
