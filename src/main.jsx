import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgeDollarSign,
  Bot,
  Boxes,
  ChevronDown,
  ChevronLeft,
  CircleUserRound,
  Clapperboard,
  DatabaseZap,
  FileVideo,
  Folder,
  Gauge,
  Gift,
  Globe2,
  Home,
  Image as ImageIcon,
  Languages,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Package,
  PlayCircle,
  Plus,
  Search,
  Send,
  Smartphone,
  Sparkles,
  UploadCloud,
  UserCog,
  UserRound,
  Video,
  X
} from 'lucide-react';
import {
  getHomeConfig,
  getNavigation,
  getPageData,
  getProductDetail,
  getUserProfile,
  searchAssistant
} from './services/api.js';
import './styles.css';

const platformColors = ['#7367ff', '#1f1f2b', '#66a3ff', '#38cb8f', '#8e72ff', '#111827', '#3b82f6', '#19c55d', '#ff4d67', '#262833', '#4b90ff', '#ff8a36', '#f04444'];

function App() {
  const [home, setHome] = useState(null);
  const [user, setUser] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [activeModule, setActiveModule] = useState('home');
  const [activePage, setActivePage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [query, setQuery] = useState('');
  const [assistantResult, setAssistantResult] = useState('');
  const [chatOpen, setChatOpen] = useState(true);

  useEffect(() => {
    Promise.all([getHomeConfig(), getUserProfile(), getNavigation(), getProductDetail('claw-3')]).then(([homeData, userData, navData, productData]) => {
      setHome(homeData);
      setUser(userData);
      setNavigation(navData);
      setProduct(productData);
    });
  }, []);

  useEffect(() => {
    if (activePage === 'home') {
      setPageData(null);
      return;
    }
    getPageData(activePage).then(setPageData);
  }, [activePage]);

  const activeNav = useMemo(() => navigation.find((item) => item.key === activeModule), [activeModule, navigation]);

  async function onSearchSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    const result = await searchAssistant(query.trim());
    setAssistantResult(result.answer);
  }

  function openModule(module) {
    setActiveModule(module.key);
    if (module.key === 'home') {
      setActivePage('home');
      setDrawerOpen(false);
      return;
    }
    setActivePage(module.overviewKey || module.children?.[0]?.key || module.groups?.[0]?.children?.[0]?.key || module.key);
    setDrawerOpen(true);
  }

  function openChild(moduleKey, pageKey) {
    setActiveModule(moduleKey);
    setActivePage(pageKey);
    setDrawerOpen(true);
  }

  function openDataInsight() {
    setActiveModule('data-insight');
    setActivePage('data-insight');
    setDrawerOpen(false);
  }

  if (!home || !user) {
    return <div className="boot">正在加载向量增长 AI Claw...</div>;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => openModule({ key: 'home' })} aria-label="首页">
          <span>向量增长</span>
          <Sparkles size={18} />
        </button>
        <form className="search-box" onSubmit={onSearchSubmit}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="可以描述你的任务需求" />
          <button type="submit" aria-label="搜索"><Search size={18} /></button>
        </form>
        <div className="top-actions">
          <button className="pill"><BadgeDollarSign size={16} />算力值剩余：{user.computeBalance}</button>
          <button className={activePage === 'data-insight' ? 'pill active' : 'pill'} onClick={openDataInsight}><DatabaseZap size={16} />数据洞察</button>
          <button className="pill active" onClick={() => setDetailOpen(true)}><Package size={16} />产品详情</button>
          <button className="pill user"><CircleUserRound size={16} />用户名：{user.username} {user.displayName}<ChevronDown size={15} /></button>
          <button className="lang"><Languages size={15} />EN</button>
        </div>
      </header>

      <aside className="rail" aria-label="主导航">
        {navigation.map((item) => {
          const Icon = iconMap[item.icon] || Home;
          return (
            <button key={item.key} className={activeModule === item.key ? 'rail-item selected' : 'rail-item'} onClick={() => openModule(item)}>
              <Icon size={30} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </aside>

      <section className="stage">
        {drawerOpen && activeNav ? <ModuleDrawer module={activeNav} activePage={activePage} onOpen={openChild} onClose={() => setDrawerOpen(false)} /> : null}
        {activePage === 'home' ? <HeroPanel home={home} onCardClick={(card) => openChild(card.moduleKey, card.pageKey)} /> : <WorkspacePage page={pageData} drawerOpen={drawerOpen} />}
      </section>

      {assistantResult ? (
        <div className="assistant-result">
          <button onClick={() => setAssistantResult('')} aria-label="关闭"><X size={16} /></button>
          {assistantResult}
        </div>
      ) : null}

      {chatOpen ? <ChatMascot onClose={() => setChatOpen(false)} /> : null}
      {detailOpen ? <ProductDetail product={product} onClose={() => setDetailOpen(false)} /> : null}
    </main>
  );
}

function ModuleDrawer({ module, activePage, onOpen, onClose }) {
  if (module.drawerType === 'knowledge-admin') {
    return <KnowledgeDrawer module={module} activePage={activePage} onOpen={onOpen} onClose={onClose} />;
  }

  return (
    <nav className="module-drawer">
      <div className="drawer-title">
        <strong>{module.label}</strong>
        <button onClick={onClose} aria-label="收起"><ChevronLeft size={22} /></button>
      </div>
      <button className={activePage === module.overviewKey ? 'drawer-link active' : 'drawer-link'} onClick={() => onOpen(module.key, module.overviewKey)}>
        <LayoutDashboard size={18} />
        <span>功能总览</span>
      </button>
      {module.children.map((child) => {
        const Icon = iconMap[child.icon] || Sparkles;
        return (
          <button className={activePage === child.key ? 'drawer-link active' : 'drawer-link'} key={child.key} onClick={() => onOpen(module.key, child.key)}>
            <Icon size={18} />
            <span>{child.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function KnowledgeDrawer({ module, activePage, onOpen, onClose }) {
  return (
    <nav className="module-drawer knowledge-drawer">
      <div className="drawer-title">
        <strong>{module.label}</strong>
        <button onClick={onClose} aria-label="收起"><ChevronLeft size={22} /></button>
      </div>
      {module.groups.map((group) => {
        const GroupIcon = iconMap[group.icon] || Folder;
        return (
          <div className="knowledge-group" key={group.key}>
            <button className="knowledge-group-title" onClick={() => onOpen(module.key, group.children[0].key)}>
              <GroupIcon size={18} />
              <span>{group.label}</span>
              <ChevronDown size={14} />
            </button>
            <div className="knowledge-group-links">
              {group.children.map((child) => (
                <button
                  className={activePage === child.key ? 'knowledge-link active' : 'knowledge-link'}
                  key={child.key}
                  onClick={() => onOpen(module.key, child.key)}
                >
                  {child.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function HeroPanel({ home, onCardClick }) {
  return (
    <div className="hero-panel">
      <div className="hero-copy">
        <h1>向量增长 AI Claw <span>3.0</span></h1>
        <div className="underline" />
        <p>{home.subtitle}</p>
        <div className="platforms">
          {home.platforms.map((name, index) => <span key={name} style={{ background: platformColors[index % platformColors.length] }}>{name.slice(0, 1)}</span>)}
        </div>
      </div>
      <div className="product-grid">
        {home.products.map((card, index) => <ProductCard key={card.id} card={card} index={index} onClick={() => onCardClick(card)} />)}
      </div>
      <footer className="copyright">Copyright 向量增长 v3 2026 备案号：沪ICP备2024067875号　火山引擎框架合作　腾讯云战略合作　网信办算法备案</footer>
    </div>
  );
}

function ProductCard({ card, index, onClick }) {
  return (
    <button className="product-card" onClick={onClick}>
      <strong>{card.name}</strong>
      <span>{card.enName}</span>
      <i />
      <div className={`product-art art-${index}`}>
        <div className="base" />
        <div className="glow-ring" />
        <div className="object-a" />
        <div className="object-b" />
        <div className="object-c" />
      </div>
    </button>
  );
}

function WorkspacePage({ page, drawerOpen }) {
  if (!page) {
    return <div className={drawerOpen ? 'work-page with-drawer' : 'work-page'}><div className="work-loading">页面加载中...</div></div>;
  }
  if (page.kind === 'knowledge-basic-info') {
    return <KnowledgeBasicInfo page={page} drawerOpen={drawerOpen} />;
  }
  if (page.kind === 'knowledge-profile-settings') {
    return <KnowledgeProfileSettings page={page} drawerOpen={drawerOpen} />;
  }
  if (page.kind === 'knowledge-image-upload') {
    return <KnowledgeImageUpload page={page} drawerOpen={drawerOpen} />;
  }
  if (page.kind === 'data-insight') {
    return <DataInsightPage page={page} />;
  }
  if (page.kind === 'knowledge-placeholder') {
    return <KnowledgePlaceholder page={page} drawerOpen={drawerOpen} />;
  }
  return (
    <div className={drawerOpen ? 'work-page with-drawer' : 'work-page'}>
      <header className="work-header">
        <div>
          <p>{page.eyebrow}</p>
          <h2>{page.title}</h2>
          <span>{page.description}</span>
        </div>
        <div className="work-actions">
          {page.actions.map((action) => {
            const Icon = iconMap[action.icon] || Plus;
            return <button key={action.label}><Icon size={16} />{action.label}</button>;
          })}
        </div>
      </header>

      <section className="metric-grid">
        {page.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.trend}</em>
          </article>
        ))}
      </section>

      <section className="work-main-grid">
        <div className="panel-block primary-panel">
          <div className="panel-title">
            <strong>{page.primary.title}</strong>
            <button>{page.primary.cta}</button>
          </div>
          <div className="feature-cards">
            {page.primary.items.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <span>{item.tag}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="panel-block">
          <div className="panel-title">
            <strong>{page.secondary.title}</strong>
            <button>刷新</button>
          </div>
          <div className="progress-list">
            {page.secondary.items.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <i style={{ width: item.percent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-block table-panel">
        <div className="panel-title">
          <strong>{page.table.title}</strong>
          <div className="table-tools"><Search size={15} />筛选</div>
        </div>
        <table>
          <thead>
            <tr>{page.table.columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {page.table.rows.map((row) => (
              <tr key={row.id}>{page.table.columns.map((column) => <td key={column}>{row[column]}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function KnowledgeBasicInfo({ page, drawerOpen }) {
  return (
    <div className={drawerOpen ? 'knowledge-page with-drawer' : 'knowledge-page'}>
      <div className="knowledge-toolbar">
        <div>
          <h2>{page.title}</h2>
          <p>{page.description}</p>
        </div>
        <button className="knowledge-primary-btn">保存基础信息</button>
      </div>
      <section className="knowledge-form-card">
        <div className="form-grid">
          {page.fields.map((field) => (
            <label className={field.type === 'textarea' ? 'form-field wide' : 'form-field'} key={field.key}>
              <span>{field.label}</span>
              {field.type === 'textarea' ? <textarea defaultValue={field.value} rows={4} /> : <input defaultValue={field.value} />}
            </label>
          ))}
        </div>
        <div className="tag-editor">
          <strong>企业标签</strong>
          <div>
            {page.tags.map((tag) => <span key={tag}>{tag}</span>)}
            <button>+ 添加标签</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function KnowledgeProfileSettings({ page, drawerOpen }) {
  const [rows, setRows] = useState(page.table.rows);
  const [editingProfile, setEditingProfile] = useState(null);
  const [profileForm, setProfileForm] = useState(null);

  function openEditor(row = null) {
    const emptyValues = Object.fromEntries(page.dialog.fields.map((field) => [field.key, field.defaultValue || '']));
    const values = row ? { ...emptyValues, ...row.details, name: row.name, source: row.source } : emptyValues;
    setEditingProfile(row);
    setProfileForm(values);
  }

  function closeEditor() {
    setEditingProfile(null);
    setProfileForm(null);
  }

  function updateProfileField(key, value) {
    setProfileForm((current) => ({ ...current, [key]: value }));
  }

  function saveProfile() {
    if (!profileForm) return;
    const updatedRow = {
      ...(editingProfile || {}),
      id: editingProfile?.id || `profile-${Date.now()}`,
      index: editingProfile?.index || rows.length + 1,
      name: profileForm.name,
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      source: profileForm.source || '自定义',
      actions: ['复制', '编辑', '删除'],
      details: profileForm
    };
    setRows((current) => {
      if (!editingProfile) return [...current, updatedRow];
      return current.map((row) => (row.id === editingProfile.id ? updatedRow : row));
    });
    closeEditor();
  }

  function handleAction(action, row) {
    if (action === '编辑') {
      openEditor(row);
      return;
    }
    if (action === '复制') {
      const copy = {
        ...row,
        id: `profile-${Date.now()}`,
        index: rows.length + 1,
        name: `${row.name} 副本`,
        source: '复制',
        details: { ...row.details, name: `${row.name} 副本`, source: '复制' }
      };
      setRows((current) => [...current, copy]);
      return;
    }
    if (action === '删除') {
      setRows((current) => current.filter((item) => item.id !== row.id).map((item, index) => ({ ...item, index: index + 1 })));
    }
  }

  return (
    <div className={drawerOpen ? 'knowledge-page with-drawer' : 'knowledge-page'}>
      <div className="knowledge-toolbar">
        <button className="knowledge-primary-btn" onClick={() => openEditor()}>{page.addButtonText}</button>
      </div>
      <section className="knowledge-table-card">
        <table className="knowledge-table">
          <thead>
            <tr>{page.table.columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {page.table.columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'actions' ? (
                      <div className="text-actions">
                        {row.actions.map((action) => <button key={action} onClick={() => handleAction(action, row)}>{action}</button>)}
                      </div>
                    ) : column.key === 'source' ? (
                      <span className="source-badge">{row[column.key]}</span>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="knowledge-pagination">
        <span>共 {rows.length} 条</span>
        <button className="select-like">{page.pagination.pageSize}条/页 <ChevronDown size={14} /></button>
        <button disabled><ChevronLeft size={16} /></button>
        <button className="current">{page.pagination.current}</button>
        <button disabled>›</button>
        <span>前往</span>
        <input defaultValue={page.pagination.current} />
        <span>页</span>
      </div>
      {profileForm ? (
        <ProfileEditorDialog
          title={editingProfile ? page.dialog.editTitle : page.dialog.addTitle}
          fields={page.dialog.fields}
          values={profileForm}
          onChange={updateProfileField}
          onClose={closeEditor}
          onSave={saveProfile}
        />
      ) : null}
    </div>
  );
}

function ProfileEditorDialog({ title, fields, values, onChange, onClose, onSave }) {
  return (
    <div className="knowledge-modal-layer">
      <section className="profile-dialog" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <strong>{title}</strong>
          <button onClick={onClose} aria-label="关闭"><X size={18} /></button>
        </header>
        <div className="profile-dialog-body">
          <div className="profile-dialog-grid">
            {fields.map((field) => (
              <label className={field.type === 'textarea' ? 'profile-field wide' : 'profile-field'} key={field.key}>
                <span>{field.required ? `${field.label} *` : field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea value={values[field.key] || ''} rows={field.rows || 3} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} />
                ) : field.type === 'select' ? (
                  <select value={values[field.key] || ''} onChange={(event) => onChange(field.key, event.target.value)}>
                    {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                ) : (
                  <input value={values[field.key] || ''} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} />
                )}
              </label>
            ))}
          </div>
        </div>
        <footer>
          <button className="dialog-cancel" onClick={onClose}>取消</button>
          <button className="dialog-save" onClick={onSave}>保存</button>
        </footer>
      </section>
    </div>
  );
}

function KnowledgeImageUpload({ page, drawerOpen }) {
  const [libraries, setLibraries] = useState(page.libraries);
  const [editingLibrary, setEditingLibrary] = useState(null);
  const [libraryForm, setLibraryForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  function handleFiles(files) {
    const selected = Array.from(files || []).filter((file) => file.type.startsWith('image/'));
    if (!selected.length || !libraryForm) return;
    const nextItems = selected.map((file, index) => ({
      id: `image-${Date.now()}-${index}`,
      name: file.name,
      size: `${Math.max(file.size / 1024 / 1024, 0.01).toFixed(2)}MB`,
      url: URL.createObjectURL(file)
    }));
    setLibraryForm((current) => ({ ...current, images: [...current.images, ...nextItems] }));
  }

  function openLibraryDialog(library = null) {
    setEditingLibrary(library);
    setLibraryForm(library ? structuredClone(library) : {
      id: `library-${Date.now()}`,
      index: libraries.length + 1,
      name: '',
      time: new Date().toISOString().slice(0, 16).replace('T', ' '),
      images: []
    });
  }

  function closeLibraryDialog() {
    setEditingLibrary(null);
    setLibraryForm(null);
    setPreviewImage(null);
  }

  function saveLibrary() {
    if (!libraryForm?.name.trim()) return;
    const nextLibrary = {
      ...libraryForm,
      imageCount: libraryForm.images.length,
      time: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setLibraries((current) => {
      if (!editingLibrary) return [...current, nextLibrary].map((item, index) => ({ ...item, index: index + 1 }));
      return current.map((item) => (item.id === editingLibrary.id ? nextLibrary : item));
    });
    closeLibraryDialog();
  }

  function deleteLibrary(id) {
    setLibraries((current) => current.filter((item) => item.id !== id).map((item, index) => ({ ...item, index: index + 1 })));
  }

  function deleteImage(id) {
    setLibraryForm((current) => ({ ...current, images: current.images.filter((image) => image.id !== id) }));
  }

  return (
    <div className={drawerOpen ? 'knowledge-page with-drawer' : 'knowledge-page'}>
      <div className="knowledge-toolbar">
        <button className="knowledge-primary-btn" onClick={() => openLibraryDialog()}>{page.addButtonText}</button>
      </div>

      <section className="knowledge-table-card image-table-card">
        <table className="knowledge-table image-library-table">
          <thead>
            <tr>{page.table.columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {libraries.map((library) => (
              <tr key={library.id}>
                <td>{library.index}</td>
                <td>{library.name}</td>
                <td>{library.images.length}</td>
                <td>{library.time}</td>
                <td>
                  <div className="text-actions">
                    <button onClick={() => openLibraryDialog(library)}>编辑</button>
                    <button onClick={() => deleteLibrary(library.id)}>删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="knowledge-pagination">
        <span>共 {libraries.length} 条</span>
        <button className="select-like">{page.pagination.pageSize}条/页 <ChevronDown size={14} /></button>
        <button disabled><ChevronLeft size={16} /></button>
        <button className="current">{page.pagination.current}</button>
        <button disabled>›</button>
        <span>前往</span>
        <input defaultValue={page.pagination.current} />
        <span>页</span>
      </div>

      {libraryForm ? (
        <div className="knowledge-modal-layer">
          <section className="image-library-dialog" role="dialog" aria-modal="true" aria-label={editingLibrary ? page.dialog.editTitle : page.dialog.addTitle}>
            <header>
              <strong>{editingLibrary ? page.dialog.editTitle : page.dialog.addTitle}</strong>
              <button onClick={closeLibraryDialog} aria-label="关闭"><X size={18} /></button>
            </header>
            <div className="image-library-body">
              <label className="image-library-name">
                <span>图片库名称</span>
                <input value={libraryForm.name} placeholder="请输入图片库名称" onChange={(event) => setLibraryForm((current) => ({ ...current, name: event.target.value }))} />
              </label>
              <div className="image-library-upload-row">
                <span>添加图片（可添加多张）</span>
                <button>查看说明</button>
                <button>下载格式工厂</button>
              </div>
              <label className="image-library-upload-btn">
                上传图片
                <input type="file" accept="image/*" multiple onChange={(event) => handleFiles(event.target.files)} />
              </label>
              <p className="image-library-tip">大小不能超过2M，不符合要求的文件将不会提交</p>
              <div className="image-thumb-grid">
                {libraryForm.images.map((image) => (
                  <article className="image-thumb-card" key={image.id}>
                    <button className="image-eye" onClick={() => setPreviewImage(image)}>查看</button>
                    <img src={image.url} alt={image.name} />
                    <button className="image-delete" onClick={() => deleteImage(image.id)}>删除</button>
                  </article>
                ))}
              </div>
            </div>
            <footer>
              <button className="dialog-save" onClick={saveLibrary}>保存提交</button>
            </footer>
          </section>
          {previewImage ? (
            <div className="image-zoom" onClick={() => setPreviewImage(null)}>
              <img src={previewImage.url} alt={previewImage.name} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function DataInsightPage({ page }) {
  const [activeScene, setActiveScene] = useState(page.scenes[0].key);
  const [keyword, setKeyword] = useState(page.defaultKeyword);
  const [industry, setIndustry] = useState(page.industries[0]);
  const [result, setResult] = useState(null);

  function runAction(action) {
    setResult({
      action,
      scene: page.scenes.find((item) => item.key === activeScene)?.label,
      keyword,
      industry,
      time: new Date().toISOString().slice(0, 16).replace('T', ' ')
    });
  }

  return (
    <div className="data-insight-page">
      <section className="insight-card">
        <header className="insight-title">
          <button aria-label="返回"><ChevronLeft size={32} /></button>
          <strong>{page.title}</strong>
        </header>
        <div className="insight-tabs">
          {page.scenes.map((scene) => (
            <button key={scene.key} className={activeScene === scene.key ? 'active' : ''} onClick={() => setActiveScene(scene.key)}>
              {scene.label}
            </button>
          ))}
        </div>
        <div className="insight-form-row">
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder={page.keywordPlaceholder} />
          <label className="insight-select">
            <select value={industry} onChange={(event) => setIndustry(event.target.value)}>
              {page.industries.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={18} />
          </label>
          {page.actions.map((action) => (
            <button className="insight-action" key={action} onClick={() => runAction(action)}>{action}</button>
          ))}
        </div>
        {result ? (
          <div className="insight-result">
            <strong>{result.action}任务已创建</strong>
            <span>场景：{result.scene}</span>
            <span>关键词：{result.keyword}</span>
            <span>行业：{result.industry}</span>
            <span>时间：{result.time}</span>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function KnowledgePlaceholder({ page, drawerOpen }) {
  return (
    <div className={drawerOpen ? 'knowledge-page with-drawer' : 'knowledge-page'}>
      <section className="knowledge-empty">
        <h2>{page.title}</h2>
        <p>{page.description}</p>
        <button className="knowledge-primary-btn">后续接入</button>
      </section>
    </div>
  );
}

function ChatMascot({ onClose }) {
  return (
    <div className="chat-mascot">
      <button onClick={onClose} aria-label="关闭客服"><X size={14} /></button>
      <div className="mascot-face">
        <span className="eye left" />
        <span className="eye right" />
        <span className="smile" />
      </div>
      <strong>CLAW</strong>
    </div>
  );
}

function ProductDetail({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="modal-layer">
      <section className="detail-page">
        <header>
          <button onClick={onClose} aria-label="返回"><ChevronLeft size={24} /></button>
          <strong>产品详情</strong>
          <span />
        </header>
        <div className="detail-content">
          <div className="detail-tabs"><button className="active">详情</button><button>视频</button><button>资料</button></div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="feature-list">
            {product.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}

const iconMap = {
  home: Home,
  knowledge: Bot,
  geo: Globe2,
  a2p: Boxes,
  agent: Sparkles,
  dashboard: Gauge,
  video: FileVideo,
  short: Smartphone,
  publish: UploadCloud,
  traffic: Send,
  board: LayoutDashboard,
  menu: Menu,
  package: Package,
  gift: Gift,
  chat: MessageCircle,
  clip: Clapperboard,
  plus: Plus,
  play: PlayCircle,
  folder: Folder,
  image: ImageIcon,
  user: UserRound,
  userCog: UserCog,
  videoFile: Video
};

createRoot(document.getElementById('root')).render(<App />);
