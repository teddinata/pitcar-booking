<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Contact Info Cards -->
    <div class="p-4 space-y-4">
      <!-- Main Info Card -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <!-- Header -->
        <div class="p-4 bg-red-600 text-white">
          <h2 class="text-lg font-medium">Bengkel Servis Kami</h2>
          <p class="text-sm opacity-90">Siap melayani kebutuhan servis kendaraan Anda</p>
        </div>
        
        <!-- Map Section -->
        <div class="h-48 bg-gray-200 relative">
          <!-- This would be a real map component in production -->
          <div class="absolute inset-0 flex items-center justify-center">
            <img src="/map-placeholder.jpg" alt="Lokasi Bengkel" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/600x300?text=Peta+Lokasi+Bengkel'" />
          </div>
          <div class="absolute bottom-2 right-2">
            <a 
              href="https://maps.google.com/?q=Bengkel+Servis+Mobil" 
              target="_blank"
              class="bg-white px-3 py-1 rounded text-xs font-medium shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Maps
            </a>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="p-4 space-y-3">
          <!-- Address -->
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="font-medium text-gray-900">Alamat Bengkel</h3>
              <p class="text-sm text-gray-600">Jl. Raya Motor No. 123, Surabaya <br>Jawa Timur, Indonesia</p>
            </div>
          </div>
          
          <!-- Phone -->
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="font-medium text-gray-900">Telepon</h3>
              <p class="text-sm text-gray-600">(031) 1234-5678</p>
              <a 
                href="tel:+62311234578" 
                class="text-sm text-red-600 font-medium flex items-center mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hubungi Sekarang
              </a>
            </div>
          </div>
          
          <!-- Email -->
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="font-medium text-gray-900">Email</h3>
              <p class="text-sm text-gray-600">info@bengkelservis.com</p>
              <a 
                href="mailto:info@bengkelservis.com" 
                class="text-sm text-red-600 font-medium flex items-center mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kirim Email
              </a>
            </div>
          </div>
          
          <!-- Opening Hours -->
          <div class="flex items-start">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="font-medium text-gray-900">Jam Operasional</h3>
              <div class="text-sm text-gray-600">
                <div class="grid grid-cols-2 gap-1">
                  <div>Senin - Jumat:</div>
                  <div>8:00 - 17:00</div>
                  <div>Sabtu:</div>
                  <div>8:00 - 15:00</div>
                  <div>Minggu:</div>
                  <div>Tutup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Send Message Card -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-4">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Kirim Pesan</h2>
          
          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap <span class="text-red-600">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                required
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-600">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="contoh@email.com"
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                required
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
                Nomor HP
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="08123456789"
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                Subjek <span class="text-red-600">*</span>
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Subjek pesan"
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                required
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                Pesan <span class="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                placeholder="Tulis pesan Anda di sini..."
                class="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                required
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                class="w-full bg-red-600 text-white py-3 rounded-lg font-medium text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                :disabled="loading"
              >
                <span v-if="loading">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </span>
                <span v-else>Kirim Pesan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Toast notification for mobile -->
    <div 
      v-if="toast.show" 
      class="fixed bottom-20 left-4 right-4 z-50 bg-white shadow-lg rounded-lg max-w-md mx-auto border-l-4 animate-slide-up"
      :class="{
        'border-green-500': toast.type === 'success',
        'border-yellow-500': toast.type === 'warning',
        'border-red-500': toast.type === 'error',
        'border-blue-500': toast.type === 'info'
      }"
    >
      <div class="p-4 flex">
        <div class="flex-shrink-0">
          <!-- Success icon -->
          <svg v-if="toast.type === 'success'" class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          
          <!-- Warning icon -->
          <svg v-else-if="toast.type === 'warning'" class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm0-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          
          <!-- Error icon -->
          <svg v-else-if="toast.type === 'error'" class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          
          <!-- Info icon -->
          <svg v-else class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">{{ toast.message }}</p>
        </div>
        
        <div class="ml-auto pl-3 flex-shrink-0">
          <button @click="toast.show = false" class="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-md">
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Progress bar for auto-close -->
      <div class="h-1 bg-gray-100">
        <div 
          class="h-full transition-all duration-300 ease-linear"
          :class="{
            'bg-green-500': toast.type === 'success',
            'bg-yellow-500': toast.type === 'warning',
            'bg-red-500': toast.type === 'error',
            'bg-blue-500': toast.type === 'info'
          }"
          :style="{ width: toast.progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Contact form state
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// UI state
const loading = ref(false)

// Toast notification
const toast = reactive({
  show: false,
  message: '',
  type: 'info',
  progress: 100
})

let toastTimeout = null
let progressInterval = null

// Show toast message
const showToast = (message, type = 'info') => {
  // Clear existing timeouts and intervals
  if (toastTimeout) clearTimeout(toastTimeout)
  if (progressInterval) clearInterval(progressInterval)
  
  // Set toast properties
  toast.show = true
  toast.message = message
  toast.type = type
  toast.progress = 100
  
  // Set up progress bar
  const duration = 5000 // 5 seconds
  const intervalTime = 50 // Update every 50ms
  const steps = duration / intervalTime
  const decrementValue = 100 / steps
  
  progressInterval = setInterval(() => {
    toast.progress -= decrementValue
    if (toast.progress <= 0) {
      clearInterval(progressInterval)
    }
  }, intervalTime)
  
  // Auto-hide the toast after duration
  toastTimeout = setTimeout(() => {
    toast.show = false
    clearInterval(progressInterval)
  }, duration)
}

// Submit the contact form
const submitForm = async () => {
  loading.value = true
  
  try {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
    
    // Show success message
    showToast('Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.', 'success')
    
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    console.error('Error sending message:', error)
    showToast('Gagal mengirim pesan. Silakan coba lagi nanti.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Animation for sliding up elements */
.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>