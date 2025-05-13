<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm mt-4">
    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-sm font-medium text-gray-700">Layanan <br>Non-Paket</h3>
      
      <!-- Search field -->
      <!-- <div class="relative max-w-xs w-full md:w-64">
        <input
          type="text"
          :value="serviceSearchQuery"
          @input="$emit('search', $event.target.value)"
          class="focus:ring-red-500 focus:border-red-500 block w-full text-xs border-gray-300 rounded-md py-1.5 pl-8 pr-3"
          placeholder="Cari layanan..."
        />
        <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div> -->
    </div>
    
    <div class="p-4">
      <!-- Services grid -->
      <div v-if="filteredServices.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          v-for="service in filteredServices" 
          :key="`service-${service.id}`"
          class="border rounded-lg shadow-sm hover:shadow-md transition-all"
          :class="{'border-red-500 ring-2 ring-red-100 bg-red-50': isServiceSelected(service.id), 'border-gray-200 hover:border-red-200': !isServiceSelected(service.id)}"
        >
          <div class="p-3 cursor-pointer" @click="$emit('toggle-service', service.id)">
            <div class="flex items-start">
              <div class="flex items-center h-5 pt-0.5">
                <input
                  :id="`service-${service.id}`"
                  type="checkbox"
                  :value="service.id"
                  :checked="isServiceSelected(service.id)"
                  @change="$emit('toggle-service', service.id)"
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 flex-1">
                <label :for="`service-${service.id}`" class="text-sm font-medium text-gray-700 cursor-pointer">
                  {{ service.name }}
                </label>
                
                <!-- Price and Duration card -->
                <div class="mt-2 flex justify-between items-center bg-gray-50 rounded-md p-2">
                  <div>
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span class="text-xs text-gray-500 line-through block">Rp {{ formatCurrency(getOriginalPrice(service.price)) }}</span>
                        <span class="text-sm font-medium text-red-600">Rp {{ formatCurrency(service.price || 0) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center text-xs text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ formatDuration(service.duration || 0) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state for search -->
      <div v-else-if="serviceSearchQuery && serviceSearchQuery.length > 0" class="py-8 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="mt-2 text-sm text-gray-500">Tidak ada layanan yang sesuai dengan pencarian Anda.</p>
        <p class="text-xs text-gray-400 mt-1">Coba kata kunci lain atau pilih dari daftar berikut</p>
      </div>
      
      <!-- Empty state for category -->
      <div v-else class="py-8 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p class="mt-2 text-sm text-gray-500">Tidak ada layanan tersedia untuk kategori ini.</p>
        <p class="text-xs text-gray-400 mt-1">Silakan pilih kategori lain atau periksa paket servis</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'ServiceItemsSection',
  props: {
    categoryServices: {
      type: Array,
      required: true
    },
    selectedServiceIds: {
      type: Array,
      default: () => []
    },
    serviceSearchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['toggle-service', 'search'],
  setup(props) {
    // Filter services based on search query
    const filteredServices = computed(() => {
      if (!props.serviceSearchQuery || props.serviceSearchQuery.trim().length < 2) {
        return props.categoryServices;
      }
      
      const query = props.serviceSearchQuery.toLowerCase();
      return props.categoryServices.filter(service => 
        service && service.name && service.name.toLowerCase().includes(query)
      );
    });

    /**
     * Check if a service is selected
     */
    const isServiceSelected = (serviceId) => {
      return props.selectedServiceIds.includes(serviceId);
    };

    /**
     * Format duration in hours and minutes
     */
    const formatDuration = (duration) => {
      if (typeof duration !== 'number' || isNaN(duration)) return '0 menit';
      
      const hours = Math.floor(duration);
      const minutes = Math.round((duration - hours) * 60);
      
      if (hours === 0) {
        return `${minutes} menit`;
      } else if (minutes === 0) {
        return `${hours} jam`;
      } else {
        return `${hours} jam ${minutes} menit`;
      }
    };

    /**
     * Calculate original price with 10% markup
     */
    const getOriginalPrice = (price) => {
      if (!price) return 0;
      return Math.ceil(price * 1.1 / 1000) * 1000;
    };

    /**
     * Format currency number to Indonesian Rupiah format
     */
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };

    return {
      filteredServices,
      isServiceSelected,
      formatDuration,
      getOriginalPrice,
      formatCurrency
    };
  }
};
</script>