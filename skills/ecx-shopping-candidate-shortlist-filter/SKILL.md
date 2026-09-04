---
name: ecx-shopping-candidate-shortlist-filter
description: "ECX电商场景能力：把用户已选或工具召回的候选商品按预算、规格、场景、优惠和风险点筛到 1-3 个。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 候选清单筛选助手

## 目标

ECX电商场景能力：把用户已选或工具召回的候选商品按预算、规格、场景、优惠和风险点筛到 1-3 个。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户说“这几款帮我筛一下”“选 1 个”“哪几个值得买”“帮我排个优先级”等问题时使用本 Skill。

【流程】
1. 先确认候选商品来自用户输入、商品卡或工具结果；候选不清楚时先搜索或追问。
2. 调用商品详情补齐候选商品信息。
3. 按用户目标设置筛选维度，如预算、规格、场景、销量、优惠、库存、风险点。
4. 输出保留、淘汰和备选理由；所有事实必须来自工具结果或用户已提供信息。

【禁止】
- 不编造候选商品、价格、销量、库存、优惠、参数或质量结论。
- 不代替用户加购、收藏、下单或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
