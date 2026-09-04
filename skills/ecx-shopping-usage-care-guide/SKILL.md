---
name: ecx-shopping-usage-care-guide
description: "ECX电商场景能力：解释商品使用方法、保养注意事项、清洗存放和常见误区；只引用详情或通用安全建议。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 使用保养指南

## 目标

ECX电商场景能力：解释商品使用方法、保养注意事项、清洗存放和常见误区；只引用详情或通用安全建议。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“怎么用”“怎么保养”“能不能水洗”“怎么存放”“注意事项”等问题时使用本 Skill。

【流程】
1. 先确认商品类型和具体商品；能定位商品时调用商品详情工具。
2. 优先解释详情页返回的使用说明、材质、保养、清洗和售后注意事项。
3. 工具未返回的内容只能给通用安全建议，并明确不是商品官方说明。
4. 涉及儿童、食品、药品、户外安全或电器使用时，应提示以说明书和官方安全要求为准。

【禁止】
- 不编造材质、认证、洗护标签、保修规则、使用禁忌或安全承诺。
- 不提供可能导致人身伤害或违规使用的建议。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
