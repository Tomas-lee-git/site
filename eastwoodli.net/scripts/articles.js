(function () {
    const articles = Array.isArray(window.LIBOLI_ARTICLES) ? window.LIBOLI_ARTICLES : [];

    function text(value) {
        return String(value || "").trim();
    }

    function formatDate(value) {
        if (!value) return "日期待补充";
        return value;
    }

    function matchArticle(article, query, category) {
        const selectedCategory = text(category);
        if (selectedCategory && article.category !== selectedCategory) return false;
        if (!query) return true;
        const haystack = [
            article.title,
            article.summary,
            article.category,
            ...(article.keywords || [])
        ].map(text).join(" ").toLowerCase();
        return haystack.includes(query.toLowerCase());
    }

    function createArticleCard(article) {
        const item = document.createElement("article");
        item.className = "article-card";

        const meta = document.createElement("p");
        meta.className = "article-card__meta";
        meta.textContent = [formatDate(article.date), text(article.category) || "未分类"].join(" · ");

        const title = document.createElement("h2");
        const link = document.createElement("a");
        link.href = article.url || `./${article.slug || ""}.html`;
        link.textContent = text(article.title) || "未命名文章";
        title.append(link);

        const summary = document.createElement("p");
        summary.textContent = text(article.summary) || "摘要待补充。";

        const keywords = document.createElement("div");
        keywords.className = "article-tags";
        (article.keywords || []).forEach((keyword) => {
            const tag = document.createElement("span");
            tag.textContent = keyword;
            keywords.append(tag);
        });

        item.append(meta, title, summary, keywords);
        return item;
    }

    function renderCategories(categories, activeCategory, onSelect) {
        const list = document.getElementById("category-list");
        if (!list) return;
        list.replaceChildren();

        const all = document.createElement("button");
        all.type = "button";
        all.textContent = "全部";
        all.setAttribute("aria-pressed", activeCategory ? "false" : "true");
        all.addEventListener("click", () => onSelect(""));
        list.append(all);

        categories.forEach((category) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = category;
            button.setAttribute("aria-pressed", activeCategory === category ? "true" : "false");
            button.addEventListener("click", () => onSelect(category));
            list.append(button);
        });
    }

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
            return;
        }
        fn();
    }

    ready(() => {
        const list = document.getElementById("article-list");
        const count = document.getElementById("article-count");
        const status = document.getElementById("article-status");
        const form = document.querySelector(".article-search");
        const input = document.getElementById("article-query");
        const categories = Array.from(new Set(articles.map((item) => text(item.category)).filter(Boolean)));
        let activeCategory = "";

        function render() {
            const query = text(input && input.value);
            const results = articles.filter((article) => matchArticle(article, query, activeCategory));

            if (count) count.textContent = `${results.length} 篇文章`;
            if (status) {
                status.textContent = articles.length
                    ? (query || activeCategory ? "已按当前条件筛选" : "已导入文章数据")
                    : "等待导入文章数据";
            }
            renderCategories(categories, activeCategory, (category) => {
                activeCategory = category;
                render();
            });

            if (!list) return;
            if (!results.length) {
                const empty = document.createElement("div");
                empty.className = "article-empty";
                empty.innerHTML = articles.length
                    ? "<h2>没有匹配文章</h2><p>请更换关键词或分类后再试。</p>"
                    : "<h2>文章整理中</h2><p>李律后续提供文章文件或清单后，可在这里批量生成列表和独立详情页。</p>";
                list.replaceChildren(empty);
                return;
            }
            list.replaceChildren(...results.map(createArticleCard));
        }

        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                render();
            });
        }
        if (input) input.addEventListener("input", render);
        render();
    });
}());
