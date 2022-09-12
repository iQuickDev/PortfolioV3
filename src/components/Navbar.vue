<script setup lang="ts">
import { onMounted } from 'vue'
import router from '../router/router'
onMounted(() => {
    router.afterEach(() => {
        //@ts-ignore
        for (const el of document.querySelectorAll('nav h3') as HTMLElement[]) {
            if (el.textContent?.toLowerCase() == (router.currentRoute.value.name as string).toLowerCase())
            el.classList.add('selected')
            else
            el.classList.remove('selected')
        }
    })
})
</script>

<template>
    <nav>
        <h3 @click="$router.push('/')">Home</h3>
        <h3 @click="$router.push('/projects')">Projects</h3>
        <h3 @click="$router.push('/about')">About</h3>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    animation: glow 1s linear infinite;
    background: transparent;
    width: 80%;
    margin: auto;
    margin-top: 1.5%;
    margin-bottom: 1%;
    font-size: 1.2rem;
    transition: .3s;
}

nav * {
    cursor: pointer;
}

@keyframes glow {
    0% {
        text-shadow: 5px 0px 5px #FFF;
    }

    25% {
        text-shadow: 0px 5px 5px #FFF;
    }

    50% {
        text-shadow: -5px 0px 5px #FFF;
    }

    75% {
        text-shadow: 0px -5px 5px #FFF;
    }

    100% {
        text-shadow: 5px 0px 5px #FFF;
    }
}

nav h3:hover {
    text-shadow: 0px 0px 10px #e443de;
    color: #e443de;
    text-decoration: underline;
    transition: .3s;
}

.selected {
    text-shadow: 0px 0px 10px #e443de;
    color: #e443de;
    transition: .3s;
}
</style>