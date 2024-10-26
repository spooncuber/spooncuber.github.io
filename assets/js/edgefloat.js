"use strict";

// function edgefloat() {
    
//     document.getElementById("outputScrs").value = "";
//     document.getElementById("outputInfo").value = "输出信息统计:";

//     let eBufferList = document.getElementById("edgefloatorder").value.toLowerCase().split("");
//     let eEjectList = document.getElementById("edgeejectpos").value.toLowerCase().split("");
//     let cornerScramble = document.getElementById("cornerscramble").checked;

//     let algAllList = [];
//     for(let i=0; i<eBufferList.length; i++){
//         let algSet = algSetGenerator(eBufferList.slice(0,i+1).concat(eEjectList));
//         algSet = shuffle(algSet);
//         algAllList.push([]);
//         algAllList[algAllList.length-1].push(algSet);
//     }
//     console.log("algAllList",algAllList)

//     let times = 0;
//     for (let i = 0; i < 10000; i++) {

//         let state = globalState;
//         if(cornerScramble){
//             state = randomCorner(0);
//         }

//         let pos = [];
//         let listtemp = eBufferList.concat(eEjectList);
//         for(let j=0; j < listtemp.length; j++){
//             pos.push(posChichu(listtemp[j].toString()));
//         }
        
//         let codes = Array.from(eBufferList);
//         let chooseNumList = [];
//         for(let j=0; j<eBufferList.length; j++){
//             chooseNumList.push(~~(Math.random() * 5));
//         }

//         for(let j=0; j<eBufferList.length; j++){

//         }

//         for (let j = 0; j < 5; j++) {
//             let breakFlag = 0;
//             for (let m = 0; m < algAllList1.length; m++) {
//                 for (let n = 0; n < algAllList1[m].length; n++) {
//                     let code = algAllList1[m][n];
//                     if (pos.indexOf(posChichu(code[0])) === -1 && pos.indexOf(posChichu(code[1])) === -1) {
//                         pos.push(posChichu(code[0]));
//                         pos.push(posChichu(code[1]));
//                         codes[1] += code;
//                         if (algAllList1.length == m + 1) {
//                             algAllList1.push([]);
//                         }
//                         algAllList1[m + 1].push(code);
//                         algAllList1[m].splice(algAllList1[m].indexOf(code), 1);
//                         breakFlag = 1;
//                         break;
//                     }
//                 }
//                 if (breakFlag === 1) {
//                     break;
//                 }
//             }
//         }

//         state = codeTrans(codes[1], state);
//         state = codeTrans(codes[0], state);
//         document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
//         times += 1;
//         // console.log(codes[0], codes[1], algAllList1, algAllList1[0].length, algAllList1[0]);
//         if (algAllList1[0].length === 0) {
//             break;
//         }
//     }

//     document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成遍历副缓冲" + eBufferList[1].toUpperCase() + "全部公式的" + times + "条打乱。";
//     if (document.getElementById("outputScrs").value != "") {
//         document.getElementById("copyBtn").style.display = "block";
//     }
// }

function edgefloat() {
    
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "输出信息统计:";

    let eBufferList = document.getElementById("edgefloatorder").value.toLowerCase().split("");
    let eEjectList = document.getElementById("edgeejectpos").value.toLowerCase().split("");
    let cornerScramble = document.getElementById("cornerscramble").checked;
    let algAllList1 = [];
    let algAllList0 = [];
    let algSet = algSetGenerator(eBufferList+eEjectList);
    algSet = shuffle(algSet);
    algAllList1.push(algSet);
    
    let algSet0 = algSetGenerator(eBufferList+eEjectList);
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
        if(cornerScramble){
            state = randomCorner(parity);
        }else{
            if(parity){
                state = codeTrans("JG", state);
            }
        }

        let pos = [];
        let listtemp = eBufferList.concat(eEjectList);
        for(let i=0; i < listtemp.length; i++){
            pos.push(posChichu(listtemp[i].toString()));
        }
        let codes = Array.from(eBufferList);
        for (let j = 0; j < ~~(Math.random() * (4 - Math.floor((eEjectList.length + 1) / 2) - parity)); j++) {
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

        for (let j = 0; j < (11 - eEjectList.length - codes[1].length) / 2 - parity; j++) {
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
            let allpos = Array.from({ length: 11 }, (_, i) => i + 1);
            let otherpos = allpos.filter(item => !pos.includes(item));
            let choosepos = otherpos[~~(Math.random() * otherpos.length)];
            let paritycode = globalState[24+choosepos*2+~~(Math.random() * 2)];
            codes[~~(Math.random() * 2)] += paritycode;
        }

        state = codeTrans(codes[1], state);
        state = codeTrans(codes[0], state);
        document.getElementById("outputScrs").value += (i + 1).toString() + ". " + m2p(state) + "\n";
        times += 1;
        // console.log(codes[0], codes[1], algAllList1, algAllList1[0].length, algAllList1[0]);
        if (algAllList1[0].length === 0) {
            break;
        }
    }

    document.getElementById("outputInfo").innerHTML = "<b>输出信息统计: </b>已生成遍历副缓冲" + eBufferList[1].toUpperCase() + "全部公式的" + times + "条打乱。";
    if (document.getElementById("outputScrs").value != "") {
        document.getElementById("copyBtn").style.display = "block";
    }
}

window.onload = function () {
    document.getElementById("outputScrs").value = "";
    document.getElementById("outputInfo").value = "<b>输出信息统计: </b>";
}