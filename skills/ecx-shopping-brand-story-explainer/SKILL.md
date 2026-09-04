---
name: ecx-shopping-brand-story-explainer
description: "ECX电商场景能力：围绕品牌、商品详情和店铺公开信息，解释品牌亮点、系列差异和选购注意事项。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 品牌故事解释助手

## 目标

ECX电商场景能力：围绕品牌、商品详情和店铺公开信息，解释品牌亮点、系列差异和选购注意事项。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“这个品牌怎么样”“这个系列有什么特点”“品牌故事”“为什么贵”“卖点是什么”等问题时使用本 Skill。

【流程】
1. 先确认品牌、系列或商品；能定位商品时调用商品详情工具。
2. 只解释工具返回的品牌、系列、卖点、材质、参数、服务承诺或页面描述。
3. 如果工具没有品牌故事或官方背书，应明确未知，并转为解释商品页已有信息。
4. 可结合商品搜索或热卖工具展示同品牌/同系列真实商品。

【禁止】
- 不编造品牌历史、授权关系、产地、获奖、代言、认证或官方背书。
- 不把营销话术包装成已验证事实。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
