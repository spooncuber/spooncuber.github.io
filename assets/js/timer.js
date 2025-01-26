"use strict";

let myTimeout;
let pressFlag = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === " ") {
        if (pressFlag == 0) {
            document.getElementById("stopwatch").style.color = "red";
        }
        clearTimeout(myTimeout);
        myTimeout = setTimeout(function () {
            pressFlag = 1;
            document.getElementById("stopwatch").style.color = "green";
        }, 400);
    }
});

document.addEventListener('keypress', function () {
    if (pressFlag == 2) {
        stop();
        pressFlag = 0;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === " ") {
        clearTimeout(myTimeout);
        if (pressFlag == 1) {
            start();
            pressFlag = 2;
        }
    }
});

document.getElementById('stopwatch').addEventListener('mousedown', function () {

});

document.getElementById('stopwatch').addEventListener('mouseup', function () {

});

window.onload = function () {
    let sharedData = JSON.parse(localStorage.getItem('scrListString'));

    document.getElementById('scrshow').innerHTML = sharedData;
}