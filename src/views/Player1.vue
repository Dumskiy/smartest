<template>
  <div class="player-page">
    <!-- <router-link to="/" class="back-link">← Назад</router-link> -->
    <h1>{{ player.name }}</h1>
    <button @click="playSound" class="sound-button">
      🔊
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayersStore } from '../stores/players'

const store = usePlayersStore()
const { players } = storeToRefs(store)
const player = players.value[0]

const audio = new Audio(player.sound)

function playSound() {
  audio.currentTime = 0
  audio.play()
}
</script>

<style scoped>
.player-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  background-color: #000000;
}

.back-link {
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #ffffff;
}

.sound-button {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 4rem;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

/* .sound-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
} */

.sound-button:active {
  transform: scale(0.95);
}
</style>
