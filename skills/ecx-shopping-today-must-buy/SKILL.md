---
name: ecx-shopping-today-must-buy
description: "ECX电商场景能力：面向“今日必买、今天买什么、有什么值得买”等泛发现意图，优先用热卖、促销、首页装修位和公开券生成真实推荐。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 今日必买推荐

## 目标

ECX电商场景能力：面向“今日必买、今天买什么、有什么值得买”等泛发现意图，优先用热卖、促销、首页装修位和公开券生成真实推荐。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达“今日必买”“今天买什么”“最近有什么值得买”“随便推荐点”等泛发现意图时使用本 Skill。

【流程】
1. 优先调用热卖、促销、首页装修位或公开商品来源；不要把“今日必买”这类泛词直接作为唯一搜索词。
2. 如用户补充品类、预算、品牌、颜色、尺码或场景，再用这些实质词搜索。
3. 可叠加公开优惠券或活动信息，但券、价格、库存、商品名只来自本轮工具结果。
4. 推荐 3-5 个商品，说明推荐依据，并给出看详情、领券或加购的下一步。

【禁止】
- 未拿到有效商品结果时，不列具体商品、精确价格、库存或购买链接。
- 不得假装读取个人购物车、订单、浏览历史或会员券。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
