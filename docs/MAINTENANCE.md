# 仓库运营与维护规范

## 1. 角色与责任

- **Maintainers**：维护结构、规范、CI、发布和安全响应。
- **产品 Owner**：对 ECX、OMS、DigiOS、B2B、POS 等产品规则负责。
- **Skill Owner**：维护具体 Skill，处理 Issue、触发边界和依赖变化。
- **Security Reviewer**：审查脚本、网络访问、凭据处理和第三方依赖。

每个 Skill 至少有一名领域 Owner；高风险 Skill 建议有备份 Owner。`common-*` 至少由两个产品 Owner 评审，`suite-*` 必须由 Maintainer 评审。

## 2. 分支与评审

- 保护 `main`，禁止直接推送。
- 所有变更通过 PR，至少 1 名适用 CODEOWNER 批准。
- CI 必须通过；脚本型 Skill 必须附可重复测试方式。
- 重命名、破坏性行为、安全敏感脚本单独提交。

## 3. 新 Skill 生命周期

1. 提案：说明用户任务、典型请求、产品 scope、候选名称和差异。
2. 实现：创建自包含目录；细节拆到 `references/`，确定性操作放 `scripts/`。
3. 验证：运行 `python3 scripts/validate_skills.py`；真实运行新增脚本；执行触发正反例。
4. 评审：领域 Owner 检查业务，Maintainer 检查结构与边界，必要时安全评审。
5. 试用：用至少一个真实任务验证输出并记录限制。
6. 发布：合并 `main`，按节奏打 tag 和 GitHub Release。
7. 运营：跟踪误触发、失败案例、依赖变化和反馈。

## 4. 版本策略

仓库整体采用 SemVer：

- PATCH：文案修正、规则澄清、向后兼容修复；
- MINOR：新增 Skill、向后兼容的新能力；
- MAJOR：破坏性约定或安装方式变更。

Skill 可在标准 `metadata.version` 中记录自身版本，但 Git tag/SHA 是可复现发布的主要锚点。Skill 名禁止携带版本号。

发布前：

```bash
python3 scripts/validate_skills.py
git tag -a v1.1.0 -m "Shopex Agent Skills v1.1.0"
git push origin v1.1.0
```

GitHub Release 说明新增、变更、废弃、安全修复和迁移步骤。

## 5. 下载体验

README 始终维护：可安装清单、复制即用的安装命令、检查/更新命令、平台兼容说明和最近稳定 tag。不要要求用户手工拼接 raw 文件；下载必须以完整 Skill 目录为单位。

## 6. 安全基线

公共 Skill 是可执行供应链内容：

- 鼓励安装前审阅 Skill 和脚本；
- 不提交 token、密码、cookie、私钥、客户数据和内部地址；
- 脚本最小权限，危险操作需要显式确认；
- 固定或约束依赖版本，记录运行时要求；
- 不使用混淆代码、静默遥测或未说明的网络上传；
- 外部网页和文件按不可信输入处理；
- 支付、删除、发布、生产变更必须有明确边界与确认点；
- 安全事件期间暂停推荐受影响 Skill，修复后紧急发布。

建议启用 Dependabot、Secret Scanning、适用时的 CodeQL、分支保护和签名 tag。

## 7. 季度质量审查

- 触发是否过宽、漏触发或冲突；
- 真实样例成功率；
- 正文是否超过 500 行、是否应拆分；
- 是否依赖兄弟目录或绝对路径；
- 主要 Agent 和 CLI 是否仍能发现；
- Owner 是否有效；
- 依赖、权限、凭据和外部访问是否变化；
- 六个月内是否有真实使用、反馈或维护。

不要以 star 或安装量作为唯一质量指标；关键是触发正确、任务成功和风险可控。

## 8. 废弃与重命名

1. 以新名称新增 Skill；
2. 旧目录保留精简迁移入口，标明新名称和安装命令；
3. 收窄旧 description，避免继续抢占正常触发；
4. 更新 README、组合 Skill、CI 和模板引用；
5. 至少保留一个稳定发布周期；
6. 在 MAJOR Release 或事先公告日期删除。

禁止简单改成 `*-v2`。

## 9. Issue 节奏

- Bug：提供请求、环境、Agent、期望和实际行为；
- 新 Skill：使用 Proposal 模板；
- 安全问题：不要公开敏感细节，使用 GitHub Security Advisory 或组织安全渠道；
- 建议每周分诊 Issue，每月清理无人维护 PR，每季度治理审查。
