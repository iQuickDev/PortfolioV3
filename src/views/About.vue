<script setup lang="ts">
import HorizontalDivider from '../components/HorizontalDivider.vue'
import pfp from '../assets/pfp.png'
</script>

<template>
    <div class="about-wrapper">
        <div class="personal container">
            <h1>Personal</h1>
            <HorizontalDivider />
            <img class="pfp" :src="pfp">
            <div class="contacts">
                <ul>
                    <li>GitHub</li>
                    <li>Discord</li>
                    <li>TODO: add icons</li>
                </ul>
            </div>
        </div>
        <div class="info container">
            <h1>Info</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis atque rem, assumenda voluptatibus
                explicabo
                aspernatur ratione totam numquam illum odio enim dicta obcaecati at sed accusantium ea quo facere
                inventore.
            </p>
            <hr>
            <h2>Some other title</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque nulla voluptatibus illum consequatur.
                Qui ab
                magni fuga velit minus facilis aliquid adipisci consectetur delectus repellendus. Sed esse amet rem
                dolore.
            </p>
        </div>
    </div>
</template>

<style scoped>
.about-wrapper {
    height: 93vh;
}

.container {
    border: 2px solid #e443de;
    border-radius: 10px;
    backdrop-filter: blur(3px);
    padding: 5px;
    background: #0005;
}

.personal {
    position: absolute;
    width: 22%;
    height: 60vh;
    left: 1rem;
    text-align: center;
}

.personal h1 {
    text-align: center;
    padding: 5px;
}

.contacts {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 15%;
}

.contacts ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

.info {
    left: 25vw;
    position: absolute;
    width: 70%;
    height: 80vh;
    margin: auto auto auto auto;
}

.pfp {
    border: 2px solid #e443de;
    border-radius: 50%;
    width: 120px;
    margin-bottom: 15px;
}

@media screen and (max-width: 1300px) {
    .info {
        left: 35vw;
        width: 60%;
    }

    .personal {
        width: 30%;
    }
}

@media screen and (max-width: 800px) {
    /* todo */
}

@media screen and (max-width: 600px) {
    .about-wrapper {
        overflow: auto;
    }

    .container {
        margin: auto;
        position: initial;
        width: 90%;
        margin-bottom: 15px;
    }
}
</style>