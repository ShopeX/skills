---
name: ecx-shopping-policy-faq
description: "ECX电商场景能力：回答配送、退换货、优惠券、会员权益、发票、支付等规则类问题；不编造具体业务事实。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 商城政策 FAQ

## 目标

ECX电商场景能力：回答配送、退换货、优惠券、会员权益、发票、支付等规则类问题；不编造具体业务事实。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问配送规则、退换货规则、优惠券规则、会员权益、发票、支付方式、售后流程等政策问题时使用本 Skill。

【流程】
1. 优先使用本轮知识库、政策资料、配置或工具结果回答。
2. 如果没有明确资料，只能给通用流程建议，并说明最终以店铺页面、订单状态或客服确认为准。
3. 如用户问题转为个人订单、券或售后进度，再切换到对应会员态查询 Skill。

【禁止】
- 不编造具体时效、金额、门槛、客服电话、地址或承诺。
- 不执行加购、下单、支付、取消、确认收货、售后提交等写操作。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
