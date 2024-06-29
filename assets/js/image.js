"use strict";

$.ajaxSettings.async = false;
const jsonNameList = ["imageAlgToInfo"];
const jsonLoaded = jsonNameList.map((name) => $.getJSON(`assets/json/${name}.json`, (json) => {
    window[`${name}`] = json;
}));

function vw(v) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return v * w / 100;
}

function algSearch() {
    let idValueOrigin = document.getElementById("imageinput").value;
    if (typeof idValueOrigin === "undefined") {
        return;
    }
    idValueOrigin = idValueOrigin.toUpperCase();
    const idValue = idValueOrigin[0] + idValueOrigin[1];
    const div1 = document.getElementById("div1");
    if (imageAlgToInfo.hasOwnProperty(idValue)) {
        if (document.getElementById("imageinput") === document.activeElement) {
            document.getElementById("imageinput").blur();
        }
        const rows = imageAlgToInfo[idValue].length;
        let tab = "";
        const maxMod = Math.floor(vw(95) / 95);
        for (let i = 0; i < rows; i++) {
            if (i % maxMod === 0) {
                tab += "<tr>";
            }
            tab += `<td style='width:95px'>${imageAlgToInfo[idValue][i]}</td>`;
            if ((i + 1) % maxMod === 0) {
                tab += "</tr>";
            }
        }
        if (tab !== "") {
            tab = `<table id="table"><tbody>${tab}</tbody></table>`;
        }
        div1.innerHTML = tab;
    } else {
        div1.innerHTML = "";
    }
}