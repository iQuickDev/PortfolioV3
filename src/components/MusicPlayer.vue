<script setup lang="ts">
//@ts-ignore
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import YoutubePlayer from 'youtube-player'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { Song } from '../services/interfaces'

let player: YouTubePlayer | null = null
let timeElapsed = ref(0)
const isPlaying = ref(false)
const songIndex = ref(0)

const songs: Song[] = [
    {
        title: 'Little Dark Age (RMX)',
        author: 'MGMT',
        id: 'eeIalfQ09_E',
        duration: 158,
    },
    {
        title: 'Resonance',
        author: 'Home',
        id: '8GW6sLrK40k',
        duration: 212,
    },
    {
        title: 'Neon Skies',
        author: 'Villano',
        id: '4f-bisxhb4w',
        duration: 167,
    }
]

onMounted(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(120, 120)
    document.querySelector('.player-animation')?.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const light = new THREE.DirectionalLight(0xffffff, 10)
    const light2 = new THREE.DirectionalLight(0xffffff, 10)
    light.position.set(0, 0, 1)
    light2.position.set(0, 0, -1)
    scene.add(light)
    scene.add(light2)
    const geometry = new THREE.IcosahedronGeometry(1.5, 2)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff95, roughness: 0, metalness: .9, wireframe: true })
    const object = new THREE.Mesh(geometry, material)
    scene.add(object)
    camera.position.z = 3;

    function animate() {
        if (isPlaying.value) {
            object.rotation.x += 0.1
            object.rotation.y += 0.1
        }
        else {
            object.rotation.x += 0.01
            object.rotation.y += 0.01
        }
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    animate()
    attachKeybinds()

    player = YoutubePlayer('video-player', {
        width: 10,
        height: 10,
        playerVars: {
            autoplay: 0,
        }
    })
    player.loadVideoById(songs[songIndex.value].id, 0, '144p')
    player.pauseVideo()
})

function calculateProgress(): number {
    let percentage = (timeElapsed.value / songs[songIndex.value].duration) * 100
    if (percentage > 100) {
        percentage = 100
    }
    //@ts-ignore
    document.querySelector('.progress-bar-fill').style.width = percentage + '%'

    return percentage
}

function renderTime(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substring(14, 19).toString()
}

function startTimeCounter(): void {
    //@ts-ignore
    setInterval(() => {
        timeElapsed.value += 1
        if (calculateProgress() == 100)
            forwards()
    }, 1000)
}

function stopTimeCounter(): void {
    const interval_id = window.setInterval(function () { }, Number.MAX_SAFE_INTEGER);

    for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

function forwards() {
    if (songIndex.value < songs.length - 1) {
        songIndex.value += 1
    }
    else
        songIndex.value = 0

    loadSong()
}

function backwards() {
    if (songIndex.value > 0)
        songIndex.value -= 1
    else
        songIndex.value = songs.length - 1

    loadSong()
}

function playSong() {
    if (isPlaying.value) {
        isPlaying.value = false
        player?.pauseVideo()
        stopTimeCounter()
    }
    else {
        isPlaying.value = true
        player?.playVideo()
        startTimeCounter()
    }
}

function loadSong() {
    timeElapsed.value = 0
    player?.loadVideoById(songs[songIndex.value].id)
    if (!isPlaying.value)
        player?.pauseVideo()
}

function attachKeybinds() {
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
        if ((ev.target as HTMLElement).tagName.toLowerCase() == 'textarea')
            return

        switch (ev.key) {
            case ' ':
                console.log('playsong')
                playSong()
                break
            case 'ArrowRight':
                forwards()
                break
            case 'ArrowLeft':
                backwards()
                break
            default:
                return
        }
    })
}
</script>

<template>
    <div class="musicplayer-wrapper">
        <div class="player-wrapper">
            <div class="song-container">
                <div class="controls-container">
                    <div class="song-info">
                        <h2 id="title">{{ songs[songIndex].title }}</h2>
                        <h3 id="author">{{ songs[songIndex].author }}</h3>
                    </div>
                    <div class="controls">
                        <button>
                            <font-awesome-icon @click="backwards" icon="fa-solid fa-backward" />
                        </button>
                        <button>
                            <font-awesome-icon id="play" @click="playSong" icon="fa-play" v-show="!isPlaying" />
                            <font-awesome-icon id="pause" @click="playSong" icon="fa-pause" v-show="isPlaying" />
                        </button>
                        <button>
                            <font-awesome-icon @click="forwards" icon="fa-solid fa-forward" />
                        </button>
                    </div>
                </div>
                <div class="player-animation">
                </div>
            </div>
            <div class="time">
                <span id="timeElapsed">{{ renderTime(timeElapsed) }}</span>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
                <span id="timeTotal">{{ renderTime(songs[songIndex].duration) }}</span>
            </div>
            <div id="video-player"></div>
        </div>
        <div class="keybinds">
            <ul class="keys">
                <li>[Space] <br>
                    <font-awesome-icon icon="fa-play" /> /
                    <font-awesome-icon icon="fa-pause" />
                </li>
                <li>[←]
                    <br>
                    <font-awesome-icon icon="fa-backward" />
                </li>
                <li>[→]
                    <br>
                    <font-awesome-icon icon="fa-forward" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.musicplayer-wrapper {
    position: absolute;
    display: flex;
    bottom: 1rem;
    left: 1rem;
    transition: .5s;
}

.player-wrapper {
    background: url('../assets/musicplayer-background.gif') no-repeat;
    background-size: cover;
    width: 20rem;
    height: 10rem;
    color: #FFF;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
    border: 3px solid #e443de;
    opacity: .95;
    padding: 5px;
    overflow: hidden;
}

.controls-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
}

.controls {
    width: 50%;
    text-align: center;
    background: #e443de40;
    border-radius: 5px;
    padding: .3rem;
}

.controls button {
    border: none;
    background: transparent;
    border-radius: 5px;
    color: #FFF;
    font-size: 1.3rem;
    cursor: pointer;
}

.player-animation {
    width: 150px;
    height: 120px;
    border-radius: 10px;
    filter: drop-shadow(0 0 1px #0F0);
}

.song-info {
    width: 100%;
    height: 60%;
    filter: drop-shadow(0 0 2px #000);
    border-radius: 5px;
}

.song-info h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
}

#title {
    color: #e443de;
    font-size: 1.3rem;
}

#author {
    color: #FFF;
}

.song-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.time {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: auto;
    font-size: 1.2rem;
    transition: .3s;
}

.progress-bar {
    width: 100%;
    height: .5rem;
    background: #e443de;
    margin: 1rem;
    border-radius: 5px;
}

.progress-bar-fill {
    transition: .3s;
    width: 0%;
    height: 100%;
    background: #5900ff;
    box-shadow: 0 0 5px 1px #5900ff;
    border-radius: 5px;
}

.keybinds {
    margin-left: 10px;
    padding: 5px;
    text-align: center;
    width: 15%;
    height: 100%;
    background: #0005;
    border-radius: 8px;
    backdrop-filter: blur(3px);
}

.keys {
    padding: 0;
    list-style-type: none;
    font-size: 1.1rem;
}

.keys li {
    margin: 5px;
}

@media screen and (max-width: 1300px)
{
    .musicplayer-wrapper
    {
        transform: scale(0.9);
        left: 0;
        bottom: 0;
    }
}

@media screen and (max-width: 600px) {
    .musicplayer-wrapper {
        display: none;
    }
}
</style>