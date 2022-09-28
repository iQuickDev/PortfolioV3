<script setup lang="ts">
//@ts-ignore
import { RetrowaveScene } from './assets/retrowave-scene/retrowave_scene.js'
import Navbar from './components/Navbar.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Terminal from './components/Terminal.vue'
import { onBeforeMount } from 'vue'
//@ts-ignore
import VueMatrixRaindrop from 'vue-matrix-digit-rain'
let retrowave = new RetrowaveScene('src/assets/retrowave-scene/')
//@ts-ignore
window.retrowave = retrowave
document.addEventListener("DOMContentLoaded", () => {
	retrowave.prepareScene(false, true)
})

onBeforeMount(() => {
	viewportSize.width = window.innerWidth
	viewportSize.height = window.innerHeight
})

let viewportSize = {
	width: window.innerWidth,
	height: window.innerHeight
}

</script>

<template>
	<Navbar />
	<router-view />
	<MusicPlayer />
	<Terminal />
	<VueMatrixRaindrop :backgroundColor="'rgba(0,0,0,0.1)'" :fontFamily="'Hack'" :speed="2"
		:canvasWidth="viewportSize.width" :canvasHeight="viewportSize.height" :textColor="'#e443de'"
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
	cursor: url('src/assets/cursor.png'), auto;
	overflow: hidden;
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
	display: none;
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
