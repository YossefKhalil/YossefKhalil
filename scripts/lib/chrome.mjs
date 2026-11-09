import { GREEN, MUTED, DIM, LINE, FONT, esc } from "./core.mjs";

export function chromeDefs() {
  return `
    <linearGradient id="windowBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b120d"/>
      <stop offset="1" stop-color="#040705"/>
    </linearGradient>
    <linearGradient id="titleBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b261d"/>
      <stop offset="1" stop-color="#0b110d"/>
    </linearGradient>
    <linearGradient id="mainBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#080d0a"/>
      <stop offset="1" stop-color="#050806"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.8" fill="${GREEN}" opacity="0.05"/>
    </pattern>
    <clipPath id="windowClip">
      <rect x="10" y="10" width="980" height="660" rx="8"/>
    </clipPath>
  `;
}

export function windowTop(date = "09 nov 2026") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="680" viewBox="0 0 1000 680" role="img" aria-labelledby="profileTitle profileDesc">
  <title id="profileTitle">Yossef Khalil — terminal profile</title>
  <desc id="profileDesc">An animated terminal profile for Yossef Khalil, an AI/ML engineer, AI automation engineer and software engineer in Alexandria. Panes show Manzili, Clinic EHR and AI-DA, plus a year of GitHub activity.</desc>
  <defs>${chromeDefs()}</defs>

  <rect x="14" y="18" width="972" height="656" rx="12" fill="#000000" opacity="0.55" filter="url(#shadow)"/>

  <g clip-path="url(#windowClip)">
    <rect x="10" y="10" width="980" height="660" fill="url(#windowBg)"/>

    <path d="M18 10 H982 Q990 10 990 18 V38 H10 V18 Q10 10 18 10 Z" fill="url(#titleBg)"/>
    <line x1="18" y1="10.5" x2="982" y2="10.5" stroke="#d9ffe4" stroke-opacity="0.07"/>

    <circle cx="26" cy="24" r="3.2" fill="${DIM}" opacity="0.55"/>
    <circle cx="42" cy="24" r="3.2" fill="${DIM}" opacity="0.55"/>
    <circle cx="58" cy="24" r="3.2" fill="${GREEN}" opacity="0.85"/>
    <text x="74" y="28" font-family="${FONT}" font-size="11.5" fill="${MUTED}" letter-spacing="0.4">yossef@dev — ~/profile</text>
    <text x="970" y="28" font-family="${FONT}" font-size="10" fill="${MUTED}" text-anchor="end" letter-spacing="0.3">updated ${esc(date)}</text>
    <line x1="10" y1="38" x2="990" y2="38" stroke="${LINE}"/>

    <rect x="10" y="38" width="980" height="322" fill="url(#mainBg)"/>
    <rect x="10" y="38" width="980" height="322" fill="url(#dots)"/>
    <rect x="10" y="360" width="980" height="310" fill="url(#mainBg)"/>

    <line x1="10" y1="360" x2="990" y2="360" stroke="${LINE}"/>
    <rect x="10" y="38" width="2" height="632" fill="${GREEN}" opacity="0.34"/>
  `;
}

export function windowBottom() {
  return `
  </g>

  <rect x="10.5" y="10.5" width="979" height="659" rx="8" fill="none" stroke="${LINE}"/>
  <line x1="18" y1="10.5" x2="982" y2="10.5" stroke="#d9ffe4" stroke-opacity="0.05"/>
</svg>
`;
}
