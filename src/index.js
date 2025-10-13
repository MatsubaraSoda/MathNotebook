import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './styles/variables.css'
import './styles/global.css'

import IndexApp from './IndexApp.vue'

const app = createApp(IndexApp)
app.use(ElementPlus)
app.mount('#indexApp')
