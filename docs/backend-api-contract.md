# 后端 API 对接文档

基础地址：

```text
本地开发：http://localhost:8080/api
Docker 前端代理：http://localhost/api
```

## 通用约定

- 请求和响应均使用 JSON。
- 第一版暂未启用登录鉴权，后续可加 `Authorization: Bearer <token>`。
- 时间字段使用 ISO 8601 字符串。
- 错误响应遵循 NestJS 默认格式。

错误示例：

```json
{
  "message": "Page xxx not found",
  "error": "Not Found",
  "statusCode": 404
}
```

## GET `/health`

健康检查。

响应：

```json
{
  "status": "ok",
  "service": "backend-api",
  "time": "2026-06-30T12:00:00.000Z"
}
```

## GET `/user/profile`

获取顶部用户信息和算力值。

响应：

```json
{
  "id": "50083969",
  "username": "szdglskj",
  "displayName": "演示账号",
  "computeBalance": 27643,
  "locale": "zh-CN"
}
```

## GET `/navigation`

获取左侧一级导航和二级菜单。

响应：

```json
[
  {
    "key": "a2p",
    "label": "A2P",
    "icon": "a2p",
    "overviewKey": "a2p-overview",
    "children": [
      {
        "key": "creative-video",
        "label": "创意视频",
        "icon": "video"
      }
    ]
  }
]
```

## GET `/home/config`

获取首页配置。

响应：

```json
{
  "subtitle": "GEO + Agent 双引擎",
  "platforms": ["豆包", "DeepSeek", "Kimi"],
  "products": [
    {
      "id": "kb",
      "moduleKey": "knowledge",
      "pageKey": "knowledge-overview",
      "name": "AI知识库",
      "enName": "AI Knowledge Base"
    }
  ]
}
```

## GET `/products/:id`

获取产品详情。

示例：

```text
GET /api/products/claw-3
```

响应：

```json
{
  "id": "claw-3",
  "title": "向量增长 AI Claw 3.0",
  "description": "面向企业营销增长的 GEO + Agent 双引擎平台。",
  "features": ["AI知识库", "GEO答案营销", "A2P创意营销"]
}
```

## GET `/pages/:pageKey`

获取工作台页面数据。

可用 `pageKey`：

| 模块 | 总览 | 子页面 |
| --- | --- | --- |
| 知识库 | `knowledge-overview` | `kb-document`, `kb-qa`, `kb-agent` |
| GEO | `geo-overview` | `geo-answer`, `geo-rank`, `geo-report` |
| A2P | `a2p-overview` | `creative-video`, `short-drama`, `a2p-publish`, `free-traffic` |
| Agent | `agent-overview` | `agent-flow`, `agent-tool`, `agent-log` |
| 看板 | `dashboard-overview` | `dashboard-data`, `dashboard-clue`, `dashboard-asset` |

响应：

```json
{
  "eyebrow": "AI to Performance",
  "title": "AI短剧",
  "description": "根据行业痛点和产品卖点生成连续短剧情节、人物设定、台词和转化钩子。",
  "actions": [
    { "label": "新建任务", "icon": "plus" },
    { "label": "批量导入", "icon": "publish" }
  ],
  "metrics": [
    { "label": "创意任务", "value": "246", "trend": "+39" }
  ],
  "primary": {
    "title": "创意生产线",
    "cta": "新建",
    "items": [
      {
        "title": "脚本生成",
        "text": "按产品、行业、目标人群生成短视频脚本和分镜。",
        "tag": "批量"
      }
    ]
  },
  "secondary": {
    "title": "内容漏斗",
    "items": [
      { "label": "脚本通过", "value": "81%", "percent": "81%" }
    ]
  },
  "table": {
    "title": "创意任务",
    "columns": ["名称", "平台", "状态", "更新时间"],
    "rows": [
      {
        "id": "a2p1",
        "名称": "GEO招商短视频",
        "平台": "抖音",
        "状态": "待发布",
        "更新时间": "2026-06-30 17:48"
      }
    ]
  }
}
```

## POST `/assistant/search`

顶部搜索框/智能助手入口。第一版同步返回一个提示，同时创建异步任务并投递给 Worker。

请求：

```json
{
  "query": "帮我生成一条短视频营销方案"
}
```

响应：

```json
{
  "query": "帮我生成一条短视频营销方案",
  "answer": "已收到任务需求：“帮我生成一条短视频营销方案”。后端已创建异步任务，Worker 会继续处理 AI 问答、知识库检索或 Agent 执行。",
  "taskId": "clx...",
  "status": "queued"
}
```

## GET `/tasks/:taskId`

查询异步任务状态。

响应：

```json
{
  "id": "clx...",
  "type": "assistant.search",
  "status": "completed",
  "input": {
    "query": "帮我生成一条短视频营销方案"
  },
  "output": {
    "answer": "Worker 已处理..."
  },
  "error": null,
  "createdAt": "2026-06-30T12:00:00.000Z",
  "updatedAt": "2026-06-30T12:00:02.000Z"
}
```

状态枚举：

```text
queued
processing
completed
failed
```
