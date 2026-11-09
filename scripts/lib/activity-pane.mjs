import { GREEN, CYAN, MUTED, DIM, LINE, FONT, typed, fade } from "./core.mjs";

const X = 26;
const FRAME = { x: 24, y: 462, w: 952, h: 184 };
const GRID = { x: 76, y: 492, cell: 13, gap: 3 };
const PITCH = GRID.cell + GRID.gap;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#0b120d", "#12301c", "#1c5a2c", "#2a9a45", GREEN];

const level = (count) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

function currentStreak(days) {
  let end = days.length - 1;
  while (end >= 0 && days[end].count === 0) end -= 1;
  let streak = 0;
  for (let i = end; i >= 0 && days[i].count > 0; i -= 1) streak += 1;
  return streak;
}

export function activityPane(data) {
  const days = data.weeks.flatMap((week) => week.days);
  const streak = currentStreak(days);

  const monthLabels = [];
  let lastMonth = null;
  data.weeks.forEach((week, index) => {
    const month = new Date(`${week.days[0].date}T00:00:00Z`).getUTCMonth();
    if (index > 0 && month !== lastMonth) {
      monthLabels.push({ x: GRID.x + index * PITCH, text: MONTHS[month] });
    }
    lastMonth = month;
  });

  const cells = data.weeks
    .map((week, wi) =>
      week.days
        .map((day, di) => {
          const x = GRID.x + wi * PITCH;
          const y = GRID.y + di * PITCH;
          const lv = level(day.count);
          const begin = (2.4 + wi * 0.007 + di * 0.004).toFixed(3);
          const stroke = lv === 4 ? GREEN : lv === 0 ? LINE : "#d9ffe4";
          const strokeOpacity = lv === 4 ? 0.4 : lv === 0 ? 0.7 : 0.07;
          return `<rect x="${x}" y="${y}" width="${GRID.cell}" height="${GRID.cell}" rx="2" fill="${COLORS[lv]}" stroke="${stroke}" stroke-opacity="${strokeOpacity}" opacity="0">
            <animate attributeName="opacity" from="0" to="1" begin="${begin}s" dur="0.22s" fill="freeze"/>
          </rect>`;
        })
        .join(""),
    )
    .join("");

  const lastWeek = data.weeks[data.weeks.length - 1];
  const todayX = GRID.x + (data.weeks.length - 1) * PITCH;
  const todayY = GRID.y + (lastWeek.days.length - 1) * PITCH;

  const dayLabels = [
    { row: 1, text: "Mon" },
    { row: 3, text: "Wed" },
    { row: 5, text: "Fri" },
  ]
    .map(
      ({ row, text }) =>
        `<text x="${GRID.x - 10}" y="${GRID.y + row * PITCH + 9.5}" font-family="${FONT}" font-size="9" fill="${DIM}" text-anchor="end">${text}</text>`,
    )
    .join("");

  const legend = [0, 1, 2, 3, 4]
    .map(
      (lv, index) =>
        `<rect x="${856 + index * 18}" y="621" width="14" height="14" rx="2" fill="${COLORS[lv]}" stroke="${lv === 4 ? GREEN : lv === 0 ? LINE : "#d9ffe4"}" stroke-opacity="${lv === 4 ? 0.4 : lv === 0 ? 0.7 : 0.07}"/>`,
    )
    .join("");

  const prefix = "yossef@dev:~$ ";
  const char = 8.4;
  const promptBegin = 2.2;
  const typedPrompt = `${typed(prefix, { x: X, y: 396, size: 14, fill: DIM, begin: promptBegin, step: 0.014 })}
    ${typed("gh activity --last-year", { x: X + prefix.length * char, y: 396, size: 14, fill: GREEN, begin: promptBegin + prefix.length * 0.014, step: 0.014 })}`;

  return `
    <g>
      ${typedPrompt}

      ${fade(
        `<g font-family="${FONT}">
          <text x="900" y="428" font-size="32" font-weight="bold" fill="${GREEN}" text-anchor="end">${data.totalContributions}</text>
          <text x="900" y="444" font-size="10" fill="${MUTED}" text-anchor="end" letter-spacing="1.2">CONTRIBUTIONS</text>
          <line x1="918" y1="406" x2="918" y2="448" stroke="${GREEN}" stroke-opacity="0.18"/>
          <text x="962" y="428" font-size="24" font-weight="bold" fill="${GREEN}" text-anchor="end">${streak}</text>
          <text x="962" y="444" font-size="10" fill="${MUTED}" text-anchor="end" letter-spacing="1.2">STREAK</text>
        </g>`,
        2.8,
      )}

      <rect x="${FRAME.x + 0.5}" y="${FRAME.y + 0.5}" width="${FRAME.w - 1}" height="${FRAME.h - 1}" rx="3" fill="#060906" stroke="${LINE}"/>
      <line x1="${FRAME.x + 12}" y1="${FRAME.y + 1.5}" x2="${FRAME.x + FRAME.w - 12}" y2="${FRAME.y + 1.5}" stroke="#d9ffe4" stroke-opacity="0.04"/>
      <g fill="none" stroke="${GREEN}" stroke-opacity="0.2">
        <path d="M${FRAME.x + 9} ${FRAME.y + 15} v-6 h6"/>
        <path d="M${FRAME.x + FRAME.w - 9} ${FRAME.y + 15} v-6 h-6"/>
        <path d="M${FRAME.x + 9} ${FRAME.y + FRAME.h - 15} v6 h6"/>
        <path d="M${FRAME.x + FRAME.w - 9} ${FRAME.y + FRAME.h - 15} v6 h-6"/>
      </g>

      ${fade(
        `<g font-family="${FONT}">
          ${dayLabels}
          ${monthLabels
            .map(
              ({ x, text }) =>
                `<text x="${x}" y="480" font-size="9" fill="${DIM}">${text}</text>`,
            )
            .join("")}
        </g>`,
        2.3,
      )}

      ${cells}

      <rect x="${todayX - 1.5}" y="${todayY - 1.5}" width="${GRID.cell + 3}" height="${GRID.cell + 3}" rx="3" fill="none" stroke="${CYAN}" stroke-opacity="0.75" stroke-width="1.2"/>

      ${fade(
        `<g font-family="${FONT}">
          <text x="754" y="630" font-size="9.5" fill="${CYAN}" opacity="0.85">today</text>
          <rect x="790" y="621" width="14" height="14" rx="2" fill="${GREEN}" fill-opacity="0.18" stroke="${CYAN}" stroke-opacity="0.7"/>
          <text x="844" y="630" font-size="9.5" fill="${MUTED}" text-anchor="end">less</text>
          ${legend}
          <text x="968" y="630" font-size="9.5" fill="${MUTED}" text-anchor="end">more</text>
        </g>`,
        3.0,
      )}
    </g>`;
}
