"use strict";

function twist() {
    var cBuffer = document.getElementById("cornerbuffer").value.toUpperCase();
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").innerHTML = "输出信息统计:";

    let inputCodeStr = 'BCEFHIKLMNPQSTYZ';
    let inputCodeList = [];

    for (let m = 0; m < inputCodeStr.length; m++) {
        for (let n = 0; n < m; n++) {
            if (posChichu(inputCodeStr[m]) !== posChichu(inputCodeStr[n])) {
                inputCodeList.push([inputCodeStr[m], inputCodeStr[n]]);
            }
        }
    }

    inputCodeList = shuffle(Array.from(inputCodeList));

    var times = 0;
    for (let i = 0; i < inputCodeList.length; i++) {
        if (posChichu(inputCodeList[i][0]) === posChichu(cBuffer) || posChichu(inputCodeList[i][1]) === posChichu(cBuffer)) {
            continue;
        }

        var flipnum = 0;
        while (flipnum !== 2) {
            var eState = randomEdge(0);
            var cState = randomCorner1(0, inputCodeList[i], eState);
            cState = exCode([cBuffer, inputCodeList[i][0]], cState);
            cState = exCode([cBuffer, globalState[3 * posChichu(inputCodeList[i][0])]], cState);
            cState = exCode([cBuffer, inputCodeList[i][1]], cState);
            cState = exCode([cBuffer, globalState[3 * posChichu(inputCodeList[i][1])]], cState);

            flipnum = 0;
            for (let j = 0; j < 24; j += 3) {
                if (posChichu(cState[j]) === posChichu(globalState[j])) {
                    flipnum += 1;
                }
            }
        }

        document.getElementById("outputScrs").value += (times + 1).toString() + ". " + m2p(cState) + "\n";
        times += 1;
    }
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b> 随机生成" + times + "条打乱。";
}

function shuffle(array) {
    let res = [], random;
    while (array.length) {
        random = Math.floor(Math.random() * array.length);
        res.push(array[random]);
        array.splice(random, 1);
    }
    return res;
}

function isAlphabet(char) {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function copyScrs() {
    var copyText = document.getElementById("outputScrs").value;
    navigator.clipboard.writeText(copyText);
}

window.onload = function () {
    document.getElementById("outputScrs").value = "";
}