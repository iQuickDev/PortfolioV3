<script setup lang="ts">
import MainPanel from './components/MainPanel.vue'
//@ts-ignore
import { RetrowaveScene } from './assets/retrowave-scene/retrowave_scene.js'
import Navbar from './components/Navbar.vue'
import MusicPlayer from './components/MusicPlayer.vue';
let retrowave = new RetrowaveScene('src/assets/retrowave-scene/')
document.addEventListener("DOMContentLoaded", loadComplete)
function loadComplete() { retrowave.prepareScene(false, true) }
let speedIncrement = 15
window.addEventListener('wheel', (e) => {
	if (e.deltaY < 0)
		speedIncrement += 0.1
	else if (e.deltaY > 0)
		speedIncrement -= 0.1

	retrowave.setAnimationSpeed(speedIncrement)
})

</script>

<template>
	<Navbar></Navbar>
	<MainPanel></MainPanel>
	<MusicPlayer></MusicPlayer>
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
}

#retrowaveScene {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: .9;
}
</style>
