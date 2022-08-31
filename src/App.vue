<script setup lang="ts">
//@ts-ignore
import { RetrowaveScene } from './assets/retrowave-scene/retrowave_scene.js'
import Navbar from './components/Navbar.vue'
import MusicPlayer from './components/MusicPlayer.vue';
import Terminal from './components/Terminal.vue';
let retrowave = new RetrowaveScene('src/assets/retrowave-scene/')
//@ts-ignore
window.retrowave = retrowave
document.addEventListener("DOMContentLoaded", loadComplete)
function loadComplete() { retrowave.prepareScene(false, true) }
</script>

<template>
	<Navbar />
	<router-view/>
	<MusicPlayer />
	<Terminal />
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
