import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'github-markdown-css/github-markdown-light.css'

import './styles/variables.css'
import './styles/global.css'

import ArticleApp from './ArticleApp.vue'

const app = createApp(ArticleApp)
app.use(ElementPlus)
app.mount('#articleApp')
