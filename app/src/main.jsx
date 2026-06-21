import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const CONTACT_PHONE = "17392540021";
const WORKSPACE_PASSWORD = "LB2026";

const navItems = [
  { label: "首页内容", href: "/index.html#top" },
  { label: "专业文章", href: "/articles/index.html" },
  { label: "联系方式", href: "/index.html#contact" },
  { label: "律师工作", href: "/login.html" }
];

const homeSections = [
  ["top", "首页"],
  ["practice", "业务"],
  ["process", "方法"],
  ["contact", "联系"]
];

const workspaceNavItems = [
  { label: "门户首页", href: "./index.html" },
  { label: "案件台账", href: "./workspace.html#cases" },
  { label: "文书模板", href: "./workspace.html#documents" },
  { label: "法规检索", href: "./workspace.html#research" }
];

const practiceDetailData = {
  criminal: {
    number: "01",
    title: "刑事辩护",
    summary: "会见、阅卷、证据审查、取保申请、量刑情节整理。",
    intro: "重视会见沟通、程序节点、证据审查和类案检索。对涉嫌非法利用信息网络、侵犯公民个人信息等案件，能够结合互联网业务模式理解事实结构。",
    cases: [
      "网络犯罪案件：梳理平台功能、资金流向、账号权限和行为边界",
      "侦查、审查起诉阶段：围绕会见、阅卷、取保、量刑情节推进工作",
      "家属沟通：把案件阶段、可做事项和风险边界说明白"
    ],
    prepare: ["拘留/逮捕通知书", "办案机关与承办人信息", "到案经过和家属掌握的事实", "既往病史、家庭情况等量刑材料"]
  },
  labor: {
    number: "02",
    title: "劳动争议",
    summary: "工资、解除、补偿赔偿、工伤待遇、劳务报酬争议。",
    intro: "处理工资报酬、违法解除、劳务报酬、退休待遇、兼职协议等争议，重点放在劳动关系、用工管理、证据链和仲裁时效。",
    cases: [
      "退休待遇争议：围绕用工主体、待遇依据和历史材料整理证据",
      "保安、宿管等基层用工争议：梳理考勤、工资、岗位和管理关系",
      "兼职/劳务协议：审查合同性质、报酬结算和管辖约定"
    ],
    prepare: ["劳动合同或协议", "工资流水、社保记录、考勤记录", "解除通知、聊天记录、工作群记录", "仲裁时效相关时间节点"]
  },
  company: {
    number: "03",
    title: "企业合规",
    summary: "合同审查、用工管理、外包协作、软件项目交付风险。",
    intro: "结合技术项目交付经历，关注合同、用工、外包协作、软件开发、股东/高管身份变更和经营流程留痕。",
    cases: [
      "软件开发合同：关注需求确认、验收节点、交付范围和付款条件",
      "公司治理事项：梳理法定代表人、高管、股权安排及退出路径",
      "经营合同争议：围绕证据留痕、履约过程、违约责任和执行可能性评估"
    ],
    prepare: ["合同、订单、报价单和补充协议", "交付物、验收记录、沟通记录", "付款凭证、发票、对账资料", "公司章程、工商档案和授权材料"]
  }
};

const methodSteps = [
  {
    title: "跨界理解力",
    body: "法学训练叠加互联网项目经验，能听懂业务逻辑、平台流程、用工协作和合同交付，不只停留在法条表面。"
  },
  {
    title: "证据拆解力",
    body: "习惯把复杂事实拆成时间线、证据链、争议焦点和行动清单，让案件推进有结构、有抓手。"
  },
  {
    title: "沟通穿透力",
    body: "把专业判断翻译成当事人听得懂的话，重要风险直说，关键节点讲清楚，不用套话糊弄。"
  },
  {
    title: "持续反馈力",
    body: "重视过程管理和阶段复盘，及时同步进展、待办和下一步安排，让委托人知道案子正在往哪里走。"
  }
];

const socialLinks = [
  ["personal", "#contact", "个人微信", false],
  ["wechat", "#contact", "微信公众号", false],
  ["douyin", "#contact", "抖音", false],
  ["rednote", "#contact", "小红书", false]
];

const prepItems = [
  "涉及开庭、仲裁、拘留、上诉等期限事项，请优先说明",
  "事情经过和关键时间线",
  "合同、通知、判决、传票等核心材料",
  "付款凭证、聊天记录、录音录像等证据",
  "目前最急的问题和希望达到的结果"
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
  const items = workspace ? workspaceNavItems : navItems;

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
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".home-slide[id]"));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: [0.42, 0.6, 0.78] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace("#", "");
      if (!homeSections.some(([sectionId]) => sectionId === id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        setActiveSection(id);
      }, 80);
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  function goToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    window.history.replaceState(null, "", `#${id}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  return (
    <>
      <Header />
      <main>
        <Hero active={activeSection === "top"} />
        <div className="home-overview">
          <PracticeBand active={activeSection === "practice"} />
          <MethodSection active={activeSection === "process"} />
          <ContactSection active={activeSection === "contact"} />
        </div>
        <SlideDots activeSection={activeSection} onNavigate={goToSection} />
      </main>
    </>
  );
}

function Hero({ active }) {
  return (
    <section className={`hero home-slide home-hero-slide${active ? " is-active" : ""}`} id="top">
      <div className="hero-copy">
        <p className="eyebrow">陕西西安 | 执业律师</p>
        <h1>李博律师</h1>
        <p className="hero-lede">懂法律和实务，也懂真实业务。</p>
        <div className="hero-actions" aria-label="主要操作">
          <a className="button primary" href="#contact">
            预约沟通
          </a>
          <a className="button secondary" href="./login.html">
            进入工作台
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="联系信息">
        <h2>服务特点</h2>
        <ul className="status-list">
          <li>
            <strong>A 证</strong>
            <span>法律职业资格，兼具律师执业经历</span>
          </li>
          <li>
            <strong>复合经历</strong>
            <span>法务、技术团队交付和执业律师经历</span>
          </li>
          <li>
            <strong>过程管理</strong>
            <span>重视事实梳理、证据组织和案件进度反馈</span>
          </li>
        </ul>
      </aside>
    </section>
  );
}

function PracticeBand({ active }) {
  const [activeKey, setActiveKey] = useState("criminal");
  const detail = practiceDetailData[activeKey];

  function selectService(key) {
    setActiveKey(key);
  }

  function handleServiceKeyDown(event, key) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    selectService(key);
  }

  return (
    <section className={`section practice-band home-slide${active ? " is-active" : ""}`} id="practice">
      <div className="section-heading">
        <p className="eyebrow">Practice</p>
        <h2>专注领域？</h2>
        <p>围绕刑事风险、劳动用工和企业经营三类高频场景，提供清晰、负责、持续反馈的法律服务。</p>
      </div>

      <div className="service-list">
        {Object.entries(practiceDetailData).map(([key, item]) => (
          <article
            aria-pressed={key === activeKey ? "true" : "false"}
            data-service={key}
            key={key}
            onClick={() => selectService(key)}
            onKeyDown={(event) => handleServiceKeyDown(event, key)}
            role="button"
            tabIndex={0}
          >
            <span>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <em>点击查看承办经验</em>
            </div>
          </article>
        ))}
      </div>

      <div className="service-detail" aria-live="polite">
        <div className="service-detail__copy">
          <p className="eyebrow">Selected Practice</p>
          <h3>{detail.title}</h3>
          <p>{detail.intro}</p>
        </div>
        <div className="service-detail__grid">
          <section>
            <strong>承办经验</strong>
            <div>
              {detail.cases.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section>
            <strong>沟通前可准备</strong>
            <div>
              {detail.prepare.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function MethodSection({ active }) {
  return (
    <section className={`section method-section home-slide${active ? " is-active" : ""}`} id="process">
      <div className="section-rule">
        <span />
      </div>
      <div className="section-heading">
        <p className="eyebrow">Why Me</p>
        <h2>优势能力？</h2>
        <p>法律服务不只是给一个结论，更重要的是让你知道问题在哪里、下一步怎么走、每个阶段做到什么程度。</p>
      </div>
      <div className="method-steps">
        {methodSteps.map((step) => (
          <article key={step.title}>
            <strong>{step.title}</strong>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ active }) {
  return (
    <section className={`section compact home-slide contact-slide${active ? " is-active" : ""}`} id="contact">
      <div className="section-heading contact-heading">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>联系方式？</h2>
        </div>
        <a className="button primary" href={`tel:${CONTACT_PHONE}`}>
          拨打 {CONTACT_PHONE}
        </a>
      </div>

      <div className="social-grid">
        {socialLinks.map(([key, href, label, external]) => (
          <a className={`social-card ${key}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} key={key}>
            <figure aria-label={key === "personal" ? "李博律师个人微信二维码" : `西安李博律师${label}入口`} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="prep-todo">
        <h3>沟通前准备</h3>
        {prepItems.map((item) => (
          <label key={item}>
            <input type="checkbox" disabled />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

function SlideDots({ activeSection, onNavigate }) {
  return (
    <nav className="slide-dots" aria-label="首页段落导航">
      {homeSections.map(([id, label]) => (
        <a
          aria-current={activeSection === id ? "true" : "false"}
          aria-label={label}
          href={`#${id}`}
          key={id}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(id);
          }}
        >
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (phone.trim() !== CONTACT_PHONE || password.trim().toUpperCase() !== WORKSPACE_PASSWORD) {
      setPassword("");
      return;
    }

    sessionStorage.setItem("workspaceVerified", "true");
    window.location.href = "./workspace.html";
  }

  return (
    <div className="auth-page">
      <Header workspace />
      <main className="auth-shell">
        <section className="auth-card" aria-label="工作台登录">
          <form className="workspace-login-form" onSubmit={handleSubmit}>
            <label>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" placeholder="手机号" aria-label="手机号" />
            </label>
            <label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                placeholder="密码"
                aria-label="密码"
              />
            </label>
            <button className="button primary" type="submit">
              进入工作台
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function WorkspacePage() {
  const [verified, setVerified] = useState(() => sessionStorage.getItem("workspaceVerified") === "true");

  useEffect(() => {
    if (!verified) window.location.replace("./login.html?next=workspace");
  }, [verified]);

  if (!verified) return null;

  function handleLogout() {
    sessionStorage.removeItem("workspaceVerified");
    setVerified(false);
  }

  return (
    <>
      <Header workspace />
      <main className="workspace">
        <section className="workspace-hero">
          <div>
            <p className="eyebrow">Workspace Prototype</p>
            <h1>李博律师工作台</h1>
            <p>用于案件台账、材料目录、待办事项和文书模板的静态原型。当前不保存真实案件资料。</p>
          </div>
          <div className="security-banner">
            <span>已通过本地前端验证。本版本仍仅为静态原型。</span>
            <button className="workspace-logout" type="button" onClick={handleLogout}>
              退出验证
            </button>
          </div>
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

  if (page === "login") return <LoginPage />;
  if (page === "workspace") return <WorkspacePage />;
  return <HomePage />;
}

createRoot(document.getElementById("root")).render(<App />);
