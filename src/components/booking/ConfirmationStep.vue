<template>
  <div class="bg-white shadow rounded-lg overflow-hidden mt-4">
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Konfirmasi Booking</h2>
      
      <div class="space-y-6">
        <!-- Customer & Vehicle Information -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2 mb-3">Data Kendaraan</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt class="text-xs text-gray-500">Nama Customer</dt>
              <dd class="text-sm font-medium text-gray-900">{{ customerForm.customer_name }}</dd>
            </div>
            
            <div>
              <dt class="text-xs text-gray-500">Nomor Plat</dt>
              <dd class="text-sm font-medium text-gray-900">{{ customerForm.plate_number.toUpperCase() }}</dd>
            </div>
            
            <div>
              <dt class="text-xs text-gray-500">Telepon</dt>
              <dd class="text-sm font-medium text-gray-900">{{ customerForm.customer_phone }}</dd>
            </div>
            
            <div>
              <dt class="text-xs text-gray-500">Email</dt>
              <dd class="text-sm font-medium text-gray-900">{{ customerForm.customer_email || '-' }}</dd>
            </div>
          </div>
        </div>
        
        <!-- Booking Information -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2 mb-3">Jadwal Booking</h3>
          
          <div class="rounded-lg bg-gray-50 p-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <div class="mb-2 sm:mb-0">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium text-gray-900">{{ formattedSelectedDateDisplay }}</span>
                </div>
              </div>
              
              <div class="mb-2 sm:mb-0">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm font-medium text-gray-900">{{ selectedHour }} - {{ calculateEndTime }}</span>
                </div>
              </div>
              
              <div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span class="text-sm font-medium text-gray-900">{{ selectedStall.name }}</span>
                </div>
              </div>
            </div>
            <div class="mt-2 pt-2 border-t border-gray-200">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm text-gray-500">
                  Durasi servis: <span class="font-medium text-gray-900">{{ formatDuration(totalServiceDuration) }}</span>
                </span>
              </div>
            </div>

            <div v-if="customerForm.notes" class="mt-4">
              <h4 class="text-xs font-medium text-gray-500">Catatan:</h4>
              <p class="mt-1 text-sm text-gray-700 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">{{ customerForm.notes }}</p>
            </div>
          </div>
        </div>
        
        <!-- Service Information - Improved -->
        <!-- Service Information - Improved -->
        <!-- <div>
          <h3 class="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2 mb-3">Detail Servis</h3>
          
          <div class="mb-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-blue-800 font-medium">HEMAT! Booking online lebih murah</p>
                <p class="text-xs text-blue-700">Dapatkan diskon 10% untuk semua layanan dengan booking melalui aplikasi.</p>
              </div>
            </div>
          </div>

          <div v-if="customerForm.template_id" class="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div class="flex justify-between items-start">
              <div class="flex-1 pr-2">
                <div class="flex items-center space-x-1.5">
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">Paket</span>
                  <h4 class="text-sm font-medium text-gray-800">
                    {{ getPakageName() }}
                  </h4>
                </div>
                
                <div class="mt-1 space-y-1">
                  <div class="flex flex-wrap gap-1 text-xs text-gray-600">
                    <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ packageServices.length || packageServicesCount || customerForm.service_ids.length || 1 }} Layanan
                    </span>
                  </div>
                  
                  <button 
                    @click="togglePackageDetails"
                    class="mt-1 flex items-center text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg 
                      :class="{'transform rotate-180': showPackageDetails}"
                      class="h-4 w-4 text-gray-400 mr-1 transition-transform" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    {{ showPackageDetails ? 'Sembunyikan detail' : 'Lihat detail paket' }}
                  </button>
                  
                  <div v-if="showPackageDetails" class="mt-2 space-y-2 animate-fadeIn">
                    <div class="bg-gray-50 p-2 rounded-lg">
                      <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Termasuk layanan:
                      </p>
                      <div class="ml-2">
                        <div v-for="service in getPackageServicesList()" :key="service.id" class="text-xs text-gray-600 flex items-start py-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span class="line-clamp-1">{{ service.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-xs text-gray-500 line-through">Rp {{ formatCurrency(getPackageOriginalPrice()) }}</span>
                <span class="text-sm font-medium text-red-600">Rp {{ formatCurrency(getPackagePrice()) }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="visibleServiceIds.length > 0" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Layanan Tambahan</h4>
            <div class="rounded-lg border border-gray-200 overflow-hidden">
              <service-item
                v-for="serviceId in visibleServiceIds"
                :key="serviceId"
                :service-name="getItemName(serviceId)"
                :duration="getServiceDuration(serviceId)"
                :original-price="getOriginalPrice(serviceId)"
                :discounted-price="getItemPrice(serviceId)"
              />
            </div>
          </div>
          
          <service-summary
            class="mb-4"
            :original-price="getOriginalListPrice"
            :regular-discount-amount="getRegularDiscountAmount"
            :booking-discount-amount="getBookingDiscountAmount"
            :total-price="getTotalPrice"
            :discount-percentage="getTotalDiscountPercentage"
          />
          
          
        </div> -->

        
        <!-- Agreement -->
        <div class="mt-6">
          <div class="rounded-md bg-yellow-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">Perhatian</h3>
                <div class="mt-2 text-sm text-yellow-700">
                  <p>
                    Dengan menekan tombol "Konfirmasi Booking", Anda menyetujui bahwa:
                  </p>
                  <ul class="list-disc pl-5 space-y-1 mt-2">
                    <li>Data yang Anda berikan adalah benar dan akurat</li>
                    <li>Anda akan datang tepat waktu sesuai jadwal yang dipilih</li>
                    <li>Biaya servis dapat berubah setelah diagnosis lebih lanjut</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
      <button
        @click="$emit('prev-step')"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>
      <button
        @click="$emit('create-booking')"
        :disabled="loading"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        <span v-if="loading" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        Konfirmasi Booking
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import ServiceSummary from './detail/ServiceSummary.vue';
import PackageDetail from './detail/PackageDetail.vue';
import ServiceItem from './detail/ServiceItem.vue';

export default {
  name: 'ConfirmationStep',
  components: {
    ServiceSummary,
    PackageDetail,
    ServiceItem
  },
  props: {
    customerForm: {
      type: Object,
      required: true
    },
    selectedDate: {
      type: Date,
      required: true
    },
    selectedHour: {
      type: String,
      required: true
    },
    selectedStall: {
      type: Object,
      required: true
    },
    totalServiceDuration: {
      type: Number,
      required: true
    },
    services: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['prev-step', 'create-booking'],
  setup(props) {
    // Toggle state for package details
    const showPackageDetails = ref(false);
    
    // Format the date for display
    const formattedSelectedDateDisplay = computed(() => {
      return formatDisplayDate(props.selectedDate);
    });
    
    // Calculate end time
    const calculateEndTime = computed(() => {
      if (!props.selectedHour) return '';
      
      const [hours, minutes] = props.selectedHour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + props.totalServiceDuration * 60;
      
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    });
    
    // Format date for display
    const formatDisplayDate = (date) => {
      if (!(date instanceof Date)) return '';
      
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      return date.toLocaleDateString('id-ID', options);
    };
    
    // Format duration
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
    
    // Computed properties for package information
    const packageServices = computed(() => {
      if (!props.customerForm.template_id) return [];
      
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === props.customerForm.template_id);
      
      if (!packageItem || !packageItem.services || !Array.isArray(packageItem.services)) {
        return [];
      }
      
      return packageItem.services;
    });
    
    const packageProducts = computed(() => {
      if (!props.customerForm.template_id) return [];
      
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === props.customerForm.template_id);
      
      if (!packageItem || !packageItem.products || !Array.isArray(packageItem.products)) {
        return [];
      }
      
      return packageItem.products;
    });
    
    // Get package name
    const getPackageName = (packageId) => {
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === packageId);
      return packageItem ? packageItem.name : '';
    };
    
    // Get package services count
    const getPackageServicesCount = (packageId) => {
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.services || !Array.isArray(packageItem.services)) {
        return 0;
      }
      return packageItem.services.length;
    };
    
    // Get package products count
    const getPackageProductsCount = (packageId) => {
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.products || !Array.isArray(packageItem.products)) {
        return 0;
      }
      return packageItem.products.length;
    };
    
    // Get package price
    // const getPackagePrice = (packageId) => {
    //   const servicePackages = window.servicePackages || [];
    //   const packageItem = servicePackages.find(p => p && p.id === packageId);
    //   return packageItem && packageItem.price ? packageItem.price : 0;
    // };
    
    // // Get package original price (before any discount)
    // const getPackageOriginalPrice = (packageId) => {
    //   const servicePackages = window.servicePackages || [];
    //   const packageItem = servicePackages.find(p => p && p.id === packageId);
    //   if (!packageItem || !packageItem.price) return 0;
      
    //   // Harga asli adalah 120% dari harga setelah diskon regular
    //   return Math.round(packageItem.price * 1.2);
    // };
    
    // Get service original price
    const getOriginalPrice = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      if (!service || !service.price) return 0;
      
      // Harga asli adalah 120% dari harga setelah diskon regular
      return Math.round(service.price * 1.2);
    };
    
    // Get service duration
    const getServiceDuration = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      return service && service.duration ? service.duration : 0;
    };
    
    // Get item name (service or product)
    const getItemName = (itemId) => {
      // Check in services array
      const service = props.services.find(s => s && s.id === itemId);
      if (service && service.name) {
        return service.name;
      }
      
      // Check in templateProductsMap
      if (window.templateProductsMap && window.templateProductsMap[itemId]) {
        return window.templateProductsMap[itemId].name;
      }
      
      // Check in package products
      const servicePackages = window.servicePackages || [];
      for (const pack of servicePackages) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.name) {
            return product.name;
          }
        }
      }
      
      return `Item #${itemId}`;
    };

    // Function untuk mendapatkan nama paket
    const getPakageName = () => {
      // Coba dari props.services
      const selectedService = props.services.find(service => service && service.id === props.customerForm.template_id);
      if (selectedService && selectedService.name) {
        return selectedService.name;
      }
      
      // Fallback ke paket layanan default
      return "Paket Layanan";
    };

    // Mendapatkan daftar layanan dalam paket
    const getPackageServicesList = () => {
      // Coba dari window.servicePackages
      if (window.servicePackages) {
        const packageItem = window.servicePackages.find(p => p && p.id === props.customerForm.template_id);
        if (packageItem && packageItem.services && packageItem.services.length > 0) {
          return packageItem.services;
        }
      }
      
      // Fallback ke array service_ids
      return props.customerForm.service_ids.map(id => {
        const service = props.services.find(s => s && s.id === id);
        return service || { id, name: `Layanan #${id}` };
      });
    };

    // Menghitung jumlah layanan dalam paket
    const packageServicesCount = computed(() => {
      // Ambil dari customerForm.service_ids jika kosong
      return props.customerForm.service_ids.length || 1;
    });

    // Mendapatkan harga paket
    const getPackagePrice = () => {
      // Jika tidak ada template_id, return 0
      if (!props.customerForm.template_id) return 0;
      
      // Coba cari dari props.services
      const selectedService = props.services.find(service => service && service.id === props.customerForm.template_id);
      if (selectedService && selectedService.price) {
        return selectedService.price;
      }
      
      // Fallback ke kalkulasi dari service_ids
      return props.customerForm.service_ids.reduce((total, id) => {
        const service = props.services.find(s => s && s.id === id);
        return total + (service && service.price ? service.price : 0);
      }, 0) || 350000; // Default fallback ke harga 350.000
    };

    // Mendapatkan harga asli paket
    const getPackageOriginalPrice = () => {
      // Harga asli adalah 120% dari harga setelah diskon
      return Math.round(getPackagePrice() * 1.2);
    };
    
    // Get item price
    const getItemPrice = (itemId) => {
      // Check in services array
      const service = props.services.find(s => s && s.id === itemId);
      if (service && service.price !== undefined) {
        return service.price;
      }
      
      // Check in templateProductsMap
      if (window.templateProductsMap && window.templateProductsMap[itemId] && 
          window.templateProductsMap[itemId].price !== undefined) {
        return window.templateProductsMap[itemId].price;
      }
      
      // Check in package products
      const servicePackages = window.servicePackages || [];
      for (const pack of servicePackages) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.price !== undefined) {
            return product.price;
          }
        }
      }
      
      return 0;
    };
    
    // Get all selected services that are not part of the selected package
    const visibleServiceIds = computed(() => {
      if (!props.customerForm.service_ids || !Array.isArray(props.customerForm.service_ids)) {
        return [];
      }
      
      // If no package selected, show all services
      if (!props.customerForm.template_id) {
        return props.customerForm.service_ids;
      }
      
      // Get all package service IDs
      const servicePackages = window.servicePackages || [];
      const packageItem = servicePackages.find(p => p && p.id === props.customerForm.template_id);
      if (!packageItem) {
        return props.customerForm.service_ids;
      }
      
      // Get all service IDs from the package
      const packageItemIds = [];
      
      if (packageItem.services && Array.isArray(packageItem.services)) {
        packageItemIds.push(...packageItem.services.map(s => s.id).filter(Boolean));
      }
      
      if (packageItem.products && Array.isArray(packageItem.products)) {
        packageItemIds.push(...packageItem.products.map(p => p.id).filter(Boolean));
      }
      
      // Filter out services that are part of the package
      return props.customerForm.service_ids.filter(id => !packageItemIds.includes(id));
    });
    
    // Toggle function for package details
    const togglePackageDetails = () => {
      showPackageDetails.value = !showPackageDetails.value;
    };
    
    // Pricing calculations
    const getOriginalListPrice = computed(() => {
      let total = 0;
      
      // Package price before any discount
      if (props.customerForm.template_id) {
        total += getPackageOriginalPrice(props.customerForm.template_id);
      }
      
      // Add individual service original prices
      for (const serviceId of visibleServiceIds.value) {
        total += getOriginalPrice(serviceId);
      }
      
      return total;
    });
    
    const getPriceAfterRegularDiscount = computed(() => {
      let total = 0;
      
      // Package price after regular discount
      if (props.customerForm.template_id) {
        total += getPackagePrice(props.customerForm.template_id);
      }
      
      // Add individual service prices after regular discount
      for (const serviceId of visibleServiceIds.value) {
        total += getItemPrice(serviceId);
      }
      
      return total;
    });
    
    // Calculate final price (after both discounts)
    const getTotalPrice = computed(() => {
      // Apply additional 10% discount for online booking
      return Math.round(getPriceAfterRegularDiscount.value * 0.9);
    });
    
    // Regular discount amount (between original list price and price after regular discount)
    const getRegularDiscountAmount = computed(() => {
      return getOriginalListPrice.value - getPriceAfterRegularDiscount.value;
    });
    
    // Booking online discount amount (10% of price after regular discount)
    const getBookingDiscountAmount = computed(() => {
      return getPriceAfterRegularDiscount.value - getTotalPrice.value;
    });
    
    // Total discount percentage (compared to original list price)
    const getTotalDiscountPercentage = computed(() => {
      if (getOriginalListPrice.value <= 0) return 0;
      return Math.round((1 - getTotalPrice.value / getOriginalListPrice.value) * 100);
    });
    
    // Format currency
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };

    // Di dalam setup() function pada ConfirmationStep.vue
    onMounted(() => {
      // Inisialisasi servicePackages jika belum tersedia
      if (!window.servicePackages && props.services.length > 0) {
        // Buat data packages dari template_id yang dipilih
        const selectedTemplate = props.services.find(service => 
          service && service.id === props.customerForm.template_id
        );
        
        if (selectedTemplate) {
          window.servicePackages = [{
            id: selectedTemplate.id,
            name: selectedTemplate.name || 'Paket Layanan',
            price: selectedTemplate.price || 0,
            services: props.services.filter(service => 
              service && service.template_id === props.customerForm.template_id
            ),
            products: []
          }];
        }
      }
    });
    
    return {
      formattedSelectedDateDisplay,
      calculateEndTime,
      formatDuration,
      formatCurrency,
      // Package info
      showPackageDetails,
      togglePackageDetails,
      packageServices,
      packageProducts,
      getPackageName,
      getPackageServicesCount,
      getPackageProductsCount,
      getPackagePrice,
      getPackageOriginalPrice,
      // Service info
      visibleServiceIds,
      getServiceDuration,
      getItemName,
      getItemPrice,
      getOriginalPrice,
      // Pricing
      getOriginalListPrice,
      getPriceAfterRegularDiscount,
      getTotalPrice,
      getRegularDiscountAmount,
      getBookingDiscountAmount,
      getTotalDiscountPercentage,
      getPakageName,
      getPackageServicesList,
      packageServicesCount,
      getPackagePrice,
      getPackageOriginalPrice
    };
  }
};
</script>

<style>
/* Animation for fadeIn package details */
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