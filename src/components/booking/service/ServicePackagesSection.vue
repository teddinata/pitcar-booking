<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    <div class="bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-sm font-medium text-white">Paket Servis<br>Lebih Hemat</h3>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Rekomendasi
      </span>
    </div>
    
    <div class="p-4">
      <!-- Package list -->
      <div v-if="categoryPackages.length > 0" class="space-y-4">
        <div 
          v-for="pack in categoryPackages" 
          :key="`package-${pack.id}`" 
          :id="`package-${pack.id}`"
          class="relative rounded-xl transition-all duration-300 overflow-hidden"
          :class="[
            selectedTemplateId === pack.id 
              ? 'ring-2 ring-red-500 bg-gradient-to-r from-red-50 to-white' 
              : 'border border-gray-200 hover:border-red-200 hover:shadow-md'
          ]"
        >
          <!-- "Terpilih" Badge -->
          <div 
            v-if="selectedTemplateId === pack.id" 
            class="absolute right-0 top-0 mt-3 mr-3 z-10"
          >
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white shadow-sm">
              <svg class="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Terpilih
            </span>
          </div>
          
          <!-- Package Header -->
          <div 
            @click="handlePackageSelect(pack.id)" 
            class="p-4 cursor-pointer"
          >
            <!-- Package Header Content -->
            <div class="flex items-start">
              <!-- Radio Button with highlight effect -->
              <div 
                class="flex items-center justify-center mt-1.5 relative h-5 w-5 flex-shrink-0"
              >
                <input
                  :id="`package-${pack.id}`"
                  type="radio"
                  name="package"
                  :value="pack.id"
                  :checked="selectedTemplateId === pack.id"
                  @change="handlePackageSelect(pack.id)"
                  class="h-5 w-5 text-red-600 focus:ring-red-500 focus:ring-offset-1 border-gray-300 cursor-pointer"
                />
                <div v-if="selectedTemplateId === pack.id" class="absolute w-10 h-10 -m-2.5 bg-red-100 rounded-full animate-pulse-light"></div>
              </div>
              
              <!-- Package Info -->
              <div class="ml-3 flex-1">
                <!-- Package Name with Badge for special offers -->
                <div class="flex flex-wrap items-center gap-2">
                  <label :for="`package-${pack.id}`" class="text-base font-medium text-gray-800 cursor-pointer">
                    {{ pack.name }}
                  </label>
                  
                  <!-- Badges for extras -->
                  <span v-if="hasDiscount(pack.price)" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Diskon 10%
                  </span>
                  
                  <span v-if="getPackageItems(pack) > 5" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Lengkap
                  </span>
                </div>
                
                <!-- Package Brief Description -->
                <p v-if="pack.description" class="mt-1 text-sm text-gray-600 line-clamp-2">{{ pack.description }}</p>
                
                <!-- Key Benefits Preview (always visible) -->
                <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <!-- Service Count -->
                  <div class="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <div class="w-8 h-8 flex-shrink-0 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Total Layanan</p>
                      <p class="text-sm font-medium text-gray-700">{{ (pack.services && pack.services.length) || 0 }} Layanan</p>
                    </div>
                  </div>
                  
                  <!-- Part Count -->
                  <div class="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                    <div class="w-8 h-8 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Sparepart/Material</p>
                      <p class="text-sm font-medium text-gray-700">{{ (pack.products && pack.products.length) || 0 }} Item</p>
                    </div>
                  </div>
                </div>
                
                <!-- Pricing and Duration Info Card -->
                <div class="mt-3 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100">
                  <!-- Price -->
                  <div class="flex flex-col">
                    <div class="flex items-center">
                      <span class="text-xs text-gray-500 line-through block mr-2">Rp {{ formatCurrency(getOriginalPrice(pack.price)) }}</span>
                      <span class="px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">-10%</span>
                    </div>
                    <span class="text-lg font-semibold text-red-600">Rp {{ formatCurrency(pack.price || 0) }}</span>
                  </div>
                  
                  <!-- Duration -->
                  <div class="flex items-center px-2.5 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700">{{ formatDuration(pack.duration || 0) }}</span>
                  </div>
                </div>
                
                <!-- Package Details Toggle Button -->
                <button 
                  @click.stop="toggleDetails(pack.id)" 
                  class="mt-3 w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg border transition-colors"
                  :class="[
                    openPackageDetails === pack.id 
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  ]"
                >
                  <span>{{ openPackageDetails === pack.id ? 'Sembunyikan Detail' : 'Lihat Detail Paket' }}</span>
                  <svg 
                    :class="{'transform rotate-180': openPackageDetails === pack.id}" 
                    class="h-4 w-4 ml-1.5 transition-transform" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Package Details (when expanded) -->
          <div 
            v-if="openPackageDetails === pack.id" 
            class="bg-gray-50 p-4 border-t border-gray-200 animate-slide-down overflow-hidden"
          >
            <!-- Services List -->
            <div v-if="pack.services && Array.isArray(pack.services) && pack.services.length > 0" class="mb-4">
              <h4 class="text-sm font-medium text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Layanan yang Termasuk
              </h4>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div 
                  v-for="service in pack.services" 
                  :key="service.id" 
                  class="flex items-start p-2 bg-white rounded-lg border border-gray-100"
                >
                  <svg class="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">{{ service.name || 'Layanan' }}</span>
                </div>
              </div>
            </div>
            
            <!-- Products List -->
            <div v-if="pack.products && Array.isArray(pack.products) && pack.products.length > 0">
              <h4 class="text-sm font-medium text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Part/Material yang Termasuk
              </h4>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div 
                  v-for="product in pack.products" 
                  :key="product.id" 
                  class="flex items-start p-2 bg-white rounded-lg border border-gray-100"
                >
                  <svg class="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm text-gray-700">{{ product.name || 'Part' }}</span>
                </div>
              </div>
            </div>
            
            <!-- Call to Action (if not selected) -->
            <div v-if="selectedTemplateId !== pack.id" class="mt-4 flex justify-center">
              <button 
                @click="handlePackageSelect(pack.id)" 
                class="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Pilih Paket Ini
              </button>
            </div>
            
            <!-- Cancel Selection Button (if selected) -->
            <div v-else class="mt-4 flex justify-center">
              <button 
                @click="handlePackageSelect(null)" 
                class="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                Batalkan Pilihan
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state (improved) -->
      <div v-else class="text-center py-10 px-4">
        <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 class="mt-4 text-gray-700 font-medium">Tidak ada paket layanan</h3>
          <p class="mt-2 text-sm text-gray-500">Tidak ada paket layanan yang tersedia untuk kategori ini.</p>
          <p class="text-xs text-gray-400 mt-1">Silakan pilih layanan individual di bawah ini.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServicePackagesSection',
  props: {
    categoryPackages: {
      type: Array,
      required: true
    },
    selectedTemplateId: {
      type: [Number, String, null],
      default: null
    },
    openPackageDetails: {
      type: [Number, String, null],
      default: null
    }
  },
  emits: ['select-package', 'toggle-package-details'],
  
  data() {
    return {
      isScrolling: false
    };
  },
  
  methods: {
    /**
     * Format duration in hours and minutes
     * @param {number} duration - Duration in hours
     * @returns {string} Formatted duration string
     */
    formatDuration(duration) {
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
    },

    /**
     * Calculate original price with 10% markup
     * @param {number} price - Current price
     * @returns {number} Original price
     */
    getOriginalPrice(price) {
      if (!price) return 0;
      return Math.ceil(price * 1.1 / 1000) * 1000;
    },

    /**
     * Format currency number to Indonesian Rupiah format
     * @param {number} value - Currency value
     * @returns {string} Formatted currency string
     */
    formatCurrency(value) {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    },
    
    /**
     * Check if price has a discount
     * @param {number} price - Current price
     * @returns {boolean} Whether the price has a discount
     */
    hasDiscount(price) {
      return price && price > 0;
    },
    
    /**
     * Get total number of items in a package
     * @param {Object} pack - Package object
     * @returns {number} Total number of items in package
     */
    getPackageItems(pack) {
      let count = 0;
      if (pack.services && Array.isArray(pack.services)) {
        count += pack.services.length;
      }
      if (pack.products && Array.isArray(pack.products)) {
        count += pack.products.length;
      }
      return count;
    },

    /**
     * Toggle package details visibility and emit event
     * @param {number|string} packageId - Package ID
     */
     toggleDetails(packageId) {
      this.$emit('toggle-package-details', packageId);
    },
    
    /**
     * Handle paket terpilih dan auto-scroll ke ringkasan
     * @param {number|string} packageId - Package ID 
     */
    handlePackageSelect(packageId) {
      // Emit event ke parent untuk memilih paket
      this.$emit('select-package', packageId);
      
      // Scroll ke service summary setelah paket dipilih
      this.scrollToServiceSummary();
    },
    
    /**
     * Auto-scroll ke ringkasan layanan
     * Hanya dilakukan pada tampilan mobile
     */
    scrollToServiceSummary() {
      // Hanya lakukan jika belum dalam proses scrolling
      if (this.isScrolling) return;
      this.isScrolling = true;
      
      // Hanya lakukan pada perangkat mobile (layar < 1024px)
      if (window.innerWidth < 1024) { // lg breakpoint adalah 1024px di Tailwind
        // Gunakan setTimeout untuk memberi waktu DOM update
        setTimeout(() => {
          // Cari elemen ringkasan layanan
          // Gunakan selector yang tepat sesuai struktur DOM Anda
          const summaryElement = document.querySelector('.lg\\:hidden.mt-4.mb-4');
          
          if (summaryElement) {
            // Scroll ke elemen dengan animasi halus
            summaryElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Atur isScrolling kembali ke false setelah animasi selesai
            setTimeout(() => {
              this.isScrolling = false;
            }, 1000); // Animasi biasanya membutuhkan waktu sekitar 1 detik
          } else {
            this.isScrolling = false;
          }
        }, 200); // Delay 200ms untuk memastikan DOM terupdate
      } else {
        this.isScrolling = false;
      }
    }
  },
  
  mounted() {
    // Listener untuk mengupdate isScrolling saat scrolling manual
    window.addEventListener('scroll', () => {
      if (this.isScrolling) {
        this.isScrolling = false;
      }
    }, { passive: true });
  },
  
  beforeDestroy() {
    // Bersihkan event listener saat komponen dihapus
    window.removeEventListener('scroll', () => {});
  }
};
</script>

<style scoped>
/* Animation for expanding package details */
.animate-slide-down {
  animation: slideDown 0.3s ease-out forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 1000px;
    transform: translateY(0);
  }
}

/* Soft pulsing animation for selected package */
@keyframes pulse-light {
  0% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

.animate-pulse-light {
  animation: pulse-light 2s ease-in-out infinite;
}

/* Custom scrollbar for improved UX */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}

/* Ensure proper focus styles for accessibility */
button:focus, input:focus {
  outline: none;
}

@media (max-width: 640px) {
  /* Improve touch targets on mobile */
  button, 
  input[type="radio"],
  .cursor-pointer {
    cursor: default; /* Better for touch */
  }
  
  /* Make radio buttons easier to tap on mobile */
  input[type="radio"] {
    min-width: 20px;
    min-height: 20px;
  }
}
</style>