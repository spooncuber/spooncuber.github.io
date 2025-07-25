"use strict";
document.getElementById("edgescramble").checked = true;
document.getElementById("cornerscramble").checked = true;

function ltct() {
    var inputCodes = document.getElementById("inputCodes").value.split('\n');
    var cBuffer = document.getElementById("cornerbuffer").value.toUpperCase();
    let edgescramble = document.getElementById("edgescramble").checked;
    let cornerscramble = document.getElementById("cornerscramble").checked;

    var inputCodes = ltctInputCheck(inputCodes,cBuffer);
    if(inputCodes.length === 0){
        return;
    }

    inputCodes = shuffle(inputCodes);
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").innerHTML = "输出信息统计:";

    var times = 0;
    for (let i = 0; i < inputCodes.length; i++) {
        let state;
        if(edgescramble){
            state = randomEdge(1);
        }else{
            state = exCode(["a","g"], globalState);
        }
        var algSet = algSetGenerator(inputCodes[i].concat([cBuffer]));

        algSet = shuffle(algSet);

        var codes = cBuffer;
        var posList = [];

        for (let j = 0; j < 2; j++) {
            for(let k = 0; k < algSet.length; k++){
                if(posList.indexOf(posChichu(algSet[k][0])) == -1 && posList.indexOf(posChichu(algSet[k][1])) == -1){
                    posList.push(posChichu(algSet[k][0]));
                    posList.push(posChichu(algSet[k][1]));
                    codes += algSet[k];
                    break;
                }
            }
        }
        
        //console.log(i,codes);
        if(cornerscramble){
            state = codeTrans(codes,state);
        }
        state = exCode([cBuffer, inputCodes[i][0]], state);
        state = exCode([cBuffer, inputCodes[i][1]], state);
        state = exCode([cBuffer, globalState[3 * posChichu(inputCodes[i][1])]], state);

        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state)+"\n";
        times+=1;
    }
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b> 随机生成"+times+"条打乱。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function ltctInputCheck(){
    var inputCodes = document.getElementById("inputCodes").value.split('\n');
    var cBuffer = document.getElementById("cornerbuffer").value.toUpperCase();

    var newCodes = [];
    for (let i = 0; i < inputCodes.length; i++) {
        if(inputCodes[i]===""){
            continue;
        }

        var code = inputCodes[i];
        code = code.replace("[", "");
        code = code.replace("]", "");
        newCodes.push(code);
    }

    var outputInfo = "";

    for (let i = 0; i < newCodes.length; i++) {
        if(newCodes[i].length != 2){
            outputInfo += '您输入的第'+(i+1).toString()+'行编码【'+newCodes[i]+'】长度不符要求。\n';
            continue;
        }
        if(!isAlphabet(newCodes[i][0]) || !isAlphabet(newCodes[i][1])){
            outputInfo += '您输入的第'+(i+1).toString()+'行编码【'+newCodes[i]+'】不是字母。\n';
            continue;
        }
        if(posChichu(newCodes[i][0]) === posChichu(cBuffer) || posChichu(newCodes[i][1]) === posChichu(cBuffer)){
            outputInfo += '您输入的第'+(i+1).toString()+'行编码【'+newCodes[i]+'】包含缓冲编码。\n';
        }
        if(posChichu(newCodes[i][0]) === posChichu(newCodes[i][1])){
            outputInfo += '您输入的第'+(i+1).toString()+'行编码【'+newCodes[i]+'】存在位置冲突。\n';
        }
    }

    if (newCodes.length < 5) {
        outputInfo += '请您至少输入5组编码。\n';
    }
    
    if(outputInfo === ""){
        var popup = document.getElementById("popup");
        popup.style.display = "none";
        document.getElementById("inputInfo").innerHTML = "<b>输入信息统计: </b>您已输入" +
            newCodes[0] + ", " + newCodes[1] + ", ... , " + newCodes.slice(-2, -1) + ", " + newCodes.slice(-1) + "共" + newCodes.length + "组编码。";
        return newCodes;
    }else{
        window.alert(outputInfo);
        return [];
    }
}

function shuffle(array) {
    let res = [], random;
    while(array.length){
        random = Math.floor(Math.random()*array.length);
        res.push(array[random]);
        array.splice(random, 1);
    }
    return res;
}

function isAlphabet(char) {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function copyScrs() {
    var copyText = document.getElementById("outputScrs").value;
    navigator.clipboard.writeText(copyText);
}

window.onload=function() {
   document.getElementById("outputScrs").value = "";
}