import{a as A,c as I}from"./chunk-QR7PKRAV.js";import{k as U,s as G}from"./chunk-WHNYGZCR.js";import{b as f,c as P,d as N,e as v}from"./chunk-YJ5RMHHJ.js";var V=class C extends Promise{constructor(n){super(r=>{r()}),this._executor=n}static from(n){return new C(r=>{r(n())})}static resolve(n){return new C(r=>{r(n)})}static reject(n){return new C((r,e)=>{e(n)})}then(n,r){return this._promise=this._promise||new Promise(this._executor),this._promise.then(n,r)}catch(n){return this._promise=this._promise||new Promise(this._executor),this._promise.catch(n)}};function Se(i){return new V(n=>{n(i())})}function xe(i,n,r,e,t){let d=i.orbits[n].pieces[r];if(d===null)return l;let g=d.facelets?.[e];return g===null?l:typeof g=="string"?g:t?g.hintMask??g.mask:(console.log(g),g.mask)}var S=class{constructor(i,n){f(this,"stickerings",new Map);for(let r of i.definition.orbits)this.stickerings.set(r.orbitName,new Array(r.numPieces).fill(n))}},l="regular",a="ignored",z="oriented",Q="experimentalOriented2",b="invisible",D="dim",X={Regular:{facelets:[l,l,l,l,l]},Ignored:{facelets:[a,a,a,a,a]},OrientationStickers:{facelets:[z,z,z,z,z]},IgnoreNonPrimary:{facelets:[l,a,a,a,a]},Invisible:{facelets:[b,b,b,b,b]},PermuteNonPrimary:{facelets:[D,l,l,l,l]},Dim:{facelets:[D,D,D,D,D]},Ignoriented:{facelets:[D,a,a,a,a]},OrientationWithoutPermutation:{facelets:[z,a,a,a,a]},ExperimentalOrientationWithoutPermutation2:{facelets:[Q,a,a,a,a]}};function ee(i){return X[i]}var te=class extends S{constructor(i){super(i,"Regular")}set(i,n){for(let[r,e]of this.stickerings.entries())for(let t=0;t<e.length;t++)i.stickerings.get(r)[t]&&(e[t]=n);return this}toStickeringMask(){let i={orbits:{}};for(let[n,r]of this.stickerings.entries()){let e=[],t={pieces:e};i.orbits[n]=t;for(let o of r)e.push(ee(o))}return i}},ie=class{constructor(i){this.kpuzzle=i}and(i){let n=new S(this.kpuzzle,!1);for(let r of this.kpuzzle.definition.orbits)e:for(let e=0;e<r.numPieces;e++){n.stickerings.get(r.orbitName)[e]=!0;for(let t of i)if(!t.stickerings.get(r.orbitName)[e]){n.stickerings.get(r.orbitName)[e]=!1;continue e}}return n}or(i){let n=new S(this.kpuzzle,!1);for(let r of this.kpuzzle.definition.orbits)e:for(let e=0;e<r.numPieces;e++){n.stickerings.get(r.orbitName)[e]=!1;for(let t of i)if(t.stickerings.get(r.orbitName)[e]){n.stickerings.get(r.orbitName)[e]=!0;continue e}}return n}not(i){let n=new S(this.kpuzzle,!1);for(let r of this.kpuzzle.definition.orbits)for(let e=0;e<r.numPieces;e++)n.stickerings.get(r.orbitName)[e]=!i.stickerings.get(r.orbitName)[e];return n}all(){return this.and(this.moves([]))}move(i){let n=this.kpuzzle.moveToTransformation(i),r=new S(this.kpuzzle,!1);for(let e of this.kpuzzle.definition.orbits)for(let t=0;t<e.numPieces;t++)(n.transformationData[e.orbitName].permutation[t]!==t||n.transformationData[e.orbitName].orientationDelta[t]!==0)&&(r.stickerings.get(e.orbitName)[t]=!0);return r}moves(i){return i.map(n=>this.move(n))}orbits(i){let n=new S(this.kpuzzle,!1);for(let r of i)n.stickerings.get(r).fill(!0);return n}orbitPrefix(i){let n=new S(this.kpuzzle,!1);for(let r of this.kpuzzle.definition.orbits)r.orbitName.startsWith(i)&&n.stickerings.get(r.orbitName).fill(!0);return n}},K="Last Layer",W="Last Slot",p={"3x3x3":K,megaminx:K},E={"3x3x3":W,megaminx:W},ne={full:{groups:{"3x3x3":"Stickering",megaminx:"Stickering"}},OLL:{groups:p},PLL:{groups:p},LL:{groups:p},EOLL:{groups:p},COLL:{groups:p},OCLL:{groups:p},CPLL:{groups:p},CLL:{groups:p},EPLL:{groups:p},ELL:{groups:p},ZBLL:{groups:p},LS:{groups:E},LSOLL:{groups:E},LSOCLL:{groups:E},ELS:{groups:E},CLS:{groups:E},ZBLS:{groups:E},VLS:{groups:E},WVLS:{groups:E},F2L:{groups:{"3x3x3":"CFOP (Fridrich)"}},Daisy:{groups:{"3x3x3":"CFOP (Fridrich)"}},Cross:{groups:{"3x3x3":"CFOP (Fridrich)"}},EO:{groups:{"3x3x3":"ZZ"}},EOline:{groups:{"3x3x3":"ZZ"}},EOcross:{groups:{"3x3x3":"ZZ"}},CMLL:{groups:{"3x3x3":"Roux"}},L10P:{groups:{"3x3x3":"Roux"}},L6E:{groups:{"3x3x3":"Roux"}},L6EO:{groups:{"3x3x3":"Roux"}},"2x2x2":{groups:{"3x3x3":"Petrus"}},"2x2x3":{groups:{"3x3x3":"Petrus"}},G1:{groups:{"3x3x3":"FMC"}},L2C:{groups:{"4x4x4":"Reduction","5x5x5":"Reduction","6x6x6":"Reduction"}},PBL:{groups:{"2x2x2":"Ortega"}},"Void Cube":{groups:{"3x3x3":"Miscellaneous"}},invisible:{groups:{"3x3x3":"Miscellaneous"}},picture:{groups:{"3x3x3":"Miscellaneous"}},"centers-only":{groups:{"3x3x3":"Miscellaneous"}},"experimental-centers-U":{},"experimental-centers-U-D":{},"experimental-centers-U-L-D":{},"experimental-centers-U-L-B-D":{},"experimental-centers":{},"experimental-fto-fc":{groups:{fto:"Bencisco"}},"experimental-fto-f2t":{groups:{fto:"Bencisco"}},"experimental-fto-sc":{groups:{fto:"Bencisco"}},"experimental-fto-l2c":{groups:{fto:"Bencisco"}},"experimental-fto-lbt":{groups:{fto:"Bencisco"}},"experimental-fto-l3t":{groups:{fto:"Bencisco"}}};async function re(i,n){return(await oe(i,n)).toStickeringMask()}async function oe(i,n){let r=await i.kpuzzle(),e=new te(r),t=new ie(r),o=()=>t.move("U"),d=()=>t.or(t.moves(["U","D"])),g=()=>t.or(t.moves(["L","R"])),H=()=>t.not(g()),F=()=>t.not(o()),c=()=>t.orbitPrefix("CENTER"),m=()=>t.orbitPrefix("EDGE"),u=()=>t.or([t.orbitPrefix("CORNER"),t.orbitPrefix("C4RNER"),t.orbitPrefix("C5RNER")]),L=()=>t.or([H(),t.and([o(),m()])]),k=()=>t.and([o(),c()]),M=()=>t.and([t.and(t.moves(["F","R"])),m()]),w=()=>t.and([t.and(t.moves(["F","R"])),u(),t.not(o())]),x=()=>t.or([w(),M()]);function s(){e.set(F(),"Dim")}function J(){e.set(o(),"PermuteNonPrimary"),e.set(k(),"Dim")}function R(){e.set(o(),"IgnoreNonPrimary"),e.set(k(),"Regular")}function B(){e.set(o(),"Ignoriented"),e.set(k(),"Dim")}switch(n){case"full":break;case"PLL":{s(),J();break}case"CLS":{s(),e.set(w(),"Regular"),e.set(o(),"Ignoriented"),e.set(t.and([o(),c()]),"Dim"),e.set(t.and([o(),u()]),"IgnoreNonPrimary");break}case"OLL":{s(),R();break}case"EOLL":{s(),R(),e.set(t.and([o(),u()]),"Ignored");break}case"COLL":{s(),e.set(t.and([o(),m()]),"Ignoriented"),e.set(t.and([o(),c()]),"Dim"),e.set(t.and([o(),u()]),"Regular");break}case"OCLL":{s(),B(),e.set(t.and([o(),u()]),"IgnoreNonPrimary");break}case"CPLL":{s(),e.set(t.and([u(),o()]),"PermuteNonPrimary"),e.set(t.and([t.not(u()),o()]),"Dim");break}case"CLL":{s(),e.set(t.not(t.and([u(),o()])),"Dim");break}case"EPLL":{s(),e.set(o(),"Dim"),e.set(t.and([o(),m()]),"PermuteNonPrimary");break}case"ELL":{s(),e.set(o(),"Dim"),e.set(t.and([o(),m()]),"Regular");break}case"ELS":{s(),R(),e.set(t.and([o(),u()]),"Ignored"),e.set(M(),"Regular"),e.set(w(),"Ignored");break}case"LL":{s();break}case"F2L":{e.set(o(),"Ignored");break}case"ZBLL":{s(),e.set(o(),"PermuteNonPrimary"),e.set(k(),"Dim"),e.set(t.and([o(),u()]),"Regular");break}case"ZBLS":{s(),e.set(x(),"Regular"),R(),e.set(t.and([o(),u()]),"Ignored");break}case"VLS":{s(),e.set(x(),"Regular"),R();break}case"WVLS":{s(),e.set(x(),"Regular"),e.set(t.and([o(),m()]),"Ignoriented"),e.set(t.and([o(),c()]),"Dim"),e.set(t.and([o(),u()]),"IgnoreNonPrimary");break}case"LS":{s(),e.set(x(),"Regular"),e.set(o(),"Ignored"),e.set(k(),"Dim");break}case"LSOLL":{s(),R(),e.set(x(),"Regular");break}case"LSOCLL":{s(),B(),e.set(t.and([o(),u()]),"IgnoreNonPrimary"),e.set(x(),"Regular");break}case"EO":{e.set(u(),"Ignored"),e.set(m(),"OrientationWithoutPermutation");break}case"EOline":{e.set(u(),"Ignored"),e.set(m(),"OrientationWithoutPermutation"),e.set(t.and(t.moves(["D","M"])),"Regular");break}case"EOcross":{e.set(m(),"OrientationWithoutPermutation"),e.set(t.move("D"),"Regular"),e.set(u(),"Ignored");break}case"CMLL":{e.set(F(),"Dim"),e.set(L(),"Ignored"),e.set(t.and([o(),u()]),"Regular");break}case"L10P":{e.set(t.not(L()),"Dim"),e.set(t.and([u(),o()]),"Regular");break}case"L6E":{e.set(t.not(L()),"Dim");break}case"L6EO":{e.set(t.not(L()),"Dim"),e.set(L(),"OrientationWithoutPermutation"),e.set(t.and([c(),d()]),"OrientationStickers");break}case"Daisy":{e.set(t.all(),"Ignored"),e.set(c(),"Dim"),e.set(t.and([t.move("D"),c()]),"Regular"),e.set(t.and([t.move("U"),m()]),"IgnoreNonPrimary");break}case"Cross":{e.set(t.all(),"Ignored"),e.set(c(),"Dim"),e.set(t.and([t.move("D"),c()]),"Regular"),e.set(t.and([t.move("D"),m()]),"Regular");break}case"2x2x2":{e.set(t.or(t.moves(["U","F","R"])),"Ignored"),e.set(t.and([t.or(t.moves(["U","F","R"])),c()]),"Dim");break}case"2x2x3":{e.set(t.all(),"Dim"),e.set(t.or(t.moves(["U","F","R"])),"Ignored"),e.set(t.and([t.or(t.moves(["U","F","R"])),c()]),"Dim"),e.set(t.and([t.move("F"),t.not(t.or(t.moves(["U","R"])))]),"Regular");break}case"G1":{e.set(t.all(),"ExperimentalOrientationWithoutPermutation2"),e.set(t.or(t.moves(["E"])),"OrientationWithoutPermutation"),e.set(t.and(t.moves(["E","S"])),"Ignored");break}case"L2C":{e.set(t.or(t.moves(["L","R","B","D"])),"Dim"),e.set(t.not(c()),"Ignored");break}case"PBL":{e.set(t.all(),"Ignored"),e.set(t.or(t.moves(["U","D"])),"PermuteNonPrimary");break}case"Void Cube":{e.set(c(),"Invisible");break}case"picture":case"invisible":{e.set(t.all(),"Invisible");break}case"centers-only":{e.set(t.not(c()),"Ignored");break}default:console.warn(`Unsupported stickering for ${i.id}: ${n}. Setting all pieces to dim.`),e.set(t.and(t.moves([])),"Dim")}return e}async function ae(i,n){let r=[],e=[];for(let[t,o]of Object.entries(ne))o.groups&&(i in o.groups?r.push(t):n?.use3x3x3Fallbacks&&"3x3x3"in o.groups&&e.push(t));return r.concat(e)}function Re(i){let n=null;return()=>n??(n=i())}async function se(i){return(await import("./puzzle-geometry-Y2FXGI7J.js")).getPuzzleGeometryByName(i,{allMoves:!0,orientCenters:!0,addRotations:!0})}async function Y(i,n){let r=await i,e=r.getKPuzzleDefinition(!0);e.name=n;let t=await import("./puzzle-geometry-Y2FXGI7J.js"),o=new t.ExperimentalPGNotation(r,r.getOrbitsDef(!0));return new I(o.remapKPuzzleDefinition(e),{experimentalPGNotation:o})}var O,h,y,_,ue=(_=class{constructor(i){f(this,"pgId");f(this,"id");f(this,"fullName");f(this,"inventedBy");f(this,"inventionYear");N(this,O,void 0);N(this,h,void 0);N(this,y,void 0);f(this,"puzzleSpecificSimplifyOptionsPromise",$(this.kpuzzle.bind(this)));this.pgId=i.pgID,this.id=i.id,this.fullName=i.fullName,this.inventedBy=i.inventedBy,this.inventionYear=i.inventionYear}pg(){return P(this,O)??v(this,O,se(this.pgId??this.id))}kpuzzle(){return P(this,h)??v(this,h,Y(this.pg(),this.id))}svg(){return P(this,y)??v(this,y,(async()=>(await this.pg()).generatesvg())())}},O=new WeakMap,h=new WeakMap,y=new WeakMap,_),ze=class extends ue{constructor(){super(...arguments);f(this,"stickerings",()=>ae(this.id,{use3x3x3Fallbacks:!0}))}stickeringMask(n){return re(this,n)}};function $(i){return new V(async n=>{let r=await i();n({quantumMoveOrder:e=>r.moveToTransformation(new U(e)).repetitionOrder()})})}var j={name:"3x3x3",orbits:[{orbitName:"EDGES",numPieces:12,numOrientations:2},{orbitName:"CORNERS",numPieces:8,numOrientations:3},{orbitName:"CENTERS",numPieces:6,numOrientations:4}],defaultPattern:{EDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{pieces:[0,1,2,3,4,5],orientation:[0,0,0,0,0,0],orientationMod:[1,1,1,1,1,1]}},moves:{U:{EDGES:{permutation:[1,2,3,0,4,5,6,7,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[1,0,0,0,0,0]}},y:{EDGES:{permutation:[1,2,3,0,5,6,7,4,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,3]}},x:{EDGES:{permutation:[4,8,0,9,6,10,2,11,5,7,1,3],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientationDelta:[2,1,2,1,1,2,1,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,3,0,1,2,2]}},L:{EDGES:{permutation:[0,1,2,11,4,5,6,9,8,3,10,7],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,1,0,0,0,0]}},F:{EDGES:{permutation:[9,1,2,3,8,5,6,7,0,4,10,11],orientationDelta:[1,0,0,0,1,0,0,0,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,1,0,0,0]}},R:{EDGES:{permutation:[0,8,2,3,4,10,6,7,5,9,1,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,1,0,0]}},B:{EDGES:{permutation:[0,1,10,3,4,5,11,7,8,9,6,2],orientationDelta:[0,0,1,0,0,0,1,0,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,1,0]}},D:{EDGES:{permutation:[0,1,2,3,7,4,5,6,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,0,1]}},z:{EDGES:{permutation:[9,3,11,7,8,1,10,5,0,4,2,6],orientationDelta:[1,1,1,1,1,1,1,1,1,1,1,1]},CORNERS:{permutation:[3,2,6,5,0,4,7,1],orientationDelta:[1,2,1,2,2,1,2,1]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,3,1]}},M:{EDGES:{permutation:[2,1,6,3,0,5,4,7,8,9,10,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,0,0,0,2,0]}},E:{EDGES:{permutation:[0,1,2,3,4,5,6,7,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,0]}},S:{EDGES:{permutation:[0,3,2,7,4,1,6,5,8,9,10,11],orientationDelta:[0,1,0,1,0,1,0,1,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,0,1,0,1]}},u:{EDGES:{permutation:[1,2,3,0,4,5,6,7,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,0]}},l:{EDGES:{permutation:[2,1,6,11,0,5,4,9,8,3,10,7],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,1,0,0,2,0]}},f:{EDGES:{permutation:[9,3,2,7,8,1,6,5,0,4,10,11],orientationDelta:[1,1,0,1,1,1,0,1,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,0,1]}},r:{EDGES:{permutation:[4,8,0,3,6,10,2,7,5,9,1,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,0,0,1,2,2]}},b:{EDGES:{permutation:[0,5,10,1,4,7,11,3,8,9,6,2],orientationDelta:[0,1,1,1,0,1,1,1,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[3,0,2,5,4,1],orientationDelta:[3,3,0,3,1,3]}},d:{EDGES:{permutation:[0,1,2,3,7,4,5,6,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,1]}}},derivedMoves:{Uw:"u",Lw:"l",Fw:"f",Rw:"r",Bw:"b",Dw:"d",Uv:"y",Lv:"x'",Fv:"z",Rv:"x",Bv:"z'",Dv:"y'","2U":"u U'","2L":"l L'","2F":"f F'","2R":"r R'","2B":"b B'","2D":"d D'"}};async function Le(i){let n=await(i.puzzleSpecificSimplifyOptions??i.puzzleSpecificSimplifyOptionsPromise);return n?{puzzleLoader:{puzzleSpecificSimplifyOptions:n}}:{}}var ke=new Array(24);async function T(i,n){return(await import("./puzzle-geometry-Y2FXGI7J.js")).getPuzzleGeometryByDesc(i,{allMoves:!0,orientCenters:!0,addRotations:!0,...n})}async function ce(i,n){let r=T(i,n);return Y(r,`description: ${i}`)}var le=1;function be(i,n){let r=le++,e=null,t=async()=>e??(e=ce(i)),o={id:`custom-${r}`,fullName:n?.fullName??`Custom Puzzle (instance #${r})`,kpuzzle:t,svg:async()=>(await T(i)).generatesvg(),pg:async()=>T(i),puzzleSpecificSimplifyOptionsPromise:$(t)};return n?.inventedBy&&(o.inventedBy=n.inventedBy),n?.inventionYear&&(o.inventionYear=n.inventionYear),o}var me=new I(j);j.experimentalIsPatternSolved=Ee;function q(i){let n=i.patternData.CENTERS.pieces[0],r=i.patternData.CENTERS.pieces[5],e=i.patternData.CENTERS.pieces[1],t=e;return n<e&&t--,r<e&&t--,[n,t]}var Z=new Array(6).fill(0).map(()=>new Array(6)),pe=!1;function ge(){if(!pe){let i=["","z","x","z'","x'","x2"].map(r=>G.fromString(r)),n=new G("y");for(let r of i){let e=me.algToTransformation(r);for(let t=0;t<4;t++){e=e.applyAlg(n);let[o,d]=q(e.toKPattern());Z[o][d]=e.invert()}}}return Z}function fe(i){let[n,r]=q(i),e=ge()[n][r];return i.applyTransformation(e)}function Ee(i,n){return n.ignorePuzzleOrientation&&(i=fe(i)),n.ignoreCenterOrientation&&(i=new A(i.kpuzzle,{EDGES:i.patternData.EDGES,CORNERS:i.patternData.CORNERS,CENTERS:{pieces:i.patternData.CENTERS.pieces,orientation:new Array(6).fill(0)}})),!!i.experimentalToTransformation()?.isIdentityTransformation()}export{Se as a,xe as b,ee as c,te as d,ie as e,re as f,ae as g,Re as h,se as i,ue as j,ze as k,j as l,Le as m,T as n,ce as o,be as p,me as q,q as r,ge as s,fe as t};
//# sourceMappingURL=chunk-MQGUF25V.js.map