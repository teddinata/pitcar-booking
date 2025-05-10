<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { CalendarPlus, Search, PhoneCall } from 'lucide-vue-next'

const route = useRoute()

// Check if route is active
const isActive = (path) => {
  if (path === '/') {
    // Consider both '/' and '/booking' as active for the Booking tab
    return route.path === '/' || route.path === '/booking'
  }
  return route.path === path
}

// Dynamic classes for menu items
const menuItemClass = (path) => {
  return {
    'text-red-600': isActive(path),
    'text-gray-500': !isActive(path)
  }
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-area-bottom z-20">
    <div class="grid grid-cols-3 h-16">
      <!-- Booking Menu -->
      <router-link 
        to="/" 
        class="flex flex-col items-center justify-center space-y-1 tap-highlight"
        active-class="text-red-600"
      >
        <CalendarPlus :class="[menuItemClass('/'), 'w-6 h-6']" />
        <span :class="[menuItemClass('/'), 'text-xs font-medium']">Booking</span>
      </router-link>
      
      <!-- Check Booking Status -->
      <router-link 
        to="/check-booking" 
        class="flex flex-col items-center justify-center space-y-1 tap-highlight"
        active-class="text-red-600"
      >
        <Search :class="[menuItemClass('/check-booking'), 'w-6 h-6']" />
        <span :class="[menuItemClass('/check-booking'), 'text-xs font-medium']">Cek Booking</span>
      </router-link>
      
      <!-- Contact -->
      <router-link 
        to="/contact" 
        class="flex flex-col items-center justify-center space-y-1 tap-highlight"
        active-class="text-red-600"
      >
        <PhoneCall :class="[menuItemClass('/contact'), 'w-6 h-6']" />
        <span :class="[menuItemClass('/contact'), 'text-xs font-medium']">Hubungi Kami</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
/* Active tab indicator */
.router-link-active {
  position: relative;
}

.router-link-active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background-color: rgb(220, 38, 38); /* Red-600 */
  border-radius: 0 0 4px 4px;
}

/* Disable tap highlight color on mobile */
.tap-highlight {
  -webkit-tap-highlight-color: transparent;
}
</style>