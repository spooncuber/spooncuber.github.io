"use strict";

const globalState = 'ABCDEFGHIJKLWMNOPQRSTXYZabcdefghijklmnopqrstwxyz123456';
const eglobalState = 'abcdefghijklmnopqrstwxyz';
const cglobalState = 'ABCDEFGHIJKLWMNOPQRSTXYZ';

function m2p(input_state) {
    // globalState is cube's code in chichu with chichu's order
    // cube's code in CE with chichu's order
    var color = 'uflulbubrurfdlfdbldrbdfrufuluburdfdldbdrfrflblbrudfbrl';
    // code's code in chichu with CE's order (the face's order is urfdlb）
    var order = 'DeGc1gAaJKhIr5zZpSBbLs3qNjYWiXk2oOmREdCx6tQlMHfFy4wTnP';
    // DeGc1gAaJ KhIr5zZpS BbLs3qNjY WiXk2oOmR EdCx6tQlM HfFy4wTnP (this line is set to check clearly)

    var m2pCodeList = [];

    for (let i = 0; i < input_state.length; i += 1) {
        var chichu = input_state[globalState.indexOf(order[i])];
        m2pCodeList.push(color[globalState.indexOf(chichu)]);
    }

    var m2pCode = m2pCodeList.join("").toUpperCase();

    var search = new min2phase.Search();
    var ret = search.solution(m2pCode, 21);
    ret = ret.replaceAll("  ", " ");
    return ret;
}

function integreteCode(first_input, second_input, input_state) {

    var output_state = codeTrans(first_input, input_state);
    output_state = codeTrans(second_input, output_state);

    return output_state;
}

function codeTrans(input_code, input_state) {
    // test input data
    // input_code = 'angqy'
    // input_state = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    //                'W', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'X', 'Y', 'Z',
    //                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    //                'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z',
    //                '1', '2', '3', '4', '5', '6']

    // first assign input to output
    var output_state = input_state;

    // transfer code by exchanging every two code. (1 a-n; 2 a-g; 3 a-q; 4 a-y)
    for (let i = 0; i < input_code.length; i += 1) {
        output_state = exCode([input_code[0], input_code[i]], output_state);
    }
    return output_state;
}

// Input two codes and state and output the state with exchanging of the two codes
function exCode(input_code, input_state) {
    // recognize which group current code is.(corner, edge or centre)
    const { div, indexNum } = groupRecog(input_code[0]);

    // theindexOfes of two code in globalState
    var index1 = globalState.indexOf(input_code[0]) - indexNum;
    var index2 = globalState.indexOf(input_code[1]) - indexNum;

    // assign input_state to output_state
    var output_list = Array.from(input_state);
    // exchange two position of codes with new order
    for (let i = 0; i < div; i += 1) {
        var order1 = reOrder(index1, div);
        var order2 = reOrder(index2, div);
        output_list[order1[i] + indexNum] = input_state[order2[i] + indexNum];
        output_list[order2[i] + indexNum] = input_state[order1[i] + indexNum];
    }
    var output_state = output_list.join("");
    return output_state;
}

// this function defines the exchanging order
// input a number and divisor, output a list with new order
// for example, input(1,3) to output [1 2 0];(17,3) to [17 15 16]; (5,2) to output (5,4).
function reOrder(num, div) {
    // if input (17, 3) the first of list will be 15
    var order_first = ~~(num / div) * div;

    var order_double, order_output;
    if (div == 3) {
        // extend 17 to [15 16 17 15 16 17]
        order_double = [order_first, order_first + 1, order_first + 2, order_first, order_first + 1, order_first + 2];
        // reOrder list from 17, and output 17 15 16&
        order_output = [order_double[order_double.indexOf(num)], order_double[order_double.indexOf(num) + 1], order_double[order_double.indexOf(num) + 2]];
    }
    else if (div == 2) {
        order_double = [order_first, order_first + 1, order_first, order_first + 1];
        order_output = [order_double[order_double.indexOf(num)], order_double[order_double.indexOf(num) + 1]];
    }
    else {
        order_double = [order_first, order_first];
        order_output = [order_double[order_double.indexOf(num)]];
    }
    return order_output;
}

function groupRecog(input_code) {
    // if it"s corner code, then the divisor(orientations) will be 3 and it"s first num is 0. edge"s are 2 and 24
    var div, indexNum;
    if (input_code.charCodeAt() >= 65 && input_code.charCodeAt() <= 90) {
        div = 3;
        indexNum = 0;
    }
    else if (input_code.charCodeAt() >= 97 && input_code.charCodeAt() <= 122) {
        div = 2;
        indexNum = 24;
    }
    else {
        div = 1;
        indexNum = 48;
    }
    return { div, indexNum };
}

function algSetGenerator(codes) {

    // global cube state(0-23 mean corners; 24-47 mean edges; 48-55 mean centre). It"s a constant.
    const { div, indexNum } = groupRecog(codes[0]);

    var posList = []

    for (let i = 0; i < codes.length; i += 1) {
        posList.push(~~((globalState.indexOf(codes[i]) - indexNum) / div));
    }

    var alg_set = [];
    // add corner alg set
    for (let i = 0; i < 24; i += 1) {
        var first_pos = ~~(i / div);
        if (posList.indexOf(first_pos) == -1) {
            for (let j = 0; j < 24; j += 1) {
                var second_pos = ~~(j / div);
                if (second_pos != first_pos && posList.indexOf(second_pos) == -1) {
                    alg_set.push(globalState[i + indexNum] + globalState[j + indexNum]);
                }
            }
        }
    }

    return alg_set;
}

function posChichu(input_code) {
    var pos;
    if (input_code.charCodeAt() >= 65 && input_code.charCodeAt() <= 90) {
        pos = ~~(globalState.indexOf(input_code) / 3);
    }
    else if (input_code.charCodeAt() >= 97 && input_code.charCodeAt() <= 122) {
        pos = ~~((globalState.indexOf(input_code) - 24) / 2);
    }
    else {
        pos = globalState.indexOf(input_code) - 48;
    }
    return pos;
}


function randomEdge(parity) {
    var exTimes = 0;
    var output_state = globalState;
    if (parity === 0) {
        exTimes = 24;
    } else {
        exTimes = 25;
    }

    for (let i = 0; i < exTimes; i++) {
        var code2 = globalState[~~(Math.random() * 22) + 26];
        output_state = exCode(["a", code2], output_state);
    }

    return output_state;
}


function randomCorner(parity) {
    var exTimes = 0;
    var output_state = globalState;
    if (parity === 0) {
        exTimes = 24;
    } else {
        exTimes = 25;
    }

    for (let i = 0; i < exTimes; i++) {
        var code2 = globalState[~~(Math.random() * 21) + 3];
        output_state = exCode(["A", code2], output_state);
    }

    return output_state;
}

function randomCorner1(parity, codeList, output_state) {
    var exTimes = 0;
    if (parity === 0) {
        exTimes = 24;
    } else {
        exTimes = 25;
    }

    let posList = Array.from({ length: 8 }, (_, i) => i);;
    if (codeList.length > 0) {
        let inputList = [];
        for (let i = 0; i < codeList.length; i++) {
            inputList.push(posChichu(codeList[i]));
        }
        posList = posList.filter(item => !inputList.includes(item));
    }
    var pos0 = posList[0];
    posList.splice(0, 1);

    for (let i = 0; i < exTimes; i++) {
        var pos = posList[~~(Math.random() * posList.length)];
        var code = globalState[pos * 3 + ~~(Math.random() * 3)];
        output_state = exCode([globalState[pos0 * 3], code], output_state);
    }

    return output_state;
}
