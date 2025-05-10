<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    default: 'Booking Service'
  },
  showBack: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <header class="sticky top-0 z-10 bg-white shadow-sm">
    <div class="px-4 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <!-- Back button shown on inner pages -->
        <button 
          v-if="showBack"
          @click="goBack" 
          class="mr-2 p-1 rounded-full hover:bg-gray-100 tap-highlight"
        >
          <ArrowLeft class="w-5 h-5 text-gray-700" />
        </button>
        
        <!-- Logo and title -->
        <div class="flex items-center h-8 px-6 border-b border-gray-50"><!-- <img src="/pitcar-modified.png" alt="PITCAR" class="w-7 h-7" /> -->
          <img src="/pitcar-logo.png" alt="PITCAR" class="w-32" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Disable tap highlight color on mobile */
.tap-highlight {
  -webkit-tap-highlight-color: transparent;
}

/* Add smooth shadow transition */
header {
  transition: box-shadow 0.3s ease;
}
</style>