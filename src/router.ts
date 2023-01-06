import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('./pages/Home.vue')

const routes = [
    { path: '/', name:'home', component: Home },
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

export default router;