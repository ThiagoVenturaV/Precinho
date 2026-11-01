var w = Object.defineProperty;
var k = (h, e, t) => e in h ? w(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var r = (h, e, t) => k(h, typeof e != "symbol" ? e + "" : e, t);
const S = {
  token: "mahoraga-accessibility-widget",
  avatar: "THIAGO",
  align: "center",
  side: "right",
  maxTextSize: 800,
  highContrast: !1,
  opacity: 100,
  language: "pt-BR",
  exceptions: [".ht-skip", ".ht-ignore"],
  clickables: ["button", "a", '[role="button"]'],
  parentElement: null,
  doNotTrack: !1,
  mobileConfig: {
    align: "center",
    side: "right"
  },
  addonsMap: {
    aiAssistant: {
      signTranslator: !0,
      synonymsMeanings: !0
    },
    fontControl: {
      fontSize: !0,
      textStyle: !0,
      lineHeight: !0,
      letterSpacing: !0,
      highlightLetters: !0
    },
    navigation: {
      pageSpeech: !0,
      readerMode: !0,
      readingMask: !0,
      readingGuide: !0,
      highlightLinks: !0,
      pageStructure: !0,
      magnifier: !0,
      hideImages: !0,
      highlightHeadings: !0,
      pauseAnimations: !0,
      disableSounds: !0
    },
    colorControl: {
      contrastMode: !0,
      saturationMode: !0,
      pageColors: !0
    }
  }
}, v = {
  isTranslatorOpen: !1,
  isAddonsOpen: !1,
  isDictionaryOpen: !1,
  isCollectorActive: !1,
  isPageStructureOpen: !1,
  avatar: "THIAGO",
  speed: 1,
  opacity: 100,
  currentText: "Olá! Clique em qualquer texto da página ou selecione uma frase para traduzir em Libras.",
  currentGloss: "OLÁ BEM_VINDO LIBRAS",
  subtitlesEnabled: !0,
  isPlaying: !1,
  isVlibrasActive: !0,
  fontSizeLevel: 0,
  dyslexicFont: !1,
  lineHeightLevel: 0,
  letterSpacingLevel: 0,
  highlightLetters: !1,
  pageSpeechActive: !1,
  readingGuideActive: !1,
  readingMaskActive: !1,
  highlightLinks: !1,
  highlightHeadings: !1,
  magnifierActive: !1,
  hideImages: !1,
  pauseAnimations: !1,
  disableSounds: !1,
  readerMode: !1,
  contrastMode: "none",
  saturationMode: "normal",
  colorblindMode: "none"
}, b = {
  acessibilidade: {
    definition: "Qualidade do que é acessível, que permite a inclusão e o uso autônomo por qualquer pessoa.",
    category: "Geral",
    description: "Mãos abertas em frente ao peito com movimentos circulares e dedos entrelaçados simbolizando inclusão."
  },
  libras: {
    definition: "Língua Brasileira de Sinais, meio legal de comunicação e expressão das comunidades surdas do Brasil.",
    category: "Comunicação",
    description: 'Mãos em configuração em "L" unidas na frente do peito, alternando movimentos suaves para os lados.'
  },
  olá: {
    definition: "Saudação cordial.",
    category: "Saudações",
    description: "Mão aberta em frente ao rosto realizando um movimento suave de onda para a direita."
  },
  oi: {
    definition: "Cumprimento amigável informal.",
    category: "Saudações",
    description: 'Mão em formato da letra "O" com o dedo mínimo estendido formando o "I", balançando levemente.'
  },
  obrigado: {
    definition: "Expressão de gratidão.",
    category: "Cortesia",
    description: "Mão aberta toca a testa e em seguida o peito, inclinando a cabeça levemente em respeito."
  },
  "por favor": {
    definition: "Pedido respeitoso.",
    category: "Cortesia",
    description: "Palmas das mãos unidas na frente do peito deslizando para a frente suavemente."
  },
  "bom dia": {
    definition: "Saudação usada pela manhã.",
    category: "Saudações",
    description: 'Mão toca os lábios e abre para frente (BOM), seguida da mão em "D" saindo do olho direito (DIA).'
  },
  "boa tarde": {
    definition: "Saudação usada à tarde.",
    category: "Saudações",
    description: "Sinal de BOM seguido da mão deslizando no antebraço indicando o sol poente da tarde."
  },
  "boa noite": {
    definition: "Saudação usada ao anoitecer.",
    category: "Saudações",
    description: "Sinal de BOM seguido de ambas as mãos cobrindo os olhos suavemente (escurecer)."
  },
  ajuda: {
    definition: "Ato de prestar auxílio, socorro ou apoio.",
    category: "Ação",
    description: "Mão fechada com polegar para cima apoiada na palma aberta da outra mão, movendo-se à frente."
  },
  sim: {
    definition: "Expressão afirmativa.",
    category: "Resposta",
    description: "Mão em punho com o dedo indicador balançando para cima e para baixo (como o sinal de concordância)."
  },
  não: {
    definition: "Expressão negativa.",
    category: "Resposta",
    description: "Indicador levantado balançando lateralmente acompanhado de expressão facial de negação."
  },
  thiago: {
    definition: "Avatar virtual masculino inteligente e acessível do widget.",
    category: "Personagem",
    description: "Sinal amigável e expressivo de Thiago com topete característico e sinalização fluente."
  },
  marya: {
    definition: "Avatar virtual feminina inteligente e expressiva do widget.",
    category: "Personagem",
    description: "Sinal identificador de Marya com referência ao rabo de cavalo e sorriso comunicativo."
  },
  hugo: {
    definition: "Avatar virtual masculino (alias de Thiago).",
    category: "Personagem",
    description: "Sinal de amigo inteligente com topete característico."
  },
  maya: {
    definition: "Avatar virtual feminina (alias de Marya).",
    category: "Personagem",
    description: "Sinal de amiga inteligente com sorriso comunicativo."
  }
}, y = "ht_accessibility_state";
class M {
  constructor() {
    r(this, "state");
    r(this, "listeners", /* @__PURE__ */ new Set());
    this.state = this.loadPersistedState();
  }
  loadPersistedState() {
    try {
      const e = localStorage.getItem(y);
      if (e) {
        const t = JSON.parse(e);
        return {
          ...v,
          ...t,
          // Don't auto-open panels on page refresh
          isTranslatorOpen: t.isTranslatorOpen ?? !1,
          isAddonsOpen: !1,
          isDictionaryOpen: !1,
          isCollectorActive: !1,
          isPageStructureOpen: !1,
          isPlaying: !1
        };
      }
    } catch (e) {
      console.warn("[HandTalk] Erro ao carregar preferências do localStorage:", e);
    }
    return { ...v };
  }
  persist() {
    try {
      const e = {
        avatar: this.state.avatar,
        speed: this.state.speed,
        opacity: this.state.opacity,
        subtitlesEnabled: this.state.subtitlesEnabled,
        fontSizeLevel: this.state.fontSizeLevel,
        dyslexicFont: this.state.dyslexicFont,
        lineHeightLevel: this.state.lineHeightLevel,
        letterSpacingLevel: this.state.letterSpacingLevel,
        highlightLetters: this.state.highlightLetters,
        highlightLinks: this.state.highlightLinks,
        highlightHeadings: this.state.highlightHeadings,
        hideImages: this.state.hideImages,
        pauseAnimations: this.state.pauseAnimations,
        disableSounds: this.state.disableSounds,
        contrastMode: this.state.contrastMode,
        saturationMode: this.state.saturationMode,
        colorblindMode: this.state.colorblindMode
      };
      localStorage.setItem(y, JSON.stringify(e));
    } catch (e) {
      console.warn("[HandTalk] Erro ao salvar preferências:", e);
    }
  }
  getState() {
    return { ...this.state };
  }
  setState(e) {
    const t = { ...this.state };
    this.state = { ...this.state, ...e }, this.persist(), this.listeners.forEach((i) => i(this.state, t));
  }
  subscribe(e) {
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  reset() {
    const e = this.state.isTranslatorOpen;
    this.setState({
      ...v,
      isTranslatorOpen: e
    }), localStorage.removeItem(y);
  }
}
const a = new M();
class A {
  constructor() {
    r(this, "styleTag", null);
    r(this, "svgFilterTag", null);
    this.init();
  }
  init() {
    document.getElementById("ht-accessibility-styles") ? this.styleTag = document.getElementById("ht-accessibility-styles") : (this.styleTag = document.createElement("style"), this.styleTag.id = "ht-accessibility-styles", document.head.appendChild(this.styleTag)), document.getElementById("ht-svg-filters") || this.injectSvgFilters();
  }
  injectSvgFilters() {
    const e = document.createElement("div");
    e.id = "ht-svg-filters", e.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;", e.innerHTML = `
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
    `, document.body.appendChild(e), this.svgFilterTag = e;
  }
  apply(e) {
    if (!this.styleTag) return;
    const t = ":not(.ht-widget-root):not(.ht-widget-root *):not(.ht-skip):not(.ht-skip *)";
    let i = "";
    e.fontSizeLevel === 1 ? i += `
        html, body { font-size: 115% !important; }
        body *${t} { font-size: 110% !important; }
      ` : e.fontSizeLevel === 2 && (i += `
        html, body { font-size: 130% !important; }
        body *${t} { font-size: 125% !important; }
      `), e.dyslexicFont && (i += `
        @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        body *${t} {
          font-family: 'Atkinson Hyperlegible', 'Comic Sans MS', 'Arial', sans-serif !important;
          letter-spacing: 0.05em !important;
        }
      `), e.lineHeightLevel === 1 ? i += `body *${t} { line-height: 1.8 !important; }` : e.lineHeightLevel === 2 && (i += `body *${t} { line-height: 2.2 !important; }`), e.letterSpacingLevel === 1 ? i += `body *${t} { letter-spacing: 0.12em !important; }` : e.letterSpacingLevel === 2 && (i += `body *${t} { letter-spacing: 0.24em !important; }`), e.highlightLetters && (i += `
        body p${t}, body span${t}, body li${t} {
          word-spacing: 0.25em !important;
        }
        body p${t}::first-letter, body h1${t}::first-letter, body h2${t}::first-letter, body h3${t}::first-letter {
          color: #ff3366 !important;
          font-weight: 900 !important;
          font-size: 1.25em !important;
        }
      `), e.highlightLinks && (i += `
        a${t} {
          background-color: #ffea00 !important;
          color: #000000 !important;
          text-decoration: underline 3px solid #000000 !important;
          font-weight: bold !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
          box-shadow: 0 0 0 2px #000000 !important;
        }
      `), e.highlightHeadings && (i += `
        h1${t}, h2${t}, h3${t}, h4${t}, h5${t}, h6${t} {
          border-left: 6px solid #0d6efd !important;
          padding-left: 10px !important;
          background: rgba(13, 110, 253, 0.08) !important;
          position: relative !important;
        }
        h1${t}::before { content: 'H1: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
        h2${t}::before { content: 'H2: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
        h3${t}::before { content: 'H3: ' !important; font-size: 0.6em; color: #0d6efd; font-weight: bold; }
      `), e.hideImages && (i += `
        img${t}, svg${t}:not(.ht-icon), video${t}, canvas${t}:not(.ht-avatar-canvas) {
          filter: grayscale(100%) contrast(0) brightness(1.8) !important;
          opacity: 0.08 !important;
          transition: opacity 0.3s ease !important;
        }
        img${t}:hover {
          opacity: 1 !important;
          filter: none !important;
        }
      `), e.pauseAnimations && (i += `
        *${t}, *${t}::before, *${t}::after {
          animation-play-state: paused !important;
          transition-duration: 0.001s !important;
        }
      `), e.contrastMode === "high-contrast-dark" ? i += `
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
      ` : e.contrastMode === "high-contrast-light" ? i += `
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
      ` : e.contrastMode === "invert" && (i += `
        body > :not(.ht-widget-root):not(#vlibras-app-root):not(#vlibras-access-wrapper) {
          filter: invert(100%) hue-rotate(180deg) !important;
        }
        body {
          background-color: #000000 !important;
        }
      `), e.saturationMode === "monochrome" ? i += "body > :not(.ht-widget-root):not(#vlibras-app-root):not(#vlibras-access-wrapper) { filter: grayscale(100%) !important; }" : e.saturationMode === "low-saturation" ? i += "body > :not(.ht-widget-root):not(#vlibras-app-root):not(#vlibras-access-wrapper) { filter: saturate(40%) !important; }" : e.saturationMode === "high-saturation" && (i += "body > :not(.ht-widget-root):not(#vlibras-app-root):not(#vlibras-access-wrapper) { filter: saturate(200%) !important; }"), e.colorblindMode !== "none" && (i += `
        body > :not(.ht-widget-root):not(#vlibras-app-root):not(#vlibras-access-wrapper) {
          filter: url(#ht-${e.colorblindMode}) !important;
        }
      `), e.readerMode && (i += `
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
      `), this.styleTag.innerHTML = i;
  }
  destroy() {
    var e, t;
    (e = this.styleTag) == null || e.remove(), (t = this.svgFilterTag) == null || t.remove();
  }
}
class L {
  constructor(e) {
    r(this, "currentHoverEl", null);
    r(this, "isActive", !1);
    r(this, "onSelectTextCallback");
    this.onSelectTextCallback = e, this.init();
  }
  init() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), { passive: !0 }), document.addEventListener("mouseout", this.handleMouseOut.bind(this), { passive: !0 }), document.addEventListener("click", this.handleClick.bind(this), !0), document.addEventListener("mouseup", this.handleTextSelection.bind(this)), a.subscribe((e) => {
      this.isActive = e.isCollectorActive, this.isActive ? document.body.classList.add("ht-collector-mode") : (document.body.classList.remove("ht-collector-mode"), this.clearHover());
    });
  }
  isIgnored(e) {
    return e ? !!(e.closest(".ht-widget-root") || e.closest(".ht-skip") || e.closest(".ht-ignore") || e.closest("#vlibras-app-root") || e.closest("#vlibras-access-wrapper") || e.tagName === "BODY" || e.tagName === "HTML") : !0;
  }
  clearHover() {
    this.currentHoverEl && (this.currentHoverEl.classList.remove("vlibras--hover"), this.currentHoverEl = null), document.querySelectorAll(".vlibras--hover").forEach((e) => {
      e.classList.remove("vlibras--hover");
    });
  }
  handleMouseOver(e) {
    if (!this.isActive) return;
    const t = e.target;
    !t || this.isIgnored(t) || (this.currentHoverEl && this.currentHoverEl !== t && this.currentHoverEl.classList.remove("vlibras--hover"), t.classList.add("vlibras--hover"), this.currentHoverEl = t);
  }
  handleMouseOut(e) {
    if (!this.isActive) return;
    const t = e.target;
    t && (t.classList.remove("vlibras--hover"), this.currentHoverEl === t && (this.currentHoverEl = null));
  }
  /**
   * Native VLibras text extraction algorithm
   */
  extractTextFromElement(e) {
    var t, i, s, o, n, d, p;
    return (t = e.dataset.vlibrasGloss) != null && t.trim() ? e.dataset.vlibrasGloss.trim() : e.tagName === "IMG" ? ((i = e.alt) == null ? void 0 : i.trim()) || "" : e.tagName === "INPUT" ? ((s = e.value) == null ? void 0 : s.trim()) || "" : e.tagName === "BUTTON" ? ((o = e.value) == null ? void 0 : o.trim()) || ((n = e.innerText) == null ? void 0 : n.trim()) || "" : e.tagName === "SELECT" ? ((p = (d = e.selectedOptions[0]) == null ? void 0 : d.innerText) == null ? void 0 : p.trim()) || "" : (e.innerText || e.textContent || "").trim();
  }
  handleClick(e) {
    const t = e.target;
    if (!t || this.isIgnored(t))
      return;
    const i = window.getSelection(), s = i ? i.toString().trim() : "";
    if (s && s.length > 0 && s.length <= 1e3) {
      e.preventDefault(), e.stopPropagation(), this.clearHover(), a.setState({ isCollectorActive: !1 }), this.onSelectTextCallback(s);
      return;
    }
    if (this.isActive) {
      e.preventDefault(), e.stopPropagation();
      const o = this.extractTextFromElement(t);
      o && (t.classList.add("vlibras--active"), setTimeout(() => t.classList.remove("vlibras--active"), 1e3), this.clearHover(), a.setState({ isCollectorActive: !1 }), this.onSelectTextCallback(o));
    }
  }
  /**
   * Handles user dragging mouse to select any text on the page
   */
  handleTextSelection(e) {
    const t = e.target;
    if (t && this.isIgnored(t))
      return;
    const i = window.getSelection();
    if (!i || i.isCollapsed) return;
    const s = i.toString().trim();
    s.length > 1 && s.length <= 1e3 && (this.isActive || a.getState().isTranslatorOpen) && this.onSelectTextCallback(s);
  }
  destroy() {
    this.clearHover(), document.body.classList.remove("ht-collector-mode"), document.removeEventListener("mouseover", this.handleMouseOver.bind(this)), document.removeEventListener("mouseout", this.handleMouseOut.bind(this)), document.removeEventListener("click", this.handleClick.bind(this), !0), document.removeEventListener("mouseup", this.handleTextSelection.bind(this));
  }
}
class T {
  constructor() {
    r(this, "synth", null);
    r(this, "isActive", !1);
    r(this, "hoveredElement", null);
    typeof window < "u" && "speechSynthesis" in window && (this.synth = window.speechSynthesis), this.init();
  }
  init() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), { passive: !0 }), a.subscribe((e) => {
      this.isActive = e.pageSpeechActive, this.isActive || this.stop();
    });
  }
  handleMouseOver(e) {
    if (!this.isActive || !this.synth) return;
    const t = e.target;
    if (!t || t.closest(".ht-widget-root") || t.closest(".ht-skip")) return;
    if (["P", "H1", "H2", "H3", "H4", "H5", "H6", "BUTTON", "A", "LI", "LABEL"].includes(t.tagName) && t !== this.hoveredElement) {
      this.hoveredElement = t;
      const s = (t.innerText || t.getAttribute("aria-label") || "").trim();
      s && this.speak(s);
    }
  }
  speak(e) {
    if (!this.synth) return;
    this.stop();
    const t = new SpeechSynthesisUtterance(e);
    t.lang = "pt-BR", t.rate = 1, this.synth.speak(t);
  }
  stop() {
    this.synth && this.synth.cancel();
  }
}
class E {
  constructor() {
    r(this, "mutedElements", []);
    r(this, "observer", null);
    this.init();
  }
  init() {
    a.subscribe((e) => {
      e.disableSounds ? this.muteAll() : this.unmuteAll();
    }), this.observer = new MutationObserver(() => {
      a.getState().disableSounds && this.muteAll();
    }), this.observer.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
  muteAll() {
    document.querySelectorAll("video, audio").forEach((t) => {
      t.muted || (t.muted = !0, this.mutedElements.push(t));
    });
  }
  unmuteAll() {
    this.mutedElements.forEach((e) => {
      e.muted = !1;
    }), this.mutedElements = [];
  }
  destroy() {
    var e;
    this.unmuteAll(), (e = this.observer) == null || e.disconnect();
  }
}
class $ {
  constructor() {
    r(this, "isLoaded", !1);
    r(this, "isInitializing", !1);
    r(this, "currentAvatar", "THIAGO");
    this.init();
  }
  async init() {
    var e;
    if (!(this.isLoaded || this.isInitializing)) {
      this.isInitializing = !0;
      try {
        if (await this.loadScript("https://vlibras.gov.br/app/vlibras-plugin.js"), (e = window.VLibras) != null && e.Widget) {
          const s = a.getState().avatar === "MARYA" ? "hosana" : "icaro";
          new window.VLibras.Widget({
            rootPath: "https://vlibras.gov.br/app",
            avatar: s,
            position: "R"
          }), this.isLoaded = !0, console.log("%c[Mahoraga - VLibras]%c Motor 3D oficial do VLibras conectado com sucesso!", "color: #0070f3; font-weight: bold;", "color: inherit;");
        }
        this.setupRootWatcher(), this.hookNativeTranslation();
        let t = a.getState().isTranslatorOpen;
        a.subscribe((i) => {
          i.isTranslatorOpen && !t ? this.openPlayer() : !i.isTranslatorOpen && t && this.closePlayer(), t = i.isTranslatorOpen, i.avatar !== this.currentAvatar && (this.currentAvatar = i.avatar, this.setAvatar(i.avatar));
        });
      } catch (t) {
        console.warn("[VLibras] Falha ao carregar motor VLibras:", t);
      } finally {
        this.isInitializing = !1;
      }
    }
  }
  hookNativeTranslation() {
    let e = !1;
    const t = () => {
      if (window.plugin && !("__mahoragaHooked" in window.plugin)) {
        window.plugin.__mahoragaHooked = !0;
        const s = window.plugin.translate;
        typeof s == "function" && (window.plugin.translate = async (o) => {
          a.setState({ currentText: o, isPlaying: !0, isTranslatorOpen: !0 });
          const n = await this.translateTextToGloss(o);
          return a.setState({ currentGloss: n, isPlaying: !1 }), s(o);
        }, e = !0);
      }
      if (window.vlibras && !("__mahoragaHooked" in window.vlibras)) {
        window.vlibras.__mahoragaHooked = !0;
        const s = window.vlibras.translateAndPlay;
        typeof s == "function" && (window.vlibras.translateAndPlay = async (o) => {
          a.setState({ currentText: o, isPlaying: !0, isTranslatorOpen: !0 });
          const n = await this.translateTextToGloss(o);
          return a.setState({ currentGloss: n, isPlaying: !1 }), s(o);
        }, e = !0);
      }
    };
    t();
    const i = setInterval(() => {
      t(), e && clearInterval(i);
    }, 400);
    setTimeout(() => clearInterval(i), 15e3);
  }
  setupRootWatcher() {
    const e = () => {
      const i = document.getElementById("vlibras-app-root");
      i && this.ensureShadowFix(i);
    };
    e(), new MutationObserver(e).observe(document.body, { childList: !0 });
  }
  ensureShadowFix(e) {
    if (!e.shadowRoot || e.shadowRoot.getElementById("mahoraga-vlibras-fix")) return;
    const t = document.createElement("style");
    t.id = "mahoraga-vlibras-fix", t.textContent = `
      .opacity-0 {
        pointer-events: none !important;
        visibility: hidden !important;
      }
    `, e.shadowRoot.appendChild(t), new MutationObserver(() => {
      var o;
      const s = (o = e.shadowRoot) == null ? void 0 : o.querySelectorAll("button");
      s == null || s.forEach((n) => {
        const d = (n.getAttribute("aria-label") || "").toLowerCase();
        (d.includes("fechar") || d.includes("close")) && !n.hasAttribute("data-ht-sync") && (n.setAttribute("data-ht-sync", "true"), n.addEventListener("click", () => {
          a.setState({ isTranslatorOpen: !1 }), this.closePlayer();
        }));
      });
    }).observe(e.shadowRoot, { childList: !0, subtree: !0 });
  }
  loadScript(e) {
    return new Promise((t, i) => {
      if (document.querySelector(`script[src="${e}"]`)) {
        t();
        return;
      }
      const s = document.createElement("script");
      s.src = e, s.async = !0, s.onload = () => t(), s.onerror = () => i(new Error(`Erro ao carregar script ${e}`)), document.head.appendChild(s);
    });
  }
  /**
   * Opens the official VLibras 3D WebGL player window
   */
  openPlayer() {
    var s, o;
    try {
      const n = localStorage.getItem("@vlibras-widget");
      n && n.includes('"isOpen":false') && localStorage.setItem("@vlibras-widget", n.replace('"isOpen":false', '"isOpen":true'));
    } catch {
    }
    const e = document.getElementById("vlibras-app-root");
    if (e && (e.style.display = "", e.style.pointerEvents = "", this.ensureShadowFix(e), e.removeAttribute("data-active"), requestAnimationFrame(() => {
      e.setAttribute("data-active", "true");
    })), typeof ((s = window.VLibrasWidget) == null ? void 0 : s.open) == "function") {
      window.VLibrasWidget.open();
      return;
    }
    const t = document.getElementById("vlibras-access-wrapper"), i = (o = t == null ? void 0 : t.shadowRoot) == null ? void 0 : o.querySelector("#vlibras-button");
    if (i) {
      i.click();
      return;
    }
    e && e.setAttribute("data-active", "true");
  }
  /**
   * Closes or hides the VLibras 3D player window
   */
  closePlayer() {
    const e = document.getElementById("vlibras-app-root");
    e && (e.setAttribute("data-active", "false"), e.style.pointerEvents = "none", e.style.display = "none");
    try {
      const t = localStorage.getItem("@vlibras-widget");
      t && t.includes('"isOpen":true') && localStorage.setItem("@vlibras-widget", t.replace('"isOpen":true', '"isOpen":false'));
    } catch {
    }
  }
  /**
   * Switches avatar between Thiago (Ícaro) and Marya (Hosana)
   */
  setAvatar(e) {
    var i, s, o;
    const t = e === "MARYA" ? "hosana" : "icaro";
    (s = (i = window.plugin) == null ? void 0 : i.player) != null && s.changeAvatar ? window.plugin.player.changeAvatar(t) : (o = window.vlibras) != null && o.changeAvatar && window.vlibras.changeAvatar(t);
  }
  /**
   * Translates Portuguese text to Libras grammatical glosses using the official open-source VLibras service
   */
  async translateTextToGloss(e) {
    try {
      const t = await fetch("https://traducao2.vlibras.gov.br/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: e })
      });
      if (t.ok)
        return (await t.text()).trim();
    } catch (t) {
      console.warn("[VLibras] Falha ao consultar serviço de glosas:", t);
    }
    return e.toUpperCase();
  }
  /**
   * Sends text to the official VLibras 3D engine for authentic Libras signing
   */
  async translateAndPlay(e) {
    if (!e || !e.trim()) return "";
    this.openPlayer(), a.setState({ currentText: e, isPlaying: !0, isTranslatorOpen: !0 });
    const t = await this.translateTextToGloss(e);
    a.setState({ currentGloss: t });
    const i = () => {
      var s, o;
      return typeof ((s = window.plugin) == null ? void 0 : s.translate) == "function" ? (window.plugin.translate(e), !0) : typeof ((o = window.vlibras) == null ? void 0 : o.translateAndPlay) == "function" ? (window.vlibras.translateAndPlay(e), !0) : !1;
    };
    if (i())
      setTimeout(() => a.setState({ isPlaying: !1 }), 400);
    else {
      let s = 0;
      const o = setInterval(() => {
        s++, (i() || s > 25) && (clearInterval(o), a.setState({ isPlaying: !1 }));
      }, 250);
    }
    return t;
  }
}
const u = new $(), l = {
  // Lateral Launcher - Universal Accessibility Symbol (Official FontAwesome / Fonticons)
  accessibilityPerson: `
    <svg viewBox="0 0 512 512" fill="currentColor">
      <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3l0 50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6l0-50.1c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
    </svg>
  `,
  // Lateral Launcher - Libras / Sign Language Hands Symbol (official VLibras SVG path)
  librasHands: `
    <svg viewBox="0 0 40 40" fill="currentColor">
      <path fill-rule="evenodd" d="M14.35 8a1 1 0 0 0-.38.24c-.22.21-.22.21-.17.72l.11 1.35c.3 3.62.34 4.7.21 4.78-.21.14-.33-.06-2.35-3.97-.69-1.33-.82-1.48-1.24-1.34-.68.23-.63.57.45 2.9l.26.58c0 .01.12.3.27.61.8 1.76 1.01 2.47.75 2.57-.18.07-.51-.1-.78-.42-.14-.16-.3-.36-.38-.43a19 19 0 0 1-.78-.95l-.72-.86a7 7 0 0 0-.8-.86c-.34-.13-.8.13-.8.46 0 .29.7 1.44 2.13 3.56.9 1.33 1.11 1.8 1.32 2.97q.64 3.7 1.78 4.6c.51.4.53.4 1.75.35l1.11-.04.85-1.14.93-1.23c.33-.43 1.17-1.92 1.17-2.07 0-.02-.44-.02-.97 0q-.98.05-1.43-.04c-.52-.1-1.18-.4-1.55-.7a1.55 1.55 0 0 1-.38-1.94c.27-.45.64-.65 1.41-.74.63-.08 1.3-.26 2.27-.62l.51-.19v-.82c0-.84.16-3.78.29-5.16.1-1.09.1-1.08-.17-1.34-.19-.19-.3-.24-.5-.24-.5 0-.52.07-1.02 2.57l-.54 2.8c-.12.68-.21.93-.37 1-.2.07-.39-.25-.48-.82l-.27-1.68c-.19-1.19-.56-3.4-.64-3.8-.05-.24-.36-.6-.57-.65a1 1 0 0 0-.28 0m9.37 7.25a14 14 0 0 0-2.12.8l-1.31.62c-1.49.74-3.2 1.34-3.8 1.34-.4 0-.84.18-.88.37-.04.2.4.6.82.76.38.15.48.15 1.83.11 1.22-.03 1.47-.02 1.67.07.33.16.42.43.31.93-.11.51-.74 1.77-1.25 2.5-.33.48-2.29 3.1-3.43 4.57-.4.53-.42.8-.07 1.15.45.45.39.49 2.8-1.94 2.26-2.27 2.45-2.42 2.55-2.01.07.24.08.2-.92 2.35a16 16 0 0 0-.57 1.25c-1.15 2.49-1.2 2.65-.86 3.08.12.15.2.18.47.18.18 0 .38-.04.44-.09s.4-.62.77-1.28c.63-1.15 1-1.82 1.32-2.37 1.17-2.04 1.16-2.03 1.38-2.03.13 0 .13.03.1.86-.05.76-.14 1.66-.4 3.75-.1.79-.1 1.45.02 1.6.14.19.63.24.85.1.23-.15.33-.53.6-2.12.55-3.38.7-4.02.91-4.22.14-.13.15-.13.3 0 .07.08.17.19.2.26.04.06.15.85.24 1.76.27 2.53.29 2.66.5 2.85q.35.3.7 0c.2-.17.2-.21.26-1.12.04-.52.05-1.54.03-2.28-.03-1.43.04-2.63.17-3.04l.49-1.21c.22-.52.54-1.36.7-1.87.5-1.55.47-2.8-.1-3.36a5 5 0 0 0-.8-.54 6 6 0 0 1-1.32-1c-.57-.54-.78-.68-1.04-.75a6 6 0 0 0-1.56-.03m5.5 2.06c-.04.08.02.32.12.58.23.58.28 1.1.18 1.78-.13.88-.12.98.06 1 .24.04.36-.24.45-1 .1-.85.01-1.49-.28-2.08-.2-.42-.45-.55-.54-.28m1.27.24c-.02.05.03.3.1.54.19.58.15 1.5-.08 2.2-.15.43-.15.48-.05.59.24.24.49-.1.65-.88a4 4 0 0 0-.17-2.4c-.1-.17-.4-.2-.45-.05m-19.45 6.03c-.14.15-.1.35.2.9.52.94 1.77 2.01 2.06 1.77.21-.17.13-.33-.3-.6a4 4 0 0 1-1.38-1.56c-.29-.55-.42-.67-.58-.5m-1 .45c-.11.13-.02.46.3 1.12.45.91 1.41 1.84 1.77 1.7.18-.07.14-.35-.09-.48a4 4 0 0 1-1.45-1.99q-.25-.68-.53-.35" clip-rule="evenodd"/>
    </svg>
  `,
  libras: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
    </svg>
  `,
  accessibility: `
    <svg viewBox="0 0 512 512" fill="currentColor">
      <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3l0 50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6l0-50.1c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
    </svg>
  `,
  contrast: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor"/>
    </svg>
  `,
  fontSize: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/>
      <path d="M4 13h8"/>
      <path d="M16 19V11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8"/>
      <path d="M16 15h6"/>
    </svg>
  `,
  dyslexicFont: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20h16"/>
      <path d="m6 16 6-12 6 12"/>
      <path d="M8 12h8"/>
    </svg>
  `,
  lineHeight: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"/>
      <path d="M3 12h18"/>
      <path d="M3 18h18"/>
      <path d="M9 3l-3 3 3 3"/>
      <path d="M9 15l-3 3 3 3"/>
    </svg>
  `,
  letterSpacing: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12h18"/>
      <path d="M7 8l-4 4 4 4"/>
      <path d="M17 8l4 4-4 4"/>
      <path d="M10 6h4"/>
      <path d="M10 18h4"/>
    </svg>
  `,
  highlightLetters: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v8"/>
      <path d="m8.5 14 7-4"/>
    </svg>
  `,
  speech: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  `,
  readingGuide: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="6" y1="9" x2="6" y2="15"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="18" y1="9" x2="18" y2="15"/>
    </svg>
  `,
  readingMask: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="3" y="14" width="18" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
    </svg>
  `,
  magnifier: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `,
  highlightLinks: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  `,
  highlightHeadings: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12h8"/>
      <path d="M4 18V6"/>
      <path d="M12 18V6"/>
      <path d="m17 12 3-2v8"/>
    </svg>
  `,
  hideImages: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 2l20 20"/>
      <path d="M10.41 10.41a2 2 0 1 0 2.83 2.83"/>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  `,
  pauseAnimations: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  `,
  disableSounds: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  `,
  readerMode: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="16" y2="10"/>
    </svg>
  `,
  pageStructure: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  `,
  saturation: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
    </svg>
  `,
  colorblind: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
  dictionary: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      <path d="M9 10h6"/>
      <path d="M12 7v6"/>
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,
  reset: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  `
};
class O {
  constructor() {
    r(this, "guideElement", null);
    r(this, "maskElement", null);
    r(this, "magnifierElement", null);
    this.init();
  }
  init() {
    this.createGuide(), this.createMask(), this.createMagnifier(), window.addEventListener("mousemove", this.handleMouseMove.bind(this), { passive: !0 }), a.subscribe((e) => {
      this.guideElement && (this.guideElement.style.display = e.readingGuideActive ? "block" : "none"), this.maskElement && (this.maskElement.style.display = e.readingMaskActive ? "block" : "none"), this.magnifierElement && (this.magnifierElement.style.display = e.magnifierActive ? "block" : "none");
    });
  }
  createGuide() {
    this.guideElement = document.createElement("div"), this.guideElement.className = "ht-widget-root ht-reading-guide ht-skip", this.guideElement.style.cssText = `
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
    `, document.body.appendChild(this.guideElement);
  }
  createMask() {
    this.maskElement = document.createElement("div"), this.maskElement.className = "ht-widget-root ht-reading-mask ht-skip", this.maskElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483639;
      display: none;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75);
    `, document.body.appendChild(this.maskElement);
  }
  createMagnifier() {
    this.magnifierElement = document.createElement("div"), this.magnifierElement.className = "ht-widget-root ht-magnifier ht-skip", this.magnifierElement.style.cssText = `
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
    `, document.body.appendChild(this.magnifierElement);
  }
  handleMouseMove(e) {
    const t = a.getState();
    if (t.readingGuideActive && this.guideElement && (this.guideElement.style.top = `${e.clientY}px`), t.readingMaskActive && this.maskElement) {
      const s = Math.max(0, e.clientY - 35);
      this.maskElement.style.background = `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.75) 0px,
          rgba(0, 0, 0, 0.75) ${s}px,
          transparent ${s}px,
          transparent ${s + 70}px,
          rgba(0, 0, 0, 0.75) ${s + 70}px,
          rgba(0, 0, 0, 0.75) 100%
        )
      `;
    }
    if (t.magnifierActive && this.magnifierElement) {
      this.magnifierElement.style.left = `${e.clientX}px`, this.magnifierElement.style.top = `${e.clientY}px`;
      const i = document.elementFromPoint(e.clientX, e.clientY);
      if (i && !i.closest(".ht-widget-root") && !i.closest(".ht-skip")) {
        const s = (i.innerText || i.textContent || "").trim().slice(0, 150);
        this.magnifierElement.innerHTML = `
          <div style="padding: 16px; font-size: 20px; font-weight: bold; color: #111; line-height: 1.4; display: flex; align-items: center; justify-content: center; height: 100%; text-align: center;">
            ${s || `<span style="width: 32px; height: 32px; display: inline-flex; color: #64748b;">${l.magnifier}</span>`}
          </div>
        `;
      }
    }
  }
  destroy() {
    var e, t, i;
    (e = this.guideElement) == null || e.remove(), (t = this.maskElement) == null || t.remove(), (i = this.magnifierElement) == null || i.remove();
  }
}
class C {
  constructor(e = "right", t = "center") {
    r(this, "element", null);
    r(this, "side", "right");
    r(this, "align", "center");
    this.side = e, this.align = t, this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-launcher-container ht-skip", this.element.setAttribute("role", "region"), this.element.setAttribute("aria-label", "Atalhos de Acessibilidade e Tradutor de Libras"), this.render(), document.body.appendChild(this.element), this.attachEvents(), a.subscribe((e) => {
      if (!this.element) return;
      const t = this.element.querySelector(".ht-lateral-btn-addons"), i = this.element.querySelector(".ht-lateral-btn-libras");
      t && (e.isAddonsOpen ? (t.classList.add("ht-lateral-active"), t.style.background = "#0a3875") : (t.classList.remove("ht-lateral-active"), t.style.background = "transparent")), i && (e.isTranslatorOpen ? (i.classList.add("ht-lateral-active"), i.style.background = "#0a3875") : (i.classList.remove("ht-lateral-active"), i.style.background = "transparent"));
    });
  }
  render() {
    if (!this.element) return;
    const e = this.side !== "left";
    let t = "";
    e ? t += "right: 0; left: auto;" : t += "left: 0; right: auto;", this.align === "top" ? t += "top: 120px;" : this.align === "bottom" ? t += "bottom: 120px;" : t += "top: 50%; transform: translateY(-50%);";
    const i = e ? "12px 0 0 12px" : "0 12px 12px 0", s = e ? "border: 2px solid #ffffff; border-right: none;" : "border: 2px solid #ffffff; border-left: none;";
    this.element.innerHTML = `
      <div class="ht-lateral-launcher" style="
        position: fixed;
        ${t}
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        background: #1351b4;
        ${s}
        border-radius: ${i};
        box-shadow: -4px 6px 20px rgba(0, 0, 0, 0.22);
        overflow: hidden;
        width: 46px;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      ">
        
        <!-- Top Button: Accessibility / Addons -->
        <button class="ht-lateral-btn ht-lateral-btn-addons" style="
          width: 46px;
          height: 48px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: background 0.15s ease;
        " title="Recursos Assistivos de Acessibilidade (Alt+A)" aria-label="Abrir painel de acessibilidade e recursos assistivos">
          <span style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            ${l.accessibilityPerson}
          </span>
        </button>

        <!-- White Divider Line -->
        <div class="ht-lateral-divider" style="
          width: 100%;
          height: 1.5px;
          background: #ffffff;
        "></div>

        <!-- Bottom Button: Libras 3D Translator -->
        <button class="ht-lateral-btn ht-lateral-btn-libras" style="
          width: 46px;
          height: 48px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          padding: 0;
          outline: none;
          transition: background 0.15s ease;
        " title="Tradutor de Libras com Avatar 3D (Alt+L)" aria-label="Abrir tradutor de Libras em 3D">
          <span style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
            ${l.librasHands}
          </span>
        </button>

      </div>
    `;
  }
  attachEvents() {
    if (!this.element) return;
    const e = this.element.querySelector(".ht-lateral-btn-addons"), t = this.element.querySelector(".ht-lateral-btn-libras"), i = this.element.querySelector(".ht-lateral-launcher");
    if (i) {
      const s = this.side !== "left";
      i.addEventListener("mouseenter", () => {
        this.align === "center" ? i.style.transform = s ? "translateY(-50%) translateX(-3px)" : "translateY(-50%) translateX(3px)" : i.style.transform = s ? "translateX(-3px)" : "translateX(3px)";
      }), i.addEventListener("mouseleave", () => {
        this.align === "center" ? i.style.transform = "translateY(-50%)" : i.style.transform = "none";
      });
    }
    e == null || e.addEventListener("click", () => {
      const s = a.getState();
      a.setState({ isAddonsOpen: !s.isAddonsOpen });
    }), t == null || t.addEventListener("click", () => {
      const o = !a.getState().isTranslatorOpen;
      a.setState({ isTranslatorOpen: o }), o ? u.openPlayer() : u.closePlayer();
    });
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class H {
  constructor() {
    r(this, "element", null);
    this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-addons-panel ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-label", "Painel de Recursos de Acessibilidade"), this.element.style.display = "none", this.render(), document.body.appendChild(this.element), this.attachEvents(), a.subscribe((e) => {
      if (this.element) {
        if (this.element.style.display = e.isAddonsOpen ? "flex" : "none", e.isAddonsOpen) {
          const t = this.element.querySelector(".ht-addons-card");
          t && (t.style.transform = "translateX(0)");
        }
        this.updateActiveIndicators();
      }
    });
  }
  render() {
    this.element && (this.element.innerHTML = `
      <div class="ht-addons-backdrop" style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(4px);
        z-index: 2147483646;
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
          transform: translateX(0);
          animation: htSlideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1);
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
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${l.libras}</span>
                <span>Tradutor de Libras 3D</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("signTranslator", "Tradutor de Libras", "Avatar 3D em tempo real", l.libras)}
                ${this.renderToolButton("synonymsMeanings", "Dicionário Libras", "Sinais e significados", l.dictionary)}
              </div>
            </div>

            <!-- Category: Font Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${l.fontSize}</span>
                <span>Controle de Fonte</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("fontSize", "Tamanho da Fonte", "3 opções (+0%, +15%, +30%)", l.fontSize)}
                ${this.renderToolButton("textStyle", "Fonte Legível", "Adaptada para dislexia", l.dyslexicFont)}
                ${this.renderToolButton("lineHeight", "Espaço Linhas", "3 opções de entrelinha", l.lineHeight)}
                ${this.renderToolButton("letterSpacing", "Espaço Letras", "3 opções de espaçamento", l.letterSpacing)}
                ${this.renderToolButton("highlightLetters", "Destacar Letras", "Primeira letra colorida", l.highlightLetters)}
              </div>
            </div>

            <!-- Category: Navigation & Reading -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${l.readingGuide}</span>
                <span>Navegação & Leitura</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("pageSpeech", "Leitor de Sites", "Leitura em voz alta (TTS)", l.speech)}
                ${this.renderToolButton("pageStructure", "Estrutura da Página", "Navegação por títulos e seções", l.pageStructure)}
                ${this.renderToolButton("readingGuide", "Guia de Leitura", "Régua horizontal móvel", l.readingGuide)}
                ${this.renderToolButton("readingMask", "Máscara Leitura", "Foco na linha atual", l.readingMask)}
                ${this.renderToolButton("magnifier", "Lupa de Conteúdo", "Lente de aumento no mouse", l.magnifier)}
                ${this.renderToolButton("highlightLinks", "Destacar Links", "Bordas e realce amarelo", l.highlightLinks)}
                ${this.renderToolButton("highlightHeadings", "Destacar Títulos", "Marcações H1 a H6", l.highlightHeadings)}
                ${this.renderToolButton("hideImages", "Ocultar Imagens", "Diminui poluição visual", l.hideImages)}
                ${this.renderToolButton("pauseAnimations", "Pausar Animações", "Congela GIFs e transições", l.pauseAnimations)}
                ${this.renderToolButton("disableSounds", "Parar Sons", "Muta mídias da página", l.disableSounds)}
                ${this.renderToolButton("readerMode", "Modo Leitura", "Texto limpo sem distrações", l.readerMode)}
              </div>
            </div>

            <!-- Category: Color Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${l.contrast}</span>
                <span>Controle de Cores</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("contrastMode", "Contraste", "Escuro, Claro, Invertido", l.contrast)}
                ${this.renderToolButton("saturationMode", "Saturação", "Monocromático e Níveis", l.saturation)}
                ${this.renderToolButton("colorblindMode", "Modo Daltônico", "Filtros Protanopia / Trit.", l.colorblind)}
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
    `);
  }
  renderToolButton(e, t, i, s) {
    return `
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
    `;
  }
  attachEvents() {
    if (!this.element) return;
    const e = this.element.querySelector(".ht-addons-close-btn");
    e == null || e.addEventListener("click", () => {
      a.setState({ isAddonsOpen: !1 });
    });
    const t = this.element.querySelector(".ht-addons-backdrop");
    t == null || t.addEventListener("click", (o) => {
      o.target === t && a.setState({ isAddonsOpen: !1 });
    });
    const i = this.element.querySelector(".ht-btn-reset-all");
    i == null || i.addEventListener("click", () => {
      a.reset();
    }), this.element.querySelectorAll(".ht-tool-btn").forEach((o) => {
      o.addEventListener("click", () => {
        const n = o.getAttribute("data-tool");
        n && this.handleToolClick(n);
      });
    });
  }
  handleToolClick(e) {
    const t = a.getState();
    switch (e) {
      case "signTranslator":
        a.setState({ isTranslatorOpen: !t.isTranslatorOpen });
        break;
      case "synonymsMeanings":
        a.setState({ isDictionaryOpen: !0 });
        break;
      case "fontSize":
        a.setState({ fontSizeLevel: (t.fontSizeLevel + 1) % 3 });
        break;
      case "textStyle":
        a.setState({ dyslexicFont: !t.dyslexicFont });
        break;
      case "lineHeight":
        a.setState({ lineHeightLevel: (t.lineHeightLevel + 1) % 3 });
        break;
      case "letterSpacing":
        a.setState({ letterSpacingLevel: (t.letterSpacingLevel + 1) % 3 });
        break;
      case "highlightLetters":
        a.setState({ highlightLetters: !t.highlightLetters });
        break;
      case "pageSpeech":
        a.setState({ pageSpeechActive: !t.pageSpeechActive });
        break;
      case "pageStructure":
        a.setState({ isPageStructureOpen: !0 });
        break;
      case "readingGuide":
        a.setState({ readingGuideActive: !t.readingGuideActive });
        break;
      case "readingMask":
        a.setState({ readingMaskActive: !t.readingMaskActive });
        break;
      case "magnifier":
        a.setState({ magnifierActive: !t.magnifierActive });
        break;
      case "highlightLinks":
        a.setState({ highlightLinks: !t.highlightLinks });
        break;
      case "highlightHeadings":
        a.setState({ highlightHeadings: !t.highlightHeadings });
        break;
      case "hideImages":
        a.setState({ hideImages: !t.hideImages });
        break;
      case "pauseAnimations":
        a.setState({ pauseAnimations: !t.pauseAnimations });
        break;
      case "disableSounds":
        a.setState({ disableSounds: !t.disableSounds });
        break;
      case "readerMode":
        a.setState({ readerMode: !t.readerMode });
        break;
      case "contrastMode": {
        const i = ["none", "high-contrast-dark", "high-contrast-light", "invert"], s = i[(i.indexOf(t.contrastMode) + 1) % i.length];
        a.setState({ contrastMode: s });
        break;
      }
      case "saturationMode": {
        const i = ["normal", "monochrome", "low-saturation", "high-saturation"], s = i[(i.indexOf(t.saturationMode) + 1) % i.length];
        a.setState({ saturationMode: s });
        break;
      }
      case "colorblindMode": {
        const i = ["none", "protanopia", "deuteranopia", "tritanopia", "achromatopsia"], s = i[(i.indexOf(t.colorblindMode) + 1) % i.length];
        a.setState({ colorblindMode: s });
        break;
      }
    }
  }
  updateActiveIndicators() {
    if (!this.element) return;
    const e = a.getState();
    let t = 0;
    const i = {
      signTranslator: { active: e.isTranslatorOpen },
      synonymsMeanings: { active: e.isDictionaryOpen },
      fontSize: { active: e.fontSizeLevel > 0, label: e.fontSizeLevel === 0 ? "+0%" : e.fontSizeLevel === 1 ? "+15%" : "+30%" },
      textStyle: { active: e.dyslexicFont },
      lineHeight: { active: e.lineHeightLevel > 0, label: e.lineHeightLevel === 0 ? "Padrão" : e.lineHeightLevel === 1 ? "1.8x" : "2.2x" },
      letterSpacing: { active: e.letterSpacingLevel > 0, label: e.letterSpacingLevel === 0 ? "Padrão" : e.letterSpacingLevel === 1 ? "0.12em" : "0.24em" },
      highlightLetters: { active: e.highlightLetters },
      pageSpeech: { active: e.pageSpeechActive },
      pageStructure: { active: e.isPageStructureOpen },
      readingGuide: { active: e.readingGuideActive },
      readingMask: { active: e.readingMaskActive },
      magnifier: { active: e.magnifierActive },
      highlightLinks: { active: e.highlightLinks },
      highlightHeadings: { active: e.highlightHeadings },
      hideImages: { active: e.hideImages },
      pauseAnimations: { active: e.pauseAnimations },
      disableSounds: { active: e.disableSounds },
      readerMode: { active: e.readerMode },
      contrastMode: { active: e.contrastMode !== "none", label: e.contrastMode === "none" ? "Padrão" : e.contrastMode },
      saturationMode: { active: e.saturationMode !== "normal", label: e.saturationMode === "normal" ? "Padrão" : e.saturationMode },
      colorblindMode: { active: e.colorblindMode !== "none", label: e.colorblindMode === "none" ? "Padrão" : e.colorblindMode }
    };
    Object.entries(i).forEach(([o, n]) => {
      var p;
      const d = (p = this.element) == null ? void 0 : p.querySelector(`[data-tool="${o}"]`);
      if (d) {
        const c = d.querySelector(".ht-tool-status-dot"), f = d.querySelector(".ht-tool-icon"), m = d.querySelector(".ht-tool-sub");
        n.active ? (t++, d.style.borderColor = "#0070f3", d.style.background = "#f0f7ff", c && (c.style.background = "#0070f3"), f && (f.style.color = "#0070f3")) : (d.style.borderColor = "#e2e8f0", d.style.background = "#f8fafc", c && (c.style.background = "#cbd5e1"), f && (f.style.color = "#475569")), n.label && m && (m.innerText = `Ativo: ${n.label}`);
      }
    });
    const s = this.element.querySelector(".ht-active-counter-badge");
    s && (s.innerHTML = `${t} ${t === 1 ? "ativo" : "ativos"}`);
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class z {
  constructor(e) {
    r(this, "element", null);
    r(this, "onSignSelected");
    this.onSignSelected = e, this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-dictionary-modal ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-modal", "true"), this.element.setAttribute("aria-label", "Dicionário de Libras"), this.element.style.display = "none", this.render(), document.body.appendChild(this.element), a.subscribe((e) => {
      if (this.element && (this.element.style.display = e.isDictionaryOpen ? "flex" : "none", e.isDictionaryOpen)) {
        const t = this.element.querySelector(".ht-dict-search-input");
        t == null || t.focus();
      }
    });
  }
  render() {
    this.element && (this.element.innerHTML = `
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
            <span style="font-size:0.85rem;color:#718096;">Total de termos cadastrados: ${Object.keys(b).length}</span>
            <button class="ht-dict-close-btn2" style="background:#0070f3;color:#ffffff;border:none;padding:8px 16px;border-radius:8px;font-weight:600;font-size:0.88rem;cursor:pointer;">Concluído</button>
          </div>

        </div>
      </div>
    `, this.attachEvents());
  }
  renderList(e = "") {
    const t = Object.keys(b).filter((i) => i.includes(e.toLowerCase()));
    return t.length === 0 ? `
        <div style="text-align:center;padding:32px;color:#a0aec0;">
          <p style="margin:0;font-size:0.95rem;">Nenhum sinal encontrado para "${e}".</p>
          <p style="margin:6px 0 0;font-size:0.85rem;">Tente pesquisar por termos comuns como "acessibilidade", "libras", "olá", "obrigado".</p>
        </div>
      ` : t.map((i) => {
      const s = b[i], o = i.charAt(0).toUpperCase() + i.slice(1);
      return `
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
      `;
    }).join("");
  }
  attachEvents() {
    if (!this.element) return;
    this.element.querySelectorAll(".ht-dict-close-btn, .ht-dict-close-btn2").forEach((o) => {
      o.addEventListener("click", () => {
        a.setState({ isDictionaryOpen: !1 });
      });
    });
    const t = this.element.querySelector(".ht-modal-backdrop");
    t == null || t.addEventListener("click", (o) => {
      o.target === t && a.setState({ isDictionaryOpen: !1 });
    });
    const i = this.element.querySelector(".ht-dict-search-input"), s = this.element.querySelector(".ht-dict-list");
    i == null || i.addEventListener("input", (o) => {
      const n = o.target.value;
      s && (s.innerHTML = this.renderList(n), this.attachSignButtons());
    }), this.attachSignButtons();
  }
  attachSignButtons() {
    if (!this.element) return;
    this.element.querySelectorAll(".ht-dict-sign-btn").forEach((t) => {
      t.addEventListener("click", () => {
        const i = t.getAttribute("data-term");
        i && (a.setState({ isDictionaryOpen: !1, isTranslatorOpen: !0 }), this.onSignSelected(i));
      });
    });
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class B {
  constructor() {
    r(this, "element", null);
    this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-page-structure-modal ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-modal", "true"), this.element.setAttribute("aria-label", "Estrutura da Página e Navegação por Títulos"), this.element.style.display = "none", document.body.appendChild(this.element), a.subscribe((e) => {
      this.element && (e.isPageStructureOpen ? (this.render(), this.element.style.display = "flex") : this.element.style.display = "none");
    });
  }
  scanStructure() {
    const e = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, nav, main, header, footer, [role="heading"], [role="banner"], [role="navigation"], [role="main"]')
    ), t = [];
    return e.forEach((i) => {
      if (i.closest(".ht-widget-root") || i.closest(".ht-skip") || i.closest("#vlibras-app-root"))
        return;
      const s = (i.innerText || i.textContent || "").trim().replace(/\s+/g, " ");
      if (!s && !i.getAttribute("aria-label")) return;
      const o = i.tagName.toLowerCase();
      let n = 1, d = s;
      o.startsWith("h") && o.length === 2 ? n = parseInt(o[1], 10) : o === "header" || i.getAttribute("role") === "banner" ? (n = 1, d = d || "Cabeçalho do Site") : o === "nav" || i.getAttribute("role") === "navigation" ? (n = 2, d = d || "Menu de Navegação") : o === "main" || i.getAttribute("role") === "main" ? (n = 1, d = d || "Conteúdo Principal") : o === "footer" && (n = 1, d = d || "Rodapé da Página"), d.length > 80 && (d = d.slice(0, 80) + "..."), t.push({
        element: i,
        tag: o.toUpperCase(),
        level: n,
        text: d
      });
    }), t;
  }
  render() {
    if (!this.element) return;
    const e = this.scanStructure();
    this.element.innerHTML = `
      <div class="ht-structure-backdrop" style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        z-index: 2147483645;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      ">
        <div class="ht-structure-card" style="
          background: #ffffff;
          border-radius: 16px;
          max-width: 560px;
          width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 24px;
            border-bottom: 1px solid #eef0f3;
            background: #ffffff;
          ">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="
                width: 36px;
                height: 36px;
                border-radius: 10px;
                background: #eef6ff;
                color: #0070f3;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <span style="width: 20px; height: 20px; display: inline-block;">${l.pageStructure}</span>
              </div>
              <div>
                <h2 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: #1e293b;">Estrutura da Página</h2>
                <span style="font-size: 0.8rem; color: #64748b;">Navegue rapidamente pelos títulos e seções</span>
              </div>
            </div>

            <button class="ht-structure-close-btn" style="
              width: 32px;
              height: 32px;
              border-radius: 8px;
              background: #f1f5f9;
              border: none;
              color: #475569;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            " aria-label="Fechar estrutura da página">
              <span style="width: 18px; height: 18px;">${l.close}</span>
            </button>
          </div>

          <!-- List of Headings / Landmarks -->
          <div class="ht-structure-list" style="
            flex: 1;
            overflow-y: auto;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          ">
            ${e.length === 0 ? `
              <div style="text-align: center; padding: 40px 20px; color: #64748b; font-size: 0.95rem;">
                Nenhum cabeçalho ou seção estrutural identificado nesta página.
              </div>
            ` : e.map((o, n) => `
              <button class="ht-structure-item-btn" data-index="${n}" style="
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 14px;
                margin-left: ${(o.level - 1) * 16}px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                text-align: left;
                transition: all 0.15s ease;
                outline: none;
              ">
                <span style="
                  font-size: 0.72rem;
                  font-weight: 800;
                  color: #0070f3;
                  background: #eef6ff;
                  padding: 2px 7px;
                  border-radius: 4px;
                  letter-spacing: 0.05em;
                ">${o.tag}</span>
                <span style="
                  font-size: 0.88rem;
                  color: #1e293b;
                  font-weight: ${o.level === 1 ? "700" : "500"};
                  line-height: 1.35;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                ">${o.text}</span>
              </button>
            `).join("")}
          </div>

          <!-- Footer -->
          <div style="
            padding: 12px 20px;
            border-top: 1px solid #eef0f3;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #64748b;
          ">
            <span>${e.length} itens estruturais encontrados</span>
            <span>Clique para saltar diretamente para a seção</span>
          </div>
        </div>
      </div>
    `;
    const t = this.element.querySelector(".ht-structure-close-btn");
    t == null || t.addEventListener("click", () => {
      a.setState({ isPageStructureOpen: !1 });
    });
    const i = this.element.querySelector(".ht-structure-backdrop");
    i == null || i.addEventListener("click", (o) => {
      o.target === i && a.setState({ isPageStructureOpen: !1 });
    }), this.element.querySelectorAll(".ht-structure-item-btn").forEach((o) => {
      o.addEventListener("click", () => {
        var d;
        const n = o.getAttribute("data-index");
        if (n !== null) {
          const p = parseInt(n, 10), c = (d = e[p]) == null ? void 0 : d.element;
          if (c) {
            a.setState({ isPageStructureOpen: !1, isAddonsOpen: !1 }), c.scrollIntoView({ behavior: "smooth", block: "center" });
            const f = c.style.transition, m = c.style.outline, x = c.style.outlineOffset;
            c.style.transition = "outline 0.2s ease", c.style.outline = "4px solid #0070f3", c.style.outlineOffset = "4px", c.hasAttribute("tabindex") || c.setAttribute("tabindex", "-1"), c.focus(), setTimeout(() => {
              c.style.outline = m, c.style.outlineOffset = x, c.style.transition = f;
            }, 1800);
          }
        }
      });
    });
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class g {
  constructor(e = {}) {
    r(this, "options");
    r(this, "styleManager");
    r(this, "collectorManager");
    r(this, "speechManager");
    r(this, "audioManager");
    r(this, "readingToolsManager");
    r(this, "launcher");
    r(this, "addonsPanel");
    r(this, "dictionaryModal");
    r(this, "pageStructureModal");
    this.options = { ...S, ...e }, a.setState({
      avatar: this.options.avatar,
      opacity: this.options.opacity
    }), this.options.highContrast && a.setState({ contrastMode: "high-contrast-dark" }), this.styleManager = new A(), this.speechManager = new T(), this.audioManager = new E(), this.readingToolsManager = new O(), u.init(), this.addonsPanel = new H(), this.dictionaryModal = new z((t) => {
      this.translate(t);
    }), this.pageStructureModal = new B(), this.collectorManager = new L((t) => {
      this.translate(t);
    }), this.launcher = new C(this.options.side, this.options.align), a.subscribe((t) => {
      this.styleManager.apply(t);
    }), this.styleManager.apply(a.getState()), this.setupKeyboardShortcuts(), console.log("%c[Mahoraga Accessibility Widget]%c Inicializado com sucesso! (REA Re-engineering)", "color: #0070f3; font-weight: bold;", "color: inherit;");
  }
  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        const t = a.getState().isAddonsOpen;
        a.setState({ isAddonsOpen: !t });
      }
      if (e.altKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        const t = a.getState().isTranslatorOpen;
        a.setState({ isTranslatorOpen: !t });
      }
      e.key === "Escape" && a.setState({
        isAddonsOpen: !1,
        isDictionaryOpen: !1,
        isCollectorActive: !1,
        isPageStructureOpen: !1
      });
    });
  }
  openTranslator() {
    a.setState({ isTranslatorOpen: !0 }), u.openPlayer();
  }
  closeTranslator() {
    a.setState({ isTranslatorOpen: !1, isCollectorActive: !1 }), u.closePlayer();
  }
  openAddons() {
    a.setState({ isAddonsOpen: !0 });
  }
  closeAddons() {
    a.setState({ isAddonsOpen: !1 });
  }
  translate(e) {
    u.translateAndPlay(e);
  }
  setAvatar(e) {
    a.setState({ avatar: e }), u.setAvatar(e);
  }
  reset() {
    a.reset();
  }
  destroy() {
    this.styleManager.destroy(), this.collectorManager.destroy(), this.speechManager.stop(), this.audioManager.destroy(), this.readingToolsManager.destroy(), this.launcher.destroy(), this.addonsPanel.destroy(), this.dictionaryModal.destroy(), this.pageStructureModal.destroy();
  }
}
const I = g, j = g, q = g;
typeof window < "u" && (window.Mahoraga = g, window.MahoragaWidget = g, window.HT = g, window.HandTalkWidget = g);
export {
  q as HT,
  g as HandTalkWidget,
  j as Mahoraga,
  I as MahoragaWidget,
  g as default
};
