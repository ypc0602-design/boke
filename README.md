# 我的博客（Astro + Fluid 风格）

基于 **Astro** 的个人博客，界面参考 [hexo-theme-fluid](https://github.com/fluid-dev/hexo-theme-fluid) 风格重构。
包含：文章列表、文章页目录（TOC）、Shiki 代码高亮、明暗主题切换、图片灯箱、返回顶部。

## ✨ 功能

- ✅ 博客式布局：首页 + 文章列表 + 文章页
- ✅ 文章页自动生成目录（TOC），支持滚动高亮当前章节
- ✅ Shiki 代码高亮（github-dark 主题）
- ✅ 明暗主题切换（localStorage 记忆 + 跟随系统）
- ✅ 图片点击灯箱预览
- ✅ 返回顶部按钮
- ✅ RSS + Sitemap + SEO meta
- ✅ GitHub Actions 自动部署到 GitHub Pages

## 🚀 本地开发

```sh
npm install
npm run dev        # 开发服务器 http://localhost:4321
npm run build      # 构建到 ./dist
npm run preview    # 本地预览构建产物
```

## 📁 项目结构

```text
├── public/            # 静态资源（favicon 等）
├── src/
│   ├── assets/        # 图片、字体
│   ├── components/    # Header / Footer / BaseHead 等
│   ├── content/blog/  # 文章（Markdown/MDX，frontmatter 含 title/description/pubDate）
│   ├── layouts/       # BlogPost 布局（含目录、灯箱、返回顶部）
│   ├── pages/         # index / blog / technology / about / rss.xml
│   └── styles/        # 全局样式（CSS 变量主题系统）
├── astro.config.mjs   # site 与 base 配置
└── .github/workflows/deploy.yml  # 自动部署
```

## 🖥 部署到 GitHub Pages

站点通过 **GitHub Actions 自动部署**（推送到 `main` 即自动发布）。

### 一次性配置（首次）

1. **仓库设置** → **Pages**：
   - Source 选择 **GitHub Actions**（不是 Deploy from a branch）

2. 之后每次 `git push` 到 `main`，Actions 会自动构建并部署。

### 手动部署（不使用 Actions 时）

```sh
npm run build
# 然后把 dist/ 内容推到 gh-pages 分支或仓库根
```

## 🎨 写新文章

在 `src/content/blog/` 新建 `.md` 文件：

```md
---
title: '文章标题'
description: '文章摘要'
pubDate: '2026-10-23'
---

正文内容…
```

> ⚠️ 图片、超链接、代码块均支持；标题会**自动生成目录**。
