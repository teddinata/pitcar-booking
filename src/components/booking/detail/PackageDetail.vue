<template>
  <div class="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
    <div class="flex justify-between items-start">
      <div class="flex-1 pr-2">
        <div class="flex items-center space-x-1.5">
          <span class="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">Paket</span>
          <h4 class="text-sm font-medium text-gray-800">{{ packageName }}</h4>
        </div>
        
        <div class="mt-1 space-y-1">
          <!-- Services and products count -->
          <div class="flex flex-wrap gap-1 text-xs text-gray-600">
            <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ servicesCount }} Layanan
            </span>
            <span v-if="productsCount > 0" class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {{ productsCount }} Material
            </span>
          </div>
          
          <!-- Toggle untuk Breakdown Detail -->
          <button 
            @click="toggleDetails"
            class="mt-1 flex items-center text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg 
              :class="{'transform rotate-180': showDetails}"
              class="h-4 w-4 text-gray-400 mr-1 transition-transform" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            {{ showDetails ? 'Sembunyikan detail' : 'Lihat detail paket' }}
          </button>
          
          <!-- Breakdown Contents -->
          <div v-if="showDetails" class="mt-2 space-y-2 animate-fadeIn">
            <!-- Services list -->
            <div v-if="services.length > 0" class="bg-gray-50 p-2 rounded-lg">
              <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Termasuk layanan:
              </p>
              <div class="ml-2">
                <div v-for="(service, idx) in services" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="line-clamp-1">{{ service.name || 'Layanan' }}</span>
                </div>
              </div>
            </div>

            <!-- Products list -->
            <div v-if="products.length > 0" class="bg-blue-50 p-2 rounded-lg">
              <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Termasuk produk/part:
              </p>
              <div class="ml-2">
                <div v-for="(product, idx) in products" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="line-clamp-1">{{ product.name || 'Produk' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-xs text-gray-500 line-through">Rp {{ formatCurrency(originalPrice) }}</span>
        <span class="text-sm font-medium text-red-600">Rp {{ formatCurrency(discountedPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PackageDetail',
  props: {
    packageName: {
      type: String,
      required: true
    },
    servicesCount: {
      type: Number,
      default: 0
    },
    productsCount: {
      type: Number,
      default: 0
    },
    services: {
      type: Array,
      default: () => []
    },
    products: {
      type: Array,
      default: () => []
    },
    originalPrice: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number,
      required: true
    }
  },
  setup() {
    const showDetails = ref(false);
    
    const toggleDetails = () => {
      showDetails.value = !showDetails.value;
    };
    
    // Format currency
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };
    
    return {
      showDetails,
      toggleDetails,
      formatCurrency
    };
  }
};
</script>

<style>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>