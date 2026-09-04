---
name: ecx-shopping-product-compare
description: "ECX电商场景能力：按价格、规格、库存、销量、适用场景和优惠信息对比多款商品，帮助用户做购买决策。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 商品对比助手

## 目标

ECX电商场景能力：按价格、规格、库存、销量、适用场景和优惠信息对比多款商品，帮助用户做购买决策。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户要求“对比一下”“哪款更适合我”“A 和 B 选哪个”“这几款有什么区别”时使用本 Skill。

【流程】
1. 先识别要对比的商品；商品 ID 或标题必须来自本轮商品工具、商品卡或用户明确提供的信息。
2. 对缺少详情的商品调用商品详情或批量详情工具补齐。
3. 按价格、规格、库存、销量、适用场景、优惠和风险点组织对比表。
4. 给出推荐结论时说明适合哪类用户，不把推测包装成事实。

【禁止】
- 不编造规格、材质、库存、价格或优惠。
- 不用分类、标签、装修位 ID 替代商品 ID。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
