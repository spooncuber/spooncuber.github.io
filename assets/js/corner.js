"use strict";

let newCodes = [];
let generateMode = 0;

const orientFlag = Number(document.getElementById("orientflag").value);
const skipCycleNum = Number(document.getElementById("skipcyclenum").value);
const cornerorder = String(document.getElementById("cornerorder").value).toUpperCase();
const cornerbuffer = String(document.getElementById("cornerbuffer").value).toUpperCase();

function codeCompatible(codesList) {
    codesList;
    const { div, indexNum } = groupRecog(codesList[0]);

    let absolutePosList = [];
    let absoluteOrientList = [];
    let relativePosList = [];
    let relativeOrientList = [];
    let endFlag = 0;
    let orientSum = 0;
    let twistPos;

    if (div === 2) {
        for (let i = 0; i < edgeorder.length; i++) {
            absolutePosList.push(posChichu(edgeorder[i].toLowerCase()));
            absoluteOrientList.push(globalState.indexOf(edgeorder[i].toLowerCase()) % div)
        }
        for (let i = 0; i < codesList.length; i++) {
            relativePosList.push(posChichu(codesList[i].toLowerCase()));
            relativeOrientList.push(globalState.indexOf(codesList[i].toLowerCase()) % div);
        }
        let posSet = new Set(relativePosList);
        let bufferOriginPos = posChichu(edgebuffer.toLowerCase());
        posSet.add(bufferOriginPos);
        let allPos = Array.from({ length: 12 }, (_, i) => i);
        let otherPos = allPos.filter(item => !posSet.has(item));
        twistPos = otherPos[~~(Math.random() * otherPos.length)];
    } else {
        for (let i = 0; i < cornerorder.length; i++) {
            absolutePosList.push(posChichu(cornerorder[i].toUpperCase()));
            absoluteOrientList.push(globalState.indexOf(cornerorder[i].toUpperCase()) % div);
        }
        for (let i = 0; i < codesList.length; i++) {
            relativePosList.push(posChichu(codesList[i].toUpperCase()));
            relativeOrientList.push(globalState.indexOf(codesList[i].toUpperCase()) % div);
        }
        let posSet = new Set(relativePosList);
        let bufferOriginPos = posChichu(cornerbuffer.toUpperCase());
        posSet.add(bufferOriginPos);
        let allPos = Array.from({ length: 8 }, (_, i) => i);
        let otherPos = allPos.filter(item => !posSet.has(item));
        twistPos = otherPos[~~(Math.random() * otherPos.length)];
    }

    // console.log('codesList', codesList);
    // console.log('absolutePosList', absolutePosList);
    // console.log('absoluteOrientList', absoluteOrientList);
    // console.log('relativePosList', relativePosList);
    // console.log('relativeOrientList', relativeOrientList);
    let cycnum = 0;

    let absoluteCyclePos = [];
    let absoluteCycleOrient = [];
    let absoluteCycleOrder = [];
    for (let i = 0; i < absolutePosList.length; i++) {
        let pos0 = relativePosList.indexOf(absolutePosList[i]);
        let pos1 = relativePosList.indexOf(absolutePosList[i], pos0 + 1);
        let pos2 = relativePosList.indexOf(absolutePosList[i], pos1 + 1);
        if (pos0 === pos1 - 1) {
            //console.log("pos errer 0-0: cycle must have one code at least.");
            return [0, 0, 0];
        }
        if (pos1 > -1 && pos2 > - 1) {
            //console.log("pos errer 0-1: codes can't appear three times.");
            return [0, 0, 0];
        }
        if (pos0 > -1 && pos1 > -1) {
            for (let j = 0; j < i; j++) {
                if (relativePosList.slice(pos0 + 1, pos1).indexOf(absolutePosList[j]) > -1) {
                    //console.log("pos errer 0-2: cycle must not have earlier code referring to inputorder.");
                    return [0, 0, 0];
                }
            }
            absoluteCyclePos.push([pos0, pos1]);
            absoluteCycleOrient.push([relativeOrientList[pos0], relativeOrientList[pos1]]);
            absoluteCycleOrder.push(i);
            cycnum++;
        }
    }

    // console.log('absoluteCyclePos', absoluteCyclePos);
    // console.log('absoluteCycleOrient', absoluteCycleOrient);
    // console.log('absoluteCycleOrder', absoluteCycleOrder);

    let maxPos = Number([].concat.apply([], absoluteCyclePos).sort().slice(-1));
    let lastCodesPos = relativePosList.slice(maxPos + 1, relativePosList.length + 1);
    if (lastCodesPos.some(function (x) { return absolutePosList.indexOf(x) < absoluteCycleOrder[absoluteCycleOrder.length - 1]; })) {
        //console.log("pos errer 0-3: the last cycle's later codes must not have earlier code referring to inputorder.");
        return [0, 0, 0];
    }
    if (maxPos > 0 && lastCodesPos.length > 0) {
        endFlag = 0;
    }
    else {
        endFlag = 1;
    }
    // console.log('endFlag', endFlag);

    //M2 F2 M2 F2 S2 R2 S2 R2, skipCycleNum = 2, the code should be [IGOEMCKCEG]
    for (let i = 0; i < absoluteCyclePos.length - 1; i++) {
        if (absoluteCycleOrder[i] < skipCycleNum) {
            let laterPos = [].concat.apply([], absoluteCyclePos.slice(i + 1, absoluteCyclePos.length + 1));
            if (laterPos.some(function (x) { return (x < absoluteCyclePos[i][0] || x > absoluteCyclePos[i][1]); })) {
                //console.log("pos errer 1-1: the skip code's cycle must contain all the later cycles.");
                return [0, 0, 0];
            }
            if (absoluteCyclePos[i + 1][0] - absoluteCyclePos[i][0] <= 1) {
                //console.log("pos errer 1-2: the skip code's first pos must be not adjacent to next cycle.");
                return [0, 0, 0];
            }
            //error1-3 sample: [IGOEMCKCEGQ] [IGOEMCKCEQG]
            if (absoluteCyclePos[i][1] < relativePosList.length - 1 - absoluteCycleOrder[i]) {
                //console.log("pos errer 1-3: the skip code's last pos must be last skipnum's pos.");
                return [0, 0, 0];
            }
            //error1-4 sample: [IGOEMCKCEQG] OR [IGOEMCKCQEG]  (1-3 AND 1-4 can be merged?)
            if (absoluteCyclePos[i][1] - laterPos[laterPos.length - 1] !== skipCycleNum - absoluteCycleOrder[i]) {
                //console.log("pos errer 1-4: the skip code's last pos must be adjacent to last cycle's pos.");
                return [0, 0, 0];
            }
        }
        else {
            //console.log('i', i, absoluteCyclePos[i]);
            if (absoluteCyclePos[i + 1][0] < absoluteCyclePos[i][0]) {
                //console.log("pos errer 2-1: later code's cycle referring to inputorder must be later.");
                return [0, 0, 0];
            }
            if (absoluteCyclePos[i + 1][0] - absoluteCyclePos[i][1] !== 1) {
                //console.log("pos errer 2-2: cycles must be adjacent.");
                return [0, 0, 0];
            }
        }
    }

    for (let i = 0; i < absoluteCyclePos.length; i++) {
        if (orientFlag === 0 && absoluteCycleOrient[i][0] !== absoluteOrientList[absoluteCycleOrder[i]]) {
            //console.log("orient errer 3-1: in no orientFlag mode, the first orient of cycle must be same as the code's orient in inputorder.");
            return [0, 0, 0];
        }
        if (orientFlag === 1 && i > 0) {
            if (absoluteCycleOrient[i][0] != absoluteCycleOrient[i - 1][1]) {
                //console.log("orient errer 3-2: in orientFlag mode, the first orient of cycle must be same as the last orient of the previous cycle.");
                return [0, 0, 0];
            }
        }
        orientSum += absoluteCycleOrient[i][1] - absoluteCycleOrient[i][0];
    }

    if (orientFlag === 1 && absoluteCycleOrient.length === 1 && absoluteCycleOrient[0][0] !== 0) {
        //console.log("orient errer 3-3: if there is only one cycle. the first orientation must be 0.");
        return [0, 0, 0];
    }

    if (orientFlag === 1 && orientSum === 0 && absoluteCycleOrient.length > 0 && absoluteCycleOrient[0][0] !== 0) {
        //console.log("orient errer 3-3: if orientSum = 0. the first orientation must be 0.");
        return [0, 0, 0];
    }

    if (orientFlag === 0) {
        orientSum = 0;
    }

    //console.log('true');
    //console.log('orientSum',orientSum);
    //console.log('otherPos',otherPos);
    return [1, endFlag, orientSum, twistPos];
}

function cornerAccurateTest() {
    document.getElementById("testoutput").innerHTML = "";

    let div = 3;
    let cBuffer = document.getElementById("cornerbuffer").value.toUpperCase();
    let algAllList = [];
    let algSet = algSetGenerator(Array.from(cBuffer));

    algAllList.push(shuffle(algSet));
    // algAllList.push(algSet);

    let inputCodeNum = 0;
    let ztimes = 0;
    let etimes = 0;
    let codestimes = 0;
    for (let i = 0; i < 1000; i++) {
        console.log('i', i);
        //var state = randomCorner(0, "");
        let state = globalState;

        //codes += eBuffer;
        let codesList = [];
        let codeLen = 5;

        for (let j = 0; j < codeLen; j++) {
            firstLoop: for (let m = 0; m < algAllList.length; m++) {
                algAllList[m] = shuffle(algAllList[m]);
                for (let n = 0; n < algAllList[m].length; n++) {
                    let code = algAllList[m][n];
                    let codestemp = Array.from(codesList);
                    for (let p = 0; p < codesList.length + 1; p++) {
                        codestemp.splice(p, 0, code);
                        let outputFlag1 = codeCompatible(codestemp.join(''));
                        if (outputFlag1[0]) {
                            if (j >= 3 && (outputFlag1[1] === 0 || outputFlag1[2] % 3 !== 0)) {
                                continue;
                            }
                            codesList.splice(p, 0, code);
                            break firstLoop;
                        }
                    }
                }
            }
        }

        let codes = codesList.join("");
        let outputFlag2 = codeCompatible(codes);
        if (outputFlag2[1] === 0) {
            continue;
        }

        for (let j = 0; j < codesList.length; j++) {
            secondLoop: for (let m = 0; m < algAllList.length; m++) {
                for (let n = 0; n < algAllList[m].length; n++) {
                    if (codesList[j] === algAllList[m][n]) {
                        if (algAllList.length == m + 1) {
                            algAllList.push([]);
                        }
                        algAllList[m + 1].push(codesList[j]);
                        algAllList[m].splice(algAllList[m].indexOf(codesList[j]), 1);
                        inputCodeNum += 1;
                        break secondLoop;
                    }
                }
            }
        }

        document.getElementById("testoutput").innerHTML += i + 'sum orient = ' + outputFlag2[2] + '<br>';

        let twistPos = outputFlag2[3];
        //console.log('otherPos', otherPos);
        // 应该继续测试寻找“sum orient = -”字样
        if (twistPos >= 0 && outputFlag2[2] % div !== 0) {
            document.getElementById("testoutput").innerHTML += 'This codes can be twist,' + ' twistPos=' + twistPos + '<br>';
            for (let j = 0; j < div; j++) {
                let tempcodes = codes + globalState[twistPos * div];
                tempcodes += globalState[twistPos * div + j];
                let tempstate = codeTrans(cBuffer + tempcodes, state);
                let tempsrc1 = m2p(tempstate);
                let tempsrc2 = tempsrc1.slice(0, tempsrc1.length - 1);
                let readcodes = cornerread(tempsrc2).replaceAll(" ", "");
                //console.log('codes === readcodes', j, tempcodes, codes, readcodes);
                if (codes === readcodes) {
                    codes += globalState[twistPos * div];
                    codes += globalState[twistPos * div + j];
                    //console.log('twisted!', codes, readcodes);
                    break;
                }
            }
        }

        ztimes++;
        state = codeTrans(cBuffer + codes, state);
        let src1 = m2p(state);
        let src2 = src1.slice(0, src1.length - 1);
        let readcodes = cornerread(src2).replaceAll(" ", "");

        codestimes += codes.length;
        document.getElementById("testoutput").innerHTML += src2 + '<br>';
        document.getElementById("testoutput").innerHTML += 'len' + codes.length + '<br>';
        document.getElementById("testoutput").innerHTML += codes.toUpperCase() + '<br>';
        document.getElementById("testoutput").innerHTML += readcodes + '<br>';

        if (codes.length === readcodes.length) {
            if (codes.toUpperCase() === readcodes) {
                document.getElementById("testoutput").innerHTML += "GOOD!" + '<br>';
            } else {
                document.getElementById("testoutput").innerHTML += "ERROR!" + '<br>';
                etimes++;
            }
        } else {
            if (codes.toUpperCase().slice(0, readcodes.length) === readcodes) {
                document.getElementById("testoutput").innerHTML += "GOOD!" + '<br>';
            } else {
                document.getElementById("testoutput").innerHTML += "ERROR!" + '<br>';
                etimes++;
            }
        }

        // if (algAllList[0].length === 0) {
        //     break;
        // }
    }
    document.getElementById("outputP1").innerHTML += 'get num = ' + ztimes + ', err num = ' + etimes + ', codes num = ' + codestimes + '.' + '<br>';
}


function edgeAccurateTest() {
    document.getElementById("testoutput").innerHTML = "";

    let div = 2;
    let eBuffer = document.getElementById("edgebuffer").value.toLowerCase();
    let algAllList = [];
    let algSet = algSetGenerator(Array.from(eBuffer));

    algAllList.push(shuffle(algSet));

    let inputCodeNum = 0;
    let ztimes = 0;
    let etimes = 0;
    let codestimes = 0;
    for (let i = 0; i < 1000; i++) {
        console.log('i', i);
        //var state = randomCorner(0, "");
        let state = globalState;

        let codesList = [];
        let codeLen = 6;

        for (let j = 0; j < codeLen; j++) {
            firstLoop: for (let m = 0; m < algAllList.length; m++) {
                algAllList[m] = shuffle(algAllList[m]);
                for (let n = 0; n < algAllList[m].length; n++) {
                    let code = algAllList[m][n];
                    let codestemp = Array.from(codesList);
                    for (let p = 0; p < codesList.length + 1; p++) {
                        codestemp.splice(p, 0, code);
                        let outputFlag1 = codeCompatible(codestemp.join(''));
                        if (outputFlag1[0]) {
                            if (j >= 5 && (outputFlag1[1] === 0 || outputFlag1[2] % 3 !== 0)) {
                                continue;
                            }
                            codesList.splice(p, 0, code);
                            break firstLoop;
                        }
                    }
                }
            }
        }

        let codes = codesList.join("");
        let outputFlag2 = codeCompatible(codes);
        //色相和为负的情况无法解决，先摆
        if (outputFlag2[1] === 0 || outputFlag2[1] < 0) {
            continue;
        }

        for (let j = 0; j < codesList.length; j++) {
            secondLoop: for (let m = 0; m < algAllList.length; m++) {
                for (let n = 0; n < algAllList[m].length; n++) {
                    if (codesList[j] === algAllList[m][n]) {
                        if (algAllList.length == m + 1) {
                            algAllList.push([]);
                        }
                        algAllList[m + 1].push(codesList[j]);
                        algAllList[m].splice(algAllList[m].indexOf(codesList[j]), 1);
                        inputCodeNum += 1;
                        break secondLoop;
                    }
                }
            }
        }

        document.getElementById("testoutput").innerHTML += i + 'sum orient = ' + outputFlag2[2] + '<br>';

        let twistPos = outputFlag2[3];
        //console.log('otherPos', otherPos);
        // 应该继续测试寻找“sum orient = -”字样
        if (twistPos >= 0 && outputFlag2[2] % div !== 0) {
            document.getElementById("testoutput").innerHTML += 'This codes can be twist,' + ' twistPos=' + twistPos + '<br>';
            for (let j = 0; j < div; j++) {
                let tempcodes = codes + globalState[24 + twistPos * div];
                tempcodes += globalState[24 + twistPos * div + j];
                let tempstate = codeTrans(eBuffer + tempcodes, state);
                let tempsrc1 = m2p(tempstate);
                let tempsrc2 = tempsrc1.slice(0, tempsrc1.length - 1);
                let readcodes = edgeread(tempsrc2).replaceAll(" ", "");
                //console.log('codes === readcodes', j, tempcodes, codes, readcodes);
                if (codes.toLowerCase() === readcodes.toLowerCase()) {
                    codes += globalState[24 + twistPos * div];
                    codes += globalState[24 + twistPos * div + j];
                    //console.log('twisted!', codes, readcodes);
                    break;
                }
            }
        }

        ztimes++;
        state = codeTrans(eBuffer + codes, state);
        let src1 = m2p(state);
        let src2 = src1.slice(0, src1.length - 1);
        let readcodes = edgeread(src2).replaceAll(" ", "");

        codestimes += codes.length;
        document.getElementById("testoutput").innerHTML += src2 + '<br>';
        document.getElementById("testoutput").innerHTML += 'len' + codes.length + '<br>';
        document.getElementById("testoutput").innerHTML += codes.toLowerCase() + '<br>';
        document.getElementById("testoutput").innerHTML += readcodes.toLowerCase() + '<br>';

        if (codes.length === readcodes.length) {
            if (codes.toLowerCase() === readcodes.toLowerCase()) {
                document.getElementById("testoutput").innerHTML += "GOOD!" + '<br>';
            } else {
                document.getElementById("testoutput").innerHTML += "ERROR!" + '<br>';
                etimes++;
            }
        } else {
            if (codes.toLowerCase().slice(0, readcodes.length) === readcodes.toLowerCase()) {
                document.getElementById("testoutput").innerHTML += "GOOD!" + '<br>';
            } else {
                document.getElementById("testoutput").innerHTML += "ERROR!" + '<br>';
                etimes++;
            }
        }

        // if (algAllList[0].length === 0) {
        //     break;
        // }
    }
    document.getElementById("outputP1").innerHTML += 'get num = ' + ztimes + ', err num = ' + etimes + ', codes num = ' + codestimes + '.' + '<br>';
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        document.getElementById('popup').style.display = 'none';
    }
});