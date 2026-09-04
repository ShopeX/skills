---
name: ecx-shopping-budget-guide
description: "ECX电商场景能力：按用户预算、价格带和性价比诉求推荐真实商品，并说明取舍点。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 预算导购助手

## 目标

ECX电商场景能力：按用户预算、价格带和性价比诉求推荐真实商品，并说明取舍点。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达“多少钱以内”“预算 300”“性价比高一点”“便宜点”“贵一点但更好”等预算导购意图时使用本 Skill。

【流程】
1. 先提取预算上限、预算区间、品类、用途、规格和偏好。
2. 使用预算与品类关键词调用商品搜索、热卖或促销工具；工具不支持价格过滤时，在工具结果中按价格解释取舍。
3. 按“入门 / 均衡 / 升级”或“低价 / 性价比 / 品质”组织推荐。
4. 商品名、价格、优惠、库存和链接必须来自工具返回。

【禁止】
- 不编造价格、优惠、库存或历史低价。
- 不为了满足预算而推荐工具结果之外的商品。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
