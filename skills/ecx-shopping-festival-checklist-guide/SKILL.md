---
name: ecx-shopping-festival-checklist-guide
description: "ECX电商场景能力：按节日、活动、出行、开学、年货等主题生成真实商品采购清单。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 节日采购清单

## 目标

ECX电商场景能力：按节日、活动、出行、开学、年货等主题生成真实商品采购清单。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“节日买什么”“年货清单”“开学准备”“露营出行采购”“活动物料清单”等问题时使用本 Skill。

【流程】
1. 先确认节日/活动主题、人数、预算、使用场景、是否送礼和禁忌。
2. 将主题拆成多个品类，再调用分类、搜索、热卖或促销工具。
3. 按“必备 / 可选 / 提升体验”组织清单，每个商品必须来自工具结果。
4. 如果某类没有工具结果，应列为待补充方向，不编造具体商品。

【禁止】
- 不编造节日活动、商品、价格、库存、赠品或到货承诺。
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
