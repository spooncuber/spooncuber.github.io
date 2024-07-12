"use strict";

let newCodes = [];
let generateMode = 0;

const orientFlag = Number(document.getElementById("edgeorientflag").value);
const skipCycleNum = Number(document.getElementById("edgeskipcyclenum").value);
const edgebuffer = String(document.getElementById("edgebuffer").value).toLowerCase();
const edgeorder = String(document.getElementById("edgeorder").value).toLowerCase();



function getEdgeScrs() {
    if (generateMode === 0) {
        edgeAccurateCodes();
    } else {
        edgeRandomScrs();
    }
}

function edgeAccurateCodes() {
    edgeInputCheck();

    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let otherCodeMode = Number(document.getElementById("othercodemode").checked);
    let eBuffer = document.getElementById("edgebuffer").value.toLowerCase();
    let algAllList = [];
    let algSet = algSetGenerator(Array.from(eBuffer));

    algAllList.push(shuffle(newCodes));

    var srcNum = 0;
    var inputCodeNum = 0;
    var otherCodeNum = 0;
    for (let i = 0; i < 10000; i++) {
        //var state = randomCorner(0, "");
        var state = globalState;

        var pos = [posChichu(eBuffer)];
        var codes = "";
        codes += eBuffer;

        for (let j = 0; j < 5; j++) {
            var breakFlag = 0;
            for (let m = 0; m < algAllList.length; m++) {
                for (let n = 0; n < algAllList[m].length; n++) {
                    var code = algAllList[m][n];
                    if (pos.indexOf(posChichu(code[0])) === -1 && pos.indexOf(posChichu(code[1])) === -1) {
                        pos.push(posChichu(code[0]));
                        pos.push(posChichu(code[1]));
                        codes += code;
                        if (algAllList.length == m + 1) {
                            algAllList.push([]);
                        }
                        algAllList[m + 1].push(code);
                        algAllList[m].splice(algAllList[m].indexOf(code), 1);
                        breakFlag = 1;
                        inputCodeNum += 1;
                        break;
                    }
                }
                if (breakFlag === 1) {
                    break;
                }
            }

            if (otherCodeMode === 1) {
                algSet = shuffle(Array.from(algSet));
                for (let n = 0; n < algSet.length; n++) {
                    var code = algSet[n];
                    if (pos.indexOf(posChichu(code[0].toString())) === -1 && pos.indexOf(posChichu(code[1].toString())) === -1) {
                        pos.push(posChichu(code[0].toString()));
                        pos.push(posChichu(code[1].toString()));
                        codes += code;
                        otherCodeNum += 1;
                        break;
                    }
                }
            }
        }
        
        state = codeTrans(codes, state);
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
        srcNum += 1;
        if (algAllList[0].length === 0) {
            break;
        }
    }

    document.getElementById("outputInfo").innerHTML =
        `<b>输出信息统计: </b>已生成遍历训练集编码的${srcNum}条打乱。出现${inputCodeNum}次训练集编码，${otherCodeNum}次其他编码。`;
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function edgeRandomScrs() {
    let srcDict = [];
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    var scrAmount = 10000;
    var chooseAmount = 100;

    for (let i = 0; i < scrAmount; i++) {

        var alg = getScramble();
        var edgeCodeList = edgeread(alg).toLowerCase().split(" ");

        var hitNum = 0;
        for (let j = 0; j < edgeCodeList.length; j++) {
            if (newCodes.indexOf(edgeCodeList.at(j)) > -1) {
                hitNum++;
            }
        }
        srcDict[alg] = hitNum;
    }

    const sortedDict = Object.entries(srcDict).sort((a, b) => b[1] - a[1]);

    var allHitNum = 0;
    var allAlgNum = 0;
    var maxNum = 0;
    for (let i = 0; i < chooseAmount; i++) {
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + sortedDict[i][0] + "\n";

        var edgeCodeList = edgeread(sortedDict[i][0]).split(" ");
        if (edgeCodeList.slice(-1) == "") {
            edgeCodeList.pop();
            edgeCodeList.pop();
        }

        allHitNum += sortedDict[i][1];
        allAlgNum += edgeCodeList.length;
        if (sortedDict[i][1] === sortedDict[0][1]) {
            maxNum += 1;
        }
    }
    var perc = allHitNum / allAlgNum;

    document.getElementById("outputInfo").innerHTML =
        "<b>输出信息统计: </b>共生成100条打乱，共出现棱块公式" + allAlgNum + "条，其中训练集公式共" + allHitNum + "条，训练集公式比例为" + perc.toFixed(3) + "。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function edgeInputCheck() {
    var inputCodes = document.getElementById("inputCodes").value.split('\n');
    var buffer = document.getElementById("edgebuffer").value;

    newCodes = [];
    for (let i = 0; i < inputCodes.length; i++) {
        if (inputCodes[i] === "") {
            continue;
        }
        newCodes.push(inputCodes[i].toLowerCase());
    }

    var outputInfo = "";

    for (let i = 0; i < newCodes.length; i++) {
        if (newCodes[i].length != 2) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】长度不符要求。\n';
            continue;
        }
        if (!isAlphabet(newCodes[i][0]) || !isAlphabet(newCodes[i][1])) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】不是字母。\n';
            continue;
        }
        if (posChichu(newCodes[i][0].toLowerCase()) === posChichu(buffer.toLowerCase()) || posChichu(newCodes[i][1].toLowerCase()) === posChichu(buffer.toLowerCase())) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】包含缓冲编码。\n';
        }
        if (posChichu(newCodes[i][0].toLowerCase()) === posChichu(newCodes[i][1].toLowerCase())) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】存在位置冲突。\n';
        }
    }

    if (newCodes.length < 11) {
        outputInfo += '请您至少输入10组编码\n';
    }

    if (outputInfo === "") {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
        document.getElementById("inputInfo").innerHTML = "<b>输入信息统计: </b>您已输入" +
            newCodes[0] + ", " + newCodes[1] + ", ... , " + newCodes.slice(-2, -1) + ", " + newCodes.slice(-1) + "共" + newCodes.length + "组编码。";
        return newCodes;
    } else {
        window.alert(outputInfo);
        return [];
    }
}

window.onload = function () {
    document.getElementById("outputScrs").value = "";
    accurateMode();
}

function accurateMode() {
    document.getElementById("accuratemode").style.background = "white";
    document.getElementById("randomedmode").style.background = "grey";
    document.getElementById("accuratemode").innerHTML = "★ 精准生成模式";
    document.getElementById("randomedmode").innerHTML = "随机生成模式";
    generateMode = 0;
    document.getElementById("othercodemode1").style.display = "block";
}

function randomedMode() {
    document.getElementById("accuratemode").style.background = "grey";
    document.getElementById("randomedmode").style.background = "white";
    document.getElementById("randomedmode").innerHTML = "★ 随机生成模式";
    document.getElementById("accuratemode").innerHTML = "精准生成模式";
    generateMode = 1;
    document.getElementById("othercodemode1").style.display = "none";
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        document.getElementById('popup').style.display = 'none';
    }
});