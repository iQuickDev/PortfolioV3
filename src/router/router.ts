import Home from '../views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) =>
{
    if (to.name != 'Home' && from.name == "Home")
    window.retrowave.flyAway()
})

export default router