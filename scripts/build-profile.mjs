#!/usr/bin/env node
/**
 * Composes assets/profile.svg — one terminal window with three panes.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { windowTop, windowBottom } from "./lib/chrome.mjs";
import { heroPane } from "./lib/hero-pane.mjs";
import { activityPane } from "./lib/activity-pane.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(await readFile(resolve(root, "data/contributions.json"), "utf8"));
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const [year, month, day] = data.updatedAt.split("-");
const stamp = `${day} ${months[Number(month) - 1]} ${year}`;

const svg = `${windowTop(stamp)}
${heroPane()}
${activityPane(data)}
${windowBottom()}`;

await writeFile(resolve(root, "assets/profile.svg"), svg);
console.log(`profile.svg · 1000×680 · ${Buffer.byteLength(svg)} bytes`);
