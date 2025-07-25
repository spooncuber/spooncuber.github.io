"use strict";

let scrList = [];

function cornerfloat() {

    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";
    scrList = [];

    if (document.getElementById("cornerfloatorder").value === "") {
        ejectfloat();
    } else {
        normalfloat();
    }
}


function ejectfloat() {
    let cEjectList = document.getElementById("cornerejectpos").value.toUpperCase().split("");
    let edgeScramble = document.getElementById("edgescramble").checked;

    for (let i = 0; i < 500; i++) {
        let parity = 0;
        switch (Number(document.getElementById("parity").value)) {
            case 0:
                parity = 0;
                break;
            case 1:
                parity = 1;
                break;
            case 2:
                parity = ~~(Math.random() * 2);
                break;
        }

        let state1 = globalState;
        if (edgeScramble) {
            state1 = randomEdge(parity);
        } else {
            if (parity) {
                state1 = codeTrans("ag", state1);
            }
        }
        let state2 = randomCorner1(parity, cEjectList, globalState);

        let state = mergeState(state2, state1);

        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
        scrList.push(m2p(state));
    }

    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成排除模式的500条打乱。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

function normalfloat() {

    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let cBufferList = document.getElementById("cornerfloatorder").value.toUpperCase().split("");
    let cEjectList = document.getElementById("cornerejectpos").value.toUpperCase().split("");
    let edgeScramble = document.getElementById("edgescramble").checked;

    let algAllList1 = [];
    let algAllList0 = [];
    let algSet = algSetGenerator(cBufferList+cEjectList);
    algSet = shuffle(algSet);
    algAllList1.push(algSet);

    let algSet0 = algSetGenerator(cBufferList+cEjectList);
    algSet0 = shuffle(algSet0);
    algAllList0.push(algSet0);
    let times = 0;
    for (let i = 0; i < 10000; i++) {

        let parity = 0;
        switch (Number(document.getElementById("parity").value)) {
            case 0:
                parity = 0;
                break;
            case 1:
                parity = 1;
                break;
            case 2:
                parity = ~~(Math.random() * 2);
                break;
        }

        let state = globalState;
        if (edgeScramble) {
            state = randomEdge(parity);
        } else {
            if (parity) {
                state = codeTrans("ag", state);
            }
        }

        let pos = [];
        let listtemp = cBufferList.concat(cBufferList);
        for (let i = 0; i < listtemp.length; i++) {
            pos.push(posChichu(listtemp[i].toString()));
        }

        let codes = Array.from(cBufferList);
        for (let j = 0; j < ~~(Math.random() * (4 - Math.floor((cEjectList.length + 1)) / 2) - parity); j++) {
            let breakFlag = 0;
            for (let m = 0; m < algAllList1.length; m++) {
                for (let n = 0; n < algAllList1[m].length; n++) {
                    let code = algAllList1[m][n];
                    if (pos.indexOf(posChichu(code[0])) === -1 && pos.indexOf(posChichu(code[1])) === -1) {
                        pos.push(posChichu(code[0]));
                        pos.push(posChichu(code[1]));
                        codes[1] += code;
                        if (algAllList1.length == m + 1) {
                            algAllList1.push([]);
                        }
                        algAllList1[m + 1].push(code);
                        algAllList1[m].splice(algAllList1[m].indexOf(code), 1);
                        breakFlag = 1;
                        break;
                    }
                }
                if (breakFlag === 1) {
                    break;
                }
            }
        }

        for (let j = 0; j < (7 - cEjectList.length - codes[1].length) / 2 - parity; j++) {
            var breakFlag = 0;
            for (let m = 0; m < algAllList0.length; m++) {
                for (let n = 0; n < algAllList0[m].length; n++) {
                    let code = algAllList0[m][n];
                    if (pos.indexOf(posChichu(code[0])) === -1 && pos.indexOf(posChichu(code[1])) === -1) {
                        pos.push(posChichu(code[0]));
                        pos.push(posChichu(code[1]));
                        codes[0] += code;
                        if (algAllList0.length == m + 1) {
                            algAllList0.push([]);
                        }
                        algAllList0[m + 1].push(code);
                        algAllList0[m].splice(algAllList0[m].indexOf(code), 1);
                        breakFlag = 1;
                        break;
                    }
                }
                if (breakFlag === 1) {
                    break;
                }
            }
        }

        if (parity === 1) {
            let allpos = Array.from({ length: 7 }, (_, i) => i + 1);
            let otherpos = allpos.filter(item => !pos.includes(item));
            let choosepos = otherpos[~~(Math.random() * otherpos.length)];
            let paritycode = globalState[choosepos*3+~~(Math.random() * 3)];
            codes[~~(Math.random() * 2)] += paritycode;
        }

        state = codeTrans(codes[1], state);
        state = codeTrans(codes[0], state);
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
        times += 1;
        // console.log(codes[0], codes[1], algAllList1, algAllList1[0].length, algAllList1[0]);
        // console.log('algAllList1[0].length',algAllList1[0].length);
        if (algAllList1[0].length === 0) {
            break;
        }
    }
    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成遍历副缓冲" + cBufferList[1].toUpperCase() + "全部公式的" + times + "条打乱。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

window.onload = function () {
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "<b>输出信息统计: </b>";
}

// function backup() {

//     document.getElementById("outputScrs").value = "";
//     document.getElementById("outputInfo").value = "输出信息统计:";

//     let cBufferList = document.getElementById("cornerfloatorder").value.split("");
//     let edgeScramble = document.getElementById("edgescramble").checked;
//     let twoCorner = document.getElementById("twocorner").checked;

//     if (twoCorner) {
//         let times = 0;
//         let algAllList = [];
//         let algSet = algSetGenerator(cBufferList);
//         algSet = shuffle(algSet);
//         algAllList.push(algSet);

//         for (let i = 0; i < 10000; i++) {
//             let state;
//             if (edgeScramble) {
//                 state = randomEdge(1);
//             } else {
//                 state = globalState;
//             }

//             let pos = [];
//             pos.push(posChichu(cBufferList[0].toString()));
//             let codes = [cBufferList[0].toString(), ""];

//             while (codes[1].length < 2) {
//                 let code = cglobalState[~~(Math.random() * cglobalState.length)];
//                 if (pos.indexOf(posChichu(code)) === -1) {
//                     codes[1] += code;
//                     pos.push(posChichu(code));
//                 }
//             }

//             for (let j = 0; j < 4; j++) {
//                 var breakFlag = 0;
//                 for (let m = 0; m < algAllList.length; m++) {
//                     for (let n = 0; n < algAllList[m].length; n++) {
//                         let code = algAllList[m][n];
//                         if (pos.indexOf(posChichu(code[0])) === -1 && pos.indexOf(posChichu(code[1])) === -1) {
//                             pos.push(posChichu(code[0]));
//                             pos.push(posChichu(code[1]));
//                             codes[0] += code;
//                             if (algAllList.length == m + 1) {
//                                 algAllList.push([]);
//                             }
//                             algAllList[m + 1].push(code);
//                             algAllList[m].splice(algAllList[m].indexOf(code), 1);
//                             breakFlag = 1;
//                             break;
//                         }
//                     }
//                     if (breakFlag === 1) {
//                         break;
//                     }
//                 }
//             }

//             state = codeTrans(codes[1], state);
//             state = codeTrans(codes[0], state);
//             document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
//             times += 1;
//             console.log(codes[0], codes[1],);
//             console.log('algAllList[0].length', algAllList[0].length);
//             if (algAllList[0].length === 0) {
//                 break;
//             }
//         }
//         document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成 " + times + "条打乱。";
//         if (document.getElementById("outputScrs").value != "") {
//             document.getElementById("copyBtn").style.display = "block";
//         }
//     }
//     document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成遍历副缓冲" + cBufferList[1].toUpperCase() + "全部公式的" + times + "条打乱。";
//     if (document.getElementById("outputScrs").value != "") {
//         document.getElementById("copyBtn").style.display = "block";
//     }
// }