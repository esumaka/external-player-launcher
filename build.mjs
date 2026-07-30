import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { sassPlugin } from 'esbuild-sass-plugin';

// ==================== CONFIG ====================
// Config format: source path -> destination folder (relative to dist/)
// .tsx files are bundled with esbuild (output .js)
// .scss files are compiled with esbuild + sass (output .css)
// Other files/directories are copied as-is
const CONFIG = {
  'src/main.tsx': '.',
  'src/style.scss': '.',
  'src/external-player-launcher.yml': '.',
  'src/assets': '.',
};
// ================================================

const projectRoot = import.meta.dirname;
const distDir = path.resolve(projectRoot, 'dist');
const isDev = process.argv.includes('--dev') || process.argv.includes('-d');

async function cleanDist() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true });
    console.log('🗑️  Cleared dist/');
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function buildWithEsbuild(srcPath, destFolder) {
  const absSrc = path.resolve(projectRoot, srcPath);
  const ext = path.extname(srcPath);
  const stem = path.basename(srcPath, ext);
  const outName = ext === '.scss' ? `${stem}.css` : `${stem}.js`;
  const outfile = path.resolve(distDir, destFolder, outName);

  ensureDir(path.dirname(outfile));

  await esbuild.build({
    entryPoints: [absSrc],
    outfile,
    bundle: true,
    plugins: [sassPlugin()],
    sourcemap: isDev ? 'inline' : false,
    ...(ext === '.tsx' && {
      platform: 'browser',
      format: 'cjs',
      target: ['es2022'],
    }),
  });

  const logPath = path.relative(projectRoot, outfile);
  console.log(`  ${isDev ? '🔧' : '✓'} ${srcPath} → ${logPath}${isDev ? ' (sourcemap)' : ''}`);
}

function copyEntry(srcPath, destFolder) {
  const absSrc = path.resolve(projectRoot, srcPath);

  if (!fs.existsSync(absSrc)) {
    console.warn(`  ⚠️  Source not found: ${srcPath}`);
    return;
  }

  const baseName = path.basename(srcPath);
  const dest = path.resolve(distDir, destFolder, baseName);

  if (fs.statSync(absSrc).isDirectory()) {
    fs.cpSync(absSrc, dest, { recursive: true });
    console.log(`  ✓ ${srcPath}/ → ${path.relative(projectRoot, dest)}/`);
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(absSrc, dest);
    console.log(`  ✓ ${srcPath} → ${path.relative(projectRoot, dest)}`);
  }
}

async function build() {
  await cleanDist();

  console.log('🏗️  Building...\n');

  for (const [srcPath, destFolder] of Object.entries(CONFIG)) {
    const ext = path.extname(srcPath);

    if (ext === '.tsx' || ext === '.scss') {
      await buildWithEsbuild(srcPath, destFolder);
    } else {
      copyEntry(srcPath, destFolder);
    }
  }

  console.log('\n✅ Build complete!');
}

build().catch((err) => {
  console.error('\n❌ Build failed:', err);
  process.exit(1);
});