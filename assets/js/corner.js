"use strict";

let newCodes = [];

const orientFlag = Number(document.getElementById("cornerorientflag").value);
const skipCycleNum = Number(document.getElementById("cornerskipcyclenum").value);
const cornerbuffer = String(document.getElementById("cornerbuffer").value);
const cornerorder = String(document.getElementById("cornerorder").value);

function getCornerScrs() {
    cornerInputCheck();
    cornerOrderCheck();
    if (Number(document.getElementById("modetype").value) === 0) {
        cornerAccurateCodes();
    } else {
        cornerRandomScrs();
    }
}

function checkMode() {
    if (Number(document.getElementById("modetype").value) === 0) {
        document.getElementById("sec1").style.display = "block";
        document.getElementById("sec2").style.display = "none";
    } else {
        document.getElementById("sec1").style.display = "none";
        document.getElementById("sec2").style.display = "block";
    }
}

function cornerAccurateCodes() {
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let otherCodeMode = Number(document.getElementById("othercodemode").checked);
    let cBuffer = document.getElementById("cornerbuffer").value;
    let edgescramble = document.getElementById("edgescramble").checked;
    let algAllList = [];
    let algSet = algSetGenerator(Array.from(cBuffer));

    algAllList.push(shuffle(newCodes));

    let srcNum = 0;
    let inputCodeNum = 0;
    let otherCodeNum = 0;
    for (let i = 0; i < 10000; i++) {

        let state;
        if (edgescramble) {
            state = randomEdge(0);
        } else {
            state = globalState;
        }

        let pos = [posChichu(cBuffer)];
        let codes = "";
        codes += cBuffer;

        for (let j = 0; j < 5; j++) {
            let breakFlag = 0;
            for (let m = 0; m < algAllList.length; m++) {
                for (let n = 0; n < algAllList[m].length; n++) {
                    let code = algAllList[m][n];
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
                    let code = algSet[n];
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

function cornerRandomScrs() {
    let srcDict = [];
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let scrAmount = 10000;
    let chooseAmount = 100;

    for (let i = 0; i < scrAmount; i++) {

        let alg = getScramble();
        let cornerCodeList = cornerread(alg).split(" ");

        let hitNum = 0;
        for (let j = 0; j < cornerCodeList.length; j++) {
            if (newCodes.indexOf(cornerCodeList.at(j)) > -1) {
                hitNum++;
            }
        }
        srcDict[alg] = hitNum;
    }

    const sortedDict = Object.entries(srcDict).sort((a, b) => b[1] - a[1]);

    let allHitNum = 0;
    let allAlgNum = 0;
    let maxNum = 0;
    for (let i = 0; i < chooseAmount; i++) {
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + sortedDict[i][0] + "\n";

        let cornerCodeList = cornerread(sortedDict[i][0]).split(" ");
        if (cornerCodeList.slice(-1) == "") {
            cornerCodeList.pop();
            cornerCodeList.pop();
        }

        allHitNum += sortedDict[i][1];
        allAlgNum += cornerCodeList.length;
        if (sortedDict[i][1] === sortedDict[0][1]) {
            maxNum += 1;
        }
    }
    let perc = allHitNum / allAlgNum;

    document.getElementById("outputInfo").innerHTML =
        "<b>输出信息统计: </b>共生成100条打乱，共出现角块公式" + allAlgNum + "条，其中训练集公式共" + allHitNum + "条，训练集公式比例为" + perc.toFixed(3) + "。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function cornerInputCheck() {
    var inputCodes = document.getElementById("inputCodes").value.split('\n');
    var buffer = document.getElementById("cornerbuffer").value;

    newCodes = [];
    for (let i = 0; i < inputCodes.length; i++) {
        if (inputCodes[i] === "") {
            continue;
        }
        newCodes.push(inputCodes[i].toUpperCase());
    }

    var outputInfo = "";

    for (let i = 0; i < newCodes.length; i++) {
        if (newCodes[i].length != 2) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】长度不符要求。\n';
            continue;
        }
        if (!isAlphabet(newCodes[i][0]) || !isAlphabet(newCodes[i][1])) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】不是合法编码。\n';
            continue;
        }
        if (posChichu(newCodes[i][0]) === posChichu(buffer) || posChichu(newCodes[i][1]) === posChichu(buffer)) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】包含缓冲编码。\n';
        }
        if (posChichu(newCodes[i][0]) === posChichu(newCodes[i][1])) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】存在位置冲突。\n';
        }
    }

    if (newCodes.length < 5) {
        outputInfo += '请您至少输入5组编码。\n';
    }

    if (outputInfo === "") {
        document.getElementById("popup").style.display = "none";
        document.getElementById("inputInfo").innerHTML = "<b>输入信息统计: </b>您已输入" +
            newCodes[0] + ", " + newCodes[1] + ", ... , " + newCodes.slice(-2, -1) + ", " + newCodes.slice(-1) + "共" + newCodes.length + "组编码。";
        return newCodes;
    } else {
        window.alert(outputInfo);
        return [];
    }
}

function addSample() {

    const cornerbuffer = String(document.getElementById("cornerbuffer").value);

    const eList1 = 'ADGJ';
    const eList2 = 'MNYZPQST';
    if (eList1.indexOf(cornerbuffer) === -1) {
        alert("非顶面缓冲暂不支持U8类样例输入。");
        document.getElementById("choosesample").checked = 0;
        return;
    }

    for (let i = 0; i < eList1.length; i++) {
        if (eList1[i] !== cornerbuffer) {
            for (let j = 0; j < eList2.length; j++) {
                document.getElementById("inputCodes").value += eList1[i] + eList2[j] + '\n';
                document.getElementById("inputCodes").value += eList2[j] + eList1[i] + '\n';
            }
        }
    }
}

window.onbeforeunload = function () {
    document.getElementById("outputScrs").value = "";
}
