<script setup lang="ts">

</script>

<template>
<nav>
<h3 @click="$router.push('/projects')">Projects</h3>
<h3 @click="$router.push('/about')">About</h3>
<h3 @click="$router.push('/skills')">Skills</h3>
<h3>Media</h3>
</nav>
</template>

<style scoped>
nav
{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    animation: glow 1s linear infinite;
    background: transparent;
    width: 80%;
    margin: auto;
    font-size: 1.2rem;
    transition: .3s;
}

nav *
{
    cursor: pointer;
}

@keyframes glow
{
    0%
    {
        text-shadow: 5px 0px 5px #FFF;
    }
    25%
    {
        text-shadow: 0px 5px 5px #FFF;
    }
    50%
    {
        text-shadow: -5px 0px 5px #FFF;
    }
    75%
    {
        text-shadow: 0px -5px 5px #FFF;
    }
    100%
    {
        text-shadow: 5px 0px 5px #FFF;
    }
}

nav h3:hover
{
    text-shadow: 0px 0px 10px #e443de;
    color: #e443de;
    text-decoration: underline;
    transition: .3s;
}

</style>