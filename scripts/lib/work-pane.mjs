import { GREEN, CYAN, TEXT, MUTED, DIM, LINE, FONT, esc } from "./core.mjs";

const X = 626;
const RIGHT = 974;

const projects = [
  {
    index: "01",
    dir: "manzili/",
    title: "manzili",
    path: "~/work/manzili",
    desc: "multi-vendor commerce, shipped live.",
    meta: "led 13 people · 5+ integrations",
    tags: ["team lead", "commerce", "live"],
  },
  {
    index: "02",
    dir: "clinic-ehr/",
    title: "clinic ehr",
    path: "~/work/clinic-ehr",
    desc: "charity clinic EHR, running daily.",
    meta: "bilingual · 646 tests · serverless",
    tags: ["serverless", "bilingual", "646 tests"],
  },
  {
    index: "03",
    dir: "ai-da/",
    title: "ai-da",
    path: "~/work/ai-da",
    desc: "deletion-audit agent, built in 24h.",
    meta: "top 1,000 of 52,000 · hackathon",
    tags: ["ai", "agents", "24h build"],
  },
];

const ROW_TOP = 104;
const ROW_PITCH = 28;

function row(project, i) {
  const y = ROW_TOP + i * ROW_PITCH;
  const begin = 0.4 + i * 0.08;
  return `
    <g opacity="0">
      <animate attributeName="opacity" from="0" to="1" begin="${begin}s" dur="0.3s" fill="freeze"/>
      <text x="${X}" y="${y}" font-family="${FONT}" font-size="10" fill="${DIM}">${esc(project.index)}</text>
      <text x="${X + 26}" y="${y}" font-family="${FONT}" font-size="10" fill="${TEXT}">${esc(project.dir)}</text>
    </g>`;
}

function preview(project, i) {
  const begin = 2.8 + i * 4.0;
  const end = begin + 4.0;
  const dur = 12.0;
  return `
    <g opacity="0">
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.32;0.33" begin="${begin}s" dur="${dur}s" repeatCount="indefinite"/>
      <text x="${X}" y="200" font-family="${FONT}" font-size="8" fill="${DIM}">${esc(project.path)}</text>
      <text x="${X}" y="226" font-family="${FONT}" font-size="17" font-weight="bold" fill="${CYAN}">${esc(project.title)}</text>
      <text x="${X}" y="246" font-family="${FONT}" font-size="9.5" fill="${TEXT}">${esc(project.desc)}</text>
      <text x="${X}" y="264" font-family="${FONT}" font-size="8.5" fill="${MUTED}">${esc(project.meta)}</text>
      <text x="${X}" y="284" font-family="${FONT}" font-size="8.5" fill="${MUTED}">${project.tags.map((t) => `[${esc(t)}]`).join(" ")}</text>
    </g>`;
}

export function workPane() {
  const rows = projects.map(row).join("");
  const previews = projects.map(preview).join("");

  return `
    <g>
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="0.3s" dur="0.3s" fill="freeze"/>
        <text x="${X}" y="72" font-family="${FONT}" font-size="11" fill="${CYAN}">~/work</text>
        <text x="${RIGHT}" y="72" font-family="${FONT}" font-size="8" fill="${DIM}" text-anchor="end">${projects.length} entries</text>
        <line x1="${X}" y1="82" x2="${RIGHT}" y2="82" stroke="${LINE}"/>
      </g>

      ${rows}

      ${previews}
    </g>`;
}
