import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fonts = resolve(here, "../../assets/fonts");

const b64 = (name) => readFileSync(resolve(fonts, name)).toString("base64");

export const DISPLAY_STACK = "'Silkscreen', 'Courier New', monospace";
export const BODY_STACK = "'VT323', 'Courier New', monospace";

export const FONT_CSS = `
@font-face {
  font-family: 'Silkscreen';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url(data:font/woff2;base64,${b64("silkscreen-400.woff2")}) format('woff2');
}
@font-face {
  font-family: 'Silkscreen';
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url(data:font/woff2;base64,${b64("silkscreen-700.woff2")}) format('woff2');
}
@font-face {
  font-family: 'VT323';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url(data:font/woff2;base64,${b64("vt323.woff2")}) format('woff2');
}
text {
  font-family: ${BODY_STACK};
  font-variant-ligatures: none;
}
`;
