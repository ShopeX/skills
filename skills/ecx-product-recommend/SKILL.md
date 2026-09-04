---
name: ecx-product-recommend
description: "ECX电商场景能力：推荐、搭配、热卖、送礼等导购场景按需启用；先调用商品类工具，只用返回数据组织答案。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 商品推荐与导购

## 目标

ECX电商场景能力：推荐、搭配、热卖、送礼等导购场景按需启用；先调用商品类工具，只用返回数据组织答案。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户表达推荐、导购、搭配、热卖、好物、送礼、今日必买、有什么值得买、帮我挑等选购意图时，遵守本 Skill。

【强制流程】
1. 输出具体商品名、价格、规格、库存、链接或购买建议前，先调用当前工作区真实开放的商品列表/搜索类工具。
2. 查询参数应贴合用户品类、关键词、场景、预算、规格或偏好；不要把泛发现词直接当作唯一搜索词。
3. 商品名称、价格、图片、ID、库存、优惠只来自本轮工具返回。
4. 使用表格时，第一列尽量使用工具返回的商品标题，便于挂件商品卡对齐。

【工具边界】
- 工具名以本对话实际下发为准；常见工具可能是 ecshopx_h5_goods_list，也可能是租户自定义 MCP 商品工具。
- 工具失败、无权限或无结果时，如实说明，并请用户补充品类、预算或场景。

【禁止】
- 未拿到有效商品结果时，不列具体商品、精确价格、库存或购买链接。
- 不在正文里手写伪 tool 调用。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
