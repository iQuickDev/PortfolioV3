<script setup lang="ts">
import { ref } from 'vue'
import GlitchedWriter from 'vue-glitched-writer'
import profilePicture from '../assets/pfp.png'

const subtitles = [
  "Fullstack Developer",
  "Arch Linux User",
  "TypeScript Lover",
  "Terminal Elitist",
  "Coffee Abuser",
  "Open Source Enthusiast",
]

</script>

<template>
  <div class="wrapper">
    <img :src="profilePicture" alt="profile picture" />
    <div class="name-container">
      <h1>iQuick</h1>
      <glitched-writer class="subtitle" :text="subtitles"
      :queue="{interval: 3000, loop: true}"
      :options="{letterize: true, delay: [50, 100]}" appear/>
    </div>
  </div>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15rem;
  height: 15rem;
  transform: translate(-50%, -50%);
  font-weight: 700;
  border: 2px solid #e443de;
  padding: 5rem;
  text-align: center;
  font-size: 1.4rem;
}

.name-container
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #e443de;
  filter: drop-shadow(0 0 2px #000);
}

.subtitle
{
  font-size: 1.5rem;
}

.name-container *
{
  margin: .5rem;
}

img
{
  width: 60%;
  height: 60%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #e443de;
  user-select: none;
}
</style>
