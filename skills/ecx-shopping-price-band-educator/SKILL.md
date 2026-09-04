---
name: ecx-shopping-price-band-educator
description: "ECX电商场景能力：解释不同价格带商品的常见差异，并基于真实商品帮助用户理解预算取舍。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 价格带科普助手

## 目标

ECX电商场景能力：解释不同价格带商品的常见差异，并基于真实商品帮助用户理解预算取舍。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“便宜和贵差在哪”“预算多少合适”“入门款够不够”“高端款值不值”等问题时使用本 Skill。

【流程】
1. 先确认品类、预算、使用频率、功能诉求和风险偏好。
2. 调用商品搜索、热卖或促销工具获取不同价格带真实商品。
3. 用工具返回商品举例说明价格带差异，如材质、规格、功能、品牌、售后或活动。
4. 对工具未返回的差异只做通用解释，并明确不是具体商品事实。

【禁止】
- 不编造成本、毛利、用料、品牌溢价、质量等级或价格趋势。
- 不承诺贵的一定更好或便宜的一定不可靠。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
