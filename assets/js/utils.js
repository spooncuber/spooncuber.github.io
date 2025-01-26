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
    if(code === 85 || code === 86 || code === 117 || code === 118){
        return false;
    }else if((code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
        return true;
    }
    return false;
}

function findDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

function hasUniqueElements(arr) {
    return new Set(arr).size === arr.length;
}

function showPopup() {
    document.getElementById("popup").style.display = "block";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

function clearPopup(){    
    let result = confirm("确认清空输入编码吗？");  
    if (result) {
        document.getElementById("inputCodes").value = "";
    }
}

function hideJump() {
    document.getElementById("jumpdiv").style.display = "none";
}

function copyScrs() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(document.getElementById("outputScrs").value);
        alert('一键复制成功！');
    }else{
        alert('当前设备暂不支持一键复制，请手动全选复制。');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});

function isPC() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
        document.getElementById("innerdiv").style.width = $('html').css('max-width');
        alert('mobile');
    } else {
        document.getElementById("innerdiv").style.width = $('html').css('max-width') / 2;
        alert('pc');
    }
}
