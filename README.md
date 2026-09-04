# Shopex Agent Skills

[![Agent Skills](https://img.shields.io/badge/Agent%20Skills-compatible-111827)](https://agentskills.io)

Shopex（商派）的公共 Agent Skills 单仓库，统一承载 ECX、OMS、DigiOS、B2B、POS 及后续产品线的专业 Skill、跨产品共享能力和端到端组合流程。

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
| [`ecx-general-support`](skills/ecx-general-support/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：通用售后与工单引导；复制后替换联系方式与 SLA。默认「按需」注入，避免每轮占用大量 Token。 |
| [`ecx-personalized-fallback-recommend`](skills/ecx-personalized-fallback-recommend/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：泛发现/清单类话术缺少明确检索词时使用：按登录态选择会员/公开召回工具，仅基于工具返回推荐。 |
| [`ecx-product-consult`](skills/ecx-product-consult/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：规格解读与选购建议；具体价格库存与链接必须来自工具返回。 |
| [`ecx-product-recommend`](skills/ecx-product-recommend/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：推荐、搭配、热卖、送礼等导购场景按需启用；先调用商品类工具，只用返回数据组织答案。 |
| [`ecx-retail-service`](skills/ecx-retail-service/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：门店/电商导购与售后；礼貌简洁；涉及在售商品/价格/库存须先调商品工具。 |
| [`ecx-shopping-after-sales-consultant`](skills/ecx-shopping-after-sales-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：处理退款、退货、换货、售后进度和原因查询；默认咨询与查询，申请类写操作需确认。 |
| [`ecx-shopping-assistant`](skills/ecx-shopping-assistant/SKILL.md) | ECX 产品 Skill | Complete ECX and ECShopX consumer shopping flows for Shopex cloud stores, including product search, SKU selection, addresses, coupons, carts, checkout, order confirmation, WeChat Pay QR codes, and payment-status queries. |
| [`ecx-shopping-audience-segment-guide`](skills/ecx-shopping-audience-segment-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：按儿童、老人、新手、专业玩家、通勤人群等细分用户推荐真实商品并说明适配理由。 |
| [`ecx-shopping-authenticity-qualification-explainer`](skills/ecx-shopping-authenticity-qualification-explainer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释商品品牌、资质、认证、产地和详情页声明；只引用工具结果，不做无法验证承诺。 |
| [`ecx-shopping-bestseller-ranking-explainer`](skills/ecx-shopping-bestseller-ranking-explainer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解读热卖榜、促销榜和首页推荐商品，帮助用户理解为什么值得看。 |
| [`ecx-shopping-brand-story-explainer`](skills/ecx-shopping-brand-story-explainer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：围绕品牌、商品详情和店铺公开信息，解释品牌亮点、系列差异和选购注意事项。 |
| [`ecx-shopping-browse-history-recommend`](skills/ecx-shopping-browse-history-recommend/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：会员态读取浏览历史并补齐在售商品，生成“你最近看过/可能喜欢”的推荐。 |
| [`ecx-shopping-budget-guide`](skills/ecx-shopping-budget-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：按用户预算、价格带和性价比诉求推荐真实商品，并说明取舍点。 |
| [`ecx-shopping-bulk-purchase-consultant`](skills/ecx-shopping-bulk-purchase-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：处理团购、企业采购、多件购买、备货清单等场景，基于商品和活动工具做只读建议。 |
| [`ecx-shopping-bundle-guide`](skills/ecx-shopping-bundle-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：为户外、运动、通勤、露营等场景组合多件商品，形成套装、清单和替代方案。 |
| [`ecx-shopping-candidate-shortlist-filter`](skills/ecx-shopping-candidate-shortlist-filter/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：把用户已选或工具召回的候选商品按预算、规格、场景、优惠和风险点筛到 1-3 个。 |
| [`ecx-shopping-cart-analyzer`](skills/ecx-shopping-cart-analyzer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：读取会员购物车，结合券、活动和商品搜索给出保留、补充、凑单建议。 |
| [`ecx-shopping-category-navigator`](skills/ecx-shopping-category-navigator/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：帮助用户按类目、子类目、用途和关键词缩小范围，再引导到商品推荐或详情。 |
| [`ecx-shopping-coupon-assistant`](skills/ecx-shopping-coupon-assistant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：处理领券、查券、优惠券使用说明；区分公开可领券、会员已领券和领券中心跳转。 |
| [`ecx-shopping-delivery-address-consultant`](skills/ecx-shopping-delivery-address-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：处理收货地址、配送范围、地址列表和配送规则咨询；默认只读查询，不修改地址。 |
| [`ecx-shopping-festival-checklist-guide`](skills/ecx-shopping-festival-checklist-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：按节日、活动、出行、开学、年货等主题生成真实商品采购清单。 |
| [`ecx-shopping-gift-guide`](skills/ecx-shopping-gift-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：按对象、预算、节日、关系和使用场景推荐礼物，并给出可购买商品和选择理由。 |
| [`ecx-shopping-gift-promotion-rule-explainer`](skills/ecx-shopping-gift-promotion-rule-explainer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释满赠、赠品、活动门槛和优惠叠加规则；只引用活动、公开券和商品工具结果。 |
| [`ecx-shopping-guided-questionnaire`](skills/ecx-shopping-guided-questionnaire/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：用少量问题收集场景、预算、偏好和限制，再调用工具生成推荐。 |
| [`ecx-shopping-human-service-handoff`](skills/ecx-shopping-human-service-handoff/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：在会员态下只读整理订单、售后、购物车或商品问题摘要，方便用户转人工沟通。 |
| [`ecx-shopping-invoice-consultant`](skills/ecx-shopping-invoice-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：基于会员订单只读信息解释发票申请、抬头、金额和订单关联问题，不提交发票申请。 |
| [`ecx-shopping-member-benefits`](skills/ecx-shopping-member-benefits/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释会员价、优惠券、积分、订单统计和会员中心相关问题，优先使用会员工具与配置结果。 |
| [`ecx-shopping-new-arrivals`](skills/ecx-shopping-new-arrivals/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：围绕首页装修位、新品组件、热卖与搜索结果，处理上新、新款、New Arrivals 等场景。 |
| [`ecx-shopping-order-logistics-assistant`](skills/ecx-shopping-order-logistics-assistant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：处理我的订单、订单详情、待支付、待收货、物流状态等会员态查询。 |
| [`ecx-shopping-payment-method-consultant`](skills/ecx-shopping-payment-method-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释支付方式、结算价、优惠叠加和支付前注意事项；只做咨询，不发起支付。 |
| [`ecx-shopping-points-goods-guide`](skills/ecx-shopping-points-goods-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：查询积分商品和相关商品详情，回答积分兑换、积分商品推荐等场景。 |
| [`ecx-shopping-policy-faq`](skills/ecx-shopping-policy-faq/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：回答配送、退换货、优惠券、会员权益、发票、支付等规则类问题；不编造具体业务事实。 |
| [`ecx-shopping-post-purchase-usage-guide`](skills/ecx-shopping-post-purchase-usage-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：会员态结合订单和商品详情，为已购商品整理开箱、使用、保养和售后注意事项。 |
| [`ecx-shopping-price-band-educator`](skills/ecx-shopping-price-band-educator/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释不同价格带商品的常见差异，并基于真实商品帮助用户理解预算取舍。 |
| [`ecx-shopping-product-compare`](skills/ecx-shopping-product-compare/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：按价格、规格、库存、销量、适用场景和优惠信息对比多款商品，帮助用户做购买决策。 |
| [`ecx-shopping-product-detail-explainer`](skills/ecx-shopping-product-detail-explainer/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释商品详情、规格、售后字段、价格和购买注意事项，帮助用户理解单个商品是否适合。 |
| [`ecx-shopping-promotion-deals`](skills/ecx-shopping-promotion-deals/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：围绕促销商品、活动、公开优惠券和热卖商品，帮助用户找当前可买的优惠商品。 |
| [`ecx-shopping-recommendation-add-to-cart`](skills/ecx-shopping-recommendation-add-to-cart/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：把推荐商品或用户明确指定的商品加入购物车；必须确认商品、SKU 和数量后再调用写工具。 |
| [`ecx-shopping-repurchase-assistant`](skills/ecx-shopping-repurchase-assistant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：结合会员订单、浏览历史、购物车和公开商品来源，处理复购、囤货、回购清单等会员态导购。 |
| [`ecx-shopping-return-exchange-policy-guide`](skills/ecx-shopping-return-exchange-policy-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释退货、换货、退款、售后原因和寄回规则；只做政策说明，不提交售后。 |
| [`ecx-shopping-scene-outfit-guide`](skills/ecx-shopping-scene-outfit-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：面向爬山、徒步、露营、运动、通勤、送礼等场景，把自然语言需求转成品类与商品清单。 |
| [`ecx-shopping-size-spec-advisor`](skills/ecx-shopping-size-spec-advisor/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：围绕尺码、颜色、规格、容量、型号等选择问题，基于商品详情解释可选项和风险点。 |
| [`ecx-shopping-stock-arrival-consultant`](skills/ecx-shopping-stock-arrival-consultant/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：基于商品搜索和详情工具回答库存、规格可售、到货和缺货替代问题。 |
| [`ecx-shopping-today-must-buy`](skills/ecx-shopping-today-must-buy/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：面向“今日必买、今天买什么、有什么值得买”等泛发现意图，优先用热卖、促销、首页装修位和公开券生成真实推荐。 |
| [`ecx-shopping-usage-care-guide`](skills/ecx-shopping-usage-care-guide/SKILL.md) | ECX 产品 Skill | ECX电商场景能力：解释商品使用方法、保养注意事项、清洗存放和常见误区；只引用详情或通用安全建议。 |
| [`oms-mcp-sales-detail-statistics`](skills/oms-mcp-sales-detail-statistics/SKILL.md) | OMS 产品 Skill | OMS电商场景能力：Use when the user asks about OMS sales detail statistics, sales summary, sales ranking, today's or this month's sales, product-level sales, shop-level sales, revenue, GMV, sales trend, or sales performance. Always ask the user to choose material_type (basic_material / sales_material / sales_and_basic_material) and time range before calling the tool; do not infer or default either. Read-only aggregation; never call for create/update/delete/write operations, Finder metadata exposure, or front-end UI design. |

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
3. 产品归属写入全局唯一名称：`ecx-*`、`oms-*`、`digios-*`、`b2b-*`、`pos-*`；跨产品使用 `common-*`，完整组合流程使用 `suite-*`。不新增 `router-*`。

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
