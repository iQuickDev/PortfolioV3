<script setup lang="ts">
import HorizontalDivider from '../components/HorizontalDivider.vue'
import pfp from '../assets/images/pfp.png'
import discord from '../assets/images/discord.png'
import github from '../assets/images/github.png'
import telegram from '../assets/images/telegram.png'
import instagram from '../assets/images/instagram.png'
import youtube from '../assets/images/youtube.png'

//@ts-ignore
let age: string = (Math.abs(new Date('2004-09-10T00:00:00+0100').getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 365)).toFixed(0)

</script>

<template>
    <div class="about-wrapper">
        <div class="personal container">
            <h1>Personal</h1>
            <HorizontalDivider />
            <img class="pfp" :src="pfp">
            <div class="data">
                <p class="description">Hi, my name is Leonardo and i am a {{age}} years old Full Stack Developer based in Italy. Programming
                    has been my
                    passion since 2019 and i'm pursuing it by making lots of personal projects as well as school ones. I
                    really enjoy exploring open source software like linux and GNU, i think that FOSS gives a lot of
                    benefits to the community and the developers to build better software with the help from all over
                    the world. Take a look at my skills on the panel to the right and my social networks right below
                    this presentation.
                </p>
            </div>
            <div class="contacts">
                <a href="https://github.com/iQuickDev" target="_target"><img id="github" :src="github"></a>
                <a href="https://discordlookup.com/user/295310535107280908" target="_target"><img id="discord"
                        :src="discord"></a>
                <a href="https://web.telegram.org/k/#@iQuickDev" target="_target"><img id="telegram"
                        :src="telegram"></a>
                <a href="https://instagram.com/iquickdev" target="_target"><img id="instagram" :src="instagram"></a>
                <a href="https://www.youtube.com/c/iQuickGaming/" target="_target"><img id="youtube" :src="youtube"></a>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: auto;
}

.personal h1 {
    text-align: center;
    padding: 5px;
}

.contacts {
    width: 100%;
    height: 15%;
}

.info {
    left: 25vw;
    position: absolute;
    width: 70%;
    height: 80vh;
    margin: auto;
}

.description
{
    margin: auto;
    width: 90%;
    text-align: justify;
    text-shadow: 0 0 1px #FFF;
}

.pfp {
    border: 2px solid #e443de;
    border-radius: 50%;
    width: 120px;
    margin-bottom: 15px;
}

.contacts img {
    width: 20%;
    transition: .5s;
}

.contacts img:hover {
    transform: translateY(-5px);
    transition: .5s;
}

#discord:hover {
    filter: drop-shadow(-5px -5px 0px #4444dd);
}

#github:hover {
    filter: drop-shadow(-5px -5px 0px #151515);
}

#telegram:hover {
    filter: drop-shadow(-5px -5px 0px #4444dd);
}

#instagram:hover {
    filter: drop-shadow(-5px -5px 0px #e443de);
}

#youtube:hover {
    filter: drop-shadow(-5px -5px 0px #F00);
}

@media screen and (max-width: 1400px) {
    .info {
        left: 35vw;
        width: 60%;
    }

    .personal {
        width: 30%;
    }

    .contacts {
        width: 90%;
        text-align: center;
    }
}

@media screen and (max-width: 800px) {
    .contacts {
        width: 90%;
        text-align: center;
    }
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

    .contacts {
        bottom: 20px;
        width: 90%;
        text-align: center;
    }
}
</style>