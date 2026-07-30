import fs from 'fs';
import path from 'path';
import 'dotenv/config'

const pluginsDir = process.env.STASH_PLUGINS_DIR;
const projectName = path.basename(import.meta.dirname);
const destDir = path.join(pluginsDir, projectName);
const srcDir = path.resolve(import.meta.dirname, 'dist');

try {
  if (!fs.existsSync(pluginsDir)) {
    console.error('❌ Destination base directory does not exist: ' + pluginsDir);
    console.error('   Please set STASH_PLUGINS_DIR in .env or check the path.');
    process.exit(1);
  }

  if (!fs.existsSync(srcDir)) {
    console.error('❌ Source directory does not exist: ' + srcDir);
    console.error('   Please run the build first to generate the dist folder.');
    process.exit(1);
  }

  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
    console.log('✅ Successfully deleted old project folder: ' + destDir);
  }

  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✅ Deploy successful! New files moved to: ' + destDir);

} catch (err) {
  console.error('❌ Deploy failed, error:', err.message);
  process.exit(1);
}