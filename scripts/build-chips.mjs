#!/usr/bin/env node
/**
 * Generates linked chips that sit below the workspace image:
 * three project chips and five contact chips.
 */
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { GREEN, CYAN, MUTED, DIM, LINE, FONT, esc } from "./lib/core.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = resolve(root, "assets");

const defs = `
  <linearGradient id="chipBg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d1410"/>
    <stop offset="1" stop-color="#070a08"/>
  </linearGradient>
  <linearGradient id="chipRail" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${GREEN}" stop-opacity="0.1"/>
    <stop offset="0.5" stop-color="${GREEN}" stop-opacity="0.85"/>
    <stop offset="1" stop-color="${GREEN}" stop-opacity="0.1"/>
  </linearGradient>`;

const frame = (w, h, delay) => `
  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" begin="${delay.toFixed(2)}s" dur="0.3s" fill="freeze"/>
    <animateTransform attributeName="transform" type="translate" values="0 5;0 0" begin="${delay.toFixed(2)}s" dur="0.34s" fill="freeze"/>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="3" fill="url(#chipBg)" stroke="${LINE}"/>
    <line x1="10" y1="1.5" x2="${w - 10}" y2="1.5" stroke="#d9ffe4" stroke-opacity="0.05"/>
    <rect x="0" y="9" width="1.6" height="${h - 18}" fill="url(#chipRail)"/>
  </g>`;

const projects = [
  { file: "chip-manzili.svg", index: "01", label: "manzili" },
  { file: "chip-clinic.svg", index: "02", label: "clinic ehr" },
  { file: "chip-ai-da.svg", index: "03", label: "ai-da" },
];

for (const [i, { file, index, label }] of projects.entries()) {
  const w = 190;
  const h = 44;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Open ${esc(label)}">
  <title>${esc(label)}</title>
  <defs>${defs}</defs>
  ${frame(w, h, 0.12 + i * 0.08)}
  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" begin="${(0.2 + i * 0.08).toFixed(2)}s" dur="0.3s" fill="freeze"/>
    <text x="14" y="16" font-family="${FONT}" font-size="7" fill="${DIM}" letter-spacing="1.2">${index}</text>
    <text x="14" y="32" font-family="${FONT}" font-size="14" font-weight="bold" fill="${CYAN}">${esc(label)}</text>
    <text x="176" y="29" font-family="${FONT}" font-size="13" fill="${GREEN}" text-anchor="end">↗</text>
  </g>
</svg>
`;
  await writeFile(resolve(assets, file), svg);
  console.log(`${file} · ${w}×${h}`);
}

const links = ["site", "github", "linkedin", "email", "cv"];

for (const [i, label] of links.entries()) {
  const w = 126;
  const h = 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <title>${esc(label)}</title>
  <defs>${defs}</defs>
  ${frame(w, h, 0.1 + i * 0.06)}
  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" begin="${(0.18 + i * 0.06).toFixed(2)}s" dur="0.3s" fill="freeze"/>
    <text x="12" y="25" font-family="${FONT}" font-size="10" fill="${GREEN}" opacity="0.55">&gt;</text>
    <text x="24" y="25" font-family="${FONT}" font-size="12" fill="${CYAN}">${esc(label)}</text>
    <text x="114" y="25" font-family="${FONT}" font-size="10" fill="${GREEN}" opacity="0.7" text-anchor="end">↗</text>
  </g>
</svg>
`;
  await writeFile(resolve(assets, `chip-${label}.svg`), svg);
  console.log(`chip-${label}.svg · ${w}×${h}`);
}
