import { createRouter, createWebHistory } from 'vue-router'

// 默认路由配置
const routes = [
    {
        path: '/',
        name: 'App',
        component: () => import('../App.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component:()=> import('../views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router