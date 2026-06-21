(function () {
    const matters = {
        criminal: {
            icon: "辩",
            title: "刑事辩护准备",
            intro: "围绕案件事实、证据合法性、程序权利和量刑情节开展工作，依法维护当事人合法权益。",
            progress: "62%",
            cards: [
                ["会见重点", "核对到案经过、讯问情况、涉案事实和身体状态。"],
                ["证据审查", "关注证据来源、合法性、关联性和证明力。"],
                ["程序权利", "梳理强制措施、告知义务、阅卷节点和申请事项。"],
                ["辩护方向", "根据卷宗和事实基础形成稳健意见，不预设结论。"]
            ]
        },
        labor: {
            icon: "劳",
            title: "劳动争议准备",
            intro: "围绕劳动关系、工资社保、解除或终止、工伤及仲裁时效梳理事实和证据。",
            progress: "70%",
            cards: [
                ["关系证明", "劳动合同、入职登记、考勤、工作群、工牌、工资流水。"],
                ["争议节点", "入职、调岗、降薪、欠薪、解除通知、离职交接时间。"],
                ["程序事项", "关注仲裁时效、管辖、举证责任和送达地址。"],
                ["处理路径", "评估协商、仲裁、诉讼及执行可能性。"]
            ]
        },
        company: {
            icon: "企",
            title: "企业合规准备",
            intro: "结合企业经营和项目交付视角，识别合同、用工、知识产权和外包协作风险。",
            progress: "66%",
            cards: [
                ["合同层", "审查付款、验收、交付、解除、违约责任和争议解决。"],
                ["流程层", "记录审批、留痕、授权、交接和对外承诺口径。"],
                ["用工协作", "关注外包、兼职、保密、竞业、知识产权归属。"],
                ["输出物", "形成风险清单、修改建议和优先级处理表。"]
            ]
        }
    };

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
            return;
        }
        fn();
    }

    function make(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function waitFor(selector, callback, tries = 30) {
        const node = document.querySelector(selector);
        if (node) {
            callback(node);
            return;
        }
        if (tries <= 0) return;
        window.setTimeout(() => waitFor(selector, callback, tries - 1), 50);
    }

    function normalizeNavigation(page) {
        const nav = document.querySelector(".site-nav");
        if (!nav) return;

        const links = [
            ["首页内容", "./index.html"],
            ["专业文章", "./articles/"],
            ["联系方式", page === "home" ? "#contact" : "./index.html#contact"],
            ["律师工作", "./login.html"],
        ];
        nav.replaceChildren(...links.map(([label, href]) => {
            const item = document.createElement("a");
            item.href = href;
            item.textContent = label;
            return item;
        }));
    }

    function enhanceHero() {
        const heroCopy = document.querySelector(".hero-copy");
        const heroPanel = document.querySelector(".hero-panel");
        if (!heroCopy || !heroPanel) return;

        const title = heroCopy.querySelector("h1");
        const lede = heroCopy.querySelector(".hero-lede");
        if (title) title.textContent = "李博律师";
        if (lede) {
            lede.textContent = "懂法律和实务，也懂真实业务。";
        }

        const actions = heroCopy.querySelector(".hero-actions");
        if (actions) {
            const primary = actions.querySelector(".primary");
            const secondary = actions.querySelector(".secondary");
            if (primary) {
                primary.textContent = "预约沟通";
                primary.setAttribute("href", "#contact");
            }
            if (secondary) {
                secondary.textContent = "进入工作台";
                secondary.setAttribute("href", "./login.html");
            }
        }

        const heading = heroPanel.querySelector("h2");
        if (heading) heading.textContent = "服务特点";
        const list = heroPanel.querySelector(".status-list");
        if (list) {
            list.replaceChildren(
                make("li", "", "法律职业资格 A 证，兼具律师执业经历"),
                make("li", "", "兼具法务、技术团队交付和执业律师经历"),
                make("li", "", "重视事实梳理、证据组织和案件进度管理")
            );
        }
    }

    function mountPracticeInteractions() {
        const detail = document.querySelector(".service-detail");
        const buttons = Array.from(document.querySelectorAll(".service-list article"));
        if (!detail || !buttons.length || detail.dataset.ready === "true") return;
        detail.dataset.ready = "true";
        const data = {
            criminal: {
                title: "刑事辩护",
                intro: "重视会见沟通、程序节点、证据审查和类案检索。对涉嫌非法利用信息网络、侵犯公民个人信息等案件，能够结合互联网业务模式理解事实结构。",
                cases: ["网络犯罪案件：梳理平台功能、资金流向、账号权限和行为边界", "侦查、审查起诉阶段：围绕会见、阅卷、取保、量刑情节推进工作", "家属沟通：把案件阶段、可做事项和风险边界说明白"],
                prepare: ["拘留/逮捕通知书", "办案机关与承办人信息", "到案经过和家属掌握的事实", "既往病史、家庭情况等量刑材料"]
            },
            labor: {
                title: "劳动争议",
                intro: "处理工资报酬、违法解除、劳务报酬、退休待遇、兼职协议等争议，重点放在劳动关系、用工管理、证据链和仲裁时效。",
                cases: ["退休待遇争议：围绕用工主体、待遇依据和历史材料整理证据", "保安、宿管等基层用工争议：梳理考勤、工资、岗位和管理关系", "兼职/劳务协议：审查合同性质、报酬结算和管辖约定"],
                prepare: ["劳动合同或协议", "工资流水、社保记录、考勤记录", "解除通知、聊天记录、工作群记录", "仲裁时效相关时间节点"]
            },
            company: {
                title: "企业合规",
                intro: "结合技术项目交付经历，关注合同、用工、外包协作、软件开发、股东/高管身份变更和经营流程留痕。",
                cases: ["软件开发合同：关注需求确认、验收节点、交付范围和付款条件", "公司治理事项：梳理法定代表人、高管、股权安排及退出路径", "经营合同争议：围绕证据留痕、履约过程、违约责任和执行可能性评估"],
                prepare: ["合同、订单、报价单和补充协议", "交付物、验收记录、沟通记录", "付款凭证、发票、对账资料", "公司章程、工商档案和授权材料"]
            }
        };
        function render(key) {
            const item = data[key];
            buttons.forEach((button) => button.setAttribute("aria-pressed", button.dataset.service === key ? "true" : "false"));
            detail.innerHTML = [
                `<div class="service-detail__copy"><p class="eyebrow">Selected Practice</p><h3>${item.title}</h3><p>${item.intro}</p></div>`,
                `<div class="service-detail__grid"><section><strong>承办经验</strong>${item.cases.map((text) => `<span>${text}</span>`).join("")}</section><section><strong>沟通前可准备</strong>${item.prepare.map((text) => `<span>${text}</span>`).join("")}</section></div>`
            ].join("");
        }
        buttons.forEach((button) => {
            button.addEventListener("click", () => render(button.dataset.service));
            button.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                render(button.dataset.service);
            });
        });
        render("criminal");
    }

    function replaceHomeSections() {
        const main = document.querySelector("main#top");
        const hero = document.querySelector(".hero");
        const footer = document.querySelector(".site-footer");
        if (!main || !hero || document.querySelector(".home-overview")) return;

        hero.id = "top";
        hero.classList.add("home-slide", "home-hero-slide");
        const sections = document.createElement("div");
        sections.className = "home-overview";
        sections.innerHTML = [
            '<section class="section practice-band home-slide" id="practice">',
            '<div class="section-heading">',
            '<p class="eyebrow">Practice</p>',
            '<h2>专注领域？</h2>',
            '<p>围绕刑事风险、劳动用工和企业经营三类高频场景，提供清晰、负责、持续反馈的法律服务。</p>',
            '</div>',
            '<div class="service-list">',
            '<article data-service="criminal" role="button" tabindex="0"><span>01</span><div><h3>刑事辩护</h3><p>会见、阅卷、证据审查、取保申请、量刑情节整理。</p><em>点击查看承办经验</em></div></article>',
            '<article data-service="labor" role="button" tabindex="0"><span>02</span><div><h3>劳动争议</h3><p>工资、解除、补偿赔偿、工伤待遇、劳务报酬争议。</p><em>点击查看承办经验</em></div></article>',
            '<article data-service="company" role="button" tabindex="0"><span>03</span><div><h3>企业合规</h3><p>合同审查、用工管理、外包协作、软件项目交付风险。</p><em>点击查看承办经验</em></div></article>',
            '</div>',
            '<div class="service-detail" aria-live="polite"></div>',
            '</section>',
            '<section class="section method-section home-slide" id="process">',
            '<div class="section-rule"><span></span></div>',
            '<div class="section-heading">',
            '<p class="eyebrow">Why Me</p>',
            '<h2>优势能力？</h2>',
            '<p>法律服务不只是给一个结论，更重要的是让你知道问题在哪里、下一步怎么走、每个阶段做到什么程度。</p>',
            '</div>',
            '<div class="method-steps">',
            '<article><strong>跨界理解力</strong><p>法学训练叠加互联网项目经验，能听懂业务逻辑、平台流程、用工协作和合同交付，不只停留在法条表面。</p></article>',
            '<article><strong>证据拆解力</strong><p>习惯把复杂事实拆成时间线、证据链、争议焦点和行动清单，让案件推进有结构、有抓手。</p></article>',
            '<article><strong>沟通穿透力</strong><p>把专业判断翻译成当事人听得懂的话，重要风险直说，关键节点讲清楚，不用套话糊弄。</p></article>',
            '<article><strong>持续反馈力</strong><p>重视过程管理和阶段复盘，及时同步进展、待办和下一步安排，让委托人知道案子正在往哪里走。</p></article>',
            '</div>',
            '</section>',
            '<section class="section compact home-slide contact-slide" id="contact">',
            '<div class="section-heading contact-heading">',
            '<div><p class="eyebrow">Contact</p><h2>联系方式？</h2></div>',
            '<a class="button primary" href="tel:17392540021">拨打 17392540021</a>',
            '</div>',
            '<div class="social-grid">',
            '<a class="social-card personal" href="#contact"><figure aria-label="李博律师个人微信二维码"></figure><span>个人微信</span></a>',
            '<a class="social-card wechat" href="https://weixin.sogou.com/weixin?type=1&query=%E8%A5%BF%E5%AE%89%E6%9D%8E%E5%8D%9A%E5%BE%8B%E5%B8%88" target="_blank" rel="noopener"><figure aria-label="西安李博律师微信公众号二维码"></figure><span>微信公众号</span></a>',
            '<a class="social-card douyin" href="https://www.douyin.com/search/%E8%A5%BF%E5%AE%89%E6%9D%8E%E5%8D%9A%E5%BE%8B%E5%B8%88" target="_blank" rel="noopener"><figure aria-label="西安李博律师抖音主页二维码"></figure><span>抖音</span></a>',
            '<a class="social-card rednote" href="https://www.xiaohongshu.com/search_result?keyword=%E8%A5%BF%E5%AE%89%E6%9D%8E%E5%8D%9A%E5%BE%8B%E5%B8%88" target="_blank" rel="noopener"><figure aria-label="西安李博律师小红书主页二维码"></figure><span>小红书</span></a>',
            '</div>',
            '<div class="prep-todo" aria-label="沟通前准备清单">',
            '<h3>沟通前准备</h3>',
            '<label><input type="checkbox" disabled><span>涉及开庭、仲裁、拘留、上诉等期限事项，请优先说明</span></label>',
            '<label><input type="checkbox" disabled><span>事情经过和关键时间线</span></label>',
            '<label><input type="checkbox" disabled><span>合同、通知、判决、传票等核心材料</span></label>',
            '<label><input type="checkbox" disabled><span>付款凭证、聊天记录、录音录像等证据</span></label>',
            '<label><input type="checkbox" disabled><span>目前最急的问题和希望达到的结果</span></label>',
            '</div>',
            '</section>'
        ].join("");

        Array.from(main.children).forEach((child) => {
            if (child !== hero) child.remove();
        });
        main.append(sections);
        if (footer) main.after(footer);

        const dots = document.createElement("nav");
        dots.className = "slide-dots";
        dots.setAttribute("aria-label", "首页分屏导航");
        [
            ["#top", "首页"],
            ["#practice", "业务"],
            ["#process", "方法"],
            ["#contact", "联系"]
        ].forEach(([href, label], index) => {
            const item = document.createElement("a");
            item.href = href;
            item.setAttribute("aria-label", label);
            item.setAttribute("aria-current", index === 0 ? "true" : "false");
            dots.append(item);
        });
        document.body.append(dots);
        const syncDotsVisibility = () => {
            dots.hidden = window.matchMedia("(max-width: 640px)").matches;
        };
        syncDotsVisibility();
        window.addEventListener("resize", syncDotsVisibility);
        const targets = Array.from(document.querySelectorAll(".home-slide"));
        const dotItems = Array.from(dots.querySelectorAll("a"));
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            dotItems.forEach((item) => {
                item.setAttribute("aria-current", item.getAttribute("href") === `#${visible.target.id}` ? "true" : "false");
            });
        }, { threshold: [0.55] });
        targets.forEach((target) => observer.observe(target));
        mountPracticeInteractions();
    }

    function updatePageContent() {
        const profileHeading = document.querySelector("#profile .section-heading h2");
        const profileParagraphs = document.querySelectorAll("#profile .section-heading p:not(.eyebrow)");
        if (profileHeading) profileHeading.textContent = "刑事辩护、劳动争议与企业合规";
        if (profileParagraphs.length >= 1) {
            profileParagraphs[0].textContent = "李博律师，手机：17392540021。提供刑事辩护、劳动争议代理及企业合规等法律服务，长期参与基层法律援助与公共法律服务。";
        }

        const cards = document.querySelectorAll("#practice .info-card");
        const practiceItems = [
            ["刑事业务", "刑事辩护", "围绕案件事实、证据合法性、程序权利和量刑情节开展工作，依法维护当事人合法权益。"],
            ["劳动争议", "劳动争议代理", "处理确认劳动关系、工资报酬、违法解除、工伤待遇、竞业限制等劳动仲裁与诉讼事项。"],
            ["企业服务", "企业合规", "协助企业识别合同、用工、知识产权、外包合作及日常经营中的法律风险。"]
        ];
        cards.forEach((card, index) => {
            const item = practiceItems[index];
            if (!item) return;
            const kicker = card.querySelector(".card-kicker");
            const heading = card.querySelector("h3");
            const body = card.querySelector("p");
            if (kicker) kicker.textContent = item[0];
            if (heading) heading.textContent = item[1];
            if (body) body.textContent = item[2];
        });

        const practiceLead = document.querySelector("#practice .section-heading p:not(.eyebrow)");
        if (practiceLead) {
            practiceLead.textContent = "当前主要展示以下服务方向。具体委托事项以案件事实、证据材料和正式沟通为准。";
        }

        const contact = document.querySelector("#contact .contact-panel");
        if (contact && !contact.querySelector(".contact-qr")) {
            const detail = contact.querySelector("p");
            if (detail) {
                detail.textContent = "可通过电话或微信沟通。正式咨询前，建议先整理基础事实、关键时间节点和已有材料。";
            }
            const action = contact.querySelector(".button");
            if (action) {
                const phone = document.createElement("a");
                phone.className = "button primary";
                phone.href = "tel:17392540021";
                phone.textContent = "拨打 17392540021";
                action.replaceWith(phone);
            }
            const qr = make("div", "contact-qr");
            qr.innerHTML = [
                '<img src="./assets/wechat-qr-liboli.jpg" alt="李博律师个人微信二维码">',
                '<div><strong>微信咨询</strong><span>扫码添加李博律师为好友</span></div>'
            ].join("");
            contact.append(qr);
        }

        const contactLead = document.querySelector("#contact .section-heading p:not(.eyebrow)");
        if (contactLead) {
            contactLead.textContent = "电话：17392540021。微信公众号、小红书、抖音账号均为：西安李博律师。";
        }
    }

    function mountCaseConsole() {
        const practice = document.querySelector("#practice");
        if (!practice || document.querySelector(".case-console")) return;

        const consoleEl = make("section", "case-console");
        consoleEl.setAttribute("aria-label", "案件准备互动区");
        consoleEl.innerHTML = [
            '<div class="case-console__panel">',
            '<p class="eyebrow">Interactive Intake</p>',
            "<h2>选一个事项，先看该准备什么</h2>",
            "<p>这不是正式法律意见，只是把初步沟通前最常见的准备动作做成一个可点的清单。</p>",
            '<div class="matter-picker"></div>',
            "</div>",
            '<div class="case-console__board">',
            '<p class="eyebrow">Preparation Board</p>',
            '<h2 id="matter-title"></h2>',
            '<p id="matter-intro"></p>',
            '<div class="progress-rail" aria-hidden="true"><i></i></div>',
            '<div class="board-grid"></div>',
            "</div>"
        ].join("");

        practice.before(consoleEl);

        const picker = consoleEl.querySelector(".matter-picker");
        const title = consoleEl.querySelector("#matter-title");
        const intro = consoleEl.querySelector("#matter-intro");
        const progress = consoleEl.querySelector(".progress-rail i");
        const board = consoleEl.querySelector(".board-grid");

        function render(key) {
            const matter = matters[key];
            title.textContent = matter.title;
            intro.textContent = matter.intro;
            progress.style.setProperty("--progress", matter.progress);
            board.replaceChildren(...matter.cards.map(([head, body]) => {
                const card = make("article", "board-card");
                card.append(make("strong", "", head), make("span", "", body));
                return card;
            }));
            picker.querySelectorAll("button").forEach((button) => {
                button.setAttribute("aria-pressed", button.dataset.matter === key ? "true" : "false");
            });
        }

        Object.entries(matters).forEach(([key, matter], index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.matter = key;
            button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
            button.innerHTML = '<i aria-hidden="true"></i><span></span>';
            button.querySelector("i").textContent = matter.icon;
            button.querySelector("span").textContent = matter.title;
            button.addEventListener("click", () => render(key));
            picker.append(button);
        });

        render("criminal");
    }

    function enhanceLoginPage() {
        const card = document.querySelector(".auth-card");
        const aside = document.querySelector(".auth-aside");
        if (!card || card.querySelector(".workspace-login-form")) return;

        const title = card.querySelector("h1");
        const intro = card.querySelector("p:not(.eyebrow)");
        if (title) title.remove();
        if (intro) intro.remove();

        const oldEntry = card.querySelector(".login-form");
        if (oldEntry) oldEntry.remove();
        const formNote = card.querySelector(".form-note");
        if (formNote) formNote.remove();

        const form = document.createElement("form");
        form.className = "workspace-login-form";
        form.noValidate = true;
        form.innerHTML = [
            '<label><input name="phone" inputmode="tel" autocomplete="tel" placeholder="手机号" aria-label="手机号"></label>',
            '<label><input name="code" type="password" autocomplete="current-password" placeholder="密码" aria-label="密码"></label>',
            '<button class="button primary" type="submit">进入工作台</button>'
        ].join("");
        card.append(form);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const phone = form.elements.phone.value.trim();
            const code = form.elements.code.value.trim().toUpperCase();
            if (phone !== "17392540021" || code !== "LB2026") {
                form.elements.code.value = "";
                form.elements.code.focus();
                return;
            }
            sessionStorage.setItem("workspaceVerified", "true");
            window.location.href = "./workspace.html";
        });

        if (aside) {
            aside.remove();
        }
    }

    function enhanceWorkspacePage() {
        if (sessionStorage.getItem("workspaceVerified") !== "true") {
            window.location.replace("./login.html?next=workspace");
            return;
        }

        const hero = document.querySelector(".workspace-hero");
        if (!hero) return;

        const title = hero.querySelector("h1");
        const intro = hero.querySelector("p:not(.eyebrow)");
        if (title) title.textContent = "李博律师工作台";
        if (intro) intro.textContent = "用于案件台账、材料目录、待办事项和文书模板的静态原型。当前不保存真实案件资料。";

        const banner = document.querySelector(".security-banner");
        if (banner && !banner.querySelector(".workspace-logout")) {
            banner.textContent = "已通过本地前端验证。本版本仍仅为静态原型。";
            const logout = document.createElement("button");
            logout.type = "button";
            logout.className = "workspace-logout";
            logout.textContent = "退出验证";
            logout.addEventListener("click", () => {
                sessionStorage.removeItem("workspaceVerified");
                window.location.href = "./login.html";
            });
            banner.append(logout);
        }

        const cards = document.querySelectorAll(".dashboard-card");
        const labels = [
            ["Case Ledger", "案件台账", "预留案件阶段、关键期限、待办状态和沟通记录位置。"],
            ["Materials", "材料目录", "预留证据分类、材料来源、证明目的和缺漏提示位置。"],
            ["Tasks", "待办事项", "预留庭期、举证期限、文书提交、客户沟通等事项。"],
            ["Templates", "文书模板", "预留起诉状、答辩状、代理词、证据目录等模板入口。"],
            ["Research", "法规检索", "预留法律、司法解释、部门规章、指导案例和裁判规则检索记录。"],
            ["Review", "办案复盘", "预留争议焦点、风险提示、沟通纪要和阶段成果整理入口。"]
        ];
        cards.forEach((card, index) => {
            const label = labels[index];
            if (!label) return;
            const kicker = card.querySelector(".card-kicker");
            const heading = card.querySelector("h2");
            const body = card.querySelector("p");
            if (kicker) kicker.textContent = label[0];
            if (heading) heading.textContent = label[1];
            if (body) body.textContent = label[2];
        });
    }

    ready(function () {
        const page = document.body.dataset.page;
        if (page === "workspace" && sessionStorage.getItem("workspaceVerified") !== "true") {
            window.location.replace("./login.html?next=workspace");
            return;
        }
        window.requestAnimationFrame(() => {
            waitFor(".site-nav", (nav) => {
                normalizeNavigation(page);
                nav.setAttribute("data-simplified", "true");
            });
            if (page === "home") waitFor(".hero-copy", () => {
                enhanceHero();
                replaceHomeSections();
            });
            if (page === "login") waitFor(".auth-card", enhanceLoginPage);
            if (page === "workspace") waitFor(".workspace-hero", enhanceWorkspacePage);
        });
    });
}());
