<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
    <!-- Illustration -->
    <div class="w-full max-w-md mb-8">
      <svg class="w-full h-auto" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Background elements -->
        <circle cx="400" cy="80" r="20" fill="#f1f5f9" />
        <circle cx="100" cy="250" r="30" fill="#f1f5f9" />
        <circle cx="450" cy="200" r="15" fill="#f1f5f9" />
        
        <!-- Car silhouette -->
        <g transform="translate(150, 120)">
          <path d="M170,60 C230,60 230,60 230,90 L230,110 C230,140 220,140 180,140 L40,140 C10,140 0,130 0,110 L0,90 C0,60 10,60 40,60 Z" fill="#e2e8f0" />
          <rect x="30" y="140" width="30" height="15" rx="5" fill="#cbd5e1" />
          <rect x="150" y="140" width="30" height="15" rx="5" fill="#cbd5e1" />
          <path d="M0,90 L30,40 L190,40 L230,90" fill="#e2e8f0" />
          <rect x="45" y="70" width="60" height="30" rx="5" fill="#f8fafc" />
          <rect x="120" y="70" width="60" height="30" rx="5" fill="#f8fafc" />
          <path d="M230,100 L250,100 L250,120 L230,120 Z" fill="#cbd5e1" />
        </g>
        
        <!-- 404 text -->
        <text x="250" y="80" font-size="60" font-weight="bold" text-anchor="middle" fill="#ef4444">404</text>
        
        <!-- Warning sign -->
        <g transform="translate(250, 180)">
          <polygon points="0,-30 26,15 -26,15" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" />
          <text x="0" y="10" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">!</text>
        </g>
      </svg>
    </div>
    
    <!-- Text content -->
    <h1 class="text-3xl font-bold text-gray-900 mb-2 text-center">Halaman Tidak Ditemukan</h1>
    <p class="text-gray-600 mb-8 text-center max-w-md">Maaf, kami tidak dapat menemukan halaman yang Anda cari.</p>
    
    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <button 
        @click="goBack" 
        class="px-5 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-gray-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>
      <button 
        @click="goHome" 
        class="px-5 py-3 bg-red-600 rounded-md shadow-sm text-white font-medium flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Halaman Utama
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate back to the previous page
const goBack = () => {
  router.go(-1)
}

// Navigate to the home page
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
/* Animation for the warning sign */
@keyframes pulse {
  0% { transform: scale(1) translate(250px, 180px); }
  50% { transform: scale(1.1) translate(250px, 180px); }
  100% { transform: scale(1) translate(250px, 180px); }
}

svg g[transform="translate(250, 180)"] {
  animation: pulse 2s infinite ease-in-out;
}

/* Animation for the car */
@keyframes bounce {
  0%, 100% { transform: translateY(0) translate(150px, 120px); }
  50% { transform: translateY(-10px) translate(150px, 120px); }
}

svg g[transform="translate(150, 120)"] {
  animation: bounce 3s infinite ease-in-out;
}
</style>