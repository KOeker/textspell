import fs from "fs";

const DEFAULT_CONFIG = {
  paths: [
    "src/**/*.js",
    "src/**/*.ts",
    "public/**/*.html",
    "README.md"
  ],
  keys: {
    LOREM: { type: "words", default: 50 },
    LOREM_CHARS: { type: "chars", default: 200 },
    DESC: { type: "words", default: 120 }
  },
  custom: {
    TURKISH_LOREM: {
      type: "words",
      language: "tr",
      default: 80
    }
  },
  options: {
    dryRun: false,
    backup: true,
    verbose: true
  }
};

export function initConfig() {
  const file = "textspell.config.json";

  if (fs.existsSync(file)) {
    console.log("textspell.config.json already exists.");
    return;
  }

  fs.writeFileSync(file, JSON.stringify(DEFAULT_CONFIG, null, 2));
  console.log("textspell.config.json has been created.");
}
