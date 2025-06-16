#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to actual project root (one level up from /bin)
const projectRoot = path.resolve(__dirname, '..');

// Ask user input (like prompt)
function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    })
  );
}

// Files/folders to exclude from scaffolding
const exclude = [
  'node_modules',
  '.git',
  '.github',
  '.vscode',
  'bin',
  '.npmignore',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  '.DS_Store'
];

// Recursive copy
function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    if (exclude.includes(item)) continue;

    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(async () => {
  console.log(`\n🚀 Welcome to API Craft Scaffold\n`);

  const projectName = await ask('📁 Enter your project folder name: ');
  if (!projectName) {
    console.error('❌ Project name is required!');
    process.exit(1);
  }

  const destination = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(destination)) {
    console.error('❌ Folder already exists. Please choose another name.');
    process.exit(1);
  }

  const pm = await ask(
    '📦 Choose package manager (pnpm / npm / yarn) [pnpm]: '
  );

  const selectedPM = pm === '' ? 'pnpm' : pm.toLowerCase();

  if (!['pnpm', 'npm', 'yarn'].includes(selectedPM)) {
    console.error('❌ Invalid package manager selected.');
    process.exit(1);
  }

  console.log(`\n🛠  Scaffolding project in ./${projectName}`);
  copyRecursive(projectRoot, destination);

  console.log(`\n📦 Installing dependencies with ${selectedPM}...\n`);

  try {
    execSync(`${selectedPM} install`, {
      cwd: destination,
      stdio: 'inherit',
    });
    console.log('\n✅ Setup complete!');
    console.log(`👉 To get started:\n`);
    console.log(`   cd ${projectName}`);
    console.log(`   ${selectedPM} run dev`);
  } catch (err) {
    console.error(`❌ ${selectedPM} install failed. Run it manually inside the folder.`);
  }
})();
