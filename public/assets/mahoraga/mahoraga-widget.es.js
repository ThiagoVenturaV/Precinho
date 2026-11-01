var A = Object.defineProperty;
var L = (h, e, t) => e in h ? A(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var l = (h, e, t) => L(h, typeof e != "symbol" ? e + "" : e, t);
const T = {
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
}, y = {
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
}, x = {
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
}, w = "ht_accessibility_state";
class E {
  constructor() {
    l(this, "state");
    l(this, "listeners", /* @__PURE__ */ new Set());
    this.state = this.loadPersistedState();
  }
  loadPersistedState() {
    try {
      const e = localStorage.getItem(w);
      if (e) {
        const t = JSON.parse(e);
        return {
          ...y,
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
    return { ...y };
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
      localStorage.setItem(w, JSON.stringify(e));
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
      ...y,
      isTranslatorOpen: e
    }), localStorage.removeItem(w);
  }
}
const s = new E();
class $ {
  constructor() {
    l(this, "styleTag", null);
    l(this, "svgFilterTag", null);
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
class C {
  constructor(e) {
    l(this, "currentHoverEl", null);
    l(this, "isActive", !1);
    l(this, "onSelectTextCallback");
    this.onSelectTextCallback = e, this.init();
  }
  init() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), { passive: !0 }), document.addEventListener("mouseout", this.handleMouseOut.bind(this), { passive: !0 }), document.addEventListener("click", this.handleClick.bind(this), !0), document.addEventListener("mouseup", this.handleTextSelection.bind(this)), s.subscribe((e) => {
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
    var t, i, n, a, o, d, u;
    return (t = e.dataset.vlibrasGloss) != null && t.trim() ? e.dataset.vlibrasGloss.trim() : e.tagName === "IMG" ? ((i = e.alt) == null ? void 0 : i.trim()) || "" : e.tagName === "INPUT" ? ((n = e.value) == null ? void 0 : n.trim()) || "" : e.tagName === "BUTTON" ? ((a = e.value) == null ? void 0 : a.trim()) || ((o = e.innerText) == null ? void 0 : o.trim()) || "" : e.tagName === "SELECT" ? ((u = (d = e.selectedOptions[0]) == null ? void 0 : d.innerText) == null ? void 0 : u.trim()) || "" : (e.innerText || e.textContent || "").trim();
  }
  handleClick(e) {
    const t = e.target;
    if (!t || this.isIgnored(t))
      return;
    const i = window.getSelection(), n = i ? i.toString().trim() : "";
    if (n && n.length > 0 && n.length <= 1e3) {
      e.preventDefault(), e.stopPropagation(), this.clearHover(), s.setState({ isCollectorActive: !1 }), this.onSelectTextCallback(n);
      return;
    }
    if (this.isActive) {
      e.preventDefault(), e.stopPropagation();
      const a = this.extractTextFromElement(t);
      a && (t.classList.add("vlibras--active"), setTimeout(() => t.classList.remove("vlibras--active"), 1e3), this.clearHover(), s.setState({ isCollectorActive: !1 }), this.onSelectTextCallback(a));
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
    const n = i.toString().trim();
    n.length > 1 && n.length <= 1e3 && this.onSelectTextCallback(n);
  }
  destroy() {
    this.clearHover(), document.body.classList.remove("ht-collector-mode"), document.removeEventListener("mouseover", this.handleMouseOver.bind(this)), document.removeEventListener("mouseout", this.handleMouseOut.bind(this)), document.removeEventListener("click", this.handleClick.bind(this), !0), document.removeEventListener("mouseup", this.handleTextSelection.bind(this));
  }
}
class O {
  constructor() {
    l(this, "synth", null);
    l(this, "isActive", !1);
    l(this, "hoveredElement", null);
    typeof window < "u" && "speechSynthesis" in window && (this.synth = window.speechSynthesis), this.init();
  }
  init() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this), { passive: !0 }), s.subscribe((e) => {
      this.isActive = e.pageSpeechActive, this.isActive || this.stop();
    });
  }
  handleMouseOver(e) {
    if (!this.isActive || !this.synth) return;
    const t = e.target;
    if (!t || t.closest(".ht-widget-root") || t.closest(".ht-skip")) return;
    if (["P", "H1", "H2", "H3", "H4", "H5", "H6", "BUTTON", "A", "LI", "LABEL"].includes(t.tagName) && t !== this.hoveredElement) {
      this.hoveredElement = t;
      const n = (t.innerText || t.getAttribute("aria-label") || "").trim();
      n && this.speak(n);
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
class z {
  constructor() {
    l(this, "mutedElements", []);
    l(this, "observer", null);
    this.init();
  }
  init() {
    s.subscribe((e) => {
      e.disableSounds ? this.muteAll() : this.unmuteAll();
    }), this.observer = new MutationObserver(() => {
      s.getState().disableSounds && this.muteAll();
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
class H {
  constructor() {
    l(this, "isLoaded", !1);
    l(this, "isInitializing", !1);
    l(this, "currentAvatar", "THIAGO");
    this.init();
  }
  async init() {
    var e;
    if (!(this.isLoaded || this.isInitializing)) {
      this.isInitializing = !0;
      try {
        if (await this.loadScript("https://vlibras.gov.br/app/vlibras-plugin.js"), (e = window.VLibras) != null && e.Widget) {
          const i = s.getState().avatar === "MARYA" ? "hosana" : "icaro";
          new window.VLibras.Widget({
            rootPath: "https://vlibras.gov.br/app",
            avatar: i,
            position: "R"
          }), this.isLoaded = !0, console.log("%c[Mahoraga - VLibras]%c Motor 3D oficial do VLibras conectado com sucesso!", "color: #0070f3; font-weight: bold;", "color: inherit;");
        }
        this.setupRootWatcher(), this.hookNativeTranslation(), s.subscribe((t) => {
          t.avatar !== this.currentAvatar && (this.currentAvatar = t.avatar, this.setAvatar(t.avatar));
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
        const n = window.plugin.translate;
        typeof n == "function" && (window.plugin.translate = async (a) => {
          s.setState({ currentText: a, isPlaying: !0, isTranslatorOpen: !0 });
          const o = await this.translateTextToGloss(a);
          return s.setState({ currentGloss: o, isPlaying: !1 }), n(a);
        }, e = !0);
      }
      if (window.vlibras && !("__mahoragaHooked" in window.vlibras)) {
        window.vlibras.__mahoragaHooked = !0;
        const n = window.vlibras.translateAndPlay;
        typeof n == "function" && (window.vlibras.translateAndPlay = async (a) => {
          s.setState({ currentText: a, isPlaying: !0, isTranslatorOpen: !0 });
          const o = await this.translateTextToGloss(a);
          return s.setState({ currentGloss: o, isPlaying: !1 }), n(a);
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
      var a;
      const n = (a = e.shadowRoot) == null ? void 0 : a.querySelectorAll("button");
      n == null || n.forEach((o) => {
        const d = (o.getAttribute("aria-label") || "").toLowerCase();
        (d.includes("fechar") || d.includes("close")) && !o.hasAttribute("data-ht-sync") && (o.setAttribute("data-ht-sync", "true"), o.addEventListener("click", () => {
          s.setState({ isTranslatorOpen: !1 }), this.closePlayer();
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
      const n = document.createElement("script");
      n.src = e, n.async = !0, n.onload = () => t(), n.onerror = () => i(new Error(`Erro ao carregar script ${e}`)), document.head.appendChild(n);
    });
  }
  /**
   * Opens the official VLibras 3D WebGL player window
   */
  openPlayer() {
    var n, a;
    try {
      const o = localStorage.getItem("@vlibras-widget");
      o && o.includes('"isOpen":false') && localStorage.setItem("@vlibras-widget", o.replace('"isOpen":false', '"isOpen":true'));
    } catch {
    }
    const e = document.getElementById("vlibras-app-root");
    if (e && (e.style.display = "", e.style.pointerEvents = "", this.ensureShadowFix(e), e.removeAttribute("data-active"), requestAnimationFrame(() => {
      e.setAttribute("data-active", "true");
    })), typeof ((n = window.VLibrasWidget) == null ? void 0 : n.open) == "function") {
      window.VLibrasWidget.open();
      return;
    }
    const t = document.getElementById("vlibras-access-wrapper"), i = (a = t == null ? void 0 : t.shadowRoot) == null ? void 0 : a.querySelector("#vlibras-button");
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
    var i, n, a;
    const t = e === "MARYA" ? "hosana" : "icaro";
    (n = (i = window.plugin) == null ? void 0 : i.player) != null && n.changeAvatar ? window.plugin.player.changeAvatar(t) : (a = window.vlibras) != null && a.changeAvatar && window.vlibras.changeAvatar(t);
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
    this.openPlayer(), s.setState({ currentText: e, isPlaying: !0, isTranslatorOpen: !0 });
    const t = await this.translateTextToGloss(e);
    s.setState({ currentGloss: t });
    const i = () => {
      var n, a;
      return typeof ((n = window.plugin) == null ? void 0 : n.translate) == "function" ? (window.plugin.translate(e), !0) : typeof ((a = window.vlibras) == null ? void 0 : a.translateAndPlay) == "function" ? (window.vlibras.translateAndPlay(e), !0) : !1;
    };
    if (i())
      setTimeout(() => s.setState({ isPlaying: !1 }), 400);
    else {
      let n = 0;
      const a = setInterval(() => {
        n++, (i() || n > 25) && (clearInterval(a), s.setState({ isPlaying: !1 }));
      }, 250);
    }
    return t;
  }
}
const m = new H(), r = {
  // Lateral Launcher - Accessibility Person Symbol (solid white silhouette)
  accessibilityPerson: `
    <svg viewBox="0 0 40 40" fill="currentColor">
      <circle cx="20" cy="9" r="3.3"/>
      <path d="M9 13.8h22c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6H24v5.8h-1.6V23h-4.8v-.2H16v-5.8H9c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6z"/>
      <path d="M16.2 21h3.3v9.5c0 .9-.7 1.5-1.6 1.5s-1.7-.6-1.7-1.5V21z"/>
      <path d="M20.5 21h3.3v9.5c0 .9-.7 1.5-1.6 1.5s-1.7-.6-1.7-1.5V21z"/>
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="m4.93 10.93 4.24-4.24a2 2 0 0 1 2.83 0l4.24 4.24"/>
      <path d="M12 7v8"/>
      <path d="m8 19 4-4 4 4"/>
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
  collector: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      <path d="m13 13 6 6"/>
    </svg>
  `,
  repeat: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <polyline points="23 20 23 14 17 14"/>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  `,
  speed: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,
  close: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,
  minimize: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  `,
  reset: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  `,
  swap: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 3 4 4-4 4"/>
      <path d="M20 7H4"/>
      <path d="m8 21-4-4 4-4"/>
      <path d="M4 17h16"/>
    </svg>
  `
};
class B {
  constructor() {
    l(this, "guideElement", null);
    l(this, "maskElement", null);
    l(this, "magnifierElement", null);
    this.init();
  }
  init() {
    this.createGuide(), this.createMask(), this.createMagnifier(), window.addEventListener("mousemove", this.handleMouseMove.bind(this), { passive: !0 }), s.subscribe((e) => {
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
    const t = s.getState();
    if (t.readingGuideActive && this.guideElement && (this.guideElement.style.top = `${e.clientY}px`), t.readingMaskActive && this.maskElement) {
      const n = Math.max(0, e.clientY - 35);
      this.maskElement.style.background = `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.75) 0px,
          rgba(0, 0, 0, 0.75) ${n}px,
          transparent ${n}px,
          transparent ${n + 70}px,
          rgba(0, 0, 0, 0.75) ${n + 70}px,
          rgba(0, 0, 0, 0.75) 100%
        )
      `;
    }
    if (t.magnifierActive && this.magnifierElement) {
      this.magnifierElement.style.left = `${e.clientX}px`, this.magnifierElement.style.top = `${e.clientY}px`;
      const i = document.elementFromPoint(e.clientX, e.clientY);
      if (i && !i.closest(".ht-widget-root") && !i.closest(".ht-skip")) {
        const n = (i.innerText || i.textContent || "").trim().slice(0, 150);
        this.magnifierElement.innerHTML = `
          <div style="padding: 16px; font-size: 20px; font-weight: bold; color: #111; line-height: 1.4; display: flex; align-items: center; justify-content: center; height: 100%; text-align: center;">
            ${n || `<span style="width: 32px; height: 32px; display: inline-flex; color: #64748b;">${r.magnifier}</span>`}
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
class q {
  constructor(e = "right", t = "center") {
    l(this, "element", null);
    l(this, "side", "right");
    l(this, "align", "center");
    this.side = e, this.align = t, this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-launcher-container ht-skip", this.element.setAttribute("role", "region"), this.element.setAttribute("aria-label", "Atalhos de Acessibilidade e Tradutor de Libras"), this.render(), document.body.appendChild(this.element), this.attachEvents(), s.subscribe((e) => {
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
    const i = e ? "12px 0 0 12px" : "0 12px 12px 0", n = e ? "border: 2px solid #ffffff; border-right: none;" : "border: 2px solid #ffffff; border-left: none;";
    this.element.innerHTML = `
      <div class="ht-lateral-launcher" style="
        position: fixed;
        ${t}
        z-index: 2147483647;
        display: flex;
        flex-direction: column;
        background: #1351b4;
        ${n}
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
            ${r.accessibilityPerson}
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
            ${r.librasHands}
          </span>
        </button>

      </div>
    `;
  }
  attachEvents() {
    if (!this.element) return;
    const e = this.element.querySelector(".ht-lateral-btn-addons"), t = this.element.querySelector(".ht-lateral-btn-libras"), i = this.element.querySelector(".ht-lateral-launcher");
    if (i) {
      const n = this.side !== "left";
      i.addEventListener("mouseenter", () => {
        this.align === "center" ? i.style.transform = n ? "translateY(-50%) translateX(-3px)" : "translateY(-50%) translateX(3px)" : i.style.transform = n ? "translateX(-3px)" : "translateX(3px)";
      }), i.addEventListener("mouseleave", () => {
        this.align === "center" ? i.style.transform = "translateY(-50%)" : i.style.transform = "none";
      });
    }
    e == null || e.addEventListener("click", () => {
      const n = s.getState();
      s.setState({ isAddonsOpen: !n.isAddonsOpen });
    }), t == null || t.addEventListener("click", () => {
      const n = s.getState();
      s.setState({ isTranslatorOpen: !n.isTranslatorOpen });
    });
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class P {
  constructor() {
    l(this, "element", null);
    l(this, "isMinimized", !1);
    l(this, "isDragging", !1);
    l(this, "dragStartX", 0);
    l(this, "dragStartY", 0);
    this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-translator-window ht-skip", this.element.setAttribute("role", "region"), this.element.setAttribute("aria-label", "Janela de Tradução em Libras Mahoraga"), this.element.style.display = "none", this.render(), document.body.appendChild(this.element), this.attachEvents(), s.subscribe((e, t) => {
      if (!this.element) return;
      this.element.style.display = e.isTranslatorOpen ? "flex" : "none", e.isTranslatorOpen && !t.isTranslatorOpen && m.openPlayer();
      const i = this.element.querySelector(".ht-translator-subtitle-text");
      i && (i.innerText = e.currentText || "Selecione ou clique em qualquer texto para traduzir em Libras");
      const n = this.element.querySelector(".ht-translator-subtitle-gloss");
      n && (e.currentGloss ? (n.innerHTML = `<span style="width: 14px; height: 14px; display: inline-flex; vertical-align: -2px; margin-right: 4px;">${r.libras}</span> Glosa Libras: [${e.currentGloss}]`, n.style.display = "block") : n.style.display = "none");
      const a = this.element.querySelector(".ht-translator-card");
      a && (a.style.background = e.opacity === 100 ? "#ffffff" : e.opacity === 50 ? "rgba(255, 255, 255, 0.82)" : "rgba(255, 255, 255, 0.45)");
      const o = this.element.querySelector(".ht-avatar-name-badge"), d = this.element.querySelector(".ht-avatar-status-name"), u = e.avatar === "MARYA", c = u ? "Marya" : "Thiago", g = u ? "Hosana" : "Ícaro";
      o && (o.innerText = c), d && (d.innerText = `Avatar 3D: ${c} (${g})`);
      const p = this.element.querySelector(".ht-btn-collector");
      p && (e.isCollectorActive ? (p.classList.add("ht-btn-active"), p.style.background = "#0070f3", p.style.color = "#ffffff") : (p.classList.remove("ht-btn-active"), p.style.background = "#f1f5f9", p.style.color = "#334155"));
      const f = this.element.querySelector(".ht-btn-speed span");
      f && (f.innerText = `${e.speed}x`);
    });
  }
  async translateText(e) {
    !e || !e.trim() || await m.translateAndPlay(e);
  }
  render() {
    this.element && (this.element.innerHTML = `
      <div class="ht-translator-card" style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 340px;
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
          background: rgba(255,255,255,0.85);
          cursor: grab;
          user-select: none;
        ">
          <!-- Avatar Switcher (Thiago <-> Marya) -->
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
          " title="Alternar entre Thiago (Ícaro) e Marya (Hosana)">
            <span style="width: 14px; height: 14px; display: inline-block;">${r.libras}</span>
            <span class="ht-avatar-name-badge">Thiago</span>
            <span style="width: 12px; height: 12px; display: inline-flex; color: #64748b;">${r.swap}</span>
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
              <span style="width: 16px; height: 16px;">${r.minimize}</span>
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
              <span style="width: 16px; height: 16px;">${r.close}</span>
            </button>
          </div>
        </div>

        <!-- Body / Live 3D Motor Status & Subtitles -->
        <div class="ht-translator-body" style="
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        ">
          
          <!-- 3D Engine Card -->
          <div style="
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 14px;
            padding: 14px;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          ">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e;"></span>
                <span style="font-size: 0.78rem; font-weight: 700; letter-spacing: 0.03em; color: #94a3b8; text-transform: uppercase;">VLibras 3D Engine</span>
              </div>
              <button class="ht-btn-focus-3d" style="
                background: rgba(255,255,255,0.12);
                border: 1px solid rgba(255,255,255,0.2);
                color: #ffffff;
                font-size: 0.72rem;
                font-weight: 600;
                padding: 3px 8px;
                border-radius: 6px;
                cursor: pointer;
              ">Focar Avatar 3D</button>
            </div>

            <div class="ht-avatar-status-name" style="font-size: 0.95rem; font-weight: 700; color: #f8fafc;">
              Avatar 3D: Thiago (Ícaro)
            </div>

            <p style="font-size: 0.75rem; color: #94a3b8; margin: 0; line-height: 1.4;">
              Motor oficial open-source do Governo Federal e UFPB. Sinalização em Libras autêntica com expressões faciais e datilologia.
            </p>
          </div>

          <!-- Subtitle Box -->
          <div class="ht-translator-subtitle" style="
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          ">
            <div style="font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">
              Texto Selecionado:
            </div>
            <div class="ht-translator-subtitle-text" style="
              font-size: 0.85rem;
              color: #0f172a;
              font-weight: 500;
              line-height: 1.4;
              max-height: 80px;
              overflow-y: auto;
            ">
              Clique em qualquer texto do site para traduzir em Libras
            </div>
            
            <!-- Libras Grammatical Gloss -->
            <div class="ht-translator-subtitle-gloss" style="
              display: none;
              font-size: 0.75rem;
              color: #0284c7;
              font-weight: 700;
              background: #f0f9ff;
              border: 1px dashed #bae6fd;
              border-radius: 6px;
              padding: 6px 8px;
              line-height: 1.35;
              text-transform: uppercase;
              word-break: break-word;
            "></div>
          </div>

        </div>

        <!-- Toolbar / Controls -->
        <div class="ht-translator-toolbar" style="
          padding: 8px 12px;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.92);
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
            <span style="width: 14px; height: 14px; display: inline-block;">${r.collector}</span>
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
          " title="Alterar velocidade da sinalização">
            <span style="width: 14px; height: 14px; display: inline-block;">${r.speed}</span>
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
            <span style="width: 16px; height: 16px;">${r.repeat}</span>
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
            <span style="width: 16px; height: 16px;">${r.dictionary}</span>
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
            <span style="width: 16px; height: 16px;">${r.contrast}</span>
          </button>
        </div>

      </div>
    `);
  }
  attachEvents() {
    if (!this.element) return;
    const e = this.element.querySelector(".ht-btn-avatar-switch");
    e == null || e.addEventListener("click", () => {
      const p = s.getState().avatar, f = p === "THIAGO" || p === "HUGO" ? "MARYA" : "THIAGO";
      s.setState({ avatar: f }), m.setAvatar(f);
    });
    const t = this.element.querySelector(".ht-btn-focus-3d");
    t == null || t.addEventListener("click", () => {
      m.openPlayer();
    });
    const i = this.element.querySelector(".ht-btn-close");
    i == null || i.addEventListener("click", () => {
      s.setState({ isTranslatorOpen: !1, isCollectorActive: !1 }), m.closePlayer();
    });
    const n = this.element.querySelector(".ht-btn-minimize");
    n == null || n.addEventListener("click", () => {
      this.toggleMinimize();
    });
    const a = this.element.querySelector(".ht-btn-collector");
    a == null || a.addEventListener("click", () => {
      const p = s.getState().isCollectorActive;
      s.setState({ isCollectorActive: !p });
    });
    const o = this.element.querySelector(".ht-btn-speed");
    o == null || o.addEventListener("click", () => {
      var S, M;
      const p = [1, 1.5, 2, 0.5], f = s.getState().speed, v = (p.indexOf(f) + 1) % p.length, k = p[v];
      s.setState({ speed: k }), (M = (S = window.plugin) == null ? void 0 : S.player) != null && M.setSpeed && window.plugin.player.setSpeed(k);
    });
    const d = this.element.querySelector(".ht-btn-repeat");
    d == null || d.addEventListener("click", () => {
      const p = s.getState().currentText;
      p && this.translateText(p);
    });
    const u = this.element.querySelector(".ht-btn-dictionary");
    u == null || u.addEventListener("click", () => {
      s.setState({ isDictionaryOpen: !0 });
    });
    const c = this.element.querySelector(".ht-btn-opacity");
    c == null || c.addEventListener("click", () => {
      const p = [100, 50, 0], f = s.getState().opacity, v = (p.indexOf(f) + 1) % p.length;
      s.setState({ opacity: p[v] });
    });
    const g = this.element.querySelector(".ht-translator-header");
    g == null || g.addEventListener("mousedown", this.handleMouseDown.bind(this)), window.addEventListener("mousemove", this.handleMouseMove.bind(this)), window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }
  toggleMinimize() {
    var i, n;
    this.isMinimized = !this.isMinimized;
    const e = (i = this.element) == null ? void 0 : i.querySelector(".ht-translator-body"), t = (n = this.element) == null ? void 0 : n.querySelector(".ht-translator-toolbar");
    e && t && (this.isMinimized ? (e.style.display = "none", t.style.display = "none") : (e.style.display = "flex", t.style.display = "flex"));
  }
  handleMouseDown(e) {
    var n;
    if (e.target.closest("button")) return;
    this.isDragging = !0;
    const t = (n = this.element) == null ? void 0 : n.querySelector(".ht-translator-card");
    if (!t) return;
    const i = t.getBoundingClientRect();
    this.dragStartX = e.clientX - i.left, this.dragStartY = e.clientY - i.top, t.style.cursor = "grabbing";
  }
  handleMouseMove(e) {
    var c;
    if (!this.isDragging) return;
    const t = (c = this.element) == null ? void 0 : c.querySelector(".ht-translator-card");
    if (!t) return;
    const i = e.clientX - this.dragStartX, n = e.clientY - this.dragStartY, a = window.innerWidth - t.offsetWidth - 10, o = window.innerHeight - t.offsetHeight - 10, d = Math.max(10, Math.min(a, i)), u = Math.max(10, Math.min(o, n));
    t.style.left = `${d}px`, t.style.top = `${u}px`, t.style.right = "auto", t.style.bottom = "auto";
  }
  handleMouseUp() {
    var e;
    if (this.isDragging) {
      this.isDragging = !1;
      const t = (e = this.element) == null ? void 0 : e.querySelector(".ht-translator-card");
      t && (t.style.cursor = "default");
    }
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class j {
  constructor() {
    l(this, "element", null);
    this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-addons-panel ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-label", "Painel de Recursos de Acessibilidade"), this.element.style.display = "none", this.render(), document.body.appendChild(this.element), this.attachEvents(), s.subscribe((e) => {
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
                <span style="width: 22px; height: 22px; display: inline-block;">${r.accessibility}</span>
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
              <span style="width: 20px; height: 20px;">${r.close}</span>
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
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${r.libras}</span>
                <span>Tradutor de Libras 3D</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("signTranslator", "Tradutor de Libras", "Avatar 3D em tempo real", r.libras)}
                ${this.renderToolButton("synonymsMeanings", "Dicionário Libras", "Sinais e significados", r.dictionary)}
              </div>
            </div>

            <!-- Category: Font Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${r.fontSize}</span>
                <span>Controle de Fonte</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("fontSize", "Tamanho da Fonte", "3 opções (+0%, +15%, +30%)", r.fontSize)}
                ${this.renderToolButton("textStyle", "Fonte Legível", "Adaptada para dislexia", r.dyslexicFont)}
                ${this.renderToolButton("lineHeight", "Espaço Linhas", "3 opções de entrelinha", r.lineHeight)}
                ${this.renderToolButton("letterSpacing", "Espaço Letras", "3 opções de espaçamento", r.letterSpacing)}
                ${this.renderToolButton("highlightLetters", "Destacar Letras", "Primeira letra colorida", r.highlightLetters)}
              </div>
            </div>

            <!-- Category: Navigation & Reading -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${r.readingGuide}</span>
                <span>Navegação & Leitura</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("pageSpeech", "Leitor de Sites", "Leitura em voz alta (TTS)", r.speech)}
                ${this.renderToolButton("pageStructure", "Estrutura da Página", "Navegação por títulos e seções", r.pageStructure)}
                ${this.renderToolButton("readingGuide", "Guia de Leitura", "Régua horizontal móvel", r.readingGuide)}
                ${this.renderToolButton("readingMask", "Máscara Leitura", "Foco na linha atual", r.readingMask)}
                ${this.renderToolButton("magnifier", "Lupa de Conteúdo", "Lente de aumento no mouse", r.magnifier)}
                ${this.renderToolButton("highlightLinks", "Destacar Links", "Bordas e realce amarelo", r.highlightLinks)}
                ${this.renderToolButton("highlightHeadings", "Destacar Títulos", "Marcações H1 a H6", r.highlightHeadings)}
                ${this.renderToolButton("hideImages", "Ocultar Imagens", "Diminui poluição visual", r.hideImages)}
                ${this.renderToolButton("pauseAnimations", "Pausar Animações", "Congela GIFs e transições", r.pauseAnimations)}
                ${this.renderToolButton("disableSounds", "Parar Sons", "Muta mídias da página", r.disableSounds)}
                ${this.renderToolButton("readerMode", "Modo Leitura", "Texto limpo sem distrações", r.readerMode)}
              </div>
            </div>

            <!-- Category: Color Control -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <span style="width: 16px; height: 16px; display: inline-flex; color: #0070f3;">${r.contrast}</span>
                <span>Controle de Cores</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                ${this.renderToolButton("contrastMode", "Contraste", "Escuro, Claro, Invertido", r.contrast)}
                ${this.renderToolButton("saturationMode", "Saturação", "Monocromático e Níveis", r.saturation)}
                ${this.renderToolButton("colorblindMode", "Modo Daltônico", "Filtros Protanopia / Trit.", r.colorblind)}
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
              <span style="width: 16px; height: 16px;">${r.reset}</span>
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
  renderToolButton(e, t, i, n) {
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
            ${n}
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
      s.setState({ isAddonsOpen: !1 });
    });
    const t = this.element.querySelector(".ht-addons-backdrop");
    t == null || t.addEventListener("click", (a) => {
      a.target === t && s.setState({ isAddonsOpen: !1 });
    });
    const i = this.element.querySelector(".ht-btn-reset-all");
    i == null || i.addEventListener("click", () => {
      s.reset();
    }), this.element.querySelectorAll(".ht-tool-btn").forEach((a) => {
      a.addEventListener("click", () => {
        const o = a.getAttribute("data-tool");
        o && this.handleToolClick(o);
      });
    });
  }
  handleToolClick(e) {
    const t = s.getState();
    switch (e) {
      case "signTranslator":
        s.setState({ isTranslatorOpen: !t.isTranslatorOpen });
        break;
      case "synonymsMeanings":
        s.setState({ isDictionaryOpen: !0 });
        break;
      case "fontSize":
        s.setState({ fontSizeLevel: (t.fontSizeLevel + 1) % 3 });
        break;
      case "textStyle":
        s.setState({ dyslexicFont: !t.dyslexicFont });
        break;
      case "lineHeight":
        s.setState({ lineHeightLevel: (t.lineHeightLevel + 1) % 3 });
        break;
      case "letterSpacing":
        s.setState({ letterSpacingLevel: (t.letterSpacingLevel + 1) % 3 });
        break;
      case "highlightLetters":
        s.setState({ highlightLetters: !t.highlightLetters });
        break;
      case "pageSpeech":
        s.setState({ pageSpeechActive: !t.pageSpeechActive });
        break;
      case "pageStructure":
        s.setState({ isPageStructureOpen: !0 });
        break;
      case "readingGuide":
        s.setState({ readingGuideActive: !t.readingGuideActive });
        break;
      case "readingMask":
        s.setState({ readingMaskActive: !t.readingMaskActive });
        break;
      case "magnifier":
        s.setState({ magnifierActive: !t.magnifierActive });
        break;
      case "highlightLinks":
        s.setState({ highlightLinks: !t.highlightLinks });
        break;
      case "highlightHeadings":
        s.setState({ highlightHeadings: !t.highlightHeadings });
        break;
      case "hideImages":
        s.setState({ hideImages: !t.hideImages });
        break;
      case "pauseAnimations":
        s.setState({ pauseAnimations: !t.pauseAnimations });
        break;
      case "disableSounds":
        s.setState({ disableSounds: !t.disableSounds });
        break;
      case "readerMode":
        s.setState({ readerMode: !t.readerMode });
        break;
      case "contrastMode": {
        const i = ["none", "high-contrast-dark", "high-contrast-light", "invert"], n = i[(i.indexOf(t.contrastMode) + 1) % i.length];
        s.setState({ contrastMode: n });
        break;
      }
      case "saturationMode": {
        const i = ["normal", "monochrome", "low-saturation", "high-saturation"], n = i[(i.indexOf(t.saturationMode) + 1) % i.length];
        s.setState({ saturationMode: n });
        break;
      }
      case "colorblindMode": {
        const i = ["none", "protanopia", "deuteranopia", "tritanopia", "achromatopsia"], n = i[(i.indexOf(t.colorblindMode) + 1) % i.length];
        s.setState({ colorblindMode: n });
        break;
      }
    }
  }
  updateActiveIndicators() {
    if (!this.element) return;
    const e = s.getState();
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
    Object.entries(i).forEach(([a, o]) => {
      var u;
      const d = (u = this.element) == null ? void 0 : u.querySelector(`[data-tool="${a}"]`);
      if (d) {
        const c = d.querySelector(".ht-tool-status-dot"), g = d.querySelector(".ht-tool-icon"), p = d.querySelector(".ht-tool-sub");
        o.active ? (t++, d.style.borderColor = "#0070f3", d.style.background = "#f0f7ff", c && (c.style.background = "#0070f3"), g && (g.style.color = "#0070f3")) : (d.style.borderColor = "#e2e8f0", d.style.background = "#f8fafc", c && (c.style.background = "#cbd5e1"), g && (g.style.color = "#475569")), o.label && p && (p.innerText = `Ativo: ${o.label}`);
      }
    });
    const n = this.element.querySelector(".ht-active-counter-badge");
    n && (n.innerHTML = `${t} ${t === 1 ? "ativo" : "ativos"}`);
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class I {
  constructor(e) {
    l(this, "element", null);
    l(this, "onSignSelected");
    this.onSignSelected = e, this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-dictionary-modal ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-modal", "true"), this.element.setAttribute("aria-label", "Dicionário de Libras"), this.element.style.display = "none", this.render(), document.body.appendChild(this.element), s.subscribe((e) => {
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
                <span style="width:20px;height:20px;display:inline-block;">${r.dictionary}</span>
              </div>
              <h2 style="margin:0;font-size:1.2rem;font-weight:700;color:#1a202c;">Dicionário de Libras</h2>
            </div>
            <button class="ht-dict-close-btn" style="background:none;border:none;cursor:pointer;color:#718096;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;" aria-label="Fechar dicionário">
              <span style="width:20px;height:20px;">${r.close}</span>
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
            <span style="font-size:0.85rem;color:#718096;">Total de termos cadastrados: ${Object.keys(x).length}</span>
            <button class="ht-dict-close-btn2" style="background:#0070f3;color:#ffffff;border:none;padding:8px 16px;border-radius:8px;font-weight:600;font-size:0.88rem;cursor:pointer;">Concluído</button>
          </div>

        </div>
      </div>
    `, this.attachEvents());
  }
  renderList(e = "") {
    const t = Object.keys(x).filter((i) => i.includes(e.toLowerCase()));
    return t.length === 0 ? `
        <div style="text-align:center;padding:32px;color:#a0aec0;">
          <p style="margin:0;font-size:0.95rem;">Nenhum sinal encontrado para "${e}".</p>
          <p style="margin:6px 0 0;font-size:0.85rem;">Tente pesquisar por termos comuns como "acessibilidade", "libras", "olá", "obrigado".</p>
        </div>
      ` : t.map((i) => {
      const n = x[i], a = i.charAt(0).toUpperCase() + i.slice(1);
      return `
        <div class="ht-dict-item" data-term="${i}" style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;background:#ffffff;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;transition:box-shadow 0.2s;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <strong style="font-size:1rem;color:#1a202c;">${a}</strong>
              <span style="font-size:0.75rem;background:#edf2f7;color:#4a5568;padding:2px 8px;border-radius:12px;font-weight:600;">${n.category}</span>
            </div>
            <p style="margin:0 0 6px;font-size:0.88rem;color:#4a5568;line-height:1.4;">${n.definition}</p>
            <p style="margin:0;font-size:0.8rem;color:#718096;font-style:italic;"><strong>Gesto em Libras:</strong> ${n.description}</p>
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
    this.element.querySelectorAll(".ht-dict-close-btn, .ht-dict-close-btn2").forEach((a) => {
      a.addEventListener("click", () => {
        s.setState({ isDictionaryOpen: !1 });
      });
    });
    const t = this.element.querySelector(".ht-modal-backdrop");
    t == null || t.addEventListener("click", (a) => {
      a.target === t && s.setState({ isDictionaryOpen: !1 });
    });
    const i = this.element.querySelector(".ht-dict-search-input"), n = this.element.querySelector(".ht-dict-list");
    i == null || i.addEventListener("input", (a) => {
      const o = a.target.value;
      n && (n.innerHTML = this.renderList(o), this.attachSignButtons());
    }), this.attachSignButtons();
  }
  attachSignButtons() {
    if (!this.element) return;
    this.element.querySelectorAll(".ht-dict-sign-btn").forEach((t) => {
      t.addEventListener("click", () => {
        const i = t.getAttribute("data-term");
        i && (s.setState({ isDictionaryOpen: !1, isTranslatorOpen: !0 }), this.onSignSelected(i));
      });
    });
  }
  destroy() {
    var e;
    (e = this.element) == null || e.remove();
  }
}
class D {
  constructor() {
    l(this, "element", null);
    this.init();
  }
  init() {
    this.element = document.createElement("div"), this.element.className = "ht-widget-root ht-page-structure-modal ht-skip", this.element.setAttribute("role", "dialog"), this.element.setAttribute("aria-modal", "true"), this.element.setAttribute("aria-label", "Estrutura da Página e Navegação por Títulos"), this.element.style.display = "none", document.body.appendChild(this.element), s.subscribe((e) => {
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
      const n = (i.innerText || i.textContent || "").trim().replace(/\s+/g, " ");
      if (!n && !i.getAttribute("aria-label")) return;
      const a = i.tagName.toLowerCase();
      let o = 1, d = n;
      a.startsWith("h") && a.length === 2 ? o = parseInt(a[1], 10) : a === "header" || i.getAttribute("role") === "banner" ? (o = 1, d = d || "Cabeçalho do Site") : a === "nav" || i.getAttribute("role") === "navigation" ? (o = 2, d = d || "Menu de Navegação") : a === "main" || i.getAttribute("role") === "main" ? (o = 1, d = d || "Conteúdo Principal") : a === "footer" && (o = 1, d = d || "Rodapé da Página"), d.length > 80 && (d = d.slice(0, 80) + "..."), t.push({
        element: i,
        tag: a.toUpperCase(),
        level: o,
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
                <span style="width: 20px; height: 20px; display: inline-block;">${r.pageStructure}</span>
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
              <span style="width: 18px; height: 18px;">${r.close}</span>
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
            ` : e.map((a, o) => `
              <button class="ht-structure-item-btn" data-index="${o}" style="
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 14px;
                margin-left: ${(a.level - 1) * 16}px;
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
                ">${a.tag}</span>
                <span style="
                  font-size: 0.88rem;
                  color: #1e293b;
                  font-weight: ${a.level === 1 ? "700" : "500"};
                  line-height: 1.35;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                ">${a.text}</span>
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
      s.setState({ isPageStructureOpen: !1 });
    });
    const i = this.element.querySelector(".ht-structure-backdrop");
    i == null || i.addEventListener("click", (a) => {
      a.target === i && s.setState({ isPageStructureOpen: !1 });
    }), this.element.querySelectorAll(".ht-structure-item-btn").forEach((a) => {
      a.addEventListener("click", () => {
        var d;
        const o = a.getAttribute("data-index");
        if (o !== null) {
          const u = parseInt(o, 10), c = (d = e[u]) == null ? void 0 : d.element;
          if (c) {
            s.setState({ isPageStructureOpen: !1, isAddonsOpen: !1 }), c.scrollIntoView({ behavior: "smooth", block: "center" });
            const g = c.style.transition, p = c.style.outline, f = c.style.outlineOffset;
            c.style.transition = "outline 0.2s ease", c.style.outline = "4px solid #0070f3", c.style.outlineOffset = "4px", c.hasAttribute("tabindex") || c.setAttribute("tabindex", "-1"), c.focus(), setTimeout(() => {
              c.style.outline = p, c.style.outlineOffset = f, c.style.transition = g;
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
class b {
  constructor(e = {}) {
    l(this, "options");
    l(this, "styleManager");
    l(this, "collectorManager");
    l(this, "speechManager");
    l(this, "audioManager");
    l(this, "readingToolsManager");
    l(this, "launcher");
    l(this, "translatorWindow");
    l(this, "addonsPanel");
    l(this, "dictionaryModal");
    l(this, "pageStructureModal");
    this.options = { ...T, ...e }, s.setState({
      avatar: this.options.avatar,
      opacity: this.options.opacity
    }), this.options.highContrast && s.setState({ contrastMode: "high-contrast-dark" }), this.styleManager = new $(), this.speechManager = new O(), this.audioManager = new z(), this.readingToolsManager = new B(), m.init(), this.translatorWindow = new P(), this.addonsPanel = new j(), this.dictionaryModal = new I((t) => {
      this.translate(t);
    }), this.pageStructureModal = new D(), this.collectorManager = new C((t) => {
      this.translate(t);
    }), this.launcher = new q(this.options.side, this.options.align), s.subscribe((t) => {
      this.styleManager.apply(t);
    }), this.styleManager.apply(s.getState()), this.setupKeyboardShortcuts(), console.log("%c[Mahoraga Accessibility Widget]%c Inicializado com sucesso! (REA Re-engineering)", "color: #0070f3; font-weight: bold;", "color: inherit;");
  }
  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        const t = s.getState().isAddonsOpen;
        s.setState({ isAddonsOpen: !t });
      }
      if (e.altKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        const t = s.getState().isTranslatorOpen;
        s.setState({ isTranslatorOpen: !t });
      }
      e.key === "Escape" && s.setState({
        isAddonsOpen: !1,
        isDictionaryOpen: !1,
        isCollectorActive: !1,
        isPageStructureOpen: !1
      });
    });
  }
  openTranslator() {
    s.setState({ isTranslatorOpen: !0 });
  }
  closeTranslator() {
    s.setState({ isTranslatorOpen: !1, isCollectorActive: !1 });
  }
  openAddons() {
    s.setState({ isAddonsOpen: !0 });
  }
  closeAddons() {
    s.setState({ isAddonsOpen: !1 });
  }
  translate(e) {
    this.translatorWindow.translateText(e);
  }
  setAvatar(e) {
    s.setState({ avatar: e }), m.setAvatar(e);
  }
  reset() {
    s.reset();
  }
  destroy() {
    this.styleManager.destroy(), this.collectorManager.destroy(), this.speechManager.stop(), this.audioManager.destroy(), this.readingToolsManager.destroy(), this.launcher.destroy(), this.translatorWindow.destroy(), this.addonsPanel.destroy(), this.dictionaryModal.destroy(), this.pageStructureModal.destroy();
  }
}
const F = b, N = b, R = b;
typeof window < "u" && (window.Mahoraga = b, window.MahoragaWidget = b, window.HT = b, window.HandTalkWidget = b);
export {
  R as HT,
  b as HandTalkWidget,
  N as Mahoraga,
  F as MahoragaWidget,
  b as default
};
