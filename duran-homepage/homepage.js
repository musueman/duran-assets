import { manuscript } from "./manuscript-data.js";

export function renderDuranHomePage(options = {}) {
  const assetBase = normalizeAssetBase(options.assetBase);
  const assetPrefix = normalizeAssetBase(options.assetPrefix ?? (assetBase ? `${assetBase}/assets` : "/assets"));
  const mapSrc = escapeAttr(options.mapSrc || `${assetPrefix}/arcadia-map.png`);
  const ornamentHero = escapeAttr(`${assetPrefix}/ornament-hero-flourish.png`);
  const ornamentScroll = escapeAttr(`${assetPrefix}/ornament-scroll-band.png`);
  const ornamentLeaf = escapeAttr(`${assetPrefix}/ornament-leaf-band.png`);
  const ornamentThin = escapeAttr(`${assetPrefix}/ornament-thin-chain.png`);
  const ornamentStar = escapeAttr(`${assetPrefix}/ornament-star-chain.png`);
  const initialHash = escapeJsString(options.initialHash || "");
  const chapters = manuscript.chapters;
  const primaryChapters = chapters.filter((chapter) => /^book-\d+/.test(chapter.id));
  const greenhollow = chapters.find((chapter) => chapter.id === "book-10") || primaryChapters[9] || chapters[0];
  const firstBattle = chapters.find((chapter) => chapter.id === "book-16") || primaryChapters.at(-1) || chapters.at(-1);
  const sectionCount = manuscript.stats.sections;
  const verseCount = countBlocks("verse");
  const paginated = paginateManuscript(chapters);
  const readerPages = paginated.pages;
  const tocChapters = paginated.tocChapters;

  return String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="듀란일대기: 죽지 않는 기사 전사편과 아르카디아 원초기 원고 뷰어">
  <title>듀란일대기 | 아르카디아 원초기 뷰어</title>
  <style>
    :root {
      --map-image: url("${mapSrc}");
      --ornament-hero: url("${ornamentHero}");
      --ornament-scroll: url("${ornamentScroll}");
      --ornament-leaf: url("${ornamentLeaf}");
      --ornament-thin: url("${ornamentThin}");
      --ornament-star: url("${ornamentStar}");
      --night: #0e1110;
      --night-2: #171d18;
      --pine: #20382e;
      --moss: #41684f;
      --verdigris: #6c8d72;
      --blood: #8f4538;
      --ember: #b85d3f;
      --gold: #d4af63;
      --old-gold: #a98238;
      --paper: #efe3c6;
      --paper-2: #d9c397;
      --ink: #231b12;
      --muted-ink: rgba(35, 27, 18, 0.72);
      --pale: #f9efd8;
      --line-dark: rgba(255, 231, 178, 0.18);
      --line-paper: rgba(75, 49, 23, 0.18);
      --shadow: 0 30px 90px rgba(0, 0, 0, 0.38);
      --radius: 8px;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      color: var(--pale);
      background:
        radial-gradient(circle at 18% 8%, rgba(212, 175, 99, 0.2), transparent 30%),
        radial-gradient(circle at 82% 18%, rgba(143, 69, 56, 0.16), transparent 28%),
        linear-gradient(180deg, #101411 0%, #171d18 36%, #efe3c6 36%, #efe3c6 100%);
      font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "Segoe UI", sans-serif;
      line-height: 1.68;
      word-break: keep-all;
      overflow-wrap: break-word;
    }

    body::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -2;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 238, 198, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 238, 198, 0.025) 1px, transparent 1px);
      background-size: 38px 38px;
      mask-image: linear-gradient(180deg, black, transparent 72%);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      display: block;
      max-width: 100%;
    }

    button,
    input {
      font: inherit;
    }

    .skip-link {
      position: fixed;
      left: 16px;
      top: 16px;
      z-index: 100;
      padding: 10px 14px;
      color: var(--ink);
      background: var(--gold);
      transform: translateY(-160%);
    }

    .skip-link:focus {
      transform: translateY(0);
    }

    .site-nav {
      position: sticky;
      top: 0;
      z-index: 30;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      min-height: 66px;
      padding: 0 clamp(18px, 4vw, 46px);
      background: rgba(14, 17, 16, 0.88);
      border-bottom: 1px solid var(--line-dark);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: inline-grid;
      gap: 1px;
      width: fit-content;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: 0;
    }

    .brand small {
      color: rgba(249, 239, 216, 0.64);
      font-size: 12px;
      font-weight: 700;
    }

    .nav-links {
      display: flex;
      gap: 20px;
      align-items: center;
      color: rgba(249, 239, 216, 0.78);
      font-size: 14px;
      font-weight: 800;
    }

    .nav-links a {
      padding: 20px 0 18px;
      border-bottom: 2px solid transparent;
    }

    .nav-links a:hover,
    .nav-links a:focus-visible {
      color: #fff7e6;
      border-color: var(--gold);
      outline: none;
    }

    .hero {
      position: relative;
      display: grid;
      min-height: calc(100svh - 66px);
      overflow: hidden;
      isolation: isolate;
      background: #0c100d;
    }

    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -3;
      background-image:
        linear-gradient(90deg, rgba(9, 12, 10, 0.93), rgba(9, 12, 10, 0.62) 44%, rgba(9, 12, 10, 0.2)),
        linear-gradient(180deg, rgba(9, 12, 10, 0.18), rgba(9, 12, 10, 0.9)),
        var(--map-image);
      background-size: cover;
      background-position: center;
      transform: scale(1.03);
    }

    .hero::after {
      content: "";
      position: absolute;
      inset: auto 0 0;
      height: 28%;
      z-index: -2;
      background: linear-gradient(180deg, transparent, rgba(16, 20, 17, 0.96));
    }

    .hero-inner {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 0.96fr) minmax(340px, 0.64fr);
      gap: clamp(28px, 5vw, 70px);
      align-items: end;
      width: min(1220px, calc(100% - 48px));
      margin: 0 auto;
      padding: clamp(72px, 10vw, 132px) 0 58px;
    }

    .eyebrow {
      display: inline-flex;
      gap: 12px;
      align-items: center;
      margin: 0 0 20px;
      color: #f0ce77;
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
    }

    .eyebrow::before {
      content: "";
      width: 42px;
      height: 2px;
      background: currentColor;
    }

    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }

    h1,
    h2,
    .chapter-title {
      font-family: Georgia, "Times New Roman", "Apple SD Gothic Neo", "Malgun Gothic", serif;
      letter-spacing: 0;
    }

    h1 {
      max-width: 830px;
      margin-bottom: 22px;
      color: #fff3d5;
      font-size: clamp(54px, 8vw, 116px);
      line-height: 0.92;
      font-weight: 900;
      white-space: nowrap;
      text-shadow: 0 22px 50px rgba(0, 0, 0, 0.46);
    }

    .hero-copy {
      max-width: 780px;
      margin-bottom: 32px;
      color: rgba(249, 239, 216, 0.86);
      font-size: clamp(18px, 2vw, 24px);
      line-height: 1.62;
    }

    .hero-actions,
    .reader-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

    .button,
    .icon-button,
    .chapter-jump {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      border: 1px solid rgba(249, 239, 216, 0.22);
      border-radius: var(--radius);
      color: var(--pale);
      background: rgba(249, 239, 216, 0.08);
      cursor: pointer;
      transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
    }

    .button {
      min-width: 154px;
      padding: 0 18px;
      font-weight: 900;
    }

    .button.primary {
      color: #1f180d;
      border-color: transparent;
      background: linear-gradient(135deg, #f4d988, #bd8940);
      box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28);
    }

    .button:hover,
    .button:focus-visible,
    .icon-button:hover,
    .icon-button:focus-visible,
    .chapter-jump:hover,
    .chapter-jump:focus-visible {
      transform: translateY(-1px);
      border-color: rgba(244, 217, 136, 0.74);
      outline: none;
    }

    .hero-codex {
      position: relative;
      min-height: 460px;
      padding: 28px;
      align-self: center;
      color: var(--ink);
      background:
        linear-gradient(145deg, rgba(239, 227, 198, 0.96), rgba(194, 160, 100, 0.86)),
        linear-gradient(90deg, rgba(143, 69, 56, 0.16), transparent);
      border: 1px solid rgba(249, 239, 216, 0.34);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .hero-codex::before,
    .hero-codex::after {
      content: "";
      position: absolute;
      left: 24px;
      right: 24px;
      height: 54px;
      pointer-events: none;
      background: var(--ornament-scroll) center / 100% auto no-repeat;
      opacity: 0.48;
    }

    .hero-codex::before {
      top: 18px;
    }

    .hero-codex::after {
      bottom: 18px;
      transform: rotate(180deg);
    }

    .codex-mark {
      position: relative;
      display: grid;
      place-items: center;
      width: 96px;
      height: 96px;
      margin: 58px 0 54px;
      color: #51391d;
      border: 1px solid rgba(81, 57, 29, 0.28);
      border-radius: 50%;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 42px;
      font-weight: 900;
    }

    .hero-codex h2 {
      margin-bottom: 14px;
      font-size: clamp(30px, 4vw, 48px);
      line-height: 1.05;
    }

    .hero-codex p {
      color: rgba(35, 27, 18, 0.76);
      font-weight: 650;
    }

    .codex-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 28px;
    }

    .codex-stats span {
      display: grid;
      gap: 2px;
      min-height: 76px;
      padding: 12px;
      border: 1px solid rgba(81, 57, 29, 0.15);
      background: rgba(255, 248, 226, 0.36);
    }

    .codex-stats b {
      font-size: 22px;
      line-height: 1;
    }

    .codex-stats small {
      color: rgba(35, 27, 18, 0.62);
      font-size: 12px;
      font-weight: 900;
    }

    main {
      overflow: hidden;
      background:
        linear-gradient(180deg, #111712 0, #182018 150px, var(--paper) 150px, var(--paper) 100%);
    }

    section {
      padding: 92px 0;
    }

    .section-inner {
      width: min(1220px, calc(100% - 48px));
      margin: 0 auto;
    }

    .section-kicker {
      margin-bottom: 11px;
      color: var(--old-gold);
      font-size: 13px;
      font-weight: 1000;
      text-transform: uppercase;
    }

    .section-title {
      max-width: 850px;
      margin-bottom: 18px;
      color: var(--ink);
      font-size: clamp(36px, 5vw, 72px);
      line-height: 1.02;
      font-weight: 900;
    }

    .section-title::after {
      content: "";
      display: block;
      width: min(410px, 78vw);
      height: 30px;
      margin-top: 18px;
      background: var(--ornament-thin) left center / contain no-repeat;
      opacity: 0.66;
    }

    .section-lead {
      max-width: 850px;
      margin-bottom: 42px;
      color: rgba(35, 27, 18, 0.72);
      font-size: 18px;
    }

    .overview {
      color: var(--ink);
      background:
        linear-gradient(90deg, rgba(143, 69, 56, 0.1), transparent 34%),
        linear-gradient(180deg, #efe3c6, #e7d7b0);
    }

    .overview-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: 34px;
      align-items: stretch;
    }

    .map-panel {
      position: relative;
      min-height: 520px;
      overflow: hidden;
      border: 1px solid rgba(75, 49, 23, 0.2);
      border-radius: var(--radius);
      background: #101411;
      box-shadow: 0 28px 68px rgba(35, 27, 18, 0.18);
    }

    .map-panel img {
      width: 100%;
      height: 100%;
      min-height: 520px;
      object-fit: cover;
      filter: saturate(0.9) contrast(1.04);
    }

    .map-caption {
      position: absolute;
      left: 22px;
      right: 22px;
      bottom: 22px;
      padding: 18px 20px;
      color: var(--pale);
      background: rgba(14, 17, 16, 0.82);
      border: 1px solid rgba(249, 239, 216, 0.18);
      backdrop-filter: blur(14px);
    }

    .map-caption strong {
      display: block;
      margin-bottom: 5px;
      color: #f0ce77;
      font-size: 13px;
    }

    .map-caption p {
      margin: 0;
      color: rgba(249, 239, 216, 0.82);
    }

    .brief-grid {
      display: grid;
      gap: 14px;
    }

    .brief-card {
      display: grid;
      grid-template-columns: 72px 1fr;
      gap: 18px;
      align-items: start;
      min-height: 156px;
      padding: 22px;
      color: var(--ink);
      border: 1px solid rgba(75, 49, 23, 0.18);
      border-radius: var(--radius);
      background: rgba(255, 248, 226, 0.56);
      box-shadow: 0 14px 32px rgba(35, 27, 18, 0.08);
    }

    .brief-card b {
      display: grid;
      place-items: center;
      width: 58px;
      height: 58px;
      color: #fff2d3;
      background: var(--pine);
      border-radius: 50%;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 20px;
    }

    .brief-card h3 {
      margin-bottom: 7px;
      font-size: 24px;
      line-height: 1.2;
    }

    .brief-card p {
      margin-bottom: 0;
      color: rgba(35, 27, 18, 0.72);
    }

    .reader-section {
      padding-top: 100px;
      color: var(--pale);
      background:
        radial-gradient(circle at 72% 4%, rgba(184, 93, 63, 0.17), transparent 30%),
        linear-gradient(180deg, #111712, #1e261d 46%, #111712);
    }

    .reader-section .section-title {
      color: #fff3d5;
    }

    .reader-section .section-title::after {
      filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.34));
      opacity: 0.82;
    }

    .reader-section .section-lead {
      color: rgba(249, 239, 216, 0.76);
    }

    .reader-shell {
      display: grid;
      grid-template-columns: 330px minmax(0, 1fr);
      gap: 24px;
      align-items: start;
    }

    .reader-toc {
      position: sticky;
      top: 86px;
      max-height: calc(100svh - 110px);
      overflow: hidden;
      border: 1px solid var(--line-dark);
      border-radius: var(--radius);
      background: rgba(12, 15, 13, 0.78);
      box-shadow: var(--shadow);
    }

    .toc-head {
      padding: 18px;
      border-bottom: 1px solid var(--line-dark);
    }

    .toc-head label {
      display: block;
      margin-bottom: 9px;
      color: #f0ce77;
      font-size: 12px;
      font-weight: 1000;
      text-transform: uppercase;
    }

    .toc-search {
      width: 100%;
      min-height: 42px;
      padding: 0 12px;
      color: var(--pale);
      border: 1px solid rgba(249, 239, 216, 0.18);
      border-radius: var(--radius);
      background: rgba(249, 239, 216, 0.08);
      outline: none;
    }

    .toc-search:focus {
      border-color: rgba(244, 217, 136, 0.74);
    }

    .toc-count {
      margin: 10px 0 0;
      color: rgba(249, 239, 216, 0.56);
      font-size: 12px;
    }

    .toc-scroll {
      max-height: calc(100svh - 238px);
      overflow: auto;
      padding: 12px;
      scrollbar-color: var(--old-gold) rgba(255, 255, 255, 0.06);
    }

    .toc-chapter {
      border-bottom: 1px solid rgba(249, 239, 216, 0.08);
    }

    .toc-chapter:last-child {
      border-bottom: 0;
    }

    .chapter-jump {
      justify-content: space-between;
      width: 100%;
      min-height: 48px;
      padding: 0 10px;
      color: rgba(249, 239, 216, 0.88);
      border: 0;
      background: transparent;
      font-weight: 900;
      text-align: left;
    }

    .chapter-jump[aria-current="true"] {
      color: #1d160c;
      background: linear-gradient(135deg, #e9c979, #b8853e);
    }

    .chapter-jump small {
      color: inherit;
      opacity: 0.7;
      font-size: 11px;
    }

    .section-links {
      display: grid;
      gap: 2px;
      padding: 0 0 10px;
    }

    .section-link {
      display: block;
      padding: 7px 10px 7px 18px;
      color: rgba(249, 239, 216, 0.62);
      border-left: 2px solid transparent;
      font-size: 13px;
      line-height: 1.35;
    }

    .section-link:hover,
    .section-link:focus-visible,
    .section-link.active {
      color: #f8dd95;
      border-left-color: var(--gold);
      outline: none;
    }

    .toc-empty {
      display: none;
      padding: 18px 10px;
      color: rgba(249, 239, 216, 0.58);
      font-size: 13px;
    }

    .reader-main {
      min-width: 0;
    }

    .reader-toolbar {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 14px;
      align-items: center;
      margin-bottom: 18px;
      padding: 12px;
      border: 1px solid var(--line-dark);
      border-radius: var(--radius);
      background: rgba(12, 15, 13, 0.62);
    }

    .reader-progress {
      height: 6px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(249, 239, 216, 0.12);
    }

    .reader-progress span {
      display: block;
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, #e9c979, #b85d3f);
      transition: width 280ms ease;
    }

    .page-indicator {
      color: rgba(249, 239, 216, 0.7);
      font-size: 13px;
      font-weight: 900;
      white-space: nowrap;
    }

    .icon-button {
      width: 44px;
      padding: 0;
      font-size: 22px;
      line-height: 1;
    }

    .book-stage {
      position: relative;
      perspective: 1900px;
    }

    .book-stage::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 30px;
      z-index: 4;
      border-radius: 999px;
      background:
        linear-gradient(90deg, rgba(35, 27, 18, 0.42), rgba(255, 248, 226, 0.18), rgba(35, 27, 18, 0.36));
      box-shadow: 0 0 36px rgba(35, 27, 18, 0.28);
      transform: translateX(-50%);
      pointer-events: none;
    }

    .book-spread {
      display: none;
      position: relative;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      width: min(100%, 960px);
      margin: 0 auto;
      aspect-ratio: 1.48 / 1;
      color: var(--ink);
      filter: drop-shadow(0 36px 80px rgba(0, 0, 0, 0.38));
      transform-origin: center;
      transform-style: preserve-3d;
      scroll-margin-top: 92px;
    }

    .book-spread.active {
      display: grid;
    }

    .book-spread.enter-next {
      animation: pageInNext 520ms cubic-bezier(0.2, 0.72, 0.18, 1) both;
    }

    .book-spread.enter-prev {
      animation: pageInPrev 520ms cubic-bezier(0.2, 0.72, 0.18, 1) both;
    }

    @keyframes pageInNext {
      from { opacity: 0.35; transform: rotateY(-11deg) translateX(18px); filter: brightness(0.9); }
      to { opacity: 1; transform: rotateY(0) translateX(0); filter: brightness(1); }
    }

    @keyframes pageInPrev {
      from { opacity: 0.35; transform: rotateY(10deg) translateX(-16px); filter: brightness(0.92); }
      to { opacity: 1; transform: rotateY(0) translateX(0); filter: brightness(1); }
    }

    .paper-page {
      position: relative;
      min-width: 0;
      height: 100%;
      overflow: hidden;
      padding: clamp(22px, 2.2vw, 34px) clamp(20px, 2vw, 32px) clamp(32px, 2.4vw, 40px);
      border: 1px solid rgba(255, 247, 220, 0.24);
      background:
        radial-gradient(circle at 28% 8%, rgba(255, 255, 255, 0.38), transparent 33%),
        linear-gradient(90deg, rgba(75, 49, 23, 0.16), transparent 9%, transparent 91%, rgba(75, 49, 23, 0.12)),
        linear-gradient(180deg, #f5e9ca 0%, #e5d0a2 100%);
    }

    .paper-page.left {
      border-radius: 8px 0 0 8px;
      border-right-color: rgba(75, 49, 23, 0.18);
      box-shadow: inset -18px 0 28px rgba(75, 49, 23, 0.14);
    }

    .paper-page.right {
      border-radius: 0 8px 8px 0;
      border-left-color: rgba(255, 248, 226, 0.18);
      box-shadow: inset 18px 0 28px rgba(75, 49, 23, 0.1);
    }

    .paper-page.blank {
      background:
        linear-gradient(90deg, rgba(75, 49, 23, 0.12), transparent 10%),
        linear-gradient(180deg, #f1e0ba, #ddc495);
    }

    .paper-page::before,
    .paper-page::after {
      content: "";
      position: absolute;
      left: 22px;
      right: 22px;
      height: 22px;
      pointer-events: none;
      background: var(--ornament-leaf) center / 100% auto no-repeat;
      opacity: 0.22;
    }

    .paper-page::before {
      top: 12px;
    }

    .paper-page::after {
      bottom: 12px;
      transform: rotate(180deg);
    }

    .page-content {
      position: relative;
      z-index: 1;
      display: grid;
      align-content: start;
      gap: 8px;
      height: 100%;
    }

    .chapter-header {
      display: grid;
      gap: 10px;
      padding: 22px 0 14px;
      border-bottom: 1px solid var(--line-paper);
    }

    .chapter-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      color: var(--blood);
      font-size: 10px;
      font-weight: 1000;
      text-transform: uppercase;
    }

    .chapter-title {
      margin: 0;
      color: #25170c;
      font-size: clamp(28px, 3vw, 48px);
      line-height: 1.06;
    }

    .chapter-quote {
      margin: 0;
      color: rgba(35, 27, 18, 0.72);
      font-size: clamp(13px, 1.25vw, 16px);
      font-weight: 760;
      line-height: 1.55;
    }

    .chapter-quote::before {
      content: "“";
      color: var(--old-gold);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 26px;
      line-height: 0;
    }

    .chapter-lead {
      margin: 0;
      color: rgba(35, 27, 18, 0.72);
      font-size: clamp(12px, 1.08vw, 14px);
      line-height: 1.58;
    }

    .section-heading {
      display: flex;
      gap: 7px;
      align-items: baseline;
      margin: 8px 0 4px;
      color: #2a1d11;
      font-size: clamp(18px, 1.75vw, 26px);
      line-height: 1.22;
      scroll-margin-top: 94px;
    }

    .continued-heading {
      margin: 3px 0 2px;
      color: rgba(143, 69, 56, 0.72);
      font-size: 12px;
      font-weight: 900;
    }

    .anchor-link {
      color: rgba(143, 69, 56, 0.58);
      font-size: 13px;
      font-family: "Segoe UI", sans-serif;
      text-decoration: none;
    }

    .anchor-link:hover,
    .anchor-link:focus-visible {
      color: var(--blood);
      outline: none;
    }

    .paper-paragraph,
    .scripture-quote,
    .verse,
    .scripture-list {
      color: rgba(35, 27, 18, 0.8);
      font-size: clamp(12px, 1.05vw, 14.5px);
      line-height: 1.54;
    }

    .paper-paragraph {
      margin: 0;
    }

    .scripture-quote {
      margin: 0 0 2px;
      padding: 9px 11px;
      color: #3b2814;
      border-left: 3px solid var(--old-gold);
      background: rgba(255, 248, 226, 0.45);
      font-weight: 760;
    }

    .verse {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr);
      gap: 8px;
      align-items: start;
      margin: 0;
    }

    .verse-marker {
      display: inline-grid;
      place-items: center;
      width: 21px;
      height: 21px;
      margin-top: 1px;
      color: #fff6db;
      background: #3c2a17;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 900;
    }

    .scripture-list {
      margin: 0;
      padding-left: 19px;
    }

    .scripture-list li {
      margin-bottom: 4px;
    }

    .scripture-divider {
      width: min(260px, 80%);
      height: 24px;
      margin: 8px auto;
      background: var(--ornament-star) center / contain no-repeat;
      opacity: 0.42;
    }

    .page-number {
      position: absolute;
      right: 24px;
      bottom: 12px;
      z-index: 2;
      color: rgba(75, 49, 23, 0.48);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 12px;
      font-weight: 800;
    }

    .reader-footer {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      margin-top: 18px;
      color: rgba(249, 239, 216, 0.64);
      font-size: 13px;
    }

    .closing {
      color: var(--pale);
      background:
        linear-gradient(135deg, rgba(14, 17, 16, 0.96), rgba(32, 56, 46, 0.96)),
        var(--map-image) center / cover;
    }

    .closing .section-title {
      color: #fff3d5;
    }

    .closing .section-lead {
      color: rgba(249, 239, 216, 0.76);
    }

    footer {
      padding: 28px 0;
      color: rgba(249, 239, 216, 0.62);
      background: #0d100e;
      font-size: 13px;
    }

    footer .section-inner {
      display: flex;
      justify-content: space-between;
      gap: 18px;
    }

    [hidden] {
      display: none !important;
    }

    body.reader-focus .hero,
    body.reader-focus .overview {
      display: none;
    }

    body.reader-focus .reader-section {
      padding-top: 92px;
      min-height: calc(100svh - 66px);
    }

    @media (max-width: 1080px) {
      .hero-inner,
      .overview-grid,
      .reader-shell {
        grid-template-columns: 1fr;
      }

      .hero-codex {
        min-height: 0;
      }

      .reader-toc {
        position: relative;
        top: auto;
        max-height: none;
      }

      .toc-scroll {
        max-height: 420px;
      }
    }

    @media (max-width: 720px) {
      .site-nav {
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 14px 18px;
      }

      .nav-links {
        overflow-x: auto;
        gap: 15px;
      }

      .nav-links a {
        padding: 4px 0 8px;
        white-space: nowrap;
      }

      .hero-inner,
      .section-inner {
        width: min(100% - 32px, 720px);
      }

      .hero {
        min-height: auto;
      }

      .hero-inner {
        padding-top: 66px;
      }

      h1 {
        white-space: normal;
      }

      .codex-stats,
      .reader-toolbar {
        grid-template-columns: 1fr;
      }

      .overview,
      .reader-section,
      section {
        padding: 68px 0;
      }

      .brief-card {
        grid-template-columns: 1fr;
      }

      .map-panel,
      .map-panel img {
        min-height: 390px;
      }

      .book-stage::before {
        display: none;
      }

      .book-spread {
        grid-template-columns: 1fr;
        width: min(100%, 470px);
        gap: 12px;
        aspect-ratio: auto;
      }

      .paper-page {
        aspect-ratio: 0.707 / 1;
        height: auto;
        padding: 30px 22px 42px;
        border-radius: var(--radius);
      }

      .paper-page.left,
      .paper-page.right {
        border-radius: var(--radius);
        box-shadow: inset 0 0 22px rgba(75, 49, 23, 0.1);
      }

      .section-heading {
        align-items: flex-start;
        flex-direction: column;
      }

      .paper-paragraph,
      .scripture-quote,
      .verse,
      .scripture-list {
        font-size: 13px;
      }

      .verse {
        grid-template-columns: 23px minmax(0, 1fr);
        gap: 7px;
      }

      footer .section-inner,
      .reader-footer {
        flex-direction: column;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }

      *,
      *::before,
      *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
  </style>
</head>
<body>
  <a class="skip-link" href="#reader">원고 뷰어로 바로가기</a>
  <nav class="site-nav" aria-label="주요 이동">
    <a class="brand" href="#top" aria-label="듀란일대기 홈">
      듀란일대기
      <small>아르카디아 원초기</small>
    </a>
    <div class="nav-links">
      <a href="#overview">세계</a>
      <a href="#reader">원고 뷰어</a>
      <a href="#${greenhollow.id}">Greenhollow</a>
      <a href="#${firstBattle.id}">첫날</a>
    </div>
  </nav>

  <header class="hero" id="top">
    <div class="hero-inner">
      <div>
        <p class="eyebrow">Arcadia Chronicle · 5083</p>
        <h1>듀란일대기</h1>
        <p class="hero-copy">죽지 않는 기사라는 이름은 아직 오지 않았다. 이곳은 지도와 연표를 넘어, Fairbourne Hardwin Duran이 첫 전투의 문턱에 서기 전까지 세계가 어떤 언어로 그를 밀어 올렸는지 읽는 입구다.</p>
        <div class="hero-actions" aria-label="빠른 이동">
          <a class="button primary" href="#reader">원초기 펼치기</a>
          <a class="button" href="#overview">세계부터 보기</a>
        </div>
      </div>

      <aside class="hero-codex" aria-label="원고 요약">
        <div class="codex-mark" aria-hidden="true">D</div>
        <h2>아르카디아 원초기</h2>
        <p>세계의 시작, 나라들의 법정, Greenhollow의 불, Newhollow의 이름표, 그리고 죽지 않는 기사 첫날까지 이어지는 정전풍 단권본.</p>
        <div class="codex-stats">
          <span><b>${formatNumber(manuscript.stats.chapters)}</b><small>책장</small></span>
          <span><b>${formatNumber(sectionCount)}</b><small>앵커 절</small></span>
          <span><b>${formatNumber(verseCount)}</b><small>구절</small></span>
        </div>
      </aside>
    </div>
  </header>

  <main>
    <section class="overview" id="overview" aria-labelledby="overview-title">
      <div class="section-inner">
        <p class="section-kicker">World Entry</p>
        <h2 id="overview-title" class="section-title">아르카디아는 오래된 이름으로 세계를 기억한다.</h2>
        <p class="section-lead">흰 항성 아래에서 왕국들은 서로 다른 법과 기도를 세웠고, 숲의 불길은 Greenhollow의 이름을 재로 남겼다. 이 기록은 Duran이 전설이 되기 전, 그를 둘러싼 땅과 사람과 상실을 먼저 펼친다.</p>
        <div class="overview-grid">
          <figure class="map-panel">
            <img src="${mapSrc}" alt="Arcadia 고전 세계도">
            <figcaption class="map-caption">
              <strong>Arcadia / Vireth</strong>
              <p>Edenfort, Tiris, Norgard, Greenhollow. 이름들은 지도 위에 머물지 않고, 전쟁과 맹세와 잃어버린 혈통의 길로 이어진다.</p>
            </figcaption>
          </figure>
          <div class="brief-grid" aria-label="세계 소개">
            ${renderBriefCard("01", "흰 항성 아래의 세계", "아르카디아와 Vireth의 오래된 질서, 왕국들의 법, 사라진 이름들이 한 권의 정전풍 기록으로 묶인다.")}
            ${renderBriefCard("02", "Greenhollow의 불", "숲의 왕국이 무너지는 장면은 배경 사건이 아니다. 훗날 Duran을 밀어 올릴 상실과 증언의 중심에 놓인다.")}
            ${renderBriefCard("03", "죽지 않는 기사 이전의 아이", "이 이야기는 영웅의 완성에서 시작하지 않는다. Fairbourne Hardwin Duran이 첫 전투 앞에 서기까지의 긴 그림자를 따라간다.")}
          </div>
        </div>
      </div>
    </section>

    <section class="reader-section" id="reader" aria-labelledby="reader-title">
      <div class="section-inner">
        <p class="section-kicker">Manuscript Viewer</p>
        <h2 id="reader-title" class="section-title">아르카디아 원초기를 한 장씩 넘긴다.</h2>
        <p class="section-lead">왼쪽 목차에서 장과 절을 고르면 해당 대목이 펼쳐진다. 긴 원고는 책장 크기에 맞춰 나뉘고, 절마다 달린 앵커로 원하는 장면에 바로 닿을 수 있다.</p>
        <div class="reader-shell">
          <aside class="reader-toc" aria-label="원고 목차">
            <div class="toc-head">
              <label for="toc-search">목차 필터</label>
              <input class="toc-search" id="toc-search" type="search" placeholder="예: Greenhollow, Duran, 예언">
              <p class="toc-count" data-toc-count>${formatNumber(sectionCount)}개 절</p>
            </div>
            <div class="toc-scroll" data-toc-scroll>
              ${tocChapters.map(renderTocChapter).join("")}
              <p class="toc-empty" data-toc-empty>일치하는 절이 없습니다.</p>
            </div>
          </aside>

          <div class="reader-main">
            <div class="reader-toolbar" aria-label="책장 조작">
              <div class="reader-actions">
                <button class="icon-button" type="button" data-prev aria-label="이전 책장">‹</button>
                <button class="icon-button" type="button" data-next aria-label="다음 책장">›</button>
              </div>
              <div class="reader-progress" aria-hidden="true"><span data-progress></span></div>
              <div class="page-indicator" data-page-indicator>1 / ${readerPages.length}</div>
            </div>

            <div class="book-stage" data-book-stage>
              ${readerPages.map(renderBookSpread).join("")}
            </div>

            <div class="reader-footer">
              <span>${escapeHtml(manuscript.sourceName)}</span>
              <span>${formatNumber(manuscript.stats.chars)}자 · ${formatNumber(manuscript.stats.lines)}줄 · ${formatNumber(manuscript.stats.headings)}개 헤딩</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="closing" aria-labelledby="closing-title">
      <div class="section-inner">
        <p class="section-kicker">Before the First Battle</p>
        <h2 id="closing-title" class="section-title">아직 죽지 않는 기사는 태어나지 않았다.</h2>
        <p class="section-lead">5083년, Fairbourne Hardwin Duran은 Harrowmont의 종기사로 첫 전투의 문턱에 선다. 이 책은 그 순간에 닿기 전까지 세계가 남긴 모든 예언과 장부와 애가를 따라간다.</p>
        <a class="button primary" href="#reader">다시 책장으로</a>
      </div>
    </section>
  </main>

  <footer>
    <div class="section-inner">
      <span>듀란일대기 · 아르카디아 원초기</span>
      <span>Arcadia / Greenhollow / Newhollow / 5083</span>
    </div>
  </footer>

  <script>
    (() => {
      const pages = Array.from(document.querySelectorAll(".book-spread"));
      const chapterButtons = Array.from(document.querySelectorAll("[data-chapter-jump]"));
      const sectionLinks = Array.from(document.querySelectorAll("[data-section-link]"));
      const prev = document.querySelector("[data-prev]");
      const next = document.querySelector("[data-next]");
      const progress = document.querySelector("[data-progress]");
      const indicator = document.querySelector("[data-page-indicator]");
      const search = document.querySelector("#toc-search");
      const tocCount = document.querySelector("[data-toc-count]");
      const tocEmpty = document.querySelector("[data-toc-empty]");
      const forcedInitialHash = "${initialHash}";
      let activeIndex = 0;
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";

      const pageForId = (id) => {
        const target = document.getElementById(id);
        if (!target) return null;
        return target.classList.contains("book-spread") ? target : target.closest(".book-spread");
      };

      const setActiveSection = (id) => {
        sectionLinks.forEach((link) => link.classList.toggle("active", link.dataset.sectionLink === id));
      };

      const scrollToTarget = (id, instant = false) => {
        const target = document.getElementById(id) || document.getElementById("reader");
        if (!target) return;
        const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 84);
        setScrollTop(y, instant);
      };

      const setScrollTop = (y, instant = true) => {
        const scroller = document.scrollingElement || document.documentElement;
        if (scroller) scroller.scrollTop = y;
        document.documentElement.scrollTop = y;
        document.body.scrollTop = y;
        window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
      };

      const isReaderInView = () => {
        const reader = document.getElementById("reader");
        if (!reader) return false;
        const rect = reader.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.72 && rect.bottom > 160;
      };

      const updateControls = () => {
        const activePage = pages[activeIndex];
        const activeChapter = activePage ? activePage.dataset.chapterId : "";
        chapterButtons.forEach((button) => button.setAttribute("aria-current", String(button.dataset.chapterId === activeChapter)));
        const width = pages.length <= 1 ? 100 : ((activeIndex + 1) / pages.length) * 100;
        progress.style.width = width + "%";
        indicator.textContent = (activeIndex + 1) + " / " + pages.length;
        prev.disabled = activeIndex === 0;
        next.disabled = activeIndex === pages.length - 1;
        setActiveSection(activePage ? activePage.dataset.firstSectionId || "" : "");
      };

      const showPage = (index, options = {}) => {
        const nextIndex = Math.max(0, Math.min(index, pages.length - 1));
        const current = pages[activeIndex];
        const incoming = pages[nextIndex];
        const direction = nextIndex >= activeIndex ? "enter-next" : "enter-prev";
        const preserveScroll = options.scroll !== true;
        const preservedY = preserveScroll ? window.scrollY : 0;

        if (incoming !== current) {
          current.classList.remove("active", "enter-next", "enter-prev");
          current.setAttribute("aria-hidden", "true");
          incoming.classList.add("active", direction);
          incoming.removeAttribute("aria-hidden");
          window.setTimeout(() => incoming.classList.remove(direction), 560);
          activeIndex = nextIndex;
        }

        updateControls();
        const targetId = options.anchor || incoming.id;
        if (options.push) history.pushState({ page: activeIndex, anchor: targetId }, "", "#" + targetId);
        if (options.scroll === true) {
          const runScroll = () => scrollToTarget(targetId, options.instant);
          window.requestAnimationFrame(runScroll);
          window.setTimeout(runScroll, 80);
          window.setTimeout(runScroll, 260);
        } else if (preserveScroll) {
          const restoreScroll = () => setScrollTop(preservedY, true);
          window.requestAnimationFrame(restoreScroll);
          window.setTimeout(restoreScroll, 0);
          window.setTimeout(restoreScroll, 80);
        }
      };

      document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const id = decodeURIComponent(link.getAttribute("href").slice(1));
        if (!id) return;
        const page = pageForId(id);
        if (!page) {
          document.body.classList.remove("reader-focus");
          return;
        }
        const shouldScroll = !document.body.classList.contains("reader-focus") && !isReaderInView();
        if (shouldScroll) document.body.classList.add("reader-focus");
        event.preventDefault();
        const index = Number(page.dataset.spreadIndex);
        showPage(index, { anchor: id, push: true, scroll: shouldScroll });
        setActiveSection(id);
      });

      chapterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.chapterJump);
          showPage(index, { anchor: pages[index].id, push: true });
        });
      });

      prev.addEventListener("click", () => showPage(activeIndex - 1, { anchor: pages[Math.max(0, activeIndex - 1)].id, push: true }));
      next.addEventListener("click", () => showPage(activeIndex + 1, { anchor: pages[Math.min(pages.length - 1, activeIndex + 1)].id, push: true }));

      document.addEventListener("keydown", (event) => {
        if (event.target === search || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft") showPage(activeIndex - 1, { anchor: pages[Math.max(0, activeIndex - 1)].id, push: true });
        if (event.key === "ArrowRight") showPage(activeIndex + 1, { anchor: pages[Math.min(pages.length - 1, activeIndex + 1)].id, push: true });
      });

      search.addEventListener("input", () => {
        const term = search.value.trim().toLowerCase();
        let visible = 0;

        document.querySelectorAll("[data-toc-chapter]").forEach((chapter) => {
          const links = Array.from(chapter.querySelectorAll("[data-section-link]"));
          let chapterVisible = !term || chapter.dataset.search.includes(term);

          links.forEach((link) => {
            const match = !term || link.dataset.search.includes(term);
            link.hidden = !match;
            if (match) {
              chapterVisible = true;
              visible++;
            }
          });

          chapter.hidden = !chapterVisible;
        });

        if (!term) visible = sectionLinks.length;
        tocCount.textContent = visible.toLocaleString("ko-KR") + "개 절";
        tocEmpty.style.display = visible === 0 ? "block" : "none";
      });

      window.addEventListener("popstate", () => {
        const id = decodeURIComponent(location.hash.slice(1));
        if (!id) return;
        const page = pageForId(id);
        if (page) showPage(Number(page.dataset.spreadIndex), { anchor: id, scroll: true, push: false });
      });

      const initialId = decodeURIComponent((forcedInitialHash || location.hash).slice(1));
      if (initialId) {
        const page = pageForId(initialId);
        if (page) {
          document.body.classList.add("reader-focus");
          showPage(Number(page.dataset.spreadIndex), { anchor: initialId, scroll: true, push: false, instant: true });
        } else {
          document.body.classList.remove("reader-focus");
          const runScroll = () => scrollToTarget(initialId, true);
          window.requestAnimationFrame(runScroll);
          window.setTimeout(runScroll, 80);
          window.setTimeout(runScroll, 260);
        }
      } else {
        pages.forEach((page, index) => {
          page.classList.toggle("active", index === 0);
          if (index === 0) page.removeAttribute("aria-hidden");
          else page.setAttribute("aria-hidden", "true");
        });
      }

      updateControls();
    })();
  </script>
</body>
</html>`;

  function countBlocks(type) {
    return chapters.reduce((sum, chapter) => (
      sum + chapter.sections.reduce((sectionSum, section) => (
        sectionSum + section.blocks.filter((block) => block.type === type).length
      ), 0)
    ), 0);
  }
}

function renderBriefCard(number, title, text) {
  return String.raw`<article class="brief-card">
    <b>${escapeHtml(number)}</b>
    <div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(text)}</p>
    </div>
  </article>`;
}

function paginateManuscript(chapters) {
  const maxPageWeight = 850;
  const paperPages = [];
  const tocChapters = [];
  let current = null;

  const addBlankPage = () => {
    const number = paperPages.length + 1;
    paperPages.push({
      id: `paper-${padNumber(number)}`,
      number,
      blank: true,
      chapterId: "",
      firstSectionId: "",
      blocks: [],
      search: "",
    });
  };

  const flushPage = () => {
    if (!current) return;
    if (current.blocks.length) {
      const number = paperPages.length + 1;
      current.id = `paper-${padNumber(number)}`;
      current.number = number;
      current.search = searchText(current.searchParts);
      delete current.searchParts;
      paperPages.push(current);
    }
    current = null;
  };

  const alignChapterStart = () => {
    flushPage();
    if (paperPages.length % 2 !== 0) addBlankPage();
  };

  const beginPage = (chapter, section = null, continued = false) => {
    current = {
      id: "",
      number: 0,
      blank: false,
      chapterId: chapter.id,
      firstSectionId: section ? section.id : "",
      blocks: [],
      weight: 0,
      searchParts: [chapter.title, chapter.shortTitle],
    };

    if (continued && section) {
      const block = { type: "continued", title: section.title, sectionId: section.id };
      current.blocks.push(block);
      current.weight += blockWeight(block);
      current.searchParts.push(section.title);
    }
  };

  const addBlock = (chapter, section, block) => {
    if (!current) beginPage(chapter, section);
    const weight = blockWeight(block);
    const canBreak = current.blocks.length > 0 && block.type !== "chapter-title";

    if (canBreak && current.weight + weight > maxPageWeight) {
      flushPage();
      beginPage(chapter, section, Boolean(section && block.type !== "section-title"));
    }

    if (section && !current.firstSectionId) current.firstSectionId = section.id;
    current.blocks.push(block);
    current.weight += weight;
    current.searchParts.push(blockSearchText(block));
    return paperPages.length;
  };

  chapters.forEach((chapter, chapterIndex) => {
    alignChapterStart();
    const tocChapter = {
      chapter,
      firstSpreadIndex: 0,
      sections: [],
    };

    beginPage(chapter);
    const chapterPaperIndex = addBlock(chapter, null, {
      type: "chapter-title",
      id: chapter.id,
      index: chapterIndex,
      title: chapter.title,
      shortTitle: chapter.shortTitle,
      quote: chapter.quote,
      lead: chapter.lead,
      line: chapter.line,
      sectionCount: chapter.sections.length,
    });
    tocChapter.firstSpreadIndex = Math.floor(chapterPaperIndex / 2);

    chapter.sections.forEach((section) => {
      const titleBlock = {
        type: "section-title",
        id: section.id,
        title: section.title,
      };
      const firstContentBlock = section.blocks[0] ? { ...section.blocks[0], sectionId: section.id } : null;
      const requiredOpeningWeight = blockWeight(titleBlock) + Math.min(firstContentBlock ? blockWeight(firstContentBlock) : 0, 260);

      if (current && current.blocks.length && current.weight + requiredOpeningWeight > maxPageWeight) {
        flushPage();
      }

      const sectionPaperIndex = addBlock(chapter, section, titleBlock);
      tocChapter.sections.push({
        section,
        firstSpreadIndex: Math.floor(sectionPaperIndex / 2),
      });

      section.blocks.forEach((block) => {
        addBlock(chapter, section, { ...block, sectionId: section.id });
      });
    });

    flushPage();
    tocChapters.push(tocChapter);
  });

  const spreads = [];
  for (let index = 0; index < paperPages.length; index += 2) {
    const left = paperPages[index];
    const right = paperPages[index + 1] || null;
    spreads.push({
      id: `spread-${padNumber(spreads.length + 1)}`,
      index: spreads.length,
      chapterId: left?.chapterId || right?.chapterId || "",
      firstSectionId: left?.firstSectionId || right?.firstSectionId || "",
      left,
      right,
    });
  }

  return { pages: spreads, tocChapters };
}

function renderTocChapter(entry, index) {
  const chapter = entry.chapter;
  const searchable = searchText([chapter.title, chapter.shortTitle, chapter.quote, chapter.lead, ...entry.sections.map((item) => item.section.title)]);
  return String.raw`<div class="toc-chapter" data-toc-chapter data-search="${escapeAttr(searchable)}">
    <button class="chapter-jump" type="button" data-chapter-jump="${entry.firstSpreadIndex}" data-chapter-id="${escapeAttr(chapter.id)}" aria-current="${index === 0 ? "true" : "false"}">
      <span>${escapeHtml(chapter.shortTitle)}</span>
      <small>${index + 1}</small>
    </button>
    <div class="section-links">
      ${entry.sections.map((sectionEntry) => renderTocSection(sectionEntry, chapter)).join("")}
    </div>
  </div>`;
}

function renderTocSection(entry, chapter) {
  const section = entry.section;
  const searchable = searchText([chapter.title, section.title, section.excerpt]);
  return String.raw`<a class="section-link" href="#${escapeAttr(section.id)}" data-section-link="${escapeAttr(section.id)}" data-spread-jump="${entry.firstSpreadIndex}" data-search="${escapeAttr(searchable)}">${escapeHtml(section.title)}</a>`;
}

function renderBookSpread(spread) {
  const active = spread.index === 0 ? " active" : "";
  const aria = spread.index === 0 ? "" : ` aria-hidden="true"`;
  const rightPage = spread.right ? renderPaperPage(spread.right, "right") : renderBlankPaperPage("right");
  return String.raw`<article class="book-spread${active}" id="${escapeAttr(spread.id)}" data-spread-index="${spread.index}" data-chapter-id="${escapeAttr(spread.chapterId)}" data-first-section-id="${escapeAttr(spread.firstSectionId)}"${aria}>
    ${renderPaperPage(spread.left, "left")}
    ${rightPage}
  </article>`;
}

function renderPaperPage(page, side) {
  if (!page || page.blank) return renderBlankPaperPage(side, page?.number);
  return String.raw`<section class="paper-page ${side}" id="${escapeAttr(page.id)}" data-paper-page data-section-id="${escapeAttr(page.firstSectionId)}">
    <div class="page-content">
      ${page.blocks.map(renderPageBlock).join("")}
    </div>
    <span class="page-number">${page.number}</span>
  </section>`;
}

function renderBlankPaperPage(side, number = "") {
  return String.raw`<section class="paper-page ${side} blank" aria-hidden="true">
    <div class="page-content"></div>
    ${number ? `<span class="page-number">${number}</span>` : ""}
  </section>`;
}

function renderPageBlock(block) {
  if (block.type === "chapter-title") {
    return String.raw`<header class="chapter-header" id="${escapeAttr(block.id)}">
      <div class="chapter-meta">
        <span>${block.index + 1}번째 기록</span>
        <span>${block.sectionCount}개 절</span>
        <span>line ${block.line}</span>
      </div>
      <h2 class="chapter-title">${formatInline(block.title)}</h2>
      ${block.quote ? `<p class="chapter-quote">${formatInline(block.quote)}</p>` : ""}
      ${block.lead ? `<p class="chapter-lead">${formatInline(block.lead)}</p>` : ""}
    </header>`;
  }
  if (block.type === "section-title") {
    return String.raw`<h3 class="section-heading" id="${escapeAttr(block.id)}" data-section-anchor="${escapeAttr(block.id)}">${formatInline(block.title)} <a class="anchor-link" href="#${escapeAttr(block.id)}" aria-label="${escapeAttr(block.title)}로 직접 이동">#</a></h3>`;
  }
  if (block.type === "continued") {
    return `<p class="continued-heading">${escapeHtml(block.title)} 이어짐</p>`;
  }
  if (block.type === "quote") {
    return `<blockquote class="scripture-quote">${formatInline(block.text)}</blockquote>`;
  }
  if (block.type === "paragraph") {
    return `<p class="paper-paragraph">${formatInline(block.text)}</p>`;
  }
  if (block.type === "verse") {
    return `<p class="verse"><span class="verse-marker">${escapeHtml(block.marker)}</span><span>${formatInline(block.text)}</span></p>`;
  }
  if (block.type === "ordered" || block.type === "list") {
    const tag = block.type === "ordered" ? "ol" : "ul";
    return `<${tag} class="scripture-list">${block.items.map((item) => `<li>${formatInline(item)}</li>`).join("")}</${tag}>`;
  }
  if (block.type === "divider") {
    return `<div class="scripture-divider" aria-hidden="true"></div>`;
  }
  return "";
}

function blockWeight(block) {
  if (block.type === "chapter-title") {
    return 420 + textWeight([block.title, block.quote, block.lead].filter(Boolean).join(" ")) * 0.62;
  }
  if (block.type === "section-title") {
    return 155 + textWeight(block.title) * 0.9;
  }
  if (block.type === "continued") {
    return 80 + textWeight(block.title) * 0.3;
  }
  if (block.type === "quote") {
    return 170 + textWeight(block.text) * 1.05;
  }
  if (block.type === "paragraph") {
    return 90 + textWeight(block.text) * 0.95;
  }
  if (block.type === "verse") {
    return 60 + textWeight(block.text) * 0.86;
  }
  if (block.type === "ordered" || block.type === "list") {
    return 110 + block.items.reduce((sum, item) => sum + textWeight(item) * 0.72 + 34, 0);
  }
  if (block.type === "divider") {
    return 82;
  }
  return 80;
}

function blockSearchText(block) {
  if (block.type === "chapter-title") return [block.title, block.shortTitle, block.quote, block.lead].filter(Boolean).join(" ");
  if (block.type === "section-title" || block.type === "continued") return block.title || "";
  if (block.type === "ordered" || block.type === "list") return block.items.join(" ");
  return block.text || "";
}

function textWeight(value) {
  return Array.from(String(value ?? "")).reduce((sum, char) => {
    const code = char.charCodeAt(0);
    if (/\s/.test(char)) return sum + 0.35;
    return sum + (code < 128 ? 0.58 : 1);
  }, 0);
}

function padNumber(value) {
  return String(value).padStart(3, "0");
}

function formatInline(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[\[#([^\]]+)\]\]/g, "$1");
}

function searchText(values) {
  return values.filter(Boolean).join(" ").toLowerCase();
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ko-KR");
}

function normalizeAssetBase(value) {
  if (!value) return "";
  return String(value).replace(/\/+$/, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function escapeJsString(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/</g, "\\u003c");
}
