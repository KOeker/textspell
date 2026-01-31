import { loadConfig } from "./config.js";
import { scanFiles } from "./scanner.js";
import { replaceInFile } from "./replacer.js";

export function run() {
  console.log("🪄 textspell - Lorem Ipsum Placeholder Replacer\n");
  
  const config = loadConfig();
  const { verbose, dryRun } = config.options;
  
  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No files will be modified\n");
  }
  
  const files = scanFiles(config.paths, verbose);
  
  if (files.length === 0) {
    console.log("⚠️  No files found matching the patterns");
    return;
  }
  
  console.log("\n🔄 Processing files...");
  
  const results = files.map(file => replaceInFile(file, config));

  const totalReplacements = results.reduce((sum, r) => sum + r.replacementCount, 0);
  const filesWithReplacements = results.filter(r => r.replacementCount > 0).length;
  
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary:");
  console.log(`   Files scanned: ${files.length}`);
  console.log(`   Files with replacements: ${filesWithReplacements}`);
  console.log(`   Total replacements: ${totalReplacements}`);
  
  if (dryRun && totalReplacements > 0) {
    console.log("\n💡 Run without dryRun to apply changes");
  } else if (totalReplacements > 0) {
    console.log("\n✅ All replacements completed successfully!");
  } else {
    console.log("\n✨ No placeholders found to replace");
  }
  console.log("=".repeat(50) + "\n");
}
