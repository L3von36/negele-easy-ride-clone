import { createRouter, createWebHistory } from 'vue-router'
import HomeView          from '../views/HomeView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import SeatSelectorView  from '../views/SeatSelectorView.vue'
import BookingView       from '../views/BookingView.vue'
import ConfirmationView  from '../views/ConfirmationView.vue'
import AdminDashboard    from '../views/AdminDashboard.vue'
import AdminLogin        from '../views/AdminLogin.vue'
import DriverDashboard   from '../views/DriverDashboard.vue'
import { store }         from '../store.js'

const routes = [
  { path: '/',              name: 'home',          component: HomeView },
  { path: '/search-results',name: 'search-results',component: SearchResultsView },
  { path: '/seat-selector', name: 'seat-selector', component: SeatSelectorView },
  { path: '/booking',       name: 'booking',       component: BookingView },
  { path: '/confirmation',  name: 'confirmation',  component: ConfirmationView },
  { path: '/admin-login',   name: 'admin-login',   component: AdminLogin },
  { path: '/admin',         name: 'admin',         component: AdminDashboard, meta: { requiresAuth: true } },
  { path: '/driver',        name: 'driver',        component: DriverDashboard },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/admin-login')
  } else {
    next()
  }
})

export default router