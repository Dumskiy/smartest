import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'the-smartest-scores'

function loadScores() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      return null
    }
  }
  return null
}

function saveScores(players) {
  const scores = players.map(p => ({ id: p.id, score: p.score }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export const usePlayersStore = defineStore('players', () => {
  const defaultPlayers = [
    { id: 1, name: 'Оля Лит', score: 0 },
    { id: 2, name: 'Оля Чик', score: 0 },
    { id: 3, name: 'Катя', score: 0 }
  ]

  const savedScores = loadScores()
  if (savedScores) {
    defaultPlayers.forEach(player => {
      const saved = savedScores.find(s => s.id === player.id)
      if (saved) {
        player.score = saved.score
      }
    })
  }

  const players = ref(defaultPlayers)

  function incrementScore(playerId) {
    const player = players.value.find(p => p.id === playerId)
    if (player) {
      player.score++
    }
  }

  function decrementScore(playerId) {
    const player = players.value.find(p => p.id === playerId)
    if (player) {
      player.score--
    }
  }

  function resetScores() {
    players.value.forEach(player => {
      player.score = 0
    })
  }

  // Автосохранение при изменении
  watch(players, (newPlayers) => {
    saveScores(newPlayers)
  }, { deep: true })

  return { players, incrementScore, decrementScore, resetScores }
})
