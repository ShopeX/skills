# OMS 销售明细统计接口约束

## 工具

使用当前部署提供的 `sales_detail_statistics` 只读工具。不要绕过 MCP 直接调用接口、操作数据库或执行写操作。

## 必填参数

- `material_type`：只能选择 `basic_material`、`sales_material` 或 `sales_and_basic_material` 之一。
- `time_from` 与 `time_to`：必须成对提供，格式为 `YYYY-MM-DD`，跨度不超过 31 天。

## 可选筛选

- `bn`、`goods_bn`、`sales_material_bn`：根据 `material_type` 选择兼容字段。
- `shop_id`：店铺 ID 字符串或字符串数组；店名或店铺编码必须先通过店铺管理能力解析。
- `shop_type`：店铺类型；与 `shop_id` 二选一。
- `page`、`page_size`、`order_by`：分页与排序控制。

同一字段的数组值表示 OR，不同字段之间表示 AND。不要把 `bn`、`goods_bn` 或 `sales_material_bn` 作为数组批量传入。

## 返回处理

优先读取 `summary`，其次读取 `detail`，最后读取 `aggregations`。不要展示 `filters`、`columns`、`by_date` 等 Finder 元数据，也不要把分页结果当作全量统计。

## 错误处理

- `NOT_LOGGED_IN`：提示用户通过安全流程重新建立 OMS MCP 会话。
- `PERMISSION_DENIED`：提示管理员补充 `analysis_products` 权限。
- `VALIDATION_ERROR`：根据错误消息修正日期、物料口径或排序参数。
- `OMS_BACKEND_ERROR`：按上游状态或消息报告服务异常，不要误报为“数据为空”。
