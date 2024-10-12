"use strict";


window.onload = function () {
    nextBlock();    
}

function nextBlock(){

    start();

    // const colorMap = new Map();
    // colorMap['A', '#FFFF00');
    // colorMap['D', '#FFFF00');
    // colorMap['G', '#FFFF00');
    // colorMap['J', '#FFFF00');

    // colorMap['W', '#FFFFFF');
    // colorMap['O', '#FFFFFF');
    // colorMap['R', '#FFFFFF');
    // colorMap['X', '#FFFFFF');
    
    // colorMap['K', '#00FF00');
    // colorMap['I', '#00FF00');
    // colorMap['S', '#00FF00');
    // colorMap['Z', '#00FF00');

    // colorMap['C', '#0000FF');
    // colorMap['E', '#0000FF');
    // colorMap['Q', '#0000FF');
    // colorMap['M', '#0000FF');
    
    // colorMap['L', '#0000FF');
    // colorMap['B', '#0000FF');
    // colorMap['N', '#0000FF');
    // colorMap['Y', '#0000FF');
    
    // colorMap['F', '#FF9900');
    // colorMap['H', '#FF9900');
    // colorMap['P', '#FF9900');
    // colorMap['T', '#FF9900');

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

    let chooseCode = codeList[Math.floor(Math.random() * codeList.length)].toString();
    let orient = Math.floor(Math.random() * 3);
    let codecode = chooseCode.concat(chooseCode);
    console.log(codecode);
    let code0 = codecode[0+orient];
    let code1 = codecode[1+orient];
    let code2 = codecode[2+orient];
    console.log(code0,code1,code2);
    console.log(colorMap[code0]);

    let canvas=document.getElementById('myCanvas');
    let ctx=canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.lineJoin = "round";
    
    let centerP = [250,200];
    let topP = [250,20];
    let bottomP = [250,430];
    let leftAP = [50,100];
    let leftBP = [60,315];
    let rightAP = [450,100];
    let rightBP = [440,315];
    
    drawPoly(ctx,[topP,leftAP,centerP,rightAP],'#999999',10);
    drawPoly(ctx,[rightAP,rightBP,bottomP,centerP],'#999999',10);
    drawPoly(ctx,[leftAP,leftBP,bottomP,centerP],'#999999',10);

    let pointList;
    pointList = [[topP[0],topP[1]+12],[rightAP[0]-25,rightAP[1]],[centerP[0],centerP[1]-12],[leftAP[0]+25,leftAP[1]]];
    drawPoly(ctx,pointList,colorMap[code0],5);
    pointList = [[centerP[0]-10,centerP[1]+10],[leftAP[0]+12,leftAP[1]+20],[leftBP[0]+10,leftBP[1]-8],[bottomP[0]-10,bottomP[1]-20]];
    drawPoly(ctx,pointList,colorMap[code1],5);
    pointList = [[centerP[0]+10,centerP[1]+10],[rightAP[0]-12,rightAP[1]+20],[rightBP[0]-10,rightBP[1]-8],[bottomP[0]+10,bottomP[1]-20]];
    drawPoly(ctx,pointList,colorMap[code2],5);

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
