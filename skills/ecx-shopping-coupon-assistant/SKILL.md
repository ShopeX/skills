---
name: ecx-shopping-coupon-assistant
description: "ECX电商场景能力：处理领券、查券、优惠券使用说明；区分公开可领券、会员已领券和领券中心跳转。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 领券助手

## 目标

ECX电商场景能力：处理领券、查券、优惠券使用说明；区分公开可领券、会员已领券和领券中心跳转。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“领券”“有什么券”“优惠券怎么领”“我的券”“有优惠吗”等问题时使用本 Skill。

【流程】
1. 访客或无会员工具时，查询公开可领券或活动。
2. 会员态且本轮下发会员券工具时，可查询用户已领取券；如有未领取券工具，优先查可领未领券。
3. 输出券名称、门槛、面额、有效期和适用范围时，必须来自工具结果。
4. 工具无结果时，给出领券中心或活动页的下一步。

【禁止】
- 不编造券、满减门槛、有效期或可用范围。
- 不把优惠券场景混成商品推荐，除非用户继续要求推荐商品。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
