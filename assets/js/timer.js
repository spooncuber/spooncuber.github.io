"use strict";

let myTimeout;
let pressFlag = 0;
let scrList = [];
let scrIndex = 0;
let timerRecords = JSON.parse(localStorage.getItem('timerRecords')) || [];

document.addEventListener('keydown', function (event) {
    if (event.key === " ") {
        event.preventDefault();
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
        recordCurrentTime();
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

window.onload = function () {
    let sharedData = [];
    try {
        sharedData = JSON.parse(localStorage.getItem('scrListString')) || [];
    } catch (e) {
        sharedData = [];
    }
    scrList = Array.isArray(sharedData) ? sharedData : [String(sharedData)];
    renderScramble();

    renderTimesTable(false);
    document.getElementById('timesclear').addEventListener('click', function () {
        timerRecords = [];
        localStorage.setItem('timerRecords', JSON.stringify(timerRecords));
        renderTimesTable(false);
    });
}

function renderScramble() {
    const scrshow = document.getElementById('scrshow');
    const scrindex = document.getElementById('scrindex');
    if (scrList.length === 0) {
        scrshow.textContent = (typeof arrLang !== "undefined" && arrLang[lang]["noscr"]) || "";
        scrindex.textContent = "";
        return;
    }
    scrshow.textContent = scrList[scrIndex];
    scrindex.textContent = (scrIndex + 1) + " / " + scrList.length;
}

function formatRecordTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    const secStr = minutes > 0 ? String(seconds).padStart(2, '0') : String(seconds);
    const csStr = String(centiseconds).padStart(2, '0');
    return minutes > 0 ? minutes + ':' + secStr + '.' + csStr : secStr + '.' + csStr;
}

function recordCurrentTime() {
    if (typeof startTime === "undefined" || startTime == null) {
        return;
    }
    const elapsed = new Date() - startTime;
    timerRecords.push(elapsed);
    localStorage.setItem('timerRecords', JSON.stringify(timerRecords));
    renderTimesTable(true);
    if (scrList.length > 0) {
        scrIndex = (scrIndex + 1) % scrList.length;
        renderScramble();
    }
}

function averageOfLast(n) {
    if (timerRecords.length < n) {
        return null;
    }
    const last = timerRecords.slice(-n);
    const sorted = last.slice().sort((a, b) => a - b);
    const trimmed = sorted.slice(1, -1);
    return trimmed.reduce((sum, t) => sum + t, 0) / trimmed.length;
}

function renderTimesStats() {
    const statbest = document.getElementById('statbest');
    const statmean = document.getElementById('statmean');
    const statao5 = document.getElementById('statao5');
    const statao12 = document.getElementById('statao12');
    if (timerRecords.length === 0) {
        statbest.textContent = '-';
        statmean.textContent = '-';
        statao5.textContent = '-';
        statao12.textContent = '-';
        return;
    }
    const best = Math.min.apply(null, timerRecords);
    const mean = timerRecords.reduce((sum, t) => sum + t, 0) / timerRecords.length;
    const ao5 = averageOfLast(5);
    const ao12 = averageOfLast(12);
    statbest.textContent = formatRecordTime(best);
    statmean.textContent = formatRecordTime(mean);
    statao5.textContent = ao5 == null ? '-' : formatRecordTime(ao5);
    statao12.textContent = ao12 == null ? '-' : formatRecordTime(ao12);
}

function renderTimesTable(scrollToEnd) {
    const tbody = document.getElementById('timestbody');
    tbody.innerHTML = '';
    timerRecords.forEach(function (t, i) {
        const tr = document.createElement('tr');
        const tdNo = document.createElement('td');
        tdNo.textContent = i + 1;
        const tdTime = document.createElement('td');
        tdTime.textContent = formatRecordTime(t);
        const tdDel = document.createElement('td');
        const delSpan = document.createElement('span');
        delSpan.textContent = '×';
        delSpan.className = 'timedelete';
        delSpan.addEventListener('click', function () {
            timerRecords.splice(i, 1);
            localStorage.setItem('timerRecords', JSON.stringify(timerRecords));
            renderTimesTable(false);
        });
        tdDel.appendChild(delSpan);
        tr.appendChild(tdNo);
        tr.appendChild(tdTime);
        tr.appendChild(tdDel);
        tbody.appendChild(tr);
    });
    renderTimesStats();
    if (scrollToEnd) {
        const list = document.getElementById('timeslist');
        list.scrollTop = list.scrollHeight;
    }
}
