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

    function enhanceHero() {
        const heroCopy = document.querySelector(".hero-copy");
        const heroPanel = document.querySelector(".hero-panel");
        if (!heroCopy || !heroPanel) return;

        const title = heroCopy.querySelector("h1");
        const lede = heroCopy.querySelector(".hero-lede");
        if (title) title.textContent = "李博律师";
        if (lede) {
            lede.textContent = "提供刑事辩护、劳动争议代理及企业合规等法律服务，长期参与基层法律援助与公共法律服务。";
        }

        const strip = make("div", "signal-strip");
        [
            ["刑事业务", "刑事辩护与程序权利维护"],
            ["劳动争议", "劳动仲裁与诉讼代理"],
            ["企业服务", "企业合同、用工与经营风险"]
        ].forEach(([strongText, spanText], index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
            button.append(make("strong", "", strongText), make("span", "", spanText));
            button.addEventListener("click", () => {
                strip.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
                button.setAttribute("aria-pressed", "true");
            });
            strip.append(button);
        });
        heroCopy.append(strip);

        const heading = heroPanel.querySelector("h2");
        if (heading) heading.textContent = "联系李博律师";
        const list = heroPanel.querySelector(".status-list");
        if (list) {
            list.replaceChildren(
                make("li", "", "手机：17392540021"),
                make("li", "", "微信公众号、小红书、抖音：西安李博律师"),
                make("li", "", "执业地区：陕西西安")
            );
        }
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
            if (page === "home") waitFor(".hero-copy", () => {
                enhanceHero();
                updatePageContent();
                mountCaseConsole();
            });
            if (page === "login") waitFor(".auth-card", enhanceLoginPage);
            if (page === "workspace") waitFor(".workspace-hero", enhanceWorkspacePage);
        });
    });
}());
