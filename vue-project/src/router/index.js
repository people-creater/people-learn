import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'Home - Personal Portfolio',
            description: 'Welcome to my personal portfolio website'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            title: 'About Me - Personal Portfolio',
            description: 'Learn more about my background, skills, and experience'
        }
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: () => import('../views/Portfolio.vue'),
        meta: {
            title: 'Portfolio - My Work',
            description: 'Explore my latest projects and creative work'
        }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue'),
        meta: {
            title: 'Blog - Insights & Thoughts',
            description: 'Read my latest articles on design, development, and creativity'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
        meta: {
            title: 'Contact Me - Get In Touch',
            description: 'Ready to work together? Let\'s get in touch and create something amazing'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.meta.description) {
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
            metaDescription.setAttribute('content', to.meta.description)
        }
    }
    next()
})

export default router