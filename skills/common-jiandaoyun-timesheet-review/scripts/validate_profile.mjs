#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const profilePath = process.argv[2];
if (!profilePath) {
  console.error('用法: node validate_profile.mjs <profile.json>');
  process.exit(2);
}

let profile;
try {
  profile = JSON.parse(fs.readFileSync(path.resolve(profilePath), 'utf8'));
} catch (error) {
  console.error(`无法读取 profile: ${error.message}`);
  process.exit(2);
}

const errors = [];
const requireText = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) errors.push(`${label} 必须是非空字符串`);
};
const validateUrl = (value, label, required = true) => {
  if (!value && !required) return;
  requireText(value, label);
  if (typeof value !== 'string' || !value.trim()) return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') errors.push(`${label} 必须使用 https`);
    if (parsed.hostname !== 'jiandaoyun.com' && !parsed.hostname.endsWith('.jiandaoyun.com')) {
      errors.push(`${label} 必须指向 jiandaoyun.com`);
    }
  } catch {
    errors.push(`${label} 不是有效 URL`);
  }
};

if (profile.version !== 1) errors.push('version 必须为 1');
requireText(profile.profileName, 'profileName');
requireText(profile.personName, 'personName');
requireText(profile.tableName, 'tableName');
validateUrl(profile.listUrl, 'listUrl');
validateUrl(profile.todoUrl, 'todoUrl');
validateUrl(profile.loginUrl, 'loginUrl', false);

if (profile.transportMode && !['session_api', 'browser'].includes(profile.transportMode)) {
  errors.push('transportMode 只能是 session_api 或 browser');
}
for (const [key, value] of [['authStatePath', profile.authStatePath], ['runtimeStatePath', profile.runtimeStatePath]]) {
  if (value !== undefined) requireText(value, key);
}

for (const key of ['person', 'status', 'node', 'owner']) {
  requireText(profile.fields?.[key], `fields.${key}`);
}
requireText(profile.values?.activeStatus, 'values.activeStatus');
requireText(profile.values?.confirmNode, 'values.confirmNode');

if (!Array.isArray(profile.displayFields) || profile.displayFields.length === 0) {
  errors.push('displayFields 必须是非空字符串数组');
} else if (profile.displayFields.some((field) => typeof field !== 'string' || !field.trim())) {
  errors.push('displayFields 只能包含非空字符串');
}
if (!Array.isArray(profile.matchFields) || profile.matchFields.length < 2) {
  errors.push('matchFields 至少包含两个字段');
} else if (profile.matchFields.some((field) => typeof field !== 'string' || !field.trim())) {
  errors.push('matchFields 只能包含非空字符串');
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`profile 有效: ${profile.profileName} (${profile.personName})`);
