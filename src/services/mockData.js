export const userProfile = {
  id: '50083969',
  username: 'szdglskj',
  displayName: '演示账号',
  computeBalance: 27643,
  locale: 'zh-CN'
};

export const navigation = [
  { key: 'home', label: '首页', icon: 'home', overviewKey: 'home', children: [] },
  {
    key: 'knowledge',
    label: '知识库',
    icon: 'knowledge',
    drawerType: 'knowledge-admin',
    overviewKey: 'geo-basic-info',
    children: [],
    groups: [
      {
        key: 'geo-knowledge',
        label: 'GEO 知识库',
        icon: 'image',
        children: [
          { key: 'geo-basic-info', label: '基础信息', icon: 'package' },
          { key: 'geo-profile-settings', label: '画像设置', icon: 'userCog' },
          { key: 'geo-image-upload', label: '图片上传', icon: 'image' },
          { key: 'geo-video-upload', label: '视频上传', icon: 'videoFile' },
          { key: 'geo-scene-words', label: '设置场景词', icon: 'chat' }
        ]
      },
      {
        key: 'agent-knowledge',
        label: 'Agent 知识库',
        icon: 'folder',
        children: [
          { key: 'agent-card-settings', label: '官网&名片设置', icon: 'package' },
          { key: 'agent-staff-settings', label: '数字员工设置', icon: 'user' }
        ]
      },
      {
        key: 'claw-auth',
        label: 'Claw 授权',
        icon: 'user',
        children: [
          { key: 'claw-media-auth', label: '自媒体授权', icon: 'publish' },
          { key: 'claw-new-media-auth', label: '新媒体授权', icon: 'publish' }
        ]
      }
    ]
  },
  {
    key: 'geo',
    label: 'GEO',
    icon: 'geo',
    overviewKey: 'geo-overview',
    children: [
      { key: 'geo-answer', label: '答案营销', icon: 'chat' },
      { key: 'geo-rank', label: '渠道排名', icon: 'board' },
      { key: 'geo-report', label: '投放报告', icon: 'package' }
    ]
  },
  {
    key: 'a2p',
    label: 'A2P',
    icon: 'a2p',
    overviewKey: 'a2p-overview',
    children: [
      { key: 'creative-video', label: '创意视频', icon: 'video' },
      { key: 'short-drama', label: 'AI短剧', icon: 'short' },
      { key: 'a2p-publish', label: 'A2P发布', icon: 'publish' },
      { key: 'free-traffic', label: '免费流量扶持', icon: 'traffic' }
    ]
  },
  {
    key: 'agent',
    label: 'Agent',
    icon: 'agent',
    overviewKey: 'agent-overview',
    children: [
      { key: 'agent-flow', label: '多模态编排', icon: 'agent' },
      { key: 'agent-tool', label: '工具调用', icon: 'package' },
      { key: 'agent-log', label: '执行日志', icon: 'board' }
    ]
  },
  {
    key: 'dashboard',
    label: '看板',
    icon: 'dashboard',
    overviewKey: 'dashboard-overview',
    children: [
      { key: 'dashboard-data', label: '数据洞察', icon: 'board' },
      { key: 'dashboard-clue', label: '线索分析', icon: 'chat' },
      { key: 'dashboard-asset', label: '资产概览', icon: 'package' }
    ]
  }
];

export const homeConfig = {
  subtitle: 'GEO + Agent 双引擎',
  platforms: ['豆包', 'DeepSeek', 'Kimi', '通义', '星火', '抖音', '百度', '微信', '小红书', '快手', '腾讯', '淘宝', '知乎'],
  products: [
    { id: 'kb', moduleKey: 'knowledge', pageKey: 'geo-basic-info', name: 'AI知识库', enName: 'AI Knowledge Base' },
    { id: 'geo', moduleKey: 'geo', pageKey: 'geo-overview', name: 'GEO答案营销', enName: 'GEO Answer Marketing' },
    { id: 'a2p', moduleKey: 'a2p', pageKey: 'a2p-overview', name: 'A2P创意营销', enName: 'AI to Performance' },
    { id: 'agent', moduleKey: 'agent', pageKey: 'agent-overview', name: 'Agent多模态', enName: 'Agent Multimodal' },
    { id: 'dashboard', moduleKey: 'dashboard', pageKey: 'dashboard-overview', name: 'Claw数据看板', enName: 'Claw Data Dashboard' }
  ]
};

export const productDetail = {
  id: 'claw-3',
  title: '向量增长 AI Claw 3.0',
  description: '面向企业营销增长的 GEO + Agent 双引擎平台，覆盖知识库、答案营销、创意生成、多模态 Agent 与数据看板。',
  features: ['AI知识库', 'GEO答案营销', 'A2P创意营销', 'Agent多模态', 'Claw数据看板']
};

function makePage({
  title,
  eyebrow,
  description,
  actions,
  metrics,
  primaryTitle,
  primaryItems,
  secondaryTitle,
  secondaryItems,
  tableTitle,
  columns,
  rows
}) {
  return {
    title,
    eyebrow,
    description,
    actions,
    metrics,
    primary: { title: primaryTitle, cta: '新建', items: primaryItems },
    secondary: { title: secondaryTitle, items: secondaryItems },
    table: { title: tableTitle, columns, rows }
  };
}

const defaultActions = [
  { label: '新建任务', icon: 'plus' },
  { label: '批量导入', icon: 'publish' },
  { label: '运行演示', icon: 'play' }
];

const commonColumns = ['名称', '负责人', '状态', '更新时间'];

export const pageData = {
  'data-insight': {
    kind: 'data-insight',
    title: '数据洞察',
    scenes: [
      { key: 'search-word', label: '搜索词场景' },
      { key: 'qa-word', label: '问答词场景' },
      { key: 'brand', label: '品牌场景' }
    ],
    defaultKeyword: '挖掘机',
    keywordPlaceholder: '请输入关键词',
    industries: ['制造业', '机械设备', '企业服务', '教育培训', '医疗健康', '房地产', '本地生活'],
    actions: ['索鲲', '数据挖掘']
  },
  'geo-basic-info': {
    kind: 'knowledge-basic-info',
    title: '基础信息',
    description: '维护 GEO 知识库的企业基础资料，供画像、内容生成和答案营销统一调用。',
    fields: [
      { key: 'companyName', label: '企业名称', value: '深圳市道格拉斯科技有限公司' },
      { key: 'shortName', label: '品牌简称', value: '道格拉斯科技' },
      { key: 'industry', label: '所属行业', value: '企业AI营销 / GEO优化服务' },
      { key: 'website', label: '官方网站', value: 'https://www.vector-growth.ai' },
      { key: 'contact', label: '联系人', value: '刘静' },
      { key: 'phone', label: '联系电话', value: '13928477610' },
      { key: 'address', label: '企业地址', value: '广东省深圳市南山区科技园' },
      { key: 'slogan', label: '品牌主张', value: 'GEO + Agent 双引擎，帮助企业抢占 AI 搜索答案入口。' },
      {
        key: 'profile',
        label: '企业简介',
        type: 'textarea',
        value: '向量增长 AI Claw 3.0 面向企业营销增长，提供 AI 知识库、GEO答案营销、A2P创意营销、Agent多模态和数据看板能力。'
      }
    ],
    tags: ['GEO优化', 'AI营销', 'Agent', '知识库', '答案营销']
  },
  'geo-profile-settings': {
    kind: 'knowledge-profile-settings',
    title: '画像设置',
    addButtonText: '添加画像',
    table: {
      columns: [
        { key: 'index', label: '序号' },
        { key: 'name', label: '名称' },
        { key: 'time', label: '时间' },
        { key: 'source', label: '来源' },
        { key: 'actions', label: '操作' }
      ],
      rows: [
        {
          id: 'profile-1',
          index: 1,
          name: '深圳市道格拉斯科技有限公司',
          time: '2026-06-12 12:52',
          source: '默认',
          actions: ['复制', '编辑', '删除'],
          details: {
            name: '深圳市道格拉斯科技有限公司',
            source: '默认',
            industry: '企业AI营销 / GEO优化服务',
            audience: '需要通过 AI 搜索获取精准客户的中小企业、招商团队和品牌营销负责人',
            businessScene: 'GEO答案营销、AI搜索优化、企业AI知识库搭建、Agent智能客服',
            products: '向量增长 AI Claw 3.0、GEO答案营销服务、A2P创意营销、Agent多模态平台',
            sellingPoints: 'GEO + Agent 双引擎；覆盖主流 AI 搜索渠道；知识库、内容生成、数据看板一体化',
            customerPainPoints: 'AI搜索结果中品牌不可见、竞品占位高、内容分发效率低、销售话术不统一',
            keywords: 'GEO优化公司、AI搜索优化、企业AI营销、答案营销、AI知识库',
            tone: '专业、可信、直接，强调结果、案例和落地能力',
            forbidden: '不得承诺绝对排名；不得虚构客户案例；涉及报价需引导联系销售确认',
            remark: '默认画像用于 GEO 知识库内容生成、答案营销和 Agent 引用。'
          }
        }
      ]
    },
    pagination: {
      total: 1,
      pageSize: 15,
      current: 1
    },
    dialog: {
      addTitle: '添加画像',
      editTitle: '编辑画像',
      fields: [
        { key: 'name', label: '画像名称', required: true, placeholder: '请输入画像名称' },
        { key: 'source', label: '来源', type: 'select', options: ['默认', '自定义', '复制', '导入'], defaultValue: '自定义' },
        { key: 'industry', label: '所属行业', placeholder: '请输入行业' },
        { key: 'audience', label: '目标人群', placeholder: '请输入目标人群' },
        { key: 'businessScene', label: '业务场景', type: 'textarea', rows: 3, placeholder: '请输入画像适用的业务场景' },
        { key: 'products', label: '主营产品/服务', type: 'textarea', rows: 3, placeholder: '请输入主营产品或服务' },
        { key: 'sellingPoints', label: '核心卖点', type: 'textarea', rows: 3, placeholder: '请输入核心卖点' },
        { key: 'customerPainPoints', label: '客户痛点', type: 'textarea', rows: 3, placeholder: '请输入客户痛点' },
        { key: 'keywords', label: '搜索关键词', type: 'textarea', rows: 3, placeholder: '多个关键词可用顿号或逗号分隔' },
        { key: 'tone', label: '表达语气', placeholder: '例如：专业、可信、直接' },
        { key: 'forbidden', label: '禁用口径', type: 'textarea', rows: 3, placeholder: '请输入不能使用的说法或合规限制' },
        { key: 'remark', label: '备注', type: 'textarea', rows: 3, placeholder: '请输入备注' }
      ]
    }
  },
  'geo-image-upload': {
    kind: 'knowledge-image-upload',
    title: '图片上传',
    addButtonText: '添加图片',
    table: {
      columns: [
        { key: 'index', label: '序号' },
        { key: 'name', label: '名称' },
        { key: 'imageCount', label: '图片' },
        { key: 'time', label: '时间' },
        { key: 'actions', label: '操作' }
      ]
    },
    dialog: {
      addTitle: '添加图片',
      editTitle: '编辑图片'
    },
    libraries: [
      {
        id: 'image-lib-1',
        index: 1,
        name: 'AI玩具',
        imageCount: 5,
        time: '2026-06-01 16:25',
        images: makeToyImages('AI玩具', 5)
      },
      {
        id: 'image-lib-2',
        index: 2,
        name: '卡片防丢器',
        imageCount: 6,
        time: '2025-10-20 14:08',
        images: makeToyImages('卡片防丢器', 6)
      },
      {
        id: 'image-lib-3',
        index: 3,
        name: '防丢器',
        imageCount: 8,
        time: '2025-10-20 14:07',
        images: makeToyImages('防丢器', 8)
      },
      { id: 'image-lib-4', index: 4, name: '无线充音箱系列', imageCount: 8, time: '2025-09-08 13:24', images: makeToyImages('无线充音箱系列', 8) },
      { id: 'image-lib-5', index: 5, name: '水杯音箱系列', imageCount: 4, time: '2025-09-08 13:19', images: makeToyImages('水杯音箱系列', 4) },
      { id: 'image-lib-6', index: 6, name: '耳机音箱', imageCount: 8, time: '2025-09-08 13:16', images: makeToyImages('耳机音箱', 8) },
      { id: 'image-lib-7', index: 7, name: '多功能支架音箱', imageCount: 8, time: '2025-09-08 13:10', images: makeToyImages('多功能支架音箱', 8) },
      { id: 'image-lib-8', index: 8, name: 'AI音箱系列', imageCount: 11, time: '2026-06-01 16:27', images: makeToyImages('AI音箱系列', 11) },
      { id: 'image-lib-9', index: 9, name: '白噪音音箱系列', imageCount: 9, time: '2025-09-08 12:42', images: makeToyImages('白噪音音箱系列', 9) },
      { id: 'image-lib-10', index: 10, name: '白噪音音箱系列H22', imageCount: 9, time: '2025-09-08 12:39', images: makeToyImages('白噪音音箱系列H22', 9) },
      { id: 'image-lib-11', index: 11, name: '白噪音音箱系列-H10白底图', imageCount: 6, time: '2025-09-08 12:35', images: makeToyImages('白噪音音箱系列-H10白底图', 6) },
      { id: 'image-lib-12', index: 12, name: '白噪音音箱系列-H9 高清图', imageCount: 24, time: '2025-09-08 12:34', images: makeToyImages('白噪音音箱系列-H9 高清图', 12) }
    ],
    pagination: {
      total: 12,
      pageSize: 15,
      current: 1
    }
  },
  'geo-video-upload': makeKnowledgePlaceholder('视频上传', '用于上传企业宣传片、案例视频和口播素材。当前阶段先完成基础信息与画像设置。'),
  'geo-scene-words': makeKnowledgePlaceholder('设置场景词', '用于维护行业场景、客户痛点、搜索词和营销话术标签。当前阶段先完成基础信息与画像设置。'),
  'agent-card-settings': makeKnowledgePlaceholder('官网&名片设置', '用于配置 Agent 可引用的官网信息、企业名片和对外介绍。当前阶段先完成 GEO 知识库基础信息与画像设置。'),
  'agent-staff-settings': makeKnowledgePlaceholder('数字员工设置', '用于配置数字员工身份、头像、职责和回复边界。当前阶段先完成 GEO 知识库基础信息与画像设置。'),
  'claw-media-auth': makeKnowledgePlaceholder('自媒体授权', '用于管理抖音、视频号、小红书等自媒体账号授权。当前阶段先完成 GEO 知识库基础信息与画像设置。'),
  'claw-new-media-auth': makeKnowledgePlaceholder('新媒体授权', '用于管理新闻媒体、公众号和内容分发渠道授权。当前阶段先完成 GEO 知识库基础信息与画像设置。'),
  'knowledge-overview': makePage({
    eyebrow: 'AI Knowledge Base',
    title: 'AI知识库总览',
    description: '统一管理企业资料、问答语料和知识体，让 GEO 与 Agent 调用同一套可信内容。',
    actions: defaultActions,
    metrics: [
      { label: '知识文件', value: '1,286', trend: '+86 本周' },
      { label: '问答命中率', value: '92.4%', trend: '+4.1%' },
      { label: '待审核素材', value: '37', trend: '12 个高优先级' },
      { label: '知识体', value: '18', trend: '5 个运行中' }
    ],
    primaryTitle: '推荐能力',
    primaryItems: [
      { title: '资料结构化', text: '自动解析 PDF、网页、表格和产品手册，生成可检索知识块。', tag: '解析中' },
      { title: '问答校准', text: '基于企业口径修正答案，保留引用来源和审核记录。', tag: '高频' },
      { title: '知识体发布', text: '将资料、角色、工具和回复规范组合成可复用知识体。', tag: '可发布' }
    ],
    secondaryTitle: '知识健康度',
    secondaryItems: [
      { label: '内容完整度', value: '88%', percent: '88%' },
      { label: '引用覆盖率', value: '76%', percent: '76%' },
      { label: '冲突语料', value: '9 条', percent: '34%' }
    ],
    tableTitle: '最近知识资产',
    columns: commonColumns,
    rows: [
      { id: 'kb1', 名称: '向量增长 AI产品白皮书', 负责人: '刘静', 状态: '已索引', 更新时间: '2026-06-30 17:20' },
      { id: 'kb2', 名称: 'GEO招商话术库', 负责人: '市场部', 状态: '审核中', 更新时间: '2026-06-30 15:42' },
      { id: 'kb3', 名称: '客户案例合集', 负责人: '运营组', 状态: '待补充', 更新时间: '2026-06-29 19:05' }
    ]
  }),
  'kb-document': makePage({
    eyebrow: 'Document Library',
    title: '资料库',
    description: '沉淀企业文档、产品资料、案例和网页内容，支持分组、标签、版本和索引状态管理。',
    actions: defaultActions,
    metrics: [
      { label: '文档总数', value: '1,286', trend: '+42 今日' },
      { label: '已完成索引', value: '1,132', trend: '88.0%' },
      { label: '失效链接', value: '13', trend: '需处理' },
      { label: '存储占用', value: '48.6GB', trend: '+2.1GB' }
    ],
    primaryTitle: '资料处理队列',
    primaryItems: [
      { title: 'PDF 产品册', text: '自动抽取目录、图片说明、FAQ 和关键卖点。', tag: '96 份' },
      { title: '官网页面', text: '按栏目抓取网页正文，识别重复内容和过期信息。', tag: '218 页' },
      { title: '销售素材', text: '归档话术、案例、报价口径和演示脚本。', tag: '43 组' }
    ],
    secondaryTitle: '索引进度',
    secondaryItems: [
      { label: '文本解析', value: '94%', percent: '94%' },
      { label: '向量入库', value: '87%', percent: '87%' },
      { label: '人工审核', value: '61%', percent: '61%' }
    ],
    tableTitle: '资料列表',
    columns: commonColumns,
    rows: [
      { id: 'doc1', 名称: 'Claw3.0功能清单.xlsx', 负责人: '产品组', 状态: '已发布', 更新时间: '2026-06-30 16:44' },
      { id: 'doc2', 名称: 'GEO优化服务手册.pdf', 负责人: '交付组', 状态: '索引中', 更新时间: '2026-06-30 13:18' },
      { id: 'doc3', 名称: '行业客户案例库', 负责人: '运营组', 状态: '待审核', 更新时间: '2026-06-29 21:08' }
    ]
  }),
  'kb-qa': makePage({
    eyebrow: 'AI Q&A',
    title: 'AI问答',
    description: '面向客户、销售和运营人员的企业级问答入口，支持引用溯源、答案评分和人工纠偏。',
    actions: defaultActions,
    metrics: [
      { label: '今日提问', value: '3,482', trend: '+18%' },
      { label: '平均响应', value: '1.2s', trend: '-0.3s' },
      { label: '满意度', value: '96.1%', trend: '+2.4%' },
      { label: '人工介入', value: '21', trend: '-7' }
    ],
    primaryTitle: '问答场景',
    primaryItems: [
      { title: '产品咨询', text: '围绕功能、价格、部署和案例自动生成标准回复。', tag: '在线' },
      { title: '销售助理', text: '根据客户行业和阶段推荐下一步跟进话术。', tag: '热门' },
      { title: '内部知识问答', text: '帮助团队快速查找制度、流程和产品材料。', tag: '内测' }
    ],
    secondaryTitle: '问答质量',
    secondaryItems: [
      { label: '引用准确率', value: '93%', percent: '93%' },
      { label: '低分答案', value: '17 条', percent: '22%' },
      { label: '人工修订', value: '41%', percent: '41%' }
    ],
    tableTitle: '最近问答',
    columns: ['问题', '来源', '状态', '更新时间'],
    rows: [
      { id: 'qa1', 问题: 'GEO优化多久能看到效果？', 来源: '官网客服', 状态: '已回答', 更新时间: '2026-06-30 18:02' },
      { id: 'qa2', 问题: '是否支持接入企业微信？', 来源: '销售助手', 状态: '需审核', 更新时间: '2026-06-30 17:33' },
      { id: 'qa3', 问题: 'A2P发布支持哪些平台？', 来源: '客户群', 状态: '已纠偏', 更新时间: '2026-06-30 16:51' }
    ]
  }),
  'kb-agent': makePage({
    eyebrow: 'Knowledge Agent',
    title: '知识体配置',
    description: '配置知识体角色、可访问资料、回复边界和工具权限，供客服、销售、内容生成等场景复用。',
    actions: defaultActions,
    metrics: [
      { label: '知识体数量', value: '18', trend: '+2 本周' },
      { label: '在线知识体', value: '12', trend: '稳定' },
      { label: '平均评分', value: '4.8', trend: '+0.2' },
      { label: '调用次数', value: '26.4k', trend: '+31%' }
    ],
    primaryTitle: '配置模块',
    primaryItems: [
      { title: '角色设定', text: '定义身份、语气、任务边界和禁止回答范围。', tag: '必填' },
      { title: '知识范围', text: '绑定资料库、FAQ 和外部数据源。', tag: '已绑定' },
      { title: '工具权限', text: '控制搜索、生成、发布、CRM 查询等工具调用。', tag: '安全' }
    ],
    secondaryTitle: '发布检查',
    secondaryItems: [
      { label: '资料绑定', value: '100%', percent: '100%' },
      { label: '安全测试', value: '82%', percent: '82%' },
      { label: '灰度流量', value: '25%', percent: '25%' }
    ],
    tableTitle: '知识体列表',
    columns: commonColumns,
    rows: [
      { id: 'ag1', 名称: 'GEO顾问知识体', 负责人: '刘静', 状态: '运行中', 更新时间: '2026-06-30 14:08' },
      { id: 'ag2', 名称: '招商客服知识体', 负责人: '客服组', 状态: '灰度', 更新时间: '2026-06-30 11:26' },
      { id: 'ag3', 名称: '投放复盘知识体', 负责人: '数据组', 状态: '配置中', 更新时间: '2026-06-29 18:12' }
    ]
  }),
  'geo-overview': makeGeoPage('GEO总览', '管理 AI 搜索答案占位、品牌提及、渠道排名和投放报告，形成可追踪的答案营销闭环。'),
  'geo-answer': makeGeoPage('答案营销', '围绕品牌、产品和服务关键词生成标准答案，并推送到可影响 AI 搜索结果的内容渠道。'),
  'geo-rank': makeGeoPage('渠道排名', '监控豆包、DeepSeek、Kimi、百度、微信等渠道的品牌可见度、答案引用和竞品位置。'),
  'geo-report': makeGeoPage('投放报告', '汇总投放动作、关键词覆盖、线索转化和内容贡献，生成客户可读的交付报告。'),
  'a2p-overview': makeA2pPage('A2P创意营销总览', '从企业知识和增长目标出发，生成短视频、短剧脚本、素材包和多平台发布计划。'),
  'creative-video': makeA2pPage('创意视频', '批量生成视频脚本、分镜、口播文案和素材建议，支撑抖音、小红书、视频号投放。'),
  'short-drama': makeA2pPage('AI短剧', '根据行业痛点和产品卖点生成连续短剧情节、人物设定、台词和转化钩子。'),
  'a2p-publish': makeA2pPage('A2P发布', '连接多平台账号，统一安排发布计划、封面标题、话题标签和效果回收。'),
  'free-traffic': makeA2pPage('免费流量扶持', '跟踪免费流量任务、达人协作、活动权益和内容扶持进度。'),
  'agent-overview': makeAgentPage('Agent多模态总览', '编排文本、图片、视频、网页和业务工具，让 Agent 自动完成跨系统任务。'),
  'agent-flow': makeAgentPage('多模态编排', '用可视化流程组织模型、知识库、工具和审核节点，构建企业专属 Agent。'),
  'agent-tool': makeAgentPage('工具调用', '管理搜索、CRM、素材库、发布平台和数据查询工具的授权、限流和日志。'),
  'agent-log': makeAgentPage('执行日志', '查看 Agent 每一步输入、输出、工具调用、消耗和失败原因，便于审计与调优。'),
  'dashboard-overview': makeDashboardPage('Claw数据看板总览', '统一呈现 GEO、A2P、Agent 和知识库的运行状态、消耗、线索和交付进展。'),
  'dashboard-data': makeDashboardPage('数据洞察', '整合投放、问答、内容、线索和算力消耗数据，识别增长机会与异常波动。'),
  'dashboard-clue': makeDashboardPage('线索分析', '按来源、行业、阶段和意向强度拆解线索，帮助销售优先跟进高价值客户。'),
  'dashboard-asset': makeDashboardPage('资产概览', '统计资料、内容、视频、知识体、Agent 流程和发布账号等企业 AI 资产。')
};

function makeToyImages(prefix, count) {
  const colors = ['f3edff', 'eef8ff', 'fff2ec', 'f1fff7', 'fff7d8', 'f4f6ff'];
  return Array.from({ length: count }, (_, index) => {
    const bg = colors[index % colors.length];
    const accent = index % 3 === 0 ? '6b27f5' : index % 3 === 1 ? '38bdf8' : 'fb7185';
    const label = encodeURIComponent(`${prefix}-${index + 1}`);
    return {
      id: `${prefix}-${index + 1}`,
      name: `${prefix}-${index + 1}.png`,
      size: `${(0.38 + index * 0.13).toFixed(2)}MB`,
      url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120" viewBox="0 0 180 120"><rect width="180" height="120" rx="8" fill="%23${bg}"/><circle cx="90" cy="48" r="24" fill="%23${accent}" opacity=".28"/><rect x="54" y="38" width="72" height="44" rx="10" fill="%23${accent}" opacity=".72"/><circle cx="76" cy="56" r="5" fill="%23fff"/><circle cx="104" cy="56" r="5" fill="%23fff"/><path d="M75 70 Q90 80 105 70" fill="none" stroke="%23fff" stroke-width="4" stroke-linecap="round"/><text x="18" y="106" font-size="12" font-family="Arial" fill="%23311044">${label}</text></svg>`
    };
  });
}

function makeKnowledgePlaceholder(title, description) {
  return {
    kind: 'knowledge-placeholder',
    title,
    description
  };
}

function makeGeoPage(title, description) {
  return makePage({
    eyebrow: 'GEO Answer Marketing',
    title,
    description,
    actions: defaultActions,
    metrics: [
      { label: '关键词覆盖', value: '428', trend: '+31' },
      { label: '品牌提及率', value: '68.7%', trend: '+7.6%' },
      { label: 'TOP3答案', value: '126', trend: '+18' },
      { label: '转化线索', value: '842', trend: '+22%' }
    ],
    primaryTitle: 'GEO任务',
    primaryItems: [
      { title: '答案生成', text: '基于企业知识库生成可引用、可审校的品牌标准答案。', tag: '进行中' },
      { title: '渠道铺排', text: '将内容分发到官网、公众号、百科、问答和行业媒体。', tag: '多渠道' },
      { title: '竞品监控', text: '追踪竞品在 AI 搜索答案中的占位和话术变化。', tag: '实时' }
    ],
    secondaryTitle: '渠道表现',
    secondaryItems: [
      { label: '豆包', value: '72%', percent: '72%' },
      { label: 'DeepSeek', value: '64%', percent: '64%' },
      { label: '百度AI', value: '58%', percent: '58%' }
    ],
    tableTitle: '关键词任务',
    columns: ['关键词', '渠道', '状态', '更新时间'],
    rows: [
      { id: 'geo1', 关键词: 'GEO优化公司', 渠道: '豆包', 状态: 'TOP3', 更新时间: '2026-06-30 17:10' },
      { id: 'geo2', 关键词: 'AI搜索优化', 渠道: 'DeepSeek', 状态: '提升中', 更新时间: '2026-06-30 16:28' },
      { id: 'geo3', 关键词: '企业AI营销', 渠道: 'Kimi', 状态: '已覆盖', 更新时间: '2026-06-29 22:14' }
    ]
  });
}

function makeA2pPage(title, description) {
  return makePage({
    eyebrow: 'AI to Performance',
    title,
    description,
    actions: defaultActions,
    metrics: [
      { label: '创意任务', value: '246', trend: '+39' },
      { label: '生成素材', value: '1,904', trend: '+18%' },
      { label: '发布账号', value: '32', trend: '12 在线' },
      { label: '预计曝光', value: '86.2w', trend: '+24%' }
    ],
    primaryTitle: '创意生产线',
    primaryItems: [
      { title: '脚本生成', text: '按产品、行业、目标人群生成短视频脚本和分镜。', tag: '批量' },
      { title: '素材装配', text: '自动匹配口播、字幕、封面、BGM 和产品画面。', tag: '智能' },
      { title: '平台发布', text: '适配抖音、小红书、视频号等平台格式和标题标签。', tag: '待排期' }
    ],
    secondaryTitle: '内容漏斗',
    secondaryItems: [
      { label: '脚本通过', value: '81%', percent: '81%' },
      { label: '成片完成', value: '67%', percent: '67%' },
      { label: '发布执行', value: '52%', percent: '52%' }
    ],
    tableTitle: '创意任务',
    columns: ['名称', '平台', '状态', '更新时间'],
    rows: [
      { id: 'a2p1', 名称: 'GEO招商短视频', 平台: '抖音', 状态: '待发布', 更新时间: '2026-06-30 17:48' },
      { id: 'a2p2', 名称: 'AI搜索优化短剧', 平台: '小红书', 状态: '脚本审核', 更新时间: '2026-06-30 14:30' },
      { id: 'a2p3', 名称: '客户案例口播', 平台: '视频号', 状态: '已成片', 更新时间: '2026-06-29 20:16' }
    ]
  });
}

function makeAgentPage(title, description) {
  return makePage({
    eyebrow: 'Agent Multimodal',
    title,
    description,
    actions: defaultActions,
    metrics: [
      { label: 'Agent流程', value: '54', trend: '+6' },
      { label: '今日执行', value: '8,426', trend: '+16%' },
      { label: '成功率', value: '97.2%', trend: '+1.8%' },
      { label: '平均耗时', value: '12.4s', trend: '-2.1s' }
    ],
    primaryTitle: 'Agent能力',
    primaryItems: [
      { title: '多模态理解', text: '解析文本、图片、视频和网页内容，生成结构化任务上下文。', tag: '运行中' },
      { title: '工具编排', text: '按权限调用知识库、CRM、发布平台和数据接口。', tag: '可控' },
      { title: '人工审核', text: '关键节点可暂停确认，保留完整执行记录。', tag: '审计' }
    ],
    secondaryTitle: '执行状态',
    secondaryItems: [
      { label: '自动完成', value: '74%', percent: '74%' },
      { label: '等待审核', value: '18%', percent: '18%' },
      { label: '异常重试', value: '8%', percent: '8%' }
    ],
    tableTitle: 'Agent运行记录',
    columns: ['名称', '负责人', '状态', '更新时间'],
    rows: [
      { id: 'agent1', 名称: '线索跟进Agent', 负责人: '销售组', 状态: '运行中', 更新时间: '2026-06-30 18:05' },
      { id: 'agent2', 名称: '内容分发Agent', 负责人: '运营组', 状态: '等待审核', 更新时间: '2026-06-30 17:22' },
      { id: 'agent3', 名称: '投放复盘Agent', 负责人: '数据组', 状态: '已完成', 更新时间: '2026-06-30 15:17' }
    ]
  });
}

function makeDashboardPage(title, description) {
  return makePage({
    eyebrow: 'Claw Data Dashboard',
    title,
    description,
    actions: defaultActions,
    metrics: [
      { label: '今日访问', value: '42,681', trend: '+12%' },
      { label: '新增线索', value: '386', trend: '+54' },
      { label: '算力消耗', value: '2,314', trend: '-8%' },
      { label: '交付进度', value: '83%', trend: '+6%' }
    ],
    primaryTitle: '核心洞察',
    primaryItems: [
      { title: '增长机会', text: 'GEO关键词“AI搜索优化”线索质量高，建议追加内容铺排。', tag: '高价值' },
      { title: '异常提醒', text: '小红书发布队列有 4 条内容审核超时，需要运营处理。', tag: '待处理' },
      { title: '算力建议', text: 'Agent高峰期集中在 14:00-17:00，可调整批处理时间。', tag: '优化' }
    ],
    secondaryTitle: '业务占比',
    secondaryItems: [
      { label: 'GEO', value: '43%', percent: '43%' },
      { label: 'A2P', value: '34%', percent: '34%' },
      { label: 'Agent', value: '23%', percent: '23%' }
    ],
    tableTitle: '数据事件',
    columns: ['名称', '来源', '状态', '更新时间'],
    rows: [
      { id: 'dash1', 名称: 'GEO线索上涨', 来源: '答案营销', 状态: '已确认', 更新时间: '2026-06-30 18:11' },
      { id: 'dash2', 名称: '发布任务积压', 来源: 'A2P发布', 状态: '处理中', 更新时间: '2026-06-30 17:41' },
      { id: 'dash3', 名称: '知识库命中下降', 来源: 'AI问答', 状态: '待分析', 更新时间: '2026-06-30 16:05' }
    ]
  });
}
