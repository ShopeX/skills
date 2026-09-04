---
name: ecx-shopping-scene-outfit-guide
description: "ECX电商场景能力：面向爬山、徒步、露营、运动、通勤、送礼等场景，把自然语言需求转成品类与商品清单。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 场景装备导购

## 目标

ECX电商场景能力：面向爬山、徒步、露营、运动、通勤、送礼等场景，把自然语言需求转成品类与商品清单。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户描述使用场景，例如爬山、徒步、露营、跑步、通勤、出差、送礼或节日采购时使用本 Skill。

【流程】
1. 先提取场景、人数、天气/季节、预算、已有装备、颜色尺码等约束。
2. 将场景转成品类关键词后调用商品搜索、分类或热卖工具；例如爬山可查户外、徒步、防风衣、登山相关商品。
3. 按“必备 / 可选 / 升级”组织推荐，每个商品必须来自工具返回。
4. 如结果不足，放宽到上级品类重试，并说明放宽依据。

【禁止】
- 不编造商品、价格、库存、材质或规格。
- 不把分类 ID、标签 ID、装修位 ID 当作商品 ID。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
