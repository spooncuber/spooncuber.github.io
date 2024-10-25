"use strict";

let resultList = [];
let rightList = [];
let chooseList = [];
let clicktimes = 0;
let righttimes = 0;
let timeA;
let chooseIdx = 0;
let randomIdx = 0;

function beginPractice(){
    resultList = [];
    rightList = [];
    chooseList = [];
    clicktimes = 0;
    righttimes = 0;
    timeA = new Date();
    document.getElementById('modeset').style.display = "none";
    document.getElementById('canvasContainer').style.display = "block";
    nextBlock();  
    start();
}

function exitPractice(){
    document.getElementById('modeset').style.display = "block";
    document.getElementById('canvasContainer').style.display = "none";
    let table = document.getElementById("resulttable");  
    let rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      rows[i].innerHTML = "";
    }
}

function hidePopupBlock() {
    document.getElementById("popup").style.display = "none";
    exitPractice();
}

function nextBlock0(){
    chooseIdx = 0;
    nextBlock();
}
function nextBlock1(){
    chooseIdx = 1;
    nextBlock();
}
function nextBlock2(){
    chooseIdx = 2;
    nextBlock();
}
function nextBlock3(){
    chooseIdx = 3;
    nextBlock();
}

function finishPractice(){
    stop();
    document.getElementById("popup").style.display = "block";
    let table = document.getElementById("resulttable");  
    let endTime = new Date();
    let precise = (righttimes/Number(document.getElementById('practicenum').value)*100).toFixed(2);
    document.getElementById("resulttext").innerHTML = "已完成！耗时" + (endTime - startTime)/1000 + "s，正确率" + precise + "%";

    for(let i=0; i<resultList.length; i++){
        let newRow = table.insertRow(-1); // 在表格末尾添加新行
        let newCell0 = newRow.insertCell(0); // 在新行中添加新单元格
        let newCell1 = newRow.insertCell(1); // 在新行中添加新单元格 
        let newCell2 = newRow.insertCell(2); // 在新行中添加新单元格 
        let newCell3 = newRow.insertCell(3); // 在新行中添加新单元格 
        newCell0.innerHTML = i+1; // 设置单元格内容
        newCell1.innerHTML = chooseList[i]; // 设置单元格内容
        newCell2.innerHTML = resultList[i] + "s"; // 设置单元格内容    
        newCell3.innerHTML = rightList[i]; // 设置单元格内容
    } 
    resultList = [];
    clicktimes = 0;
}

function nextBlock(){
    if(clicktimes > 0){
        if(randomIdx === chooseIdx){
            righttimes++;
            rightList.push("✔");
        }else{
            rightList.push("✖");
        }
        
        let endTime = new Date();
        resultList.push((endTime - timeA)/1000);
        timeA = new Date();
    }

    if(clicktimes == Number(document.getElementById('practicenum').value)){
        finishPractice();
    }
    clicktimes++;

    const colorMap = {};
    colorMap['A'] = "#FFFF00";
    colorMap['D'] = "#FFFF00";
    colorMap['G'] = "#FFFF00";
    colorMap['J'] = "#FFFF00";
    colorMap['W'] = "#FFFFFF";
    colorMap['O'] = "#FFFFFF";
    colorMap['R'] = "#FFFFFF";
    colorMap['X'] = "#FFFFFF";
    colorMap['K'] = '#00FF00';
    colorMap['I'] = '#00FF00';
    colorMap['S'] = '#00FF00';
    colorMap['Z'] = '#00FF00';
    colorMap['C'] = '#0000FF';
    colorMap['E'] = '#0000FF';
    colorMap['Q'] = '#0000FF';
    colorMap['M'] = '#0000FF';
    colorMap['L'] = '#FF0000';
    colorMap['B'] = '#FF0000';
    colorMap['N'] = '#FF0000';
    colorMap['Y'] = '#FF0000';
    colorMap['F'] = '#FF9900';
    colorMap['H'] = '#FF9900';
    colorMap['P'] = '#FF9900';
    colorMap['T'] = '#FF9900';

    let codeALL = ["ABC","DEF","GHI","JKL","WMN","OPQ","RST","XYZ"];

    let codeList = [];
    for(let i=0; i<4; i++){
        let idx = Math.floor(Math.random() * codeALL.length);        
        codeList.push(codeALL.splice(idx,1));
    }
    document.getElementById('code0').innerHTML = codeList[0];
    document.getElementById('code1').innerHTML = codeList[1];
    document.getElementById('code2').innerHTML = codeList[2];
    document.getElementById('code3').innerHTML = codeList[3];

    randomIdx = Math.floor(Math.random() * codeList.length);
    let chooseCode = codeList[randomIdx].toString();
    chooseList.push(chooseCode);
    let orient = Math.floor(Math.random() * 3);
    let codecode = chooseCode.concat(chooseCode);
    //console.log(codecode);
    let code0 = codecode[0+orient];
    let code1 = codecode[1+orient];
    let code2 = codecode[2+orient];
    //console.log(code0,code1,code2);
    //console.log(colorMap[code0]);

    let canvas=document.getElementById('myCanvas');
    let ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.lineJoin = "round";
    
    // let centerP = [250,200];
    // let topP = [250,20];
    // let bottomP = [250,430];
    // let leftAP = [50,100];
    // let leftBP = [60,315];
    // let rightAP = [450,100];
    // let rightBP = [440,315];
    
    // drawPoly(ctx,[topP,leftAP,centerP,rightAP],'#999999',10);
    // drawPoly(ctx,[rightAP,rightBP,bottomP,centerP],'#999999',10);
    // drawPoly(ctx,[leftAP,leftBP,bottomP,centerP],'#999999',10);

    // let pointList;
    // pointList = [[topP[0],topP[1]+8],[rightAP[0]-25,rightAP[1]-3],[centerP[0],centerP[1]-15],[leftAP[0]+25,leftAP[1]-3]];
    // drawPoly(ctx,pointList,colorMap[code0],5);
    // pointList = [[centerP[0]-10,centerP[1]+10],[leftAP[0]+12,leftAP[1]+20],[leftBP[0]+10,leftBP[1]-8],[bottomP[0]-10,bottomP[1]-20]];
    // drawPoly(ctx,pointList,colorMap[code1],5);
    // pointList = [[centerP[0]+10,centerP[1]+10],[rightAP[0]-12,rightAP[1]+20],[rightBP[0]-10,rightBP[1]-8],[bottomP[0]+10,bottomP[1]-20]];
    // drawPoly(ctx,pointList,colorMap[code2],5);

    let centerP = [125,100];
    let topP = [125,10];
    let bottomP = [125,215];
    let leftAP = [25,50];
    let leftBP = [30,158];
    let rightAP = [225,50];
    let rightBP = [220,158];
    
    drawPoly(ctx,[topP,leftAP,centerP,rightAP],'#999999',4);
    drawPoly(ctx,[rightAP,rightBP,bottomP,centerP],'#999999',4);
    drawPoly(ctx,[leftAP,leftBP,bottomP,centerP],'#999999',4);

    let pointList;
    pointList = [[topP[0],topP[1]+4],[rightAP[0]-12,rightAP[1]-2],[centerP[0],centerP[1]-8],[leftAP[0]+12,leftAP[1]-2]];
    drawPoly(ctx,pointList,colorMap[code0],2);
    pointList = [[centerP[0]-5,centerP[1]+5],[leftAP[0]+6,leftAP[1]+10],[leftBP[0]+5,leftBP[1]-4],[bottomP[0]-5,bottomP[1]-10]];
    drawPoly(ctx,pointList,colorMap[code1],2);
    pointList = [[centerP[0]+5,centerP[1]+5],[rightAP[0]-6,rightAP[1]+10],[rightBP[0]-5,rightBP[1]-4],[bottomP[0]+5,bottomP[1]-10]];
    drawPoly(ctx,pointList,colorMap[code2],2);

}

function drawPoly(ctx,pointList,color,lineWidth){
    ctx.lineWidth = lineWidth;
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(pointList[0][0],pointList[0][1])
    for(let i = 1; i< pointList.length; i++){
        ctx.lineTo(pointList[i][0],pointList[i][1]); 
    }
    ctx.closePath();
    ctx.stroke(); //绘制路径。
    ctx.fill();
}
