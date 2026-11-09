import { GREEN, DIM, LINE, FONT, esc } from "./core.mjs";

export function chromeDefs() {
  return `
    <linearGradient id="windowBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b110d"/>
      <stop offset="1" stop-color="#050705"/>
    </linearGradient>
    <linearGradient id="titleBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#18231b"/>
      <stop offset="1" stop-color="#0c120e"/>
    </linearGradient>
    <linearGradient id="mainBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080c09"/>
      <stop offset="1" stop-color="#060806"/>
    </linearGradient>
    <linearGradient id="workBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#090e0b"/>
      <stop offset="1" stop-color="#070a08"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <clipPath id="windowClip">
      <rect x="10" y="10" width="980" height="660" rx="8"/>
    </clipPath>
  `;
}

export function windowTop(date = "01 NOV 2026") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="680" viewBox="0 0 1000 680" role="img" aria-labelledby="profileTitle profileDesc">
  <title id="profileTitle">Yossef Khalil — terminal profile</title>
  <desc id="profileDesc">Terminal profile for Yossef Khalil: AI/ML engineer, AI automation engineer and software engineer in Alexandria. Projects cycle through Manzili, Clinic EHR and AI-DA; lower pane shows the GitHub contribution heatmap.</desc>
  <defs>${chromeDefs()}</defs>

  <rect x="14" y="18" width="972" height="656" rx="12" fill="#000000" opacity="0.5" filter="url(#shadow)"/>

  <g clip-path="url(#windowClip)">
    <rect x="10" y="10" width="980" height="660" fill="url(#windowBg)"/>

    <path d="M18 10 H982 Q990 10 990 18 V32 H10 V18 Q10 10 18 10 Z" fill="url(#titleBg)"/>
    <line x1="18" y1="10.5" x2="982" y2="10.5" stroke="#d9ffe4" stroke-opacity="0.07"/>

    <circle cx="26" cy="21" r="3.2" fill="${DIM}" opacity="0.55"/>
    <circle cx="42" cy="21" r="3.2" fill="${DIM}" opacity="0.55"/>
    <circle cx="58" cy="21" r="3.2" fill="${GREEN}" opacity="0.8"/>
    <text x="76" y="25" font-family="${FONT}" font-size="9.5" fill="${DIM}" letter-spacing="0.5">yossef@dev — ~/profile</text>
    <text x="900" y="25" font-family="${FONT}" font-size="8" fill="${DIM}" text-anchor="end" letter-spacing="0.5">${esc(date)}</text>
    <circle cx="920" cy="21" r="2.4" fill="${GREEN}">
      <animate attributeName="opacity" values="1;1;0.2;0.2" keyTimes="0;0.45;0.55;1" dur="2.8s" repeatCount="indefinite"/>
    </circle>
    <text x="930" y="25" font-family="${FONT}" font-size="8" fill="${GREEN}" letter-spacing="0.5">online</text>
    <line x1="10" y1="32" x2="990" y2="32" stroke="${LINE}"/>

    <rect x="10" y="32" width="600" height="330" fill="url(#mainBg)"/>
    <rect x="610" y="32" width="380" height="330" fill="url(#workBg)"/>
    <rect x="10" y="362" width="980" height="308" fill="url(#mainBg)"/>
    <line x1="610" y1="32" x2="610" y2="362" stroke="${LINE}"/>
    <line x1="10" y1="362" x2="990" y2="362" stroke="${LINE}"/>
  `;
}

export function windowBottom() {
  return `
  </g>

  <rect x="10.5" y="10.5" width="979" height="659" rx="8" fill="none" stroke="${LINE}"/>
  <line x1="18" y1="10.5" x2="982" y2="10.5" stroke="#d9ffe4" stroke-opacity="0.06"/>
</svg>
`;
}
