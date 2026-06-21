import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
  { label: "首页", href: "./index.html#top" },
  { label: "关于李博", href: "./index.html#profile" },
  { label: "业务领域", href: "./index.html#practice" },
  { label: "办案流程", href: "./index.html#process" },
  { label: "资料整理", href: "./index.html#materials" },
  { label: "律师工作台", href: "./login.html" },
  { label: "联系", href: "./index.html#contact" }
];

const practiceAreas = [
  {
    kicker: "民商事纠纷",
    title: "民商事代理",
    body: "处理合同、借贷、建设工程、装饰装修等常见民商事争议，重视事实梳理、证据目录和诉讼路径评估。"
  },
  {
    kicker: "刑事业务",
    title: "刑事辩护",
    body: "围绕案件事实、证据合法性、程序权利和量刑情节开展工作，依法维护当事人合法权益。"
  },
  {
    kicker: "企业服务",
    title: "企业合规",
    body: "结合企业经营和互联网项目经验，协助识别合同、用工、知识产权、外包合作等方面的法律风险。"
  }
];

const processSteps = [
  ["01", "初步沟通", "了解争议背景、核心诉求、时间节点和现有材料。"],
  ["02", "材料初审", "梳理证据类型、证明目的、缺漏事项和补充方向。"],
  ["03", "方案评估", "结合事实基础和可核验法律依据，评估路径、风险与成本。"],
  ["04", "委托办理", "明确工作范围、沟通机制、材料交接和阶段性成果。"],
  ["05", "进度反馈", "持续记录关键进展、待办事项和下一步处理安排。"]
];

const materialItems = [
  ["材料清单", "按主体身份、合同文件、付款凭证、沟通记录、程序材料等类别归集。"],
  ["事实时间线", "用时间、事件、证据来源和争议焦点连接案件事实。"],
  ["证据目录", "围绕证明目的和关联事实整理证据，不在公开站保存原始证据。"],
  ["法规检索", "保留检索入口和记录结构，具体法律依据以现行、可核验资料为准。"]
];

const workspaceCards = [
  ["Case Ledger", "案件台账", "预留案件阶段、关键期限、待办状态和沟通记录位置。", "示例字段：案件名称占位、阶段占位、期限占位", "cases"],
  ["Materials", "材料目录", "预留证据分类、材料来源、证明目的和缺漏提示位置。", "示例字段：材料类别、取得状态、备注"],
  ["Tasks", "待办事项", "预留庭期、举证期限、文书提交、客户沟通等事项。", "示例字段：事项、优先级、完成状态"],
  ["Templates", "文书模板", "预留起诉状、答辩状、代理词、证据目录等模板入口。", "示例字段：模板名称、适用场景、更新时间", "documents"],
  ["Research", "法规检索", "预留法律、司法解释、部门规章、指导案例和裁判规则检索记录。", "示例字段：检索主题、来源、核验状态", "research"],
  ["Review", "办案复盘", "预留争议焦点、风险提示、沟通纪要和阶段成果整理入口。", "示例字段：复盘主题、结论、后续动作"]
];

function Header({ workspace = false }) {
  const items = workspace
    ? [
        { label: "门户首页", href: "./index.html" },
        { label: "案件台账", href: "./workspace.html#cases" },
        { label: "文书模板", href: "./workspace.html#documents" },
        { label: "法规检索", href: "./workspace.html#research" }
      ]
    : navItems;

  return (
    <header className="site-header">
      <a className="brand" href="./index.html" aria-label="返回首页">
        <span className="brand-mark">律</span>
        <span>
          <strong>{workspace ? "李律" : "李博律师"}</strong>
          <small>{workspace ? "工作台原型" : "陕西泾渭分明律师事务所"}</small>
        </span>
      </a>
      <nav className="site-nav" aria-label={workspace ? "工作台导航" : "主导航"}>
        {items.map((item) => (
          <a href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-actions" aria-label="主要操作">
              <a className="button primary" href="#contact">
                预约沟通
              </a>
              <a className="button secondary" href="./login.html">
                进入工作台
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="profile">
          <div className="profile-layout">
            <div className="section-heading">
              <p>
                李博律师，1993 年生，2011 年至 2015 年就读于陕西科技大学法学专业，2014 年通过国家司法考试并取得法律职业资格证 A 证。
              </p>
              <p>
                毕业后曾任企业法务专员，后转入软件开发行业，先后参与金融、汽车、物流、云服务、智能客服、智能营销和出行服务等项目，具备多年项目交付、团队协作和复杂问题拆解经验。
              </p>
              <p>
                2024 年开始律师实习，参与建设工程施工合同纠纷、建设工程分包合同纠纷、装饰装修合同纠纷、民间借贷纠纷等民商事案件代理工作。2026 年 3
                月取得律师执业证，回到西安市高陵区执业。
              </p>
              <a className="text-link" href="https://mp.weixin.qq.com/s/CusBMOjobaZcUlnTxHi0xg" target="_blank" rel="noopener noreferrer">
                查看个人经历原文
              </a>
            </div>
            <div className="profile-card">
              <h3>公开身份信息</h3>
              <dl className="fact-list">
                <div>
                  <dt>姓名</dt>
                  <dd>李博</dd>
                </div>
                <div>
                  <dt>执业机构</dt>
                  <dd>陕西泾渭分明律师事务所</dd>
                </div>
                <div>
                  <dt>执业地区</dt>
                  <dd>陕西省西安市高陵区</dd>
                </div>
                <div>
                  <dt>执业时间</dt>
                  <dd>2026 年 3 月取得律师执业证</dd>
                </div>
                <div>
                  <dt>长期关注</dt>
                  <dd>基层法律援助与公益法律服务</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section" id="practice">
          <div className="section-heading">
            <p className="eyebrow">Practice Areas</p>
            <h2>业务领域</h2>
            <p>结合公开简介内容，当前主要展示以下服务方向。具体委托事项以案件事实、证据材料和正式沟通为准。</p>
          </div>
          <div className="card-grid three">
            {practiceAreas.map((area) => (
              <article className="info-card" key={area.title}>
                <span className="card-kicker">{area.kicker}</span>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section muted" id="process">
          <div className="section-heading">
            <p className="eyebrow">Workflow</p>
            <h2>办案流程</h2>
            <p>以材料、事实、法律关系和目标结果为主线，形成可复盘的办案记录。</p>
          </div>
          <div className="timeline">
            {processSteps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="materials">
          <div className="section-heading">
            <p className="eyebrow">Case Organization</p>
            <h2>资料整理</h2>
            <p>本网站仅展示整理方法和入口，不承载真实案件资料。</p>
          </div>
          <div className="feature-layout">
            <div className="feature-list">
              {materialItems.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="notice-box">
              <h3>敏感信息边界</h3>
              <p>客户身份信息、案件编号、证据材料、谈判策略、诉讼思路等内容默认按高度敏感信息处理，不放入当前公网静态网站。</p>
              <a className="button secondary" href="./login.html">
                查看工作台原型
              </a>
            </div>
          </div>
        </section>

        <section className="section compact" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>联系与预约</h2>
            <p>如需民商事代理、刑事辩护、企业合规或其他法律问题咨询，可通过李博律师已确认的联系方式沟通。当前页面暂不展示电话、邮箱或二维码。</p>
          </div>
          <div className="contact-panel">
            <div>
              <h3>预约沟通</h3>
              <p>后续可在此放置电话、邮箱、微信二维码或预约表单说明。正式咨询前，请先整理基础事实、关键时间节点和已有材料。</p>
            </div>
            <span className="button primary unavailable" aria-disabled="true">
              联系方式待补充
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function LoginPage() {
  return (
    <div className="auth-page">
      <Header workspace />
      <main className="auth-shell">
        <section className="auth-card" aria-labelledby="login-title">
          <p className="eyebrow">Private Workspace</p>
          <h1 id="login-title">律师工作台入口</h1>
          <p>当前版本为工作台原型入口，尚未接入真实账号、权限、数据库或案件资料系统。</p>
          <div className="login-form">
            <a className="button primary" href="./workspace.html">
              查看工作台原型
            </a>
          </div>
          <p className="form-note">当前页面不收集任何账号、密码、案件信息或客户信息。</p>
        </section>

        <aside className="auth-aside" aria-label="安全提示">
          <h2>第一版安全边界</h2>
          <ul className="status-list">
            <li>不设置账号密码输入框</li>
            <li>不上传案件材料</li>
            <li>不展示客户身份信息</li>
            <li>后续如建设真实系统，应另行设计后端、权限、加密和备份机制</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

function WorkspacePage() {
  return (
    <>
      <Header workspace />
      <main className="workspace">
        <section className="workspace-hero">
          <div>
            <p className="eyebrow">Workspace Prototype</p>
            <h1>律师工作台原型</h1>
            <p>本页面用于确定未来办案系统的信息架构。当前不接入真实登录，不保存任何案件资料。</p>
          </div>
          <div className="security-banner">敏感案件资料暂不上传公网，本版本仅作结构和流程入口。</div>
        </section>

        <section className="dashboard-grid" aria-label="工作台模块">
          {workspaceCards.map(([kicker, title, body, placeholder, id]) => (
            <article className="dashboard-card" id={id} key={title}>
              <span className="card-kicker">{kicker}</span>
              <h2>{title}</h2>
              <p>{body}</p>
              <div className="placeholder-row">{placeholder}</div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 李博律师个人网站。公开内容以实际确认信息为准。</p>
      <a href="./login.html">律师工作台</a>
    </footer>
  );
}

function App() {
  const page = document.body.dataset.page;

  if (page === "login") {
    return <LoginPage />;
  }

  if (page === "workspace") {
    return <WorkspacePage />;
  }

  return <HomePage />;
}

createRoot(document.getElementById("root")).render(<App />);
