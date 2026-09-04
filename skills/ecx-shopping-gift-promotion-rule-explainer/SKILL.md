---
name: ecx-shopping-gift-promotion-rule-explainer
description: "ECX电商场景能力：解释满赠、赠品、活动门槛和优惠叠加规则；只引用活动、公开券和商品工具结果。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 活动赠品规则解释

## 目标

ECX电商场景能力：解释满赠、赠品、活动门槛和优惠叠加规则；只引用活动、公开券和商品工具结果。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“有没有赠品”“满多少送”“活动规则怎么看”“券和赠品能不能叠加”等问题时使用本 Skill。

【流程】
1. 先调用活动、促销或公开券工具查看当前工具返回的活动信息。
2. 如果用户指定商品，可调用商品详情确认商品信息。
3. 只解释工具返回的门槛、券、赠品、适用范围和有效期。
4. 工具没有返回赠品或叠加规则时，应说明未知，并提示以活动页或结算页为准。

【禁止】
- 不编造赠品、门槛、有效期、叠加规则、活动库存或结算价。
- 不承诺赠品一定可得；最终以活动页和结算页为准。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
