import fs from "fs";

export function loadConfig() {
  const raw = fs.readFileSync("textspell.config.json", "utf8");
  return JSON.parse(raw);
}
