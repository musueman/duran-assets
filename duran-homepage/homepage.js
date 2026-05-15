export function renderDuranHomePage(options = {}) {
  const assetBase = normalizeAssetBase(options.assetBase);
  const assetPrefix = normalizeAssetBase(options.assetPrefix ?? (assetBase ? `${assetBase}/assets` : "/assets"));
  const mapSrc = escapeAttr(options.mapSrc || `${assetBase}/assets/arcadia-map.png`);
  const ornamentHeroSrc = escapeAttr(`${assetPrefix}/ornament-hero-flourish.png`);
  const ornamentScrollSrc = escapeAttr(`${assetPrefix}/ornament-scroll-band.png`);
  const ornamentLeafSrc = escapeAttr(`${assetPrefix}/ornament-leaf-band.png`);
  const ornamentThinSrc = escapeAttr(`${assetPrefix}/ornament-thin-chain.png`);
  const ornamentStarSrc = escapeAttr(`${assetPrefix}/ornament-star-chain.png`);

  return String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="description" content="듀란일대기: 죽지 않는 기사 전사편 홈페이지">
  <title>듀란일대기 | 죽지 않는 기사 전사편</title>
  <style>
    :root {
      --ink: #201f1a;
      --deep: #17241d;
      --moss: #355f4b;
      --fern: #6c8c5d;
      --rust: #a74e35;
      --gold: #c49a49;
      --paper: #f2f0ea;
      --pale: #e4e9dd;
      --mist: #d8dadd;
      --stone: #596169;
      --line: rgba(32, 31, 26, 0.16);
      --shadow: 0 24px 60px rgba(23, 36, 29, 0.18);
      --radius: 8px;
      --ornament-hero: url("${ornamentHeroSrc}");
      --ornament-scroll: url("${ornamentScrollSrc}");
      --ornament-leaf: url("${ornamentLeafSrc}");
      --ornament-thin: url("${ornamentThinSrc}");
      --ornament-star: url("${ornamentStarSrc}");
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      color: var(--ink);
      background:
        linear-gradient(90deg, rgba(167, 78, 53, 0.08), transparent 22%, rgba(63, 93, 120, 0.1) 78%, transparent),
        radial-gradient(circle at 18% 10%, rgba(196, 154, 73, 0.15), transparent 30%),
        linear-gradient(180deg, #e8ece3 0%, var(--paper) 45%, #e5e2d8 100%);
      font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", sans-serif;
      line-height: 1.65;
      word-break: keep-all;
      overflow-wrap: break-word;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(32, 31, 26, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(32, 31, 26, 0.025) 1px, transparent 1px);
      background-size: 34px 34px;
      mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.58), transparent 78%);
      z-index: -1;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      display: block;
      max-width: 100%;
    }

    .site-nav {
      position: sticky;
      top: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 64px;
      padding: 0 28px;
      color: #f8f5eb;
      background: rgba(23, 36, 29, 0.88);
      border-bottom: 1px solid rgba(242, 240, 234, 0.18);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: inline-grid;
      gap: 0;
      font-weight: 800;
      line-height: 1.08;
    }

    .brand small {
      color: rgba(248, 245, 235, 0.68);
      font-size: 12px;
      font-weight: 600;
    }

    .nav-links {
      display: flex;
      gap: 18px;
      align-items: center;
      color: rgba(248, 245, 235, 0.82);
      font-size: 14px;
      font-weight: 700;
    }

    .nav-links a {
      padding: 8px 0;
      border-bottom: 2px solid transparent;
    }

    .nav-links a:hover,
    .nav-links a:focus-visible {
      border-color: var(--gold);
      outline: none;
    }

    .hero {
      --map-image: url("${mapSrc}");
      position: relative;
      display: grid;
      align-items: end;
      min-height: calc(100svh - 108px);
      isolation: isolate;
      overflow: hidden;
      color: #fbf8ef;
      background: var(--deep);
    }

    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(90deg, rgba(18, 25, 21, 0.91) 0%, rgba(18, 25, 21, 0.68) 43%, rgba(18, 25, 21, 0.2) 100%),
        linear-gradient(180deg, rgba(18, 25, 21, 0.04) 0%, rgba(18, 25, 21, 0.58) 100%),
        var(--map-image);
      background-size: cover;
      background-position: center;
      transform: scale(1.02);
      z-index: -2;
    }

    .hero::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 38%;
      background: linear-gradient(180deg, transparent, rgba(23, 36, 29, 0.92));
      z-index: -1;
    }

    .hero-inner {
      position: relative;
      width: min(1180px, calc(100% - 48px));
      margin: 0 auto;
      padding: 84px 0 58px;
    }

    .hero-inner::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 22px;
      width: min(650px, 74vw);
      height: 56px;
      pointer-events: none;
      background: var(--ornament-hero) left center / contain no-repeat;
      filter: drop-shadow(0 18px 34px rgba(0, 0, 0, 0.35));
      opacity: 0.76;
    }

    .eyebrow {
      display: inline-flex;
      gap: 10px;
      align-items: center;
      margin: 0 0 18px;
      color: #ead8a1;
      font-size: 13px;
      font-weight: 800;
    }

    .eyebrow::before {
      content: "";
      width: 38px;
      height: 2px;
      background: currentColor;
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1 {
      max-width: 800px;
      margin-bottom: 18px;
      font-family: "Georgia", "Times New Roman", "Malgun Gothic", serif;
      font-size: clamp(48px, 9vw, 118px);
      line-height: 0.98;
      font-weight: 800;
      letter-spacing: 0;
    }

    .hero-copy {
      max-width: 760px;
      margin-bottom: 30px;
      color: rgba(251, 248, 239, 0.88);
      font-size: clamp(18px, 2vw, 24px);
      line-height: 1.55;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-bottom: 34px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0 18px;
      border: 1px solid rgba(251, 248, 239, 0.72);
      border-radius: var(--radius);
      color: #fbf8ef;
      background: rgba(251, 248, 239, 0.08);
      font-weight: 800;
      box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);
    }

    .button.primary {
      border-color: #d7b45c;
      color: #1d211b;
      background: #d7b45c;
    }

    .button:hover,
    .button:focus-visible {
      transform: translateY(-1px);
      outline: 2px solid rgba(215, 180, 92, 0.42);
      outline-offset: 3px;
    }

    .hero-ledger {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1px;
      max-width: 880px;
      overflow: hidden;
      border: 1px solid rgba(251, 248, 239, 0.22);
      border-radius: var(--radius);
      background: rgba(251, 248, 239, 0.18);
    }

    .ledger-item {
      min-height: 92px;
      padding: 16px;
      background: rgba(23, 36, 29, 0.6);
    }

    .ledger-item span {
      display: block;
      color: #dfc76f;
      font-size: 12px;
      font-weight: 800;
    }

    .ledger-item strong {
      display: block;
      margin-top: 5px;
      color: #fbf8ef;
      font-size: 17px;
      line-height: 1.35;
    }

    main {
      overflow: hidden;
    }

    section {
      padding: 88px 0;
    }

    .section-inner {
      width: min(1180px, calc(100% - 48px));
      margin: 0 auto;
    }

    .section-kicker {
      margin-bottom: 10px;
      color: var(--rust);
      font-size: 13px;
      font-weight: 900;
    }

    .section-title {
      position: relative;
      max-width: 780px;
      margin-bottom: 18px;
      font-family: "Georgia", "Times New Roman", "Malgun Gothic", serif;
      font-size: clamp(34px, 5vw, 68px);
      line-height: 1.06;
      letter-spacing: 0;
    }

    .section-title::after {
      content: "";
      display: block;
      width: min(360px, 74vw);
      height: 28px;
      margin-top: 18px;
      background: var(--ornament-thin) left center / contain no-repeat;
      opacity: 0.58;
    }

    .map-section .section-title::after,
    .closing .section-title::after {
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.28));
      opacity: 0.72;
    }

    .section-lead {
      max-width: 820px;
      margin-bottom: 40px;
      color: rgba(32, 31, 26, 0.75);
      font-size: 18px;
    }

    .premise-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 44px;
      align-items: start;
    }

    .seal-panel {
      position: sticky;
      top: 92px;
      min-height: 420px;
      padding: 30px;
      color: #f8f4e7;
      background:
        linear-gradient(145deg, rgba(53, 95, 75, 0.92), rgba(32, 31, 26, 0.94)),
        linear-gradient(45deg, rgba(196, 154, 73, 0.16), transparent);
      border: 1px solid rgba(234, 216, 161, 0.24);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .seal-panel::before,
    .seal-panel::after {
      content: "";
      position: absolute;
      pointer-events: none;
      left: 22px;
      right: 22px;
      height: 58px;
      background: var(--ornament-scroll) center / 100% auto no-repeat;
      opacity: 0.4;
    }

    .seal-panel::before {
      top: 14px;
    }

    .seal-panel::after {
      bottom: 12px;
      transform: rotate(180deg);
      opacity: 0.26;
    }

    .seal-panel > * {
      position: relative;
      z-index: 1;
    }

    .seal-panel p {
      color: rgba(248, 244, 231, 0.78);
    }

    .seal-mark {
      display: grid;
      place-items: center;
      width: 116px;
      height: 116px;
      margin-bottom: 48px;
      border: 1px solid rgba(234, 216, 161, 0.48);
      border-radius: 50%;
      color: #ead8a1;
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 44px;
      font-weight: 800;
    }

    .brief-list {
      display: grid;
      gap: 16px;
    }

    .brief-card,
    .character-card,
    .relic,
    .timeline-panel {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(196, 154, 73, 0.24);
      border-radius: var(--radius);
      background: rgba(255, 255, 255, 0.46);
      box-shadow: 0 12px 32px rgba(32, 31, 26, 0.06);
    }

    .character-card::after,
    .timeline-panel::after,
    .closing-note::after {
      content: "";
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 12px;
      height: 32px;
      pointer-events: none;
      background: var(--ornament-thin) center / 100% auto no-repeat;
      opacity: 0.3;
    }

    .timeline-panel::after {
      top: 16px;
      bottom: auto;
      height: 46px;
      background-image: var(--ornament-hero);
      opacity: 0.2;
    }

    .closing-note::after {
      background-image: var(--ornament-leaf);
      opacity: 0.24;
    }

    .character-card > *,
    .timeline-panel > *,
    .closing-note > * {
      position: relative;
      z-index: 1;
    }

    .brief-card {
      display: grid;
      grid-template-columns: 88px 1fr;
      gap: 22px;
      padding: 22px;
    }

    .brief-card b {
      color: var(--moss);
      font-size: 13px;
    }

    .brief-card h3 {
      margin-bottom: 6px;
      font-size: 24px;
      line-height: 1.24;
    }

    .brief-card p {
      margin-bottom: 0;
      color: rgba(32, 31, 26, 0.74);
    }

    .map-section {
      color: #f7f1e5;
      background:
        linear-gradient(180deg, rgba(23, 36, 29, 0.98), rgba(42, 55, 50, 0.96)),
        radial-gradient(circle at 84% 18%, rgba(167, 78, 53, 0.22), transparent 32%);
    }

    .map-section .section-kicker {
      color: #d7b45c;
    }

    .map-section .section-lead {
      color: rgba(247, 241, 229, 0.76);
    }

    .map-layout {
      display: grid;
      grid-template-columns: minmax(300px, 0.86fr) minmax(0, 1.14fr);
      gap: 34px;
      align-items: center;
    }

    .map-frame {
      overflow: hidden;
      border: 1px solid rgba(247, 241, 229, 0.2);
      border-radius: var(--radius);
      background: #111812;
      box-shadow: 0 28px 70px rgba(0, 0, 0, 0.3);
    }

    .map-frame img {
      width: 100%;
      aspect-ratio: 2 / 3;
      object-fit: cover;
    }

    .region-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .region {
      min-height: 146px;
      padding: 20px;
      border: 1px solid rgba(247, 241, 229, 0.18);
      border-radius: var(--radius);
      background: rgba(247, 241, 229, 0.08);
    }

    .region span {
      color: #d7b45c;
      font-size: 12px;
      font-weight: 900;
    }

    .region h3 {
      margin: 6px 0 8px;
      font-size: 22px;
    }

    .region p {
      margin: 0;
      color: rgba(247, 241, 229, 0.74);
    }

    .timeline-wrap {
      display: grid;
      grid-template-columns: 310px 1fr;
      gap: 28px;
      align-items: start;
    }

    .year-buttons {
      display: grid;
      gap: 8px;
    }

    .year-button {
      display: grid;
      grid-template-columns: 58px 1fr;
      gap: 12px;
      align-items: center;
      min-height: 54px;
      padding: 0 14px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      color: var(--ink);
      background: rgba(255, 255, 255, 0.38);
      font: inherit;
      font-weight: 800;
      text-align: left;
      cursor: pointer;
    }

    .year-button span {
      color: var(--rust);
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 20px;
    }

    .year-button[aria-selected="true"] {
      color: #f9f4e7;
      background: var(--moss);
      box-shadow: 0 14px 26px rgba(53, 95, 75, 0.22);
    }

    .year-button[aria-selected="true"] span {
      color: #f0cf73;
    }

    .timeline-panel {
      min-height: 500px;
      padding: 36px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.66), rgba(228, 233, 221, 0.66)),
        linear-gradient(90deg, rgba(167, 78, 53, 0.08), transparent);
    }

    .timeline-panel .year {
      color: var(--rust);
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 54px;
      font-weight: 800;
      line-height: 1;
    }

    .timeline-panel h3 {
      margin: 14px 0 12px;
      font-size: clamp(28px, 4vw, 46px);
      line-height: 1.12;
    }

    .timeline-panel p {
      max-width: 760px;
      color: rgba(32, 31, 26, 0.76);
      font-size: 18px;
    }

    .timeline-details {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 30px;
    }

    .detail {
      min-height: 110px;
      padding: 16px;
      border-left: 3px solid var(--gold);
      background: rgba(255, 255, 255, 0.48);
    }

    .detail span {
      display: block;
      margin-bottom: 5px;
      color: var(--stone);
      font-size: 12px;
      font-weight: 900;
    }

    .detail strong {
      display: block;
      line-height: 1.42;
    }

    .characters {
      background: linear-gradient(180deg, #ecefea, #f2f0ea);
    }

    .character-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 16px;
    }

    .character-card {
      min-height: 278px;
      padding: 22px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(237, 233, 219, 0.54)),
        rgba(255, 255, 255, 0.58);
    }

    .character-card .role {
      color: var(--rust);
      font-size: 12px;
      font-weight: 900;
    }

    .character-card h3 {
      margin: 8px 0 8px;
      font-size: 24px;
      line-height: 1.18;
    }

    .character-card p {
      margin-bottom: 16px;
      color: rgba(32, 31, 26, 0.72);
    }

    .trait {
      display: inline-flex;
      align-items: center;
      min-height: 30px;
      padding: 0 10px;
      border-radius: 999px;
      color: #f7f1e5;
      background: var(--deep);
      font-size: 12px;
      font-weight: 800;
    }

    .relic-section {
      background:
        linear-gradient(90deg, rgba(167, 78, 53, 0.1), transparent 30%),
        linear-gradient(180deg, #f1efe6, #e3e6dc);
    }

    .relic-grid {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 14px;
    }

    .relic {
      position: relative;
      overflow: hidden;
      min-height: 172px;
      padding: 18px;
      background: rgba(255, 255, 255, 0.5);
    }

    .relic::after {
      content: "";
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 10px;
      height: 30px;
      pointer-events: none;
      background: var(--ornament-star) center / 100% auto no-repeat;
      opacity: 0.28;
    }

    .relic > * {
      position: relative;
      z-index: 1;
    }

    .relic .mark {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      margin-bottom: 18px;
      border-radius: 50%;
      color: #fff8e7;
      background: var(--rust);
      font-family: "Georgia", "Times New Roman", serif;
      font-weight: 800;
    }

    .relic h3 {
      margin-bottom: 8px;
      font-size: 19px;
    }

    .relic p {
      margin: 0;
      color: rgba(32, 31, 26, 0.7);
      font-size: 14px;
    }

    .closing {
      color: #f8f4e7;
      background:
        linear-gradient(135deg, rgba(32, 31, 26, 0.95), rgba(53, 95, 75, 0.95)),
        radial-gradient(circle at 70% 20%, rgba(196, 154, 73, 0.22), transparent 32%);
    }

    .closing .section-inner {
      display: grid;
      grid-template-columns: 1fr 0.8fr;
      gap: 48px;
      align-items: end;
    }

    .closing .section-kicker {
      color: #d7b45c;
    }

    .closing .section-lead {
      color: rgba(248, 244, 231, 0.78);
    }

    .closing-note {
      position: relative;
      overflow: hidden;
      padding: 26px;
      border: 1px solid rgba(248, 244, 231, 0.2);
      border-radius: var(--radius);
      background: rgba(248, 244, 231, 0.08);
    }

    .closing-note p {
      margin-bottom: 0;
      color: rgba(248, 244, 231, 0.82);
      font-size: 18px;
    }

    footer {
      padding: 30px 0;
      color: rgba(248, 244, 231, 0.62);
      background: #171611;
      font-size: 13px;
    }

    footer .section-inner {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    @media (max-width: 980px) {
      .site-nav {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;
        padding: 14px 20px;
      }

      .nav-links {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 2px;
      }

      .hero {
        min-height: 84svh;
      }

      .hero-inner,
      .section-inner {
        width: min(100% - 32px, 760px);
      }

      .hero-ledger,
      .premise-grid,
      .map-layout,
      .timeline-wrap,
      .closing .section-inner {
        grid-template-columns: 1fr;
      }

      .seal-panel {
        position: relative;
        top: auto;
        min-height: 0;
      }

      .region-grid,
      .character-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .relic-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .site-nav {
        min-height: 0;
      }

      .nav-links {
        gap: 14px;
        font-size: 13px;
      }

      .hero::before {
        background-image:
          linear-gradient(180deg, rgba(18, 25, 21, 0.9) 0%, rgba(18, 25, 21, 0.62) 58%, rgba(18, 25, 21, 0.86) 100%),
          var(--map-image);
        background-position: center top;
      }

      .hero-inner {
        padding: 62px 0 38px;
      }

      .hero-inner::after {
        width: min(360px, 82vw);
        height: 38px;
        bottom: 12px;
        opacity: 0.46;
      }

      .hero-actions {
        align-items: stretch;
        flex-direction: column;
      }

      .button {
        width: 100%;
      }

      .hero-ledger,
      .brief-card,
      .timeline-details,
      .region-grid,
      .character-grid,
      .relic-grid {
        grid-template-columns: 1fr;
      }

      .brief-card {
        gap: 8px;
      }

      section {
        padding: 66px 0;
      }

      .timeline-panel {
        padding: 24px;
      }

      footer .section-inner {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <nav class="site-nav" aria-label="주요 이동">
    <a class="brand" href="#top" aria-label="듀란일대기 홈">
      듀란일대기
      <small>죽지 않는 기사 전사편</small>
    </a>
    <div class="nav-links">
      <a href="#premise">기획</a>
      <a href="#map">세계도</a>
      <a href="#timeline">연표</a>
      <a href="#characters">인물</a>
      <a href="#relics">사물</a>
    </div>
  </nav>

  <header class="hero" id="top">
    <div class="hero-inner">
      <p class="eyebrow">Arcadia Chronicle 5083</p>
      <h1>듀란일대기</h1>
      <p class="hero-copy">아직 누구도 그를 죽지 않는 기사라 부르지 않았다. 불탄 마을에서 살아 나온 아이, Fairbourne Hardwin Duran은 오늘도 묻는다. 내가 살아남은 이유가 정말 어딘가에 있을까.</p>
      <div class="hero-actions" aria-label="빠른 이동">
        <a class="button primary" href="#timeline">5083년으로</a>
        <a class="button" href="#map">Arcadia 세계도</a>
      </div>
      <div class="hero-ledger" aria-label="핵심 설정">
        <div class="ledger-item">
          <span>기준 현재</span>
          <strong>에덴포르트 서력 5083년</strong>
        </div>
        <div class="ledger-item">
          <span>무대</span>
          <strong>티리스 서부와 노르가드 접경</strong>
        </div>
        <div class="ledger-item">
          <span>출발점</span>
          <strong>듀란의 첫 전투</strong>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section id="premise" aria-labelledby="premise-title">
      <div class="section-inner premise-grid">
        <aside class="seal-panel">
          <div class="seal-mark" aria-hidden="true">D</div>
          <p class="section-kicker">Before The Legend</p>
          <h2 id="premise-title" class="section-title">전설은 아직 멀고, 듀란은 먼저 자기 이름을 배운다.</h2>
          <p>이 문은 승리의 노래보다 조용한 장면에서 열린다. 젖은 장갑, 회색 지붕, 빈 이름칸, 그리고 끝내 말하지 못한 어른들의 얼굴. 듀란의 이야기는 그런 것들을 잊지 않으려는 마음에서 시작된다.</p>
        </aside>

        <div class="brief-list">
          <article class="brief-card">
            <b>01</b>
            <div>
              <h3>아르카디아는 사람들이 입에 올리는 세계다</h3>
              <p>학자들은 별과 지도를 Vireth라 적지만, 듀란이 듣고 자란 이름은 Arcadia다. 에덴포르트의 들, 발드라크의 냉기, 미스테리아의 숲, 그리고 안개 너머의 바다까지.</p>
            </div>
          </article>
          <article class="brief-card">
            <b>02</b>
            <div>
              <h3>전투보다 먼저, 빈칸이 있었다</h3>
              <p>5068년 Greenhollow가 무너지고, 5069년 Newhollow의 명부가 열린다. 그 마지막 줄에 듀란의 이름이 올라가지만, 부모 이름 칸은 오래 비어 있었다.</p>
            </div>
          </article>
          <article class="brief-card">
            <b>03</b>
            <div>
              <h3>검보다 먼저 움직인 것은 문장이었다</h3>
              <p>국경은 칼끝보다 종이에 먼저 그어진다. 조서와 판결문, 세금일과 절기표가 사람을 몰아내고, Newhollow는 이름패와 갈라진 종으로 다른 기억을 남긴다.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="map-section" id="map" aria-labelledby="map-title">
      <div class="section-inner">
        <p class="section-kicker">Arcadia Classic World Map</p>
        <h2 id="map-title" class="section-title">오래된 지도는 아직 꺼지지 않은 불씨를 품고 있다.</h2>
        <p class="section-lead">이 지도에서는 바다의 거리보다 사람들의 소문과 두려움이 더 크게 보인다. 이야기는 Edenfort 서쪽 끝, 티리스와 노르가드가 맞닿은 Ravenstone과 Newhollow의 진흙 위에 첫 발을 딛는다.</p>
        <div class="map-layout">
          <figure class="map-frame">
            <img src="${mapSrc}" alt="Arcadia 고전 세계도: Valdrak, Edenfort, Mysteria와 주변 지역이 표시된 판타지 지도">
          </figure>
          <div class="region-grid" aria-label="주요 지역">
            <article class="region">
              <span>Central Stage</span>
              <h3>Edenfort</h3>
              <p>밀밭과 법정, 기사와 서기관이 함께 숨 쉬는 땅. 듀란이 첫 피의 아침을 맞을 무대.</p>
            </article>
            <article class="region">
              <span>Conflict</span>
              <h3>Tiris & Norgard</h3>
              <p>녹색 여신의 들과 바다의 군항이 마주 본다. 두 나라의 명분은 Greenhollow에서 불이 된다.</p>
            </article>
            <article class="region">
              <span>Border Memory</span>
              <h3>Ravenstone</h3>
              <p>성벽은 피난민을 받아들이고, 문장은 그들을 낮춘다. 보호와 의심이 같은 복도에 선다.</p>
            </article>
            <article class="region">
              <span>Low Archive</span>
              <h3>Newhollow</h3>
              <p>회색 지붕 아래에서 사람들은 다시 날짜를 세운다. 이름패와 물 한 바가지가 법보다 오래 간다.</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="timeline" aria-labelledby="timeline-title">
      <div class="section-inner">
        <p class="section-kicker">Chronicle Spine</p>
        <h2 id="timeline-title" class="section-title">불탄 마을에서 첫 전투 전날 밤까지.</h2>
        <p class="section-lead">이 연표는 왕들이 자랑하는 승전 기록이 아니다. 한 아이가 자기 이름을 다시 듣고, 넘어지고, 다시 일어서는 동안 Newhollow가 사라진 이들의 이름을 더듬는 시간이다.</p>
        <div class="timeline-wrap">
          <div class="year-buttons" role="tablist" aria-label="주요 연도">
            <button class="year-button" type="button" role="tab" aria-selected="true" data-year="5068"><span>5068</span>Greenhollow 함락</button>
            <button class="year-button" type="button" role="tab" aria-selected="false" data-year="5069"><span>5069</span>재정착의 해</button>
            <button class="year-button" type="button" role="tab" aria-selected="false" data-year="5072"><span>5072</span>첫 훈련</button>
            <button class="year-button" type="button" role="tab" aria-selected="false" data-year="5077"><span>5077</span>독본의 첫 글자</button>
            <button class="year-button" type="button" role="tab" aria-selected="false" data-year="5081"><span>5081</span>폭풍과 구조</button>
            <button class="year-button" type="button" role="tab" aria-selected="false" data-year="5083"><span>5083</span>첫 전투</button>
          </div>
          <article class="timeline-panel" aria-live="polite">
            <div class="year" data-timeline-year>5068</div>
            <h3 data-timeline-title>Greenhollow 함락</h3>
            <p data-timeline-copy>안개가 아직 지붕에 걸려 있던 새벽, 노르가드가 Greenhollow를 덮친다. Harrowmont는 성벽보다 사람을 먼저 고르고, 불타는 집에서 두 살의 듀란을 끌어안고 나온다.</p>
            <div class="timeline-details">
              <div class="detail">
                <span>장소</span>
                <strong data-timeline-place>Greenhollow</strong>
              </div>
              <div class="detail">
                <span>기억</span>
                <strong data-timeline-memory>갈라진 비상 종</strong>
              </div>
              <div class="detail">
                <span>결과</span>
                <strong data-timeline-result>Harrowmont 몰락, Newhollow의 기원</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="characters" id="characters" aria-labelledby="characters-title">
      <div class="section-inner">
        <p class="section-kicker">Character Architecture</p>
        <h2 id="characters-title" class="section-title">이 사람들은 선과 악으로 딱 잘라지지 않는다.</h2>
        <p class="section-lead">듀란은 강해서 살아남은 아이가 아니다. 넘어질 때마다 다시 손을 짚은 아이이고, 곁의 사람들은 그에게 검보다 먼저 기억의 무게를 건넨다.</p>
        <div class="character-grid">
          <article class="character-card">
            <span class="role">죽지 않는 기사</span>
            <h3>Fairbourne Hardwin Duran</h3>
            <p>17세. Greenhollow 출신 고아. 그는 누구의 피인지보다, 왜 자신만 숨이 남았는지를 더 오래 묻는다.</p>
            <span class="trait">기록과 생존</span>
          </article>
          <article class="character-card">
            <span class="role">몰락한 영주</span>
            <h3>Blackwood Aldric Harrowmont</h3>
            <p>성을 버리고 사람을 택한 기사. 듀란에게 검보다 먼저, 넘어질 때 손을 짚는 법을 가르친다.</p>
            <span class="trait">생존 윤리</span>
          </article>
          <article class="character-card">
            <span class="role">Ravenstone 영주</span>
            <h3>Greylock Bertrand Valemont</h3>
            <p>이익을 셈하지만 완전히 차갑지는 않다. 그는 피난민을 들이면서도, 그들의 이름 옆에 따로 표식을 남긴다.</p>
            <span class="trait">정치적 긴장</span>
          </article>
          <article class="character-card">
            <span class="role">Harrowmont의 집</span>
            <h3>Lady Elowen Harrowmont</h3>
            <p>넘어진 아이에게 다시 물을 채워 주는 사람. 그녀의 침묵은 기도보다 오래 남는다.</p>
            <span class="trait">낮은 돌봄</span>
          </article>
          <article class="character-card">
            <span class="role">기억 보관자</span>
            <h3>Marta Greave</h3>
            <p>이름 없는 죽은 이를 누군가의 아이로 적는다. 아무도 완전히 사라지지 않게 하는 손.</p>
            <span class="trait">이름패</span>
          </article>
          <article class="character-card">
            <span class="role">Sunspire 서기관</span>
            <h3>Irene Vale</h3>
            <p>낡은 독본을 남기고 떠난 서기관. 장부의 숫자와 실제 굶주림 사이의 틈을 본다.</p>
            <span class="trait">글자의 씨앗</span>
          </article>
          <article class="character-card">
            <span class="role">노르가드 문관</span>
            <h3>Maelor Casken</h3>
            <p>칼을 들지 않고도 전쟁을 시작하는 사람. 그의 문장은 성벽보다 먼저 국경을 넘어간다.</p>
            <span class="trait">검은 조서</span>
          </article>
          <article class="character-card">
            <span class="role">현장 지휘관</span>
            <h3>Admiral Rorik Vane</h3>
            <p>Greenhollow 작전의 군사 책임자. 명령서의 문장과 불타는 새벽 사이에 서 있다.</p>
            <span class="trait">침공의 손</span>
          </article>
        </div>
      </div>
    </section>

    <section class="relic-section" id="relics" aria-labelledby="relics-title">
      <div class="section-inner">
        <p class="section-kicker">Low Relics</p>
        <h2 id="relics-title" class="section-title">작은 물건들이 오래도록 말을 건다.</h2>
        <p class="section-lead">큰 예언보다 오래 남는 것은 손에 잡히는 것들이다. 갈라진 종, 녹색 천, 단추 하나, 낡은 독본. 듀란은 그 사물들 사이에서 자기 이야기를 조금씩 배운다.</p>
        <div class="relic-grid">
          <article class="relic">
            <div class="mark">I</div>
            <h3>갈라진 종</h3>
            <p>세 번 울린 뒤 갈라진 소리만 남긴 경보.</p>
          </article>
          <article class="relic">
            <div class="mark">II</div>
            <h3>녹색 천</h3>
            <p>옷 안쪽에 숨어 있던 어머니의 빛.</p>
          </article>
          <article class="relic">
            <div class="mark">III</div>
            <h3>물고기 비늘 단추</h3>
            <p>아이의 손에 든 작은 증거, 그리고 위험.</p>
          </article>
          <article class="relic">
            <div class="mark">IV</div>
            <h3>이름패</h3>
            <p>무명으로 사라지지 않게 붙드는 나무 조각.</p>
          </article>
          <article class="relic">
            <div class="mark">V</div>
            <h3>낡은 독본</h3>
            <p>검보다 먼저 듀란의 손에 들어온 글자.</p>
          </article>
          <article class="relic">
            <div class="mark">VI</div>
            <h3>마지막 씨앗</h3>
            <p>고향에서 건너온 생명, 돌아갈 수 없음의 증거.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="closing" aria-labelledby="closing-title">
      <div class="section-inner">
        <div>
          <p class="section-kicker">Homepage Concept</p>
          <h2 id="closing-title" class="section-title">죽지 않는 기사라는 이름은 아직 문밖에 서 있다.</h2>
          <p class="section-lead">이 홈페이지는 독자를 세계관의 벽 앞에 세워 두지 않는다. 지도 한 장, 연표 몇 줄, 작은 사물들의 빛을 따라 첫 전투 전날 밤까지 천천히 데려간다.</p>
        </div>
        <aside class="closing-note">
          <p>Arcadia의 신화는 왕들의 입에서 전쟁의 명분이 되고, Newhollow의 기억은 이름패와 물 나눔의 규례가 된다. 그 사이에서 듀란은 아직 전설이 아니다. 다만 잊히지 않으려는 한 사람이다.</p>
        </aside>
      </div>
    </section>
  </main>

  <footer>
    <div class="section-inner">
      <span>듀란일대기 홈페이지 기획 디자인 시안</span>
      <span>Arcadia / Edenfort / Newhollow / 5083</span>
    </div>
  </footer>

  <script>
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView();
      });
    }

    const timeline = {
      "5068": {
        title: "Greenhollow 함락",
        copy: "안개가 아직 지붕에 걸려 있던 새벽, 노르가드가 Greenhollow를 덮친다. Harrowmont는 성벽보다 사람을 먼저 고르고, 불타는 집에서 두 살의 듀란을 끌어안고 나온다.",
        place: "Greenhollow",
        memory: "갈라진 비상 종",
        result: "Harrowmont 몰락, Newhollow의 기원"
      },
      "5069": {
        title: "재정착의 해",
        copy: "피난민 명부가 작성된다. Greenhollow 출신은 Ravenstone 기록에서 따로 표시되고, Harrowmont는 마지막 줄에 듀란의 이름을 조용히 올린다.",
        place: "Newhollow 공동 창고",
        memory: "부모 이름 칸의 빈칸",
        result: "행정 편의가 차별의 도구가 됨"
      },
      "5072": {
        title: "첫 훈련의 해",
        copy: "듀란은 나무막대를 들고 균형 잡는 법을 배운다. 그는 자주 넘어지고, Harrowmont는 꾸짖는 대신 넘어질 때 손을 짚는 법부터 가르친다.",
        place: "Ravenstone 훈련장",
        memory: "첫 나무검과 물동이",
        result: "반복해서 일어나는 몸의 기억"
      },
      "5077": {
        title: "독본의 첫 글자",
        copy: "Sunspire의 Irene Vale이 Newhollow 실태를 보러 온다. 그녀는 듀란에게 작은 낡은 독본을 남기고, 듀란은 검보다 먼저 글자에 마음을 빼앗긴다.",
        place: "Harrowmont 거처",
        memory: "낡은 독본",
        result: "기록 의식의 씨앗"
      },
      "5081": {
        title: "폭풍과 구조",
        copy: "훈련 중 폭풍이 몰아치고, 듀란은 어린 훈련생을 날아오는 장비에서 밀쳐 낸다. Valemont는 처음으로 그의 유약함 뒤에 숨은 충성심과 용기를 본다.",
        place: "Ravenstone",
        memory: "폭풍 속 장비",
        result: "인정이 호의가 아니라 계산으로 바뀜"
      },
      "5083": {
        title: "첫 전투",
        copy: "듀란은 Harrowmont의 종기사로 첫 전투에 나간다. 그날 이후 죽음과 생존의 의미가 뒤틀리고, 죽지 않는 기사라는 이름이 문틈으로 들어오기 시작한다.",
        place: "티리스와 노르가드 접경",
        memory: "녹색 덧댐과 종기사 명부",
        result: "본편 개시"
      }
    };

    const buttons = document.querySelectorAll("[data-year]");
    const year = document.querySelector("[data-timeline-year]");
    const title = document.querySelector("[data-timeline-title]");
    const copy = document.querySelector("[data-timeline-copy]");
    const place = document.querySelector("[data-timeline-place]");
    const memory = document.querySelector("[data-timeline-memory]");
    const result = document.querySelector("[data-timeline-result]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const item = timeline[button.dataset.year];
        buttons.forEach((entry) => entry.setAttribute("aria-selected", String(entry === button)));
        year.textContent = button.dataset.year;
        title.textContent = item.title;
        copy.textContent = item.copy;
        place.textContent = item.place;
        memory.textContent = item.memory;
        result.textContent = item.result;
      });
    });
  </script>
</body>
</html>`;
}

function normalizeAssetBase(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\/+$/, "");
}

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
