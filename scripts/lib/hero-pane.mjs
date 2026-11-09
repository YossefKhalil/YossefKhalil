import { GREEN, CYAN, TEXT, MUTED, DIM, FONT, esc, typed, fade } from "./core.mjs";

const X = 34;

function promptLine(text, y, begin) {
  const prefix = "yossef@dev:~$ ";
  const prefixWidth = prefix.length * 7.2;
  return `
    ${typed(prefix, { x: X, y, size: 12, fill: DIM, begin, step: 0.016 })}
    ${typed(text, { x: X + prefixWidth, y, size: 12, fill: GREEN, begin: begin + prefix.length * 0.016, step: 0.02 })}`;
}

function detail(label, value, y) {
  return `
    <text x="${X}" y="${y}" font-size="7.5" fill="${DIM}" letter-spacing="1.3">${label}</text>
    <text x="104" y="${y}" font-size="10" fill="${TEXT}">${value}</text>`;
}

export function heroPane() {
  const name = "Yossef Khalil";
  const nameWidth = 276;

  return `
    <g>
      ${promptLine("whoami", 72, 0.25)}

      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="0.6s" dur="0.4s" fill="freeze"/>
        <text x="${X + 1.5}" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${CYAN}" opacity="0.15">${esc(name)}</text>
        <text x="${X}" y="116" font-family="${FONT}" font-size="30" font-weight="bold" fill="${GREEN}">${esc(name)}</text>
      </g>

      <line x1="${X}" y1="128" x2="${X}" y2="128" stroke="${GREEN}" stroke-opacity="0.45" stroke-width="1">
        <animate attributeName="x2" from="${X}" to="${X + nameWidth}" begin="1.0s" dur="0.4s" fill="freeze"/>
      </line>

      ${fade(
        `<text x="${X}" y="148" font-family="${FONT}" font-size="11" fill="${MUTED}">MIS grad<tspan fill="${GREEN}" opacity="0.45"> · </tspan>developer<tspan fill="${GREEN}" opacity="0.45"> · </tspan>alexandria, eg</text>`,
        1.15,
      )}

      ${fade(
        `<g font-family="${FONT}">
          <text x="440" y="72" font-size="7.5" fill="${DIM}" letter-spacing="1.3">ROLES</text>
          <text x="440" y="92" font-size="10" fill="${TEXT}">ai/ml engineer</text>
          <text x="440" y="110" font-size="10" fill="${TEXT}">ai automation engineer</text>
          <text x="440" y="128" font-size="10" fill="${TEXT}">software engineer</text>
        </g>`,
        1.0,
      )}

      <line x1="${X}" y1="172" x2="${X}" y2="172" stroke="${GREEN}" stroke-opacity="0.12" stroke-dasharray="1 5">
        <animate attributeName="x2" from="${X}" to="586" begin="1.25s" dur="0.4s" fill="freeze"/>
      </line>

      ${fade(
        `<g font-family="${FONT}">
          ${detail("LANG", "python", 196)}
          ${detail("STACK", "n8n · apis · openai · postgres · docker · linux · git", 218)}
          ${detail("FOCUS", "ai agents · automation · backend systems", 240)}
          ${detail("EDU", "MIS · alexandria university · 2026", 262)}
          ${detail("STATUS", "open to work", 284)}
          <circle cx="196" cy="281" r="2.5" fill="${GREEN}">
            <animate attributeName="opacity" values="1;1;0.2;0.2" keyTimes="0;0.45;0.55;1" dur="2.6s" begin="2.6s" repeatCount="indefinite"/>
          </circle>
        </g>`,
        1.4,
      )}

      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" begin="3.0s" dur="0.3s" fill="freeze"/>
        <text x="${X}" y="320" font-family="${FONT}" font-size="12" fill="${GREEN}">yossef@dev:~$</text>
        <rect x="${X + 12 * 7.2 + 3}" y="308" width="7" height="13" fill="${GREEN}">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.05s" begin="3.2s" repeatCount="indefinite"/>
        </rect>
      </g>
    </g>`;
}
