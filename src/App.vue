<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MobileBottomNav from './components/MobileBottomNav.vue'
import MobileHeader from './components/MobileHeader.vue'

const router = useRouter()
const route = useRoute()

// Page title based on current route
const pageTitle = ref('Booking Service')

// Handle page title changes based on route
const updatePageTitle = () => {
  const path = route.path
  
  if (path === '/' || path === '/booking') {
    pageTitle.value = 'Booking Service'
  } else if (path === '/check-booking') {
    pageTitle.value = 'Cek Status Booking'
  } else if (path === '/contact') {
    pageTitle.value = 'Hubungi Kami'
  } else {
    pageTitle.value = 'Booking Service'
  }
}

// Show back button on certain pages
const showBackButton = computed(() => {
  const path = route.path
  return path !== '/' && path !== '/booking'
})

// Watch for route changes to update page title
watch(() => route.path, () => {
  updatePageTitle()
})

onMounted(() => {
  updatePageTitle()
})
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Mobile Header -->
    <MobileHeader :title="pageTitle" :show-back="showBackButton" />
    
    <!-- Main Content Area with Safe Area for Bottom Nav -->
    <main class="flex-1 overflow-auto pb-20">
      <router-view></router-view>
    </main>
    
    <!-- Fixed Bottom Navigation -->
    <MobileBottomNav />
  </div>
</template>

<style>
/* Global styles */
html, body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}

/* Remove browser default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* iOS-like safe area handling for notched phones */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Smooth scrolling */
.overflow-auto {
  -webkit-overflow-scrolling: touch;
}

/* Disable text selection for UI elements */
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Active state for buttons */
.tap-highlight {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* Custom scrollbar for WebKit browsers */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

/* Prevent pull-to-refresh on iOS */
html {
  overscroll-behavior-y: none;
}

/* Disable zoom on input fields in iOS */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
input[type="date"],
select,
textarea {
  font-size: 16px;
}
</style>