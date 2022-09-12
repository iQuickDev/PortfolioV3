<script setup lang="ts">
import GlitchedWriter from 'vue-glitched-writer'
import profilePicture from '../assets/pfp.png'

const subtitles: string[] = [
  "Fullstack Developer",
  "Arch Linux User",
  "TypeScript Lover",
  "Terminal Elitist",
  "Coffee Abuser",
  "Open Source Enthusiast",
]

</script>

<template>
  <div class="mainpanel-wrapper">
  <div class="romboid"></div>
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
.mainpanel-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15rem;
  height: 15rem;
  transform: translate(-50%, -50%);
  font-weight: 700;
  border: none;
  padding: 5rem;
  text-align: center;
  font-size: 1.4rem;
}

.romboid
{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  transform: translate(-50%, -50%) rotate(45deg);
  border: 4px solid #e443de;
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

@media screen and (max-width: 600px)
{
  .romboid
  {
    display: none;
  }
}
</style>
