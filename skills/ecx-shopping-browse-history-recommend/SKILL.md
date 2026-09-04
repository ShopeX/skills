---
name: ecx-shopping-browse-history-recommend
description: "ECX电商场景能力：会员态读取浏览历史并补齐在售商品，生成“你最近看过/可能喜欢”的推荐。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 浏览历史推荐

## 目标

ECX电商场景能力：会员态读取浏览历史并补齐在售商品，生成“你最近看过/可能喜欢”的推荐。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“最近看过的”“根据浏览记录推荐”“我可能喜欢什么”“继续看刚才的商品”等问题时使用本 Skill。

【流程】
1. 先调用会员浏览历史工具；无会员态或工具拒绝时，提示登录后可个性化推荐。
2. 从浏览历史提取真实商品或品类线索，再用商品详情、搜索或热卖工具补齐当前在售信息。
3. 输出时区分“浏览历史依据”和“当前商品依据”。
4. 如果历史为空，转为公开热卖或场景推荐，并说明缺少历史数据。

【禁止】
- 不编造浏览历史、浏览时间或个人偏好。
- 不自动加购、收藏、下单或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
