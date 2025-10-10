import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

// 默认路由配置
const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/LoginPage.vue')
    },
    {
        path:'/app',
        name:'App',
        component:App
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
