import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeleccionesList from '@/views/selecciones/SeleccionesList.vue'
import JugadoresList from '@/views/jugadores/JugadoresList.vue'
import PartidosList from '@/views/partidos/PartidosList.vue'
import EstadisticasjugadoresList from '@/views/estadisticasjugadores/EstadisticasjugadoresList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/selecciones',
    name: 'selecciones',
    component: SeleccionesList
  },
    {
    path: '/jugadores',
    name: 'jugadores',
    component: JugadoresList
  },
  {
    path: '/partidos',
    name: 'partidos',
    component: PartidosList
  },
  {
    path: '/estjugadores',
    name: 'estjugadores',
    component: EstadisticasjugadoresList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
