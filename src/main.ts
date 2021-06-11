import { createApp } from 'vue'
import App from './App.vue'
import '../style/index.scss'
import { Antd, AntdIcon } from './assets/plugins'
import './registerServiceWorker'
import router from './app/router'
import store from './app/store'
import CommonPart from './common'
import { MenuServiceKey, MenuService } from '@/common/services'

const app = createApp(App).use(store).use(router).use(CommonPart).use(Antd).use(AntdIcon)
app.provide(MenuServiceKey, new MenuService())

app.mount('#app')
