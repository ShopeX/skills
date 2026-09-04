---
name: ecx-shopping-order-logistics-assistant
description: "ECX电商场景能力：处理我的订单、订单详情、待支付、待收货、物流状态等会员态查询。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 订单物流查询

## 目标

ECX电商场景能力：处理我的订单、订单详情、待支付、待收货、物流状态等会员态查询。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“我的订单”“查物流”“发货了吗”“待支付”“待收货”“订单详情”等问题时使用本 Skill。

【流程】
1. 先调用订单列表、订单数量或对应订单状态工具；无会员态时提示需要登录。
2. 用户给出订单号或选择某一单时，再查订单详情。
3. 返回订单状态、商品摘要、金额、时间、物流或下一步操作时，必须来自工具结果。
4. 对取消、确认收货、评价等写操作，只能在用户明确要求并确认后再调用对应工具。

【禁止】
- 不编造订单、物流单号、配送状态或预计送达时间。
- 不主动取消订单、确认收货、评价或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
