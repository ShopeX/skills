---
name: ecx-shopping-recommendation-add-to-cart
description: "ECX电商场景：把推荐商品或用户明确指定的商品加入购物车；必须确认商品、SKU 和数量后再调用写工具。。用于用户询问相关业务能力时；不用于无关产品或超出正文边界的操作。 Use when users request this capability."
---

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
