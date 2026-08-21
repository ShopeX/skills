#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const [inputArg, outputArg] = process.argv.slice(2);
if (!inputArg || !outputArg) {
  console.error('用法: node sanitize_auth_state.mjs <full-state.json> <auth-state.json>');
  process.exit(2);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);
const source = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const requiredNames = new Set(['auth_token', 'JDY_SID', '_csrf']);
const cookies = (source.cookies || []).filter(
  (cookie) => requiredNames.has(cookie.name) &&
    (cookie.domain === '.jiandaoyun.com' || cookie.domain === 'jiandaoyun.com') &&
    typeof cookie.value === 'string' && cookie.value.length > 0,
);

const names = new Set(cookies.map((cookie) => cookie.name));
if (cookies.length !== requiredNames.size || names.size !== requiredNames.size) {
  console.error(`需要 auth_token、JDY_SID、_csrf 三个 Cookie，实际找到 ${cookies.length} 个`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true, mode: 0o700 });
const tempPath = `${outputPath}.${process.pid}.tmp`;
fs.writeFileSync(tempPath, `${JSON.stringify({ cookies, origins: [] }, null, 2)}\n`, { mode: 0o600 });
fs.chmodSync(tempPath, 0o600);
fs.renameSync(tempPath, outputPath);
fs.chmodSync(outputPath, 0o600);

console.log(`已保存最小认证状态: ${outputPath}`);
console.log('Cookie: auth_token、JDY_SID、_csrf；值已隐藏');
