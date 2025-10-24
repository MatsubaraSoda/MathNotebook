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
    name: '工具类',
    link: '/工具类/三角函数',
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
          { text: '测试', link: '/数学分析/Baby Rudin/测试' },
        ]
      },
    ]
  },
  {
    text: '工具类',
    items: [
      { text: '三角函数', link: '/工具类/三角函数' },
      { text: '一阶线性微分方程', link: '/工具类/一阶线性微分方程' },
      { text: '二维一阶齐次线性常微分方程组', link: '/工具类/二维一阶齐次线性常微分方程组'}
    ]
  }
]
