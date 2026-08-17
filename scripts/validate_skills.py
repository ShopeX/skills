#!/usr/bin/env python3
"""Validate Agent Skills specification basics and Shopex repository rules."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILLS_DIR = ROOT / "skills"
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ALLOWED_SCOPES = {"ecx", "oms", "digios", "common", "suite", "router"}
ALLOWED_TOP_FIELDS = {
    "name",
    "description",
    "license",
    "compatibility",
    "metadata",
    "allowed-tools",
}


def parse_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def parse_frontmatter(path: Path) -> tuple[dict[str, str], list[str]]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, ["SKILL.md must start with YAML frontmatter delimiter '---'"]

    try:
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        return {}, ["YAML frontmatter has no closing '---'"]

    data: dict[str, str] = {}
    for lineno, line in enumerate(lines[1:end], start=2):
        if not line.strip() or line.lstrip().startswith("#") or line[:1].isspace():
            continue
        if ":" not in line:
            errors.append(f"line {lineno}: invalid top-level YAML field")
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        if key in data:
            errors.append(f"line {lineno}: duplicate field '{key}'")
        data[key] = parse_scalar(value)

    if not any(line.strip() for line in lines[end + 1 :]):
        errors.append("SKILL.md body must not be empty")
    return data, errors


def validate_skill(skill_dir: Path) -> list[str]:
    errors: list[str] = []
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        return ["missing SKILL.md"]

    name = skill_dir.name
    if not 1 <= len(name) <= 64 or not NAME_RE.fullmatch(name):
        errors.append("directory name must be 1-64 lowercase letters/numbers/hyphens without edge or repeated hyphens")
    scope = name.split("-", 1)[0]
    if scope not in ALLOWED_SCOPES:
        errors.append(f"unregistered scope '{scope}'; register it in docs/NAMING.md and validator")

    data, parse_errors = parse_frontmatter(skill_file)
    errors.extend(parse_errors)
    unknown = sorted(set(data) - ALLOWED_TOP_FIELDS)
    if unknown:
        errors.append(f"unsupported top-level frontmatter fields: {', '.join(unknown)}")

    declared_name = data.get("name", "")
    description = data.get("description", "")
    compatibility = data.get("compatibility", "")
    if declared_name != name:
        errors.append(f"frontmatter name '{declared_name}' must match directory '{name}'")
    if not 1 <= len(description) <= 1024:
        errors.append("description must contain 1-1024 characters")
    if description and not re.search(r"\b(use|when|用于|使用|适用|当)\b", description, re.IGNORECASE):
        errors.append("description should state when to use the skill")
    if compatibility and len(compatibility) > 500:
        errors.append("compatibility must not exceed 500 characters")

    text = skill_file.read_text(encoding="utf-8")
    if re.search(r"(?<![A-Za-z0-9])\.\./", text):
        errors.append("SKILL.md must not reference parent or sibling paths ('../')")
    return errors


def main() -> int:
    if not SKILLS_DIR.is_dir():
        print("ERROR: missing skills/ directory")
        return 1

    skill_dirs = sorted(path for path in SKILLS_DIR.iterdir() if path.is_dir())
    if not skill_dirs:
        print("ERROR: no skills found")
        return 1

    failures = 0
    for skill_dir in skill_dirs:
        errors = validate_skill(skill_dir)
        if errors:
            failures += len(errors)
            for error in errors:
                print(f"ERROR [{skill_dir.name}]: {error}")
        else:
            print(f"OK    [{skill_dir.name}]")

    if failures:
        print(f"\nValidation failed with {failures} error(s).")
        return 1
    print(f"\nValidated {len(skill_dirs)} skill(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
