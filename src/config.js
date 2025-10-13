/**
 * 文档配置（极简版）
 */

// 科目配置
export const subjects = [
  {
    name: '数学分析',
    link: '/数学分析/Baby Rudin/戴德金分割构造实数系',
  },
  {
    name: '常微分方程',
    link: '/常微分方程',
  },
]

// 侧边栏配置
export const sidebar = [
  {
    text: '数学分析',
    items: [
      {
        text: 'Baby Rudin',
        items: [
          { text: '戴德金分割构造实数系', link: '/数学分析/Baby Rudin/戴德金分割构造实数系' },
          { text: '康托尔对角线论证', link: '/数学分析/Baby Rudin/康托尔对角线论证' },
          // { text: '基础拓扑学', link: '/数学分析/Baby Rudin/基础拓扑学' },
        ]
      },
    ]
  },
]
