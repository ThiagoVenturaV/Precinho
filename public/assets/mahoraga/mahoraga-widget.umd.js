(function(h,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(h=typeof globalThis<"u"?globalThis:h||self,g(h.Mahoraga={}))})(this,function(h){"use strict";var P=Object.defineProperty;var I=(h,g,b)=>g in h?P(h,g,{enumerable:!0,configurable:!0,writable:!0,value:b}):h[g]=b;var a=(h,g,b)=>I(h,typeof g!="symbol"?g+"":g,b);const g={token:"mahoraga-accessibility-widget",avatar:"THIAGO",align:"bottom",side:"right",maxTextSize:800,highContrast:!1,opacity:100,language:"pt-BR",exceptions:[".ht-skip",".ht-ignore"],clickables:["button","a",'[role="button"]'],parentElement:null,doNotTrack:!1,mobileConfig:{align:"bottom",side:"right"},addonsMap:{aiAssistant:{signTranslator:!0,synonymsMeanings:!0},fontControl:{fontSize:!0,textStyle:!0,lineHeight:!0,letterSpacing:!0,highlightLetters:!0},navigation:{pageSpeech:!0,readerMode:!0,readingMask:!0,readingGuide:!0,highlightLinks:!0,pageStructure:!0,magnifier:!0,hideImages:!0,highlightHeadings:!0,pauseAnimations:!0,disableSounds:!0},colorControl:{contrastMode:!0,saturationMode:!0,pageColors:!0}}},b={isTranslatorOpen:!1,isAddonsOpen:!1,isDictionaryOpen:!1,isCollectorActive:!1,avatar:"THIAGO",speed:1,opacity:100,currentText:"Olá! Clique em qualquer texto da página ou selecione uma frase para traduzir em Libras.",subtitlesEnabled:!0,isPlaying:!1,fontSizeLevel:0,dyslexicFont:!1,lineHeightLevel:0,letterSpacingLevel:0,highlightLetters:!1,pageSpeechActive:!1,readingGuideActive:!1,readingMaskActive:!1,highlightLinks:!1,highlightHeadings:!1,magnifierActive:!1,hideImages:!1,pauseAnimations:!1,disableSounds:!1,readerMode:!1,contrastMode:"none",saturationMode:"normal",colorblindMode:"none"},v={acessibilidade:{definition:"Qualidade do que é acessível, que permite a inclusão e o uso autônomo por qualquer pessoa.",category:"Geral",description:"Mãos abertas em frente ao peito com movimentos circulares e dedos entrelaçados simbolizando inclusão."},libras:{definition:"Língua Brasileira de Sinais, meio legal de comunicação e expressão das comunidades surdas do Brasil.",category:"Comunicação",description:'Mãos em configuração em "L" unidas na frente do peito, alternando movimentos suaves para os lados.'},olá:{definition:"Saudação cordial.",category:"Saudações",description:"Mão aberta em frente ao rosto realizando um movimento suave de onda para a direita."},oi:{definition:"Cumprimento amigável informal.",category:"Saudações",description:'Mão em formato da letra "O" com o dedo mínimo estendido formando o "I", balançando levemente.'},obrigado:{definition:"Expressão de gratidão.",category:"Cortesia",description:"Mão aberta toca a testa e em seguida o peito, inclinando a cabeça levemente em respeito."},"por favor":{definition:"Pedido respeitoso.",category:"Cortesia",description:"Palmas das mãos unidas na frente do peito deslizando para a frente suavemente."},"bom dia":{definition:"Saudação usada pela manhã.",category:"Saudações",description:'Mão toca os lábios e abre para frente (BOM), seguida da mão em "D" saindo do olho direito (DIA).'},"boa tarde":{definition:"Saudação usada à tarde.",category:"Saudações",description:"Sinal de BOM seguido da mão deslizando no antebraço indicando o sol poente da tarde."},"boa noite":{definition:"Saudação usada ao anoitecer.",category:"Saudações",description:"Sinal de BOM seguido de ambas as mãos cobrindo os olhos suavemente (escurecer)."},ajuda:{definition:"Ato de prestar auxílio, socorro ou apoio.",category:"Ação",description:"Mão fechada com polegar para cima apoiada na palma aberta da outra mão, movendo-se à frente."},sim:{definition:"Expressão afirmativa.",category:"Resposta",description:"Mão em punho com o dedo indicador balançando para cima e para baixo (como o sinal de concordância)."},não:{definition:"Expressão negativa.",category:"Resposta",description:"Indicador levantado balançando lateralmente acompanhado de expressão facial de negação."},thiago:{definition:"Avatar virtual masculino inteligente e acessível do widget.",category:"Personagem",description:"Sinal amigável e expressivo de Thiago com topete característico e sinalização fluente."},marya:{definition:"Avatar virtual feminina inteligente e expressiva do widget.",category:"Personagem",description:"Sinal identificador de Marya com referência ao rabo de cavalo e sorriso comunicativo."},hugo:{definition:"Avatar virtual masculino (alias de Thiago).",category:"Personagem",description:"Sinal de amigo inteligente com topete característico."},maya:{definition:"Avatar virtual feminina (alias de Marya).",category:"Personagem",description:"Sinal de amiga inteligente com sorriso comunicativo."}},k="ht_accessibility_state";class S{constructor(){a(this,"state");a(this,"listeners",new Set);this.state=this.loadPersistedState()}loadPersistedState(){try{const e=localStorage.getItem(k);if(e){const t=JSON.parse(e);return{...b,...t,isTranslatorOpen:t.isTranslatorOpen??!1,isAddonsOpen:!1,isDictionaryOpen:!1,isCollectorActive:!1,isPlaying:!1}}}catch(e){console.warn("[HandTalk] Erro ao carregar preferências do localStorage:",e)}return{...b}}persist(){try{const e={avatar:this.state.avatar,speed:this.state.speed,opacity:this.state.opacity,subtitlesEnabled:this.state.subtitlesEnabled,fontSizeLevel:this.state.fontSizeLevel,dyslexicFont:this.state.dyslexicFont,lineHeightLevel:this.state.lineHeightLevel,letterSpacingLevel:this.state.letterSpacingLevel,highlightLetters:this.state.highlightLetters,highlightLinks:this.state.highlightLinks,highlightHeadings:this.state.highlightHeadings,hideImages:this.state.hideImages,pauseAnimations:this.state.pauseAnimations,disableSounds:this.state.disableSounds,contrastMode:this.state.contrastMode,saturationMode:this.state.saturationMode,colorblindMode:this.state.colorblindMode};localStorage.setItem(k,JSON.stringify(e))}catch(e){console.warn("[HandTalk] Erro ao salvar preferências:",e)}}getState(){return{...this.state}}setState(e){const t={...this.state};this.state={...this.state,...e},this.persist(),this.listeners.forEach(i=>i(this.state,t))}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}reset(){const e=this.state.isTranslatorOpen;this.setState({...b,isTranslatorOpen:e}),localStorage.removeItem(k)}}const n=new S;class w{constructor(){a(this,"styleTag",null);a(this,"svgFilterTag",null);this.init()}init(){document.getElementById("ht-accessibility-styles")?this.styleTag=document.getElementById("ht-accessibility-styles"):(this.styleTag=document.createElement("style"),this.styleTag.id="ht-accessibility-styles",document.head.appendChild(this.styleTag)),document.getElementById("ht-svg-filters")||this.injectSvgFilters()}injectSvgFilters(){const e=document.createElement("div");e.id="ht-svg-filters",e.style.cssText="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;",e.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id="ht-protanopia">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0   0.558, 0.442, 0, 0, 0   0, 0.242, 0.758, 0, 0   0, 0, 0, 1, 0"/>
        </filter>
        <filter id="ht-deuteranopia">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0   0.7, 0.3, 0, 0, 0       0, 0.3, 0.7, 0, 0       0, 0, 0, 1, 0"/>
        </filter>
        <filter id="ht-tritanopia">
          <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0     0, 0.433, 0.567, 0, 0   0, 0.475, 0.525, 0, 0   0, 0, 0, 1, 0"/>
        </filter>
        <filter id="ht-achromatopsia">
          <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0, 0, 0, 1, 0"/>
        </filter>
      </svg>
    `,document.body.appendChild(e),this.svgFilterTag=e}apply(e){if(!this.styleTag)return;const t=":not(.ht-widget-root):not(.ht-widget-root *):not(.ht-skip):not(.ht-skip *)";let i="";e.fontSizeLevel===1?i+=`
        html, body { font-size: 115% !important; }
        body *${t} { font-size: 110% !important; }
      `:e.fontSizeLevel===2&&(i+=`
        html, body { font-size: 130% !important; }
        body *${t} { font-size: 125% !important; }
      `),e.dyslexicFont&&(i+=`
        @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        body *${t} {
          font-family: 'Atkinson Hyperlegible', 'Comic Sans MS', 'Arial', sans-serif !important;
          letter-spacing: 0.05em !important;
        }
      `),e.lineHeightLevel===1?i+=`body *${t} { line-height: 1.8 !important; }`:e.lineHeightLevel===2&&(i+=`body *${t} { line-height: 2.2 !important; }`),e.letterSpacingLevel===1?i+=`body *${t} { letter-spacing: 0.12em !important; }`:e.letterSpacingLevel===2&&(i+=`body *${t} { letter-spacing: 0.24em !important; }`),e.highlightLetters&&(i+=`
        body p${t}, body span${t}, body li${t} {
          word-spacing: 0.25em !important;
        }
        body p${t}::first-letter, body h1${t}::first-letter, body h2${t}::first-letter, body h3${t}::first-letter {
          color: #ff3366 !important;
          font-weight: 900 !important;
          font-size: 1.25em !important;
        }
      `),e.highlightLinks&&(i+=`
        a${t} {
          background-color: #ffea00 !important;
          color: #000000 !important;
          text-decoration: underline 3px solid #000000 !important;
          font-weight: bold !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
          box-shadow: 0 0 0 2px #000000 !important;
        }
      `),e.highlightHeadings&&(i+=`
        h1${t}, h2${t}, h3${t}, h4${t}, h5${t}, h6${t} {
          border-left: 6px solid #0d6efd !important;
          padding-left: 10px !important;
          background: rgba(13, 110, 253, 0.08) !important;
          position: relative !important;
        }
        h1${t}::before { content: 'H1: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
        h2${t}::before { content: 'H2: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
        h3${t}::before { content: 'H3: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
      `),e.hideImages&&(i+=`
        img${t}, svg${t}:not(.ht-icon), video${t}, canvas${t}:not(.ht-avatar-canvas) {
          filter: grayscale(100%) contrast(0) brightness(1.8) !important;
          opacity: 0.08 !important;
          transition: opacity 0.3s ease !important;
        }
        img${t}:hover {
          opacity: 1 !important;
          filter: none !important;
        }
      `),e.pauseAnimations&&(i+=`
        *${t}, *${t}::before, *${t}::after {
          animation-play-state: paused !important;
          transition-duration: 0.001s !important;
        }
      `),e.contrastMode==="high-contrast-dark"?i+=`
        html, body {
          background-color: #000000 !important;
          color: #ffffff !important;
        }
        body *${t} {
          background-color: #000000 !important;
          color: #ffff00 !important;
          border-color: #ffff00 !important;
        }
        a${t} {
          color: #00ffff !important;
          text-decoration: underline !important;
        }
        button${t}, input${t}, select${t}, textarea${t} {
          background: #111111 !important;
          color: #ffffff !important;
          border: 2px solid #ffff00 !important;
        }
      `:e.contrastMode==="high-contrast-light"?i+=`
        html, body {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
        body *${t} {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #000000 !important;
        }
        a${t} {
          color: #0000ee !important;
          font-weight: bold !important;
          text-decoration: underline !important;
        }
        button${t}, input${t}, select${t}, textarea${t} {
          background: #f8f9fa !important;
          color: #000000 !important;
          border: 2px solid #000000 !important;
        }
      `:e.contrastMode==="invert"&&(i+=`
        html {
          filter: invert(100%) hue-rotate(180deg) !important;
          background: #000000 !important;
        }
        .ht-widget-root {
          filter: invert(100%) hue-rotate(180deg) !important;
        }
      `),e.saturationMode==="monochrome"?i+="body > :not(.ht-widget-root) { filter: grayscale(100%) !important; }":e.saturationMode==="low-saturation"?i+="body > :not(.ht-widget-root) { filter: saturate(40%) !important; }":e.saturationMode==="high-saturation"&&(i+="body > :not(.ht-widget-root) { filter: saturate(200%) !important; }"),e.colorblindMode!=="none"&&(i+=`
        body > :not(.ht-widget-root) {
          filter: url(#ht-${e.colorblindMode}) !important;
        }
      `),e.readerMode&&(i+=`
        header${t}, footer${t}, nav${t}, aside${t}, .sidebar${t}, [role="banner"]${t}, [role="navigation"]${t} {
          display: none !important;
        }
        main${t}, article${t}, [role="main"]${t} {
          max-width: 780px !important;
          margin: 0 auto !important;
          padding: 40px 20px !important;
          font-size: 1.25rem !important;
          line-height: 1.9 !important;
          background: #ffffff !important;
          color: #222222 !important;
        }
      `),this.styleTag.innerHTML=i}destroy(){var e,t;(e=this.styleTag)==null||e.remove(),(t=this.svgFilterTag)==null||t.remove()}}class M{constructor(e){a(this,"overlay",null);a(this,"currentElement",null);a(this,"isActive",!1);a(this,"onSelectTextCallback");this.onSelectTextCallback=e,this.init()}init(){this.overlay=document.createElement("div"),this.overlay.className="ht-collector-highlight ht-skip",this.overlay.style.cssText=`
      position: absolute;
      pointer-events: none;
      border: 3px dashed #0084ff;
      background: rgba(0, 132, 255, 0.15);
      border-radius: 4px;
      z-index: 2147483640;
      transition: all 0.12s ease;
      display: none;
    `,document.body.appendChild(this.overlay),document.addEventListener("mousemove",this.handleMouseMove.bind(this),{passive:!0}),document.addEventListener("click",this.handleClick.bind(this),!0),document.addEventListener("mouseup",this.handleTextSelection.bind(this)),n.subscribe(e=>{this.isActive=e.isCollectorActive,!this.isActive&&this.overlay&&(this.overlay.style.display="none",this.currentElement=null)})}isIgnored(e){return e?!!(e.closest(".ht-widget-root")||e.closest(".ht-skip")||e.closest(".ht-ignore")||e.tagName==="BODY"||e.tagName==="HTML"):!0}handleMouseMove(e){if(!this.isActive||!this.overlay)return;const t=document.elementFromPoint(e.clientX,e.clientY);if(!t||this.isIgnored(t)){this.overlay.style.display="none",this.currentElement=null;return}if(!(t.innerText||t.textContent||"").trim()){this.overlay.style.display="none";return}this.currentElement=t;const s=t.getBoundingClientRect(),o=window.pageXOffset||document.documentElement.scrollLeft,r=window.pageYOffset||document.documentElement.scrollTop;this.overlay.style.display="block",this.overlay.style.top=`${s.top+r-2}px`,this.overlay.style.left=`${s.left+o-2}px`,this.overlay.style.width=`${s.width+4}px`,this.overlay.style.height=`${s.height+4}px`}handleClick(e){if(!this.isActive||!this.currentElement)return;e.preventDefault(),e.stopPropagation();const t=(this.currentElement.innerText||this.currentElement.textContent||"").trim();t&&(this.onSelectTextCallback(t),n.setState({isCollectorActive:!1}))}handleTextSelection(){const e=window.getSelection();if(!e||e.isCollapsed)return;const t=e.toString().trim();t.length>1&&t.length<=1e3&&n.getState().isTranslatorOpen&&this.onSelectTextCallback(t)}destroy(){var e;(e=this.overlay)==null||e.remove(),document.removeEventListener("mousemove",this.handleMouseMove.bind(this)),document.removeEventListener("click",this.handleClick.bind(this),!0),document.removeEventListener("mouseup",this.handleTextSelection.bind(this))}}class T{constructor(){a(this,"synth",null);a(this,"isActive",!1);a(this,"hoveredElement",null);typeof window<"u"&&"speechSynthesis"in window&&(this.synth=window.speechSynthesis),this.init()}init(){document.addEventListener("mouseover",this.handleMouseOver.bind(this),{passive:!0}),n.subscribe(e=>{this.isActive=e.pageSpeechActive,this.isActive||this.stop()})}handleMouseOver(e){if(!this.isActive||!this.synth)return;const t=e.target;if(!t||t.closest(".ht-widget-root")||t.closest(".ht-skip"))return;if(["P","H1","H2","H3","H4","H5","H6","BUTTON","A","LI","LABEL"].includes(t.tagName)&&t!==this.hoveredElement){this.hoveredElement=t;const s=(t.innerText||t.getAttribute("aria-label")||"").trim();s&&this.speak(s)}}speak(e){if(!this.synth)return;this.stop();const t=new SpeechSynthesisUtterance(e);t.lang="pt-BR",t.rate=1,this.synth.speak(t)}stop(){this.synth&&this.synth.cancel()}}class A{constructor(){a(this,"mutedElements",[]);a(this,"observer",null);this.init()}init(){n.subscribe(e=>{e.disableSounds?this.muteAll():this.unmuteAll()}),this.observer=new MutationObserver(()=>{n.getState().disableSounds&&this.muteAll()}),this.observer.observe(document.body,{childList:!0,subtree:!0})}muteAll(){document.querySelectorAll("video, audio").forEach(t=>{t.muted||(t.muted=!0,this.mutedElements.push(t))})}unmuteAll(){this.mutedElements.forEach(e=>{e.muted=!1}),this.mutedElements=[]}destroy(){var e;this.unmuteAll(),(e=this.observer)==null||e.disconnect()}}class L{constructor(){a(this,"guideElement",null);a(this,"maskElement",null);a(this,"magnifierElement",null);this.init()}init(){this.createGuide(),this.createMask(),this.createMagnifier(),window.addEventListener("mousemove",this.handleMouseMove.bind(this),{passive:!0}),n.subscribe(e=>{this.guideElement&&(this.guideElement.style.display=e.readingGuideActive?"block":"none"),this.maskElement&&(this.maskElement.style.display=e.readingMaskActive?"block":"none"),this.magnifierElement&&(this.magnifierElement.style.display=e.magnifierActive?"block":"none")})}createGuide(){this.guideElement=document.createElement("div"),this.guideElement.className="ht-reading-guide ht-skip",this.guideElement.style.cssText=`
      position: fixed;
      left: 0;
      width: 100vw;
      height: 12px;
      background: #00e5ff;
      opacity: 0.65;
      box-shadow: 0 0 10px #00e5ff, 0 2px 4px rgba(0,0,0,0.3);
      pointer-events: none;
      z-index: 2147483640;
      display: none;
      transform: translateY(-50%);
    `,document.body.appendChild(this.guideElement)}createMask(){this.maskElement=document.createElement("div"),this.maskElement.className="ht-reading-mask ht-skip",this.maskElement.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483639;
      display: none;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75);
    `,document.body.appendChild(this.maskElement)}createMagnifier(){this.magnifierElement=document.createElement("div"),this.magnifierElement.className="ht-magnifier ht-skip",this.magnifierElement.style.cssText=`
      position: fixed;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 4px solid #0084ff;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      pointer-events: none;
      z-index: 2147483641;
      display: none;
      transform: translate(-50%, -50%);
      background: #ffffff;
      overflow: hidden;
    `,document.body.appendChild(this.magnifierElement)}handleMouseMove(e){const t=n.getState();if(t.readingGuideActive&&this.guideElement&&(this.guideElement.style.top=`${e.clientY}px`),t.readingMaskActive&&this.maskElement){const s=Math.max(0,e.clientY-35);this.maskElement.style.background=`
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.75) 0px,
          rgba(0, 0, 0, 0.75) ${s}px,
          transparent ${s}px,
          transparent ${s+70}px,
          rgba(0, 0, 0, 0.75) ${s+70}px,
          rgba(0, 0, 0, 0.75) 100%
        )
      `}if(t.magnifierActive&&this.magnifierElement){this.magnifierElement.style.left=`${e.clientX}px`,this.magnifierElement.style.top=`${e.clientY}px`;const i=document.elementFromPoint(e.clientX,e.clientY);if(i&&!i.closest(".ht-widget-root")&&!i.closest(".ht-skip")){const s=(i.innerText||i.textContent||"").trim().slice(0,150);this.magnifierElement.innerHTML=`
          <div style="padding: 16px; font-size: 20px; font-weight: bold; color: #111; line-height: 1.4; display: flex; align-items: center; justify-content: center; height: 100%; text-align: center;">
            ${s||"🔍"}
          </div>
        `}}}destroy(){var e,t,i;(e=this.guideElement)==null||e.remove(),(t=this.maskElement)==null||t.remove(),(i=this.magnifierElement)==null||i.remove()}}const l={libras:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  `,accessibility:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="m4.93 10.93 4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24"/>
      <path d="M12 7v8"/>
      <path d="m8 19 4-4 4 4"/>
    </svg>
  `,contrast:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor"/>
    </svg>
  `,fontSize:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/>
      <path d="M4 13h8"/>
      <path d="M16 19V11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8"/>
      <path d="M16 15h6"/>
    </svg>
  `,dyslexicFont:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20h16"/>
      <path d="m6 16 6-12 6 12"/>
      <path d="M8 12h8"/>
    </svg>
  `,lineHeight:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"/>
      <path d="M3 12h18"/>
      <path d="M3 18h18"/>
      <path d="M9 3l-3 3 3 3"/>
      <path d="M9 15l-3 3 3 3"/>
    </svg>
  `,letterSpacing:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12h18"/>
      <path d="M7 8l-4 4 4 4"/>
      <path d="M17 8l4 4-4 4"/>
      <path d="M10 6h4"/>
      <path d="M10 18h4"/>
    </svg>
  `,highlightLetters:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v8"/>
      <path d="m8.5 14 7-4"/>
    </svg>
  `,speech:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  `,readingGuide:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="6" y1="9" x2="6" y2="15"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="18" y1="9" x2="18" y2="15"/>
    </svg>
  `,readingMask:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="3" y="14" width="18" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
    </svg>
  `,magnifier:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `,highlightLinks:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  `,highlightHeadings:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12h8"/>
      <path d="M4 18V6"/>
      <path d="M12 18V6"/>
      <path d="m17 12 3-2v8"/>
    </svg>
  `,hideImages:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 2l20 20"/>
      <path d="M10.41 10.41a2 2 0 1 0 2.83 2.83"/>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  `,pauseAnimations:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  `,disableSounds:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  `,readerMode:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="16" y2="10"/>
    </svg>
  `,saturation:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
    </svg>
  `,colorblind:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,dictionary:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <path d="M9 10h6"/>
      <path d="M12 7v6"/>
    </svg>
  `,collector:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      <path d="m13 13 6 6"/>
    </svg>
  `,repeat:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <polyline points="23 20 23 14 17 14"/>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  `,speed:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,close:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,minimize:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  `,reset:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  `};class C{constructor(e="right",t="bottom"){a(this,"element",null);a(this,"side","right");a(this,"align","bottom");a(this,"isMenuOpen",!1);this.side=e,this.align=t,this.init()}init(){this.element=document.createElement("div"),this.element.className="ht-widget-root ht-launcher-container ht-skip",this.element.setAttribute("role","region"),this.element.setAttribute("aria-label","Ativador de Acessibilidade Hand Talk"),this.render(),document.body.appendChild(this.element),this.attachEvents(),n.subscribe(e=>{var i;const t=(i=this.element)==null?void 0:i.querySelector(".ht-launcher-main-btn");t&&(e.isTranslatorOpen||e.isAddonsOpen?t.style.boxShadow="0 0 0 4px rgba(0, 112, 243, 0.4), 0 8px 24px rgba(0, 112, 243, 0.35)":t.style.boxShadow="0 6px 20px rgba(0, 0, 0, 0.2)")})}render(){if(!this.element)return;const e=this.side==="right",t=this.align==="top",i=this.align==="center";let s="";e?s+="right: 20px;":s+="left: 20px;",t?s+="top: 20px;":i?s+="top: 50%; transform: translateY(-50%);":s+="bottom: 24px;",this.element.innerHTML=`
      <div class="ht-launcher-wrapper" style="
        position: fixed;
        ${s}
        z-index: 2147483643;
        display: flex;
        flex-direction: column;
        align-items: ${e?"flex-end":"flex-start"};
        gap: 10px;
      ">
        
        <!-- Expandable Options Menu -->
        <div class="ht-launcher-menu" style="
          display: none;
          flex-direction: column;
          gap: 8px;
          background: #ffffff;
          padding: 8px;
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
          border: 1px solid rgba(0,0,0,0.08);
          animation: htFadeScale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        ">
          <!-- Button 1: Libras Translator -->
          <button class="ht-launcher-opt-libras" style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 10px;
            background: #f0f7ff;
            border: 1px solid #c7e0ff;
            color: #0070f3;
            font-size: 0.88rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.15s;
          ">
            <span style="width: 20px; height: 20px; display: inline-block;">${l.libras}</span>
            <span>Tradutor de Libras</span>
          </button>

          <!-- Button 2: Accessibility Panel -->
          <button class="ht-launcher-opt-addons" style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 10px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            color: #1e293b;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.15s;
          ">
            <span style="width: 20px; height: 20px; display: inline-block; color: #0070f3;">${l.accessibility}</span>
            <span>Recursos Assistivos</span>
          </button>
        </div>

        <!-- Main Launcher Circle / Pill Button -->
        <button class="ht-launcher-main-btn" style="
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0070f3 0%, #0051b3 100%);
          color: #ffffff;
          border: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
          outline: none;
        " aria-label="Abrir menu de acessibilidade e tradutor de Libras Hand Talk">
          <span style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            ${l.libras}
          </span>
          <span class="ht-launcher-pulse" style="
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid #0070f3;
            opacity: 0.5;
            animation: htPulse 2.5s infinite;
            pointer-events: none;
          "></span>
        </button>

      </div>
    `}attachEvents(){if(!this.element)return;const e=this.element.querySelector(".ht-launcher-main-btn"),t=this.element.querySelector(".ht-launcher-menu"),i=this.element.querySelector(".ht-launcher-opt-libras"),s=this.element.querySelector(".ht-launcher-opt-addons");e==null||e.addEventListener("click",()=>{this.isMenuOpen=!this.isMenuOpen,t&&(t.style.display=this.isMenuOpen?"flex":"none")}),i==null||i.addEventListener("click",()=>{const o=n.getState();n.setState({isTranslatorOpen:!o.isTranslatorOpen}),this.isMenuOpen=!1,t&&(t.style.display="none")}),s==null||s.addEventListener("click",()=>{const o=n.getState();n.setState({isAddonsOpen:!o.isAddonsOpen}),this.isMenuOpen=!1,t&&(t.style.display="none")}),document.addEventListener("click",o=>{var r;!((r=this.element)!=null&&r.contains(o.target))&&this.isMenuOpen&&(this.isMenuOpen=!1,t&&(t.style.display="none"))})}destroy(){var e;(e=this.element)==null||e.remove()}}class E{constructor(e){a(this,"canvas");a(this,"ctx");a(this,"animFrameId",null);a(this,"avatar","THIAGO");a(this,"time",0);a(this,"blinkTime",0);a(this,"isBlinking",!1);a(this,"headY",0);a(this,"handLeftX",0);a(this,"handLeftY",0);a(this,"handRightX",0);a(this,"handRightY",0);a(this,"isSigning",!1);a(this,"signProgress",0);a(this,"signDuration",180);a(this,"signSequence",[]);a(this,"onFinishCallback");this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("Não foi possível obter contexto 2D para o avatar.");this.ctx=t,this.resize(),this.startLoop(),n.subscribe(i=>{this.avatar=i.avatar})}isMale(){return this.avatar==="THIAGO"||this.avatar==="HUGO"}resize(){const e=this.canvas.getBoundingClientRect(),t=window.devicePixelRatio||1;this.canvas.width=(e.width||320)*t,this.canvas.height=(e.height||360)*t,this.ctx.scale(t,t)}sign(e,t){this.isSigning=!0,this.signProgress=0,this.onFinishCallback=t;const i=e.toLowerCase().replace(/[.,!?;:]/g,"").split(/\s+/).filter(Boolean);this.signSequence=[],i.forEach(o=>{if(o==="olá"||o==="oi")this.signSequence.push({leftHand:[-30,20],rightHand:[45,-70],label:"Olá!"},{leftHand:[-30,20],rightHand:[65,-75],label:"Olá!"},{leftHand:[-30,20],rightHand:[45,-70],label:"Olá!"});else if(o==="libras")this.signSequence.push({leftHand:[-30,-50],rightHand:[30,-50],label:"Libras"},{leftHand:[-50,-40],rightHand:[50,-40],label:"Libras"},{leftHand:[-25,-55],rightHand:[25,-55],label:"Libras"});else if(o==="obrigado")this.signSequence.push({leftHand:[-20,10],rightHand:[15,-85],label:"Obrigado"},{leftHand:[-20,10],rightHand:[5,-35],label:"Obrigado"});else if(o==="acessibilidade")this.signSequence.push({leftHand:[-40,-40],rightHand:[40,-40],label:"Acessibilidade"},{leftHand:[-10,-50],rightHand:[10,-50],label:"Acessibilidade"},{leftHand:[-50,-30],rightHand:[50,-30],label:"Acessibilidade"});else for(let r=0;r<Math.min(o.length,4);r++){const d=(r%2===0?1:-1)*15;this.signSequence.push({leftHand:[-25+d,0],rightHand:[30+d,-45-r*5],label:o.toUpperCase()})}}),this.signSequence.length===0&&this.signSequence.push({leftHand:[-20,10],rightHand:[20,10],label:""});const s=n.getState().speed;this.signDuration=Math.max(60,this.signSequence.length*40/s)}stop(){var e;this.isSigning=!1,this.signProgress=0,this.signSequence=[],(e=this.onFinishCallback)==null||e.call(this)}startLoop(){const e=()=>{this.update(),this.render(),this.animFrameId=requestAnimationFrame(e)};this.animFrameId=requestAnimationFrame(e)}update(){var e;if(this.time+=.04,this.blinkTime+=1,this.blinkTime>160&&(this.isBlinking=!0,this.blinkTime>172&&(this.isBlinking=!1,this.blinkTime=0)),this.headY=Math.sin(this.time)*3,this.isSigning&&this.signSequence.length>0){const t=n.getState().speed;if(this.signProgress+=1/this.signDuration*t,this.signProgress>=1)this.isSigning=!1,this.signProgress=0,(e=this.onFinishCallback)==null||e.call(this);else{const i=this.signProgress*(this.signSequence.length-1),s=Math.floor(i),o=Math.min(s+1,this.signSequence.length-1),r=i-s,d=this.signSequence[s],p=this.signSequence[o];this.handLeftX=d.leftHand[0]+(p.leftHand[0]-d.leftHand[0])*r,this.handLeftY=d.leftHand[1]+(p.leftHand[1]-d.leftHand[1])*r,this.handRightX=d.rightHand[0]+(p.rightHand[0]-d.rightHand[0])*r,this.handRightY=d.rightHand[1]+(p.rightHand[1]-d.rightHand[1])*r}}else this.handLeftX=-35+Math.sin(this.time*.8)*3,this.handLeftY=20+Math.cos(this.time*.8)*2,this.handRightX=35-Math.sin(this.time*.8)*3,this.handRightY=20+Math.cos(this.time*.8)*2}render(){const e=this.canvas.width/(window.devicePixelRatio||1),t=this.canvas.height/(window.devicePixelRatio||1),i=e/2,s=t*.52;this.ctx.clearRect(0,0,e,t);const o=this.ctx.createRadialGradient(i,s-20,30,i,s,e*.7);o.addColorStop(0,this.isMale()?"rgba(0, 132, 255, 0.08)":"rgba(156, 39, 176, 0.08)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),this.ctx.fillStyle=o,this.ctx.fillRect(0,0,e,t),this.ctx.save(),this.ctx.translate(i,s+this.headY),this.drawBody(),this.drawNeck(),this.drawHead(),this.drawArmsAndHands(),this.ctx.restore()}drawBody(){const e=this.isMale(),t=e?"#0070f3":"#7928ca",i=e?"#3291ff":"#9e46f7",s=e?"#004fc5":"#57189a";this.ctx.beginPath(),this.ctx.moveTo(-60,40),this.ctx.quadraticCurveTo(-75,140,-85,180),this.ctx.lineTo(85,180),this.ctx.quadraticCurveTo(75,140,60,40),this.ctx.closePath();const o=this.ctx.createLinearGradient(-60,40,60,180);o.addColorStop(0,i),o.addColorStop(.4,t),o.addColorStop(1,s),this.ctx.fillStyle=o,this.ctx.fill(),this.ctx.beginPath(),this.ctx.moveTo(-22,40),this.ctx.quadraticCurveTo(0,62,22,40),this.ctx.lineWidth=4,this.ctx.strokeStyle=e?"#ffffff":"#f0d9ff",this.ctx.stroke(),this.ctx.fillStyle="rgba(255, 255, 255, 0.7)",this.ctx.beginPath(),this.ctx.arc(28,90,7,0,Math.PI*2),this.ctx.fill()}drawNeck(){const e=this.isMale()?"#f8c291":"#fbc5a8",t=this.isMale()?"#e59866":"#e09f80";this.ctx.beginPath(),this.ctx.rect(-16,12,32,32);const i=this.ctx.createLinearGradient(-16,12,16,44);i.addColorStop(0,t),i.addColorStop(1,e),this.ctx.fillStyle=i,this.ctx.fill()}drawHead(){const e=this.isMale(),t=e?"#fcd6b5":"#fde2cf",i="#fff0e5",s=e?"#e8a980":"#e2ab90",o=e?"#3d2314":"#2b1b17";e||(this.ctx.beginPath(),this.ctx.moveTo(35,-45),this.ctx.quadraticCurveTo(70,-60,75,-20),this.ctx.quadraticCurveTo(80,25,45,10),this.ctx.closePath(),this.ctx.fillStyle=o,this.ctx.fill()),this.ctx.beginPath(),this.ctx.ellipse(0,-25,44,52,0,0,Math.PI*2);const r=this.ctx.createRadialGradient(-10,-35,10,0,-25,50);r.addColorStop(0,i),r.addColorStop(.5,t),r.addColorStop(1,s),this.ctx.fillStyle=r,this.ctx.shadowColor="rgba(0,0,0,0.15)",this.ctx.shadowBlur=10,this.ctx.shadowOffsetY=4,this.ctx.fill(),this.ctx.shadowColor="transparent",this.drawEar(-45,-25,t),this.drawEar(45,-25,t),this.ctx.fillStyle=o,e?(this.ctx.beginPath(),this.ctx.moveTo(-44,-35),this.ctx.quadraticCurveTo(-46,-75,0,-82),this.ctx.quadraticCurveTo(46,-78,44,-35),this.ctx.quadraticCurveTo(35,-55,15,-60),this.ctx.quadraticCurveTo(-15,-65,-44,-35),this.ctx.closePath(),this.ctx.fill()):(this.ctx.beginPath(),this.ctx.moveTo(-45,-25),this.ctx.quadraticCurveTo(-48,-75,0,-80),this.ctx.quadraticCurveTo(48,-75,45,-25),this.ctx.quadraticCurveTo(30,-50,0,-52),this.ctx.quadraticCurveTo(-30,-50,-45,-25),this.ctx.closePath(),this.ctx.fill()),this.drawEye(-18,-25),this.drawEye(18,-25),this.ctx.strokeStyle=o,this.ctx.lineWidth=3,this.ctx.lineCap="round",this.ctx.beginPath(),this.ctx.moveTo(-28,-38),this.ctx.quadraticCurveTo(-18,-42,-8,-38),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(8,-38),this.ctx.quadraticCurveTo(18,-42,28,-38),this.ctx.stroke(),this.ctx.strokeStyle=s,this.ctx.lineWidth=2.5,this.ctx.beginPath(),this.ctx.moveTo(0,-22),this.ctx.lineTo(2,-10),this.ctx.lineTo(-4,-8),this.ctx.stroke(),this.ctx.beginPath(),this.isSigning?(this.ctx.ellipse(0,5,8,5,0,0,Math.PI*2),this.ctx.fillStyle="#b71c1c",this.ctx.fill()):(this.ctx.arc(0,-2,14,.25*Math.PI,.75*Math.PI),this.ctx.lineWidth=3,this.ctx.strokeStyle="#c2185b",this.ctx.stroke())}drawEar(e,t,i){this.ctx.beginPath(),this.ctx.ellipse(e,t,7,12,0,0,Math.PI*2),this.ctx.fillStyle=i,this.ctx.fill()}drawEye(e,t){if(this.isBlinking){this.ctx.beginPath(),this.ctx.moveTo(e-8,t),this.ctx.lineTo(e+8,t),this.ctx.lineWidth=2.5,this.ctx.strokeStyle="#2b1b17",this.ctx.stroke();return}this.ctx.beginPath(),this.ctx.ellipse(e,t,9,7,0,0,Math.PI*2),this.ctx.fillStyle="#ffffff",this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(e,t,5,0,Math.PI*2),this.ctx.fillStyle=this.isMale()?"#5d4037":"#4e342e",this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(e,t,2.5,0,Math.PI*2),this.ctx.fillStyle="#000000",this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(e-2,t-2,1.8,0,Math.PI*2),this.ctx.fillStyle="#ffffff",this.ctx.fill()}drawArmsAndHands(){const e=this.isMale()?"#fcd6b5":"#fde2cf";this.drawLibrasHand(-55,60,this.handLeftX,this.handLeftY,e,!0),this.drawLibrasHand(55,60,this.handRightX,this.handRightY,e,!1)}drawLibrasHand(e,t,i,s,o,r){const d=(e+i)/2+(r?-15:15),p=(t+s)/2+10;this.ctx.beginPath(),this.ctx.moveTo(e,t),this.ctx.quadraticCurveTo(d,p,i,s),this.ctx.lineWidth=14,this.ctx.lineCap="round",this.ctx.strokeStyle=o,this.ctx.stroke(),this.ctx.save(),this.ctx.translate(i,s),this.ctx.beginPath(),this.ctx.arc(0,0,11,0,Math.PI*2),this.ctx.fillStyle=o,this.ctx.fill();const u=r?-.4:.4;for(let c=-2;c<=2;c++){this.ctx.beginPath(),this.ctx.moveTo(c*3.5,0);const m=u+c*.15,y=12+Math.cos(c)*4;this.ctx.lineTo(c*3.5+Math.sin(m)*y,-Math.cos(m)*y),this.ctx.lineWidth=4,this.ctx.lineCap="round",this.ctx.strokeStyle=o,this.ctx.stroke()}this.ctx.restore()}destroy(){this.animFrameId&&cancelAnimationFrame(this.animFrameId)}}class H{constructor(){a(this,"element",null);a(this,"renderer",null);a(this,"canvas",null);a(this,"isMinimized",!1);a(this,"isDragging",!1);a(this,"dragStartX",0);a(this,"dragStartY",0);this.init()}init(){this.element=document.createElement("div"),this.element.className="ht-widget-root ht-translator-window ht-skip",this.element.setAttribute("role","region"),this.element.setAttribute("aria-label","Janela do Tradutor de Libras"),this.element.style.display="none",this.render(),document.body.appendChild(this.element),this.canvas=this.element.querySelector(".ht-avatar-canvas"),this.canvas&&(this.renderer=new E(this.canvas)),this.attachEvents(),n.subscribe((e,t)=>{if(!this.element)return;this.element.style.display=e.isTranslatorOpen?"flex":"none";const i=this.element.querySelector(".ht-translator-subtitle-text");i&&(i.innerText=e.currentText||"Selecione ou clique em um texto para traduzir em Libras");const s=this.element.querySelector(".ht-translator-card");s&&(s.style.background=e.opacity===100?"#ffffff":e.opacity===50?"rgba(255, 255, 255, 0.75)":"rgba(255, 255, 255, 0.35)");const o=this.element.querySelector(".ht-avatar-name-badge");o&&(o.innerText=e.avatar==="THIAGO"||e.avatar==="HUGO"?"Thiago":"Marya");const r=this.element.querySelector(".ht-btn-collector");r&&(e.isCollectorActive?(r.classList.add("ht-btn-active"),r.style.background="#0070f3",r.style.color="#ffffff"):(r.classList.remove("ht-btn-active"),r.style.background="#f1f5f9",r.style.color="#334155"));const d=this.element.querySelector(".ht-btn-speed span");d&&(d.innerText=`${e.speed}x`),e.currentText!==t.currentText&&e.isTranslatorOpen&&this.translateText(e.currentText)})}translateText(e){this.renderer&&(n.setState({isPlaying:!0}),this.renderer.sign(e,()=>{n.setState({isPlaying:!1})}))}render(){this.element&&(this.element.innerHTML=`
      <div class="ht-translator-card" style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 320px;
        height: 480px;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 2147483642;
        transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
        border: 1px solid rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(12px);
      ">
        
        <!-- Header / Drag bar -->
        <div class="ht-translator-header" style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.8);
          cursor: grab;
          user-select: none;
        ">
          <!-- Avatar Switcher -->
          <button class="ht-btn-avatar-switch" style="
            display: flex;
            align-items: center;
            gap: 6px;
            background: #eef6ff;
            border: 1px solid #c7e0ff;
            border-radius: 20px;
            padding: 4px 10px;
            font-size: 0.8rem;
            font-weight: 700;
            color: #0070f3;
            cursor: pointer;
            outline: none;
          " title="Alternar entre Thiago e Marya">
            <span style="width: 14px; height: 14px; display: inline-block;">${l.libras}</span>
            <span class="ht-avatar-name-badge">Thiago</span>
          </button>

          <!-- Window Controls -->
          <div style="display: flex; align-items: center; gap: 4px;">
            <button class="ht-btn-minimize" style="
              width: 28px;
              height: 28px;
              border-radius: 6px;
              background: none;
              border: none;
              color: #64748b;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            " aria-label="Minimizar janela">
              <span style="width: 16px; height: 16px;">${l.minimize}</span>
            </button>
            <button class="ht-btn-close" style="
              width: 28px;
              height: 28px;
              border-radius: 6px;
              background: none;
              border: none;
              color: #64748b;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            " aria-label="Fechar tradutor de Libras">
              <span style="width: 16px; height: 16px;">${l.close}</span>
            </button>
          </div>
        </div>

        <!-- Canvas Body (Avatar) -->
        <div class="ht-avatar-body" style="
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        ">
          <canvas class="ht-avatar-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
          
          <!-- Subtitle Box -->
          <div class="ht-translator-subtitle" style="
            position: absolute;
            bottom: 8px;
            left: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.78);
            backdrop-filter: blur(8px);
            border-radius: 10px;
            padding: 8px 12px;
            color: #ffffff;
            font-size: 0.82rem;
            line-height: 1.35;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            pointer-events: none;
          ">
            <span class="ht-translator-subtitle-text">Clique em qualquer texto do site para traduzir em Libras</span>
          </div>
        </div>

        <!-- Toolbar / Controls -->
        <div class="ht-translator-toolbar" style="
          padding: 8px 12px;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        ">
          <!-- Text Collector Button -->
          <button class="ht-btn-collector" style="
            display: flex;
            align-items: center;
            gap: 5px;
            background: #f1f5f9;
            color: #334155;
            border: none;
            border-radius: 8px;
            padding: 7px 10px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          " title="Seletor de Texto: clique em qualquer elemento do site">
            <span style="width: 14px; height: 14px; display: inline-block;">${l.collector}</span>
            <span>Seletor</span>
          </button>

          <!-- Speed Selector Button -->
          <button class="ht-btn-speed" style="
            display: flex;
            align-items: center;
            gap: 4px;
            background: #f1f5f9;
            color: #334155;
            border: none;
            border-radius: 8px;
            padding: 7px 9px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
          " title="Alterar velocidade de sinalização">
            <span style="width: 14px; height: 14px; display: inline-block;">${l.speed}</span>
            <span>1x</span>
          </button>

          <!-- Repeat Button -->
          <button class="ht-btn-repeat" style="
            width: 32px;
            height: 32px;
            background: #f1f5f9;
            color: #334155;
            border: none;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          " title="Repetir tradução">
            <span style="width: 16px; height: 16px;">${l.repeat}</span>
          </button>

          <!-- Dictionary Button -->
          <button class="ht-btn-dictionary" style="
            width: 32px;
            height: 32px;
            background: #f1f5f9;
            color: #334155;
            border: none;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          " title="Dicionário de Libras e Sinônimos">
            <span style="width: 16px; height: 16px;">${l.dictionary}</span>
          </button>

          <!-- Opacity Button -->
          <button class="ht-btn-opacity" style="
            width: 32px;
            height: 32px;
            background: #f1f5f9;
            color: #334155;
            border: none;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          " title="Alternar transparência da janela">
            <span style="width: 16px; height: 16px;">${l.contrast}</span>
          </button>
        </div>

      </div>
    `)}attachEvents(){if(!this.element)return;const e=this.element.querySelector(".ht-btn-avatar-switch");e==null||e.addEventListener("click",()=>{const c=n.getState().avatar,m=c==="THIAGO"||c==="HUGO"?"MARYA":"THIAGO";n.setState({avatar:m})});const t=this.element.querySelector(".ht-btn-close");t==null||t.addEventListener("click",()=>{n.setState({isTranslatorOpen:!1,isCollectorActive:!1})});const i=this.element.querySelector(".ht-btn-minimize");i==null||i.addEventListener("click",()=>{this.toggleMinimize()});const s=this.element.querySelector(".ht-btn-collector");s==null||s.addEventListener("click",()=>{const c=n.getState().isCollectorActive;n.setState({isCollectorActive:!c})});const o=this.element.querySelector(".ht-btn-speed");o==null||o.addEventListener("click",()=>{const c=[1,1.5,2,.5],m=n.getState().speed,y=(c.indexOf(m)+1)%c.length;n.setState({speed:c[y]})});const r=this.element.querySelector(".ht-btn-repeat");r==null||r.addEventListener("click",()=>{const c=n.getState().currentText;c&&this.translateText(c)});const d=this.element.querySelector(".ht-btn-dictionary");d==null||d.addEventListener("click",()=>{n.setState({isDictionaryOpen:!0})});const p=this.element.querySelector(".ht-btn-opacity");p==null||p.addEventListener("click",()=>{const c=[100,50,0],m=n.getState().opacity,y=(c.indexOf(m)+1)%c.length;n.setState({opacity:c[y]})});const u=this.element.querySelector(".ht-translator-header");u==null||u.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("mouseup",this.handleMouseUp.bind(this))}toggleMinimize(){var s,o,r,d;this.isMinimized=!this.isMinimized;const e=(s=this.element)==null?void 0:s.querySelector(".ht-translator-card"),t=(o=this.element)==null?void 0:o.querySelector(".ht-avatar-body"),i=(r=this.element)==null?void 0:r.querySelector(".ht-translator-toolbar");e&&t&&i&&(this.isMinimized?(e.style.height="48px",t.style.display="none",i.style.display="none"):(e.style.height="480px",t.style.display="flex",i.style.display="flex",(d=this.renderer)==null||d.resize()))}handleMouseDown(e){var s;if(e.target.closest("button"))return;this.isDragging=!0;const t=(s=this.element)==null?void 0:s.querySelector(".ht-translator-card");if(!t)return;const i=t.getBoundingClientRect();this.dragStartX=e.clientX-i.left,this.dragStartY=e.clientY-i.top,t.style.cursor="grabbing"}handleMouseMove(e){var u;if(!this.isDragging)return;const t=(u=this.element)==null?void 0:u.querySelector(".ht-translator-card");if(!t)return;const i=e.clientX-this.dragStartX,s=e.clientY-this.dragStartY,o=window.innerWidth-t.offsetWidth-10,r=window.innerHeight-t.offsetHeight-10,d=Math.max(10,Math.min(o,i)),p=Math.max(10,Math.min(r,s));t.style.left=`${d}px`,t.style.top=`${p}px`,t.style.right="auto",t.style.bottom="auto"}handleMouseUp(){var e;if(this.isDragging){this.isDragging=!1;const t=(e=this.element)==null?void 0:e.querySelector(".ht-translator-card");t&&(t.style.cursor="default")}}destroy(){var e,t;(e=this.renderer)==null||e.destroy(),(t=this.element)==null||t.remove()}}class ${constructor(){a(this,"element",null);this.init()}init(){this.element=document.createElement("div"),this.element.className="ht-widget-root ht-addons-panel ht-skip",this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-label","Painel de Recursos de Acessibilidade"),this.element.style.display="none",this.render(),document.body.appendChild(this.element),this.attachEvents(),n.subscribe(e=>{this.element&&(this.element.style.display=e.isAddonsOpen?"flex":"none",this.updateActiveIndicators())})}render(){this.element&&(this.element.innerHTML=`
      <div class="ht-addons-backdrop" style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(4px);
        z-index: 2147483644;
        display: flex;
        justify-content: flex-end;
      ">
        <div class="ht-addons-card" style="
          width: 440px;
          max-width: 95vw;
          height: 100vh;
          background: #ffffff;
          box-shadow: -10px 0 30px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: htSlideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        ">
          
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-bottom: 1px solid #eef0f3;
            background: #ffffff;
          ">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="
                width: 38px;
                height: 38px;
                border-radius: 10px;
                background: #0070f3;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="width: 22px; height: 22px; display: inline-block;">${l.accessibility}</span>
              </div>
              <div>
                <h2 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: #1e293b;">Recursos Assistivos</h2>
                <span style="font-size: 0.8rem; color: #64748b;">Acessibilidade Digital</span>
              </div>
            </div>
            
            <button class="ht-addons-close-btn" style="
              width: 36px;
              height: 36px;
              border-radius: 8px;
              background: #f1f5f9;
              border: none;
              color: #475569;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            " aria-label="Fechar recursos assistivos">
              <span style="width: 20px; height: 20px;">${l.close}</span>
            </button>
          </div>

          <!-- Body / Tools list -->
          <div class="ht-addons-content" style="
            flex: 1;
            overflow-y: auto;
            padding: 20px 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
          ">
            
            <!-- Category: AI Assistant / Libras -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                <span>🤖 Assistente IA & Libras</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("signTranslator","Tradutor de Libras","Avatar 3D em tempo real",l.libras)}
                ${this.renderToolButton("synonymsMeanings","Dicionário Libras","Sinais e significados",l.dictionary)}
              </div>
            </div>

            <!-- Category: Font Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px;">
                <span>🔤 Controle de Fonte</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("fontSize","Tamanho da Fonte","3 opções (+0%, +15%, +30%)",l.fontSize)}
                ${this.renderToolButton("textStyle","Fonte Legível","Adaptada para dislexia",l.dyslexicFont)}
                ${this.renderToolButton("lineHeight","Espaço Linhas","3 opções de entrelinha",l.lineHeight)}
                ${this.renderToolButton("letterSpacing","Espaço Letras","3 opções de espaçamento",l.letterSpacing)}
                ${this.renderToolButton("highlightLetters","Destacar Letras","Primeira letra colorida",l.highlightLetters)}
              </div>
            </div>

            <!-- Category: Navigation & Reading -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px;">
                <span>🧭 Navegação & Leitura</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("pageSpeech","Leitor de Sites","Leitura em voz alta (TTS)",l.speech)}
                ${this.renderToolButton("readingGuide","Guia de Leitura","Régua horizontal móvel",l.readingGuide)}
                ${this.renderToolButton("readingMask","Máscara Leitura","Foco na linha atual",l.readingMask)}
                ${this.renderToolButton("magnifier","Lupa de Conteúdo","Lente de aumento no mouse",l.magnifier)}
                ${this.renderToolButton("highlightLinks","Destacar Links","Bordas e realce amarelo",l.highlightLinks)}
                ${this.renderToolButton("highlightHeadings","Destacar Títulos","Marcações H1 a H6",l.highlightHeadings)}
                ${this.renderToolButton("hideImages","Ocultar Imagens","Diminui poluição visual",l.hideImages)}
                ${this.renderToolButton("pauseAnimations","Pausar Animações","Congela GIFs e transições",l.pauseAnimations)}
                ${this.renderToolButton("disableSounds","Parar Sons","Muta mídias da página",l.disableSounds)}
                ${this.renderToolButton("readerMode","Modo Leitura","Texto limpo sem distrações",l.readerMode)}
              </div>
            </div>

            <!-- Category: Color Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px;">
                <span>🎨 Controle de Cores</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("contrastMode","Contraste","Escuro, Claro, Invertido",l.contrast)}
                ${this.renderToolButton("saturationMode","Saturação","Monocromático e Níveis",l.saturation)}
                ${this.renderToolButton("colorblindMode","Modo Daltônico","Filtros Protanopia / Trit.",l.colorblind)}
              </div>
            </div>

          </div>

          <!-- Footer / Reset -->
          <div style="
            padding: 16px 24px;
            border-top: 1px solid #eef0f3;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
          ">
            <button class="ht-btn-reset-all" style="
              display: flex;
              align-items: center;
              gap: 8px;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              color: #dc2626;
              padding: 10px 16px;
              border-radius: 10px;
              font-size: 0.88rem;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.2s;
            ">
              <span style="width: 16px; height: 16px;">${l.reset}</span>
              <span>Limpar configurações</span>
            </button>

            <span class="ht-active-counter-badge" style="
              font-size: 0.8rem;
              font-weight: 600;
              color: #0070f3;
              background: #eef6ff;
              padding: 4px 10px;
              border-radius: 20px;
            ">0 ativos</span>
          </div>

        </div>
      </div>
    `)}renderToolButton(e,t,i,s){return`
      <button class="ht-tool-btn" data-tool="${e}" style="
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
        position: relative;
        outline: none;
      ">
        <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="ht-tool-icon" style="width: 28px; height: 28px; color: #475569;">
            ${s}
          </div>
          <span class="ht-tool-status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; display: inline-block;"></span>
        </div>
        <strong style="font-size: 0.9rem; color: #1e293b; margin-bottom: 2px;">${t}</strong>
        <span class="ht-tool-sub" style="font-size: 0.75rem; color: #64748b; line-height: 1.2;">${i}</span>
      </button>
    `}attachEvents(){if(!this.element)return;const e=this.element.querySelector(".ht-addons-close-btn");e==null||e.addEventListener("click",()=>{n.setState({isAddonsOpen:!1})});const t=this.element.querySelector(".ht-addons-backdrop");t==null||t.addEventListener("click",o=>{o.target===t&&n.setState({isAddonsOpen:!1})});const i=this.element.querySelector(".ht-btn-reset-all");i==null||i.addEventListener("click",()=>{n.reset()}),this.element.querySelectorAll(".ht-tool-btn").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-tool");r&&this.handleToolClick(r)})})}handleToolClick(e){const t=n.getState();switch(e){case"signTranslator":n.setState({isTranslatorOpen:!t.isTranslatorOpen});break;case"synonymsMeanings":n.setState({isDictionaryOpen:!0});break;case"fontSize":n.setState({fontSizeLevel:(t.fontSizeLevel+1)%3});break;case"textStyle":n.setState({dyslexicFont:!t.dyslexicFont});break;case"lineHeight":n.setState({lineHeightLevel:(t.lineHeightLevel+1)%3});break;case"letterSpacing":n.setState({letterSpacingLevel:(t.letterSpacingLevel+1)%3});break;case"highlightLetters":n.setState({highlightLetters:!t.highlightLetters});break;case"pageSpeech":n.setState({pageSpeechActive:!t.pageSpeechActive});break;case"readingGuide":n.setState({readingGuideActive:!t.readingGuideActive});break;case"readingMask":n.setState({readingMaskActive:!t.readingMaskActive});break;case"magnifier":n.setState({magnifierActive:!t.magnifierActive});break;case"highlightLinks":n.setState({highlightLinks:!t.highlightLinks});break;case"highlightHeadings":n.setState({highlightHeadings:!t.highlightHeadings});break;case"hideImages":n.setState({hideImages:!t.hideImages});break;case"pauseAnimations":n.setState({pauseAnimations:!t.pauseAnimations});break;case"disableSounds":n.setState({disableSounds:!t.disableSounds});break;case"readerMode":n.setState({readerMode:!t.readerMode});break;case"contrastMode":{const i=["none","high-contrast-dark","high-contrast-light","invert"],s=i[(i.indexOf(t.contrastMode)+1)%i.length];n.setState({contrastMode:s});break}case"saturationMode":{const i=["normal","monochrome","low-saturation","high-saturation"],s=i[(i.indexOf(t.saturationMode)+1)%i.length];n.setState({saturationMode:s});break}case"colorblindMode":{const i=["none","protanopia","deuteranopia","tritanopia","achromatopsia"],s=i[(i.indexOf(t.colorblindMode)+1)%i.length];n.setState({colorblindMode:s});break}}}updateActiveIndicators(){if(!this.element)return;const e=n.getState();let t=0;const i={signTranslator:{active:e.isTranslatorOpen},synonymsMeanings:{active:e.isDictionaryOpen},fontSize:{active:e.fontSizeLevel>0,label:e.fontSizeLevel===0?"+0%":e.fontSizeLevel===1?"+15%":"+30%"},textStyle:{active:e.dyslexicFont},lineHeight:{active:e.lineHeightLevel>0,label:e.lineHeightLevel===0?"Padrão":e.lineHeightLevel===1?"1.8x":"2.2x"},letterSpacing:{active:e.letterSpacingLevel>0,label:e.letterSpacingLevel===0?"Padrão":e.letterSpacingLevel===1?"0.12em":"0.24em"},highlightLetters:{active:e.highlightLetters},pageSpeech:{active:e.pageSpeechActive},readingGuide:{active:e.readingGuideActive},readingMask:{active:e.readingMaskActive},magnifier:{active:e.magnifierActive},highlightLinks:{active:e.highlightLinks},highlightHeadings:{active:e.highlightHeadings},hideImages:{active:e.hideImages},pauseAnimations:{active:e.pauseAnimations},disableSounds:{active:e.disableSounds},readerMode:{active:e.readerMode},contrastMode:{active:e.contrastMode!=="none",label:e.contrastMode==="none"?"Padrão":e.contrastMode},saturationMode:{active:e.saturationMode!=="normal",label:e.saturationMode==="normal"?"Padrão":e.saturationMode},colorblindMode:{active:e.colorblindMode!=="none",label:e.colorblindMode==="none"?"Padrão":e.colorblindMode}};Object.entries(i).forEach(([o,r])=>{var p;const d=(p=this.element)==null?void 0:p.querySelector(`[data-tool="${o}"]`);if(d){const u=d.querySelector(".ht-tool-status-dot"),c=d.querySelector(".ht-tool-icon"),m=d.querySelector(".ht-tool-sub");r.active?(t++,d.style.borderColor="#0070f3",d.style.background="#f0f7ff",u&&(u.style.background="#0070f3"),c&&(c.style.color="#0070f3")):(d.style.borderColor="#e2e8f0",d.style.background="#f8fafc",u&&(u.style.background="#cbd5e1"),c&&(c.style.color="#475569")),r.label&&m&&(m.innerText=`Ativo: ${r.label}`)}});const s=this.element.querySelector(".ht-active-counter-badge");s&&(s.innerHTML=`${t} ${t===1?"ativo":"ativos"}`)}destroy(){var e;(e=this.element)==null||e.remove()}}class O{constructor(e){a(this,"element",null);a(this,"onSignSelected");this.onSignSelected=e,this.init()}init(){this.element=document.createElement("div"),this.element.className="ht-widget-root ht-dictionary-modal ht-skip",this.element.setAttribute("role","dialog"),this.element.setAttribute("aria-modal","true"),this.element.setAttribute("aria-label","Dicionário de Libras"),this.element.style.display="none",this.render(),document.body.appendChild(this.element),n.subscribe(e=>{if(this.element&&(this.element.style.display=e.isDictionaryOpen?"flex":"none",e.isDictionaryOpen)){const t=this.element.querySelector(".ht-dict-search-input");t==null||t.focus()}})}render(){this.element&&(this.element.innerHTML=`
      <div class="ht-modal-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:2147483645;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div class="ht-modal-card" style="background:#ffffff;border-radius:16px;max-width:540px;width:100%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 40px rgba(0,0,0,0.25);overflow:hidden;position:relative;">
          
          <!-- Header -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid #eef0f3;">
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:36px;height:36px;border-radius:10px;background:#eef6ff;color:#0070f3;display:flex;align-items:center;justify-content:center;">
                <span style="width:20px;height:20px;display:inline-block;">${l.dictionary}</span>
              </div>
              <h2 style="margin:0;font-size:1.2rem;font-weight:700;color:#1a202c;">Dicionário de Libras</h2>
            </div>
            <button class="ht-dict-close-btn" style="background:none;border:none;cursor:pointer;color:#718096;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;" aria-label="Fechar dicionário">
              <span style="width:20px;height:20px;">${l.close}</span>
            </button>
          </div>

          <!-- Search Input -->
          <div style="padding:16px 24px;background:#f8fafc;border-bottom:1px solid #eef0f3;">
            <div style="position:relative;">
              <input type="text" class="ht-dict-search-input" placeholder="Pesquisar sinal (ex: Libras, Olá, Obrigado...)" style="width:100%;padding:12px 16px;border:2px solid #e2e8f0;border-radius:10px;font-size:0.95rem;outline:none;box-sizing:border-box;transition:border-color 0.2s;" />
            </div>
          </div>

          <!-- Signs List -->
          <div class="ht-dict-list" style="padding:16px 24px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;flex:1;">
            ${this.renderList()}
          </div>

          <!-- Footer -->
          <div style="padding:14px 24px;background:#f8fafc;border-top:1px solid #eef0f3;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:0.85rem;color:#718096;">Total de termos cadastrados: ${Object.keys(v).length}</span>
            <button class="ht-dict-close-btn2" style="background:#0070f3;color:#ffffff;border:none;padding:8px 16px;border-radius:8px;font-weight:600;font-size:0.88rem;cursor:pointer;">Concluído</button>
          </div>

        </div>
      </div>
    `,this.attachEvents())}renderList(e=""){const t=Object.keys(v).filter(i=>i.includes(e.toLowerCase()));return t.length===0?`
        <div style="text-align:center;padding:32px;color:#a0aec0;">
          <p style="margin:0;font-size:0.95rem;">Nenhum sinal encontrado para "${e}".</p>
          <p style="margin:6px 0 0;font-size:0.85rem;">Tente pesquisar por termos comuns como "acessibilidade", "libras", "olá", "obrigado".</p>
        </div>
      `:t.map(i=>{const s=v[i],o=i.charAt(0).toUpperCase()+i.slice(1);return`
        <div class="ht-dict-item" data-term="${i}" style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;background:#ffffff;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;transition:box-shadow 0.2s;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <strong style="font-size:1rem;color:#1a202c;">${o}</strong>
              <span style="font-size:0.75rem;background:#edf2f7;color:#4a5568;padding:2px 8px;border-radius:12px;font-weight:600;">${s.category}</span>
            </div>
            <p style="margin:0 0 6px;font-size:0.88rem;color:#4a5568;line-height:1.4;">${s.definition}</p>
            <p style="margin:0;font-size:0.8rem;color:#718096;font-style:italic;"><strong>Gesto em Libras:</strong> ${s.description}</p>
          </div>
          <button class="ht-dict-sign-btn" data-term="${i}" style="background:#0070f3;color:#ffffff;border:none;border-radius:8px;padding:8px 12px;font-size:0.82rem;font-weight:600;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px;">
            <span>Ver Sinal</span>
          </button>
        </div>
      `}).join("")}attachEvents(){if(!this.element)return;this.element.querySelectorAll(".ht-dict-close-btn, .ht-dict-close-btn2").forEach(o=>{o.addEventListener("click",()=>{n.setState({isDictionaryOpen:!1})})});const t=this.element.querySelector(".ht-modal-backdrop");t==null||t.addEventListener("click",o=>{o.target===t&&n.setState({isDictionaryOpen:!1})});const i=this.element.querySelector(".ht-dict-search-input"),s=this.element.querySelector(".ht-dict-list");i==null||i.addEventListener("input",o=>{const r=o.target.value;s&&(s.innerHTML=this.renderList(r),this.attachSignButtons())}),this.attachSignButtons()}attachSignButtons(){if(!this.element)return;this.element.querySelectorAll(".ht-dict-sign-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-term");i&&(n.setState({isDictionaryOpen:!1,isTranslatorOpen:!0}),this.onSignSelected(i))})})}destroy(){var e;(e=this.element)==null||e.remove()}}class x{constructor(e={}){a(this,"options");a(this,"styleManager");a(this,"collectorManager");a(this,"speechManager");a(this,"audioManager");a(this,"readingToolsManager");a(this,"launcher");a(this,"translatorWindow");a(this,"addonsPanel");a(this,"dictionaryModal");this.options={...g,...e},n.setState({avatar:this.options.avatar,opacity:this.options.opacity}),this.options.highContrast&&n.setState({contrastMode:"high-contrast-dark"}),this.styleManager=new w,this.speechManager=new T,this.audioManager=new A,this.readingToolsManager=new L,this.translatorWindow=new H,this.addonsPanel=new $,this.dictionaryModal=new O(t=>{this.translate(t)}),this.collectorManager=new M(t=>{this.translate(t)}),this.launcher=new C(this.options.side,this.options.align),n.subscribe(t=>{this.styleManager.apply(t)}),this.styleManager.apply(n.getState()),this.setupKeyboardShortcuts(),console.log("%c[Mahoraga Accessibility Widget]%c Inicializado com sucesso! (REA Re-engineering)","color: #0070f3; font-weight: bold;","color: inherit;")}setupKeyboardShortcuts(){window.addEventListener("keydown",e=>{if(e.altKey&&(e.key==="a"||e.key==="A")){e.preventDefault();const t=n.getState().isAddonsOpen;n.setState({isAddonsOpen:!t})}if(e.altKey&&(e.key==="l"||e.key==="L")){e.preventDefault();const t=n.getState().isTranslatorOpen;n.setState({isTranslatorOpen:!t})}e.key==="Escape"&&n.setState({isAddonsOpen:!1,isDictionaryOpen:!1,isCollectorActive:!1})})}openTranslator(){n.setState({isTranslatorOpen:!0})}closeTranslator(){n.setState({isTranslatorOpen:!1,isCollectorActive:!1})}openAddons(){n.setState({isAddonsOpen:!0})}closeAddons(){n.setState({isAddonsOpen:!1})}translate(e){n.setState({isTranslatorOpen:!0,currentText:e}),this.translatorWindow.translateText(e)}setAvatar(e){n.setState({avatar:e})}reset(){n.reset()}destroy(){this.styleManager.destroy(),this.collectorManager.destroy(),this.speechManager.stop(),this.audioManager.destroy(),this.readingToolsManager.destroy(),this.launcher.destroy(),this.translatorWindow.destroy(),this.addonsPanel.destroy(),this.dictionaryModal.destroy()}}const z=x,q=x,B=x;typeof window<"u"&&(window.Mahoraga=x,window.MahoragaWidget=x,window.HT=x,window.HandTalkWidget=x),h.HT=B,h.HandTalkWidget=x,h.Mahoraga=q,h.MahoragaWidget=z,h.default=x,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
