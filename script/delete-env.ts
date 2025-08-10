// Deletes all env files that are not .env.${VERCEL_ENV}

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const envDir = path.join(__dirname, '..');
const vercelEnv = process.env.VERCEL_ENV;

// Get all .env.* files
const envFiles = await glob('.env.*', { cwd: envDir });

console.log(`Found ${envFiles.length} env files`);
console.log(`VERCEL_ENV: ${vercelEnv}`);

let deletedCount = 0;
for (const file of envFiles) {
  // Skip the file that matches .env.${VERCEL_ENV}
  if (file === `.env.${vercelEnv}`) {
    console.log(`Keeping: ${file}`);
    continue;
  }

  if (file === '.env.keys') {
    console.log(`Keeping: ${file}`);
    continue;
  }

  const filePath = path.join(envDir, file);
  await fs.unlink(filePath);
  console.log(`Deleted: ${file}`);
  deletedCount++;
}

console.log(`Deleted ${deletedCount} env files that are not .env.${vercelEnv}`);
