#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const profilePath = process.argv[2];
if (!profilePath) {
  console.error('用法: node build_browser_script.mjs <profile.json>');
  process.exit(2);
}

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const profile = JSON.parse(fs.readFileSync(path.resolve(profilePath), 'utf8'));
const extractor = fs.readFileSync(path.join(scriptDir, 'extract_pending_rows.js'), 'utf8');

process.stdout.write(
  `globalThis.__JIANDAOYUN_TIMESHEET_PROFILE__ = ${JSON.stringify(profile)};\n${extractor}\n`,
);
