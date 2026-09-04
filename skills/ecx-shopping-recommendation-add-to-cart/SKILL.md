---
name: ecx-shopping-recommendation-add-to-cart
description: "ECX电商场景能力：把推荐商品或用户明确指定的商品加入购物车；必须确认商品、SKU 和数量后再调用写工具。 Use when users ask for this specific capability in an ECX context. Do not use for unrelated products or operations outside this skill's stated scope."
license: MIT
compatibility: "Requires the active ECX connector and only the tools exposed by the current deployment; never request passwords or tokens in chat."
metadata:
  author: "ShopEx"
  version: "1.0.0"
  product: "ecx"
  language: "zh-CN"
---

# 推荐清单加购

## 目标

ECX电商场景能力：把推荐商品或用户明确指定的商品加入购物车；必须确认商品、SKU 和数量后再调用写工具。

## 适用场景

仅在用户明确询问上述 ECX 业务能力时启用；不因泛关键词或无关请求触发。

## 执行规则

当用户说“全部加购”“把刚才推荐的加入购物车”“就买第二个”“这款加购”等加购意图时使用本 Skill。

【流程】
1. 先识别用户指向的商品，商品 ID 只能来自本轮商品工具、商品卡或详情工具返回。
2. 如颜色、尺码、数量、规格不明确，先追问；如已明确，复述商品、规格、数量和价格依据。
3. 只有用户确认后，才调用加购工具。
4. 加购完成后，说明结果，并引导查看购物车或继续挑选。

【禁止】
- 禁止未确认直接加购。
- 禁止用 tag_id、category_id、floor_id、select_tags_list 中的 item_id 作为商品 ID。
- 禁止代替用户下单或支付。

## 数据与安全边界

- 商品、订单、价格、库存、优惠、物流和会员信息只能来自本轮可用工具返回或用户明确提供的信息；不得编造。
- 工具不可用、无权限或返回空结果时，如实说明限制，不用猜测补全结果。
- 涉及写入、提交、领取、加购、下单或其他不可逆动作时，必须先展示影响范围并取得用户明确确认；只读咨询不得擅自执行写操作。
- 不在普通对话中索要、展示、记录或转发密码、验证码、JWT、token 或连接器凭据。

## 完成检查

- 已确认请求属于本 Skill 的适用范围。
- 已区分工具事实、用户输入和无法验证的内容。
- 已遵守只读/写操作边界，并在需要时完成明确确认。
