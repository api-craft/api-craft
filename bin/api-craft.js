#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('❌ Please provide a project name:');
  console.error('   npx @tselven/api-craft my-app');
  process.exit(1);
}

const destination = path.resolve(process.cwd(), targetDir);

if (fs.existsSync(destination)) {
  console.error('❌ Folder already exists. Choose another name.');
  process.exit(1);
}

// Copy all files except node_modules, .git, and cli.js
const exclude = ['node_modules', '.git', 'cli.js'];

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    if (exclude.includes(item)) continue;
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(__dirname, destination);

console.log('✅ Project scaffolded successfully!');
console.log(`📦 To get started:\n`);
console.log(`   cd ${targetDir}`);
console.log(`   pnpm install`);
console.log(`   pnpm start`);
