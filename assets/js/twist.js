"use strict";

function twist() {
    let cBuffer = document.getElementById("cornerbuffer").value.toUpperCase();
    let edgescramble = document.getElementById("edgescramble").checked;
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计:</b>";

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

    let times = 0;
    for (let i = 0; i < inputCodeList.length; i++) {
        if (posChichu(inputCodeList[i][0]) === posChichu(cBuffer) || posChichu(inputCodeList[i][1]) === posChichu(cBuffer)) {
            continue;
        }

        let twistnum = 0;
        let cState;
        while (twistnum !== 2) {
            let eState;
            if (edgescramble) {
                eState = randomEdge(0);
            } else {
                eState = globalState;
            }
            cState = randomCorner1(0, inputCodeList[i], eState);
            cState = exCode([cBuffer, inputCodeList[i][0]], cState);
            cState = exCode([cBuffer, globalState[3 * posChichu(inputCodeList[i][0])]], cState);
            cState = exCode([cBuffer, inputCodeList[i][1]], cState);
            cState = exCode([cBuffer, globalState[3 * posChichu(inputCodeList[i][1])]], cState);

            twistnum = 0;
            for (let j = 0; j < 24; j += 3) {
                if (posChichu(cState[j]) === posChichu(globalState[j])) {
                    twistnum += 1;
                }
            }
        }

        times += 1;
        document.getElementById("outputScrs").value += times.toString() + ". " + m2p(cState) + "\n";
        
    }
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b> 随机生成" + times + "条打乱，遍历缓冲外存在两个翻角的情况。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

window.onload = function () {
    document.getElementById("outputScrs").value = "";
}