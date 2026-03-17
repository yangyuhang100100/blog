## 🛠 博客开发技术文档

> 小白的个人学习站（VitePress）。写完 Markdown，`git push` 后 Vercel 自动部署更新。

### 1. 技术栈选型 (基于你的需求)

- **框架:** [VitePress](https://vitepress.dev/) (Vue 驱动的静态站点生成器，快如闪电)。
- **部署:** [Vercel](https://vercel.com/) (自动化部署，全球 CDN)。
- **样式:** VitePress 默认主题 + 自定义 CSS (用于简历美化)。
- **辅助:** PicGo + GitHub (图床)。

### 2. 项目结构设计

你可以直接新建文件夹并按照以下结构初始化：

Plaintext

```
my-blog/
├── .vitepress/          # 核心配置文件夹
│   ├── config.mts       # 站点导航、侧边栏、SEO配置
│   └── theme/           # 主题扩展（放你的简历样式）
├── public/              # 静态资源（PDF简历、头像）
├── posts/               # 学习笔记 Markdown 文件
├── projects/            # 作品集展示页
├── about.md             # 个人简历/关于我
└── index.md             # 首页（大牌感入口）
```

#### 第一步：初始化环境 (在 Cursor Terminal 执行)

在 Cursor 的终端输入以下命令：

Bash

```
npm add -D vitepress vue
npx vitepress init
```

> **AI 提示词技巧：** 当初始化完成后，选中生成的 `config.mts`，按 `Ctrl+K` 输入：*"请帮我配置导航栏，包含‘学习笔记’、‘作品集’、‘关于我’，并开启全文搜索功能。"*

#### 第二步：打造“展示派”首页

修改 `index.md`，使用 VitePress 的 `home` 布局。

> **AI 提示词技巧：** 选中 `index.md` 的内容，按 `Ctrl+K` 输入：*"我需要一个专业且极简的程序员首页，Hero 部分标题为‘[你的名字]的知识空间’，副标题是‘持续学习者 / 全栈开发 / 笔记沉淀’，添加两个按钮：‘阅读笔记’和‘查看作品集’。"*

#### 第三步：集成“求职专用”简历页

在 `about.md` 中编写你的简历。

> **AI 提示词技巧：** 打开 `about.md`，按 `Ctrl+L` (Chat) 告诉 Cursor：*"我是一名[你的专业]学生，请帮我生成一个优雅的 Markdown 简历模板，包含教育背景、专业技能（带进度条感官）、实习经历和 GitHub 项目展示。"*

------

### 4. 关键功能配置表

| **需求点**     | **实现方式**         | **Cursor 指令建议**                          |
| -------------- | -------------------- | -------------------------------------------- |
| **代码高亮**   | VitePress 内置 Shiki | "优化代码块显示，使用 monokai 主题"          |
| **数学公式**   | Markdown-it-mathjax  | "帮我在 config 中集成 MathJax 支持 LaTeX"    |
| **图片灯箱**   | 插件或原生扩展       | "为所有文章图片添加点击放大效果"             |
| **响应式排版** | 内置 CSS 变量        | "调整移动端下的字体大小和行间距，优化阅读感" |

------

### 5. 部署流程 (只需一次配置)

1. 将代码提交到 **GitHub**。
2. 登录 **Vercel**，关联该仓库。
3. **配置命令：** Build Command 设置为 `npm run docs:build`，Output Directory 设置为 `.vitepress/dist`。
4. **结果：** 以后你每里写完一篇笔记并 `git push`，你的域名地址会自动更新内容。

------

### 6. 学习与维护建议

- **利用 Cursor Tab：** 当你在写技术笔记时，Cursor 会根据你的上下文自动预测下一段代码或解释，极大地提高写作速度。
- **定期重构：** 随着你学习深入，可以随时让 Cursor 帮你把博客首页改成更酷炫的 3D 或交互式效果。
