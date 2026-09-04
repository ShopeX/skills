---
name: oms-mcp-sales-detail-statistics
description: "OMS电商场景：Use when the user asks about OMS sales detail statistics, sales summary, sales ranking, today's or this month's sales, product-level sales, shop-level sales, revenue, GMV, sales trend, or sales performance. Always ask the user to choose material_type (basic_material / sales_material / sales_and_basic_material) and time range before calling the tool; do not infer or default either. Read-only aggregation; never call for create/update/delete/write operations, Finder metadata exposure, or front-end UI design.。用于用户询问相关业务能力时；不用于无关产品或超出正文边界的操作。"
---

# OMS 销售明细统计 MCP Skill

## 适用场景

- 查询销售明细统计数据。
- 获取按商品和按店铺的只读聚合结果。
- 复用 OMS 现有统计口径回答销售明细问题。

## 查询引导

- **常见口语 → 默认参数映射（命中后直接带默认参数查询，不要反问）**：

  | 用户说法 | 默认行为 |
  |---|---|
  | `今日销售` / `今天销售` / `今日销售情况` | `time_from = time_to = 今天`（YYYY-MM-DD）；`material_type` 无默认值,必须在反问中由用户明确选择 |
  | `昨天销售` | `time_from = time_to = 昨天` |
  | `最近 7 天销售` / `近 7 天销售` | `time_from = 今天 - 6`, `time_to = 今天` |
  | `本周销售` / `这周销售` / `本周销售情况` | `time_from = 本周一`, `time_to = 今天`（**周一至周日口径**，ISO 8601） |
  | `本月销售` / `这个月销售` / `当月销售` | `time_from = 当月 1 号`, `time_to = 今天`（跨度 ≤ 31 天） |

- **统计口径反问**（按缺口逐项问，不要一次问完）：
  - 时间范围缺失（用户没说今/昨/本周/本月/具体日期）→ 反问时间范围，给四个快捷选项：今日 / 昨日 / 本周 / 本月。
  - `material_type` 缺失（用户没说基础物料 / 销售物料 / 销售明细统计中任一项）→ **始终反问**,给三个选项:基础物料统计 / 销售物料统计 / 销售明细统计（基础物料 + 销售物料）。**即使命中时间默认映射（如「今日销售」）,`material_type` 仍要反问**——它没有默认值,绝不能在用户没说的情况下推断 `sales_and_basic_material`。
  - 两者都缺 → 先问时间范围，再问物料口径，分两次反问。
  - 用户已给的字段不要回问；反问是补齐缺口，不是重做澄清。
- **`material_type` 单值约束（关键）**：每次调用**只能选一种** `material_type`（`basic_material` / `sales_material` / `sales_and_basic_material` 三选一），后端不接受数组。**无默认值**,必须由用户在前述反问中明确选择。需要多种视角时分多次调用后合并结果。
- **按商品 / 店铺过滤（先把口径词映射到字段，再调用）**：
  - 商品字段与 `material_type` 的兼容性：

    | 用户说法 | 推荐 `material_type` | 推荐字段 | 兜底 |
    |---|---|---|---|
    | 「查商品 / 货号 `<bn>`」「这个商品的销售」 | `sales_and_basic_material` | `bn=<bn>`（也是 `sales_material_bn`） | 零结果时改 `sales_material` + `goods_bn=<bn>` |
    | 「查销售物料 / SKU `<bn>`」 | `sales_material` | `goods_bn=<bn>` | — |
    | 「查基础物料 / 物料编码 `<bn>`」 | `basic_material` | `bn=<bn>` | — |

  - **默认兜底**：用户没说「销售物料 vs 基础物料」时，先按 `sales_and_basic_material` + `bn` 查；零结果再切到 `sales_material` + `goods_bn`。
  - `bn` / `goods_bn` / `sales_material_bn` 必须是**字符串**，不支持数组批量；用户说「查这几个商品」时只能逐个查或拉全量再客户端过滤。
  - **店铺 / 组织标识有三种形态，先识别再走不同路径**（直接传名字当 ID 会得到「数据为空」假象——名称 ≠ ID）：

    | 用户给出 | 形态 | 处理路径 |
    |---|---|---|
    | `<your_shop_bn>` / 「店铺编码 `xxx`」 | `shop_bn` | 调 `oms-mcp-shop-management` 的 `shop_list`，按 `bn` / `code` 过滤拿 `shop_id` |
    | 32 位十六进制 UUID | `shop_id` | 直接当 `shop_id` 传，无需解析 |
    | 「视频号小店」/ 店名 / 「天猫店 A」 | 名称 | 调 `shop_list` 按名称模糊匹配；多条结果需反问消歧 |

    - **多标识解析**：用户说「A 店和 B 店」这种多个店时，**逐个解析后再合并成 `shop_id[]` 数组**。
    - **解析失败**：shop_list 返回空 / 多条同名时，先反问用户「找不到店铺 `xxx`，确认编码是否正确？」，不要直接当「今日无销售」汇报。
    - **类别级筛选**：用户说「微信视频号」这种类型时，优先 `shop_type=<your_shop_type>`，省去逐店解析。
- **时间范围硬约束**：`time_from` 与 `time_to` 必须同时提供；跨度不超过 31 天；日期格式必须是 `YYYY-MM-DD`。
- **缺日期时不要直接调用**——先按默认映射补齐，避免触发后端 422（详见下方错误码速查）。

## 不适用场景

- 前端卡片或 assistant UI 设计。
- `filters`、`columns`、`by_date` 等 Finder 辅助元数据暴露。
- 创建、更新、删除或任何写操作。
- 直接调用接口、操作数据库或绕过 MCP。

## 工具速查

`sales_detail_statistics`：查询销售明细与聚合结果（只读）。

> 关键参数：
> - `material_type`（必填）
> - `time_from` / `time_to`（必填成对，跨度 ≤ 31 天，格式 `YYYY-MM-DD`）
> - `bn` / `goods_bn` / `sales_material_bn`：按 `material_type` 三选一（详见「按商品 / 店铺过滤」表）
> - `shop_id`：字符串或字符串数组；先经 `oms-mcp-shop-management` 解析店名 → ID
> - `shop_type`：店铺类型字符串（如 `<your_shop_type>`），与 `shop_id` 二选一
> - **AND/OR 语义**：同一字段数组内 = OR；不同字段之间 = AND
> - `page` / `page_size` / `order_by`：分页与排序控制
>
> 完整参数表、合法值与返回结构见 `references/api-sales-detail-statistics.md`。

## 使用流程

1. 看用户说法是否命中默认映射 → 命中时间映射则自动填 `time_from` / `time_to`；`material_type` **仍需反问**（无默认值,不能默认 `sales_and_basic_material`）。
2. 时间范围或物料口径缺失 → 按「统计口径反问」逐项反问，先补时间再补口径。
3. 需要时再补店铺、组织或货号条件。
4. 返回后优先看汇总，再看明细，再看聚合；按「客户展示默认规则」决定是否渲染图表。
5. 命中错误码 → 先按速查表确认真因，再决定如何回复用户（不要直接说「数据为空」）。

## 客户展示默认规则

- **数据返回优先级**：先看 `summary`（汇总指标），再看 `detail`（明细），最后看 `aggregations`（聚合）。
- **首屏展示顺序**：汇总关键指标（订单总数、销售总额、平均客单价）→ 明细分组维度（销售额、销售量）→ 聚合块图表。
- **图表选型规则**（assistant 渲染时按 `aggregations.*.suggestedChartType` 选型，不要硬覆盖）：
  - `aggregations.by_product` → 柱状图（`bar`），按 `series` 降序，最多展示 Top 10；超过 10 项改表格 + 「仅显示前 10」。
  - `aggregations.by_shop` → 饼图（`pie`）；若 `labels` 为空（当前 model 不支持店铺维度，参考 references 第 7 节），跳过图表渲染，降级为表格或省略。
  - 后端返回的 `suggestedChartType` 是建议值，assistant 有合理理由时可改（如数据点过多、用户明确指定其他图表类型）。
- **不要展示**：`filters`、`columns`、`by_date` 或其他 Finder 元数据。
- **不要渲染**：单 SKU 全量销售明细（数据量过大，仅做表格展示并提示「仅显示前 N 条，分页参数见 `detail.page`」）。
- **明细表格不附行级操作按钮**：明细表格仅展示数据本身（销售额、销售量、商品名、店铺名等列），不要为每行自动添加「查看详情」「查看商品」「查看店铺」「编辑」「删除」等操作按钮。用户明确说「看第 N 行的详情」时再触发其他 skill（如 `oms-mcp-shop-management` / `oms-mcp-material-management`），不要默认展开或附加操作入口。
- **响应渲染简洁化**：后端响应已包含 `summary` / `detail` / `aggregations` 三块,直接按"数据返回优先级"展示即可。不要为每个块再额外生成「详情」操作面板或下钻按钮,避免首屏出现 N 个「展示详情」入口挤占主信息流。

## 使用口诀

先看口径词，再看默认映射；先看汇总，再看明细，最后看聚合；先看错误码，再判空。

## 错误码速查

调用 MCP 客户端时只会落到以下四种错误码；任一错误码都要先看真因，再决定回复用户。

| 错误码 | HTTP | 常见真因 | 处理动作 |
|---|---|---|---|
| `NOT_LOGGED_IN` | 401 | MCP 凭证缺失或被撤销 | 提示用户在 OMS `修改密码 → MCP接入凭证` 重新生成客户端 secret |
| `PERMISSION_DENIED` | 403 | 当前客户端缺少 `analysis_products` 权限 | 让管理员给当前角色授予 `analysis_products` 权限，或重新签发凭证 |
| `VALIDATION_ERROR` | 422 | 时间范围缺失、日期格式错、跨度 > 31 天、`material_type` 非法、`order_by` 不在白名单等 | 直接读 message 文案修正；常见 message：`time_from must be provided` / `date range must not exceed 31 days` / `material_type is invalid` / `order_by is not supported` |
| `OMS_BACKEND_ERROR` | 其它 4xx/5xx | 上游 OMS 服务异常、网络超时；现在会附带一段已脱敏的后端状态/消息上下文 | 先看 message 中的 HTTP 状态与后端提示，再决定是否重试 |

> **特别注意**：`OMS_BACKEND_ERROR` ≠「数据为空」。当列表看起来为空时，先确认本次调用实际命中了哪个错误码；如果是 backend error，message 里会带上已脱敏的 HTTP 状态/后端提示，便于区分是真零数据还是上游失败。

## 安全边界

- 只读查询，不做写入。
- 不把缺失维度推导成新的业务字段。
- 不把分页结果误当作全量统计口径。
- 不把 `OMS_BACKEND_ERROR` 误判为「今日无销售」；必须先确认调用是否成功。

## 参考

返回结构、模型差异和验证约束以本 Skill 中的工具速查、使用流程和错误码规则为准。
