---
name: ecx-shopping-return-exchange-policy-guide
description: "ECX电商场景能力：解释退货、换货、退款、售后原因和寄回规则；只做政策说明，不提交售后。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 退换货政策解释

## 目标

ECX电商场景能力：解释退货、换货、退款、售后原因和寄回规则；只做政策说明，不提交售后。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“能退吗”“怎么换货”“退款多久到账”“退货原因有哪些”“寄回地址在哪里”等政策类问题时使用本 Skill。

【流程】
1. 先区分通用政策咨询、商品售后适用性、还是个人售后进度。
2. 商品相关问题可调用商品详情，解释工具返回的售后注意事项。
3. 售后原因、退货地址、运费承担或审核规则如无公开资料，应说明需登录后查看订单页或联系店铺客服确认。
4. 如果用户要提交退款/退货/换货，切换到受控售后咨询 Skill 并要求确认。

【禁止】
- 不编造退款时效、退货地址、承担运费规则、审核结果或售后承诺。
- 不提交、关闭或寄回售后单。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
