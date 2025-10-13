# MathNB - 数学笔记网站

一个基于 Vue 3 的数学笔记静态网站，支持 Markdown 渲染和 MathJax 数学公式。

## ✨ 特性

- 📝 **Markdown 支持**：使用 Marked.js 渲染 Markdown 文档
- 🧮 **数学公式**：支持行内公式 `$...$` 和块级公式 `$$...$$`
- 📚 **侧边栏导航**：多级目录结构，支持嵌套分组
- 📖 **目录生成**：自动提取 h2-h4 标题生成文章导航
- 🎨 **现代 UI**：使用 GitHub Markdown 样式和 Element Plus 组件
- 📱 **响应式设计**：支持移动端和桌面端
- ⚡ **快速构建**：基于 Vite 的多页应用（MPA）架构

## 🛠️ 技术栈

- **框架**：Vue 3 (Composition API)
- **构建工具**：Vite 7
- **Markdown 解析**：Marked.js
- **数学公式**：MathJax (本地化)
- **UI 组件**：Element Plus
- **样式**：GitHub Markdown CSS

## 📂 项目结构

```
MathNB/
├── src/                    # 源代码
│   ├── components/         # Vue 组件
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── Sidebar.vue
│   │   └── TableOfContents.vue
│   ├── pages/              # 页面组件
│   │   ├── HomePage.vue
│   │   └── ArticlePage.vue
│   ├── utils/              # 工具函数
│   │   └── markdown-parser.js
│   ├── styles/             # 样式文件
│   └── config.js           # 配置文件
├── public/                 # 静态资源
│   ├── docs/               # Markdown 文档
│   │   └── 数学分析/
│   └── mathjax.js          # MathJax 本地文件
├── index.html              # 首页入口
├── article.html            # 文章页入口
└── vite.config.js          # Vite 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览构建产物

```bash
npm run preview
```

## 📝 添加文章

1. 在 `public/docs/` 目录下创建 Markdown 文件
2. 在 `src/config.js` 中配置侧边栏导航
3. Markdown 文件支持标准语法和数学公式

### 示例

```markdown
# 文章标题

## 行内公式
勾股定理：$a^2 + b^2 = c^2$

## 块级公式
$$
\int_0^1 x^2 dx = \frac{1}{3}
$$
```

## ⚙️ 配置

编辑 `src/config.js` 配置科目和侧边栏：

```javascript
export const subjects = [
  {
    name: '数学分析',
    link: '/数学分析/测试文章',
  },
]

export const sidebar = [
  {
    text: '数学分析',
    items: [
      { text: '测试文章', link: '/数学分析/测试文章' },
    ]
  },
]
```

## 📋 系统要求

- Node.js >= 20.19.0 或 >= 22.12.0

## 📄 许可证

MIT
