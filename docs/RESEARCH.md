# 标准 Skill 仓调研结论

调研日期：2026-08-13。

## 1. 开放标准

[Agent Skills Specification](https://agentskills.io/specification) 定义跨客户端核心格式：

- Skill 是至少包含 `SKILL.md` 的目录；
- 可选目录通常为 `scripts/`、`references/`、`assets/`；
- `SKILL.md` 由 YAML frontmatter 和 Markdown 正文组成；
- `name`、`description` 必填；
- `name` 为 1–64 字符，只允许小写字母、数字和连字符，不能首尾或连续使用连字符，必须匹配父目录；
- `description` 为 1–1024 字符，必须说明“做什么”和“何时使用”；
- 可选字段包括 `license`、`compatibility`、`metadata`、实验性的 `allowed-tools`；
- 推荐 `SKILL.md` 少于 500 行，通过 references 渐进披露；
- 参考校验命令为 `skills-ref validate ./my-skill`。

以上是标准事实，本仓校验以此为下限。

## 2. Anthropic 官方示例仓

[anthropics/skills](https://github.com/anthropics/skills) 使用单仓多 Skill，主要放在 `skills/<skill-name>/`；每个 Skill 自包含；根部维护 README、模板和平台分发配置。它提供 Claude Plugin Marketplace 安装方式，同时明确标准信息以 agentskills.io 为准。

结论：Shopex 使用 `skills/` 一层扁平目录，是与官方示例一致且跨平台风险低的选择。

## 3. Skills CLI 与 skills.sh

[skills.sh 文档](https://skills.sh/docs) 和 [vercel-labs/skills](https://github.com/vercel-labs/skills) 提供跨 Agent 发现、安装和更新：

```bash
npx skills add <owner/repo>
npx skills add <owner/repo> --list
npx skills add <owner/repo> --skill <skill-name>
npx skills add <owner/repo> --all
npx skills check
npx skills update
```

CLI 支持 GitHub shorthand、URL 和本地路径。skills.sh 使用匿名聚合安装数据生成榜单，但这不等于人工认证或安全背书，安装前仍应审查源码。

> 生态页面中也可能展示 `owner/repo@skill`；仓库文档优先使用 CLI 明确支持的 `--skill <name>`，避免把展示 selector 当作唯一稳定语法。

## 4. OpenAI Codex 现状

[openai/skills](https://github.com/openai/skills) 已明确 deprecated，并指向 [Build Skills](https://learn.chatgpt.com/docs/build-skills) 及 Plugin 分发。Codex 仍支持 Agent Skills，仓库内可使用 `.agents/skills`，可复用分发可包装为 skill-only plugin。

结论：不以旧仓布局作为长期唯一标准；以开放 `SKILL.md` 为核心，按需增加 Codex Plugin 包装层。

## 5. Shopex 项目建议（非开放标准硬性要求）

1. 官方仓库确定为 [`ShopeX/skills`](https://github.com/ShopeX/skills)，Git Clone 地址为 `https://github.com/ShopeX/skills.git`；安装命令统一使用 `ShopeX/skills`。
2. 采用扁平 `skills/<globally-unique-name>/`，产品写入名称而不是多层目录。
3. scope 固定为产品前缀、`common-`、`suite-`、`router-`。
4. 每个 Skill 自包含；组合 Skill 只在 Agent 层编排，不假设安装器处理依赖。
5. 仓库用 SemVer tag 发布，生产安装锁定 tag/SHA，Skill 名不带版本。
6. 通过 CODEOWNERS、PR 模板、自动校验、触发正反例和季度审查运营。

## 6. 为什么不做一个巨大的 `shopex` 万能 Skill

超大组合 Skill 容易误触发；会把 ECX、OMS、DigiOS 规则同时装入上下文；Owner 和版本边界不清；任一产品变化都要求整体调整；用户也无法按需安装。

推荐用小而专的产品 Skill 承载知识，`suite-*` 只做明确端到端流程，`router-*` 只处理真正含糊的入口。这仍是统一的 Shopex Skill 租户/组合仓，但不是不可维护的巨型 Skill。
