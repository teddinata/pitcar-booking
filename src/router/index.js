import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading pages for better performance
const ServiceBooking = () => import('../views/ServiceBooking.vue')
const CheckBooking = () => import('../views/CheckBooking.vue')
const ContactPage = () => import('../views/ContactPage.vue')
const PageNotFound = () => import('../views/PageNotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: ServiceBooking
  },
  {
    path: '/booking',
    name: 'booking',
    component: ServiceBooking
  },
  {
    path: '/check-booking',
    name: 'check-booking',
    component: CheckBooking
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
})

export default router