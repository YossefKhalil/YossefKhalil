import { GREEN, CYAN, TEXT, MUTED, DIM, FONT, esc, typed, fade } from "./core.mjs";

const X = 34;
const CHAR = 8.4;

function promptLine(text, y, begin) {
  const prefix = "yossef@dev:~$ ";
  const prefixWidth = prefix.length * CHAR;
  return `
    ${typed(prefix, { x: X, y, size: 14, fill: DIM, begin, step: 0.016 })}
    ${typed(text, { x: X + prefixWidth, y, size: 14, fill: GREEN, begin: begin + prefix.length * 0.016, step: 0.02 })}`;
}

function detail(label, value, y, { x = X, valueX = 122, green = false, dot = false } = {}) {
  const fill = green ? GREEN : TEXT;
  return `
    <text x="${x}" y="${y}" font-family="${FONT}" font-size="10" fill="${MUTED}" letter-spacing="1.4">${label}</text>
    <text x="${valueX}" y="${y}" font-family="${FONT}" font-size="14" fill="${fill}">${value}</text>
    ${dot ? `<circle cx="${valueX + 101 + 10}" cy="${y - 4}" r="3" fill="${GREEN}"/>` : ""}`;
}

export function heroPane() {
  const name = "Yossef Khalil";
  const nameWidth = 344;

  return `
    <g>
      ${promptLine("whoami", 80, 0.25)}

      <rect x="${X + 14 * CHAR + 6}" y="66" width="8" height="16" fill="${GREEN}">
        <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.05s" begin="1s" repeatCount="indefinite"/>
      </rect>

      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="0.55s" dur="0.45s" fill="freeze"/>
        <text x="${X + 2}" y="132" font-family="${FONT}" font-size="44" font-weight="bold" fill="${CYAN}" opacity="0.16">${esc(name)}</text>
        <text x="${X}" y="132" font-family="${FONT}" font-size="44" font-weight="bold" fill="${GREEN}">${esc(name)}</text>
      </g>

      <line x1="${X}" y1="150" x2="${X}" y2="150" stroke="${GREEN}" stroke-opacity="0.7" stroke-width="2">
        <animate attributeName="x2" from="${X}" to="${X + nameWidth}" begin="0.9s" dur="0.45s" fill="freeze"/>
      </line>

      ${fade(
        `<text x="${X}" y="178" font-family="${FONT}" font-size="15" fill="${MUTED}">MIS graduate<tspan fill="${GREEN}" opacity="0.55"> · </tspan>Alexandria, EG</text>`,
        0.95,
      )}

      ${fade(
        `<text x="${X}" y="208" font-family="${FONT}" font-size="15" fill="${GREEN}">AI/ML engineer<tspan fill="${MUTED}"> · </tspan>AI automation engineer<tspan fill="${MUTED}"> · </tspan>software engineer</text>`,
        1.15,
      )}

      <line x1="${X}" y1="234" x2="${X}" y2="234" stroke="${GREEN}" stroke-opacity="0.16" stroke-dasharray="1 5">
        <animate attributeName="x2" from="${X}" to="966" begin="1.2s" dur="0.45s" fill="freeze"/>
      </line>

      ${fade(
        `<g font-family="${FONT}">
          ${detail("LANG", "python", 266, { green: true })}
          ${detail("STACK", "n8n · APIs · OpenAI · Postgres · Docker · Linux · Git", 292)}
          ${detail("FOCUS", "AI agents · automation · backend systems", 318)}

          ${detail("EDU", "MIS · Alexandria University", 266, { x: 640, valueX: 728 })}
          <text x="728" y="288" font-family="${FONT}" font-size="14" fill="${TEXT}">2026 · GPA 3.45</text>
          ${detail("STATUS", "open to work", 318, { x: 640, valueX: 728, green: true, dot: true })}
        </g>`,
        1.35,
      )}
    </g>`;
}
