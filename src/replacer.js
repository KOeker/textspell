import fs from "fs";
import { generateText } from "./generator.js";

export function replaceInFile(file, config) {
  let content = fs.readFileSync(file, "utf8");
  const { keys, custom, options } = config;
  const allKeys = { ...keys, ...custom };
  
  let replacementCount = 0;
  const replacements = [];

  content = content.replace(/([A-Z_]+)(?:\s+(\d+))?/g, (match, key, amount) => {
    if (!allKeys[key]) return match;
    const cfg = allKeys[key];
    const finalAmount = amount ? parseInt(amount) : cfg.default;
    const generated = generateText(cfg, finalAmount);
    
    replacementCount++;
    replacements.push({
      key,
      amount: finalAmount,
      original: match,
      preview: generated.substring(0, 50) + (generated.length > 50 ? "..." : "")
    });
    
    return generated;
  });

  if (options.verbose && replacementCount > 0) {
    console.log(`\n📝 ${file}`);
    replacements.forEach(r => {
      console.log(`   ${r.original} → ${r.key}(${r.amount}) = "${r.preview}"`);
    });
  }

  if (options.dryRun) {
    if (replacementCount > 0) {
      console.log(`   🔍 [DRY RUN] Would replace ${replacementCount} placeholder(s)`);
    }
    return { file, replacementCount, dryRun: true };
  }

  if (replacementCount > 0) {
    if (options.backup) {
      fs.writeFileSync(file + ".bak", fs.readFileSync(file));
      if (options.verbose) {
        console.log(`   💾 Backup created: ${file}.bak`);
      }
    }
    fs.writeFileSync(file, content);
    if (options.verbose) {
      console.log(`   ✅ File updated with ${replacementCount} replacement(s)`);
    }
  }

  return { file, replacementCount, dryRun: false };
}
