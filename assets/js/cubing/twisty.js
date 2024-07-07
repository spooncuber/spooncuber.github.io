import{a as ti,b as ht,c as F,d as v,e as K,f as y,g as ee,h as he,j as Vt,l as Ft,m as pt,n as A,o as b,p as D,q as Ut,r as H,s as Bt,t as Wt,v as mt}from"../chunks/chunk-LGCLU4JF.js";import"../chunks/chunk-BS6XHXOG.js";import{e as Rt,f as Ot,g as jt}from"../chunks/chunk-3YM6XFEE.js";import{f as Pt,g as ut}from"../chunks/chunk-42ONX6RL.js";import{c as Ct,m as Et,p as Nt}from"../chunks/chunk-MQGUF25V.js";import"../chunks/chunk-QR7PKRAV.js";import{a as It,b as bt,c as lt,f as ct,i as dt,k as p,l as ce,n as Ne,o as de,p as ue,q as Dt,r as kt,s as T}from"../chunks/chunk-WHNYGZCR.js";import{b as o,c as a,d as u,e as f,g as L}from"../chunks/chunk-YJ5RMHHJ.js";function vt(t,e){if(t===e)return!0;if(t.length!==e.length)return!1;for(let r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}function qt(t,e,r){if(t===e)return!0;if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++)if(!r(t[i],e[i]))return!1;return!0}function yt(t,e,r){return Dt(t,r-e,e)}var ri=class{constructor(t){o(this,"catchingUp",!1);o(this,"pendingFrame",!1);o(this,"tempoScale");o(this,"scheduler",new he(this.animFrame.bind(this)));o(this,"catchUpMs",500);o(this,"lastTimestamp",0);this.model=t,t.tempoScale.addFreshListener(e=>{this.tempoScale=e})}start(){this.catchingUp||(this.lastTimestamp=performance.now()),this.catchingUp=!0,this.pendingFrame=!0,this.scheduler.requestAnimFrame()}stop(){this.catchingUp=!1,this.scheduler.cancelAnimFrame()}animFrame(t){this.scheduler.requestAnimFrame();let e=this.tempoScale*(t-this.lastTimestamp)/this.catchUpMs;this.lastTimestamp=t,this.model.catchUpMove.set((async()=>{let r=await this.model.catchUpMove.get();if(r.move===null)return r;let i=r.amount+e;return i>=1?(this.pendingFrame=!0,this.stop(),this.model.timestampRequest.set("end"),{move:null,amount:0}):(this.pendingFrame=!1,{move:r.move,amount:i})})())}},me,Mt,Qe,dr,ii=(dr=class{constructor(t,e){u(this,me);o(this,"playing",!1);o(this,"direction",1);o(this,"catchUpHelper");o(this,"model");o(this,"lastDatestamp",0);o(this,"lastTimestampPromise");o(this,"scheduler",new he(this.animFrame.bind(this)));u(this,Qe,new ht);this.delegate=e,this.model=t,this.lastTimestampPromise=L(this,me,Mt).call(this),this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this)),this.catchUpHelper=new ri(this.model),this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this))}async onPlayingProp(t){t.playing!==this.playing&&(t.playing?this.play(t):this.pause())}async onCatchUpMoveProp(t){let e=t.move!==null;e!==this.catchUpHelper.catchingUp&&(e?this.catchUpHelper.start():this.catchUpHelper.stop()),this.scheduler.requestAnimFrame()}jumpToStart(t){this.model.timestampRequest.set("start"),this.pause(),t?.flash&&this.delegate.flash()}jumpToEnd(t){this.model.timestampRequest.set("end"),this.pause(),t?.flash&&this.delegate.flash()}playPause(){this.playing?this.pause():this.play()}async play(t){let e=t?.direction??1,r=await this.model.coarseTimelineInfo.get();(t?.autoSkipToOtherEndIfStartingAtBoundary??!0)&&(e===1&&r.atEnd&&(this.model.timestampRequest.set("start"),this.delegate.flash()),e===-1&&r.atStart&&(this.model.timestampRequest.set("end"),this.delegate.flash())),this.model.playingInfo.set({playing:!0,direction:e,untilBoundary:t?.untilBoundary??"entire-timeline",loop:t?.loop??!1}),this.playing=!0,this.lastDatestamp=performance.now(),this.lastTimestampPromise=L(this,me,Mt).call(this),this.scheduler.requestAnimFrame()}pause(){this.playing=!1,this.scheduler.cancelAnimFrame(),this.model.playingInfo.set({playing:!1,untilBoundary:"entire-timeline"})}async animFrame(t){this.playing&&this.scheduler.requestAnimFrame();let e=this.lastDatestamp,r=await a(this,Qe).queue(Promise.all([this.model.playingInfo.get(),this.lastTimestampPromise,this.model.timeRange.get(),this.model.tempoScale.get(),this.model.currentMoveInfo.get()])),[i,n,s,l,c]=r;if(!i.playing){this.playing=!1;return}let h=c.earliestEnd;(c.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(h=s.end);let d=c.latestStart;(c.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(d=s.start);let w=(t-e)*this.direction*l;w=Math.max(w,1),w*=i.direction;let m=n+w,S=null;m>=h?i.loop?m=yt(m,s.start,s.end):(m===s.end?S="end":m=h,this.playing=!1,this.model.playingInfo.set({playing:!1})):m<=d&&(i.loop?m=yt(m,s.start,s.end):(m===s.start?S="start":m=d,this.playing=!1,this.model.playingInfo.set({playing:!1}))),this.lastDatestamp=t,this.lastTimestampPromise=Promise.resolve(m),this.model.timestampRequest.set(S??m)}},me=new WeakSet,Mt=async function(){return(await this.model.detailedTimelineInfo.get()).timestamp},Qe=new WeakMap,dr),ni=class{constructor(t,e){o(this,"animationController");this.model=t,this.animationController=new ii(t,e)}jumpToStart(t){this.animationController.jumpToStart(t)}jumpToEnd(t){this.animationController.jumpToEnd(t)}togglePlay(t){typeof t>"u"&&this.animationController.playPause(),t?this.animationController.play():this.animationController.pause()}async visitTwizzleLink(){let t=document.createElement("a");t.href=await this.model.twizzleLink(),t.target="_blank",t.click()}},si={"bottom-row":!0,none:!0},ai=class extends v{getDefaultValue(){return"auto"}},At=new b;At.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`);var Pe="http://www.w3.org/2000/svg",Qt="data-copy-id",Ht=0;function oi(){return Ht+=1,`svg${Ht.toString()}`}var li={dim:{white:"#dddddd",orange:"#884400",limegreen:"#008800",red:"#660000","rgb(34, 102, 255)":"#000088",yellow:"#888800","rgb(102, 0, 153)":"rgb(50, 0, 76)",purple:"#3f003f"},oriented:"#44ddcc",ignored:"#555555",invisible:"#00000000"},ci=class{constructor(t,e,r,i=!1){o(this,"wrapperElement");o(this,"svgElement");o(this,"gradientDefs");o(this,"originalColors",{});o(this,"gradients",{});o(this,"svgID");if(this.kpuzzle=t,this.showUnknownOrientations=i,!e)throw new Error(`No SVG definition for puzzle type: ${t.name()}`);this.svgID=oi(),this.wrapperElement=document.createElement("div"),this.wrapperElement.classList.add("svg-wrapper"),this.wrapperElement.innerHTML=e;let n=this.wrapperElement.querySelector("svg");if(!n)throw new Error("Could not get SVG element");if(this.svgElement=n,Pe!==n.namespaceURI)throw new Error("Unexpected XML namespace");n.style.maxWidth="100%",n.style.maxHeight="100%",this.gradientDefs=document.createElementNS(Pe,"defs"),n.insertBefore(this.gradientDefs,n.firstChild);for(let s of t.definition.orbits)for(let l=0;l<s.numPieces;l++)for(let c=0;c<s.numOrientations;c++){let h=this.elementID(s.orbitName,l,c),d=this.elementByID(h),w=d?.style.fill;r?(()=>{let m=r.orbits;if(!m)return;let S=m[s.orbitName];if(!S)return;let x=S.pieces[l];if(!x)return;let I=x.facelets[c];if(!I)return;let ke=typeof I=="string"?I:I?.mask,E=li[ke];typeof E=="string"?w=E:E&&(w=E[w])})():w=d?.style.fill,this.originalColors[h]=w,this.gradients[h]=this.newGradient(h,w),this.gradientDefs.appendChild(this.gradients[h]),d?.setAttribute("style",`fill: url(#grad-${this.svgID}-${h})`)}for(let s of Array.from(n.querySelectorAll(`[${Qt}]`))){let l=s.getAttribute(Qt);s.setAttribute("style",`fill: url(#grad-${this.svgID}-${l})`)}this.showUnknownOrientations&&this.drawPattern(this.kpuzzle.defaultPattern())}drawPattern(t,e,r){this.draw(t,e,r)}draw(t,e,r){let i=e?.experimentalToTransformation();if(!t)throw new Error("Distinguishable pieces are not handled for SVG yet!");for(let n of t.kpuzzle.definition.orbits){let s=t.patternData[n.orbitName],l=i?i.transformationData[n.orbitName]:null;for(let c=0;c<n.numPieces;c++)for(let h=0;h<n.numOrientations;h++){let d=this.elementID(n.orbitName,c,h),w=this.elementID(n.orbitName,s.pieces[c],(n.numOrientations-s.orientation[c]+h)%n.numOrientations),m=!1;if(l){let S=this.elementID(n.orbitName,l.permutation[c],(n.numOrientations-l.orientationDelta[c]+h)%n.numOrientations);w===S&&(m=!0),r=r||0;let x=100*(1-r*r*(2-r*r));this.gradients[d].children[0].setAttribute("stop-color",this.originalColors[w]),this.gradients[d].children[0].setAttribute("offset",`${Math.max(x-5,0)}%`),this.gradients[d].children[1].setAttribute("offset",`${Math.max(x-5,0)}%`),this.gradients[d].children[2].setAttribute("offset",`${x}%`),this.gradients[d].children[3].setAttribute("offset",`${x}%`),this.gradients[d].children[3].setAttribute("stop-color",this.originalColors[S])}else m=!0;m&&(this.showUnknownOrientations&&s.orientationMod?.[c]===1?(this.gradients[d].children[0].setAttribute("stop-color","#000"),this.gradients[d].children[0].setAttribute("offset","5%"),this.gradients[d].children[1].setAttribute("offset","5%"),this.gradients[d].children[2].setAttribute("offset","20%"),this.gradients[d].children[3].setAttribute("offset","20%"),this.gradients[d].children[3].setAttribute("stop-color",this.originalColors[w])):(this.gradients[d].children[0].setAttribute("stop-color",this.originalColors[w]),this.gradients[d].children[0].setAttribute("offset","100%"),this.gradients[d].children[1].setAttribute("offset","100%"),this.gradients[d].children[2].setAttribute("offset","100%"),this.gradients[d].children[3].setAttribute("offset","100%")))}}}newGradient(t,e){let r=document.createElementNS(Pe,"radialGradient");r.setAttribute("id",`grad-${this.svgID}-${t}`),r.setAttribute("r","70.7107%");let i=[{offset:0,color:e},{offset:0,color:"black"},{offset:0,color:"black"},{offset:0,color:e}];for(let n of i){let s=document.createElementNS(Pe,"stop");s.setAttribute("offset",`${n.offset}%`),s.setAttribute("stop-color",n.color),s.setAttribute("stop-opacity","1"),r.appendChild(s)}return r}elementID(t,e,r){return`${t}-l${e}-o${r}`}elementByID(t){return this.wrapperElement.querySelector(`#${t}`)}},Ar=new b;Ar.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`);var ie,ne,ur,Ir=(ur=class extends D{constructor(e,r,i,n,s){super();o(this,"svgWrapper");o(this,"scheduler",new he(this.render.bind(this)));u(this,ie,null);u(this,ne,new ee);this.model=e,this.kpuzzle=r,this.svgSource=i,this.options=n,this.puzzleLoader=s,this.addCSS(Ar),this.resetSVG(),a(this,ne).addListener(this.model.puzzleID,l=>{s?.id!==l&&this.disconnect()}),a(this,ne).addListener(this.model.legacyPosition,this.onPositionChange.bind(this)),this.options?.experimentalStickeringMask&&this.experimentalSetStickeringMask(this.options.experimentalStickeringMask)}disconnect(){a(this,ne).disconnect()}onPositionChange(e){try{if(e.movesInProgress.length>0){let r=e.movesInProgress[0].move,i=r;e.movesInProgress[0].direction===-1&&(i=r.invert());let n=e.pattern.applyMove(i);this.svgWrapper.draw(e.pattern,n,e.movesInProgress[0].fraction)}else this.svgWrapper.draw(e.pattern),f(this,ie,e)}catch(r){console.warn("Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",this.puzzleLoader?.id,r),this.disconnect()}}scheduleRender(){this.scheduler.requestAnimFrame()}experimentalSetStickeringMask(e){this.resetSVG(e)}resetSVG(e){this.svgWrapper&&this.removeElement(this.svgWrapper.wrapperElement),this.kpuzzle&&(this.svgWrapper=new ci(this.kpuzzle,this.svgSource,e),this.addElement(this.svgWrapper.wrapperElement),a(this,ie)&&this.onPositionChange(a(this,ie)))}render(){}},ie=new WeakMap,ne=new WeakMap,ur);A.define("twisty-2d-puzzle",Ir);var ge,He,hr,di=(hr=class{constructor(t,e,r,i){u(this,ge,new ee);u(this,He,null);this.model=t,this.schedulable=e,this.puzzleLoader=r,this.effectiveVisualization=i,this.twisty2DPuzzle(),a(this,ge).addListener(this.model.twistySceneModel.stickeringMask,async n=>{(await this.twisty2DPuzzle()).experimentalSetStickeringMask(n)})}disconnect(){a(this,ge).disconnect()}scheduleRender(){}async twisty2DPuzzle(){return a(this,He)??f(this,He,(async()=>{let t=this.effectiveVisualization==="experimental-2D-LL-face"?this.puzzleLoader.llFaceSVG():this.effectiveVisualization==="experimental-2D-LL"?this.puzzleLoader.llSVG():this.puzzleLoader.svg();return new Ir(this.model,await this.puzzleLoader.kpuzzle(),await t,{},this.puzzleLoader)})())}},ge=new WeakMap,He=new WeakMap,hr),fe,Ye,U,pr,br=(pr=class extends D{constructor(e,r){super();u(this,fe,new ee);u(this,Ye,void 0);u(this,U,null);this.model=e,this.effectiveVisualization=r}disconnect(){a(this,fe).disconnect()}async connectedCallback(){this.addCSS(At),this.model&&a(this,fe).addListener(this.model.twistyPlayerModel.puzzleLoader,this.onPuzzleLoader.bind(this))}async scene(){return a(this,Ye)??f(this,Ye,(async()=>new(await H).Scene)())}scheduleRender(){a(this,U)?.scheduleRender()}currentTwisty2DPuzzleWrapper(){return a(this,U)}async setCurrentTwisty2DPuzzleWrapper(e){let r=a(this,U);f(this,U,e),r?.disconnect();let i=e.twisty2DPuzzle();this.contentWrapper.textContent="",this.addElement(await i)}async onPuzzleLoader(e){a(this,U)?.disconnect();let r=new di(this.model.twistyPlayerModel,this,e,this.effectiveVisualization);this.setCurrentTwisty2DPuzzleWrapper(r)}},fe=new WeakMap,Ye=new WeakMap,U=new WeakMap,pr);A.define("twisty-2d-scene-wrapper",br);var B,mr,at=(mr=class{constructor(t,e,r){u(this,B,null);this.elem=t,this.prefix=e,this.validSuffixes=r}clearValue(){a(this,B)&&this.elem.contentWrapper.classList.remove(a(this,B)),f(this,B,null)}setValue(t){if(!this.validSuffixes.includes(t))throw new Error(`Invalid suffix: ${t}`);let e=`${this.prefix}${t}`,r=a(this,B)!==e;return r&&(this.clearValue(),this.elem.contentWrapper.classList.add(e),f(this,B,e)),r}},B=new WeakMap,mr),we,gr,Dr=(gr=class{constructor(){u(this,we,void 0);o(this,"reject");o(this,"promise",new Promise((t,e)=>{f(this,we,t),this.reject=e}))}handleNewValue(t){a(this,we).call(this,t)}},we=new WeakMap,gr),k,Ge,fr,kr=(fr=class extends EventTarget{constructor(e,r,i,n){super();u(this,k,new ee);u(this,Ge,null);this.model=e,this.schedulable=r,this.puzzleLoader=i,this.visualizationStrategy=n,this.twisty3DPuzzle(),a(this,k).addListener(this.model.puzzleLoader,s=>{this.puzzleLoader.id!==s.id&&this.disconnect()}),a(this,k).addListener(this.model.legacyPosition,async s=>{try{(await this.twisty3DPuzzle()).onPositionChange(s),this.scheduleRender()}catch{this.disconnect()}}),a(this,k).addListener(this.model.twistySceneModel.hintFacelet,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFacelets:s==="auto"?"floating":s}),this.scheduleRender()}),a(this,k).addListener(this.model.twistySceneModel.foundationDisplay,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({showFoundation:s!=="none"}),this.scheduleRender()}),a(this,k).addListener(this.model.twistySceneModel.stickeringMask,async s=>{(await this.twisty3DPuzzle()).setStickeringMask(s),this.scheduleRender()}),a(this,k).addListener(this.model.twistySceneModel.faceletScale,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({faceletScale:s}),this.scheduleRender()}),a(this,k).addMultiListener3([this.model.twistySceneModel.stickeringMask,this.model.twistySceneModel.foundationStickerSprite,this.model.twistySceneModel.hintStickerSprite],async s=>{"experimentalUpdateTexture"in await this.twisty3DPuzzle()&&((await this.twisty3DPuzzle()).experimentalUpdateTexture(s[0].specialBehaviour==="picture",s[1],s[2]),this.scheduleRender())})}disconnect(){a(this,k).disconnect()}scheduleRender(){this.schedulable.scheduleRender(),this.dispatchEvent(new CustomEvent("render-scheduled"))}async twisty3DPuzzle(){return a(this,Ge)??f(this,Ge,(async()=>{let e=Ut();if(this.puzzleLoader.id==="3x3x3"&&this.visualizationStrategy==="Cube3D"){let[r,i,n,s]=await Promise.all([this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.stickeringMask.get(),this.model.twistySceneModel.initialHintFaceletsAnimation.get()]);return(await e).cube3DShim(()=>this.schedulable.scheduleRender(),{foundationSprite:r,hintSprite:i,experimentalStickeringMask:n,initialHintFaceletsAnimation:s})}else{let[r,i,n,s]=await Promise.all([this.model.twistySceneModel.hintFacelet.get(),this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.faceletScale.get()]),l=(await e).pg3dShim(()=>this.schedulable.scheduleRender(),this.puzzleLoader,r==="auto"?"floating":r,s,this.puzzleLoader.id==="kilominx");return l.then(c=>c.experimentalUpdateTexture(!0,i??void 0,n??void 0)),l}})())}async raycastMove(e,r){let i=await this.twisty3DPuzzle();if(!("experimentalGetControlTargets"in i)){console.info("not PG3D! skipping raycast");return}let n=i.experimentalGetControlTargets(),[s,l]=await Promise.all([e,this.model.twistySceneModel.movePressCancelOptions.get()]),c=s.intersectObjects(n);if(c.length>0){let h=i.getClosestMoveToAxis(c[0].point,r);h?this.model.experimentalAddMove(h.move,{cancel:l}):console.info("Skipping move!")}}},k=new WeakMap,Ge=new WeakMap,fr),_e,se,N,Ze,_,P,ve,$e,wr,xt=(wr=class extends D{constructor(e){super();u(this,_e,new at(this,"back-view-",["auto","none","side-by-side","top-right"]));u(this,se,new ee);u(this,N,null);u(this,Ze,void 0);u(this,_,new Set);u(this,P,null);u(this,ve,new Dr);u(this,$e,new ht);this.model=e}disconnect(){a(this,se).disconnect()}async connectedCallback(){this.addCSS(At);let e=new mt(this.model,this);this.addVantage(e),this.model&&(a(this,se).addMultiListener([this.model.puzzleLoader,this.model.visualizationStrategy],this.onPuzzle.bind(this)),a(this,se).addListener(this.model.backView,this.onBackView.bind(this))),this.scheduleRender()}setBackView(e){let r=["side-by-side","top-right"].includes(e),i=a(this,N)!==null;a(this,_e).setValue(e),r?i||(f(this,N,new mt(this.model,this,{backView:!0})),this.addVantage(a(this,N)),this.scheduleRender()):a(this,N)&&(this.removeVantage(a(this,N)),f(this,N,null))}onBackView(e){this.setBackView(e)}async onPress(e){let r=a(this,P);if(!r){console.info("no wrapper; skipping scene wrapper press!");return}let i=(async()=>{let[n,s]=await Promise.all([e.detail.cameraPromise,H]),l=new s.Raycaster,c=new(await H).Vector2(e.detail.pressInfo.normalizedX,e.detail.pressInfo.normalizedY);return l.setFromCamera(c,n),l})();r.raycastMove(i,{invert:!e.detail.pressInfo.rightClick,depth:e.detail.pressInfo.keys.ctrlOrMetaKey?"rotation":e.detail.pressInfo.keys.shiftKey?"secondSlice":"none"})}async scene(){return a(this,Ze)??f(this,Ze,(async()=>new(await H).Scene)())}addVantage(e){e.addEventListener("press",this.onPress.bind(this)),a(this,_).add(e),this.contentWrapper.appendChild(e)}removeVantage(e){a(this,_).delete(e),e.remove(),e.disconnect(),a(this,P)?.disconnect()}experimentalVantages(){return a(this,_).values()}scheduleRender(){for(let e of a(this,_))e.scheduleRender()}async setCurrentTwisty3DPuzzleWrapper(e,r){let i=a(this,P);try{f(this,P,r),i?.disconnect(),e.add(await r.twisty3DPuzzle())}finally{i&&e.remove(await i.twisty3DPuzzle())}a(this,ve).handleNewValue(r)}async experimentalTwisty3DPuzzleWrapper(){return a(this,P)||a(this,ve).promise}async onPuzzle(e){if(e[1]==="2D")return;a(this,P)?.disconnect();let[r,i]=await a(this,$e).queue(Promise.all([this.scene(),new kr(this.model,this,e[0],e[1])]));this.setCurrentTwisty3DPuzzleWrapper(r,i)}},_e=new WeakMap,se=new WeakMap,N=new WeakMap,Ze=new WeakMap,_=new WeakMap,P=new WeakMap,ve=new WeakMap,$e=new WeakMap,wr);A.define("twisty-3d-scene-wrapper",xt);var Cr=new b;Cr.replaceSync(`
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`);var Er=new b;Er.replaceSync(`
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`);var Q=typeof document>"u"?null:document,ui=Q?.fullscreenEnabled||!!Q?.webkitFullscreenEnabled;function hi(){return document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen()}function Yt(){return document.fullscreenElement?document.fullscreenElement:document.webkitFullscreenElement??null}function pi(t){return t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen()}var mi=["skip-to-start","skip-to-end","step-forward","step-backward","pause","play","enter-fullscreen","exit-fullscreen","twizzle-tw"],gi=class extends y{derive(t){return{fullscreen:{enabled:ui,icon:document.fullscreenElement===null?"enter-fullscreen":"exit-fullscreen",title:"Enter fullscreen"},"jump-to-start":{enabled:!t.coarseTimelineInfo.atStart,icon:"skip-to-start",title:"Restart"},"play-step-backwards":{enabled:!t.coarseTimelineInfo.atStart,icon:"step-backward",title:"Step backward"},"play-pause":{enabled:!(t.coarseTimelineInfo.atStart&&t.coarseTimelineInfo.atEnd),icon:t.coarseTimelineInfo.playing?"pause":"play",title:t.coarseTimelineInfo.playing?"Pause":"Play"},"play-step":{enabled:!t.coarseTimelineInfo.atEnd,icon:"step-forward",title:"Step forward"},"jump-to-end":{enabled:!t.coarseTimelineInfo.atEnd,icon:"skip-to-end",title:"Skip to End"},"twizzle-link":{enabled:!0,icon:"twizzle-tw",title:"View at Twizzle",hidden:t.viewerLink==="none"}}}},Gt={fullscreen:!0,"jump-to-start":!0,"play-step-backwards":!0,"play-pause":!0,"play-step":!0,"jump-to-end":!0,"twizzle-link":!0},Xe,Pr,vr,Nr=(vr=class extends D{constructor(e,r,i){super();u(this,Xe);o(this,"buttons",null);this.model=e,this.controller=r,this.defaultFullscreenElement=i}connectedCallback(){this.addCSS(Cr);let e={};for(let r in Gt){let i=new Rr;e[r]=i,i.htmlButton.addEventListener("click",()=>L(this,Xe,Pr).call(this,r)),this.addElement(i)}this.buttons=e,this.model?.buttonAppearance.addFreshListener(this.update.bind(this)),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}async onFullscreenButton(){if(!this.defaultFullscreenElement)throw new Error("Attempted to go fullscreen without an element.");if(Yt()===this.defaultFullscreenElement)hi();else{this.buttons?.fullscreen.setIcon("exit-fullscreen"),pi(await this.model?.twistySceneModel.fullscreenElement.get()??this.defaultFullscreenElement);let e=()=>{Yt()!==this.defaultFullscreenElement&&(this.buttons?.fullscreen.setIcon("enter-fullscreen"),window.removeEventListener("fullscreenchange",e))};window.addEventListener("fullscreenchange",e)}}async update(e){for(let r in Gt){let i=this.buttons[r],n=e[r];i.htmlButton.disabled=!n.enabled,i.htmlButton.title=n.title,i.setIcon(n.icon),i.hidden=!!n.hidden}}updateColorScheme(e){for(let r of Object.values(this.buttons??{}))r.updateColorScheme(e)}},Xe=new WeakSet,Pr=function(e){switch(e){case"fullscreen":{this.onFullscreenButton();break}case"jump-to-start":{this.controller?.jumpToStart({flash:!0});break}case"play-step-backwards":{this.controller?.animationController.play({direction:-1,untilBoundary:"move"});break}case"play-pause":{this.controller?.togglePlay();break}case"play-step":{this.controller?.animationController.play({direction:1,untilBoundary:"move"});break}case"jump-to-end":{this.controller?.jumpToEnd({flash:!0});break}case"twizzle-link":{this.controller?.visitTwizzleLink();break}default:throw new Error("Missing command")}},vr);A.define("twisty-buttons",Nr);var Je,yr,Rr=(yr=class extends D{constructor(){super(...arguments);o(this,"htmlButton",document.createElement("button"));u(this,Je,new at(this,"svg-",mi))}updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}connectedCallback(){this.addCSS(Er),this.addElement(this.htmlButton)}setIcon(e){a(this,Je).setValue(e)}},Je=new WeakMap,yr);A.define("twisty-button",Rr);var Or=new b;Or.replaceSync(`
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`);var fi=!1,We=!1;Q?.addEventListener("mousedown",t=>{t.which&&(We=!0)},!0);Q?.addEventListener("mouseup",t=>{t.which&&(We=!1)},!0);var zt=0,Ve=0;Q?.addEventListener("mousedown",()=>{Ve++},!1);Q?.addEventListener("mousemove",jr,!1);Q?.addEventListener("mouseenter",jr,!1);function jr(t){zt=t.pageY}var _t=0,Zt=0,gt=!1,ft=0,Ke,Mr,Vr=(Mr=class extends D{constructor(e,r){super();u(this,Ke,null);this.model=e,this.controller=r}async onDetailedTimelineInfo(e){let r=await this.inputElem();r.min=e.timeRange.start.toString(),r.max=e.timeRange.end.toString(),r.disabled=r.min===r.max,r.value=e.timestamp.toString()}async connectedCallback(){this.addCSS(Or),this.addElement(await this.inputElem()),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}updateColorScheme(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}async inputElem(){return a(this,Ke)??f(this,Ke,(async()=>{let e=document.createElement("input");return e.type="range",e.disabled=!0,this.model?.detailedTimelineInfo.addFreshListener(this.onDetailedTimelineInfo.bind(this)),e.addEventListener("input",this.onInput.bind(this)),e.addEventListener("keydown",this.onKeypress.bind(this)),e})())}async onInput(e){if(gt)return;let r=await this.inputElem();await this.slowDown(e,r);let i=parseInt(r.value);this.model?.playingInfo.set({playing:!1}),this.model?.timestampRequest.set(i)}onKeypress(e){switch(e.key){case"ArrowLeft":case"ArrowRight":{this.controller?.animationController.play({direction:e.key==="ArrowLeft"?-1:1,untilBoundary:"move"}),e.preventDefault();break}case" ":{this.controller?.togglePlay(),e.preventDefault();break}}}async slowDown(e,r){if(fi&&We){let i=r.getBoundingClientRect(),n=i.top+i.height/2;console.log(n,e,zt,We);let s=Math.abs(n-zt),l=1;s>64&&(l=Math.max(2**(-(s-64)/64),1/32));let c=parseInt(r.value);if(console.log("cl",ft,Ve,c),ft===Ve){let h=(c-Zt)*l;console.log("delta",h,s),gt=!0;let d=c;d=_t+h*l+(c-_t)*Math.min(1,(1/2)**(s*s/64)),r.value=d.toString(),console.log(l),gt=!1,this.contentWrapper.style.opacity=l.toString()}else ft=Ve;Zt=c}}},Ke=new WeakMap,Mr);A.define("twisty-scrubber",Vr);var wi=null;async function $t(t,e){let[{PerspectiveCamera:r,Scene:i},n,s,l,c,h,d]=await Promise.all([H,await t.puzzleLoader.get(),await t.visualizationStrategy.get(),await t.twistySceneModel.stickeringRequest.get(),await t.twistySceneModel.stickeringMaskRequest.get(),await t.legacyPosition.get(),await t.twistySceneModel.orbitCoordinates.get()]),w=e?.width??2048,m=e?.height??2048,S=w/m,x=wi??(wi=await(async()=>new r(20,S,.1,20))()),I=new i,ke=new kr(t,{scheduleRender:()=>{}},n,s);I.add(await ke.twisty3DPuzzle()),await Wt(x,d);let J=(await Bt(w,m,I,x)).toDataURL(),Ce=await Fr(t);return{dataURL:J,download:async Ee=>{Ur(J,Ee??Ce)}}}async function Fr(t){let[e,r]=await Promise.all([t.puzzleID.get(),t.alg.get()]);return`[${e}]${r.alg.experimentalNumChildAlgNodes()===0?"":` ${r.alg.toString()}`}`}function Ur(t,e,r="png"){let i=document.createElement("a");i.href=t,i.download=`${e}.${r}`,i.click()}var Br=new b;Br.replaceSync(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`);var Xt=class extends v{getDefaultValue(){return null}},St=class extends F{getDefaultValue(){return null}derive(t){return typeof t=="string"?new URL(t,location.href):t}},pe=class Wr{constructor(e){o(this,"warnings");o(this,"errors");this.warnings=Object.freeze(e?.warnings??[]),this.errors=Object.freeze(e?.errors??[]),Object.freeze(this)}add(e){return new Wr({warnings:this.warnings.concat(e?.warnings??[]),errors:this.errors.concat(e?.errors??[])})}log(){this.errors.length>0?console.error(`\u{1F6A8} ${this.errors[0]}`):this.warnings.length>0?console.warn(`\u26A0\uFE0F ${this.warnings[0]}`):console.info("\u{1F60E} No issues!")}};function qr(t){try{let e=T.fromString(t),r=[];return e.toString()!==t&&r.push("Alg is non-canonical!"),{alg:e,issues:new pe({warnings:r})}}catch(e){return{alg:new T,issues:new pe({errors:[`Malformed alg: ${e.toString()}`]})}}}function vi(t,e){return t.alg.isIdentical(e.alg)&&vt(t.issues.warnings,e.issues.warnings)&&vt(t.issues.errors,e.issues.errors)}var Jt=class extends F{getDefaultValue(){return{alg:new T,issues:new pe}}canReuseValue(t,e){return vi(t,e)}async derive(t){return typeof t=="string"?qr(t):{alg:t,issues:new pe}}},yi=class extends y{derive(t){return t.kpuzzle.algToTransformation(t.setupAlg.alg)}},Mi=class extends y{derive(t){if(t.setupTransformation)return t.setupTransformation;switch(t.setupAnchor){case"start":return t.setupAlgTransformation;case"end":{let r=t.indexer.transformationAtIndex(t.indexer.numAnimatedLeaves()).invert();return t.setupAlgTransformation.applyTransformation(r)}default:throw new Error("Unimplemented!")}}},xi=class extends v{getDefaultValue(){return{move:null,amount:0}}canReuseValue(t,e){return t.move===e.move&&t.amount===e.amount}},zi=class extends y{derive(t){return{patternIndex:t.currentMoveInfo.patternIndex,movesFinishing:t.currentMoveInfo.movesFinishing.map(e=>e.move),movesFinished:t.currentMoveInfo.movesFinished.map(e=>e.move)}}canReuseValue(t,e){return t.patternIndex===e.patternIndex&&qt(t.movesFinishing,e.movesFinishing,(r,i)=>r.isIdentical(i))&&qt(t.movesFinished,e.movesFinished,(r,i)=>r.isIdentical(i))}},Si=class extends y{derive(t){function e(r){return t.detailedTimelineInfo.atEnd&&t.catchUpMove.move!==null&&r.currentMoves.push({move:t.catchUpMove.move,direction:-1,fraction:1-t.catchUpMove.amount,startTimestamp:-1,endTimestamp:-1}),r}if(t.indexer.currentMoveInfo)return e(t.indexer.currentMoveInfo(t.detailedTimelineInfo.timestamp));{let r=t.indexer.timestampToIndex(t.detailedTimelineInfo.timestamp),i={patternIndex:r,currentMoves:[],movesFinishing:[],movesFinished:[],movesStarting:[],latestStart:-1/0,earliestEnd:1/0};if(t.indexer.numAnimatedLeaves()>0){let n=t.indexer.getAnimLeaf(r)?.as(p);if(!n)return e(i);let s=t.indexer.indexToMoveStartTimestamp(r),l=t.indexer.moveDuration(r),c=l?(t.detailedTimelineInfo.timestamp-s)/l:0,h=s+l,d={move:n,direction:1,fraction:c,startTimestamp:s,endTimestamp:h};c===0?i.movesStarting.push(d):c===1?i.movesFinishing.push(d):(i.currentMoves.push(d),i.latestStart=Math.max(i.latestStart,s),i.earliestEnd=Math.min(i.earliestEnd,h))}return e(i)}}},Li=class extends y{derive(t){let e=t.indexer.transformationAtIndex(t.currentLeavesSimplified.patternIndex);e=t.anchoredStart.applyTransformation(e);for(let r of t.currentLeavesSimplified.movesFinishing)e=e.applyMove(r);for(let r of t.currentLeavesSimplified.movesFinished)e=e.applyMove(r);return e.toKPattern()}};function G(t){switch(Math.abs(t)){case 0:return 0;case 1:return 1e3;case 2:return 1500;default:return 2e3}}var Qr=class extends de{constructor(t=G){super(),this.durationForAmount=t}traverseAlg(t){let e=0;for(let r of t.childAlgNodes())e+=this.traverseAlgNode(r);return e}traverseGrouping(t){return t.amount*this.traverseAlg(t.alg)}traverseMove(t){return this.durationForAmount(t.amount)}traverseCommutator(t){return 2*(this.traverseAlg(t.A)+this.traverseAlg(t.B))}traverseConjugate(t){return 2*this.traverseAlg(t.A)+this.traverseAlg(t.B)}traversePause(t){return this.durationForAmount(1)}traverseNewline(t){return this.durationForAmount(1)}traverseLineComment(t){return this.durationForAmount(0)}},Ti=class{constructor(t,e){o(this,"moves");o(this,"durationFn",new Qr(G));this.kpuzzle=t,this.moves=new T(e.experimentalExpand())}getAnimLeaf(t){return Array.from(this.moves.childAlgNodes())[t]}indexToMoveStartTimestamp(t){let e=new T(Array.from(this.moves.childAlgNodes()).slice(0,t));return this.durationFn.traverseAlg(e)}timestampToIndex(t){let e=0,r;for(r=0;r<this.numAnimatedLeaves();r++)if(e+=this.durationFn.traverseMove(this.getAnimLeaf(r)),e>=t)return r;return r}patternAtIndex(t){return this.kpuzzle.defaultPattern().applyTransformation(this.transformationAtIndex(t))}transformationAtIndex(t){let e=this.kpuzzle.identityTransformation();for(let r of Array.from(this.moves.childAlgNodes()).slice(0,t))e=e.applyMove(r);return e}algDuration(){return this.durationFn.traverseAlg(this.moves)}numAnimatedLeaves(){return jt(this.moves)}moveDuration(t){return this.durationFn.traverseMove(this.getAnimLeaf(t))}},Kt={u:"y",l:"x",f:"z",r:"x",b:"z",d:"y",m:"x",e:"y",s:"z",x:"x",y:"y",z:"z"};function Ai(t,e){return Kt[t.family[0].toLowerCase()]===Kt[e.family[0].toLowerCase()]}var Ii=class extends de{traverseAlg(t){let e=[];for(let r of t.childAlgNodes())e.push(this.traverseAlgNode(r));return Array.prototype.concat(...e)}traverseGroupingOnce(t){if(t.experimentalIsEmpty())return[];for(let n of t.childAlgNodes())if(!n.is(p))return this.traverseAlg(t);let e=Array.from(t.childAlgNodes()),r=G(e[0].amount);for(let n=0;n<e.length-1;n++){for(let s=1;s<e.length;s++)if(!Ai(e[n],e[s]))return this.traverseAlg(t);r=Math.max(r,G(e[n].amount))}let i=e.map(n=>({animLeafAlgNode:n,msUntilNext:0,duration:r}));return i[i.length-1].msUntilNext=r,i}traverseGrouping(t){let e=[],r=t.amount>0?t.alg:t.alg.invert();for(let i=0;i<Math.abs(t.amount);i++)e.push(this.traverseGroupingOnce(r));return Array.prototype.concat(...e)}traverseMove(t){let e=G(t.amount);return[{animLeafAlgNode:t,msUntilNext:e,duration:e}]}traverseCommutator(t){let e=[],r=[t.A,t.B,t.A.invert(),t.B.invert()];for(let i of r)e.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...e)}traverseConjugate(t){let e=[],r=[t.A,t.B,t.A.invert()];for(let i of r)e.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...e)}traversePause(t){if(t.experimentalNISSGrouping)return[];let e=G(1);return[{animLeafAlgNode:t,msUntilNext:e,duration:e}]}traverseNewline(t){return[]}traverseLineComment(t){return[]}},bi=ue(Ii);function Di(t){let e=0;return bi(t).map(i=>{let n={animLeaf:i.animLeafAlgNode,start:e,end:e+i.duration};return e+=i.msUntilNext,n})}var ki={"y' y' U' E D R2 r2 F2 B2 U E D' R2 L2' z2 S2 U U D D S2 F2' B2":[{animLeaf:new p("y",-1),start:0,end:1e3},{animLeaf:new p("y",-1),start:1e3,end:2e3},{animLeaf:new p("U",-1),start:1e3,end:1600},{animLeaf:new p("E",1),start:1200,end:1800},{animLeaf:new p("D"),start:1400,end:2e3},{animLeaf:new p("R",2),start:2e3,end:3500},{animLeaf:new p("r",2),start:2e3,end:3500},{animLeaf:new p("F",2),start:3500,end:4200},{animLeaf:new p("B",2),start:3800,end:4500},{animLeaf:new p("U",1),start:4500,end:5500},{animLeaf:new p("E",1),start:4500,end:5500},{animLeaf:new p("D",-1),start:4500,end:5500},{animLeaf:new p("R",2),start:5500,end:6500},{animLeaf:new p("L",-2),start:5500,end:6500},{animLeaf:new p("z",2),start:5500,end:6500},{animLeaf:new p("S",2),start:6500,end:7500},{animLeaf:new p("U"),start:7500,end:8e3},{animLeaf:new p("D"),start:7750,end:8250},{animLeaf:new p("U"),start:8e3,end:8500},{animLeaf:new p("D"),start:8250,end:8750},{animLeaf:new p("S",2),start:8750,end:9250},{animLeaf:new p("F",-2),start:8750,end:1e4},{animLeaf:new p("B",2),start:8750,end:1e4}],"M' R' U' D' M R":[{animLeaf:new p("M",-1),start:0,end:1e3},{animLeaf:new p("R",-1),start:0,end:1e3},{animLeaf:new p("U",-1),start:1e3,end:2e3},{animLeaf:new p("D",-1),start:1e3,end:2e3},{animLeaf:new p("M"),start:2e3,end:3e3},{animLeaf:new p("R"),start:2e3,end:3e3}],"U' E' r E r2' E r U E":[{animLeaf:new p("U",-1),start:0,end:1e3},{animLeaf:new p("E",-1),start:0,end:1e3},{animLeaf:new p("r"),start:1e3,end:2500},{animLeaf:new p("E"),start:2500,end:3500},{animLeaf:new p("r",-2),start:3500,end:5e3},{animLeaf:new p("E"),start:5e3,end:6e3},{animLeaf:new p("r"),start:6e3,end:7e3},{animLeaf:new p("U"),start:7e3,end:8e3},{animLeaf:new p("E"),start:7e3,end:8e3}]},er=class{constructor(t,e){o(this,"animLeaves");this.kpuzzle=t,this.animLeaves=ki[e.toString()]??Di(e)}getAnimLeaf(t){return this.animLeaves[Math.min(t,this.animLeaves.length-1)]?.animLeaf??null}getAnimLeafWithRange(t){return this.animLeaves[Math.min(t,this.animLeaves.length-1)]}indexToMoveStartTimestamp(t){let e=0;return this.animLeaves.length>0&&(e=this.animLeaves[Math.min(t,this.animLeaves.length-1)].start),e}timestampToIndex(t){let e=0;for(e=0;e<this.animLeaves.length;e++)if(this.animLeaves[e].start>=t)return Math.max(0,e-1);return Math.max(0,e-1)}timestampToPosition(t,e){let r=this.currentMoveInfo(t),i=e??this.kpuzzle.identityTransformation().toKPattern();for(let n of this.animLeaves.slice(0,r.patternIndex)){let s=n.animLeaf.as(p);s!==null&&(i=i.applyMove(s))}return{pattern:i,movesInProgress:r.currentMoves}}currentMoveInfo(t){let e=1/0;for(let d of this.animLeaves)if(d.start<=t&&d.end>=t)e=Math.min(e,d.start);else if(d.start>t)break;let r=[],i=[],n=[],s=[],l=-1/0,c=1/0,h=0;for(let d of this.animLeaves)if(d.end<=e)h++;else{if(d.start>t)break;{let w=d.animLeaf.as(p);if(w!==null){let m=(t-d.start)/(d.end-d.start),S=!1;m>1&&(m=1,S=!0);let x={move:w,direction:1,fraction:m,startTimestamp:d.start,endTimestamp:d.end};switch(m){case 0:{i.push(x);break}case 1:{S?s.push(x):n.push(x);break}default:r.push(x),l=Math.max(l,d.start),c=Math.min(c,d.end)}}}}return{patternIndex:h,currentMoves:r,latestStart:l,earliestEnd:c,movesStarting:i,movesFinishing:n,movesFinished:s}}patternAtIndex(t,e){let r=e??this.kpuzzle.defaultPattern();for(let i=0;i<this.animLeaves.length&&i<t;i++){let s=this.animLeaves[i].animLeaf.as(p);s!==null&&(r=r.applyMove(s))}return r}transformationAtIndex(t){let e=this.kpuzzle.identityTransformation();for(let r of this.animLeaves.slice(0,t)){let i=r.animLeaf.as(p);i!==null&&(e=e.applyMove(i))}return e}algDuration(){let t=0;for(let e of this.animLeaves)t=Math.max(t,e.end);return t}numAnimatedLeaves(){return this.animLeaves.length}moveDuration(t){let e=this.getAnimLeafWithRange(t);return e.end-e.start}},Y=class{constructor(t,e,r,i,n=[]){this.moveCount=t,this.duration=e,this.forward=r,this.backward=i,this.children=n}},Ci=class extends de{constructor(e){super();o(this,"identity");o(this,"dummyLeaf");o(this,"durationFn",new Qr(G));o(this,"cache",{});this.kpuzzle=e,this.identity=e.identityTransformation(),this.dummyLeaf=new Y(0,0,this.identity,this.identity,[])}traverseAlg(e){let r=0,i=0,n=this.identity,s=[];for(let l of e.childAlgNodes()){let c=this.traverseAlgNode(l);r+=c.moveCount,i+=c.duration,n===this.identity?n=c.forward:n=n.applyTransformation(c.forward),s.push(c)}return new Y(r,i,n,n.invert(),s)}traverseGrouping(e){let r=this.traverseAlg(e.alg);return this.mult(r,e.amount,[r])}traverseMove(e){let r=e.toString(),i=this.cache[r];if(i)return i;let n=this.kpuzzle.moveToTransformation(e);return i=new Y(1,this.durationFn.traverseAlgNode(e),n,n.invert()),this.cache[r]=i,i}traverseCommutator(e){let r=this.traverseAlg(e.A),i=this.traverseAlg(e.B),n=r.forward.applyTransformation(i.forward),s=r.backward.applyTransformation(i.backward),l=n.applyTransformation(s),c=new Y(2*(r.moveCount+i.moveCount),2*(r.duration+i.duration),l,l.invert(),[r,i]);return this.mult(c,1,[c,r,i])}traverseConjugate(e){let r=this.traverseAlg(e.A),i=this.traverseAlg(e.B),s=r.forward.applyTransformation(i.forward).applyTransformation(r.backward),l=new Y(2*r.moveCount+i.moveCount,2*r.duration+i.duration,s,s.invert(),[r,i]);return this.mult(l,1,[l,r,i])}traversePause(e){return e.experimentalNISSGrouping?this.dummyLeaf:new Y(1,this.durationFn.traverseAlgNode(e),this.identity,this.identity)}traverseNewline(e){return this.dummyLeaf}traverseLineComment(e){return this.dummyLeaf}mult(e,r,i){let n=Math.abs(r),s=e.forward.selfMultiply(r);return new Y(e.moveCount*n,e.duration*n,s,s.invert(),i)}},z=class{constructor(t,e){this.apd=t,this.back=e}},Ei=class extends Ne{constructor(e,r,i){super();o(this,"move");o(this,"moveDuration");o(this,"back");o(this,"st");o(this,"root");o(this,"i");o(this,"dur");o(this,"goali");o(this,"goaldur");this.kpuzzle=e,this.algOrAlgNode=r,this.apd=i,this.i=-1,this.dur=-1,this.goali=-1,this.goaldur=-1,this.move=void 0,this.back=!1,this.moveDuration=0,this.st=this.kpuzzle.identityTransformation(),this.root=new z(this.apd,!1)}moveByIndex(e){return this.i>=0&&this.i===e?this.move!==void 0:this.dosearch(e,1/0)}moveByDuration(e){return this.dur>=0&&this.dur<e&&this.dur+this.moveDuration>=e?this.move!==void 0:this.dosearch(1/0,e)}dosearch(e,r){return this.goali=e,this.goaldur=r,this.i=0,this.dur=0,this.move=void 0,this.moveDuration=0,this.back=!1,this.st=this.kpuzzle.identityTransformation(),this.algOrAlgNode.is(T)?this.traverseAlg(this.algOrAlgNode,this.root):this.traverseAlgNode(this.algOrAlgNode,this.root)}traverseAlg(e,r){if(!this.firstcheck(r))return!1;let i=r.back?e.experimentalNumChildAlgNodes()-1:0;for(let n of bt(e.childAlgNodes(),r.back?-1:1)){if(this.traverseAlgNode(n,new z(r.apd.children[i],r.back)))return!0;i+=r.back?-1:1}return!1}traverseGrouping(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,e.amount);return this.traverseAlg(e.alg,new z(r.apd.children[0],i))}traverseMove(e,r){return this.firstcheck(r)?(this.move=e,this.moveDuration=r.apd.duration,this.back=r.back,!0):!1}traverseCommutator(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,1);return i?this.traverseAlg(e.B,new z(r.apd.children[2],!i))||this.traverseAlg(e.A,new z(r.apd.children[1],!i))||this.traverseAlg(e.B,new z(r.apd.children[2],i))||this.traverseAlg(e.A,new z(r.apd.children[1],i)):this.traverseAlg(e.A,new z(r.apd.children[1],i))||this.traverseAlg(e.B,new z(r.apd.children[2],i))||this.traverseAlg(e.A,new z(r.apd.children[1],!i))||this.traverseAlg(e.B,new z(r.apd.children[2],!i))}traverseConjugate(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,1);return i?this.traverseAlg(e.A,new z(r.apd.children[1],!i))||this.traverseAlg(e.B,new z(r.apd.children[2],i))||this.traverseAlg(e.A,new z(r.apd.children[1],i)):this.traverseAlg(e.A,new z(r.apd.children[1],i))||this.traverseAlg(e.B,new z(r.apd.children[2],i))||this.traverseAlg(e.A,new z(r.apd.children[1],!i))}traversePause(e,r){return this.firstcheck(r)?(this.move=e,this.moveDuration=r.apd.duration,this.back=r.back,!0):!1}traverseNewline(e,r){return!1}traverseLineComment(e,r){return!1}firstcheck(e){return e.apd.moveCount+this.i<=this.goali&&e.apd.duration+this.dur<this.goaldur?this.keepgoing(e):!0}domult(e,r){let i=e.back;if(r===0)return i;r<0&&(i=!i,r=-r);let n=e.apd.children[0],s=Math.min(Math.floor((this.goali-this.i)/n.moveCount),Math.ceil((this.goaldur-this.dur)/n.duration-1));return s>0&&this.keepgoing(new z(n,i),s),i}keepgoing(e,r=1){return this.i+=r*e.apd.moveCount,this.dur+=r*e.apd.duration,r!==1?e.back?this.st=this.st.applyTransformation(e.apd.backward.selfMultiply(r)):this.st=this.st.applyTransformation(e.apd.forward.selfMultiply(r)):e.back?this.st=this.st.applyTransformation(e.apd.backward):this.st=this.st.applyTransformation(e.apd.forward),!1}},Ni=16;function Pi(t,e){let r=new lt,i=new lt;for(let n of t.childAlgNodes())i.push(n),i.experimentalNumAlgNodes()>=e&&(r.push(new ce(i.toAlg())),i.reset());return r.push(new ce(i.toAlg())),r.toAlg()}var Ri=class extends de{traverseAlg(t){let e=t.experimentalNumChildAlgNodes();return e<Ni?t:Pi(t,Math.ceil(Math.sqrt(e)))}traverseGrouping(t){return new ce(this.traverseAlg(t.alg),t.amount)}traverseMove(t){return t}traverseCommutator(t){return new ct(this.traverseAlg(t.A),this.traverseAlg(t.B))}traverseConjugate(t){return new ct(this.traverseAlg(t.A),this.traverseAlg(t.B))}traversePause(t){return t}traverseNewline(t){return t}traverseLineComment(t){return t}},Oi=ue(Ri),tr=class{constructor(t,e){o(this,"decoration");o(this,"walker");this.kpuzzle=t;let r=new Ci(this.kpuzzle),i=Oi(e);this.decoration=r.traverseAlg(i),this.walker=new Ei(this.kpuzzle,i,this.decoration)}getAnimLeaf(t){if(this.walker.moveByIndex(t)){if(!this.walker.move)throw new Error("`this.walker.mv` missing");let e=this.walker.move;return this.walker.back?e.invert():e}return null}indexToMoveStartTimestamp(t){if(this.walker.moveByIndex(t)||this.walker.i===t)return this.walker.dur;throw new Error(`Out of algorithm: index ${t}`)}indexToMovesInProgress(t){if(this.walker.moveByIndex(t)||this.walker.i===t)return this.walker.dur;throw new Error(`Out of algorithm: index ${t}`)}patternAtIndex(t,e){return this.walker.moveByIndex(t),(e??this.kpuzzle.defaultPattern()).applyTransformation(this.walker.st)}transformationAtIndex(t){return this.walker.moveByIndex(t),this.walker.st}numAnimatedLeaves(){return this.decoration.moveCount}timestampToIndex(t){return this.walker.moveByDuration(t),this.walker.i}algDuration(){return this.decoration.duration}moveDuration(t){return this.walker.moveByIndex(t),this.walker.moveDuration}},ji=1024,Vi=class extends y{derive(t){switch(t.indexerConstructorRequest){case"auto":return Rt(t.alg.alg)<=ji&&t.puzzle==="3x3x3"&&t.visualizationStrategy==="Cube3D"?er:tr;case"tree":return tr;case"simple":return Ti;case"simultaneous":return er;default:throw new Error("Invalid indexer request!")}}},Fi=class extends v{getDefaultValue(){return"auto"}},Ui=class extends y{derive(t){return new t.indexerConstructor(t.kpuzzle,t.algWithIssues.alg)}},Bi=class extends y{derive(t){return{pattern:t.currentPattern,movesInProgress:t.currentMoveInfo.currentMoves}}},Wi=!0,rr=class extends y{async derive(t){try{return Wi&&t.kpuzzle.algToTransformation(t.algWithIssues.alg),t.algWithIssues}catch(e){return{alg:new T,issues:new pe({errors:[`Invalid alg for puzzle: ${e.toString()}`]})}}}},qi=class extends v{getDefaultValue(){return"start"}},Qi=class extends v{getDefaultValue(){return null}},Hi=class extends y{async derive(t){return t.puzzleLoader.kpuzzle()}},Yi=class extends v{getDefaultValue(){return K}},Gi=class extends y{async derive(t){return t.puzzleLoader.id}},_i=class extends v{getDefaultValue(){return K}},Zi=class extends y{derive(t){if(t.puzzleIDRequest&&t.puzzleIDRequest!==K){let e=ut[t.puzzleIDRequest];return e||this.userVisibleErrorTracker.set({errors:[`Invalid puzzle ID: ${t.puzzleIDRequest}`]}),e}return t.puzzleDescriptionRequest&&t.puzzleDescriptionRequest!==K?Nt(t.puzzleDescriptionRequest):Pt}},$i=class extends y{derive(t){return{playing:t.playingInfo.playing,atStart:t.detailedTimelineInfo.atStart,atEnd:t.detailedTimelineInfo.atEnd}}canReuseValue(t,e){return t.playing===e.playing&&t.atStart===e.atStart&&t.atEnd===e.atEnd}},et,Hr,xr,Xi=(xr=class extends y{constructor(){super(...arguments);u(this,et)}derive(e){let r=L(this,et,Hr).call(this,e),i=!1,n=!1;return r>=e.timeRange.end&&(n=!0,r=Math.min(e.timeRange.end,r)),r<=e.timeRange.start&&(i=!0,r=Math.max(e.timeRange.start,r)),{timestamp:r,timeRange:e.timeRange,atStart:i,atEnd:n}}canReuseValue(e,r){return e.timestamp===r.timestamp&&e.timeRange.start===r.timeRange.start&&e.timeRange.end===r.timeRange.end&&e.atStart===r.atStart&&e.atEnd===r.atEnd}},et=new WeakSet,Hr=function(e){switch(e.timestampRequest){case"auto":return e.setupAnchor==="start"&&e.setupAlg.alg.experimentalIsEmpty()?e.timeRange.end:e.timeRange.start;case"start":return e.timeRange.start;case"end":return e.timeRange.end;case"anchor":return e.setupAnchor==="start"?e.timeRange.start:e.timeRange.end;case"opposite-anchor":return e.setupAnchor==="start"?e.timeRange.end:e.timeRange.start;default:return e.timestampRequest}},xr),Ji=class extends F{async getDefaultValue(){return{direction:1,playing:!1,untilBoundary:"entire-timeline",loop:!1}}async derive(t,e){let r=await e,i=Object.assign({},r);return Object.assign(i,t),i}canReuseValue(t,e){return t.direction===e.direction&&t.playing===e.playing&&t.untilBoundary===e.untilBoundary&&t.loop===e.loop}},Ki=class extends F{getDefaultValue(){return 1}derive(t){return t<0?1:t}},en={auto:!0,start:!0,end:!0,anchor:!0,"opposite-anchor":!0},tn=class extends v{getDefaultValue(){return"auto"}set(t){let e=this.get();super.set((async()=>this.validInput(await t)?t:e)())}validInput(t){return!!(typeof t=="number"||en[t])}},ys={none:!0,"side-by-side":!0,"top-right":!0},rn=class extends v{getDefaultValue(){return"auto"}},nn=class extends y{derive(t){return{start:0,end:t.indexer.algDuration()}}},sn=class extends v{getDefaultValue(){return"auto"}},an=class extends v{getDefaultValue(){return"auto"}},on=class extends y{derive(t){switch(t.puzzleID){case"clock":case"square1":case"redi_cube":case"melindas2x2x2x2":case"tri_quad":case"loopover":return"2D";case"3x3x3":switch(t.visualizationRequest){case"auto":case"3D":return"Cube3D";default:return t.visualizationRequest}default:switch(t.visualizationRequest){case"auto":case"3D":return"PG3D";case"experimental-2D-LL":case"experimental-2D-LL-face":return["2x2x2","4x4x4","megaminx"].includes(t.puzzleID)?"experimental-2D-LL":"2D";default:return t.visualizationRequest}}}},ln=class extends v{getDefaultValue(){return"auto"}},cn=class extends v{getDefaultValue(){return"auto"}},dn=class extends v{getDefaultValue(){return"auto"}},un=null;async function hn(){return un??(un=new(await H).TextureLoader)}var ir=class extends y{async derive(t){let{spriteURL:e}=t;return e===null?null:new Promise(async(r,i)=>{let n=()=>{console.warn("Could not load sprite:",e.toString()),r(null)};try{(await hn()).load(e.toString(),r,n,n)}catch{n()}})}},pn={facelets:["regular","regular","regular","regular","regular"]};async function mn(t){let{definition:e}=await t.kpuzzle(),r={orbits:{}};for(let i of e.orbits)r.orbits[i.orbitName]={pieces:new Array(i.numPieces).fill(pn)};return r}var gn=class extends y{getDefaultValue(){return{orbits:{}}}async derive(t){return t.stickeringMaskRequest?t.stickeringMaskRequest:t.stickeringRequest==="picture"?{specialBehaviour:"picture",orbits:{}}:t.puzzleLoader.stickeringMask?.(t.stickeringRequest??"full")??mn(t.puzzleLoader)}},fn={"-":"Regular",D:"Dim",I:"Ignored",X:"Invisible",O:"IgnoreNonPrimary",P:"PermuteNonPrimary",o:"Ignoriented","?":"OrientationWithoutPermutation","@":"Regular"};function wn(t){let e={orbits:{}},r=t.split(",");for(let i of r){let[n,s,...l]=i.split(":");if(l.length>0)throw new Error(`Invalid serialized orbit stickering mask (too many colons): \`${i}\``);let c=[];e.orbits[n]={pieces:c};for(let h of s){let d=fn[h];c.push(Ct(d))}}return e}var vn=class extends F{getDefaultValue(){return null}derive(t){return t===null?null:typeof t=="string"?wn(t):t}},yn=class extends v{getDefaultValue(){return null}},Mn=class extends v{getDefaultValue(){return"auto"}},xn=class extends v{getDefaultValue(){return{}}},zn=class extends v{getDefaultValue(){return"auto"}},Sn=class extends v{getDefaultValue(){return"auto"}},Ln=class extends y{derive(t){return t.colorSchemeRequest==="dark"?"dark":"light"}},Tn=class extends v{getDefaultValue(){return"auto"}},An=class extends v{getDefaultValue(){return null}},In=35,bn=class extends v{getDefaultValue(){return In}};function Yr(t,e){return t.latitude===e.latitude&&t.longitude===e.longitude&&t.distance===e.distance}var Dn=class extends F{getDefaultValue(){return"auto"}canReuseValue(t,e){return t===e||Yr(t,e)}async derive(t,e){if(t==="auto")return"auto";let r=await e;r==="auto"&&(r={});let i=Object.assign({},r);return Object.assign(i,t),typeof i.latitude<"u"&&(i.latitude=Math.min(Math.max(i.latitude,-90),90)),typeof i.longitude<"u"&&(i.longitude=yt(i.longitude,180,-180)),i}},kn=class extends y{canReuseValue(t,e){return Yr(t,e)}async derive(t){if(t.orbitCoordinatesRequest==="auto")return sr(t.puzzleID,t.strategy);let e=Object.assign(Object.assign({},sr(t.puzzleID,t.strategy),t.orbitCoordinatesRequest));if(Math.abs(e.latitude)<=t.latitudeLimit)return e;{let{latitude:r,longitude:i,distance:n}=e;return{latitude:t.latitudeLimit*Math.sign(r),longitude:i,distance:n}}}},Cn={latitude:31.717474411461005,longitude:0,distance:5.877852522924731},En={latitude:35,longitude:30,distance:6},nr={latitude:35,longitude:30,distance:6.25},Nn={latitude:Math.atan(1/2)*Ft,longitude:0,distance:6.7},Pn={latitude:26.56505117707799,longitude:0,distance:6};function sr(t,e){if(t[1]==="x")return e==="Cube3D"?En:nr;switch(t){case"megaminx":case"gigaminx":return Nn;case"pyraminx":case"master_tetraminx":return Pn;case"skewb":return nr;default:return Cn}}var Rn=class{constructor(t){o(this,"background",new Sn);o(this,"colorSchemeRequest",new Tn);o(this,"dragInput",new Mn);o(this,"foundationDisplay",new cn);o(this,"foundationStickerSpriteURL",new St);o(this,"fullscreenElement",new An);o(this,"hintFacelet",new Vt);o(this,"hintStickerSpriteURL",new St);o(this,"initialHintFaceletsAnimation",new dn);o(this,"latitudeLimit",new bn);o(this,"movePressInput",new zn);o(this,"movePressCancelOptions",new xn);o(this,"orbitCoordinatesRequest",new Dn);o(this,"stickeringMaskRequest",new vn);o(this,"stickeringRequest",new yn);o(this,"faceletScale",new ln);o(this,"colorScheme",new Ln({colorSchemeRequest:this.colorSchemeRequest}));o(this,"foundationStickerSprite",new ir({spriteURL:this.foundationStickerSpriteURL}));o(this,"hintStickerSprite",new ir({spriteURL:this.hintStickerSpriteURL}));o(this,"orbitCoordinates");o(this,"stickeringMask");this.twistyPlayerModel=t,this.orbitCoordinates=new kn({orbitCoordinatesRequest:this.orbitCoordinatesRequest,latitudeLimit:this.latitudeLimit,puzzleID:t.puzzleID,strategy:t.visualizationStrategy}),this.stickeringMask=new gn({stickeringMaskRequest:this.stickeringMaskRequest,stickeringRequest:this.stickeringRequest,puzzleLoader:t.puzzleLoader})}},On={errors:[]},jn=class extends v{getDefaultValue(){return On}reset(){this.set(this.getDefaultValue())}canReuseValue(t,e){return vt(t.errors,e.errors)}},Vn=class{constructor(){o(this,"userVisibleErrorTracker",new jn);o(this,"alg",new Jt);o(this,"backView",new rn);o(this,"controlPanel",new ai);o(this,"catchUpMove",new xi);o(this,"indexerConstructorRequest",new Fi);o(this,"playingInfo",new Ji);o(this,"puzzleDescriptionRequest",new Yi);o(this,"puzzleIDRequest",new _i);o(this,"setupAnchor",new qi);o(this,"setupAlg",new Jt);o(this,"setupTransformation",new Qi);o(this,"tempoScale",new Ki);o(this,"timestampRequest",new tn);o(this,"viewerLink",new sn);o(this,"visualizationFormat",new an);o(this,"title",new Xt);o(this,"videoURL",new St);o(this,"competitionID",new Xt);o(this,"puzzleLoader",new Zi({puzzleIDRequest:this.puzzleIDRequest,puzzleDescriptionRequest:this.puzzleDescriptionRequest},this.userVisibleErrorTracker));o(this,"kpuzzle",new Hi({puzzleLoader:this.puzzleLoader}));o(this,"puzzleID",new Gi({puzzleLoader:this.puzzleLoader}));o(this,"puzzleAlg",new rr({algWithIssues:this.alg,kpuzzle:this.kpuzzle}));o(this,"puzzleSetupAlg",new rr({algWithIssues:this.setupAlg,kpuzzle:this.kpuzzle}));o(this,"visualizationStrategy",new on({visualizationRequest:this.visualizationFormat,puzzleID:this.puzzleID}));o(this,"indexerConstructor",new Vi({alg:this.alg,puzzle:this.puzzleID,visualizationStrategy:this.visualizationStrategy,indexerConstructorRequest:this.indexerConstructorRequest}));o(this,"setupAlgTransformation",new yi({setupAlg:this.puzzleSetupAlg,kpuzzle:this.kpuzzle}));o(this,"indexer",new Ui({indexerConstructor:this.indexerConstructor,algWithIssues:this.puzzleAlg,kpuzzle:this.kpuzzle}));o(this,"anchorTransformation",new Mi({setupTransformation:this.setupTransformation,setupAnchor:this.setupAnchor,setupAlgTransformation:this.setupAlgTransformation,indexer:this.indexer}));o(this,"timeRange",new nn({indexer:this.indexer}));o(this,"detailedTimelineInfo",new Xi({timestampRequest:this.timestampRequest,timeRange:this.timeRange,setupAnchor:this.setupAnchor,setupAlg:this.setupAlg}));o(this,"coarseTimelineInfo",new $i({detailedTimelineInfo:this.detailedTimelineInfo,playingInfo:this.playingInfo}));o(this,"currentMoveInfo",new Si({indexer:this.indexer,detailedTimelineInfo:this.detailedTimelineInfo,catchUpMove:this.catchUpMove}));o(this,"buttonAppearance",new gi({coarseTimelineInfo:this.coarseTimelineInfo,viewerLink:this.viewerLink}));o(this,"currentLeavesSimplified",new zi({currentMoveInfo:this.currentMoveInfo}));o(this,"currentPattern",new Li({anchoredStart:this.anchorTransformation,currentLeavesSimplified:this.currentLeavesSimplified,indexer:this.indexer}));o(this,"legacyPosition",new Bi({currentMoveInfo:this.currentMoveInfo,currentPattern:this.currentPattern}));o(this,"twistySceneModel",new Rn(this))}async twizzleLink(){let[t,e,r,i,n,s,l,c]=await Promise.all([this.viewerLink.get(),this.puzzleID.get(),this.puzzleDescriptionRequest.get(),this.alg.get(),this.setupAlg.get(),this.setupAnchor.get(),this.twistySceneModel.stickeringRequest.get(),this.twistySceneModel.twistyPlayerModel.title.get()]),h=t==="experimental-twizzle-explorer",d=new URL(`https://alpha.twizzle.net/${h?"explore":"edit"}/`);return i.alg.experimentalIsEmpty()||d.searchParams.set("alg",i.alg.toString()),n.alg.experimentalIsEmpty()||d.searchParams.set("setup-alg",n.alg.toString()),s!=="start"&&d.searchParams.set("setup-anchor",s),l!=="full"&&l!==null&&d.searchParams.set("experimental-stickering",l),h&&r!==K?d.searchParams.set("puzzle-description",r):e!=="3x3x3"&&d.searchParams.set("puzzle",e),c&&d.searchParams.set("title",c),d.toString()}experimentalAddAlgLeaf(t,e){let r=t.as(p);r?this.experimentalAddMove(r,e):this.alg.set((async()=>{let n=(await this.alg.get()).alg.concat(new T([t]));return this.timestampRequest.set("end"),n})())}experimentalAddMove(t,e){let r=typeof t=="string"?new p(t):t;this.alg.set((async()=>{let[{alg:i},n]=await Promise.all([this.alg.get(),this.puzzleLoader.get()]),s=kt(i,r,{...e,...await Et(n)});return this.timestampRequest.set("end"),this.catchUpMove.set({move:r,amount:0}),s})())}experimentalRemoveFinalChild(){this.alg.set((async()=>{let t=(await this.alg.get()).alg,e=Array.from(t.childAlgNodes()),[r]=e.splice(-1);if(!r)return t;this.timestampRequest.set("end");let i=r.as(p);return i&&this.catchUpMove.set({move:i.invert(),amount:0}),new T(e)})())}};function g(t){return new Error(`Cannot get \`.${t}\` directly from a \`TwistyPlayer\`.`)}var Fn=class extends D{constructor(){super(...arguments);o(this,"experimentalModel",new Vn);o(this,"experimentalGet",new Un(this.experimentalModel))}set alg(e){this.experimentalModel.alg.set(e)}get alg(){throw g("alg")}set experimentalSetupAlg(e){this.experimentalModel.setupAlg.set(e)}get experimentalSetupAlg(){throw g("setup")}set experimentalSetupAnchor(e){this.experimentalModel.setupAnchor.set(e)}get experimentalSetupAnchor(){throw g("anchor")}set puzzle(e){this.experimentalModel.puzzleIDRequest.set(e)}get puzzle(){throw g("puzzle")}set experimentalPuzzleDescription(e){this.experimentalModel.puzzleDescriptionRequest.set(e)}get experimentalPuzzleDescription(){throw g("experimentalPuzzleDescription")}set timestamp(e){this.experimentalModel.timestampRequest.set(e)}get timestamp(){throw g("timestamp")}set hintFacelets(e){this.experimentalModel.twistySceneModel.hintFacelet.set(e)}get hintFacelets(){throw g("hintFacelets")}set experimentalStickering(e){this.experimentalModel.twistySceneModel.stickeringRequest.set(e)}get experimentalStickering(){throw g("experimentalStickering")}set experimentalStickeringMaskOrbits(e){this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(e)}get experimentalStickeringMaskOrbits(){throw g("experimentalStickeringMaskOrbits")}set experimentalFaceletScale(e){this.experimentalModel.twistySceneModel.faceletScale.set(e)}get experimentalFaceletScale(){throw g("experimentalFaceletScale")}set backView(e){this.experimentalModel.backView.set(e)}get backView(){throw g("backView")}set background(e){this.experimentalModel.twistySceneModel.background.set(e)}get background(){throw g("background")}set colorScheme(e){this.experimentalModel.twistySceneModel.colorSchemeRequest.set(e)}get colorScheme(){throw g("colorScheme")}set controlPanel(e){this.experimentalModel.controlPanel.set(e)}get controlPanel(){throw g("controlPanel")}set visualization(e){this.experimentalModel.visualizationFormat.set(e)}get visualization(){throw g("visualization")}set experimentalTitle(e){this.experimentalModel.title.set(e)}get experimentalTitle(){throw g("experimentalTitle")}set experimentalVideoURL(e){this.experimentalModel.videoURL.set(e)}get experimentalVideoURL(){throw g("experimentalVideoURL")}set experimentalCompetitionID(e){this.experimentalModel.competitionID.set(e)}get experimentalCompetitionID(){throw g("experimentalCompetitionID")}set viewerLink(e){this.experimentalModel.viewerLink.set(e)}get viewerLink(){throw g("viewerLink")}set experimentalMovePressInput(e){this.experimentalModel.twistySceneModel.movePressInput.set(e)}get experimentalMovePressInput(){throw g("experimentalMovePressInput")}set experimentalMovePressCancelOptions(e){this.experimentalModel.twistySceneModel.movePressCancelOptions.set(e)}get experimentalMovePressCancelOptions(){throw g("experimentalMovePressCancelOptions")}set cameraLatitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({latitude:e})}get cameraLatitude(){throw g("cameraLatitude")}set cameraLongitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({longitude:e})}get cameraLongitude(){throw g("cameraLongitude")}set cameraDistance(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({distance:e})}get cameraDistance(){throw g("cameraDistance")}set cameraLatitudeLimit(e){this.experimentalModel.twistySceneModel.latitudeLimit.set(e)}get cameraLatitudeLimit(){throw g("cameraLatitudeLimit")}set indexer(e){this.experimentalModel.indexerConstructorRequest.set(e)}get indexer(){throw g("indexer")}set tempoScale(e){this.experimentalModel.tempoScale.set(e)}get tempoScale(){throw g("tempoScale")}set experimentalSprite(e){this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(e)}get experimentalSprite(){throw g("experimentalSprite")}set experimentalHintSprite(e){this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(e)}get experimentalHintSprite(){throw g("experimentalHintSprite")}set fullscreenElement(e){this.experimentalModel.twistySceneModel.fullscreenElement.set(e)}get fullscreenElement(){throw g("fullscreenElement")}set experimentalInitialHintFaceletsAnimation(e){this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(e)}get experimentalInitialHintFaceletsAnimation(){throw g("experimentalInitialHintFaceletsAnimation")}set experimentalDragInput(e){this.experimentalModel.twistySceneModel.dragInput.set(e)}get experimentalDragInput(){throw g("experimentalDragInput")}},Un=class{constructor(t){this.model=t}async alg(){return(await this.model.alg.get()).alg}async setupAlg(){return(await this.model.setupAlg.get()).alg}puzzleID(){return this.model.puzzleID.get()}async timestamp(){return(await this.model.detailedTimelineInfo.get()).timestamp}},wt="data-",qe={alg:"alg","experimental-setup-alg":"experimentalSetupAlg","experimental-setup-anchor":"experimentalSetupAnchor",puzzle:"puzzle","experimental-puzzle-description":"experimentalPuzzleDescription",visualization:"visualization","hint-facelets":"hintFacelets","experimental-stickering":"experimentalStickering","experimental-stickering-mask-orbits":"experimentalStickeringMaskOrbits",background:"background","color-scheme":"colorScheme","control-panel":"controlPanel","back-view":"backView","experimental-initial-hint-facelets-animation":"experimentalInitialHintFaceletsAnimation","viewer-link":"viewerLink","experimental-move-press-input":"experimentalMovePressInput","experimental-drag-input":"experimentalDragInput","experimental-title":"experimentalTitle","experimental-video-url":"experimentalVideoURL","experimental-competition-id":"experimentalCompetitionID","camera-latitude":"cameraLatitude","camera-longitude":"cameraLongitude","camera-distance":"cameraDistance","camera-latitude-limit":"cameraLatitudeLimit","tempo-scale":"tempoScale","experimental-sprite":"experimentalSprite","experimental-hint-sprite":"experimentalHintSprite"},Bn=Object.fromEntries(Object.values(qe).map(t=>[t,!0])),Wn={experimentalMovePressCancelOptions:!0},tt,ye,ae,Me,xe,R,ze,Se,rt,Gr,zr,ot=(zr=class extends Fn{constructor(e={}){super();u(this,rt);o(this,"controller",new ni(this.experimentalModel,this));o(this,"buttons");o(this,"experimentalCanvasClickCallback",()=>{});u(this,tt,new at(this,"controls-",["auto"].concat(Object.keys(si))));u(this,ye,document.createElement("div"));u(this,ae,document.createElement("div"));u(this,Me,!1);u(this,xe,"auto");u(this,R,null);u(this,ze,new Dr);u(this,Se,null);for(let[r,i]of Object.entries(e)){if(!(Bn[r]||Wn[r])){console.warn(`Invalid config passed to TwistyPlayer: ${r}`);break}this[r]=i}}async connectedCallback(){if(a(this,Me))return;f(this,Me,!0),this.addCSS(Br),this.addElement(a(this,ye)).classList.add("visualization-wrapper"),this.addElement(a(this,ae)).classList.add("error-elem"),a(this,ae).textContent="Error",this.experimentalModel.userVisibleErrorTracker.addFreshListener(r=>{let i=r.errors[0]??null;this.contentWrapper.classList.toggle("error",!!i),i&&(a(this,ae).textContent=i)});let e=new Vr(this.experimentalModel,this.controller);this.contentWrapper.appendChild(e),this.buttons=new Nr(this.experimentalModel,this.controller,this),this.contentWrapper.appendChild(this.buttons),this.experimentalModel.twistySceneModel.background.addFreshListener(r=>{this.contentWrapper.classList.toggle("checkered",["auto","checkered"].includes(r)),this.contentWrapper.classList.toggle("checkered-transparent",r==="checkered-transparent")}),this.experimentalModel.twistySceneModel.colorScheme.addFreshListener(r=>{this.contentWrapper.classList.toggle("dark-mode",["dark"].includes(r))}),this.experimentalModel.controlPanel.addFreshListener(r=>{a(this,tt).setValue(r)}),this.experimentalModel.visualizationStrategy.addFreshListener(L(this,rt,Gr).bind(this)),this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this))}experimentalSetFlashLevel(e){f(this,xe,e)}flash(){a(this,xe)==="auto"&&a(this,R)?.animate([{opacity:.25},{opacity:1}],{duration:250,easing:"ease-out"})}async experimentalCurrentVantages(){this.connectedCallback();let e=a(this,R);return e instanceof xt?e.experimentalVantages():[]}async experimentalCurrentCanvases(){let e=await this.experimentalCurrentVantages(),r=[];for(let i of e)r.push((await i.canvasInfo()).canvas);return r}async experimentalCurrentThreeJSPuzzleObject(e){this.connectedCallback();let i=await(await a(this,ze).promise).experimentalTwisty3DPuzzleWrapper(),n=i.twisty3DPuzzle(),s=(async()=>{await n,await new Promise(l=>setTimeout(l,0))})();if(e){let l=new he(async()=>{});i.addEventListener("render-scheduled",async()=>{l.requestIsPending()||(l.requestAnimFrame(),await s,e())})}return n}jumpToStart(e){this.controller.jumpToStart(e)}jumpToEnd(e){this.controller.jumpToEnd(e)}play(){this.controller.togglePlay(!0)}pause(){this.controller.togglePlay(!1)}togglePlay(e){this.controller.togglePlay(e)}experimentalAddMove(e,r){this.experimentalModel.experimentalAddMove(e,r)}experimentalAddAlgLeaf(e,r){this.experimentalModel.experimentalAddAlgLeaf(e,r)}static get observedAttributes(){let e=[];for(let r of Object.keys(qe))e.push(r,wt+r);return e}experimentalRemoveFinalChild(){this.experimentalModel.experimentalRemoveFinalChild()}attributeChangedCallback(e,r,i){e.startsWith(wt)&&(e=e.slice(wt.length));let n=qe[e];n&&(this[n]=i)}async experimentalScreenshot(e){return(await $t(this.experimentalModel,e)).dataURL}async experimentalDownloadScreenshot(e){if(["2D","experimental-2D-LL","experimental-2D-LL-face"].includes(await this.experimentalModel.visualizationStrategy.get())){let i=await a(this,R).currentTwisty2DPuzzleWrapper().twisty2DPuzzle(),n=new XMLSerializer().serializeToString(i.svgWrapper.svgElement),s=URL.createObjectURL(new Blob([n]));Ur(s,e??await Fr(this.experimentalModel),"svg")}else await(await $t(this.experimentalModel)).download(e)}},tt=new WeakMap,ye=new WeakMap,ae=new WeakMap,Me=new WeakMap,xe=new WeakMap,R=new WeakMap,ze=new WeakMap,Se=new WeakMap,rt=new WeakSet,Gr=function(e){if(e!==a(this,Se)){a(this,R)?.remove(),a(this,R)?.disconnect();let r;switch(e){case"2D":case"experimental-2D-LL":case"experimental-2D-LL-face":{r=new br(this.experimentalModel.twistySceneModel,e);break}case"Cube3D":case"PG3D":{r=new xt(this.experimentalModel),a(this,ze).handleNewValue(r);break}default:throw new Error("Invalid visualization")}a(this,ye).appendChild(r),f(this,R,r),f(this,Se,e)}},zr);A.define("twisty-player",ot);var _r=new b;_r.replaceSync(`
:host {
  display: inline;
}

.wrapper {
  display: inline;
}

a:not(:hover) {
  color: inherit;
  text-decoration: none;
}

twisty-alg-leaf-elem.twisty-alg-comment {
  color: rgba(0, 0, 0, 0.4);
}

.wrapper.current-move {
  background: rgba(66, 133, 244, 0.3);
  margin-left: -0.1em;
  margin-right: -0.1em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  border-radius: 0.1em;
}
`);async function qn(t){return new Promise((e,r)=>{let i=document.getElementById(t);i&&e(i);let n=new MutationObserver(s=>{for(let l of s)l.attributeName==="id"&&l.target instanceof Element&&l.target.getAttribute("id")===t&&(e(l.target),n.disconnect())});n.observe(document.body,{attributeFilter:["id"],subtree:!0})})}var Qn=250,te=class extends D{constructor(t,e,r,i,n,s){if(super({mode:"open"}),this.algOrAlgNode=i,this.classList.add(t),this.addCSS(_r),s){let l=this.contentWrapper.appendChild(document.createElement("a"));l.href="#",l.textContent=e,l.addEventListener("click",c=>{c.preventDefault(),r.twistyAlgViewer.jumpToIndex(r.earliestMoveIndex,n)})}else this.contentWrapper.appendChild(document.createElement("span")).textContent=e}pathToIndex(t){return[]}setCurrentMove(t){this.contentWrapper.classList.toggle("current-move",t)}};A.define("twisty-alg-leaf-elem",te);var re=class extends pt{constructor(e,r){super();o(this,"queue",[]);this.algOrAlgNode=r,this.classList.add(e)}addString(e){this.queue.push(document.createTextNode(e))}addElem(e){return this.queue.push(e.element),e.moveCount}flushQueue(e=1){for(let r of Zr(this.queue,e))this.append(r);this.queue=[]}pathToIndex(e){return[]}};A.define("twisty-alg-wrapper-elem",re);function Hn(t){return t===1?-1:1}function Yn(t,e){return e<0?Hn(t):t}function Zr(t,e){if(e===1)return t;let r=Array.from(t);return r.reverse(),r}var Gn=class extends Ne{traverseAlg(t,e){let r=0,i=new re("twisty-alg-alg",t),n=!0;for(let s of It(t.childAlgNodes(),e.direction))n||i.addString(" "),n=!1,s.as(dt)?.experimentalNISSGrouping&&i.addString("^("),s.as(ce)?.experimentalNISSPlaceholder||(r+=i.addElem(this.traverseAlgNode(s,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction}))),s.as(dt)?.experimentalNISSGrouping&&i.addString(")");return i.flushQueue(e.direction),{moveCount:r,element:i}}traverseGrouping(t,e){let r=t.experimentalAsSquare1Tuple(),i=Yn(e.direction,t.amount),n=0,s=new re("twisty-alg-grouping",t);return s.addString("("),r?(n+=s.addElem({moveCount:1,element:new te("twisty-alg-move",r[0].amount.toString(),e,r[0],!0,!0)}),s.addString(", "),n+=s.addElem({moveCount:1,element:new te("twisty-alg-move",r[1].amount.toString(),e,r[1],!0,!0)})):n+=s.addElem(this.traverseAlg(t.alg,{earliestMoveIndex:e.earliestMoveIndex+n,twistyAlgViewer:e.twistyAlgViewer,direction:i})),s.addString(`)${t.experimentalRepetitionSuffix}`),s.flushQueue(),{moveCount:n*Math.abs(t.amount),element:s}}traverseMove(t,e){let r=new te("twisty-alg-move",t.toString(),e,t,!0,!0);return e.twistyAlgViewer.highlighter.addMove(t.startCharIndex,r),{moveCount:1,element:r}}traverseCommutator(t,e){let r=0,i=new re("twisty-alg-commutator",t);i.addString("["),i.flushQueue();let[n,s]=Zr([t.A,t.B],e.direction);return r+=i.addElem(this.traverseAlg(n,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.addString(", "),r+=i.addElem(this.traverseAlg(s,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.flushQueue(e.direction),i.addString("]"),i.flushQueue(),{moveCount:r*2,element:i}}traverseConjugate(t,e){let r=0,i=new re("twisty-alg-conjugate",t);i.addString("[");let n=i.addElem(this.traverseAlg(t.A,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction}));return r+=n,i.addString(": "),r+=i.addElem(this.traverseAlg(t.B,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.addString("]"),i.flushQueue(),{moveCount:r+n,element:i}}traversePause(t,e){return t.experimentalNISSGrouping?this.traverseAlg(t.experimentalNISSGrouping.alg,e):{moveCount:1,element:new te("twisty-alg-pause",".",e,t,!0,!0)}}traverseNewline(t,e){let r=new re("twisty-alg-newline",t);return r.append(document.createElement("br")),{moveCount:0,element:r}}traverseLineComment(t,e){return{moveCount:0,element:new te("twisty-alg-line-comment",`//${t.text}`,e,t,!1,!1)}}},_n=ue(Gn),Zn=class{constructor(){o(this,"moveCharIndexMap",new Map);o(this,"currentElem",null)}addMove(t,e){this.moveCharIndexMap.set(t,e)}set(t){let e=t?this.moveCharIndexMap.get(t.startCharIndex)??null:null;this.currentElem!==e&&(this.currentElem?.classList.remove("twisty-alg-current-move"),this.currentElem?.setCurrentMove(!1),e?.classList.add("twisty-alg-current-move"),e?.setCurrentMove(!0),this.currentElem=e)}},Le,O,it,Xr,Sr,$r=(Sr=class extends pt{constructor(e){super();u(this,it);o(this,"highlighter",new Zn);u(this,Le,void 0);u(this,O,null);o(this,"lastClickTimestamp",null);e?.twistyPlayer&&(this.twistyPlayer=e?.twistyPlayer)}connectedCallback(){}setAlg(e){f(this,Le,_n(e,{earliestMoveIndex:0,twistyAlgViewer:this,direction:1}).element),this.textContent="",this.appendChild(a(this,Le))}get twistyPlayer(){return a(this,O)}set twistyPlayer(e){L(this,it,Xr).call(this,e)}async jumpToIndex(e,r){let i=a(this,O);if(i){i.pause();let n=(async()=>{let s=await i.experimentalModel.indexer.get(),l=r?Qn:0;return s.indexToMoveStartTimestamp(e)+s.moveDuration(e)-l})();i.experimentalModel.timestampRequest.set(await n),this.lastClickTimestamp===await n?(i.play(),this.lastClickTimestamp=null):this.lastClickTimestamp=await n}}async attributeChangedCallback(e,r,i){if(e==="for"){let n=document.getElementById(i);if(n||console.info("for= elem does not exist, waiting for one"),await customElements.whenDefined("twisty-player"),n=await qn(i),!(n instanceof ot)){console.warn("for= elem is not a twisty-player");return}this.twistyPlayer=n}}static get observedAttributes(){return["for"]}},Le=new WeakMap,O=new WeakMap,it=new WeakSet,Xr=async function(e){if(a(this,O)){console.warn("twisty-player reassignment is not supported");return}if(e===null)throw new Error("clearing twistyPlayer is not supported");f(this,O,e),a(this,O).experimentalModel.alg.addFreshListener(n=>{this.setAlg(n.alg)});let r=(await a(this,O).experimentalModel.alg.get()).alg,i="startCharIndex"in r?r:T.fromString(r.toString());this.setAlg(i),e.experimentalModel.currentMoveInfo.addFreshListener(n=>{let s=n.currentMoves[0];if(s??(s=n.movesStarting[0]),s??(s=n.movesFinishing[0]),!s)this.highlighter.set(null);else{let l=s.move;this.highlighter.set(l)}}),e.experimentalModel.detailedTimelineInfo.addFreshListener(n=>{n.timestamp!==this.lastClickTimestamp&&(this.lastClickTimestamp=null)})},Sr);A.define("twisty-alg-viewer",$r);var $n=class extends Ne{traverseAlg(t,e){let r=[],i=0;for(let n of t.childAlgNodes()){let s=this.traverseAlgNode(n,{numMovesSofar:e.numMovesSofar+i});r.push(s.tokens),i+=s.numLeavesInside}return{tokens:Array.prototype.concat(...r),numLeavesInside:i}}traverseGrouping(t,e){let r=this.traverseAlg(t.alg,e);return{tokens:r.tokens,numLeavesInside:r.numLeavesInside*t.amount}}traverseMove(t,e){return{tokens:[{leaf:t,idx:e.numMovesSofar}],numLeavesInside:1}}traverseCommutator(t,e){let r=this.traverseAlg(t.A,e),i=this.traverseAlg(t.B,{numMovesSofar:e.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside}}traverseConjugate(t,e){let r=this.traverseAlg(t.A,e),i=this.traverseAlg(t.B,{numMovesSofar:e.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside*2}}traversePause(t,e){return{tokens:[{leaf:t,idx:e.numMovesSofar}],numLeavesInside:1}}traverseNewline(t,e){return{tokens:[],numLeavesInside:0}}traverseLineComment(t,e){return{tokens:[],numLeavesInside:0}}},Xn=ue($n),Jn=class extends v{getDefaultValue(){return""}},Kn=class extends y{derive(t){return qr(t.value)}},es=class extends F{getDefaultValue(){return{selectionStart:0,selectionEnd:0,endChangedMostRecently:!1}}async derive(t,e){let{selectionStart:r,selectionEnd:i}=t,n=await e,s=t.selectionStart===n.selectionStart&&t.selectionEnd!==(await e).selectionEnd;return{selectionStart:r,selectionEnd:i,endChangedMostRecently:s}}},ts=class extends y{derive(t){return t.selectionInfo.endChangedMostRecently?t.selectionInfo.selectionEnd:t.selectionInfo.selectionStart}},rs=class extends y{derive(t){return Xn(t.algWithIssues.alg,{numMovesSofar:0}).tokens}},is=class extends y{derive(t){function e(i){if(i===null)return null;let n;return t.targetChar<i.leaf.startCharIndex?n="before":t.targetChar===i.leaf.startCharIndex?n="start":t.targetChar<i.leaf.endCharIndex?n="inside":t.targetChar===i.leaf.endCharIndex?n="end":n="after",{leafInfo:i,where:n}}let r=null;for(let i of t.leafTokens){if(t.targetChar<i.leaf.startCharIndex&&r!==null)return e(r);if(t.targetChar<=i.leaf.endCharIndex)return e(i);r=i}return e(r)}},ns=class{constructor(){o(this,"valueProp",new Jn);o(this,"selectionProp",new es);o(this,"targetCharProp",new ts({selectionInfo:this.selectionProp}));o(this,"algEditorAlgWithIssues",new Kn({value:this.valueProp}));o(this,"leafTokensProp",new rs({algWithIssues:this.algEditorAlgWithIssues}));o(this,"leafToHighlight",new is({leafTokens:this.leafTokensProp,targetChar:this.targetCharProp}))}},ss="//";function as(t){try{return T.fromString(t)}catch{return null}}function Jr(t,e){let r=t.indexOf(e);return r===-1?[t,""]:[t.slice(0,r),t.slice(r)]}function ar(t){let e=[];for(let r of t.split(`
`)){let[i,n]=Jr(r,ss);i=i.replaceAll("\u2019","'"),e.push(i+n)}return e.join(`
`)}function os(t,e){let{value:r}=t,{selectionStart:i,selectionEnd:n}=t,s=r.slice(0,i),l=r.slice(n);e=e.replaceAll(`\r
`,`
`);let c=s.match(/\/\/[^\n]*$/),h=r[i-1]==="/"&&e[0]==="/",d=c||h,w=e.match(/\/\/[^\n]*$/),m=e;if(d){let[E,J]=Jr(e,`
`);m=E+ar(J)}else m=ar(e);let S=!d&&i!==0&&![`
`," "].includes(m[0])&&![`
`," "].includes(r[i-1]),x=!w&&n!==r.length&&![`
`," "].includes(m.at(-1))&&![`
`," "].includes(r[n]);function I(E,J){let Ce=E+m+J,Ee=!!as(s+Ce+l);return Ee&&(m=Ce),Ee}S&&x&&I(" "," ")||S&&I(" ","")||x&&I(""," "),Q?.execCommand("insertText",!1,m)||t.setRangeText(m,i,n,"end")}var Kr=new b;Kr.replaceSync(`
:host {
  width: 384px;
  display: grid;
}

.wrapper {
  /*overflow: hidden;
  resize: horizontal;*/

  background: var(--background, none);
  display: grid;
}

textarea, .carbon-copy {
  grid-area: 1 / 1 / 2 / 2;

  width: 100%;
  font-family: sans-serif;
  line-height: 1.2em;

  font-size: var(--font-size, inherit);
  font-family: var(--font-family, sans-serif);

  box-sizing: border-box;

  padding: var(--padding, 0.5em);
  /* Prevent horizontal growth. */
  overflow-x: hidden;
}

textarea {
  resize: none;
  background: none;
  z-index: 2;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.25));
}

.carbon-copy {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  user-select: none;
  pointer-events: none;

  z-index: 1;
}

.carbon-copy .highlight {
  background: var(--highlight-color, rgba(255, 128, 0, 0.5));
  padding: 0.1em 0.2em;
  margin: -0.1em -0.2em;
  border-radius: 0.2em;
}

.wrapper.issue-warning textarea,
.wrapper.valid-for-puzzle-warning textarea {
  outline: none;
  border: 1px solid rgba(200, 200, 0, 0.5);
  background: rgba(255, 255, 0, 0.1);
}

.wrapper.issue-error textarea,
.wrapper.valid-for-puzzle-error textarea {
  outline: none;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.1);
}
`);var Re="for-twisty-player",or="placeholder",lr="twisty-player-prop",M,W,Z,j,$,nt,C,V,oe,Fe,Te,Ae,Lt,Ie,Lr,ls=(Lr=class extends D{constructor(e){super();u(this,oe);u(this,Ae);o(this,"model",new ns);u(this,M,document.createElement("textarea"));u(this,W,document.createElement("div"));u(this,Z,document.createElement("span"));u(this,j,document.createElement("span"));u(this,$,document.createElement("span"));u(this,nt,new at(this,"valid-for-puzzle-",["none","warning","error"]));u(this,C,null);u(this,V,void 0);o(this,"debugNeverRequestTimestamp",!1);u(this,Te,!1);u(this,Ie,null);a(this,W).classList.add("carbon-copy"),this.addElement(a(this,W)),a(this,M).rows=1,this.addElement(a(this,M)),a(this,Z).classList.add("prefix"),a(this,W).appendChild(a(this,Z)),a(this,j).classList.add("highlight"),a(this,W).appendChild(a(this,j)),a(this,$).classList.add("suffix"),a(this,W).appendChild(a(this,$)),a(this,M).placeholder="Alg",a(this,M).setAttribute("spellcheck","false"),this.addCSS(Kr),a(this,M).addEventListener("input",()=>{f(this,Te,!0),this.onInput()}),a(this,M).addEventListener("blur",()=>this.onBlur()),document.addEventListener("selectionchange",()=>this.onSelectionChange()),e?.twistyPlayer&&(this.twistyPlayer=e.twistyPlayer),f(this,V,e?.twistyPlayerProp??"alg"),e?.twistyPlayerProp==="alg"&&this.model.leafToHighlight.addFreshListener(r=>{r&&this.highlightLeaf(r.leafInfo.leaf)})}connectedCallback(){a(this,M).addEventListener("paste",e=>{let r=e.clipboardData?.getData("text");r&&(os(a(this,M),r),e.preventDefault(),this.onInput())})}set algString(e){a(this,M).value=e,this.onInput()}get algString(){return a(this,M).value}set placeholder(e){a(this,M).placeholder=e}onInput(){a(this,j).hidden=!0,this.highlightLeaf(null);let e=a(this,M).value.trimEnd();this.model.valueProp.set(e),a(this,oe,Fe)?.set(e)}async onSelectionChange(){if(document.activeElement!==this||this.shadow.activeElement!==a(this,M)||a(this,V)!=="alg")return;let{selectionStart:e,selectionEnd:r}=a(this,M);this.model.selectionProp.set({selectionStart:e,selectionEnd:r})}async onBlur(){}setAlgIssueClassForPuzzle(e){a(this,nt).setValue(e)}highlightLeaf(e){if(a(this,V)==="alg"){if(e===null){a(this,Z).textContent="",a(this,j).textContent="",a(this,$).textContent=L(this,Ae,Lt).call(this,a(this,M).value);return}e!==a(this,Ie)&&(f(this,Ie,e),a(this,Z).textContent=a(this,M).value.slice(0,e.startCharIndex),a(this,j).textContent=a(this,M).value.slice(e.startCharIndex,e.endCharIndex),a(this,$).textContent=L(this,Ae,Lt).call(this,a(this,M).value.slice(e.endCharIndex)),a(this,j).hidden=!1)}}get twistyPlayer(){return a(this,C)}set twistyPlayer(e){if(a(this,C)){console.warn("twisty-player reassignment/clearing is not supported");return}f(this,C,e),e&&((async()=>this.algString=a(this,oe,Fe)?(await a(this,oe,Fe).get()).alg.toString():"")(),a(this,V)==="alg"&&(a(this,C)?.experimentalModel.puzzleAlg.addFreshListener(r=>{if(r.issues.errors.length===0){this.setAlgIssueClassForPuzzle(r.issues.warnings.length===0?"none":"warning");let i=r.alg,n=T.fromString(this.algString);i.isIdentical(n)||(this.algString=i.toString(),this.onInput())}else this.setAlgIssueClassForPuzzle("error")}),this.model.leafToHighlight.addFreshListener(async r=>{if(r===null)return;let[i,n]=await Promise.all([await e.experimentalModel.indexer.get(),await e.experimentalModel.timestampRequest.get()]);if(n==="auto"&&!a(this,Te))return;let s=i.indexToMoveStartTimestamp(r.leafInfo.idx),l=i.moveDuration(r.leafInfo.idx),c;switch(r.where){case"before":{c=s;break}case"start":case"inside":{c=s+l/4;break}case"end":case"after":{c=s+l;break}default:throw console.log("invalid where"),new Error("Invalid where!")}this.debugNeverRequestTimestamp||e.experimentalModel.timestampRequest.set(c)}),e.experimentalModel.currentLeavesSimplified.addFreshListener(async r=>{let n=(await e.experimentalModel.indexer.get()).getAnimLeaf(r.patternIndex);this.highlightLeaf(n)})))}attributeChangedCallback(e,r,i){switch(e){case Re:{let n=document.getElementById(i);if(!n){console.warn(`${Re}= elem does not exist`);return}if(!(n instanceof ot)){console.warn(`${Re}=is not a twisty-player`);return}this.twistyPlayer=n;return}case or:{this.placeholder=i;return}case lr:{if(a(this,C))throw console.log("cannot set prop"),new Error("cannot set prop after twisty player");f(this,V,i);return}}}static get observedAttributes(){return[Re,or,lr]}},M=new WeakMap,W=new WeakMap,Z=new WeakMap,j=new WeakMap,$=new WeakMap,nt=new WeakMap,C=new WeakMap,V=new WeakMap,oe=new WeakSet,Fe=function(){return a(this,C)===null?null:a(this,C).experimentalModel[a(this,V)]},Te=new WeakMap,Ae=new WeakSet,Lt=function(e){return e.endsWith(`
`)?`${e} `:e},Ie=new WeakMap,Lr);A.define("twisty-alg-editor",ls);var Ue=new b;Ue.replaceSync(`
.wrapper {
  background: rgb(255, 245, 235);
  border: 1px solid rgba(0, 0, 0, 0.25);

  /* Workaround from https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable */
  --text-color: 0, 0, 0;
  --heading-background: 255, 230, 210;

  color: rgb(var(--text-color));
}

.setup-alg, twisty-alg-viewer {
  padding: 0.5em 1em;
}

.heading {
  background: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  font-weight: bold;
  padding: 0.25em 0.5em;
  display: grid;
  grid-template-columns: auto 1fr;

  /* For the move count hover elems. */
  position: sticky;
}

.heading.title {
  background: rgb(255, 245, 235);
  font-size: 150%;
  white-space: pre-wrap;
}

.heading .move-count {
  font-weight: initial;
  text-align: right;
  color: rgba(var(--text-color), 0.4);
}

.wrapper.dark-mode .heading .move-count {
  color: rgba(var(--text-color), 0.7);
}

.heading a {
  text-decoration: none;
  color: inherit;
}

twisty-player {
  width: 100%;
  min-height: 128px;
  height: 288px;
  resize: vertical;
  overflow-y: hidden;
}

twisty-player + .heading {
  padding-top: 0.5em;
}

twisty-alg-viewer {
  display: inline-block;
}

.wrapper {
  container-type: inline-size;
}

.scrollable-region {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}

.scrollable-region {
  max-height: 18em;
  overflow-y: auto;
}

@container (min-width: 512px) {
  .responsive-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  twisty-player {
    height: 320px
  }
  .scrollable-region {
    border-top: none;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    contain: strict;
    max-height: 100cqh;
  }
}

.wrapper:fullscreen,
.wrapper:fullscreen .responsive-wrapper {
  width: 100%;
  height: 100%;
}

.wrapper:fullscreen twisty-player,
.wrapper:fullscreen .scrollable-region {
  height: 50%;
}

@container (min-width: 512px) {
  .wrapper:fullscreen twisty-player,
  .wrapper:fullscreen .scrollable-region {
    height: 100%;
  }
}

/* TODO: dedup with Twizzle Editor */
.move-count > span:hover:before {
  background-color: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  backdrop-filter: blur(4px);
  z-index: 100;
  position: absolute;
  padding: 0.5em;
  top: 1.5em;
  right: 0;
  content: attr(data-before);
  white-space: pre-wrap;
  text-align: left;
}

.move-count > span:hover {
  color: rgba(var(--text-color), 1);
  cursor: help;
}
`);var ei=new b;ei.replaceSync(`
.wrapper {
  background: white;
  --heading-background: 232, 239, 253
}

.wrapper.dark-mode {
  --text-color: 236, 236, 236;
  --heading-background: 29, 29, 29;
}

.scrollable-region {
  overflow-y: auto;
}

.wrapper.dark-mode {
  background: #262626;
  --text-color: 142, 142, 142;
  border-color: #FFFFFF44;
  color-scheme: dark;
}

.wrapper.dark-mode .heading:not(.title) {
  background: #1d1d1d;
}

.heading.title {
  background: none;
}
`);function cs(t="",e=location.href){let r={alg:"alg","setup-alg":"experimental-setup-alg","setup-anchor":"experimental-setup-anchor",puzzle:"puzzle",stickering:"experimental-stickering","puzzle-description":"experimental-puzzle-description",title:"experimental-title","video-url":"experimental-video-url",competition:"experimental-competition-id"},i=new URL(e).searchParams,n={};for(let[s,l]of Object.entries(r)){let c=i.get(t+s);if(c!==null){let h=qe[l];n[h]=c}}return n}var Oe="outer block moves (e.g. R, Rw, or 4r)",je="inner block moves (e.g. M or 2-5r)",cr={OBTM:`HTM = OBTM ("Outer Block Turn Metric"):
\u2022 ${je} count as 2 turns
\u2022 ${Oe} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,OBQTM:`QTM = OBQTM ("Outer Block Quantum Turn Metric"):
\u2022 ${je} count as 2 turns per quantum (e.g. M2 counts as 4)
\u2022 ${Oe} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,RBTM:`STM = RBTM ("Range Block Turn Metric"):
\u2022 ${je} count as 1 turn
\u2022 ${Oe} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,RBQTM:`SQTM = RBQTM ("Range Block Quantum Turn Metric"):
\u2022 ${je} count as 1 turn per quantum (e.g. M2 counts as 2)
\u2022 ${Oe} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,ETM:`ETM ("Execution Turn Metric"):
\u2022 all moves (including rotations) count as 1 turn`},ds={OBTM:"OB",OBQTM:"OBQ",RBTM:"RB",RBQTM:"RBQ",ETM:"E"},be,Tt,st,q,X,De,le,Be,Tr,us=(Tr=class extends D{constructor(e){super({mode:"open"});u(this,be);u(this,le);o(this,"twistyPlayer",null);o(this,"a",null);u(this,st,void 0);u(this,q,void 0);u(this,X,void 0);u(this,De,void 0);this.options=e}async connectedCallback(){if(f(this,X,this.addElement(document.createElement("div"))),a(this,X).classList.add("responsive-wrapper"),this.options?.colorScheme==="dark"&&this.contentWrapper.classList.add("dark-mode"),this.addCSS(Ue),this.options?.cdnForumTweaks&&this.addCSS(ei),this.a=this.querySelector("a"),!this.a)return;let e=cs("",this.a.href),r=this.a?.href,{hostname:i,pathname:n}=new URL(r);if(i!=="alpha.twizzle.net"){L(this,be,Tt).call(this);return}if(["/edit/","/explore/"].includes(n)){let s=n==="/explore/";if(e.puzzle&&!(e.puzzle in ut)){let h=(await import("../chunks/puzzle-geometry-Y2FXGI7J.js")).getPuzzleDescriptionString(e.puzzle);delete e.puzzle,e.experimentalPuzzleDescription=h}if(this.twistyPlayer=a(this,X).appendChild(new ot({background:this.options?.cdnForumTweaks?"checkered-transparent":"checkered",colorScheme:this.options?.colorScheme==="dark"?"dark":"light",...e,viewerLink:s?"experimental-twizzle-explorer":"auto"})),this.twistyPlayer.fullscreenElement=this.contentWrapper,e.experimentalTitle&&(this.twistyPlayer.experimentalTitle=e.experimentalTitle),f(this,q,a(this,X).appendChild(document.createElement("div"))),a(this,q).classList.add("scrollable-region"),e.experimentalTitle&&L(this,le,Be).call(this,e.experimentalTitle).classList.add("title"),e.experimentalSetupAlg){L(this,le,Be).call(this,"Setup",async()=>(await this.twistyPlayer?.experimentalModel.setupAlg.get())?.alg.toString()??null);let h=a(this,q).appendChild(document.createElement("div"));h.classList.add("setup-alg"),h.textContent=new T(e.experimentalSetupAlg).toString()}let l=L(this,le,Be).call(this,"Moves",async()=>(await this.twistyPlayer?.experimentalModel.alg.get())?.alg.toString()??null);f(this,De,l.appendChild(hs(this.twistyPlayer.experimentalModel))),a(this,De).classList.add("move-count"),a(this,q).appendChild(new $r({twistyPlayer:this.twistyPlayer})).part.add("twisty-alg-viewer")}else L(this,be,Tt).call(this)}},be=new WeakSet,Tt=function(){if(this.contentWrapper.textContent="",this.a){let r=this.contentWrapper.appendChild(document.createElement("span"));r.textContent="\u2757\uFE0F",r.title="Could not show a player for link",this.addElement(this.a)}this.removeCSS(Ue);let e=this.shadow.adoptedStyleSheets.indexOf(Ue);typeof e<"u"&&this.shadow.adoptedStyleSheets.splice(e,e+1),a(this,st)?.remove()},st=new WeakMap,q=new WeakMap,X=new WeakMap,De=new WeakMap,le=new WeakSet,Be=function(e,r){let i=a(this,q).appendChild(document.createElement("div"));i.classList.add("heading");let n=i.appendChild(document.createElement("span"));if(n.textContent=e,r){n.textContent+=" ";let s=n.appendChild(document.createElement("a"));s.textContent="\u{1F4CB}",s.href="#",s.title="Copy to clipboard";async function l(c){s.textContent=c,await new Promise(h=>setTimeout(h,2e3)),s.textContent===c&&(s.textContent="\u{1F4CB}")}s.addEventListener("click",async c=>{c.preventDefault(),s.textContent="\u{1F4CB}\u2026";let h=await r();if(h)try{await navigator.clipboard.writeText(h),l("\u{1F4CB}\u2705")}catch(d){throw l("\u{1F4CB}\u274C"),d}else l("\u{1F4CB}\u274C")})}return i},Tr);A.define("twizzle-link",us);function hs(t,e=document.createElement("span")){async function r(){let[i,n]=await Promise.all([t.puzzleAlg.get(),t.puzzleLoader.get()]);if(i.issues.errors.length!==0){e.textContent="";return}let s=!0;function l(c){s?s=!1:e.append(")(");let h=e.appendChild(document.createElement("span")),d=Ot(n,c,i.alg);h.append(`${ds[c]}: `);let w=h.appendChild(document.createElement("span"));w.textContent=d.toString(),w.classList.add("move-number"),h.setAttribute("data-before",cr[c]??""),h.setAttribute("title",cr[c]??"")}e.textContent="(",n.id==="3x3x3"?(l("OBTM"),l("OBQTM"),l("RBTM")):n.pg&&(l("RBTM"),l("RBQTM")),l("ETM"),e.append(")")}return t.puzzleAlg.addFreshListener(r),t.puzzleID.addFreshListener(r),e}export{K as EXPERIMENTAL_PROP_NO_VALUE,ci as ExperimentalSVGAnimator,Ti as SimpleAlgIndexer,tr as TreeAlgIndexer,ls as TwistyAlgEditor,$r as TwistyAlgViewer,ot as TwistyPlayer,us as TwizzleLink,ys as backViewLayouts,ti as setTwistyDebug};
