import{a as O,d as h,e as B,f as D,g as L,h as r,i as C,j as p,k as g,n as G,o as F,q as M}from"./chunk-MQGUF25V.js";import{c as v}from"./chunk-QR7PKRAV.js";import{j as N,k as S}from"./chunk-WHNYGZCR.js";import{b as y}from"./chunk-YJ5RMHHJ.js";var _={333:{puzzleID:"3x3x3",eventName:"3x3x3 Cube"},222:{puzzleID:"2x2x2",eventName:"2x2x2 Cube"},444:{puzzleID:"4x4x4",eventName:"4x4x4 Cube"},555:{puzzleID:"5x5x5",eventName:"5x5x5 Cube"},666:{puzzleID:"6x6x6",eventName:"6x6x6 Cube"},777:{puzzleID:"7x7x7",eventName:"7x7x7 Cube"},"333bf":{puzzleID:"3x3x3",eventName:"3x3x3 Blindfolded"},"333fm":{puzzleID:"3x3x3",eventName:"3x3x3 Fewest Moves"},"333oh":{puzzleID:"3x3x3",eventName:"3x3x3 One-Handed"},clock:{puzzleID:"clock",eventName:"Clock"},minx:{puzzleID:"megaminx",eventName:"Megaminx"},pyram:{puzzleID:"pyraminx",eventName:"Pyraminx"},skewb:{puzzleID:"skewb",eventName:"Skewb"},sq1:{puzzleID:"square1",eventName:"Square-1"},"444bf":{puzzleID:"4x4x4",eventName:"4x4x4 Blindfolded"},"555bf":{puzzleID:"5x5x5",eventName:"5x5x5 Blindfolded"},"333mbf":{puzzleID:"3x3x3",eventName:"3x3x3 Multi-Blind"}};function de(n){return _[n]??null}var J={..._,fto:{puzzleID:"fto",eventName:"Face-Turning Octahedron"},master_tetraminx:{puzzleID:"master_tetraminx",eventName:"Master Tetraminx"},kilominx:{puzzleID:"kilominx",eventName:"Kilominx"},redi_cube:{puzzleID:"redi_cube",eventName:"Redi Cube"},loopover:{puzzleID:"loopover",eventName:"Loopover"}};function ze(n){return J[n]??null}var E={id:"2x2x2",fullName:"2\xD72\xD72 Cube",kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).cube2x2x2JSON)),svg:async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).cube2x2x2SVG,llSVG:r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).cube2x2x2LLSVG),pg:r(async()=>C("2x2x2")),stickeringMask:n=>D(E,n),stickerings:()=>L("2x2x2",{use3x3x3Fallbacks:!0})};function l(n,t,i,o){let e=[];for(let c of n){let m=S.fromString(c),{family:a,amount:x}=m;if(![-1,1].includes(x))throw new Error("Invalid config move");e.push({family:a,direction:x,type:t,from:i,to:o})}return e}var d={"x axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...l(["R"],0,0,3),...l(["L'"],1,0,3),...l(["r","Rw"],2,0,2),...l(["l'","Lw'"],3,0,2),...l(["M'"],4,1,2),...l(["x","Uv","Dv'"],5,0,3)]},"y axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...l(["U"],0,0,3),...l(["D'"],1,0,3),...l(["u","Uw"],2,0,2),...l(["d'","Dw'"],3,0,2),...l(["E'"],4,1,2),...l(["y","Uv","Dv'"],5,0,3)]},"z axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...l(["F"],0,0,3),...l(["B'"],1,0,3),...l(["f","Fw"],2,0,3),...l(["b'","Bw'"],3,0,3),...l(["S"],4,1,2),...l(["z","Fv","Bv'"],5,0,3)]}},I={};for(let[n,t]of Object.entries(d))for(let i of t.moveSourceInfos)I[i.family]={axis:n,moveSourceInfo:i};var R={},V;for(let n of Object.keys(d)){let t={};R[n]=t;for(let i of d[n].moveSourceInfos)(t[V=i.type]??(t[V]=[])).push(i)}var U={};for(let n of Object.keys(d)){let t=new Map;U[n]=t;for(let i of d[n].moveSourceInfos)t.get(i.from)||t.set(i.from,i)}function T(n,t){let i=R[n][t]?.[0];if(!i)throw new Error(`Could not find a reference move (axis: ${n}, move source type: ${t})`);return i}var A=(n,t)=>I[n.family].axis===I[t.family].axis;function H(n,t,i,o){if(t+1===i){let s=U[n].get(t);if(s)return new S(new N(s.family),o*s.direction)}let e=d[n],{sliceDiameter:c}=e;if(t===0&&i===c){let s=T(n,5);return new S(new N(s.family),o*s.direction)}let m=t+i>c;m&&([t,i]=[c-i,c-t]);let a=t+1,x=i,f=a===x;f&&(x=null),a===1&&(a=null),f&&a===1&&(x=null),!f&&x===2&&(x=null);let w=T(n,f?m?1:0:m?3:2);return new S(new N(w.family,x,a),o*w.direction)}function $(n,t=!0){if(n.length===0)return[];let i=I[n[0].family].axis,o=d[i],{sliceDiameter:e}=o,c=new Map,m=null;function a(s,z){let u=(c.get(s)??0)+z;t&&(u=u%4+5%4-1),u===0?c.delete(s):c.set(s,u)}let x=0;for(let s of Array.from(n).reverse()){x++;let{moveSourceInfo:z}=I[s.family],u=s.amount*z.direction;switch(z.type){case 0:{let b=(s.innerLayer??1)-1;a(b,u),a(b+1,-u);break}case 1:{let b=e-(s.innerLayer??1);a(b,u),a(b+1,-u);break}case 2:{a((s.outerLayer??1)-1,u),a(s.innerLayer??2,-u);break}case 3:{a(e-(s.innerLayer??2),u),a(e-((s.outerLayer??1)-1),-u);break}case 4:{a(z.from,u),a(z.to,-u);break}case 5:{a(0,u),a(e,-u);break}}[0,2].includes(c.size)&&(m={suffixLength:x,sliceDeltas:new Map(c)})}if(c.size===0)return[];if(!m)return n;let[f,k]=m.sliceDeltas.keys();f>k&&([f,k]=[k,f]);let w=m.sliceDeltas.get(f);return[...n.slice(0,-m.suffixLength),...w!==0?[H(i,f,k,w)]:[]]}var j={quantumMoveOrder:()=>4,axis:{areQuantumMovesSameAxis:A,simplifySameAxisMoves:$}},q={id:"3x3x3",fullName:"3\xD73\xD73 Cube",inventedBy:["Ern\u0151 Rubik"],inventionYear:1974,kpuzzle:r(async()=>M),svg:r(async()=>(await import("./puzzles-dynamic-3x3x3-JWIWLLZA-22QKJ7RT.js")).cube3x3x3SVG),llSVG:r(async()=>(await import("./puzzles-dynamic-3x3x3-JWIWLLZA-22QKJ7RT.js")).cube3x3x3LLSVG),llFaceSVG:r(async()=>(await import("./puzzles-dynamic-3x3x3-JWIWLLZA-22QKJ7RT.js")).cube3x3x3LLFaceSVG),pg:r(async()=>C("3x3x3")),stickeringMask:n=>D(q,n),stickerings:()=>L("3x3x3"),puzzleSpecificSimplifyOptions:j},K=new g({id:"4x4x4",fullName:"4\xD74\xD74 Cube"});K.llSVG=r(async()=>(await import("./puzzles-dynamic-4x4x4-REUXFQJ4-CZJACY4X.js")).cube4x4x4LLSVG);var Q={id:"clock",fullName:"Clock",inventedBy:["Christopher C. Wiggs","Christopher J. Taylor"],inventionYear:1988,kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).clockJSON)),svg:r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).clockSVG)};async function Z(n,t){let i=await n.kpuzzle(),o=new h(i),e=new B(i),c=()=>e.and([e.move("U"),e.not(e.or(e.moves(["F","BL","BR"])))]),m=()=>e.and([e.move("U"),e.not(e.move("F"))]),a=()=>e.or([m(),e.and([e.move("F"),e.not(e.or(e.moves(["U","BL","BR"])))])]),x=()=>e.not(e.or([e.and([e.move("U"),e.move("F")]),e.and([e.move("F"),e.move("BL")]),e.and([e.move("F"),e.move("BR")]),e.and([e.move("BL"),e.move("BR")])])),f=()=>e.not(e.or([e.and([e.move("F"),e.move("BL")]),e.and([e.move("F"),e.move("BR")]),e.and([e.move("BL"),e.move("BR")])]));switch(t){case"full":break;case"experimental-fto-fc":{o.set(e.not(c()),"Ignored");break}case"experimental-fto-f2t":{o.set(e.not(m()),"Ignored"),o.set(c(),"Dim");break}case"experimental-fto-sc":{o.set(e.not(a()),"Ignored"),o.set(m(),"Dim");break}case"experimental-fto-l2c":{o.set(e.not(x()),"Ignored"),o.set(a(),"Dim");break}case"experimental-fto-lbt":{o.set(e.not(f()),"Ignored"),o.set(x(),"Dim");break}case"experimental-fto-l3t":{o.set(f(),"Dim");break}default:console.warn(`Unsupported stickering for ${n.id}: ${t}. Setting all pieces to dim.`),o.set(e.and(e.moves([])),"Dim")}return o.toStickeringMask()}async function W(){return["full","experimental-fto-fc","experimental-fto-f2t","experimental-fto-sc","experimental-fto-l2c","experimental-fto-lbt","experimental-fto-l3t"]}var X=class extends p{constructor(){super({pgID:"FTO",id:"fto",fullName:"Face-Turning Octahedron",inventedBy:["Karl Rohrbach","David Pitcher"],inventionYear:1983});y(this,"stickerings",W);y(this,"svg",r(async()=>(await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).ftoSVG))}stickeringMask(t){return Z(this,t)}},ee=new X,P="d f 0.56",ne={id:"kilominx",fullName:"Kilominx",kpuzzle:r(()=>F(P,{includeCenterOrbits:!1,includeEdgeOrbits:!1})),pg:()=>G(P,{includeCenterOrbits:!1,includeEdgeOrbits:!1}),svg:r(async()=>(await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).kilominxSVG)},te={id:"loopover",fullName:"Loopover",inventedBy:["Cary Huang"],inventionYear:2018,kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).loopoverJSON)),svg:async()=>(await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).loopoverSVG};async function ie(n,t){return(await Y()).includes(t)?D(n,t):(console.warn(`Unsupported stickering for ${n.id}: ${t}. Setting all pieces to dim.`),D(n,"full"))}var re=O(()=>L("megaminx"));function Y(){return re}var ae=class extends p{constructor(){super({id:"megaminx",fullName:"Megaminx",inventionYear:1981});y(this,"stickerings",Y);y(this,"llSVG",r(async()=>(await import("./puzzles-dynamic-megaminx-2LVHIDL4-FKTKNTDX.js")).megaminxLLSVG))}stickeringMask(t){return ie(this,t)}},oe=new ae,se={id:"melindas2x2x2x2",fullName:"Melinda's 2\xD72\xD72\xD72",inventedBy:["Melinda Green"],kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).melindas2x2x2x2OrbitJSON)),svg:r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).melindas2x2x2x2OrbitSVG)},le=class extends p{constructor(){super({id:"pyraminx",fullName:"Pyraminx",inventedBy:["Uwe Meffert"]});y(this,"svg",r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).pyraminxSVG))}},ue=new le,ce={id:"redi_cube",fullName:"Redi Cube",inventedBy:["Oskar van Deventer"],inventionYear:2009,kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).rediCubeJSON)),svg:async()=>(await import("./puzzles-dynamic-unofficial-EE5FDJ3S-EZQLYEZJ.js")).rediCubeSVG},me={id:"square1",fullName:"Square-1",inventedBy:["Karel Hr\u0161el","Vojtech Kopsk\xFD"],inventionYear:1990,kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).sq1HyperOrbitJSON)),svg:r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).sq1HyperOrbitSVG)},xe={id:"tri_quad",fullName:"TriQuad",inventedBy:["Bram Cohen","Carl Hoff"],inventionYear:2018,kpuzzle:r(async()=>new v((await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).triQuadJSON)),svg:r(async()=>(await import("./puzzles-dynamic-side-events-QIADTLKJ-XWAMHRFM.js")).triQuadSVG)},ye={"3x3x3":q,"2x2x2":E,"4x4x4":K,"5x5x5":new g({id:"5x5x5",fullName:"5\xD75\xD75 Cube"}),"6x6x6":new g({id:"6x6x6",fullName:"6\xD76\xD76 Cube"}),"7x7x7":new g({id:"7x7x7",fullName:"7\xD77\xD77 Cube"}),"40x40x40":new g({id:"40x40x40",fullName:"40\xD740\xD740 Cube"}),clock:Q,megaminx:oe,pyraminx:ue,skewb:new p({id:"skewb",fullName:"Skewb",inventedBy:["Tony Durham"]}),square1:me,fto:ee,gigaminx:new p({id:"gigaminx",fullName:"Gigaminx",inventedBy:["Tyler Fox"],inventionYear:2006}),master_tetraminx:new p({pgID:"master tetraminx",id:"master_tetraminx",fullName:"Master Tetraminx",inventedBy:["Katsuhiko Okamoto"],inventionYear:2002}),kilominx:ne,redi_cube:ce,melindas2x2x2x2:se,loopover:te,tri_quad:xe};export{_ as a,de as b,J as c,ze as d,E as e,q as f,ye as g};
//# sourceMappingURL=chunk-42ONX6RL.js.map