// $.ajaxSettings.async = false;

let scr="";

function helperEnter() {
    if(edgeOrderCheck()===false || cornerOrderCheck()===false){
        return;
    }
    scr = document.getElementById("scrinput").value;

    var regex = /(([URFBLD])(w?)(['2]?))|([EMSxyzurfbld](['2]?))/g;
    scr.replace(/\s+/g, "");
    var res = scr.match(regex);
    if(res.length === null){
        scr = "";
    }else{
        scr = res.join(' ');
    }

    //console.log("RES",res);
    console.log("scr",scr);

    codereader();
    solver();
    resizeTextarea();
}

function codereader() {
    if(edgeOrderCheck()===false || cornerOrderCheck()===false){
        return;
    }
    
    // while (scr.charAt(scr.length - 1) === " ") {
    //     scr = scr.slice(0, -1);
    // }
    // while (scr.charAt(0) === " ") {
    //     scr = scr.slice(1);
    // }
    if (fixorientation(scr).length > 0) {
        scr += " " + fixorientation(scr);
    }

    document.getElementById("player").setAttribute("alg", cubeorientation() + scr);

    document.getElementById("edge").innerHTML = "棱块读码：" + edgeread(scr);
    document.getElementById("flip").innerHTML = "棱块翻色：" + edgeorientation(scr);
    document.getElementById("corn").innerHTML = "角块读码：" + cornerread(scr);
    document.getElementById("twis").innerHTML = "角块翻色：" + cornerorientation(scr);

    document.getElementById("alartoutput1").style.display = "none";
    document.getElementById("alartoutput1").innerHTML = "";

    if (scr.length === 0) {
        // document.getElementById("alartoutput1").innerHTML = "&#9888 请输入打乱公式。"; 
        return;
    }
    if (operatealg(scr) === false) {
        document.getElementById("alartoutput1").style.display = "block";
        document.getElementById("alartoutput1").innerHTML = "&#9888 空格不规范或输入的转动无法识别。";
        return;
    }
}

function solver() {
    if(edgeOrderCheck()===false || cornerOrderCheck()===false){
        return;
    }

    document.getElementById("alartoutput2").innerHTML = "";

    const cornerbuffer = String(document.getElementById("cornerbuffer").value).toUpperCase();
    const edgebuffer = String(document.getElementById("edgebuffer").value).toUpperCase();

    let edgecode = document.getElementById("edgesolve").value.replace(/\s/g, "").toUpperCase();
    let cornercode = document.getElementById("cornersolve").value.replace(/\s/g, "").toUpperCase();
    let paritycode = document.getElementById("paritysolve").value.replace(/\s/g, "").toUpperCase();
    let flipcode = document.getElementById("flipsolve").value.replace(/\s/g, "").toUpperCase();
    let twistcode = document.getElementById("twistsolve").value.replace(/\s/g, "").toUpperCase();

    let comms = " ";

    if (edgecode.length % 2 === 1 || cornercode.length % 2 === 1 || paritycode.length % 2 === 1 || flipcode.length % 2 === 1 || twistcode.length % 2 === 1) {
        document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现单数编码！";
        // return;
    }

    let liList = document.getElementsByTagName('li');
    for (let i = 0; i < liList.length; i++) {
        for (let j = 0; j < liList[i].children.length; j++) {
            let solveType = liList[i].children[j].id;
            switch (solveType) {
                case "edgesolve":
                    for (let i = 0; i < ~~(edgecode.length/2)*2; i += 2) {
                        if (!isAlphabet(edgecode[i]) || !isAlphabet(edgecode[i+1]) ) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 输入非法编码！";
                        }else if (posChichu(edgecode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(edgecode[i + 1].toLowerCase()) === posChichu(edgebuffer.toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(edgecode[i].toLowerCase()) === posChichu(edgecode[i + 1].toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现同位置编码！";
                        } else {
                            let state = codeTrans((edgebuffer + edgecode[i+1] + edgecode[i]).toLowerCase(), globalState);
                            comms += m2p(state);
                        }
                    }
                    break;
                case "flipsolve":
                    for (let i = 0; i < ~~(flipcode.length/2)*2; i += 2) {
                        if (!isAlphabet(flipcode[i]) || !isAlphabet(flipcode[i+1]) ) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 输入非法编码！";
                        }else if (posChichu(flipcode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(flipcode[i + 1].toLowerCase()) === posChichu(edgebuffer.toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(flipcode[i].toLowerCase()) !== posChichu(flipcode[i + 1].toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 只能出现同位置编码！";
                        } else {
                            let state = codeTrans((edgebuffer + flipcode[i+1] + flipcode[i]).toLowerCase(), globalState);
                            comms += m2p(state);

                        }
                    }
                    break;
                case "cornersolve":
                    for (let i = 0; i < ~~(cornercode.length/2)*2; i += 2) {
                        if (!isAlphabet(cornercode[i]) || !isAlphabet(cornercode[i+1]) ) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 输入非法编码！";
                        }else if (posChichu(cornercode[i]) === posChichu(cornerbuffer) || posChichu(cornercode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(cornercode[i]) === posChichu(cornercode[i + 1])) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现同位置编码！";
                        } else {
                            let state = codeTrans((cornerbuffer + cornercode[i + 1] + cornercode[i]), globalState);
                            comms += m2p(state);
                        }
                    }
                    break;
                case "twistsolve":
                    for (let i = 0; i < ~~(twistcode.length/2)*2; i += 2) {
                        if (!isAlphabet(twistcode[i]) || !isAlphabet(twistcode[i+1]) ) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 输入非法编码！";
                        }else if (posChichu(twistcode[i]) === posChichu(cornerbuffer) || posChichu(twistcode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(twistcode[i]) !== posChichu(twistcode[i + 1])) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 只能出现同位置编码！";
                        } else {
                            let state = codeTrans((cornerbuffer + twistcode[i+1] + twistcode[i]), globalState);
                            comms += m2p(state);
                        }
                    }
                    break;
                case "paritysolve":
                    for (let i = 0; i < ~~(paritycode.length/2)*2; i += 2) {
                        if (!isAlphabet(paritycode[i]) || !isAlphabet(paritycode[i+1]) ) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 输入非法编码！";
                        }else if (posChichu(paritycode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(paritycode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else {
                            let state1 = codeTrans((edgebuffer + paritycode[i]).toLowerCase(), globalState);
                            let state2 = codeTrans((cornerbuffer + paritycode[i + 1]), state1);
                            comms += m2p(state2);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    //console.log('comms', comms)

    document.getElementById("player").setAttribute("alg", cubeorientation() + scr + comms);
}

function getAlgSolver() {
    const jsonNameList = ["cornerAlgToStandard", "edgeAlgToStandard", "parityAlgToInfo", "parityCornerAlgToStandard", "parityEdgeAlgToStandard", "nightmareCornerAlgToInfo", "nightmareEdgeAlgToInfo", "nightmareTwoFlipsAlgToInfo", "nightmareTwoTwistsAlgToInfo"];
    const jsonLoaded = jsonNameList.map((name) => $.getJSON(`assets/json/${name}.json`, (json) => {
        window[`${name}`] = json;
    }));

    let liList = document.getElementsByTagName('li');
    for (let i = 0; i < liList.length; i++) {
        for (let j = 0; j < liList[i].children.length; j++) {
            let solveType = liList[i].children[j].id;
            switch (solveType) {
                case "edgesolve":
                    for (let i = 0; i < edgecode.length; i += 2) {
                        if (posChichu(edgecode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(edgecode[i + 1].toLowerCase()) === posChichu(edgebuffer.toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(edgecode[i].toLowerCase()) === posChichu(edgecode[i + 1].toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现同位置编码！";
                        } else {
                            comms += nightmareEdgeAlgToInfo[edgeAlgToStandard[edgebuffer + edgecode.slice(i, i + 2)]] + " ";
                        }
                    }
                    break;
                case "flipsolve":
                    for (let i = 0; i < flipcode.length; i += 2) {
                        if (posChichu(flipcode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(flipcode[i + 1].toLowerCase()) === posChichu(edgebuffer.toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(flipcode[i].toLowerCase()) !== posChichu(flipcode[i + 1].toLowerCase())) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 只能出现同位置编码！";
                        } else {
                            let paritycodecombo0 = parityEdgeAlgToStandard[edgebuffer + flipcode[i]] + "AD";
                            let paritycodecombo1 = parityEdgeAlgToStandard[edgebuffer + flipcode[i + 1]] + "AD";
                            comms += parityAlgToInfo[paritycodecombo0] + " ";
                            comms += parityAlgToInfo[paritycodecombo1] + " ";
                        }
                    }
                    break;
                case "cornersolve":
                    for (let i = 0; i < cornercode.length; i += 2) {
                        if (posChichu(cornercode[i]) === posChichu(cornerbuffer) || posChichu(cornercode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(cornercode[i]) === posChichu(cornercode[i + 1])) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现同位置编码！";
                        } else {
                            comms += nightmareCornerAlgToInfo[cornerAlgToStandard[cornerbuffer + cornercode.slice(i, i + 2)]] + " ";
                        }
                    }
                    break;
                case "twistsolve":
                    for (let i = 0; i < twistcode.length; i += 2) {
                        if (posChichu(twistcode[i]) === posChichu(cornerbuffer) || posChichu(twistcode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else if (posChichu(twistcode[i]) !== posChichu(twistcode[i + 1])) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 只能出现同位置编码！";
                        } else {
                            let paritycodecombo0 = "AC" + parityCornerAlgToStandard[cornerbuffer + twistcode[i]];
                            let paritycodecombo1 = "AC" + parityCornerAlgToStandard[cornerbuffer + twistcode[i + 1]];
                            comms += parityAlgToInfo[paritycodecombo0] + " ";
                            comms += parityAlgToInfo[paritycodecombo1] + " ";
                        }
                    }
                    break;
                case "paritysolve":
                    for (let i = 0; i < paritycode.length; i += 2) {
                        if (posChichu(paritycode[i].toLowerCase()) === posChichu(edgebuffer.toLowerCase()) || posChichu(paritycode[i + 1]) === posChichu(cornerbuffer)) {
                            document.getElementById("alartoutput2").innerHTML = "&#9888 不能出现缓冲块编码！";
                        } else {
                            let paritycodecombo = parityEdgeAlgToStandard[edgebuffer + paritycode[i]] + parityCornerAlgToStandard[cornerbuffer + paritycode[i + 1]];
                            comms += parityAlgToInfo[paritycodecombo] + " ";
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

function randomScramble(){
    document.getElementById('scrinput').value = getScramble();
    document.getElementById("edgesolve").value = "";
    document.getElementById("cornersolve").value = "";
    document.getElementById("paritysolve").value = "";
    document.getElementById("flipsolve").value = "";
    document.getElementById("twistsolve").value = "";
    helperEnter();
}

const solveList = document.getElementById("solvelist");

function drag(event) {
    //event.dataTranser.setData('text/plain', '');
    event.dataTransfer.setData("text/plain", event.target.id);
}
function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    const edgecode = document.getElementById("edgesolve").value;
    const cornercode = document.getElementById("cornersolve").value;
    const paritycode = document.getElementById("paritysolve").value;
    const flipcode = document.getElementById("flipsolve").value;
    const twistcode = document.getElementById("twistsolve").value;

    event.preventDefault();
    event.stopPropagation();

    let data = event.dataTransfer.getData("text/plain");
    const dragHTML = document.getElementById(data).innerHTML;
    let targetElement;
    if (event.target.nodeName === "LI") {
        targetElement = event.target;
    } else if (event.target.parentElement.nodeName === "LI") {
        targetElement = event.target.parentElement;
    }
    const targetHTML = targetElement.innerHTML;

    if (solveList.dragSrcEl !== event.target) {
        targetElement.innerHTML = dragHTML;
        document.getElementById(data).innerHTML = targetHTML;
        helperEnter();
    }

    document.getElementById("edgesolve").value = edgecode;
    document.getElementById("cornersolve").value = cornercode;
    document.getElementById("paritysolve").value = paritycode;
    document.getElementById("flipsolve").value = flipcode;
    document.getElementById("twistsolve").value = twistcode;
}


function cubeorientation() {
    let cubeorientation = Number(document.getElementById("cubeorientation").value);

    switch (cubeorientation) {
        case 0: return "";
        case 1: return "y ";
        case 2: return "y2 ";
        case 3: return "y' ";
        case 4: return "x2 ";
        case 5: return "x2 y ";
        case 6: return "x2 y2 ";
        case 7: return "x2 y' ";
        case 8: return "x ";
        case 9: return "x y ";
        case 10: return "x y2 ";
        case 11: return "x y' ";
        case 12: return "x' ";
        case 13: return "x' y ";
        case 14: return "x' y2 ";
        case 15: return "x' y' ";
        case 16: return "z' ";
        case 17: return "z' y ";
        case 18: return "z' y2 ";
        case 19: return "z' y' ";
        case 20: return "z ";
        case 21: return "z y ";
        case 22: return "z y2 ";
        case 23: return "z y' ";
    }
}

window.onload = function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("scrinput").style.width = $('html').css('max-width');
}

function resizeTextarea() {

    let elem = document.getElementById("scrinput");

    // 动态计算字符串宽度，手机无效
    // const spanLable = document.createElement('span');
    // spanLable.innerHTML = elem.value;
    // spanLable.style.visibility = 'hidden';
    // spanLable.style.float = 'left';
    // spanLable.style.fontSize = '16pt';
    // spanLable.style.fontFamily = '"Tahoma", Helvetica, sans-serif';
    // document.body.appendChild(spanLable);
    // const width = spanLable.offsetWidth;
    // document.body.removeChild(spanLable);
    // let rowsValue = Math.floor(width / elem.offsetWidth) + 1;

    let rowsValue = Math.floor(elem.value.length / (elem.cols * 1));
    if (rowsValue === 0) {
        elem.rows = 1;
    } else if (rowsValue > 0) {
        elem.rows = rowsValue;
    }
}