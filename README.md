# Shopex Agent Skills

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-111827)](https://agentskills.io)

Shopex（商派）的公共 Agent Skills 单仓库，统一承载 ECX、OMS、DigiOS 及后续产品线的专业 Skill、跨产品共享能力和端到端组合流程。

> 官方 GitHub 仓库：[`ShopeX/skills`](https://github.com/ShopeX/skills)，Clone 地址：`https://github.com/ShopeX/skills.git`。

## 快速安装

### Skills CLI（推荐）

```bash
# 列出可安装项
npx skills add ShopeX/skills --list

# 安装指定 Skill
npx skills add ShopeX/skills --skill ecx-shopping-assistant

# 安装仓库全部 Skill
npx skills add ShopeX/skills --all

# 全局安装并跳过交互确认
npx skills add ShopeX/skills --skill ecx-shopping-assistant -g -y

# 检查和更新
npx skills check
npx skills update
```

CLI 支持 Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot、Windsurf 等多种 Agent；实际安装目录由 CLI 根据目标 Agent 决定。也可使用完整 URL：

```bash
npx skills add https://github.com/ShopeX/skills --skill ecx-shopping-assistant
```

如果客户端不支持 Skills CLI，可复制完整的 `skills/<skill-name>/` 到客户端的 Skills 目录。不要只复制 `SKILL.md`，否则会遗漏 `scripts/`、`references/` 和 `assets/`。

### 平台说明

- Claude Code 可直接使用 Skills CLI。未来若包装为 Claude Plugin Marketplace，可额外提供 `/plugin marketplace add ...`，但不将厂商专属机制作为唯一分发方式。
- Codex 支持 Agent Skills；OpenAI 旧 `openai/skills` 仓库已废弃，当前官方方向是 skill-only plugin。Shopex 仍以开放 `SKILL.md` 标准为核心，可按需增加平台包装层。
- 安装后若 Agent 未发现新 Skill，请重启对应 Agent 会话。

## 当前 Skills

| Skill | 分类 | 用途 |
|---|---|---|
| [`ecx-shopping-assistant`](skills/ecx-shopping-assistant/SKILL.md) | ECX 产品 Skill | ECX/ECShopX 自然语言购物、下单与支付二维码闭环 |

新增 Skill 后必须同步此表。

## 仓库结构

```text
agent-skills/
├── skills/                    # 一层扁平、名称全局唯一
│   └── ecx-shopping-assistant/
│       ├── SKILL.md           # 必需
│       ├── scripts/           # 可选：可执行脚本
│       ├── references/        # 可选：按需读取的详细资料
│       └── assets/            # 可选：模板、图片、静态数据
├── docs/
│   ├── NAMING.md              # 命名、分类和产品前缀
│   ├── MAINTENANCE.md         # 发布、维护、废弃和安全治理
│   └── RESEARCH.md            # 标准仓调研与设计依据
├── scripts/validate_skills.py # 本地/CI 校验
├── .github/                   # PR、Issue、CODEOWNERS、CI
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## 三条强制规则

1. 目录名、`SKILL.md` 的 `name`、安装时的 `--skill <name>` 必须完全一致。
2. 每个 Skill 必须自包含，禁止引用仓库根目录或兄弟 Skill 的文件。
3. 产品归属写入全局唯一名称：`ecx-*`、`oms-*`、`digios-*`；跨产品使用 `common-*`，完整组合流程使用 `suite-*`，仅做选择的路由使用 `router-*`。

完整规则见 [`docs/NAMING.md`](docs/NAMING.md)，投稿流程见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。

## 创建一个 Skill

```bash
cp -R .github/skill-template skills/ecx-order-diagnosis
# 修改 SKILL.md，确保 name 与目录一致
python3 scripts/validate_skills.py
```

最小格式：

```markdown
---
name: ecx-order-diagnosis
description: Diagnose ECX order lifecycle failures. Use when an ECX order fails during creation, payment callbacks, fulfillment, or status transitions.
---

# ECX Order Diagnosis

写给 Agent 的可执行指令，而不是产品宣传文案。
```

## 版本与发布

- `main` 保持可安装，所有变更通过 PR 和 CI。
- 仓库使用 SemVer Git tag（如 `v1.3.0`）和 GitHub Release 发布快照；生产环境建议锁定 tag 或 commit SHA。
- 不在 Skill 名中加入 `v2`、日期或团队名。
- 破坏性重命名采用“新 Skill + 旧名废弃入口 + 至少一个稳定发布周期”。
- 至少每季度检查触发边界、失效链接、依赖、Owner、安全风险和真实使用情况。

## 标准与参考

- [Agent Skills Specification](https://agentskills.io/specification)
- [Agent Skills Best Practices](https://agentskills.io/skill-creation/best-practices)
- [Anthropic Skills 示例仓](https://github.com/anthropics/skills)
- [Vercel Skills CLI](https://github.com/vercel-labs/skills)
- [skills.sh 文档](https://skills.sh/docs)
- [OpenAI Skills（已废弃）](https://github.com/openai/skills)
- [OpenAI Build Skills](https://learn.chatgpt.com/docs/build-skills)

## License

仓库治理文件和未单独声明许可证的 Skill 采用 [MIT License](LICENSE)。第三方素材或单独声明的 Skill 以其目录内许可证为准。
