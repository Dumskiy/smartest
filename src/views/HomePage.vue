<template>
  <div :class="['home', {'is-fullscreen': isFullscreen}]">
    <button @click="toggleFullscreen" :class="['fullscreen-btn', {'active': isFullscreen}]" title="Полноэкранный режим" />
    <button @click="handleReset" class="reset-btn" title="Сбросить счёт">↻</button>
    <h1>Самый умный Линтексист</h1>
    <!-- <h1><span>Самый умный</span><br>Линтексист</h1> -->
    <div class="players-list">
      <div v-for="player in players" :key="player.id" class="player-item">
        <!-- <button @click="decrementScore(player.id)" class="btn-score">-1</button> -->
        <div class="player-info">
          <span class="player-name">{{ player.name }}</span>
          <span class="player-score">{{ player.score }}</span>
        </div>
        <!-- <button @click="incrementScore(player.id)" class="btn-score">+1</button> -->
      </div>
    </div>
    <div class="navigation">
      <router-link v-for="player in players" :key="player.id" :to="`/player${player.id}`" class="nav-link">
        {{ player.name }} - Страница
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlayersStore } from '../stores/players'

const store = usePlayersStore()
const { players } = storeToRefs(store)
const { incrementScore, decrementScore, resetScores } = store

const pressedKeys = ref(new Set())
const isFullscreen = ref(false)

function handleKeyDown(e) {
  pressedKeys.value.add(e.key)
  
  // Проверяем комбинации клавиш для каждого игрока
  if (pressedKeys.value.has('1') && pressedKeys.value.has('=')) {
    incrementScore(1)
  } else if (pressedKeys.value.has('1') && pressedKeys.value.has('-')) {
    decrementScore(1)
  } else if (pressedKeys.value.has('2') && pressedKeys.value.has('=')) {
    incrementScore(2)
  } else if (pressedKeys.value.has('2') && pressedKeys.value.has('-')) {
    decrementScore(2)
  } else if (pressedKeys.value.has('3') && pressedKeys.value.has('=')) {
    incrementScore(3)
  } else if (pressedKeys.value.has('3') && pressedKeys.value.has('-')) {
    decrementScore(3)
  }
}

function handleKeyUp(e) {
  pressedKeys.value.delete(e.key)
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

function handleReset() {
  if (confirm('Сбросить счёт всех игроков?')) {
    resetScores()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  margin: 0 auto;
  padding: 0 4rem;
  color: #ffffff;
  background-color: #000000;
  position: relative;
}

.home.is-fullscreen {
  justify-content: center;
  gap: 4.5rem;
}

.fullscreen-btn,
.reset-btn {
  position: absolute;
  bottom: 1rem;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 100;
}

.fullscreen-btn::before,
.reset-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: #000000;
  transition: all 0.2s;
}

.fullscreen-btn:hover,
.reset-btn:hover {
  transform: scale(1.05);
}

.fullscreen-btn:hover::before,
.reset-btn:hover::before {
  opacity: 0;
}

.fullscreen-btn:active,
.reset-btn:active {
  transform: scale(0.95);
}

.fullscreen-btn {
  right: 1rem;
  background-image: url('../../images/fullscreen.svg');
}

.fullscreen-btn.active {
  background-image: url('../../images/fullscreen-exit.svg');
}

.reset-btn {
  left: 1rem;
  background-image: url('../../images/reset.svg');
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 6.4rem;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-image: url('../../images/idea.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 80%;
}

.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  /* background: linear-gradient(to right, rgba(0, 0, 255, 0.5), #000000);
  background: linear-gradient(to right, rgba(0, 64, 255, 0.5), #000000); */
  background: linear-gradient(to right, rgba(0, 95, 255, 0.5), #000000);
  /* background: linear-gradient(to right, rgba(0, 127, 255, 0.5), #000000); */
  border-radius: 1.5rem;
  gap: 1rem;
}

.player-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  line-height: 1;
  font-size: 6.5rem;
  font-weight: 600;
}

/* .player-name {
  font-weight: 600;
  color: #333;
} */

/* .player-score {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4CAF50;
  min-width: 50px;
  text-align: center;
} */

.btn-score {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #2196F3;
  color: white;
  transition: background 0.2s;
  min-width: 60px;
}

.btn-score:hover {
  background: #1976D2;
}

.btn-score:active {
  transform: scale(0.95);
}

.navigation {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: none;
}

.nav-link {
  padding: 1rem;
  text-align: center;
  background: #673AB7;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
}

.nav-link:hover {
  background: #5E35B1;
}
</style>
