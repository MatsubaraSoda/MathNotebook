import { marked } from 'marked'

// TOC 层级配置（只提取 h2-h4）
const outlineLevel = [2, 4]

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

// 保护数学公式：在 Marked 处理前提取，用占位符替换
function protectMath(markdown) {
  const blocks = []
  const inlines = []
  
  // 提取块级公式 $$...$$（多行）
  let result = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (match) => {
    blocks.push(match)
    return `MATHBLOCK${blocks.length - 1}MATHBLOCK`
  })
  
  // 提取行内公式 $...$
  result = result.replace(/\$([^\$\n]+?)\$/g, (match) => {
    inlines.push(match)
    return `MATHINLINE${inlines.length - 1}MATHINLINE`
  })
  
  return { result, blocks, inlines }
}

// HTML 转义函数：防止公式中的 <、> 等被浏览器当作标签
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// 恢复数学公式：Marked 处理后还原，并转义 HTML 特殊字符
function restoreMath(html, blocks, inlines) {
  // 恢复块级公式
  html = html.replace(/MATHBLOCK(\d+)MATHBLOCK/g, (match, index) => {
    return escapeHtml(blocks[index])
  })
  
  // 恢复行内公式
  html = html.replace(/MATHINLINE(\d+)MATHINLINE/g, (match, index) => {
    return escapeHtml(inlines[index])
  })
  
  return html
}

// 提取标题生成 TOC
function generateTOC(markdown) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc = []
  let match
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    
    // 只提取指定层级
    if (level >= outlineLevel[0] && level <= outlineLevel[1]) {
      const id = text.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5-\d]/g, '')  // 保留数字
      
      toc.push({ level, text, id })
    }
  }
  
  return toc
}

// 自定义 renderer：给标题添加 id
const renderer = {
  heading({ text, depth }) {
    const id = text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5-\d]/g, '')  // 保留数字
    
    return `<h${depth} id="${id}">${text}</h${depth}>`
  }
}

// 注册自定义 renderer
marked.use({ renderer })

// 解析 markdown 为 HTML，并生成 TOC
export function parseMarkdown(markdown) {
  // 1. 保护数学公式
  const { result, blocks, inlines } = protectMath(markdown)
  
  // 2. 生成 TOC（使用保护后的文本）
  const toc = generateTOC(result)
  
  // 3. Marked 解析
  let html = marked.parse(result)
  
  // 4. 恢复数学公式
  html = restoreMath(html, blocks, inlines)
  
  return { html, toc }
}
