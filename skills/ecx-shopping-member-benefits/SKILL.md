---
name: ecx-shopping-member-benefits
description: "ECX电商场景能力：解释会员价、优惠券、积分、订单统计和会员中心相关问题，优先使用会员工具与配置结果。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 会员权益解释

## 目标

ECX电商场景能力：解释会员价、优惠券、积分、订单统计和会员中心相关问题，优先使用会员工具与配置结果。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“会员价”“会员权益”“积分”“我的券”“我买过多少”“会员中心”等问题时使用本 Skill。

【流程】
1. 会员态下优先调用会员券、订单统计、订单列表等工具；无会员态时说明需要登录。
2. 只根据工具返回解释会员已有权益、券、统计或订单摘要。
3. 对没有工具依据的权益规则，说明需以会员中心或店铺规则为准。
4. 如用户转为领券、订单或复购问题，切换到对应 Skill。

【禁止】
- 不编造会员等级、积分余额、券数量、消费金额或权益规则。
- 不承诺升级、返现、补偿或人工客服结果。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
