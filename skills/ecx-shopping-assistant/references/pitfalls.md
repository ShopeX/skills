# 已知问题与规避措施

> 本文件记录特定 ECShopX 演示部署中经实际验证的后端约束。相关结论具有部署和版本相关性，不代表所有环境；执行前必须依据当前连接器契约和实际响应重新核验。
> 禁止把本文件中的示例账号、固定租户 ID、内部目录或测试参数用作公共 Skill 的默认值。
> 通用流程见 [workflow.md](workflow.md)，工具契约见 [tool-contracts.md](tool-contracts.md)。

## 速查表

| # | 问题 | 典型报错 / 现象 | 正确做法 |
|---|---|---|---|
| 1 | 宿主仅渲染 `content`，不展开 `structuredContent` | 工具返回 HTTP 200，但界面不显示业务数据 | 连接器将脱敏数据回填至 `content` 文本（见下） |
| 2 | 特定演示部署的浏览器 OAuth 链路不可用 | 未出现授权界面或未返回回调 | 优先修复或配置 OAuth；若部署提供安全凭据输入界面，可使用 login 作为回退，但禁止在普通对话收集密码或硬编码租户信息 |
| 3 | `fastbuy` 模式后端未对接 | 422 "购物车选中商品为空" | **仅使用 cart 模式**，禁止尝试 fastbuy |
| 4 | 下单必须带 `distributor_id` | 500 "Undefined array key \"distributor_id\"" | 从 `checkout_preview` 取 `distributor_id` 一并传入 |
| 5 | 优惠券不自动套用 | 领了券、预览有折扣，但不传券码则不抵扣 | 显式传 `coupon_code`（wireName=coupon_discount） |
| 6 | 订单创建会移除购物车行，取消订单不会恢复 | 再次创建订单时原购物车行可能已不存在 | 再次创建订单前调用 `cart_item_add` 获取新的 `cart_id` |
| 7 | `cart_select` 批量 `cart_ids` 被拒 | 422 "购物车参数错误" | **逐条**传单个 `cart_id` + `is_selected` |
| 8 | `guard.confirm_token` 对 agent 不可见 | dry-run 要确认但 token 被脱敏 | 用 `confirm=true` 连同原参数直接提交 |
| 9 | 特定演示部署的微信支付未接通 | 返回 `code_url`，同时报告“系统繁忙” | 如实渲染二维码并说明支付服务异常；订单仍为 `NOTPAY` |
| 10 | 金额单位是**分**不是元 | price=50 易被误读为 50 元 | ÷100 展示为元，提交仍按分 |
| 11 | `tsc` 构建须进入项目目录 | TS5058 "path does not exist" | `cd` 到 ecshopx-mcp-server；使用父级 `../node_modules/.bin/tsc` |
| 12 | 默认响应策略为 compact，verbose 也不返回数据值 | 即使请求 verbose，content 仍仅包含摘要 | 依赖问题 1 的 content 回填；不得依赖 verbose 获取字段值 |
| 13 | 订单状态不可手动修改，且 `orders_list` 默认可能为空 | 不存在状态修改工具，或列表查询返回 0 条 | 状态由支付回调自动更新；使用 `order_detail` / `trade_detail` 按 ID 查询，不依赖 `orders_list` |
| 14 | `cart_select` 勾选状态不持久化（特定演示连接器） | `cart_select` 返回 status=0/1，但 `cart_get` 回读所有行 `is_checked=false`；`checkout_preview`(cart_ids 显式传) 仍 422 "购物车选中商品为空" | 勾选态无法落地时**停止下单**，属连接器兼容性问题；回读验证是硬门槛，不得依赖"成功摘要"；禁止绕过连接器直接调用内部接口 |

---

## 1. 宿主只渲染 `content` 文本，不展开 `structuredContent`

- **现象**：业务工具返回 HTTP 200，但对话界面不显示实际业务数据，例如 `item_id`、价格、销量或购物车明细。
- **根因**：宿主只展示 MCP 响应的 `content[].text` 块；连接器把真实数据放在 `structuredContent` 里，而宿主不展开它。
- **正确做法**：在 `ecshopx-mcp-server/src/server/registerTools.ts` 的成功响应路径中，通过 `safeStringifyForContent` 将经 `redactStructuredApiPayload` 脱敏的数据写入 `content` 文本的 `--- DATA (redacted) ---` 段。该逻辑是宿主界面读取业务数据的必要条件。
  - 若工具调用后仍未显示数据值，确认连接器 `dist` 已包含该回填逻辑，并确认运行中的连接器已重新加载最新 `dist`。
  - 禁止在 agent 侧绕过连接器直接调用内部接口获取数据——违反契约且无法获取会员态。

## 2. 特定演示部署的浏览器 OAuth 授权链路不可用

- **现象**：按原计划引导浏览器回调授权，用户反馈未出现授权界面，也没有回调 code 返回，流程中断。
- **根因**：该演示部署未完成浏览器授权回调链路的连接；独立 `ecshopx-member-auth` 连接器运行在 3040 端口，但购物连接器无法获得可用会话。
- **正确做法**：优先修复或配置浏览器 OAuth。若当前部署明确提供安全凭据输入界面，可回退到 `ecshopx_member_auth_login`；`company_id` 必须从可信部署配置或当前会员上下文获得，不能猜测。
- **注意**：普通对话禁止收集或复述密码、授权值和一次性 code。不得把演示账号、固定租户或测试密码写入公共指令。

## 3. `fastbuy`（立即购买）模式后端未对接 —— 本后端仅支持 cart 模式

- **现象**：`cart_type=fastbuy` 调用 `checkout_preview` 返回 **422 "购物车选中商品为空"**，即便已传成对的 `item_id` + `item_num`。
- **根因**：该商城后端 `getFreightFee` 只接受「购物车已勾选行」作为输入，fastbuy 路径在计算运费/预览时未对接。
- **正确做法**：对于存在该限制的部署，必须使用 cart 模式，不得尝试 fastbuy：
  1. `cart_item_add` 加购（获取 `cart_id`）。
  2. `cart_select` 勾选目标行（见问题 7：只能单条）。
  3. `checkout_preview` 结算预览。
  4. `order_create` 下单。
- **文档约束**：`workflow.md` 和 `tool-contracts.md` 不得将 fastbuy 列为该部署的可选模式。该部署仅支持 cart 模式，两种模式不得混用。

## 4. `order_create` 必须带 `distributor_id`

- **现象**：下单请求不带 `distributor_id` 时返回 **500 "Undefined array key \"distributor_id\""**。
- **根因**：商城下单接口把 `distributor_id` 当作必填数组键，缺省即报错。
- **正确做法**：从当前 `checkout_preview` 响应中获取 `distributor_id`，并将原始值传入 `order_create` 的请求体；禁止根据历史演示值推断或省略。

## 5. 优惠券不会自动套用，必须显式传 `coupon_code`

- **现象**：优惠券已领取且结算预览中的 `coupon_discount` 有效，但创建订单时未传入券码，导致订单未应用预期优惠。
- **根因**：订单创建接口**不会自动挑选**购物车里的可用券，需要把目标券的券码显式提交（参数 wireName 为 `coupon_discount`，即传 `coupon_code`）。
- **正确做法**：
  1. 在 `checkout_preview` 确认最优券及其 `coupon_code`。
  2. 把 `coupon_code` **显式**传入 `order_create`。
  3. 下单后对照订单/`checkout_preview` 的 `coupon_discount` 字段，核验抵扣**真实生效**，禁止仅看券面文案。

## 6. 下单成功会扣减购物车对应行，取消订单不归还

- **现象**：首次调用 `order_create` 后，后端会消费对应购物车行；再次创建或修改订单时，原购物车行可能已不存在。
- **根因**：下单动作在后端会扣减购物车中对应行；但**取消订单不会回滚购物车**。
- **正确做法**：若需要再次创建或修改订单：
  1. 先 `cart_item_add` 把商品重新加购，获取**新的 `cart_id`**。
  2. 再使用 `cart_select` 勾选新的购物车行 → `checkout_preview` → `order_create`（传入新的 `cart_ids` 和 `coupon_code`）。
  3. **不得假设原 `cart_id` 仍然存在**；每次创建订单前都必须回读购物车，确认目标行有效。

## 7. `cart_select` 批量传 `cart_ids` 会被拒 —— 只能单条

- **现象**：一次请求传 `cart_ids: [id1, id2]` 想批量勾选，返回 **422 "购物车参数错误"**。
- **根因**：该后端只接受**单条** `cart_id` + `is_selected` 的形态，批量数组格式被拒。
- **正确做法**：**逐条调用** `cart_select`，每次只传一个 `cart_id` 与 `is_selected`（`true`/`false`）。需要隔离目标商品时，对无关行各发一次 `is_selected=false`，对目标行发一次 `is_selected=true`。

## 8. `guard.confirm_token` 对 agent 不可见（被脱敏）

- **现象**：订单创建或二维码生成的 dry-run 返回「需要确认」，但确认令牌在 `structuredContent` 中被脱敏，`content` 也不显示该令牌，因此无法手工提交原令牌。
- **根因**：确认令牌被连接器安全脱敏，不回显给 agent。
- **正确做法**：提交时用 **`confirm=true`**（连同本次**完全相同**的业务参数）直接调用，连接器会用会话内保存的确认态放行。
  - 确认令牌不会向 Agent 暴露，因此不得尝试复制或手工提交该令牌。
  - 任何业务参数变化、金额变化都必须重新 dry-run，再带 `confirm=true` 提交。

## 9. 特定演示部署未接入微信支付

- **现象**：`payment_qr_create` 返回 `code_url`，同时报告 **「系统繁忙，请稍后再试」**。
- **根因**：该演示部署的后端未完成微信支付接入，Native 支付发起失败。
- **正确做法**：
  - 仍按契约将返回的 `code_url` 原样渲染为二维码图像，使用当前环境支持的二维码渲染方式。
  - **如实分层告知**：订单已创建、二维码内容已生成、但支付服务异常，订单仍为 `NOTPAY`，**不得宣称支付发起成功或支付成功**。
  - 建议用户稍后重新生成二维码或查询订单状态；禁止伪造支付成功。
  - **说明**：「系统繁忙」可能表示支付服务暂态异常，不能单独用于判断最终支付结果。用户扫码后的结果可能在后续支付通知到达商城后更新订单状态。必须同时查询 `ecshopx_member_order_detail({order_id})` 和 `ecshopx_member_trade_detail({trade_id})`；仅当订单状态为 `PAYED` 且交易状态为 `SUCCESS` 时，才确认支付成功。

## 10. 金额单位是「分」不是「元」

- **现象**：接口返回 `price=50`、`total=55`，容易被误读为 50 元 / 55 元。
- **根因**：商城接口金额字段以**分（fen）**为单位。
- **正确做法**：展示给用户时 **÷100** 换算为人民币元；向工具提交时仍使用接口原始单位（分）。先确认接口单位再换算，避免金额错配。

## 11. `tsc` 构建须进入项目目录

- **现象**：在其他目录执行 `tsc -p tsconfig.json` 报 **error TS5058: The specified path does not exist**。
- **根因**：`tsconfig.json` 的路径是相对当前工作目录解析的，不在项目根目录时找不到。
- **正确做法**：
  1. 先 `cd` 到 `ecshopx-mcp-server` 项目根（含 `tsconfig.json`）。
  2. 项目本地没有 `node_modules/.bin/tsc`，使用父级：`../node_modules/.bin/tsc -p tsconfig.json`。
  3. 或直接 `npm run build`（npm 会解析父级 typescript）。
  4. 修改 `src/` 后必须重新构建，运行中的连接器进程才会加载新 `dist`（重启/重连连接器生效）。

## 12. 响应策略默认 compact，verbose 也不露出数据值

- **现象**：即便请求 `verbose`，`content` 里也只有摘要文本，没有数据值。
- **根因**：`responsePolicy.ts` 固定 `mode: "compact"`；`verbose` 只放宽长度上限，**不**回填数据值（值本来就在不可见的 `structuredContent`）。
- **正确做法**：依赖问题 1 的 `content` 回填读取数据；不得依赖 `verbose` 返回字段值。若仍未显示数据，检查连接器 `dist` 是否包含回填逻辑并已由运行中的连接器加载。

## 13. 订单状态由支付回调自动更新；不存在手动修改工具，且 `orders_list` 默认可能为空

- **现象**：支付后不存在用于手动修改订单状态的写工具；使用 `ecshopx_member_orders_list` 查询订单时，结果可能为 `count=0`。
- **根因**：
  1. 订单状态（`NOTPAY` → `PAYED`）只能由**微信支付结果通知（回调）**到达商城后自动更新；ECShopX 连接器**刻意不暴露**任何「手动标记已付款」的写操作，以防伪造支付。
  2. 当前 `orders_list` 列表接口默认仅展示特定状态分组（如待付款或进行中）；已支付（`PAYED`）订单可能不包含在默认结果中。
- **正确做法**：
  - 支付成功与否不得依赖手动修改订单状态，也不得仅依据二维码生成时的瞬时错误；应使用**实时查询**确认：
    - `ecshopx_member_order_detail({order_id})` → 看 `order_status` / `pay_status`（值为 `PAYED` 即已支付）、`order_status_msg`（如「待发货」）。
    - `ecshopx_member_trade_detail({trade_id})` → 看 `tradeState`（值为 `SUCCESS` 即支付成功）、`transactionId`、`payDate`。
  - 二维码生成时若返回「系统繁忙」，可稍后使用上述两个工具重新查询；仅当订单状态为 `PAYED` 且交易状态为 `SUCCESS` 时，才确认用户已完成支付。
  - 必须按 `order_id` / `trade_id` 查询详情；不得使用 `orders_list` 判断订单是否存在，因为当前接口默认可能不返回已支付订单。

---

## 14. `cart_select` 勾选状态在特定演示连接器下不持久化（经当前部署验证）

- **现象**：
  1. `cart_item_add` 加购成功，回读获取目标 `cart_id`（如 3456），但目标行 `is_checked` 初始就是 `true`（后端默认勾选新增行）。
  2. 对其他既有购物车行逐条调用 `cart_select(is_selected=0/1、数字或布尔)`，工具返回 `status=0` 或 `status=1`，但该响应仅表示调用完成。
  3. 再次调用 `cart_get` 回读时，所有购物车行的 `is_checked` 均为 `false`，包括刚设置为 `is_selected=1` 的目标行。勾选状态既未在读取接口中持久化，也未被结算识别。
  4. 直接 `checkout_preview(cart_type=cart, cart_ids="3456", 完整 receiver 字段)` 也返回 **422 "购物车选中商品为空"**。
- **根因**：当前演示连接器（或后端购物车勾选接口）未将 `cart_select` 的写入持久化到会员购物车勾选状态；`checkout_preview` / `order_create` 以购物车勾选行作为输入，缺少勾选状态时返回 422。问题 7 仅涉及批量参数校验；逐条调用可通过参数校验，但勾选结果仍未持久化。
- **正确做法**：
  - 把「回读验证勾选态变化」当作**硬门槛**：`cart_select` 后必须 `cart_get` 确认目标行 `is_checked=true` 且其他行 `false`，否则视为未生效，**停止并报告连接器兼容性问题**，禁止强行 `order_create`（会 422 或误包含其他商品）。
  - 禁止为了推进而绕过连接器直接调用内部接口——违反契约且无法获取会员态。
  - **当前部署验证过的替代方案**：利用 `cart_item_add` 对**新增行默认 `is_checked=true`** 的特性（见问题 14 现象描述），通过“重新加购 + 调整数量”获取一条被勾选的目标行，全程不调用 `cart_select`。该方案仅适用于当前部署，使用前必须重新执行兼容性验证：
    1. 若 `item` 已存在于购物车且未勾选，再调用一次 `cart_item_add`（使用相同 `item_id` 和目标数量）。后端会将商品合并到同一购物车行，将 `is_checked` 设置为 `true`，并累加数量。
    2. 立即 `cart_item_update(cart_id, num=目标数量)` 把数量改回需要的件数；`update` 不会清空刚置上的勾选态，回读确认 `is_checked=true` 且数量正确。
    3. 此时 `checkout_preview(cart_ids=<该cart_id>)` 即可正常隔离该商品并出预览（即便从未调用 `cart_select`）。
    - 注意：对已存在于购物车中的 `item` 调用 `cart_item_add` 会合并并累加数量，而不是创建新行。若累加后的数量超过目标值，必须调用 `cart_item_update` 调整为目标数量，并回读验证勾选状态仍然有效。
    - 此替代方案仅适用于「目标商品本就在会员店铺、且只需隔离单条」的场景；多商品分别结算仍受 `cart_select` 不持久化限制，需逐条用上述「加购→update」方式各自获取勾选态。
  - 修复方向（需开发者介入）：检查 `ecshopx-mcp-server` 中 `cart_select` 的字段映射（尤其 `is_selected` 的后端语义是 1/0 还是 checked 标记、是否需要 `selected` 字段）与 `checkout_preview` 读取勾选行的来源（session vs DB）。属连接器侧 bug，非 agent 流程问题。

---

## 推荐执行路径

基于上述约束，建议采用以下执行顺序：

1. 优先通过浏览器 OAuth 完成授权；仅在部署明确支持安全凭据输入时回退使用 `login` 流程。租户信息必须从可信配置或当前上下文获取。
2. 在会员 `company_id` 下搜索并核验目标商品；销量排序等比较依据必须来自会员所属商城的实际响应。
3. 查询公开优惠券与会员优惠券，领取后重新查询到账记录；选择当前可用且使本单应付金额最低的优惠券，并记录 `coupon_code`。
4. `cart_item_add` 加购目标商品 → 回读购物车获取 `cart_id`。
5. `cart_select` **逐条**勾选：目标行 `is_selected=true`，其余 `false` → 回读确认。
6. `checkout_preview`：取 `distributor_id`、核验金额（分→元）、确认 `coupon_discount` 生效、明细只含目标商品。
7. 展示一次脱敏订单摘要，取得用户明确确认。
8. `order_create`：带 `distributor_id` + `cart_ids`（仅目标行）+ `coupon_code` + 完整 receiver 地址；用 `confirm=true` 提交；必须获取有效 `order_id`。
9. `payment_qr_create`（order_id + `confirm=true`）获取 `code_url` → 渲染二维码。
10. 分别说明订单状态、二维码生成状态和支付结果；若当前部署未接入微信支付，明确说明订单仍为 `NOTPAY`。
11. 用户支付后，订单后端状态由支付回调自动更新。使用 `order_detail`（`order_id`）查询 `order_status=PAYED`，使用 `trade_detail`（`trade_id`）查询 `tradeState=SUCCESS`；仅在两项同时满足时确认支付成功。若先前返回「系统繁忙」，稍后重新查询；不得使用 `orders_list` 判断订单是否存在，必须按 ID 查询详情。

任何写操作后都**回读验证**；任何金额/参数变化都重新 dry-run。
