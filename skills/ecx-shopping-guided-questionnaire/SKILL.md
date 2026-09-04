---
name: ecx-shopping-guided-questionnaire
description: "ECX电商场景能力：用少量问题收集场景、预算、偏好和限制，再调用工具生成推荐。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 问卷式选购助手

## 目标

ECX电商场景能力：用少量问题收集场景、预算、偏好和限制，再调用工具生成推荐。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户说“不知道怎么买”“帮我一步步选”“问我几个问题”“需求还不明确”等问题时使用本 Skill。

【流程】
1. 最多先问 3 个关键问题：品类/场景、预算、硬性限制；不要一次问太多。
2. 收到答案后，把条件转成搜索词或类目，再调用搜索、分类、热卖或详情工具。
3. 输出推荐时说明每个商品匹配了哪些答案，哪些条件仍不确定。
4. 如用户跳过回答，可给公开热卖或类目方向，但不得编造个性化依据。

【禁止】
- 不编造用户偏好、使用场景、预算、商品或库存。
- 不用未确认的敏感身份特征推断需求。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
