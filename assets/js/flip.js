"use strict";

function flip() {
    let eBuffer = document.getElementById("edgebuffer").value.toLowerCase();
    let cornerscramble = document.getElementById("cornerscramble").checked;
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").innerHTML = "输出信息统计:";

    let inputCodeStr = 'bdfhjlnprtxz';
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
        if (posChichu(inputCodeList[i][0]) === posChichu(eBuffer) || posChichu(inputCodeList[i][1]) === posChichu(eBuffer)) {
            continue;
        }

        let flipnum = 0;
        let eState;
        while (flipnum !== 2) {
            let cState;
            if (cornerscramble) {
                cState = randomCorner(0);
            } else {
                cState = globalState;
            }

            eState = randomEdge1(0, inputCodeList[i], cState);
            eState = exCode([eBuffer, inputCodeList[i][0]], eState);
            eState = exCode([eBuffer, eglobalState[2 * posChichu(inputCodeList[i][0])]], eState);
            eState = exCode([eBuffer, inputCodeList[i][1]], eState);
            eState = exCode([eBuffer, eglobalState[2 * posChichu(inputCodeList[i][1])]], eState);

            flipnum = 0;
            for (let j = 0; j < 24; j += 2) {
                if (posChichu(eState[24+j]) === posChichu(eglobalState[j])) {
                    flipnum += 1;
                }
            }
        }

        times += 1;
        document.getElementById("outputScrs").value += times.toString() + ". " + m2p(eState) + "\n";
        
    }
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b> 随机生成" + times + "条打乱，遍历缓冲外存在两个翻棱的情况。";
}


window.onload = function () {
    document.getElementById("outputScrs").value = "";
}