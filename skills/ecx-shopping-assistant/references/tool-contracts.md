# 工具契约与数据核验

## 原则

以当前会话可见的结构化 ECShopX MCP 工具为准。禁止通过 curl、读取本地凭据或直接调用内部接口绕过连接器。工具名称可能因版本变化，以能力语义匹配，禁止猜测不存在的参数。

## 能力映射

| 阶段 | 典型工具 | 成功判据 |
|---|---|---|
| 商品列表 | `ecshopx_h5_goods_list` | 返回可靠候选；名称与关键词实际匹配 |
| 商品详情 | `ecshopx_h5_goods_detail` | 有效商品、SKU、价格、库存和状态 |
| 授权 | 独立 `ecshopx-member-auth` 工具 | 获得短期不透明会员授权句柄 |
| 购物车读取 | `ecshopx_member_cart_get` | 返回当前会员购物车明细 |
| 加购 | `ecshopx_member_cart_item_add` | 回读后目标行、数量与价格正确 |
| 勾选 | `ecshopx_member_cart_select` | 回读后勾选状态实际改变 |
| 地址 | `ecshopx_member_addresses_list` | 获得稳定 `address_id` 与地址字段 |
| 公开券 | `ecshopx_h5_coupon_public_list` | 返回当前商城可领取券 |
| 会员券 | `ecshopx_member_coupons_list` | 返回当前会员券及状态 |
| 领取优惠券 | `ecshopx_member_coupon_receive` | 重新查询会员优惠券后出现对应券且状态有效 |
| 结算预览 | `ecshopx_member_checkout_preview` | 明细、优惠、运费和总额完整且一致 |
| 创建订单 | `ecshopx_member_order_create` | 业务成功并返回有效 `order_id` |
| 支付方式 | `ecshopx_member_payment_methods_list` | 微信扫码支付能力可用 |
| 支付二维码 | `ecshopx_member_payment_qr_create` | 商城后端返回当前订单 `code_url` 且无业务失败 |
| 交易详情 | `ecshopx_member_trade_detail` | 返回非缓存的当前交易状态 |
| 订单详情 | `ecshopx_member_order_detail` | 当前订单状态与支付状态一致 |

## 地址映射

结算与下单保持同一地址：

| 地址字段 | 订单字段 |
|---|---|
| `username` | `receiver_name` |
| `telephone` | `receiver_mobile` |
| `province` | `receiver_state` |
| `city` | `receiver_city` |
| `county` | `receiver_district` |
| `adrdetail` | `receiver_address` |
| `postalCode` | `receiver_zip` |

创建订单时 `distributor_id` 为**必填字段**；缺失时会返回 500 "Undefined array key \"distributor_id\""。该值必须取自当前 `checkout_preview` 响应，并以原始值传入 `order_create`，不得根据历史演示值推断或省略。其余必填字段同样以当前工具契约和预览响应为准。

## 购物车模式

> ⚠️ **已验证的演示部署仅支持 cart 模式。** `fastbuy`（立即购买）路径未接入运费计算和结算预览，会返回 422 "购物车选中商品为空"。执行前应核对当前部署能力；该限制适用时，必须使用 cart 模式。详见 [pitfalls.md](pitfalls.md) 第 3、7 条。

### cart（唯一可用）

- 传 `cart_type=cart`。
- `cart_ids` 必须非空，并只包含本次目标行。
- 写操作后回读验证。
- 勾选（`cart_select`）**只能单条**传 `cart_id` + `is_selected`，批量 `cart_ids` 会被 422 拒绝。

### fastbuy（本后端不可用，禁止使用）

- 传 `cart_type=fastbuy` + 成对 `item_id`/`item_num` 在本后端会 422，禁止尝试。
- 两种模式不得混用；对于已验证存在该限制的部署，必须使用 cart 模式。

## 金额

优先读取：

- `item_fee`
- `freight_fee`
- `discount_fee`
- `member_discount`
- `coupon_discount`
- `promotion_discount`
- `point_fee`
- `total_fee`

确认接口单位。以分返回时除以 100 后展示为人民币元；计算与提交仍使用工具要求的原始单位。

## 订单 dry-run

1. 使用完整业务参数调用订单创建工具：`distributor_id`（必填，来自预览）、`cart_ids`（仅目标行）、完整 receiver 地址。
2. 优惠券**不会自动套用**：必须把目标券的 `coupon_code`（参数 wireName 为 `coupon_discount`）**显式**传入；下单后对照 `coupon_discount` 字段核验抵扣真实生效。
3. dry-run 返回的 `guard.confirm_token` 对 agent **不可见**（被脱敏）。提交时直接使用 **`confirm=true`** 连同本次完全相同参数调用，连接器会用会话内确认态放行；禁止试图复制不可见的 token。
4. 展示商品、数量、脱敏地址、优惠、运费和应付金额。
5. 获得明确确认后用 `confirm=true` 提交。
6. 参数变化、金额变化或确认过期时重新 dry-run。

## 支付二维码来源

支付二维码的正确链路：

1. 商城后端根据 `order_id` 调用微信 Native 支付能力。
2. 商城后端响应包含 `code_url`。
3. Agent 将 `code_url` 原样编码成二维码图片或界面二维码。
4. 用户扫码并在微信中自行确认支付。
5. Agent 通过交易和订单接口查询最终状态。

Agent 不是支付凭证签发方，不生成支付参数，不修改 `code_url`。

## 状态表达

- `NOTPAY`：未支付。
- `PART_PAYMENT`：部分付款，尚未付清。
- `SUCCESS` 或后端明确已支付：支付成功；再核实订单状态。
- `CLOSED`、`REVOKED`、`PAYERROR`：支付未完成。
- 返回 `code_url` 且同时返回系统繁忙或业务错误：二维码内容可能存在，但支付发起状态异常；禁止宣称成功。

## 兼容性检查

发布或部署前验证以下连接器行为：

1. 优惠券领取工具的 HTTP method/path 与商城实际接口一致，且领取后可在会员优惠券列表中查询到对应记录。
2. 购物车勾选工具的参数形态与商城实际接口一致，且回读状态变化。
3. 订单工具包含商城要求的全部接收人和分销字段。
4. 支付工具只接受当前会员名下可支付订单，并返回真实后端 `code_url`。

若任一检查失败，Skill 应停止对应流程并报告连接器版本兼容性问题，禁止绕过结构化工具直连内部接口。
