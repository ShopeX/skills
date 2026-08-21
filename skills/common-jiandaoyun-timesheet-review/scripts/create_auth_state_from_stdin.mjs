#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const outputArg = process.argv[2];
if (!outputArg) {
  console.error('用法: 从标准输入传入 JSON（auth_token、JDY_SID、_csrf） | node create_auth_state_from_stdin.mjs <auth-state.json>');
  process.exit(2);
}

let raw = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) raw += chunk;

let input;
try {
  input = JSON.parse(raw);
} catch {
  console.error('标准输入必须是 JSON，且不能只提供 auth_token');
  process.exit(1);
}

const requiredNames = ['auth_token', 'JDY_SID', '_csrf'];
if (requiredNames.some((name) => typeof input[name] !== 'string' || !input[name].trim() || /\s/.test(input[name]))) {
  console.error('必须同时提供 auth_token、JDY_SID、_csrf；单独 auth_token 无法认证');
  process.exit(1);
}

const outputPath = path.resolve(outputArg);
const state = {
  cookies: requiredNames.map((name) => ({
    name,
    value: input[name].trim(),
    domain: '.jiandaoyun.com',
    path: '/',
    expires: -1,
    httpOnly: name !== '_csrf',
    secure: false,
    sameSite: 'Lax',
  })),
  origins: [],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true, mode: 0o700 });
const tempPath = `${outputPath}.${process.pid}.tmp`;
fs.writeFileSync(tempPath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
fs.chmodSync(tempPath, 0o600);
fs.renameSync(tempPath, outputPath);
fs.chmodSync(outputPath, 0o600);
console.log(`已保存最小认证状态（auth_token、JDY_SID、_csrf）: ${outputPath}（值已隐藏）`);
