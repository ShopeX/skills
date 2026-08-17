# 贡献 Shopex Agent Skills

感谢为 ECX、OMS、DigiOS 或 Shopex 共享能力贡献 Skill。

## 提交前

1. 阅读 [`docs/NAMING.md`](docs/NAMING.md)。
2. 搜索现有 Skill，确认不是重复能力。
3. 明确产品 scope、用户任务、触发边界、Owner 和风险。
4. 新产品前缀必须先登记。

## 创建

```bash
cp -R .github/skill-template skills/<skill-name>
```

修改 `SKILL.md`：

- `name` 与目录完全一致；
- `description` 说明做什么、何时触发和必要边界；
- 正文使用命令式、可执行指令；
- 详细资料放 `references/`；
- 重复且要求确定性的操作放 `scripts/`；
- 输出模板和静态资源放 `assets/`；
- 删除不需要的示例文件；
- 不新增 Skill 目录内的 README、CHANGELOG 或安装指南。

## Pull Request 必备内容

- 用户问题与实际收益；
- 5 个应触发样例；
- 5 个不应触发样例；
- 2 个相邻 Skill 边界样例；
- 测试命令和结果；
- 所需工具、网络、权限和外部依赖；
- Skill Owner 与备份 Owner；
- 兼容性影响。

## 验证

```bash
python3 scripts/validate_skills.py
```

如安装了官方参考校验器，再运行：

```bash
skills-ref validate skills/<skill-name>
```

新增或修改脚本必须真实执行代表性样例。只读文档 Skill 也必须以真实请求做触发和结果测试。

## 写作原则

- 假设 Agent 已具备通用知识，只写 Shopex 特有、易错或必须一致的内容；
- `SKILL.md` 推荐不超过 500 行；
- 不把 description 写成营销文案或关键词堆砌；
- 不把完整产品手册塞入正文；
- 不伪造工具、命令、API 或成功结果；
- 不记录凭据和客户数据。

## Review

- 产品 Skill：对应产品 Owner + Maintainer；
- `common-*`：至少两个产品 Owner + Maintainer；
- `suite-*` / `router-*`：Maintainer，必要时所有受影响产品 Owner；
- 含脚本、联网、生产系统或高风险写操作：增加 Security Reviewer。

合并即表示该 Skill 可从 `main` 安装。维护规则见 [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)。
