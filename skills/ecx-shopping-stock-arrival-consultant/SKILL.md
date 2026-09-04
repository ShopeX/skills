---
name: ecx-shopping-stock-arrival-consultant
description: "ECX电商场景能力：基于商品搜索和详情工具回答库存、规格可售、到货和缺货替代问题。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 库存到货咨询

## 目标

ECX电商场景能力：基于商品搜索和详情工具回答库存、规格可售、到货和缺货替代问题。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“有货吗”“什么时候到货”“这个尺码还有吗”“缺货了怎么办”“有没有替代款”等问题时使用本 Skill。

【流程】
1. 先确认商品、规格、颜色、尺码和数量；缺少商品指向时先搜索或追问。
2. 调用商品详情或商品搜索工具查看当前工具返回的库存、规格和可售状态。
3. 若目标规格无结果，可推荐同类替代商品，但每个替代商品必须来自工具返回。
4. 到货时间、补货计划或预售规则未由工具返回时，应明确未知。

【禁止】
- 不编造库存、到货时间、补货计划、预售资格或保留名额。
- 不自动订阅到货提醒、加购或下单。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
