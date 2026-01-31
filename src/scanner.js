import { globSync } from "glob";

export function scanFiles(paths, verbose = false) {
  if (verbose) {
    console.log("\n🔍 Scanning files...");
    console.log("Patterns:", paths);
  }
  
  const files = [];
  paths.forEach(pattern => {
    const matches = globSync(pattern);
    if (verbose && matches.length > 0) {
      console.log(`  ✓ ${pattern} → ${matches.length} file(s)`);
    }
    files.push(...matches);
  });
  
  const uniqueFiles = [...new Set(files)];
  
  if (verbose) {
    console.log(`\n📁 Total files found: ${uniqueFiles.length}`);
    uniqueFiles.forEach(f => console.log(`   - ${f}`));
  }
  
  return uniqueFiles;
}
