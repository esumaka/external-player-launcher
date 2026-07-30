import fs from 'fs';
import path from 'path';
import 'dotenv/config'

const sourceIndexRepoDir = process.env.STASH_SOURCE_INDEX_DIR;
const projectName = path.basename(import.meta.dirname);
const destDir = path.join(sourceIndexRepoDir, projectName);
const srcDir = path.resolve(import.meta.dirname, 'dist');

try {
  if (!sourceIndexRepoDir) {
    console.error('❌ STASH_SOURCE_INDEX_DIR is not set.');
    console.error('   Please set it in .env.');
    process.exit(1);
  }

  if (!fs.existsSync(sourceIndexRepoDir)) {
    console.error('❌ Repository directory does not exist: ' + sourceIndexRepoDir);
    console.error('   Please check the STASH_SOURCE_INDEX_DIR setting in .env.');
    process.exit(1);
  }

  if (!fs.existsSync(srcDir)) {
    console.error('❌ Source directory does not exist: ' + srcDir);
    console.error('   Please run the build first to generate the dist folder.');
    process.exit(1);
  }

  // Force clean and rebuild target plugins directory
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });

  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✅ Release successful! New files moved to: ' + destDir);

} catch (err) {
  console.error('❌ Release failed, error:', err.message);
  process.exit(1);
}