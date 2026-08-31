# Shopex Agent Skill 命名与分类规范

本规范适用于所有提交到 Shopex 公共 Agent Skills 仓库的内容。

## 1. 基础命名约束

Skill 名必须：

- 与父目录名完全一致；
- 长度为 1–64 个字符；
- 仅使用小写 ASCII 字母、数字和单连字符；
- 不以连字符开头或结尾，不包含连续连字符；
- 在仓库中全局唯一；
- 推荐 2–5 个单词，推荐不超过 48 个字符。

基础正则：

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Shopex 公共仓进一步要求名称以已注册 scope 开头。

## 2. 分类与名称语法

正式前缀：`ecx-*` / `oms-*` / `digios-*` / `b2b-*` / `pos-*` / `suite-*`。既有跨产品 Skill 可继续使用 `common-*`。不再使用 `router-*`。

| 类别 | 语法 | 用途 | 示例 |
|---|---|---|---|
| 产品专属 | `<product>-<capability>[-<object>]` | 单产品内的专业任务 | `ecx-order-diagnosis` |
| 跨产品共享 | `common-<capability>[-<object>]` | 至少两个产品共同使用 | `common-api-contract-review` |
| 组合流程 | `suite-<workflow>` | 编排多个能力完成完整流程 | `suite-release-readiness` |

能力名优先使用明确的动作/结果词：`diagnosis`、`migration`、`review`、`reconcile`、`analysis`、`export`。禁止使用意义空泛的 `helper`、`tool`、`utils`、`manager`、`assistant`、`super-skill`；若能力本身是面向终端用户的完整助手（如购物助手），可经评审使用 `assistant`。

## 3. 产品前缀注册表

| 正式产品名 | 前缀 | 可写入 description 的别名 | 状态 |
|---|---|---|---|
| ECX / ECShopX | `ecx-` | ECX、ECShopX、ecshopx | active |
| OMS | `oms-` | OMS、订单管理、库存履约 | active |
| DigiOS | `digios-` | DigiOS、digios | active |
| B2B | `b2b-` | B2B、批发、经销 | active |
| POS | `pos-` | POS、门店收银、线下零售 | active |
| 跨产品共享 | `common-` | Shopex shared/common | active |
| 组合流程 | `suite-` | end-to-end、完整流程 | active |

新增产品线时，先通过 PR 修改此注册表并指定 CODEOWNER，再提交产品 Skill。禁止未经注册创造同义前缀，如 `digi-os-`、`dos-`、`digital-os-`、`wholesale-`、`cashier-`。

## 4. 推荐与反例

| 推荐 | 反例 | 原因 |
|---|---|---|
| `ecx-shopping-assistant` | `ecshopx` | 后者只表示产品，未表达能力 |
| `ecx-order-diagnosis` | `ECX_Order_Debug` | 大写、下划线、动作含糊 |
| `ecx-java-service-migration` | `php2java-v2` | 缺产品、含版本、缩写不稳定 |
| `oms-inventory-reconcile` | `oms-tool` | `tool` 不表达结果 |
| `oms-fulfillment-troubleshooting` | `fulfillment` | 缺产品与动作 |
| `digios-report-analysis` | `digios-ai` | `ai` 是技术标签，不是能力 |
| `digios-data-export` | `DigiOS/export` | 大写和斜杠不合法 |
| `b2b-quote-review` | `b2b-tool` | `tool` 不表达结果 |
| `pos-checkout-recovery` | `POS_Cashier_v2` | 大写、下划线、含版本 |
| `common-api-contract-review` | `shared-common-api-utils` | scope 重复且 `utils` 含糊 |
| `common-incident-triage` | `global-fix-all` | 夸大且触发范围失控 |
| `suite-release-readiness` | `ecx-oms-release-super-skill` | 枚举产品、营销化、难扩展 |

## 5. Description 规范

`description` 是 Agent 决定是否加载 Skill 的首要信号，必须说明：

1. 做什么以及预期结果；
2. 属于哪个产品/领域；
3. 哪些用户表达、文件、仓库或故障信号应触发；
4. 有歧义时，与相邻 Skill 的边界。

推荐公式：

```text
<能力与结果>. Use when <产品/仓库上下文> or when the user mentions <典型动作和领域对象>. Do not use for <最易混淆的边界>.
```

示例：

```yaml
description: Diagnose ECX order creation, payment callback, fulfillment, and status-flow failures. Use when working in an ECX repository or when the user mentions ECX order exceptions. Do not use for OMS inventory reconciliation.
```

避免：

```yaml
description: ECX skill.
description: Use for all Shopex tasks.
description: A powerful intelligent professional assistant.
```

团队中英文混合提问时，可放置必要的中英文领域词，但不要堆砌同义关键词。

## 6. 目录与自包含规则

统一采用一层扁平目录：

```text
skills/ecx-order-diagnosis/SKILL.md
skills/oms-inventory-reconcile/SKILL.md
skills/common-api-contract-review/SKILL.md
```

禁止：

```text
skills/ecx/order-diagnosis/SKILL.md
skills/ecx-order-diagnosis/../../shared/policy.md
skills/ecx-order-diagnosis/../common-x/references/a.md
```

不同安装器的扫描深度和依赖复制行为不同；单个 Skill 被复制或安装后仍必须完整工作。

## 7. Common 与 Suite 的边界

### `common-*`

仅当至少两个产品已实际使用或明确共同采用，且输入、输出、质量标准基本一致时使用。不要为了“未来可能复用”而提前抽象。

### `suite-*`

完成用户可感知的端到端流程，可编排产品 Skill 和 Common Skill。它不等于包管理器，不能假设安装器会自动安装依赖；应检查能力是否可用并明确降级方式。

依赖方向保持：

```text
suite → product/common specialist
```

禁止环状依赖。不新增 `router-*` Skill；产品不明确时，应在对应产品 Skill 的 description 中写清边界，而不是单独做路由 Skill。

## 8. 触发测试最低要求

每个新 Skill 在 PR 中至少提供：

- 5 个应触发样例；
- 5 个不应触发样例；
- 2 个与相邻 Skill 容易混淆的边界样例。

名称、description 或职责变化时，必须同步更新测试样例。
