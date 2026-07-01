# 向量增长 Ai Claw 前端 API 对接契约

默认前端请求前缀：`/api`。生产环境设置：

```bash
VITE_API_BASE_URL=https://your-domain.com
VITE_USE_MOCK=false
```

当前前端已经接入 Mock 数据；后端按以下契约返回同结构 JSON 即可替换。

## 页面 Key

一级模块和页面：

| 模块 | 总览 pageKey | 子页面 pageKey |
| --- | --- | --- |
| 知识库 | `geo-basic-info` | `geo-basic-info`, `geo-profile-settings`, `geo-image-upload`, `geo-video-upload`, `geo-scene-words`, `agent-card-settings`, `agent-staff-settings`, `claw-media-auth`, `claw-new-media-auth` |
| GEO | `geo-overview` | `geo-answer`, `geo-rank`, `geo-report` |
| A2P | `a2p-overview` | `creative-video`, `short-drama`, `a2p-publish`, `free-traffic` |
| Agent | `agent-overview` | `agent-flow`, `agent-tool`, `agent-log` |
| 看板 | `dashboard-overview` | `dashboard-data`, `dashboard-clue`, `dashboard-asset` |
| 数据洞察 | `data-insight` | 顶部入口独立页面 |

## GET `/api/user/profile`

返回顶部用户状态、算力值和语言。

```json
{
  "id": "50083969",
  "username": "szdglskj",
  "displayName": "演示账号",
  "computeBalance": 27643,
  "locale": "zh-CN"
}
```

## GET `/api/navigation`

返回左侧导航与二级菜单。`overviewKey` 用于点击一级菜单后打开模块总览页。

```json
[
  {
    "key": "a2p",
    "label": "A2P",
    "icon": "a2p",
    "overviewKey": "a2p-overview",
    "children": [
      { "key": "creative-video", "label": "创意视频", "icon": "video" },
      { "key": "short-drama", "label": "AI短剧", "icon": "short" }
    ]
  }
]
```

可用 `icon`：`home`, `knowledge`, `geo`, `a2p`, `agent`, `dashboard`, `video`, `short`, `publish`, `traffic`, `board`, `package`, `gift`, `chat`, `clip`, `plus`, `play`。

知识库模块使用分组侧栏，返回 `drawerType: "knowledge-admin"` 和 `groups`：

```json
{
  "key": "knowledge",
  "label": "知识库",
  "icon": "knowledge",
  "drawerType": "knowledge-admin",
  "overviewKey": "geo-basic-info",
  "children": [],
  "groups": [
    {
      "key": "geo-knowledge",
      "label": "GEO 知识库",
      "icon": "image",
      "children": [
        { "key": "geo-basic-info", "label": "基础信息", "icon": "package" },
        { "key": "geo-profile-settings", "label": "画像设置", "icon": "userCog" },
        { "key": "geo-image-upload", "label": "图片上传", "icon": "image" },
        { "key": "geo-video-upload", "label": "视频上传", "icon": "videoFile" },
        { "key": "geo-scene-words", "label": "设置场景词", "icon": "chat" }
      ]
    },
    {
      "key": "agent-knowledge",
      "label": "Agent 知识库",
      "icon": "folder",
      "children": [
        { "key": "agent-card-settings", "label": "官网&名片设置", "icon": "package" },
        { "key": "agent-staff-settings", "label": "数字员工设置", "icon": "user" }
      ]
    },
    {
      "key": "claw-auth",
      "label": "Claw 授权",
      "icon": "user",
      "children": [
        { "key": "claw-media-auth", "label": "自媒体授权", "icon": "publish" },
        { "key": "claw-new-media-auth", "label": "新媒体授权", "icon": "publish" }
      ]
    }
  ]
}
```

## GET `/api/home/config`

返回首页标题、平台图标列表与五个产品卡片。

```json
{
  "subtitle": "GEO + Agent 双引擎",
  "platforms": ["豆包", "DeepSeek", "Kimi", "通义"],
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

## GET `/api/pages/:pageKey`

返回工作台页面数据。所有二级页面都使用同一结构，前端根据结构渲染指标、功能卡、进度区和表格。

```json
{
  "eyebrow": "AI Knowledge Base",
  "title": "AI知识库总览",
  "description": "统一管理企业资料、问答语料和知识体。",
  "actions": [
    { "label": "新建任务", "icon": "plus" },
    { "label": "批量导入", "icon": "publish" }
  ],
  "metrics": [
    { "label": "知识文件", "value": "1,286", "trend": "+86 本周" }
  ],
  "primary": {
    "title": "推荐能力",
    "cta": "新建",
    "items": [
      {
        "title": "资料结构化",
        "text": "自动解析 PDF、网页、表格和产品手册。",
        "tag": "解析中"
      }
    ]
  },
  "secondary": {
    "title": "知识健康度",
    "items": [
      { "label": "内容完整度", "value": "88%", "percent": "88%" }
    ]
  },
  "table": {
    "title": "最近知识资产",
    "columns": ["名称", "负责人", "状态", "更新时间"],
    "rows": [
      {
        "id": "kb1",
        "名称": "向量增长 AI产品白皮书",
        "负责人": "刘静",
        "状态": "已索引",
        "更新时间": "2026-06-30 17:20"
      }
    ]
  }
}
```

约束：

- `metrics` 建议返回 4 个，移动端可自适应。
- `primary.items` 建议返回 3 个。
- `secondary.items[].percent` 使用百分比字符串，例如 `"76%"`。
- `table.columns` 的每个值必须能在 `table.rows[]` 上作为字段名读取。
- `table.rows[].id` 必填，用于 React 列表 key。

### 数据洞察 `data-insight`

`kind` 为 `data-insight` 时，前端渲染顶部“数据洞察”按钮进入的独立页面。

```json
{
  "kind": "data-insight",
  "title": "数据洞察",
  "scenes": [
    { "key": "search-word", "label": "搜索词场景" },
    { "key": "qa-word", "label": "问答词场景" },
    { "key": "brand", "label": "品牌场景" }
  ],
  "defaultKeyword": "挖掘机",
  "keywordPlaceholder": "请输入关键词",
  "industries": ["制造业", "机械设备", "企业服务"],
  "actions": ["索鲲", "数据挖掘"]
}
```

建议后端提供任务创建接口：

## POST `/api/data-insight/tasks`

请求：

```json
{
  "scene": "search-word",
  "keyword": "挖掘机",
  "industry": "制造业",
  "action": "数据挖掘"
}
```

响应：

```json
{
  "taskId": "insight-1001",
  "status": "created",
  "message": "数据洞察任务已创建"
}
```

### 知识库：基础信息 `geo-basic-info`

`kind` 为 `knowledge-basic-info` 时，前端渲染基础信息表单。

```json
{
  "kind": "knowledge-basic-info",
  "title": "基础信息",
  "description": "维护 GEO 知识库的企业基础资料。",
  "fields": [
    { "key": "companyName", "label": "企业名称", "value": "深圳市道格拉斯科技有限公司" },
    { "key": "shortName", "label": "品牌简称", "value": "道格拉斯科技" },
    { "key": "industry", "label": "所属行业", "value": "企业AI营销 / GEO优化服务" },
    { "key": "profile", "label": "企业简介", "type": "textarea", "value": "企业简介内容" }
  ],
  "tags": ["GEO优化", "AI营销", "Agent"]
}
```

建议后端同时提供保存接口：

## PUT `/api/knowledge/geo/basic-info`

请求：

```json
{
  "companyName": "深圳市道格拉斯科技有限公司",
  "shortName": "道格拉斯科技",
  "industry": "企业AI营销 / GEO优化服务",
  "website": "https://www.vector-growth.ai",
  "contact": "刘静",
  "phone": "13928477610",
  "address": "广东省深圳市南山区科技园",
  "slogan": "GEO + Agent 双引擎，帮助企业抢占 AI 搜索答案入口。",
  "profile": "企业简介内容",
  "tags": ["GEO优化", "AI营销", "Agent"]
}
```

响应：

```json
{ "success": true, "updatedAt": "2026-06-30 18:30:00" }
```

### 知识库：画像设置 `geo-profile-settings`

`kind` 为 `knowledge-profile-settings` 时，前端渲染画像列表和分页。

```json
{
  "kind": "knowledge-profile-settings",
  "title": "画像设置",
  "addButtonText": "添加画像",
  "table": {
    "columns": [
      { "key": "index", "label": "序号" },
      { "key": "name", "label": "名称" },
      { "key": "time", "label": "时间" },
      { "key": "source", "label": "来源" },
      { "key": "actions", "label": "操作" }
    ],
    "rows": [
      {
        "id": "profile-1",
        "index": 1,
        "name": "深圳市道格拉斯科技有限公司",
        "time": "2026-06-12 12:52",
        "source": "默认",
        "actions": ["复制", "编辑", "删除"],
        "details": {
          "name": "深圳市道格拉斯科技有限公司",
          "source": "默认",
          "industry": "企业AI营销 / GEO优化服务",
          "audience": "需要通过 AI 搜索获取精准客户的中小企业、招商团队和品牌营销负责人",
          "businessScene": "GEO答案营销、AI搜索优化、企业AI知识库搭建、Agent智能客服",
          "products": "向量增长 AI Claw 3.0、GEO答案营销服务、A2P创意营销、Agent多模态平台",
          "sellingPoints": "GEO + Agent 双引擎；覆盖主流 AI 搜索渠道；知识库、内容生成、数据看板一体化",
          "customerPainPoints": "AI搜索结果中品牌不可见、竞品占位高、内容分发效率低、销售话术不统一",
          "keywords": "GEO优化公司、AI搜索优化、企业AI营销、答案营销、AI知识库",
          "tone": "专业、可信、直接，强调结果、案例和落地能力",
          "forbidden": "不得承诺绝对排名；不得虚构客户案例；涉及报价需引导联系销售确认",
          "remark": "默认画像用于 GEO 知识库内容生成、答案营销和 Agent 引用。"
        }
      }
    ]
  },
  "pagination": {
    "total": 1,
    "pageSize": 15,
    "current": 1
  },
  "dialog": {
    "addTitle": "添加画像",
    "editTitle": "编辑画像",
    "fields": [
      { "key": "name", "label": "画像名称", "required": true, "placeholder": "请输入画像名称" },
      { "key": "source", "label": "来源", "type": "select", "options": ["默认", "自定义", "复制", "导入"], "defaultValue": "自定义" },
      { "key": "industry", "label": "所属行业", "placeholder": "请输入行业" },
      { "key": "audience", "label": "目标人群", "placeholder": "请输入目标人群" },
      { "key": "businessScene", "label": "业务场景", "type": "textarea", "rows": 3 },
      { "key": "products", "label": "主营产品/服务", "type": "textarea", "rows": 3 },
      { "key": "sellingPoints", "label": "核心卖点", "type": "textarea", "rows": 3 },
      { "key": "customerPainPoints", "label": "客户痛点", "type": "textarea", "rows": 3 },
      { "key": "keywords", "label": "搜索关键词", "type": "textarea", "rows": 3 },
      { "key": "tone", "label": "表达语气" },
      { "key": "forbidden", "label": "禁用口径", "type": "textarea", "rows": 3 },
      { "key": "remark", "label": "备注", "type": "textarea", "rows": 3 }
    ]
  }
}
```

建议后端提供画像 CRUD：

## GET `/api/knowledge/geo/profiles`

查询参数：`page`, `pageSize`, `keyword`。

响应结构同 `geo-profile-settings.table` + `pagination`。

## POST `/api/knowledge/geo/profiles`

请求：

```json
{
  "name": "深圳市道格拉斯科技有限公司",
  "source": "默认",
  "industry": "企业AI营销 / GEO优化服务",
  "audience": "需要通过 AI 搜索获取精准客户的中小企业、招商团队和品牌营销负责人",
  "businessScene": "GEO答案营销、AI搜索优化、企业AI知识库搭建、Agent智能客服",
  "products": "向量增长 AI Claw 3.0、GEO答案营销服务、A2P创意营销、Agent多模态平台",
  "sellingPoints": "GEO + Agent 双引擎；覆盖主流 AI 搜索渠道；知识库、内容生成、数据看板一体化",
  "customerPainPoints": "AI搜索结果中品牌不可见、竞品占位高、内容分发效率低、销售话术不统一",
  "keywords": "GEO优化公司、AI搜索优化、企业AI营销、答案营销、AI知识库",
  "tone": "专业、可信、直接，强调结果、案例和落地能力",
  "forbidden": "不得承诺绝对排名；不得虚构客户案例；涉及报价需引导联系销售确认",
  "remark": "默认画像用于 GEO 知识库内容生成、答案营销和 Agent 引用。"
}
```

## PUT `/api/knowledge/geo/profiles/:id`

请求结构同新增。

## DELETE `/api/knowledge/geo/profiles/:id`

响应：

```json
{ "success": true }
```

### 知识库：图片上传 `geo-image-upload`

`kind` 为 `knowledge-image-upload` 时，前端渲染图片库列表；点击 `添加图片` 或 `编辑` 后打开弹窗，在弹窗内维护图片库名称和多张图片。

```json
{
  "kind": "knowledge-image-upload",
  "title": "图片上传",
  "addButtonText": "添加图片",
  "table": {
    "columns": [
      { "key": "index", "label": "序号" },
      { "key": "name", "label": "名称" },
      { "key": "imageCount", "label": "图片" },
      { "key": "time", "label": "时间" },
      { "key": "actions", "label": "操作" }
    ]
  },
  "dialog": {
    "addTitle": "添加图片",
    "editTitle": "编辑图片"
  },
  "libraries": [
    {
      "id": "image-lib-1",
      "index": 1,
      "name": "AI玩具",
      "imageCount": 5,
      "time": "2026-06-01 16:25",
      "images": [
        {
          "id": "toy-1",
          "name": "AI玩具-1.png",
          "size": "0.38MB",
          "url": "https://cdn.example.com/images/toy-1.png"
        }
      ]
    }
  ],
  "pagination": {
    "total": 12,
    "pageSize": 15,
    "current": 1
  }
}
```

建议后端提供图片库接口：

## GET `/api/knowledge/geo/image-libraries`

查询参数：`page`, `pageSize`, `keyword`。

响应：

```json
{
  "libraries": [
    {
      "id": "image-lib-1",
      "index": 1,
      "name": "AI玩具",
      "imageCount": 5,
      "time": "2026-06-01 16:25",
      "images": [
        {
          "id": "toy-1",
          "name": "AI玩具-1.png",
          "size": "0.38MB",
          "url": "https://cdn.example.com/images/toy-1.png"
        }
      ]
    }
  ],
  "pagination": {
    "total": 12,
    "pageSize": 15,
    "current": 1
  }
}
```

## POST `/api/knowledge/geo/image-libraries`

使用 `multipart/form-data` 创建图片库。

字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 图片库名称 |
| `files` | File[] | 图片文件，可多选，单张不超过 2MB |

响应：

```json
{
  "success": true,
  "library": {
    "id": "image-lib-1001",
    "name": "AI玩具",
    "imageCount": 5,
    "time": "2026-06-30 19:10"
  }
}
```

## PUT `/api/knowledge/geo/image-libraries/:id`

使用 `multipart/form-data` 更新图片库。前端弹窗保存时提交完整图片库信息。

字段同新增：`name`, `files`。如果后端需要保留旧图片，建议额外接收 `keepImageIds: string[]`。

## DELETE `/api/knowledge/geo/image-libraries/:id`

响应：

```json
{ "success": true }
```

## GET `/api/products/:id`

返回产品详情弹层内容。

```json
{
  "id": "claw-3",
  "title": "向量增长 AI Claw 3.0",
  "description": "面向企业营销增长的 GEO + Agent 双引擎平台。",
  "features": ["AI知识库", "GEO答案营销", "A2P创意营销"]
}
```

## POST `/api/assistant/search`

搜索框提交任务需求。后端可以返回智能问答、知识库检索或 Agent 执行结果。

请求：

```json
{ "query": "帮我生成一条短视频营销方案" }
```

响应：

```json
{
  "query": "帮我生成一条短视频营销方案",
  "answer": "后端返回的检索、问答或 Agent 执行结果"
}
```
