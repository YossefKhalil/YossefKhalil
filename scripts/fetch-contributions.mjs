#!/usr/bin/env node
/**
 * Pulls the public contribution calendar for the profile owner.
 * Requires GITHUB_TOKEN with read:user (or a classic token with repo/read:org).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const login = process.env.PROFILE_LOGIN || "YossefKhalil";

if (!token) {
  console.error("Missing GITHUB_TOKEN. Run: $env:GITHUB_TOKEN = (gh auth token)");
  process.exit(1);
}

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "yossef-profile",
  },
  body: JSON.stringify({ query, variables: { login } }),
});

const payload = await response.json();
if (!response.ok || payload.errors) {
  console.error(JSON.stringify(payload.errors ?? payload, null, 2));
  process.exit(1);
}

const collection = payload.data.user.contributionsCollection;
const weeks = collection.contributionCalendar.weeks.map((week) => ({
  days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
}));

const data = {
  login,
  updatedAt: new Date().toISOString().slice(0, 10),
  totalContributions: collection.contributionCalendar.totalContributions,
  restrictedContributions: collection.restrictedContributionsCount,
  weeks,
};

await mkdir(resolve(root, "data"), { recursive: true });
await writeFile(resolve(root, "data/contributions.json"), `${JSON.stringify(data, null, 2)}\n`);
console.log(
  `wrote data/contributions.json · ${data.totalContributions} contributions · ${weeks.length} weeks`,
);
