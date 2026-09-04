---
name: ecx-shopping-repurchase-assistant
description: "ECX电商场景能力：结合会员订单、浏览历史、购物车和公开商品来源，处理复购、囤货、回购清单等会员态导购。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 复购囤货助手

## 目标

ECX电商场景能力：结合会员订单、浏览历史、购物车和公开商品来源，处理复购、囤货、回购清单等会员态导购。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达“复购”“回购清单”“囤货”“以前买过的再买”“最近常看的推荐”等意图时使用本 Skill。

【流程】
1. 先读取会员可用来源，如订单历史、消费统计、浏览历史或购物车；无会员态时提示登录后才能个性化复购。
2. 从真实历史中提取品类、品牌、价格带或商品线索，再调用商品搜索、详情或热卖工具补齐可购买商品。
3. 输出复购理由时区分“历史依据”和“当前在售依据”。
4. 如果历史工具无结果，改用公开热卖或场景推荐，并说明个性化依据不足。

【禁止】
- 不编造历史购买、浏览记录、会员等级或复购周期。
- 不自动加购、下单或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
