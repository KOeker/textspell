#!/usr/bin/env node
import { run } from "../src/index.js";
import { initConfig } from "../src/init.js";

const args = process.argv.slice(2);

if (args[0] === "init") {
  initConfig();
} else {
  run();
}
