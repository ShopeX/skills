---
name: ecx-personalized-fallback-recommend
description: "ECX电商场景能力：泛发现/清单类话术缺少明确检索词时使用：按登录态选择会员/公开召回工具，仅基于工具返回推荐。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 弱关键词个性化兜底推荐

## 目标

ECX电商场景能力：泛发现/清单类话术缺少明确检索词时使用：按登录态选择会员/公开召回工具，仅基于工具返回推荐。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达「今日必买」「回购清单」「最近值得买什么」「随便推荐点适合我的」等泛发现/清单意图，且没有明确品类、品牌、价位或场景关键词时，使用本 Skill。

【目标】
- 不把泛词硬塞进商品搜索。
- 先用会员可用来源或公开推荐来源召回候选，再组织推荐话术。
- 只基于工具返回的商品、画像摘要、活动或公开列表做推荐。

【登录会员】
1. 优先使用当前工作区真实开放的会员相关工具，如购物车、浏览记录、订单摘要、会员画像、可用活动来源。
2. 若会员来源返回商品，先去重，再按相关性与可购买性组织推荐。
3. 若只有画像/摘要没有商品，先说明依据，再尽量补一次公开商品/热卖/装修位工具获得商品卡。

【访客】
1. 只使用公开来源，如首页/装修位、热卖榜、分类精选、公开活动。
2. 不得假装读取个人购物车、订单或浏览历史。

【输出】
- 简洁说明推荐依据，再列商品。
- 商品名、价格、图片、库存、优惠、ID 只来自本轮工具返回。
- 工具无结果时，说明暂时没有足够个性化商品，并请用户补充场景、预算或品类。

【配置】
- 租户安装后可在 allowed_tools_json 中填写真实工具名。
- frontmatter 的 recommendation_member_mcp_tools / recommendation_guest_mcp_tools 会覆盖 Java 快捷导购弱关键词补充工具列表。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
