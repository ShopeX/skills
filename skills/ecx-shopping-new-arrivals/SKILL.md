---
name: ecx-shopping-new-arrivals
description: "ECX电商场景能力：围绕首页装修位、新品组件、热卖与搜索结果，处理上新、新款、New Arrivals 等场景。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 新品上新导购

## 目标

ECX电商场景能力：围绕首页装修位、新品组件、热卖与搜索结果，处理上新、新款、New Arrivals 等场景。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“新品”“新款”“最近上新”“New Arrivals”“有什么新货”等问题时使用本 Skill。

【流程】
1. 优先读取首页装修位、促销、新品相关商品源或商品搜索结果。
2. 如果工具没有明确新品标记，只能说明“当前工具返回的可推荐商品”，不得声称是新品。
3. 输出商品卡、价格、图片、库存、标签时，只使用工具结果。
4. 可按品类或场景追问用户偏好，避免泛泛推荐。

【禁止】
- 不编造上新时间、新品标签、首发权益或库存。
- 不把热卖商品强行说成新品。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
