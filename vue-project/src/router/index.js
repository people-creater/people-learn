import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// 默认路由配置
const routes = [
    {
        path: '/',
        name: 'Home',
        component: App
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
