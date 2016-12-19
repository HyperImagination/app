// import Vue from 'vue'
// import App from './App'

//  eslint-disable no-new 
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import App from './App'

//启用Vue路由
Vue.use(VueRouter)

//启用Axios
Vue.http = Vue.prototype.$http = Axios.create({
    baseURL: `http://127.0.0.1:3001/`,
    // timeout: 3000
})

//导入UI组件库
import { Radio, DatetimePicker, Popup, Header, Cell, Button, Field, Navbar, TabItem, Tabbar, Checklist, Swipe, Actionsheet, InfiniteScroll, TabContainer, TabContainerItem } from 'mint-ui'
//启用各类组件
Vue.use(InfiniteScroll);
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Header.name, Header)
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Checklist.name, Checklist);
Vue.component(Swipe.name, Swipe);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Navbar.name, Navbar);
Vue.component(Popup.name, Popup);
Vue.component(Radio.name, Radio);
//上传组件
import Upload from './components/Upload.vue'
Vue.component(Upload.name, Upload)

//导入路由配置
import routes from './config/routers.js'

//路由实例化
const router = new VueRouter({ routes })
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
