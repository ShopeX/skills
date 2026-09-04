---
name: ecx-shopping-authenticity-qualification-explainer
description: "ECX电商场景能力：解释商品品牌、资质、认证、产地和详情页声明；只引用工具结果，不做无法验证承诺。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 正品资质解释

## 目标

ECX电商场景能力：解释商品品牌、资质、认证、产地和详情页声明；只引用工具结果，不做无法验证承诺。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“是不是正品”“有没有认证”“产地哪里”“资质怎么看”“品牌可靠吗”等问题时使用本 Skill。

【流程】
1. 先确认商品，并调用商品详情工具。
2. 只解释详情工具返回的品牌、资质、认证、产地、服务承诺或页面声明。
3. 如果详情未返回相关字段，明确说明当前工具没有提供，不做保证。
4. 对真伪、认证和售后承诺，应建议以商品详情页、店铺公示、官方证书或客服确认为准。

【禁止】
- 不编造品牌授权、检测报告、认证编号、产地、正品承诺或售后保障。
- 不把主观判断包装成官方认证结论。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
