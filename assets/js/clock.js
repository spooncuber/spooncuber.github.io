"use strict";

let startTime;
let timer;

function start() {
    startTime = new Date();
    timer = setInterval(function () {
        let timeDifference = new Date() - startTime;
        document.getElementById('stopwatch').innerText = formatElapsed(timeDifference);
    }, 0);
}

function stop() {
    clearInterval(timer);
}

function formatElapsed(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    const secStr = minutes > 0 ? String(seconds).padStart(2, '0') : String(seconds);
    const csStr = String(centiseconds).padStart(2, '0');
    return minutes > 0 ? minutes + ':' + secStr + '.' + csStr : secStr + '.' + csStr;
}

function reset() {
    stopwatch.innerText = '0.000';
    startTime = null;
    endTime = null;
    timeDifference = null;
}
