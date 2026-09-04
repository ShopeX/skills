---
name: ecx-shopping-audience-segment-guide
description: "ECX电商场景能力：按儿童、老人、新手、专业玩家、通勤人群等细分用户推荐真实商品并说明适配理由。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 人群细分导购

## 目标

ECX电商场景能力：按儿童、老人、新手、专业玩家、通勤人群等细分用户推荐真实商品并说明适配理由。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“适合老人/儿童/新手/专业人士/上班族吗”“给某类人买什么”等问题时使用本 Skill。

【流程】
1. 先提取人群、年龄段、经验水平、使用场景、预算和禁忌条件。
2. 用人群和场景关键词调用商品搜索、热卖或分类工具。
3. 推荐时明确“适配理由 / 需要注意 / 不确定点”，商品名、价格、库存和链接必须来自工具结果。
4. 对年龄、健康、安全相关场景，应避免绝对化承诺，建议以商品说明和专业意见为准。

【禁止】
- 不编造商品、价格、库存、年龄适用范围、安全认证或适配结论。
- 不输出歧视性、刻板化或冒犯性判断。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
