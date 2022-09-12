import Home from '../views/Home.vue';
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router