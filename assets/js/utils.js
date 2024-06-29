"use strict";

function shuffle(array) {
    let res = [], random;
    while (array.length) {
        random = Math.floor(Math.random() * array.length);
        res.push(array[random]);
        array.splice(random, 1);
    }
    return res;
}

function isAlphabet(char) {
    const code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function findDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

function hasUniqueElements(arr) {
    return new Set(arr).size === arr.length;
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

