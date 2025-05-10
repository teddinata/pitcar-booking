<template>
  <div class="px-4 py-4 sm:py-6 sm:px-6 lg:px-8 bg-white shadow-sm">
    <!-- Desktop Progress Steps -->
    <div class="hidden sm:block max-w-4xl mx-auto">
      <div class="flex justify-between items-center">
        <!-- Step 1: Data Kendaraan -->
        <div class="flex flex-col items-center">
          <div 
            :class="{
              'bg-red-600 text-white': currentStep >= 1,
              'bg-gray-200 text-gray-500': currentStep < 1
            }" 
            class="rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>
          <span 
            :class="{
              'font-medium text-gray-900': currentStep >= 1,
              'text-gray-500': currentStep < 1
            }" 
            class="mt-2 text-sm whitespace-nowrap transition-colors duration-300"
          >
            Data Kendaraan
          </span>
        </div>
        
        <!-- Progress Line 1-2 -->
        <div class="w-full max-w-24 mx-2">
          <div class="h-1 bg-gray-200 relative">
            <div 
              :class="{
                'w-full': currentStep >= 2,
                'w-0': currentStep < 2
              }" 
              class="absolute inset-0 bg-red-600 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
        
        <!-- Step 2: Jenis Servis -->
        <div class="flex flex-col items-center">
          <div 
            :class="{
              'bg-red-600 text-white': currentStep >= 2,
              'bg-gray-200 text-gray-500': currentStep < 2
            }" 
            class="rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span 
            :class="{
              'font-medium text-gray-900': currentStep >= 2,
              'text-gray-500': currentStep < 2
            }" 
            class="mt-2 text-sm whitespace-nowrap transition-colors duration-300"
          >
            Jenis Servis
          </span>
        </div>
        
        <!-- Progress Line 2-3 -->
        <div class="w-full max-w-24 mx-2">
          <div class="h-1 bg-gray-200 relative">
            <div 
              :class="{
                'w-full': currentStep >= 3,
                'w-0': currentStep < 3
              }" 
              class="absolute inset-0 bg-red-600 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
        
        <!-- Step 3: Jadwal & Stall -->
        <div class="flex flex-col items-center">
          <div 
            :class="{
              'bg-red-600 text-white': currentStep >= 3,
              'bg-gray-200 text-gray-500': currentStep < 3
            }" 
            class="rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span 
            :class="{
              'font-medium text-gray-900': currentStep >= 3,
              'text-gray-500': currentStep < 3
            }" 
            class="mt-2 text-sm whitespace-nowrap transition-colors duration-300"
          >
            Jadwal & Stall
          </span>
        </div>
        
        <!-- Progress Line 3-4 -->
        <div class="w-full max-w-24 mx-2">
          <div class="h-1 bg-gray-200 relative">
            <div 
              :class="{
                'w-full': currentStep >= 4,
                'w-0': currentStep < 4
              }" 
              class="absolute inset-0 bg-red-600 transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
        
        <!-- Step 4: Konfirmasi -->
        <div class="flex flex-col items-center">
          <div 
            :class="{
              'bg-red-600 text-white': currentStep >= 4,
              'bg-gray-200 text-gray-500': currentStep < 4
            }" 
            class="rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span 
            :class="{
              'font-medium text-gray-900': currentStep >= 4,
              'text-gray-500': currentStep < 4
            }" 
            class="mt-2 text-sm whitespace-nowrap transition-colors duration-300"
          >
            Konfirmasi
          </span>
        </div>
      </div>
    </div>
    
    <!-- Mobile Progress Steps (Focus-oriented) -->
    <div class="sm:hidden">
      <!-- Current step indicator with animation -->
      <div class="flex justify-center mb-3">
        <div class="flex items-center space-x-1">
          <div 
            v-for="step in 4" 
            :key="step"
            :class="{
              'bg-red-600': currentStep >= step,
              'bg-gray-300': currentStep < step,
              'w-8': currentStep === step,
              'w-2': currentStep !== step
            }" 
            class="h-2 rounded-full transition-all duration-300"
          ></div>
        </div>
      </div>
      
      <!-- Current step title and description -->
      <div class="text-center animate-fadeIn">
        <div class="flex justify-center mb-3">
          <div 
            class="bg-red-600 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-md transform-gpu transition-transform duration-300"
            :class="{'scale-110': true}"
          >
            <!-- Step 1 Icon -->
            <svg v-if="currentStep === 1" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            
            <!-- Step 2 Icon -->
            <svg v-if="currentStep === 2" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            
            <!-- Step 3 Icon -->
            <svg v-if="currentStep === 3" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            
            <!-- Step 4 Icon -->
            <svg v-if="currentStep === 4" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h3 class="font-bold text-lg text-gray-900">
          <span v-if="currentStep === 1">Data Kendaraan</span>
          <span v-if="currentStep === 2">Jenis Servis</span>
          <span v-if="currentStep === 3">Jadwal & Stall</span>
          <span v-if="currentStep === 4">Konfirmasi</span>
        </h3>
        
        <p class="text-gray-600 text-sm mt-1">
          <span v-if="currentStep === 1">Masukkan data kendaraan Anda</span>
          <span v-if="currentStep === 2">Pilih layanan yang Anda butuhkan</span>
          <span v-if="currentStep === 3">Pilih waktu & lokasi servis</span>
          <span v-if="currentStep === 4">Periksa detail booking Anda</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import defineProps from Vue 3
import { defineProps } from 'vue';

// Define props using the new script setup syntax
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    validator: value => value >= 1 && value <= 4
  }
});
</script>

<style scoped>
/* Animation for fade in effect */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Animation for pulse effect */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.scale-110 {
  animation: pulse 2s infinite;
}
</style>