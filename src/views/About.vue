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
                <p class="description">Hi, my name is Leonardo and i am a {{ age }} years old Full Stack Developer based
                    in Italy. Programming
                    has been my
                    passion since 2019 and i'm pursuing it by making lots of personal projects as well as school ones. I
                    really enjoy exploring open source software like linux and GNU, i think that FOSS gives a lot of
                    benefits to the community and the developers to build better software with the help from all over
                    the world. Take a look at my skills on the panel to the right and my social networks right below
                    this panel.
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
            <h1>Programming Experience</h1>
            <p>I started programming with dedication in 2019, my first language was C# for personal projects; i learned how to make Windows 10 applications using the .NET Framework and WinForms for the GUIs and made some projects like <a href="https://github.com/iQuickDev/OTCLoader" target="_blank">OTCLoader</a>, <a href="https://github.com/iQuickDev/MCClientManager" target="_blank">MCClientManager</a> and <a href="https://github.com/iQuickDev/DiscordTotalCallTime" target="_blank">DiscordTotalCallTime</a>, that was my first time dealing with Object Oriented Programming. Moving on, school has taught me the very basics of C++, Java, PHP (i hate that one just like you all do) and a little bit of WordPress which i used to build <a href="https://lorenzovanninicartoon.it" target="_blank">this website</a> for an Italian illustrator. Most of my knowledge comes from self tuition; in fact i've been learning a lot of concepts by myself to then implement in personal projects like <a href="https://github.com/iQuickDev/WhatsappBOT" target="_blank">WhatsappBOT</a>, <a href="https://github.com/iQuickDev/OmegleInterceptor" target="_blank">OmegleInterceptor</a> and <a href="https://github.com/iQuickDev/OpenCloud" target="_blank">OpenCloud</a>, as you can see all these projects are written in JavaScript in Node.js which is the language i'm the most proficient with. Talking about the frontend i really like to use the Vue framework to build Web applications (just like this one). Let's now consider databases, i learned to use MongoDB by myself and relational DBs in school being able to choose between SQL and NoSQL based on the use case.
            </p>
            <HorizontalDivider/>
            <h2>To be continued...</h2>
        </div>
    </div>
</template>

<style scoped>
a {
  color: #e443de;
  text-decoration: none;
  font-weight: 600;
}

a:hover
{
    text-shadow: 0 0 5px #9c43e4;
    transition: .25s;
}
.about-wrapper {
    height: 93vh;
}

.container {
    border: 2px solid #e443de;
    border-radius: 10px;
    backdrop-filter: blur(3px);
    padding: 5px;
    background: #0005;
    overflow: auto;
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
    font-size: 1.1rem;
    text-align: justify;
    text-align: center;
    letter-spacing: .2px;
}

.info p
{
    margin: 0;
    padding: 10px;
}

.description {
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