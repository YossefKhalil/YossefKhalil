import { BODY_STACK, DISPLAY_STACK } from "./font.mjs";

export const W = 1000;
export const H = 680;
export const FONT = BODY_STACK;
export const DISPLAY = DISPLAY_STACK;
export const GREEN = "#33ff33";
export const CYAN = "#9dff8f";
export const TEXT = "#58ff58";
export const MUTED = "#2fbf3f";
export const DIM = "#1a7a2e";
export const LINE = "#0d4a1c";
export const BG = "#020402";

export const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export function typed(text, { x, y, size, fill, begin, step = 0.025, anchor }) {
  const spans = [...text]
    .map((char, index) => {
      const glyph = char === " " ? "&#160;" : esc(char);
      const at = (begin + index * step).toFixed(3);
      return `<tspan opacity="0">${glyph}<animate attributeName="opacity" from="0" to="1" begin="${at}s" dur="0.01s" fill="freeze"/></tspan>`;
    })
    .join("");
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" fill="${fill}"${anchor ? ` text-anchor="${anchor}"` : ""}>${spans}</text>`;
}

export function fade(content, begin, dur = 0.4) {
  return `<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${begin}s" dur="${dur}s" fill="freeze"/>${content}</g>`;
}

export function rise(content, begin, dur = 0.4, dy = 6) {
  return `<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${begin}s" dur="${dur}s" fill="freeze"/><animateTransform attributeName="transform" type="translate" values="0 ${dy};0 0" begin="${begin}s" dur="${dur}s" fill="freeze"/>${content}</g>`;
}
