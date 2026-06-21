#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import shutil
from datetime import date
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = Path("/Users/muli/Library/Mobile Documents/com~apple~CloudDocs/李律/独立执业阶段/微信公众号/公众号文章下载")
PUBLIC_BASE = "https://www.eastwoodli.net"

COLLECTIONS = {
    "西安李博律师-劳动争议": "劳动争议",
    "西安李博律师-民商代理": "民商代理",
    "西安李博律师-生活感悟": "生活感悟",
    "西安李博律师-社会热点": "社会热点",
    "西安李博律师-刑事辩护": "刑事辩护",
}

EXCLUDED_TITLE_PREFIXES = {
    "民商代理": ("学法|",),
}

VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def strip_tags(value: str) -> str:
    value = re.sub(r"<script\b[^>]*>.*?</script>", "", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", "", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", "", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def extract_first(pattern: str, text: str, default: str = "") -> str:
    match = re.search(pattern, text, flags=re.I | re.S)
    if not match:
        return default
    return html.unescape(strip_tags(match.group(1))).strip()


def find_matching_div(text: str, start: int) -> int:
    depth = 0
    tag_pattern = re.compile(r"<(/?)([a-zA-Z][\w:-]*)(?:\s[^>]*)?>", re.S)
    for match in tag_pattern.finditer(text, start):
        closing, tag = match.group(1), match.group(2).lower()
        if tag != "div":
            continue
        raw = match.group(0)
        if closing:
            depth -= 1
            if depth == 0:
                return match.start()
        elif tag not in VOID_TAGS and not raw.rstrip().endswith("/>"):
            depth += 1
    return -1


def extract_js_content(text: str) -> str:
    start_match = re.search(r"<div\b[^>]*\bid=[\"']js_content[\"'][^>]*>", text, flags=re.I | re.S)
    if not start_match:
        return ""
    content_start = start_match.end()
    content_end = find_matching_div(text, start_match.start())
    if content_end == -1:
        return ""
    return text[content_start:content_end]


def make_slug(raw: str, used: set[str]) -> str:
    digest = hashlib.sha1(raw.encode("utf-8")).hexdigest()[:8]
    date_part = raw[:10] if re.match(r"\d{4}-\d{2}-\d{2}", raw) else "article"
    slug = f"{date_part}-{digest}"
    suffix = 2
    base = slug
    while slug in used:
        slug = f"{base}-{suffix}"
        suffix += 1
    used.add(slug)
    return slug


def normalize_publish_date(folder_name: str, publish_time: str) -> str:
    folder_match = re.match(r"(\d{4}-\d{2}-\d{2})", folder_name)
    if folder_match:
        return folder_match.group(1)
    time_match = re.search(r"(\d{4})年(\d{2})月(\d{2})日", publish_time)
    if time_match:
        return "-".join(time_match.groups())
    return ""


def clean_content(content: str, source_dir: Path, slug: str) -> tuple[str, list[str]]:
    content = re.sub(r"<script\b[^>]*>.*?</script>", "", content, flags=re.I | re.S)
    content = re.sub(r"<style\b[^>]*>.*?</style>", "", content, flags=re.I | re.S)
    content = re.sub(r"<section\b[^>]*class=[\"'][^\"']*mp_profile_iframe_wrp[^\"']*[\"'][^>]*>.*?</section>", "", content, flags=re.I | re.S)
    content = re.sub(r"<mp-common-profile\b[^>]*>.*?</mp-common-profile>", "", content, flags=re.I | re.S)
    content = re.sub(r"<p[^>]*display:\s*none[^>]*>.*?</p>", "", content, flags=re.I | re.S)
    content = re.sub(r"\s(?:on\w+)=(\"[^\"]*\"|'[^']*')", "", content, flags=re.I)
    content = re.sub(r"<h1\b", "<h2", content, flags=re.I)
    content = re.sub(r"</h1>", "</h2>", content, flags=re.I)

    copied_assets: list[str] = []
    asset_dir = SITE_ROOT / "articles" / "assets" / slug
    image_exts = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}

    def replace_src(match: re.Match[str]) -> str:
        quote = match.group(1)
        src = html.unescape(match.group(2))
        if src.startswith("./assets/"):
            source = source_dir / src[2:]
            if source.exists() and source.suffix.lower() in image_exts:
                asset_dir.mkdir(parents=True, exist_ok=True)
                target = asset_dir / source.name
                if not target.exists():
                    shutil.copy2(source, target)
                copied_assets.append(str(target.relative_to(SITE_ROOT)))
                return f"src={quote}./assets/{slug}/{html.escape(source.name, quote=True)}{quote}"
        return match.group(0)

    content = re.sub(r"src=(['\"])([^'\"]+)\1", replace_src, content, flags=re.I)
    return content.strip(), sorted(set(copied_assets))


def build_article_html(article: dict[str, object], content: str) -> str:
    title = str(article["title"])
    summary = str(article["summary"])
    category = str(article["category"])
    publish_date = str(article["date"])
    canonical = f"{PUBLIC_BASE}/articles/{article['slug']}.html"
    json_ld = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": summary,
        "datePublished": publish_date or None,
        "dateModified": publish_date or None,
        "author": {"@type": "Person", "name": "李博"},
        "publisher": {"@type": "Person", "name": "李博"},
        "mainEntityOfPage": canonical,
        "inLanguage": "zh-CN",
        "articleSection": category,
    }
    json_ld = {k: v for k, v in json_ld.items() if v is not None}

    return f"""<!doctype html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{html.escape(summary, quote=True)}">
    <link rel="canonical" href="{canonical}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="zh_CN">
    <meta property="og:site_name" content="李博律师个人网站">
    <meta property="og:title" content="{html.escape(title, quote=True)}">
    <meta property="og:description" content="{html.escape(summary, quote=True)}">
    <meta property="og:url" content="{canonical}">
    <link rel="icon" href="../favicon.svg" type="image/svg+xml">
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <title>{html.escape(title)} | 李博律师</title>
    <link rel="stylesheet" href="../styles/site.css">
    <link rel="stylesheet" href="../styles/articles.css">
    <script type="application/ld+json">
      {json.dumps(json_ld, ensure_ascii=False, indent=6)}
    </script>
</head>

<body data-page="article-detail">
    <header class="site-header">
        <a class="brand" href="/index.html" aria-label="返回首页">
            <span class="brand-mark">律</span>
            <span>
                <strong>李博律师</strong>
                <small>陕西泾渭分明律师事务所</small>
            </span>
        </a>
        <nav class="site-nav" aria-label="主导航">
            <a href="/index.html">首页</a>
            <a href="/articles/index.html">专业文章</a>
            <a href="/login.html">律师工作台</a>
            <a href="/index.html#contact">联系</a>
        </nav>
    </header>

    <main class="article-detail">
        <article class="article-body">
            <a class="text-link" href="/articles/index.html">返回文章列表</a>
            <p class="eyebrow">{html.escape(category)}</p>
            <h1>{html.escape(title)}</h1>
            <p class="article-meta">发布日期：{html.escape(publish_date or "日期待补充")} · 原载于微信公众号</p>
            <p class="article-summary">{html.escape(summary)}</p>
            <div class="article-content wechat-article-content">
{content}
            </div>
            <section class="article-source">
                <h2>出处说明</h2>
                <p>本文整理自李博律师微信公众号已发布文章。站内发布用于归档、检索和阅读，具体内容以原始发布记录为准。</p>
            </section>
            <section class="article-comments">
                <h2>交流与补充</h2>
                <p>本网站暂不开放公开评论。如需就文章内容进一步沟通，可通过首页联系方式联系李博律师。</p>
            </section>
        </article>
    </main>

    <footer class="site-footer">
        <p>© 李博律师个人网站。公开内容以实际确认信息为准。</p>
        <a href="/index.html#contact">联系李博律师</a>
    </footer>
</body>

</html>
"""


def should_publish(category: str, title: str) -> bool:
    excluded_prefixes = EXCLUDED_TITLE_PREFIXES.get(category, ())
    return not any(title.startswith(prefix) for prefix in excluded_prefixes)


def collect_articles() -> list[dict[str, object]]:
    used_slugs: set[str] = set()
    articles: list[dict[str, object]] = []
    for folder_name, category in COLLECTIONS.items():
        collection_dir = SOURCE_ROOT / folder_name
        for source_file in sorted(collection_dir.glob("*/index.html")):
            source_dir = source_file.parent
            raw = read_text(source_file)
            folder_title = re.sub(r"^\d{4}-\d{2}-\d{2}\s+", "", source_dir.name).strip()
            title = extract_first(r"<title>(.*?)</title>", raw, folder_title) or folder_title
            title = extract_first(r"<span\b[^>]*class=[\"'][^\"']*js_title_inner[^\"']*[\"'][^>]*>(.*?)</span>", raw, title) or title
            if not should_publish(category, title):
                continue
            publish_time = extract_first(r"<em\b[^>]*id=[\"']publish_time[\"'][^>]*>(.*?)</em>", raw)
            publish_date = normalize_publish_date(source_dir.name, publish_time)
            slug = make_slug(f"{source_dir.name}-{category}", used_slugs)
            content = extract_js_content(raw)
            clean_html, copied_assets = clean_content(content, source_dir, slug)
            plain_text = strip_tags(clean_html)
            summary = plain_text[:156] + ("..." if len(plain_text) > 156 else "")
            article = {
                "title": title,
                "slug": slug,
                "url": f"./{slug}.html",
                "date": publish_date,
                "category": category,
                "keywords": [category, "李博律师", "西安律师"],
                "summary": summary or title,
                "sourceName": "微信公众号",
                "sourceUrl": "",
                "assetCount": len(copied_assets),
                "_content": clean_html,
            }
            articles.append(article)
    articles.sort(key=lambda item: (str(item["date"]), str(item["title"])), reverse=True)
    return articles


def write_data_js(articles: list[dict[str, object]]) -> None:
    public_articles = [{k: v for k, v in article.items() if not k.startswith("_")} for article in articles]
    target = SITE_ROOT / "articles" / "data.js"
    target.write_text("window.LIBOLI_ARTICLES = " + json.dumps(public_articles, ensure_ascii=False, indent=4) + ";\n", encoding="utf-8")


def write_sitemap(articles: list[dict[str, object]]) -> None:
    today = date.today().isoformat()
    urls = [
        (f"{PUBLIC_BASE}/", "monthly", "1.0", today),
        (f"{PUBLIC_BASE}/articles/", "weekly", "0.8", today),
    ]
    for article in articles:
        urls.append((f"{PUBLIC_BASE}/articles/{article['slug']}.html", "monthly", "0.7", str(article["date"] or today)))
    body = "\n".join(
        "  <url>\n"
        f"    <loc>{html.escape(loc)}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <changefreq>{changefreq}</changefreq>\n"
        f"    <priority>{priority}</priority>\n"
        "  </url>"
        for loc, changefreq, priority, lastmod in urls
    )
    (SITE_ROOT / "sitemap.xml").write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n', encoding="utf-8")


def main() -> None:
    articles_dir = SITE_ROOT / "articles"
    articles_dir.mkdir(parents=True, exist_ok=True)
    articles = collect_articles()
    for article in articles:
        target = articles_dir / f"{article['slug']}.html"
        target.write_text(build_article_html(article, str(article["_content"])), encoding="utf-8")
    write_data_js(articles)
    write_sitemap(articles)
    print(f"imported {len(articles)} articles")
    by_category: dict[str, int] = {}
    for article in articles:
        by_category[str(article["category"])] = by_category.get(str(article["category"]), 0) + 1
    for category, count in sorted(by_category.items()):
        print(f"{category}: {count}")


if __name__ == "__main__":
    main()
