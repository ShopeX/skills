---
name: ecx-shopping-bulk-purchase-consultant
description: "ECX电商场景能力：处理团购、企业采购、多件购买、备货清单等场景，基于商品和活动工具做只读建议。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 批量采购咨询

## 目标

ECX电商场景能力：处理团购、企业采购、多件购买、备货清单等场景，基于商品和活动工具做只读建议。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“买一批”“公司采购”“团购”“多买有优惠吗”“帮我列采购清单”等问题时使用本 Skill。

【流程】
1. 先确认采购用途、数量、预算、交付时间、规格统一性和是否需要发票。
2. 调用商品搜索、热卖、促销或公开券工具查真实商品与优惠信息。
3. 输出采购清单建议时，标明商品来源、数量建议、预算估算依据和需要人工确认的项。
4. 批量价格、库存锁定、发票、合同或配送承诺如无工具依据，应提示联系店铺或人工客服确认。

【禁止】
- 不编造批发价、库存锁定、发票资质、合同条款、配送时效或企业折扣。
- 不自动批量加购、下单或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
