# Profile 配置

profile 是用户私有 JSON，默认存放在：

```text
~/.config/jiandaoyun-timesheet-review/profiles/<slug>.json
```

## 字段

- `version`：当前为 `1`。
- `profileName`：供用户选择的名称。
- `personName`：要巡检的人员，可为当前用户或指定人员。
- `listUrl`：简道云数据列表 URL，必填。
- `todoUrl`：简道云应用“我的待办”URL；可由列表 URL 的 app 标识推导。
- `loginUrl`：可选的租户扫码登录 URL；缺省时使用简道云首页。
- `tableName`：待办页中显示的表单名称。
- `fields`：业务字段名映射，必须包含 `person`、`status`、`node`、`owner`；`projectManager` 可选。
- `values.activeStatus`：表示未完成的状态值。
- `values.confirmNode`：表示需要确认的节点值。
- `displayFields`：表格输出的业务列及顺序。
- `matchFields`：确认动作前用于唯一匹配待办的字段，至少两个。
- `transportMode`：可选，推荐 `session_api`；接口不可用时回退浏览器。
- `browserProfilePath`：推荐，Skill 目录外的持久化浏览器配置目录，权限必须为 `0700`。
- `authStatePath`：可选，Skill 目录外的最小浏览器状态文件。只保存 `auth_token`、`JDY_SID`、`_csrf` 三个 Cookie，文件权限必须为 `0600`。
- `runtimeStatePath`：可选，Skill 目录外的接口模板与版本信息文件；不得包含 token、Cookie、CSRF 或一次性请求 ID。

## 虚构示例

```json
{
  "version": 1,
  "profileName": "示例研发工时",
  "personName": "李四",
  "listUrl": "https://www.jiandaoyun.com/dashboard#/app/example-app/form/example-form",
  "todoUrl": "https://www.jiandaoyun.com/dashboard#/app/example-app/flow/todo",
  "loginUrl": "https://www.jiandaoyun.com/",
  "transportMode": "session_api",
  "browserProfilePath": "~/.config/jiandaoyun-timesheet-review/browser-profile/example",
  "runtimeStatePath": "~/.config/jiandaoyun-timesheet-review/runtime/example.json",
  "tableName": "研发工时表",
  "fields": {
    "person": "填报人",
    "status": "审批状态",
    "node": "审批节点",
    "owner": "审批负责人",
    "projectManager": "项目负责人"
  },
  "values": {
    "activeStatus": "处理中",
    "confirmNode": "经理确认"
  },
  "displayFields": [
    "项目",
    "工时日期",
    "小时数",
    "工作说明",
    "填报人",
    "项目负责人",
    "审批状态",
    "审批节点",
    "审批负责人"
  ],
  "matchFields": ["项目", "工时日期", "小时数", "工作说明", "填报人"]
}
```

发布前搜索 Skill 目录，确保示例中没有真实姓名、租户、app、form 或登录 URL。

`browserProfilePath` 必须指向 Skill 目录外的专用目录；不要与日常浏览器 Profile 混用。不要通过延长 Cookie 的 `expires` 伪造有效期；服务端仍可随时撤销会话。
