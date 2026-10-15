// STARK INDUSTRIES // CINEMATIC PROLOGUE RUNTIME
// 100% Authentic Stroke-by-Stroke Calligraphy Edition ("Proof That Tony Stark Has a Heart")
// GPU-Accelerated 60FPS Silky Smooth Version

window.startStarkPrologue = function() {
  if (window.self !== window.top || window.location.search.includes('skip_prologue=1')) return;
  if (window.__starkPrologueActive || document.getElementById('stark-prologue-overlay')) return;
  window.__starkPrologueActive = true;

  // 1. Inject CSS if not present
  if (!document.getElementById('stark-prologue-style')) {
    const s = document.createElement('style');
    s.id = 'stark-prologue-style';
    s.textContent = `
#stark-prologue-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background-color: #000002;
  overflow: hidden;
  font-family: var(--f-mono, "JetBrains Mono", monospace);
  color: #00ff66;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.85s ease;
}
#stark-prologue-overlay.prologue-fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Ma+Shan+Zheng&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=ZCOOL+XiaoWei&display=swap');

    :root {
      --f-display: 'Cinzel', 'Cormorant Garamond', 'Times New Roman', Georgia, serif;
      --f-art-zh: 'ZCOOL XiaoWei', serif;
      --f-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --f-mono: 'JetBrains Mono', "Fira Code", monospace;

      --gold-light: #f5eedb;
      --gold-champagne: #d8c39e;
      --cyan-arc: #00f0ff;
      --neon-green: #00ff66;
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      user-select: none;
    }

    html, body {
      background-color: #000002;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: var(--f-mono);
      color: #00ff66;
      position: relative;
    }

    /* Ambient Titan orange + Arc reactor cyan backlights */
    .glow-titan {
      position: fixed;
      width: 1400px;
      height: 900px;
      background: radial-gradient(circle at 70% 45%, rgba(249, 115, 22, 0.22) 0%, rgba(194, 65, 12, 0.08) 45%, transparent 75%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(140px);
      pointer-events: none;
      z-index: 0;
    }

    .glow-arc {
      position: fixed;
      width: 900px;
      height: 700px;
      background: radial-gradient(circle at 30% 55%, rgba(0, 240, 255, 0.1) 0%, rgba(0, 255, 102, 0.05) 40%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(120px);
      pointer-events: none;
      z-index: 0;
    }

    /* =========================================================================
       1. FULLSCREEN CANVAS (铺满全屏，无边框，比例绝对精准)
       ========================================================================= */
    #ascii-canvas {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      display: block;
      z-index: 5;
      cursor: crosshair;
    }

    /* Cinematic CRT Scanlines & Fullscreen Vignette */
    .fullscreen-scrim {
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse at 50% 50%, transparent 62%, rgba(0,0,0,0.85) 100%),
        linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.8) 100%),
        linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.22) 51%);
      background-size: 100% 100%, 100% 100%, 100% 3px;
      pointer-events: none;
      z-index: 10;
    }

    /* =========================================================================
       2. TOP HERO EDITORIAL: 托尼·斯塔克有一颗温暖的心 (全屏悬浮排版)
       ========================================================================= */
    /* hold every intro animation until webfonts are warmed up (no mid-anim font-swap hitch) */
    body:not(.font-go) * { animation-play-state: paused !important; }

    .hero-micro {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 22px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.52em;
      text-indent: 0.52em;
      color: rgba(212, 175, 55, 0.85);
      text-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
      opacity: 0;
      animation: microIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) 4.5s forwards;
    }
    .hero-micro::before,
    .hero-micro::after {
      content: '';
      width: 64px;
      height: 1px;
      position: relative;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7));
    }
    .hero-micro::after { transform: scaleX(-1); }
    .hero-micro span::before,
    .hero-micro span::after {
      content: '◆';
      font-size: 6px;
      line-height: 1;
      color: rgba(212, 175, 55, 0.9);
      text-shadow: 0 0 8px rgba(212, 175, 55, 0.7);
      vertical-align: 2px;
      letter-spacing: 0;
      text-indent: 0;
    }
    .hero-micro span::before { margin-right: 14px; }
    .hero-micro span::after { margin-left: 14px; }
    @keyframes microIn {
      from { opacity: 0; letter-spacing: 0.72em; filter: blur(3px); }
      to   { opacity: 1; letter-spacing: 0.52em; filter: blur(0); }
    }

    .zh-caption {
      margin-top: 14px;
      text-align: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 400;
      letter-spacing: 0.38em;
      text-indent: 0.38em;
      color: rgba(212, 175, 55, 0.62);
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.25);
      opacity: 0;
      animation: microIn 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    /* camera drift: an almost-subconscious slow push-in on the title block */
    @keyframes heroDrift {
      from { transform: translateY(-50%) scale(1); }
      to   { transform: translateY(-50%) scale(1.014); }
    }
    /* cinematic push-in on the portrait once it goes live */
    @keyframes canvasPush {
      from { transform: scale(1); }
      to   { transform: scale(1.045); }
    }

    .hero-editorial-wrap {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      animation: heroDrift 11s ease-out 5.2s forwards;
      left: 0;
      right: 0;
      z-index: 30;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
      padding: 0 20px;
    }

    /* 电影英文原字幕：经典漫威/电影碑文罗马体 (Cinematic Roman Inscription) */
    .quote-en-floating {
      margin-bottom: 0.85rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.28em;
      font-family: var(--f-display);
      font-size: clamp(16px, 2.3vw, 30px);
      font-weight: 500;
      letter-spacing: 0.22em;
      text-indent: 0.22em;
      position: relative;
    }

    .float-word {
      display: inline-block;
      position: relative;
      opacity: 0;
      color: #faf6ee;
      background: linear-gradient(180deg, #ffffff 0%, #f4ede0 28%, #d8c39e 72%, #a88e5e 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 16px rgba(212, 175, 55, 0.22));
      will-change: opacity, transform;
    }
    .fw-quote-start,
    .fw-quote-end {
      font-family: 'Cormorant Garamond', 'Cinzel', serif;
      font-weight: 300;
      opacity: 0.38;
      font-size: 0.85em;
      background: none;
      -webkit-background-clip: border-box;
      background-clip: border-box;
      -webkit-text-fill-color: #d8c39e;
      color: #d8c39e;
      filter: none;
      vertical-align: 0.08em;
      letter-spacing: 0;
      text-indent: 0;
    }
    .fw-tony,
    .fw-stark {
      font-weight: 600;
      background: linear-gradient(180deg, #ffffff 0%, #eefbfd 30%, #a5ecf5 72%, #38bdf8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.45)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.95));
      position: relative;
    }
    .fw-heart {
      font-weight: 600;
      background: linear-gradient(180deg, #ffffff 0%, #fff4db 28%, #fcd34d 70%, #f59e0b 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.55)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.95));
      position: relative;
    }
    .fw-heart::after {
      content: 'Heart';
      text-transform: uppercase;
      position: absolute;
      left: 0; top: 0;
      background: linear-gradient(115deg, transparent 32%, rgba(255, 255, 255, 0.95) 48%, rgba(255, 248, 220, 0.9) 52%, transparent 68%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 260% 100%;
      animation: goldSheen 4.2s cubic-bezier(0.4, 0, 0.2, 1) 3.2s infinite;
      pointer-events: none;
    }
    @keyframes goldSheen {
      0%   { background-position: 130% 0; }
      55%  { background-position: -130% 0; }
      100% { background-position: -130% 0; }
    }

    /* marker-pen overlay: the English line is hand-written first, then the styled title fades in */
    .quote-en-floating {
      position: relative;
    }
    .en-hand {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 96%;
      height: auto;
      overflow: visible;
      pointer-events: none;
      z-index: 2;
      will-change: opacity;
    }
    @keyframes wordSlowHover {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-4px); }
    }
    /* brush-ink handwriting timeline (CSS-driven so it runs identically everywhere):
       --dl is the stroke length, set per-element by JS */
    @keyframes brushWipe {
      from { stroke-dashoffset: var(--dl, 0); }
      to   { stroke-dashoffset: 0px; }
    }
    @keyframes inkCool {
      0%   { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)); }
      40%  { filter: drop-shadow(0 0 14px rgba(212, 175, 55, 0.65)); }
      100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)); }
    }
    @keyframes handFade {
      from { opacity: 1; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.95)) drop-shadow(0 0 12px rgba(212, 175, 55, 0.35)); }
      to   { opacity: 0; filter: blur(2px); }
    }
    @keyframes wordIn {
      0%   { opacity: 0; filter: blur(5px); transform: translateY(6px) scale(1.02); }
      55%  { opacity: 0.85; filter: blur(0.5px); }
      100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
    }

    /* 中文名台词：托尼·斯塔克有一颗温暖的心 */
    .quote-zh-hero {
      font-family: 'Ma Shan Zheng', 'Xingkai SC', 'STXingkai', '华文行楷', 'STKaiti', 'KaiTi', cursive; font-weight: 400;
      font-size: clamp(30px, 4.6vw, 58px);
      letter-spacing: 0.18em;
      line-height: 1.12;
      color: #ffffff;
      text-shadow: 0 1px 0 rgba(140, 100, 20, 0.35), 0 0 30px rgba(255, 255, 255, 0.42), 0 0 68px rgba(212, 175, 55, 0.32), 0 4px 20px rgba(0,0,0,0.9);
      overflow: hidden;
    }
    /* handwriting effect: each char is "written" like a brush stroke —
       lands with a slight pen tilt, flashes hot ink-gold, then cools to white */
    .quote-zh-hero span.zh-ch {
      display: inline-block;
      opacity: 0;
      clip-path: inset(-15% 100% -15% -5%);
      filter: blur(4px);
      animation: zhWrite 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                 zhInk 0.55s ease-out forwards;
      animation-delay: calc(2.1s + var(--i) * 0.17s), calc(2.1s + var(--i) * 0.17s);
    }
    @keyframes zhWrite {
      0%   { opacity: 0; clip-path: inset(-15% 100% -15% -5%); filter: blur(4px); transform: translateY(7px) rotate(var(--tilt, 0deg)) scale(1.08); }
      40%  { opacity: 1; filter: blur(0); }
      70%  { transform: translateY(-1px) rotate(calc(var(--tilt, 0deg) * -0.4)) scale(0.995); }
      100% { opacity: 1; clip-path: inset(-15% -5% -15% -5%); filter: blur(0); transform: translateY(0) rotate(0) scale(1); }
    }
    /* fresh-ink glow: written char starts molten gold and cools to white */
    @keyframes zhInk {
      0%   { color: #fbbf24; text-shadow: 0 0 22px rgba(251, 191, 36, 1), 0 0 55px rgba(212, 175, 55, 0.8), 0 0 90px rgba(249, 115, 22, 0.45); }
      45%  { color: #fef3b0; text-shadow: 0 0 26px rgba(254, 240, 138, 0.9), 0 0 60px rgba(212, 175, 55, 0.5), 0 0 85px rgba(249, 115, 22, 0.3); }
      100% { color: #ffffff; text-shadow: 0 0 35px rgba(255, 255, 255, 0.5), 0 0 70px rgba(212, 175, 55, 0.3), 0 4px 20px rgba(0,0,0,0.9); }
    }
    /* the final 心 keeps a slow warm heartbeat glow — "has a HEART" */
    .quote-zh-hero span.zh-heart {
      animation: zhWrite 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                 zhInk 0.55s ease-out forwards,
                 zhHeartbeat 2.2s ease-in-out calc(2.1s + 12 * 0.17s + 0.6s) infinite;
      animation-delay: calc(2.1s + 12 * 0.17s), calc(2.1s + 12 * 0.17s), 0s;
    }
    @keyframes zhHeartbeat {
      0%, 100% { color: #ffffff; text-shadow: 0 0 35px rgba(255,255,255,0.5), 0 0 70px rgba(212,175,55,0.3), 0 4px 20px rgba(0,0,0,0.9); }
      12%      { color: #fef08a; text-shadow: 0 0 22px rgba(254,240,138,0.95), 0 0 55px rgba(212,175,55,0.7), 0 0 90px rgba(249,115,22,0.4); }
      30%      { color: #ffffff; text-shadow: 0 0 35px rgba(255,255,255,0.5), 0 0 70px rgba(212,175,55,0.3), 0 4px 20px rgba(0,0,0,0.9); }
      /* double-beat like a real ECG pulse */
      42%      { color: #fef3b0; text-shadow: 0 0 18px rgba(254,240,138,0.8), 0 0 45px rgba(212,175,55,0.55), 0 0 80px rgba(249,115,22,0.3); }
      58%      { color: #ffffff; text-shadow: 0 0 35px rgba(255,255,255,0.5), 0 0 70px rgba(212,175,55,0.3), 0 4px 20px rgba(0,0,0,0.9); }
    }
    /* opening quote mark: also written in, right before the first char */
    .quote-zh-hero > span:first-child {
      display: inline-block;
      opacity: 0;
      clip-path: inset(-15% 100% -15% -5%);
      animation: zhWrite 0.3s ease-out 1.35s forwards;
    }
    /* brush underline: a golden ink stroke draws itself once all chars are written */
    .zh-stroke {
      width: min(46vw, 560px);
      height: 2px;
      margin: 0.85rem auto 0;
      background: linear-gradient(90deg, transparent, rgba(254,240,138,0.9) 18%, rgba(212,175,55,1) 50%, rgba(254,240,138,0.9) 82%, transparent);
      box-shadow: 0 0 14px rgba(254,240,138,0.55), 0 0 34px rgba(212,175,55,0.3);
      transform: scaleX(0);
      opacity: 0;
      animation: zhLine 1.1s cubic-bezier(0.22, 1, 0.36, 1) calc(2.1s + 13 * 0.17s + 0.45s) forwards;
      pointer-events: none;
    }
    @keyframes zhLine {
      0%   { transform: scaleX(0); opacity: 0; }
      12%  { opacity: 1; }
      70%  { transform: scaleX(1); }
      100% { transform: scaleX(1); opacity: 0.85; }
    }
    /* handwritten SVG glyphs (stroke-by-stroke pen writing) */
    .zh-glyph {
      width: 1.14em;
      height: 1.14em;
      display: inline-block;
      vertical-align: -0.16em;
      overflow: visible;
      filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.28)) drop-shadow(0 0 30px rgba(212, 175, 55, 0.18));
    }
    /* Act 3 shockwave: triggered by JS via class toggle */
    .quote-zh-hero.zh-shake {
      animation: zhShake 0.15s linear;
    }
    @keyframes zhShake {
      0% { transform: translate(0, 0); }
      25% { transform: translate(2px, -2px); }
      50% { transform: translate(-2px, 1px); }
      75% { transform: translate(1px, 2px); }
      100% { transform: translate(0, 0); }
    }
    /* the snap: titles crumble away together with the portrait */
    .hero-editorial-wrap.crumble {
      animation: crumbleAway 1.5s cubic-bezier(0.4, 0, 0.8, 0.4) forwards;
    }
    @keyframes crumbleAway {
      0%   { opacity: 1; filter: blur(0); transform: translateY(-50%); }
      30%  { opacity: 0.75; filter: blur(1.5px); transform: translateY(calc(-50% - 3px)); }
      100% { opacity: 0; filter: blur(9px); transform: translateY(calc(-50% - 16px)); }
    }

    /* cinematic film-grain: subtle animated noise over everything */
    #filmGrain {
      position: fixed;
      inset: -60px;
      pointer-events: none;
      z-index: 60;
      opacity: 0.055;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      animation: grainShift 0.6s steps(4) infinite;
      animation-play-state: paused;
      mix-blend-mode: screen;
    }
    @keyframes grainShift {
      0%   { transform: translate(0, 0); }
      25%  { transform: translate(-22px, 14px); }
      50%  { transform: translate(16px, -20px); }
      75%  { transform: translate(-12px, -10px); }
      100% { transform: translate(20px, 18px); }
    }
    /* cinema vignette: darkens the edges so the portrait breathes in the center */
    #cinemaVignette {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 55;
      background:
        radial-gradient(ellipse 118% 92% at 50% 46%, transparent 52%, rgba(0,0,2,0.42) 82%, rgba(0,0,2,0.78) 100%),
        linear-gradient(180deg, rgba(0,0,2,0.5) 0%, transparent 12%, transparent 88%, rgba(0,0,2,0.55) 100%);
    }

    /* exit transition: whole page fades to black then redirects to the 3D showcase */
    #exitOverlay {
      position: fixed;
      inset: 0;
      background: #000;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.8s ease-in;
    }
    #exitOverlay.exit-active { opacity: 1; }
    /* "click to skip" hint: quiet, bottom-right corner */
    #skipHint {
      position: fixed;
      right: 18px;
      bottom: 38px;
      z-index: 9998;
      font-family: var(--f-mono), monospace;
      font-size: 11px;
      letter-spacing: 0.22em;
      color: rgba(0, 255, 102, 0.38);
      opacity: 0;
      animation: skipHintIn 0.8s ease 1.2s forwards;
      pointer-events: none;
    }
    @keyframes skipHintIn { to { opacity: 1; } }

    /* boot-progress hairline at the very bottom of the screen */
    #bootProgress {
      position: fixed;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 0%;
      background: linear-gradient(90deg, rgba(0,255,102,0.4), rgba(0,255,102,0.9));
      box-shadow: 0 0 10px rgba(0,255,102,0.6);
      z-index: 9998;
      transition: width 0.3s linear;
    }

    /* =========================================================================
       3. TOP & BOTTOM HUD BARS (全屏原版 HUD 元数据)
       ========================================================================= */
    .hud-bottom-bar #hud-coords { color: rgba(0, 255, 102, 0.85); }

    .hud-bottom-bar {
      position: fixed;
      bottom: 20px;
      left: 40px;
      right: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: rgba(249, 115, 22, 0.85);
      letter-spacing: 1.4px;
      pointer-events: none;
      z-index: 25;
      text-shadow: 0 0 8px rgba(249, 115, 22, 0.5);
    }
  
`;
    document.head.appendChild(s);
  }

  // 2. Create Overlay and inject HTML
  const overlay = document.createElement('div');
  overlay.id = 'stark-prologue-overlay';
  overlay.innerHTML = `<div class="glow-titan"></div>
  <div class="glow-arc"></div>
  <div id="cinemaVignette"></div>
  <div id="filmGrain"></div>

  <!-- Fullscreen ASCII Matrix Canvas (铺满全屏，无边框) -->
  <canvas id="ascii-canvas"></canvas>
  <div class="fullscreen-scrim"></div>

  <!-- Top Hero Editorial Section (名台词) -->
  <header class="hero-editorial-wrap">
    <!-- archive micro-label: engraved, hairline-flanked, fades in after the ink settles -->
    <div class="hero-micro"><span>TONY&nbsp;STARK&nbsp;&nbsp;&middot;&nbsp;&nbsp;ARCHIVE&nbsp;MK-85</span></div>
    <!-- 电影英文原文字幕：逐词散焦慢速飘出 (Floating Words) -->
    <div class="quote-en-floating">
      <span class="float-word fw-quote-start">“</span>
      <span class="float-word fw-proof">Proof</span>
      <span class="float-word fw-that">That</span>
      <span class="float-word fw-tony">Tony</span>
      <span class="float-word fw-stark">Stark</span>
      <span class="float-word fw-has">Has</span>
      <span class="float-word fw-a">a</span>
      <span class="float-word fw-heart">Heart</span>
      <span class="float-word fw-quote-end">”</span>
    </div>

    <!-- 中文名台词：托尼·斯塔克有一颗温暖的心（handwriting: char-by-char via --i stroke index) -->
    <h1 class="quote-zh-hero" id="zhHero"><span>“&nbsp;</span></h1>
  </header>

  <!-- Bottom HUD Status -->
  <div class="hud-bottom-bar">
    <span id="hud-coords">SYS.CORE [160x80] • MEM: 0x7FFF8A4D</span>
    <span>ARC_V8.5 // "PROOF THAT TONY STARK HAS A HEART"</span>
  </div>`;
  document.body.appendChild(overlay);

  try {

    const IMAGE_SRC = "data:image/jpeg;base64,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";
    const DENSITY_CHARS = " .`-_':,;!~+<>/i1tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    const CODE_TOKENS = ["0","1","<",">","/","{","}","[","]","(",")","=","+","-","*","&","|","!","?","#","$","%","@","^","~",";",":","0x","FF","4A","8F","3A","C0","fn","let","var","ptr","asm","sys","int","hex","CPU","RAM","ACK","SYN","A","R","C","3","0","0","0","I","R","O","N","M","A","N","日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ"];
    const CHAR_COUNT = DENSITY_CHARS.length;
    const TOKEN_COUNT = CODE_TOKENS.length;

    const canvas = document.getElementById('ascii-canvas');
    const ctx = canvas.getContext('2d');
    const hudCoords = document.getElementById('hud-coords');

    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

    // High fidelity 160 columns x 80 rows
    // ===== font warm-up: preload every webfont used by the intro and hold the whole
    // timeline until they are ready — prevents a mid-animation font swap / hitch =====
    let timelineGo = false;
    (function warmFonts() {
      const specs = ['400 16px "JetBrains Mono"', '700 16px "JetBrains Mono"',
                     '400 16px "Ma Shan Zheng"', '500 16px "Cinzel"', '600 16px "Cinzel"', '400 16px "Cormorant Garamond"'];
      const ping = '\u6258\u5c3c\u65af\u5854\u514b Proof';
      let fired = false;
      const go = function () {
        if (fired) return;
        fired = true;
        timelineGo = true;
        document.body.classList.add('font-go');
      };
      try {
        specs.forEach(function (s) { document.fonts.load(s, ping); });
        Promise.all(specs.map(function (s) { return document.fonts.load(s, ping); })).then(go, go);
      } catch (e) { go(); }
      setTimeout(go, 1500);   // never let a slow font network hold the boot hostage
    })();

    const COLS = 160;
    const ROWS = 80;

    let img = new Image();
    let imgPixels = null;
    let charGrid = [];

    // ===== Three-Act intro state machine =====
    // ACT1_TITLE: 0s ~ 5.2s   -> canvas stays dark (pure void, calligraphy & title sequence unfolds)
    // ACT2_BUILD: 5.2s ~ 6.0s -> column-sweep code materialization ONLY after text completely finishes
    // ACT2_COLOR: 6.0s ~ 6.5s -> cold green settles into warm true colors
    // ACT3_GLITCH: 7.0s ~ 7.6s -> one-shot system collapse
    // LIVE: normal loop, then the snap (DUST) crumbles it all to drifting ash
    // EXIT: after collapse, fade to black and redirect to the 3D showcase (intro = boot sequence)
    const ACT1_START = 0;
    const ACT2_BUILD_START = 5200;   // column sweep begins ONLY AFTER all text and underline are complete!
    const SWEEP_DURATION = 750;      // 160 cols over ~0.75s — smooth, confident sweep
    const COLOR_SETTLE_DURATION = 450;
    const ACT3_START = 7000;         // let portrait breathe after settling
    const ACT3_SLICE = 150, ACT3_SWAP = 200, ACT3_FADE = 200;  // fast collapse: 0.55s total
    const ACT3_END = ACT3_START + ACT3_SLICE + ACT3_SWAP + ACT3_FADE; // 7550
    // ===== Act 4: the snap — portrait crumbles to ash and drifts away =====
    const DUST_START = ACT3_END + 900;         // 8450: let portrait breathe before snap
    const DUST_DURATION = 2200;                // ash drift duration
    const DUST_END = DUST_START + DUST_DURATION; // 10650
    let startTime = null;
    // build true handwriting: every char is drawn stroke-by-stroke along its real
    // pen path (hanzi-writer stroke medians), like ink flowing from a brush
    const HANZI_MEDIANS = {"\u6258":[[[131,496],[371,555],[427,559]],[[293,802],[341,762],[332,96],[198,87]],[[65,188],[255,296],[382,384]],[[770,662],[633,608],[496,520],[463,503]],[[409,340],[771,420],[839,421]],[[534,524],[568,499],[575,139],[605,92],[730,50],[870,69],[928,260]]],"\u5c3c":[[[387,740],[553,757],[672,773],[660,649],[630,630]],[[365,549],[620,602],[691,595]],[[305,761],[346,696],[316,420],[256,250],[106,73],[54,46]],[[684,458],[701,412],[503,289],[494,276]],[[437,475],[472,426],[462,196],[487,95],[585,48],[799,53],[865,81],[874,258]]],"\u65af":[[[134,601],[238,607],[516,661]],[[215,741],[256,647],[238,314]],[[392,813],[438,770],[418,360],[406,349]],[[281,501],[317,522],[369,523]],[[280,402],[348,428],[369,423]],[[47,263],[119,255],[516,332]],[[290,203],[222,149],[106,54]],[[376,247],[433,181]],[[751,783],[710,682],[631,619]],[[554,635],[597,581],[579,315],[528,197],[425,100]],[[631,483],[654,488],[893,532],[939,521]],[[728,481],[767,-41]]],"\u5854":[[[111,502],[303,547],[350,550]],[[207,775],[256,723],[249,359],[230,332]],[[67,237],[359,385]],[[359,648],[758,693],[875,682]],[[452,766],[513,571]],[[678,826],[713,783],[639,560]],[[606,537],[485,398],[335,252],[261,206]],[[598,496],[656,435],[813,327],[985,304]],[[464,302],[528,298],[687,327]],[[406,190],[440,153],[476,-18]],[[459,191],[605,205],[691,221],[700,96],[678,82]],[[495,12],[668,52],[729,42]]],"\u514b":[[[264,632],[637,682],[721,677]],[[452,840],[451,533],[431,512]],[[263,489],[307,438],[339,295]],[[318,489],[441,490],[598,514],[602,400],[564,372]],[[357,305],[565,345],[646,339]],[[366,266],[358,175],[240,58],[154,16]],[[490,313],[535,269],[531,65],[602,6],[766,-5],[898,29],[900,194]]],"\u6709":[[[159,614],[502,652],[883,663]],[[470,842],[484,745],[386,497],[251,324],[83,193]],[[412,482],[420,419],[397,163],[367,16]],[[436,484],[484,478],[656,500],[671,314],[677,34],[628,10],[550,48]],[[439,330],[548,361],[595,357]],[[430,204],[482,223],[598,226]]],"\u4e00":[[[121,393],[417,402],[920,401]]],"\u9897":[[[178,715],[252,478]],[[231,718],[425,742],[486,733],[473,565],[463,505]],[[272,599],[429,624]],[[267,492],[425,536]],[[85,361],[156,355],[514,412]],[[332,705],[356,651],[342,32]],[[322,363],[303,318],[224,221],[90,118]],[[408,322],[495,244]],[[569,718],[651,716],[856,769],[913,771]],[[727,684],[699,673],[652,584]],[[551,585],[584,525],[572,263],[575,220]],[[603,569],[662,567],[801,595],[825,454],[819,224]],[[652,491],[697,457],[662,175],[587,76],[478,30]],[[745,187],[872,49],[880,15]]],"\u6e29":[[[206,763],[312,675]],[[114,568],[224,486]],[[166,52],[150,138],[289,407]],[[398,715],[432,676],[476,451]],[[455,707],[658,736],[717,728],[707,564],[687,476]],[[483,582],[565,607],[635,607]],[[499,477],[650,511]],[[359,344],[393,302],[440,125]],[[405,342],[687,377],[763,378],[794,339],[732,159]],[[524,329],[531,263],[533,135]],[[625,350],[657,312],[617,147]],[[290,96],[566,116],[857,133],[915,115]]],"\u6696":[[[127,696],[162,603],[143,219],[149,150]],[[181,683],[283,700],[321,676],[319,232],[312,156]],[[180,440],[223,460],[268,457]],[[178,190],[250,211],[279,225]],[[749,779],[615,749],[469,698]],[[438,650],[502,593],[511,568]],[[567,673],[616,608]],[[781,733],[801,693],[699,613],[696,605]],[[460,495],[578,501],[761,541]],[[388,375],[466,376],[807,431],[864,419]],[[536,469],[558,436],[469,226],[373,94],[279,19]],[[525,281],[693,314],[695,221],[641,121],[561,57],[413,18]],[[499,224],[538,212],[786,23],[966,10]]],"\u7684":[[[278,780],[314,753],[225,565],[212,543],[196,533]],[[135,540],[174,485],[196,166]],[[188,518],[356,552],[400,520],[382,213],[369,130]],[[208,364],[291,383],[325,382]],[[215,177],[292,202],[323,214]],[[630,839],[672,790],[613,651],[470,444]],[[577,537],[805,568],[827,499],[801,171],[753,58],[621,94],[604,107]],[[517,386],[619,279]]],"\u5fc3":[[[185,462],[133,236]],[[306,473],[369,327],[429,244],[538,193],[693,187],[784,234],[691,393]],[[425,667],[542,534]],[[761,607],[886,518],[915,457]]]};
    const HANZI_ORDER = '托尼·斯塔克有一颗温暖的心';
    (function buildZhHandwriting() {
      const zh = document.getElementById('zhHero');
      if (!zh) return;
      const svgNS = 'http://www.w3.org/2000/svg';
      const T0 = 1.35;         // writing flows right as English handwriting flows to completion
      const CHAR_GAP = 0.025;  // breath between chars
      const OVERLAP = 0.76;    // next stroke starts while previous is still flowing (cursive)
      let t = T0;
      let heartSvg = null;
    
      for (const ch of HANZI_ORDER) {
        if (ch === '·') {
          const s = document.createElement('span');
          s.textContent = '·';
          s.style.cssText = 'display:inline-block;opacity:0;clip-path:inset(-15% 100% -15% -5%);animation:zhWrite 0.25s ease-out forwards;animation-delay:' + t.toFixed(2) + 's';
          zh.appendChild(s);
          t += 0.12;
          continue;
        }
        const medians = HANZI_MEDIANS[ch];
        if (!medians) { t += CHAR_GAP; continue; }
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 1024 1024');
        svg.setAttribute('class', 'zh-glyph');
        const g = document.createElementNS(svgNS, 'g');
        g.setAttribute('transform', 'translate(0,900) scale(1,-1)');
        svg.appendChild(g);
        zh.appendChild(svg);
        if (ch === '心') heartSvg = svg;
    
        let start = t;
        for (const pts of medians) {
          const d = 'M' + pts.map(function(p){ return p[0] + ' ' + p[1]; }).join('L');
          const jitter = 0.88 + 0.24 * (((pts[0][0] * 7 + pts[0][1] * 13) % 10) / 10);
          const rr = brushRibbonPath(pts, 90 * jitter);
          const dur = Math.max(0.020, Math.min(0.035, pts.length * 0.008));
          brushStroke(g, d, rr, { start: start, dur: dur, color: 'url(#titaniumGoldInk)', inkCool: true });
          start += dur * OVERLAP;
        }
        t = start + CHAR_GAP;
      }
    
      // the final 心 keeps a warm heartbeat glow — "has a HEART"
      if (heartSvg) {
        heartSvg.animate([
          { filter: 'drop-shadow(0 0 3px rgba(254,240,138,0.25))' },
          { filter: 'drop-shadow(0 0 10px rgba(254,240,138,0.95)) drop-shadow(0 0 28px rgba(249,115,22,0.5))' },
          { filter: 'drop-shadow(0 0 3px rgba(254,240,138,0.25))' },
          { filter: 'drop-shadow(0 0 7px rgba(254,240,138,0.7))' },
          { filter: 'drop-shadow(0 0 3px rgba(254,240,138,0.25))' }
        ], { duration: 2200, delay: (t + 0.4) * 1000, iterations: Infinity });
      }
    
      // closing quote mark: written in right after the last char
      const tail = document.createElement('span');
      tail.textContent = ' ”';
      tail.style.cssText = 'display:inline-block;opacity:0;clip-path:inset(-15% 100% -15% -5%);animation:zhWrite 0.3s ease-out forwards;animation-delay:' + t.toFixed(2) + 's';
      zh.appendChild(tail);
    
      // brush underline: draws itself once all strokes are done
      const line = document.createElement('div');
      line.className = 'zh-stroke';
      line.style.animationDelay = (t + 0.15) + 's';
      zh.appendChild(line);

      // gold micro-caption under the zh line — museum-plaque typography
      const cap = document.createElement('div');
      cap.className = 'zh-caption';
      cap.textContent = 'PROOF THAT TONY STARK HAS A HEART — MK-85 ARCHIVE';
      cap.style.animationDelay = (t + 0.45) + 's';
      zh.appendChild(cap);
    })();
    // ===== shared brush-ink renderer =====
    // A stroke is built as a filled ribbon whose width follows a pen-pressure profile
    // (tapers at both ends like a real marker), then revealed along its own
    // centerline by a sweeping wipe mask — so ink appears exactly where the pen
    // tip would be laying it down.
    function brushRibbonPath(pts, baseW) {
      const P = pts, N = P.length, samp = [];
      for (let i = 0; i < N - 1; i++) {
        const p0 = P[i > 0 ? i - 1 : 0], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2 < N ? i + 2 : N - 1];
        const steps = Math.max(2, Math.min(14, Math.round(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / 6)));
        for (let s = 0; s < steps; s++) {
          const u = s / steps, u2 = u * u, u3 = u2 * u;
          samp.push([
            0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
            0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3)
          ]);
        }
      }
      samp.push([P[N - 1][0], P[N - 1][1]]);
      const arc = [0]; let L = 0;
      for (let i = 1; i < samp.length; i++) {
        L += Math.hypot(samp[i][0] - samp[i - 1][0], samp[i][1] - samp[i - 1][1]);
        arc.push(L);
      }
      let maxW = 0;
      const W = samp.map(function(_, i) {
        const tt = L > 0 ? arc[i] / L : 0;
        let w = 1;
        if (tt < 0.16) w = 0.42 + 0.58 * (tt / 0.16);
        else if (tt > 0.84) w = 1 - 0.42 * ((tt - 0.84) / 0.16);
        const ww = baseW * w; if (ww > maxW) maxW = ww; return ww;
      });
      const left = [], right = [];
      for (let i = 0; i < samp.length; i++) {
        const a = samp[i > 0 ? i - 1 : 0], b = samp[i + 1 < samp.length ? i + 1 : samp.length - 1];
        let dx = b[0] - a[0], dy = b[1] - a[1];
        const dl = Math.hypot(dx, dy) || 1; dx /= dl; dy /= dl;
        left.push([samp[i][0] - dy * W[i] / 2, samp[i][1] + dx * W[i] / 2]);
        right.push([samp[i][0] + dy * W[i] / 2, samp[i][1] - dx * W[i] / 2]);
      }
      let d = 'M' + left[0][0].toFixed(1) + ' ' + left[0][1].toFixed(1);
      for (let i = 1; i < left.length; i++) d += 'L' + left[i][0].toFixed(1) + ' ' + left[i][1].toFixed(1);
      for (let i = right.length - 1; i >= 0; i--) d += 'L' + right[i][0].toFixed(1) + ' ' + right[i][1].toFixed(1);
      return { d: d + 'Z', len: L, maxW: maxW };
    }
    function brushStroke(parent, dCenter, ribbon, opts) {
      const svg = parent.ownerSVGElement || parent;
      const svgNS = 'http://www.w3.org/2000/svg';
      let defs = svg.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS(svgNS, 'defs');
        svg.insertBefore(defs, svg.firstChild);
      }
      if (!defs.querySelector('#titaniumGoldInk')) {
        const gGold = document.createElementNS(svgNS, 'linearGradient');
        gGold.setAttribute('id', 'titaniumGoldInk');
        gGold.setAttribute('x1', '0%'); gGold.setAttribute('y1', '0%');
        gGold.setAttribute('x2', '100%'); gGold.setAttribute('y2', '100%');
        gGold.innerHTML = '<stop offset="0%" stop-color="#ffffff"/><stop offset="28%" stop-color="#f5eedb"/><stop offset="70%" stop-color="#d8c39e"/><stop offset="100%" stop-color="#a88e5e"/>';
        defs.appendChild(gGold);

        const gArc = document.createElementNS(svgNS, 'linearGradient');
        gArc.setAttribute('id', 'arcCyanInk');
        gArc.setAttribute('x1', '0%'); gArc.setAttribute('y1', '0%');
        gArc.setAttribute('x2', '100%'); gArc.setAttribute('y2', '100%');
        gArc.innerHTML = '<stop offset="0%" stop-color="#ffffff"/><stop offset="30%" stop-color="#eefbfd"/><stop offset="72%" stop-color="#a5ecf5"/><stop offset="100%" stop-color="#38bdf8"/>';
        defs.appendChild(gArc);

        const gHeart = document.createElementNS(svgNS, 'linearGradient');
        gHeart.setAttribute('id', 'warmHeartInk');
        gHeart.setAttribute('x1', '0%'); gHeart.setAttribute('y1', '0%');
        gHeart.setAttribute('x2', '100%'); gHeart.setAttribute('y2', '100%');
        gHeart.innerHTML = '<stop offset="0%" stop-color="#ffffff"/><stop offset="28%" stop-color="#fff4db"/><stop offset="70%" stop-color="#fcd34d"/><stop offset="100%" stop-color="#f59e0b"/>';
        defs.appendChild(gHeart);
      }

      const mid = 'brushM' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      const mk = document.createElementNS(svgNS, 'mask');
      mk.setAttribute('id', mid);
      mk.setAttribute('maskUnits', 'userSpaceOnUse');
      mk.setAttribute('x', '-800'); mk.setAttribute('y', '-800');
      mk.setAttribute('width', '3200'); mk.setAttribute('height', '3200');
      const wipe = document.createElementNS(svgNS, 'path');
      wipe.setAttribute('d', dCenter);
      wipe.setAttribute('fill', 'none');
      wipe.setAttribute('stroke', '#fff');
      wipe.setAttribute('stroke-width', (ribbon.maxW * 2.5).toFixed(1));
      wipe.setAttribute('stroke-linecap', 'round');
      wipe.setAttribute('stroke-linejoin', 'round');
      mk.appendChild(wipe);
      defs.appendChild(mk);

      const ink = document.createElementNS(svgNS, 'path');
      ink.setAttribute('d', ribbon.d);
      ink.setAttribute('fill', opts.color || 'url(#titaniumGoldInk)');
      ink.setAttribute('mask', 'url(#' + mid + ')');
      parent.appendChild(ink);

      const L = ribbon.len;
      wipe.style.strokeDasharray = L;
      wipe.style.strokeDashoffset = L;
      wipe.style.setProperty('--dl', L);
      wipe.style.animation = 'brushWipe ' + opts.dur + 's cubic-bezier(0.45,0,0.3,1) ' + opts.start + 's forwards';
      if (opts.inkCool) {
        ink.style.animation = 'inkCool 0.9s ease-out ' + opts.start + 's forwards';
      }
      return ink;
    }

    // ===== English title: high-end signature calligraphy stroke-by-stroke drawing =====
    // Glyphs proportioned with luxury calligraphic curves
    const EN_BRUSH = {
      '\u201c': { adv: 20, s: [[[8, 16], [4, 28]], [[18, 14], [14, 26]]] },
      '\u201d': { adv: 20, s: [[[4, 16], [8, 28]], [[14, 14], [18, 26]]] },
      'P': { adv: 54, s: [[[14, 8], [14, 72]], [[14, 10], [36, 11], [46, 20], [42, 36], [14, 38]]] },
      'r': { adv: 34, s: [[[10, 36], [9, 72]], [[9, 42], [18, 33], [28, 35]]] },
      'o': { adv: 42, s: [[[26, 35], [14, 37], [8, 50], [14, 66], [26, 72], [38, 65], [42, 51], [34, 36], [24, 35]]] },
      'f': { adv: 32, s: [[[34, 12], [24, 8], [18, 18], [15, 36], [13, 76]], [[5, 36], [28, 34]]] },
      'T': { adv: 52, s: [[[4, 8], [26, 8], [48, 8]], [[26, 8], [26, 72]]] },
      'h': { adv: 42, s: [[[10, 10], [10, 72]], [[10, 42], [20, 34], [32, 40], [32, 54], [32, 72]]] },
      'a': { adv: 42, s: [[[30, 44], [22, 36], [10, 42], [8, 55], [17, 65], [28, 62], [31, 48], [28, 39]], [[30, 36], [30, 56], [28, 72]]] },
      't': { adv: 30, s: [[[16, 14], [16, 36], [16, 60], [20, 70], [28, 70]], [[4, 34], [28, 34]]] },
      'n': { adv: 42, s: [[[10, 36], [10, 72]], [[10, 42], [20, 34], [32, 40], [32, 72]]] },
      'y': { adv: 42, s: [[[10, 36], [10, 56], [18, 68], [28, 64], [32, 50], [32, 36]], [[32, 50], [28, 72], [20, 88], [10, 92]]] },
      'S': { adv: 46, s: [[[38, 12], [26, 8], [14, 12], [10, 22], [18, 32], [32, 40], [38, 50], [34, 62], [22, 70], [8, 64]]] },
      'k': { adv: 40, s: [[[10, 10], [10, 72]], [[30, 36], [12, 52]], [[15, 47], [30, 72]]] },
      'H': { adv: 50, s: [[[10, 8], [10, 72]], [[40, 8], [40, 72]], [[10, 38], [40, 38]]] },
      'e': { adv: 42, s: [[[34, 52], [10, 52], [8, 42], [18, 35], [28, 35], [36, 42], [34, 60], [22, 70], [10, 68]]] },
      's': { adv: 36, s: [[[28, 38], [16, 34], [8, 42], [12, 50], [24, 56], [28, 64], [18, 70], [8, 66]]] }
    };

    (function buildEnHandwriting() {
      const host = document.querySelector('.quote-en-floating');
      if (!host) return;
      const svgNS = 'http://www.w3.org/2000/svg';
      const WORDS = [
        { text: '\u201c', type: 'quote', pad: 8 },
        { text: 'Proof', type: 'normal', pad: 20 },
        { text: 'That', type: 'normal', pad: 20 },
        { text: 'Tony', type: 'tony', pad: 22 },
        { text: 'Stark', type: 'stark', pad: 22 },
        { text: 'Has', type: 'normal', pad: 18 },
        { text: 'a', type: 'normal', pad: 18 },
        { text: 'Heart', type: 'heart', pad: 8 },
        { text: '\u201d', type: 'quote', pad: 0 }
      ];

      const seq = [];
      let x = 0;
      for (const w of WORDS) {
        for (const ch of w.text) {
          const g = EN_BRUSH[ch];
          if (!g) continue;
          for (const s of g.s) {
            const pts = s.map(function(p) { return [p[0] + x, p[1] + 12]; });
            seq.push({
              d: 'M' + pts.map(function(p) { return p[0] + ' ' + p[1]; }).join('L'),
              rr: brushRibbonPath(pts, 4.0),
              type: w.type
            });
          }
          x += g.adv;
        }
        x += w.pad;
      }

      const totalLen = seq.reduce(function(a, st) { return a + st.rr.len; }, 0);
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'en-hand');
      svg.setAttribute('viewBox', '0 0 ' + (x + 10) + ' 120');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      host.appendChild(svg);

      const WORD0 = 0.35;
      const GOAL = 1.30;
      const OVERLAP = 0.65;
      const k = GOAL / Math.max(1, totalLen);
      let t = WORD0;

      for (const st of seq) {
        let color = 'url(#titaniumGoldInk)';
        if (st.type === 'tony' || st.type === 'stark') color = 'url(#arcCyanInk)';
        else if (st.type === 'heart') color = 'url(#warmHeartInk)';

        const dur = Math.max(0.038, Math.min(0.24, st.rr.len * k));
        brushStroke(svg, st.d, st.rr, { start: t, dur: dur, color: color });
        t += dur * OVERLAP;
      }

      // Hide static words initially and smoothly reveal when handwriting completes
      const words = Array.from(host.querySelectorAll('.float-word'));
      words.forEach(function(w) { w.style.opacity = '0'; });
      const done = t + 0.08;
      svg.style.animation = 'handFade 0.65s cubic-bezier(0.16, 1, 0.3, 1) ' + done.toFixed(2) + 's forwards';
      const revealAt = (done - 0.12).toFixed(2);
      words.forEach(function(w) {
        w.style.animation = 'wordIn 0.70s cubic-bezier(0.16, 1, 0.3, 1) ' + revealAt + 's forwards, wordSlowHover 8s ease-in-out ' + (done + 0.5).toFixed(2) + 's infinite alternate';
      });
    })();

    let canvasPushed = false;
    let act3Fired = false;
    // Thanos-snap dust state
    let dustFired = false;
    let dustDelay = null;      // per-cell dissolve delay (normalized 0..0.8)
    let ashSpawned = null;     // per-cell particle spawn flag
    let ashParticles = [];
    let snapFlash = 0;
    let snapJitter = 0;
    let lastFrameTime = 0;

    function initDust() {
      if (dustDelay) return;
      dustDelay = new Float32Array(COLS * ROWS);
      ashSpawned = new Uint8Array(COLS * ROWS);
      const ox = COLS * 0.66, oy = ROWS * 0.42;   // arc reactor: the snap spreads from here
      let maxD = 0;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const h1 = h - Math.floor(h);
          const blotch = 0.5 + 0.5 * Math.sin(x * 0.31 + Math.sin(y * 0.23) * 2.4 + Math.sin(x * 0.11) * 1.7);
          const dx = (x - ox) / COLS * 2, dy = (y - oy) / ROWS * 2;
          const v = h1 * 0.22 + blotch * 0.38 + Math.min(1, Math.sqrt(dx * dx + dy * dy) / 1.35) * 0.40;
          dustDelay[y * COLS + x] = v;
          if (v > maxD) maxD = v;
        }
      }
      for (let i = 0; i < dustDelay.length; i++) dustDelay[i] = (dustDelay[i] / maxD) * 0.8;
    }

    function spawnAsh(px, py) {
      if (ashParticles.length > 3200) return;
      for (let i = 0; i < 2; i++) {
        ashParticles.push({
          x: px, y: py,
          vx: 10 + Math.random() * 34, vy: -(6 + Math.random() * 26),
          age: 0, life: 0.8 + Math.random() * 1.3,
          s: 0.8 + Math.random() * 1.7,
          ember: Math.random() < 0.22, ph: Math.random() * 6.28
        });
      }
    }
    let glitchSlices = [];
    let glitchSeed = 0;

    // ===== boot-sequence exit: fade to black after the collapse, then enter the 3D showcase =====
    (function setupExitSequence() {
      const mountTime = performance.now();
      let skipped = false;
      function skipIntro() {
        if (performance.now() - mountTime < 600) return;
        if (skipped) return;
        skipped = true;
        window.removeEventListener("pointerdown", skipIntro, true);
        window.removeEventListener("keydown", skipIntro, true);
        if (overlay && overlay.parentNode) {
          overlay.classList.add("prologue-fade-out");
          if (animId) cancelAnimationFrame(animId);
          setTimeout(function() {
            if (overlay && overlay.parentNode) overlay.remove();
            window.__starkPrologueActive = false;
          }, 850);
        }
      }
      overlay.addEventListener("click", skipIntro);
      window.addEventListener("keydown", function(e) {
        if (e.key === "Escape" || e.key === " " || e.key === "Enter") skipIntro();
      });
      setTimeout(skipIntro, DUST_END + 400);
    })();

    function getPhase(now) {
      if (now < ACT2_BUILD_START) return 'ACT1';
      if (now < ACT2_BUILD_START + SWEEP_DURATION) return 'BUILD';
      if (now < ACT2_BUILD_START + SWEEP_DURATION + COLOR_SETTLE_DURATION) return 'SETTLE';
      if (now < ACT3_START) return 'STABLE';
      if (now < ACT3_END) return 'GLITCH';
      if (now < DUST_START) return 'LIVE';
      if (now < DUST_END) return 'DUST';
      return 'ASH';
    }

    // Per-column solidification moment (vertical cascade inside each column)
    // + a slow wave jitter so the sweep front breathes instead of a razor-straight line
    const colJitter = new Float32Array(COLS);
    for (let cx = 0; cx < COLS; cx++) {
      colJitter[cx] = Math.sin(cx * 0.21) * 1.1 + Math.sin(cx * 0.077 + 1.7) * 1.6;
    }
    // smooth blotch noise per cell — code condenses in organic patches, not a hard line
    const revealNoise = new Float32Array(COLS * ROWS);
    for (let i = 0; i < COLS * ROWS; i++) {
      const nx = i % COLS, ny = (i / COLS) | 0;
      revealNoise[i] = 0.5 + 0.5 * Math.sin(nx * 0.55 + Math.sin(ny * 0.37) * 2.1) * Math.sin(ny * 0.23 + Math.sin(nx * 0.13) * 1.8);
    }
    function colRevealT(col, now) {
      const t = (now - ACT2_BUILD_START) / SWEEP_DURATION; // 0..1 across sweep
      const te = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 1.45); // eased front
      const colT = te * (COLS + 14) - col - colJitter[col]; // each column's local progress
      return colT; // <0 not yet, 0..1 solidifying, >1 solid
    }
    let matrixStreams = [];
    let shockwaves = [];
    let mouse = { x: -1, y: -1, active: false };
    let scanlineY = 0;
    let frameIndex = 0;
    let animId = null;

    function init() {
      // Matrix rain streams
      matrixStreams = [];
      for (let x = 0; x < COLS; x++) {
        matrixStreams[x] = {
          headY: -Math.random() * ROWS * 2.5,
          speed: 0.4 + Math.random() * 0.5,
          length: 7 + Math.floor(Math.random() * 14),
          active: Math.random() < 0.4
        };
      }

      // Mouse move on fullscreen canvas
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;

        const gridX = Math.floor((mouse.x / window.innerWidth) * COLS);
        const gridY = Math.floor((mouse.y / window.innerHeight) * ROWS);
        hudCoords.textContent = "TARGET: [" + gridX + "," + gridY + "] • MEM: 0x" + (0x7FFF0000 + gridY * 1024 + gridX).toString(16).toUpperCase();
      });

      window.addEventListener('mouseleave', () => {
        mouse.active = false;
        hudCoords.textContent = "SYS.CORE [160x80] • MEM: 0x7FFF8A4D";
      });

      // Click anywhere to trigger EMP Decryption Ripple Wave
      window.addEventListener('click', (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const targetAspect = 2.0;
        const screenAspect = width / height;

        let drawW, drawH, offsetX, offsetY;
        if (screenAspect > targetAspect) {
          drawH = height;
          drawW = height * targetAspect;
          offsetX = (width - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = width;
          drawH = width / targetAspect;
          offsetX = 0;
          offsetY = (height - drawH) / 2;
        }

        const clickGridX = ((e.clientX - offsetX) / drawW) * COLS;
        const clickGridY = ((e.clientY - offsetY) / drawH) * ROWS;

        shockwaves.push({
          x: clickGridX,
          y: clickGridY,
          radius: 0,
          maxRadius: 50,
          speed: 1.8
        });
      });

      window.addEventListener('resize', () => {
        if (imgPixels) render();
      });

      // Do not set crossOrigin on data URL
      const onReady = () => {
        if (img.naturalWidth > 0 && !imgPixels) {
          processImage();
          render();
        }
      };

      img.onload = onReady;
      img.src = IMAGE_SRC;
      if (img.complete) {
        onReady();
      }
    }

    function processImage() {
      offCanvas.width = COLS;
      offCanvas.height = ROWS;
      offCtx.drawImage(img, 0, 0, COLS, ROWS);

      imgPixels = offCtx.getImageData(0, 0, COLS, ROWS).data;
      charGrid = [];

      for (let y = 0; y < ROWS; y++) {
        charGrid[y] = [];
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4;
          let r = imgPixels[idx];
          let g = imgPixels[idx + 1];
          let b = imgPixels[idx + 2];

          // Dynamic range enhancement: punchy sunset highlights + detailed facial shadows
          r = Math.min(255, Math.pow(r / 255, 0.8) * 270 + 14);
          g = Math.min(255, Math.pow(g / 255, 0.8) * 260 + 9);
          b = Math.min(255, Math.pow(b / 255, 0.8) * 260 + 7);

          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const charIdx = Math.min(CHAR_COUNT - 1, Math.max(0, Math.floor(lum * (CHAR_COUNT - 1))));

          charGrid[y][x] = {
            r: Math.round(r),
            g: Math.round(g),
            b: Math.round(b),
            char: DENSITY_CHARS[charIdx],
            lum: lum
          };
        }
      }
    }

    function render() {
      if (!timelineGo) { animId = requestAnimationFrame(render); return; }
      frameIndex++;
      const nowMs = performance.now();
      const dt = lastFrameTime ? Math.min(0.05, (nowMs - lastFrameTime) / 1000) : 0.016;
      lastFrameTime = nowMs;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep solid black canvas
      ctx.fillStyle = '#000002';
      ctx.fillRect(0, 0, width, height);

      if (!charGrid.length) {
        ctx.restore();
        animId = requestAnimationFrame(render);
        return;
      }

      // Fill the entire viewport edge-to-edge (grid stretches to cover, no letterbox)
      const drawW = width;
      const drawH = height;
      const offsetX = 0;
      const offsetY = 0;

      const cellW = drawW / COLS;
      const cellH = drawH / ROWS;
      const fontSize = Math.max(6.5, Math.round(cellH * 0.96));

      ctx.font = '700 ' + fontSize + 'px "JetBrains Mono", "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouseX = mouse.x;
      const mouseY = mouse.y;
      const mouseActive = mouse.active;
      const mouseRadius = 150;

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        shockwaves[s].radius += shockwaves[s].speed;
        if (shockwaves[s].radius > shockwaves[s].maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Radar scanline position
      scanlineY = (scanlineY + 0.65) % ROWS;

      // ===== Three-Act intro timing =====
      if (startTime === null) startTime = performance.now();
      const elapsed = performance.now() - startTime;
      const phase = getPhase(elapsed);
      const bt = Math.min(1, Math.max(0, (elapsed - ACT2_BUILD_START) / SWEEP_DURATION));
      const buildProgress = 1 - Math.pow(1 - bt, 1.45);   // eased front: glides in, lands soft

      // ===== Act 4: the snap — flash, shake, and start the crumble =====
      if (phase === 'LIVE' && !canvasPushed) {
        canvasPushed = true;
        canvas.style.animation = 'canvasPush 14s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      }

      if ((phase === 'DUST' || phase === 'ASH') && !dustFired) {
        dustFired = true;
        initDust();
        snapFlash = 1;
        snapJitter = 9;
        const hdr = document.querySelector('.hero-editorial-wrap');
        if (hdr) hdr.classList.add('crumble');
      }
      if (snapJitter > 0.05) {
        ctx.translate((Math.random() - 0.5) * snapJitter, (Math.random() - 0.5) * snapJitter);
        snapJitter *= 0.8;
      }

      // ===== FAST PATH FOR ACT 1: portrait not yet visible, pure black void background =====
      if (phase === "ACT1") {
        ctx.restore();
        animId = requestAnimationFrame(render);
        return;
      }

      // One-shot Act 3 glitch slices + title shake
      if (phase === 'GLITCH' && !act3Fired) {
        act3Fired = true;
        glitchSlices = [];
        // fullscreen shatter: slices tile the entire grid edge-to-edge
        let ys = 0;
        while (ys < ROWS) {
          const yLen = 4 + Math.floor(Math.random() * 10);
          glitchSlices.push({
            yStart: ys,
            yLen: Math.min(yLen, ROWS - ys),
            offset: (Math.random() < 0.5 ? -1 : 1) * (15 + Math.random() * 45),
            colorShift: Math.random() < 0.5
          });
          ys += yLen;
        }
        const zh = document.querySelector('.quote-zh-hero');
        if (zh) {
          zh.classList.remove('zh-shake');
          void zh.offsetWidth;
          zh.classList.add('zh-shake');
          setTimeout(() => zh.classList.remove('zh-shake'), 400);
        }
      }
      if (phase === 'LIVE' && glitchSlices.length) glitchSlices = [];

      // Random micro-glitch slice (once every ~85 frames) - only in LIVE phase
      const isGlitchFrame = (phase === 'LIVE' && frameIndex % 85 === 0);
      const glitchRowStart = isGlitchFrame ? Math.floor(Math.random() * (ROWS - 8)) : -1;
      const glitchT = phase === 'GLITCH' ? (elapsed - ACT3_START) : -1;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = charGrid[y][x];
          let r = cell.r;
          let g = cell.g;
          let b = cell.b;
          let char = cell.char;
          let posX = offsetX + x * cellW + cellW / 2;
          let posY = offsetY + y * cellH + cellH / 2;

          // ===== ACT 1: portrait still dark (skip almost everything) =====
          if (phase === 'ACT1') {
            // faint dormant code dust so the black canvas isn't 100% dead
            if (Math.random() < 0.004) {
              ctx.fillStyle = 'rgba(0, 255, 102, 0.10)';
              ctx.fillText(CODE_TOKENS[(x * 7 + y * 13 + frameIndex) % TOKEN_COUNT], posX, posY);
            }
            continue;
          }

          // ===== ACT 2 BUILD: column sweep materialization =====
          if (phase === 'BUILD') {
            // organic front: wave + per-cell blotch noise → condenses in patches
            const diB = y * COLS + x;
            const local = colRevealT(x, elapsed) + (revealNoise[diB] - 0.5) * 7;
            if (local <= 0) {
              // ahead of the front: faint code mist breathing in the dark
              if (Math.random() < 0.014) {
                const mist = 0.04 + 0.05 * (0.5 + 0.5 * Math.sin(elapsed * 0.004 + x * 0.35 + y * 0.52));
                ctx.fillStyle = 'rgba(0, 255, 102, ' + mist.toFixed(3) + ')';
                ctx.fillText(CODE_TOKENS[(x * 7 + y * 13 + frameIndex) % TOKEN_COUNT], posX, posY);
              }
              continue;
            }
            // soft vertical cascade with a slow ripple across the rows
            const rv = local - ((y / ROWS) * 6 + Math.sin(x * 0.3 + y * 0.12) * 1.6) / 60;
            if (rv <= 0) {
              if (Math.random() < 0.02) {
                ctx.fillStyle = 'rgba(0, 255, 102, 0.14)';
                ctx.fillText(CODE_TOKENS[(x * 3 + y * 11 + frameIndex) % TOKEN_COUNT], posX, posY);
              }
              continue;
            }
            if (rv < 1.8) {
              // decoding: green prototype tokens flicker and lock one by one while the
              // real portrait char surfaces underneath; each cell settles into place
              const p = rv / 1.8;
              const drift = (1 - p) * cellH * 0.35;
              const glow = 0.7 + 0.3 * Math.sin(rv * 8 + x * 0.9 + y * 1.9);
              if (Math.random() < (1 - p) * 0.55) {
                // still resolving: green prototype token
                ctx.fillStyle = 'rgba(0, 255, 102, ' + ((0.08 + 0.5 * Math.min(1, rv / 0.7)) * glow).toFixed(3) + ')';
                ctx.fillText(CODE_TOKENS[(x * 5 + y * 3 + frameIndex * 2) % TOKEN_COUNT], posX, posY - drift);
              } else {
                // locked: warm true color rises as the green tint dissolves away
                const w = p * p * (3 - 2 * p);
                const rr2 = Math.round(r * (0.5 + 0.5 * w) + 10 * (1 - w));
                const gg2 = Math.round(g * (0.72 + 0.28 * w) + 46 * (1 - w));
                const bb2 = Math.round(b * (0.5 + 0.5 * w) + 10 * (1 - w));
                ctx.fillStyle = 'rgba(' + rr2 + ',' + gg2 + ',' + bb2 + ',' + (0.25 + 0.75 * w).toFixed(3) + ')';
                ctx.fillText(char, posX, posY - drift);
              }
              continue;
            }
            // solidified: gentle warm-up overshoot that settles back to 1.0
            const settle = Math.max(0, 1 - (rv - 1.8) / 1.6);
            const overshoot = 1 + settle * settle * 0.3;
            r = Math.min(255, r * overshoot);
            g = Math.min(255, g * overshoot);
            b = Math.min(255, b * overshoot);
          }

          // ===== ACT 2 SETTLE: cold green -> warm true color transition =====
          if (phase === 'SETTLE') {
            const settleT = Math.min(1, (elapsed - ACT2_BUILD_START - SWEEP_DURATION) / COLOR_SETTLE_DURATION);
            const ease = 1 - Math.pow(1 - settleT, 3);
            // blend: green-tinted version -> true color
            const gr = r * 0.55 + 10, gg = g * 0.9 + 60, gb = b * 0.55 + 10;
            r = gr + (r - gr) * ease;
            g = gg + (g - gg) * ease;
            b = gb + (b - gb) * ease;
          }

          // ===== ACT 3 GLITCH: one-shot collapse =====
          if (phase === 'GLITCH') {
            // Phase A (0~300ms): horizontal slice displacement + RGB split
            if (glitchT < ACT3_SLICE) {
              let displaced = false;
              for (const sl of glitchSlices) {
                if (y >= sl.yStart && y < sl.yStart + sl.yLen) {
                  posX += sl.offset;
                  if (sl.colorShift) { r = Math.min(255, r + 110); b = Math.max(0, b - 60); }
                  else { b = Math.min(255, b + 110); r = Math.max(0, r - 40); }
                  displaced = true;
                }
              }
              if (!displaced && Math.random() < 0.25) {
                char = CODE_TOKENS[(x * 7 + y * 5 + frameIndex * 3) % TOKEN_COUNT];
              }
            }
            // Phase B (150~350ms): massive token swap + white flicker (full-on burst)
            else if (glitchT < ACT3_SLICE + ACT3_SWAP) {
              const intensity = Math.sin(((glitchT - ACT3_SLICE) / ACT3_SWAP) * Math.PI);
              if (Math.random() < 0.75 + intensity * 0.25) {
                char = CODE_TOKENS[(x * 11 + y * 17 + frameIndex * 5) % TOKEN_COUNT];
              }
              if (Math.random() < intensity * 0.7) {
                const w = Math.round(150 + Math.random() * 105);
                r = w; g = w; b = w;
              }
            }
            // Phase C (350~550ms): quick fade back to normal
            else {
              const fadeT = (glitchT - ACT3_SLICE - ACT3_SWAP) / ACT3_FADE;
              if (Math.random() < (1 - fadeT) * 0.2) {
                char = CODE_TOKENS[(x * 13 + y * 7 + frameIndex) % TOKEN_COUNT];
              }
            }
          }

          // ===== ACT 4 DUST: crumble to ash and drift away on the wind =====
          if (phase === 'DUST' || phase === 'ASH') {
            const di = y * COLS + x;
            const local = (elapsed - DUST_START) - dustDelay[di] * 2600;
            const d = local <= 0 ? 0 : Math.min(1, local / 900);
            if (d >= 1) { ctx.globalAlpha = 1; continue; }
            if (d > 0) {
              const k = Math.min(1, d * 2.2);
              r = r + (118 - r) * k;
              g = g + (108 - g) * k;
              b = b + (100 - b) * k;
              if (d > 0.3 && Math.random() < 0.22) char = Math.random() < 0.5 ? '\u00b7' : ':';
              posX += (0.6 + ((x * 7 + y * 3) % 10) / 10 * 2.4) * d * cellW + Math.sin(d * 5.2 + x * 0.7) * 0.25 * cellW * d;
              posY -= (0.5 + ((x * 3 + y * 5) % 10) / 10 * 1.6) * d * cellH;
              ctx.globalAlpha = 1 - d * d * (3 - 2 * d);
              if (!ashSpawned[di]) { ashSpawned[di] = 1; spawnAsh(posX, posY); }
            } else {
              ctx.globalAlpha = 1;
            }
          } else {
            ctx.globalAlpha = 1;
          }

          const stream = matrixStreams[x];
          let isStreamHead = false;
          let isStreamTrail = false;

          if (stream && stream.active && phase !== 'BUILD' && phase !== 'DUST' && phase !== 'ASH') {
            const distFromHead = stream.headY - y;
            if (distFromHead >= 0 && distFromHead < 1.3) {
              isStreamHead = true;
              char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
            } else if (distFromHead >= 1.3 && distFromHead < stream.length) {
              isStreamTrail = true;
              if (Math.random() < 0.25) {
                char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
              }
            }
          }

          // Living neural code flicker (only when live)
          if (phase === 'LIVE' && Math.random() < 0.0035) {
            char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
          }

          // neural pulse: a warm wave drifts diagonally through the portrait —
          // reads like circulation under the code skin (only when fully live)
          if (phase === 'LIVE') {
            const pw = Math.sin(elapsed * 0.0016 - (x + y * 1.6) * 0.055);
            if (pw > 0.72) {
              const pk = (pw - 0.72) / 0.28;
              r = Math.min(255, r + pk * 46);
              g = Math.min(255, g + pk * 26);
              b = Math.min(255, b + pk * 8);
            }
          }

          // Shockwave ripple interaction
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const dist = Math.sqrt((x - sw.x) * (x - sw.x) + (y - sw.y) * (y - sw.y));
            const ringDist = Math.abs(dist - sw.radius);
            if (ringDist < 2.5) {
              const intensity = (1 - ringDist / 2.5) * (1 - sw.radius / sw.maxRadius);
              r = Math.min(255, r + intensity * 120);
              g = Math.min(255, g + intensity * 220);
              b = Math.min(255, b + intensity * 180);
              char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
            }
          }

          // Horizontal Glitch Line
          if (isGlitchFrame && y >= glitchRowStart && y <= glitchRowStart + 4) {
            posX += (Math.random() - 0.5) * 8;
            r = Math.min(255, r + 80);
            b = Math.min(255, b + 100);
            char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
          }

          // Holographic Radar Scanline Boost (Cleaned up: NO yellow overlay!)
          const scanDist = Math.abs(y - scanlineY);
          if (scanDist < 2.2 && phase !== 'BUILD' && phase !== 'DUST' && phase !== 'ASH') {
            const scanBoost = 1 - (scanDist / 2.2);
            r = Math.min(255, r + scanBoost * 30);
            g = Math.min(255, g + scanBoost * 45);
            b = Math.min(255, b + scanBoost * 25);
            if (Math.random() < 0.12) {
              char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
            }
          }

          // Mouse Decryption Spotlight
          if (mouseActive) {
            const dx = posX - mouseX;
            const dy = posY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const boost = (1 - dist / mouseRadius);
              r = Math.min(255, r + boost * 70);
              g = Math.min(255, g + boost * 60);
              b = Math.min(255, b + boost * 40);

              if (Math.random() < boost * 0.22) {
                char = CODE_TOKENS[Math.floor(Math.random() * TOKEN_COUNT)];
              }
            }
          }

          // Color calculation (GPU-accelerated, zero-shadowBlur 60FPS)
          if (isStreamHead) {
            ctx.fillStyle = '#ffffff';
          } else if (isStreamTrail) {
            ctx.fillStyle = 'rgb(' + Math.min(255, Math.round(r * 0.45 + 30)) + ',' + Math.min(255, Math.round(g * 0.8 + 150)) + ',' + Math.min(255, Math.round(b * 0.45 + 30)) + ')';
          } else {
            if (cell.lum > 0.72) {
              r = Math.min(255, Math.round(r * 1.15 + 10));
              g = Math.min(255, Math.round(g * 1.15 + 10));
              b = Math.min(255, Math.round(b * 1.15 + 10));
            }
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          }

          ctx.fillText(char, posX, posY);
        }
      }

      // ===== ACT 2: vertical green write-beam following the sweep front =====
      if (phase === 'BUILD') {
        const beamX = offsetX + buildProgress * (COLS + 14) * cellW;
        if (beamX < offsetX + drawW + cellW * 2) {
          const grad = ctx.createLinearGradient(beamX - cellW * 5, 0, beamX + cellW * 2, 0);
          grad.addColorStop(0, 'rgba(0, 255, 102, 0)');
          grad.addColorStop(0.55, 'rgba(0, 255, 102, 0.10)');
          grad.addColorStop(0.85, 'rgba(0, 255, 102, 0.28)');
          grad.addColorStop(1, 'rgba(180, 255, 220, 0.65)');
          ctx.fillStyle = grad;
          ctx.fillRect(beamX - cellW * 5, offsetY, cellW * 7, drawH);
          // hot core line
          ctx.fillStyle = 'rgba(220, 255, 235, 0.9)';
          ctx.fillRect(beamX + cellW * 0.6, offsetY, 2, drawH);
          ctx.shadowColor = '#00ff66';
          ctx.shadowBlur = 18;
          ctx.fillRect(beamX + cellW * 0.6, offsetY, 2, drawH);
          ctx.shadowBlur = 0;
        }
      }

      // Update falling matrix streams
      for (let x = 0; x < COLS; x++) {
        if (!matrixStreams[x]) continue;
        matrixStreams[x].headY += matrixStreams[x].speed;
        if (matrixStreams[x].headY > ROWS + matrixStreams[x].length + 10) {
          matrixStreams[x].headY = -Math.random() * 25;
          matrixStreams[x].speed = 0.4 + Math.random() * 0.5;
          matrixStreams[x].length = 7 + Math.floor(Math.random() * 14);
          matrixStreams[x].active = Math.random() < 0.4;
        }
      }

      // snap flash: a warm burst of light spreading from the arc reactor
      if (snapFlash > 0.01) {
        const fx = offsetX + 0.66 * drawW, fy = offsetY + 0.42 * drawH;
        const fr = Math.max(drawW, drawH) * (0.25 + (1 - snapFlash) * 0.9);
        const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr);
        fg.addColorStop(0, 'rgba(255,232,190,' + (snapFlash * 0.55).toFixed(3) + ')');
        fg.addColorStop(0.4, 'rgba(255,180,110,' + (snapFlash * 0.28).toFixed(3) + ')');
        fg.addColorStop(1, 'rgba(255,160,80,0)');
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, width, height);
        snapFlash *= 0.86;
      }

      // ash particles drifting on the wind
      if (phase === 'DUST' || phase === 'ASH') {
        for (let i = ashParticles.length - 1; i >= 0; i--) {
          const a = ashParticles[i];
          a.age += dt;
          if (a.age >= a.life) { ashParticles.splice(i, 1); continue; }
          a.x += a.vx * dt + Math.sin(a.age * 3 + a.ph) * 20 * dt + 18 * dt;
          a.y += a.vy * dt - 26 * dt * (1 - a.age / a.life);
          const pa = 1 - a.age / a.life;
          ctx.fillStyle = a.ember
            ? 'rgba(255,190,110,' + (pa * 0.9).toFixed(3) + ')'
            : 'rgba(190,182,172,' + (pa * 0.8).toFixed(3) + ')';
          ctx.fillRect(a.x, a.y, a.s, a.s);
        }
        // faint afterglow where the heart used to be
        if (phase === 'ASH') {
          const gt = Math.min(1, (elapsed - DUST_END) / 2000);
          const fx = offsetX + 0.66 * drawW, fy = offsetY + 0.42 * drawH;
          const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 140);
          fg.addColorStop(0, 'rgba(255,170,90,' + (0.10 * (1 - gt)).toFixed(3) + ')');
          fg.addColorStop(1, 'rgba(255,170,90,0)');
          ctx.fillStyle = fg;
          ctx.fillRect(fx - 150, fy - 150, 300, 300);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    }

    init();
  
  } catch(err) {
    console.error("[PROLOGUE RUNTIME ERROR]", err);
    if (overlay && overlay.parentNode) overlay.remove();
    window.__starkPrologueActive = false;
  }
};
