import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('./pages/Home.vue')
const Single = () => import('./pages/Single.vue')
const Category = () => import('./pages/Category.vue')

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/products/:id', name: 'single', component: Single },
    { path: '/products/category/:slug', name: 'category', component: Category },
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

export default router;