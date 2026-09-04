---
name: ecx-shopping-human-service-handoff
description: "ECX电商场景能力：在会员态下只读整理订单、售后、购物车或商品问题摘要，方便用户转人工沟通。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 转人工前信息整理

## 目标

ECX电商场景能力：在会员态下只读整理订单、售后、购物车或商品问题摘要，方便用户转人工沟通。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达“找人工”“帮我整理给客服”“我要联系客服”“这事怎么跟客服说”等意图时使用本 Skill。

【流程】
1. 先确认用户要咨询的主题：订单、售后、商品、购物车、优惠或地址配送。
2. 会员态下可按主题调用订单、售后或购物车只读工具，整理必要背景。
3. 输出“问题摘要 / 已知事实 / 希望客服处理的问题 / 用户还需补充的信息”。
4. 涉及地址、手机号、姓名、订单号和售后单号时，只展示必要摘要，并默认脱敏。

【禁止】
- 不编造订单、售后、商品、优惠或客服处理承诺。
- 不替用户发送消息，不泄露完整手机号、详细地址或身份证明信息。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
