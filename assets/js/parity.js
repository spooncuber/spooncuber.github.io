"use strict";

let newCodes = [];
document.getElementById("edgescramble").checked = true;
document.getElementById("cornerscramble").checked = true;

function getParityScrs() {
    parityInputCheck();
    newCodes = shuffle(newCodes);

    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let edgebuffer = String(document.getElementById("edgebuffer").value).toLowerCase();
    let cornerbuffer = String(document.getElementById("cornerbuffer").value).toUpperCase();
    let edgescramble = document.getElementById("edgescramble").checked;
    let cornerscramble = document.getElementById("cornerscramble").checked;

    let eSet = algSetGenerator(edgebuffer);
    let cSet = algSetGenerator(cornerbuffer);

    for (let i = 0; i < newCodes.length; i++) {
        //////////////
        eSet = shuffle(eSet);
        cSet = shuffle(cSet);
        let state = globalState;

        let posList, codes;
        posList = [];
        codes = edgebuffer;
        posList.push(posChichu(newCodes[i][0].toLowerCase()));
        posList.push(posChichu(edgebuffer));

        if(edgescramble){
            for (let j = 0; j < 5; j++) {
                for(let k = 0; k < eSet.length; k++){
                    if(posList.indexOf(posChichu(eSet[k][0])) == -1 && posList.indexOf(posChichu(eSet[k][1])) == -1){
                        posList.push(posChichu(eSet[k][0]));
                        posList.push(posChichu(eSet[k][1]));
                        codes += eSet[k];
                        break;
                    }
                }
            }
            state = codeTrans(codes,state);
        }

        posList = [];
        codes = cornerbuffer;
        posList.push(posChichu(newCodes[i][1]));
        posList.push(posChichu(cornerbuffer));

        if(cornerscramble){
            for (let j = 0; j < 3; j++) {
                for(let k = 0; k < cSet.length; k++){
                    if(posList.indexOf(posChichu(cSet[k][0])) == -1 && posList.indexOf(posChichu(cSet[k][1])) == -1){
                        posList.push(posChichu(cSet[k][0]));
                        posList.push(posChichu(cSet[k][1]));
                        codes += cSet[k];
                        break;
                    }
                }
            }
            state = codeTrans(codes,state);
        }
        state = exCode([edgebuffer, newCodes[i][0].toLowerCase()], state);
        state = exCode([cornerbuffer, newCodes[i][1]], state);
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";

    }

    document.getElementById("outputInfo").innerHTML =
        `<b>输出信息统计: </b>已生成遍历训练集编码的${newCodes.length}条打乱。`;
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function parityInputCheck() {
    var inputCodes = document.getElementById("inputCodes").value.split('\n');

    let edgebuffer = String(document.getElementById("edgebuffer").value).toLowerCase();
    let cornerbuffer = String(document.getElementById("cornerbuffer").value).toUpperCase();

    newCodes = [];
    for (let i = 0; i < inputCodes.length; i++) {
        if (inputCodes[i] === "") {
            continue;
        }
        newCodes.push(inputCodes[i]);
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
        if (posChichu(newCodes[i][0].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(newCodes[i][1].toUpperCase()) === posChichu(cornerbuffer.toUpperCase())) {
            outputInfo += '您输入的第' + (i + 1).toString() + '行编码【' + newCodes[i] + '】包含缓冲编码。\n';
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

    const edgebuffer = String(document.getElementById("edgebuffer").value).toLowerCase();
    const cornerbuffer = String(document.getElementById("cornerbuffer").value).toUpperCase();

    const eList1 = 'aceg';
    const eList2 = 'ADGJ';
    if (eList1.indexOf(edgebuffer) === -1 || eList2.indexOf(cornerbuffer) === -1) {
        alert("非顶面缓冲暂不支持样例输入。");
        document.getElementById("choosesample").checked = 0;
        return;
    }

    for (let i = 0; i < eList1.length; i++) {
        if (eList1[i] !== edgebuffer) {
            for (let j = 0; j < eList2.length; j++) {
                if (eList2[j] !== cornerbuffer) {
                    document.getElementById("inputCodes").value += eList1[i].toUpperCase() + eList2[j].toUpperCase() + '\n';
                }
            }
        }
    }
}

window.onbeforeunload = function () {
    document.getElementById("outputScrs").value = "";
}
