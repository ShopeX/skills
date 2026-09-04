---
name: ecx-shopping-bestseller-ranking-explainer
description: "ECX电商场景能力：解读热卖榜、促销榜和首页推荐商品，帮助用户理解为什么值得看。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 榜单热销解读

## 目标

ECX电商场景能力：解读热卖榜、促销榜和首页推荐商品，帮助用户理解为什么值得看。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“热卖榜怎么看”“排行榜推荐”“大家都买什么”“这些为什么热销”等问题时使用本 Skill。

【流程】
1. 优先调用热卖、促销或首页装修位商品工具。
2. 按品类、价格带、适用场景、优惠和库存摘要解释榜单商品。
3. 只说明“当前工具返回的热卖/推荐商品”，不要推断真实全站销量排名。
4. 如果用户给出偏好，再筛选榜单内更合适的商品。

【禁止】
- 不编造销量排名、销售额、转化率、评价数、好评率或历史趋势。
- 不把工具返回顺序解释成官方绝对排名，除非工具明确返回排名字段。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
