---
name: ecx-shopping-post-purchase-usage-guide
description: "ECX电商场景能力：会员态结合订单和商品详情，为已购商品整理开箱、使用、保养和售后注意事项。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 购买后使用建议

## 目标

ECX电商场景能力：会员态结合订单和商品详情，为已购商品整理开箱、使用、保养和售后注意事项。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“我买的这个怎么用”“收到后注意什么”“订单里的商品怎么保养”“买完后怎么检查”等问题时使用本 Skill。

【流程】
1. 会员态下先调用订单列表或订单详情定位已购商品；无会员态时提示登录后可基于订单整理。
2. 对已定位商品调用商品详情工具，提取使用、保养、规格和售后注意事项。
3. 输出“开箱检查 / 首次使用 / 日常保养 / 售后凭证 / 需确认事项”。
4. 若订单或详情工具未返回相关字段，应明确未知，建议查看说明书、商品页或联系店铺客服。

【禁止】
- 不编造订单、商品、保修期、说明书、售后政策、使用禁忌或安全承诺。
- 不替用户确认收货、评价、申请售后或发送客服消息。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
