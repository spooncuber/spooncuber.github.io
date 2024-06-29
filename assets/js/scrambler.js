"use strict";

const template = [
    "R", "L", "F", "B", "U", "D", "R2", "L2", "F2", "B2", "U2", "D2", "R'", "L'", "F'", "B'", "U'", "D'",
];

function getScramble() {
    let moveList = [];
    for (let i = 0; i < 100; i++) {
        var randomPos = Math.floor(Math.random() * 18);
        if (i == 0) {
            moveList.push(template[randomPos]);
        }
        else {
            if (template[randomPos][0] != moveList.slice(-1).toString()[0]) {
                if (i > 1 && template[randomPos][0] != moveList.slice(-2).toString()[0]) {
                    moveList.push(template[randomPos]);
                }
            }
        }
        if (moveList.length == 20) {
            break;
        }
    }   
    return moveList.join(" ");
}
