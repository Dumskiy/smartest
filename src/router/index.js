import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Player1 from '../views/Player1.vue'
import Player2 from '../views/Player2.vue'
import Player3 from '../views/Player3.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/player1',
    name: 'Player1',
    component: Player1
  },
  {
    path: '/player2',
    name: 'Player2',
    component: Player2
  },
  {
    path: '/player3',
    name: 'Player3',
    component: Player3
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
