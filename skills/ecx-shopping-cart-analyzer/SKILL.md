---
name: ecx-shopping-cart-analyzer
description: "ECX电商场景能力：读取会员购物车，结合券、活动和商品搜索给出保留、补充、凑单建议。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 购物车分析与凑单

## 目标

ECX电商场景能力：读取会员购物车，结合券、活动和商品搜索给出保留、补充、凑单建议。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户询问“购物车里有什么”“帮我看看购物车”“怎么凑单”“哪些值得买”时使用本 Skill。

【流程】
1. 先调用购物车读取工具；无会员态或工具拒绝时，说明需要登录或授权。
2. 可结合会员券、公开活动或促销工具判断是否需要凑单。
3. 如需要补充商品，再调用商品搜索或热卖工具。
4. 输出“保留 / 可补充 / 可暂缓”建议，所有商品、价格、优惠依据来自工具结果。

【禁止】
- 不删除购物车、不自动加购、不自动下单。
- 不编造购物车内容、总价、券门槛或活动规则。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
