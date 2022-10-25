<script setup lang="ts">
//@ts-ignore
import { RetrowaveScene } from './assets/retrowave-scene/retrowave_scene.js'
//@ts-ignore
import VueMatrixRaindrop from 'vue-matrix-digit-rain'
import ShakeDetector from 'shake-detector';
import Navbar from './components/Navbar.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Terminal from './components/Terminal.vue'
import { onBeforeMount, ref } from 'vue'
let retrowave = new RetrowaveScene('src/assets/retrowave-scene/')
const refresher = ref(0)
window.isHacked = false
window.retrowave = retrowave

new ShakeDetector({
	threshold: 5,
	debounceDelay: 50
}).confirmPermissionGranted().subscribe(() => {
	if (window.isHacked) {
		(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '0'

		setTimeout(() => {
			(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'none'
		}, 1000);

		window.isHacked = false
	}
	else {
		(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block'
		setTimeout(() => {
			(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5'
		}, 100)

		window.isHacked = true
	}
}).start()

document.addEventListener("DOMContentLoaded", () => {
	retrowave.prepareScene(false, true)
})

onBeforeMount(() => {
	adjustSize()
})

window.addEventListener('resize', adjustSize)

let viewportSize = {
	width: window.innerWidth,
	height: window.innerHeight
}

function adjustSize() {
	viewportSize.width = window.innerWidth
	viewportSize.height = window.innerHeight
	refresher.value++
	if (window.isHacked) {
		(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.display = 'block'
		setTimeout(() => {
			(document.querySelector('#vue-matrix-raindrop') as HTMLElement).style.opacity = '.5'
		}, 100)
	}
}

</script>

<template>
	<Navbar />
	<router-view />
	<MusicPlayer />
	<Terminal />
	<VueMatrixRaindrop class="matrix" :key="refresher" :backgroundColor="'rgba(0,0,0,0.1)'" :fontFamily="'Hack'"
		:speed="2" :canvasWidth="viewportSize.width" :canvasHeight="viewportSize.height" :textColor="'#e443de'"
		:textContent="'ァィゥェォカキクケコサシスセソタチツテトナニヌネノパビピプペポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ'" />
</template>

<style>
@import 'https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap';

* {
	font-family: 'Play', sans-serif;
}

body {
	margin: 0;
	padding: 0;
	background-color: #01001e;
	color: #FFF;
	cursor: url('cursor.png'), auto;
	overflow: hidden;
}

::-webkit-scrollbar {
	width: 5px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: #e443de;
	border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
	background: #5900ff;
}

h1,
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

#vue-matrix-raindrop {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	z-index: -1;
	transition: 1s;
}

#retrowaveScene {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -2;
	opacity: .9;
}
</style>
