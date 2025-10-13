import { createRouter, createWebHistory } from 'vue-router'

// 默认路由配置
const routes = [
    {
        path: '/',
        name: 'Home',
        component:()=> import('../App.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/LoginPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router