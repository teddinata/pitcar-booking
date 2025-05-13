<template>
  <div class="lg:col-span-1">
    <!-- Desktop sticky summary - hidden on mobile, visible on desktop -->
    <div class="hidden lg:block">
      <div class="sticky top-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <!-- Header section -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 border-b border-red-200 flex justify-between items-center">
          <h3 class="text-sm font-medium text-white">Ringkasan Layanan</h3>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            Hemat {{ getTotalDiscountPercentage }}%
          </span>
        </div>
        
        <div class="p-4">
          <!-- Empty state when no services selected -->
          <div v-if="!hasServices" class="py-6 text-center">
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada layanan terpilih</h3>
              <p class="mt-1 text-sm text-gray-500">Pilih paket atau layanan individual.</p>
              
              <button 
                v-if="!selectedServiceCategory"
                @click="$emit('select-service-category', 'berkala')" 
                class="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Mulai Servis Berkala
              </button>
            </div>
          </div>
          
          <!-- Services summary when services selected -->
          <div v-else class="space-y-4">
            <!-- Selected package card -->
            <div v-if="formData.template_id" class="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div class="flex justify-between items-start">
                <div class="flex-1 pr-2">
                  <div class="flex items-center space-x-1.5">
                    <span class="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded">Paket</span>
                    <h4 class="text-sm font-medium text-gray-800">{{ getPackageName(formData.template_id) }}</h4>
                  </div>
                  
                  <div class="mt-1 space-y-1">
                    <!-- Services and products count -->
                    <div class="flex flex-wrap gap-1 text-xs text-gray-600">
                      <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {{ getPackageServicesCount(formData.template_id) }}
                      </span>
                      <span v-if="getPackageProductsCount(formData.template_id) > 0" class="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full flex-shrink-0 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        {{ getPackageProductsCount(formData.template_id) }}
                      </span>
                    </div>
                    
                    <!-- Toggle untuk Breakdown Detail -->
                    <button 
                      @click.stop="togglePackageBreakdown"
                      class="mt-1 flex items-center text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <svg 
                        :class="{'transform rotate-180': showPackageBreakdown}"
                        class="h-4 w-4 text-gray-400 mr-1 transition-transform" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      {{ showPackageBreakdown ? 'Sembunyikan detail' : 'Lihat detail paket' }}
                    </button>
                    
                    <!-- Breakdown Contents -->
                    <div v-if="showPackageBreakdown" class="mt-2 space-y-2 animate-fadeIn">
                      <!-- Services list -->
                      <div v-if="packageServices.length > 0" class="bg-gray-50 p-2 rounded-lg">
                        <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Termasuk layanan:
                        </p>
                        <div class="ml-2">
                          <div v-for="(service, idx) in packageServices.slice(0, 4)" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="line-clamp-1">{{ service.name || 'Layanan' }}</span>
                          </div>
                          <div v-if="packageServices.length > 4" class="text-xs text-gray-600 italic pl-4 mt-1">
                            +{{ packageServices.length - 4 }} layanan lainnya
                          </div>
                        </div>
                      </div>

                      <!-- Products list -->
                      <div v-if="packageProducts.length > 0" class="bg-blue-50 p-2 rounded-lg">
                        <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          Termasuk produk/part:
                        </p>
                        <div class="ml-2">
                          <div v-for="(product, idx) in packageProducts.slice(0, 4)" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="line-clamp-1">{{ product.name || 'Produk' }}</span>
                          </div>
                          <div v-if="packageProducts.length > 4" class="text-xs text-gray-600 italic pl-4 mt-1">
                            +{{ packageProducts.length - 4 }} produk lainnya
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-xs text-gray-500 line-through">Rp {{ formatCurrency(getPackageOriginalPrice(formData.template_id)) }}</span>
                  <span class="text-sm font-medium text-red-600">Rp {{ formatCurrency(getPackagePrice(formData.template_id)) }}</span>
                  <button 
                    @click="$emit('select-package', null)"
                    class="mt-1 text-xs text-red-600 hover:text-red-800 focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus paket
                  </button>
                </div>
              </div>
            </div>

            <!-- Additional services list -->
            <div v-if="visibleServiceIds.length > 0" class="rounded-lg border border-gray-200">
              <div class="bg-gray-50 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
                <h4 class="text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Layanan Tambahan
                </h4>
                <span class="text-xs text-gray-500">{{ visibleServiceIds.length }} item</span>
              </div>
              
              <div class="divide-y divide-gray-100 max-h-56 overflow-y-auto">
                <div v-for="serviceId in visibleServiceIds" :key="serviceId" class="flex justify-between items-start p-3 hover:bg-gray-50">
                  <div class="flex items-start">
                    <button 
                      @click="$emit('toggle-service', serviceId)"
                      class="mr-2 text-red-500 hover:text-red-700 focus:outline-none flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div>
                      <span class="text-sm text-gray-700">{{ getItemName(serviceId) }}</span>
                      <div class="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-xs text-gray-500">{{ formatDuration(getServiceDuration(serviceId)) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-500 line-through">Rp {{ formatCurrency(getOriginalPrice(serviceId)) }}</span>
                    <span class="text-sm font-medium text-gray-900">Rp {{ formatCurrency(getItemPrice(serviceId)) }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Total section -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-3">
              <!-- Duration -->
              <div class="flex justify-between items-center py-1 text-gray-600 border-b border-gray-200 pb-2 mb-2">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Total Durasi:</span>
                </div>
                <span class="text-gray-900 font-medium">{{ formatDuration(totalServiceDuration) }}</span>
              </div>
              
              <!-- Original price -->
              <div class="flex justify-between items-center py-1">
                <span class="text-gray-600">Harga Normal:</span>
                <span class="text-gray-500 line-through">Rp {{ formatCurrency(getOriginalListPrice) }}</span>
              </div>
              
              <!-- Regular Discount -->
              <div class="flex justify-between items-center py-1">
                <span class="text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Diskon Promo:
                </span>
                <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getRegularDiscountAmount) }}</span>
              </div>
              
              <!-- Booking Online Discount -->
              <div class="flex justify-between items-center py-1 border-b border-gray-200 pb-2">
                <span class="text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Diskon Booking Online (10%):
                </span>
                <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getBookingDiscountAmount) }}</span>
              </div>
              
              <!-- Total -->
              <div class="flex justify-between items-center py-2 mt-1">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="text-gray-800 font-medium">Total Biaya:</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-base font-bold text-red-600">Rp {{ formatCurrency(getTotalPrice) }}</span>
                  <span class="text-xs text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Hemat {{ getTotalDiscountPercentage }}%
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Informasi Diskon Tambahan - Desktop -->
            <div class="bg-blue-50 rounded-lg border border-blue-200 p-3">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="text-xs text-blue-800 font-medium mb-1">Harga di atas belum final</p>
                  <p class="text-xs text-blue-700">
                    Anda berpotensi mendapatkan diskon tambahan ketika datang ke bengkel. Jika ada penambahan layanan atau parts, Anda juga bisa mendapatkan diskon tambahan.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Continue button -->
            <button
              @click="$emit('next-step')"
              :disabled="(formData.service_ids.length === 0 && !formData.template_id)"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              Lanjut Pilih Jadwal
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
<!-- Mobile-Optimized Service Summary -->
    <div class="lg:hidden mt-4 mb-4"> 
      <div v-if="hasServices" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <!-- Mobile Header -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 border-b border-red-200 flex justify-between items-center">
          <h3 class="text-sm font-medium text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ringkasan Layanan
          </h3>
          <button @click="handleToggleMobileSummary" class="p-1 rounded-full bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-white">
            <svg v-if="mobileSummaryVisible" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <!-- Compact Info (Always Visible) -->
        <div class="px-3 py-2 bg-gray-50 flex justify-between items-center">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-xs text-gray-500">{{ formatDuration(totalServiceDuration) }}</span>
          </div>
          <div class="flex items-center font-medium text-base text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Rp {{ formatCurrency(getTotalPrice) }}
          </div>
          <div class="text-xs text-green-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {{ getTotalDiscountPercentage }}%
          </div>
        </div>

        <!-- Detailed View (Toggle) -->
        <div v-show="mobileSummaryVisible" class="border-t border-gray-200">
          <!-- Mobile optimized display with badges -->
          <div class="px-3 py-2 bg-white">
            <!-- Selected package -->
            <div v-if="formData.template_id" class="mb-3 border-b border-gray-100 pb-3">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center">
                  <span class="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded mr-1.5">Paket</span>
                  <h5 class="text-sm font-medium text-gray-800">{{ getPackageName(formData.template_id) }}</h5>
                </div>
                <button 
                  @click="$emit('select-package', null)"
                  class="text-xs text-red-600 hover:text-red-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex space-x-1">
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ getPackageServicesCount(formData.template_id) }}
                  </span>
                  <span v-if="getPackageProductsCount(formData.template_id) > 0" class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {{ getPackageProductsCount(formData.template_id) }}
                  </span>
                </div>
                <div class="text-right ml-2">
                  <span class="text-xs text-gray-500 line-through block">Rp {{ formatCurrency(getPackageOriginalPrice(formData.template_id)) }}</span>
                  <span class="text-sm font-medium text-red-600">Rp {{ formatCurrency(getPackagePrice(formData.template_id)) }}</span>
                </div>
              </div>
              
              <!-- Toggle untuk Breakdown Detail -->
              <button 
                @click.stop="toggleMobilePackageBreakdown"
                class="mt-1 w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span>{{ showMobilePackageBreakdown ? 'Sembunyikan detail' : 'Lihat detail paket' }}</span>
                <svg 
                  :class="{'transform rotate-180': showMobilePackageBreakdown}"
                  class="h-3.5 w-3.5 text-gray-400 transition-transform" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Breakdown Contents -->
              <div v-if="showMobilePackageBreakdown" class="mt-2 space-y-2 animate-fadeIn">
                <!-- Services list -->
                <div v-if="packageServices.length > 0" class="bg-gray-50 p-2 rounded-lg">
                  <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Layanan ({{ packageServices.length }}):
                  </p>
                  <div class="ml-2">
                    <div v-for="(service, idx) in packageServices.slice(0, 3)" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="line-clamp-1">{{ service.name || 'Layanan' }}</span>
                    </div>
                    <div v-if="packageServices.length > 3" class="text-xs text-gray-600 italic pl-4 mt-1">
                      +{{ packageServices.length - 3 }} layanan lainnya
                    </div>
                  </div>
                </div>

                <!-- Products list -->
                <div v-if="packageProducts.length > 0" class="bg-blue-50 p-2 rounded-lg">
                  <p class="text-xs text-gray-600 font-medium mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Produk/Part ({{ packageProducts.length }}):
                  </p>
                  <div class="ml-2">
                    <div v-for="(product, idx) in packageProducts.slice(0, 3)" :key="idx" class="text-xs text-gray-600 flex items-start py-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-500 mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span class="line-clamp-1">{{ product.name || 'Produk' }}</span>
                    </div>
                    <div v-if="packageProducts.length > 3" class="text-xs text-gray-600 italic pl-4 mt-1">
                      +{{ packageProducts.length - 3 }} produk lainnya
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional services - more compact for mobile -->
            <div v-if="visibleServiceIds.length > 0" class="mb-3">
              <div class="flex items-center justify-between mb-1">
                <h5 class="text-xs font-medium text-gray-600 uppercase tracking-wider">Layanan Tambahan</h5>
                <span class="text-xs text-gray-500">{{ visibleServiceIds.length }} Item</span>
              </div>
              
              <div v-for="serviceId in visibleServiceIds.slice(0, 3)" :key="serviceId" class="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                <div class="flex items-center">
                  <button 
                    @click="$emit('toggle-service', serviceId)"
                    class="mr-1.5 text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <span class="text-xs text-gray-700 line-clamp-1">{{ getItemName(serviceId) }}</span>
                </div>
                <span class="text-xs font-medium text-gray-900 ml-1">Rp {{ formatCurrency(getItemPrice(serviceId)) }}</span>
              </div>
              
              <!-- Show more link -->
              <div v-if="visibleServiceIds.length > 3" class="mt-1 text-center">
                <span class="text-xs text-blue-600">
                  + {{ visibleServiceIds.length - 3 }} layanan lainnya
                </span>
              </div>
            </div>
            
            <!-- Summary totals for mobile -->
            <div class="mt-2 pt-2 border-t border-gray-200">
              <div class="flex justify-between items-center text-xs py-1">
                <span class="text-gray-600">Harga Normal:</span>
                <span class="text-gray-500 line-through">Rp {{ formatCurrency(getOriginalListPrice) }}</span>
              </div>
              
              <!-- Regular Discount -->
              <div class="flex justify-between items-center text-xs py-1">
                <span class="text-green-600">Diskon Promo:</span>
                <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getRegularDiscountAmount) }}</span>
              </div>
              
              <!-- Booking Online Discount -->
              <div class="flex justify-between items-center text-xs py-1">
                <span class="text-green-600">Diskon Booking Online (10%):</span>
                <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getBookingDiscountAmount) }}</span>
              </div>
              
              <div class="flex justify-between items-center py-1 mt-1">
                <span class="text-sm text-gray-700 font-medium">Total Biaya:</span>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold text-red-600">Rp {{ formatCurrency(getTotalPrice) }}</span>
                  <span class="text-xs text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Hemat {{ getTotalDiscountPercentage }}%
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Informasi Diskon Tambahan - Mobile -->
            <div class="mt-3 bg-blue-50 rounded-lg border border-blue-200 p-2">
              <div class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 mr-1.5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong><p class="text-xs text-blue-800 font-medium mb-1">Harga di atas belum final</p></strong>
                  <p class="text-xs text-blue-600">
                    Anda berpotensi mendapatkan diskon tambahan ketika datang ke bengkel. Jika ada tambahan layanan, juga bisa dapat diskon lagi.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Mobile continue button -->
            <div class="mt-3">
              <button
                @click="$emit('next-step')"
                :disabled="(formData.service_ids.length === 0 && !formData.template_id)"
                class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                Lanjut Pilih Jadwal
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile empty state -->
      <div v-else class="bg-white border border-gray-200 rounded-lg shadow-md p-5 text-center">
        <div class="bg-gray-50 rounded-full p-4 inline-flex mx-auto mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-sm font-medium text-gray-900">Belum ada layanan terpilih</h3>
        <p class="mt-1 text-xs text-gray-500">Pilih paket atau layanan individual untuk melanjutkan.</p>
        
        <button 
          v-if="!selectedServiceCategory"
          @click="$emit('select-service-category', 'berkala')" 
          class="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Mulai Dengan Servis Berkala
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  name: 'ServiceSummarySection',
  props: {
    formData: {
      type: Object,
      required: true
    },
    totalServiceDuration: {
      type: Number,
      default: 0
    },
    servicePackages: {
      type: Array,
      default: () => []
    },
    services: {
      type: Array,
      default: () => []
    },
    hasServices: {
      type: Boolean,
      default: false
    },
    selectedServiceCategory: {
      type: String,
      default: null
    },
    showMobileSummary: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'select-service-category', 
    'toggle-mobile-summary', 
    'select-package', 
    'toggle-service',
    'next-step'
  ],
  setup(props, { emit }) {
    // Internal state for mobile summary visibility
    const mobileSummaryVisible = ref(props.showMobileSummary);
    
    // State untuk toggling detail paket
    const showPackageBreakdown = ref(false);
    const showMobilePackageBreakdown = ref(false);
    
    // Watch for prop changes to update internal state
    watch(() => props.showMobileSummary, (newVal) => {
      mobileSummaryVisible.value = newVal;
    });
    
    // Handle toggling the mobile summary
    const handleToggleMobileSummary = () => {
      mobileSummaryVisible.value = !mobileSummaryVisible.value;
      emit('toggle-mobile-summary');
    };
    
    // Toggle functions for package details
    const togglePackageBreakdown = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      showPackageBreakdown.value = !showPackageBreakdown.value;
    };
    
    const toggleMobilePackageBreakdown = (event) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      showMobilePackageBreakdown.value = !showMobilePackageBreakdown.value;
    };
    
    // Computed properties untuk mendapatkan layanan dan produk dari paket
    const packageServices = computed(() => {
      if (!props.formData.template_id) return [];
      
      const packageItem = props.servicePackages.find(p => p && p.id === props.formData.template_id);
      
      if (!packageItem || !packageItem.services || !Array.isArray(packageItem.services)) {
        return [];
      }
      
      return packageItem.services;
    });
    
    const packageProducts = computed(() => {
      if (!props.formData.template_id) return [];
      
      const packageItem = props.servicePackages.find(p => p && p.id === props.formData.template_id);
      
      if (!packageItem || !packageItem.products || !Array.isArray(packageItem.products)) {
        return [];
      }
      
      return packageItem.products;
    });
    
    // Get all selected services that are not part of the selected package
    const visibleServiceIds = computed(() => {
      if (!props.formData.service_ids || !Array.isArray(props.formData.service_ids)) {
        return [];
      }
      
      // If no package selected, show all selected services
      if (!props.formData.template_id) {
        return props.formData.service_ids;
      }
      
      // Get the package to check its services
      const packageItem = props.servicePackages.find(p => p && p.id === props.formData.template_id);
      if (!packageItem) {
        return props.formData.service_ids;
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
      return props.formData.service_ids.filter(id => !packageItemIds.includes(id));
    });

    // Get package name
    const getPackageName = (packageId) => {
      const packageItem = props.servicePackages.find(p => p && p.id === packageId);
      return packageItem ? packageItem.name : '';
    };

    // Get package services count
    const getPackageServicesCount = (packageId) => {
      const packageItem = props.servicePackages.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.services || !Array.isArray(packageItem.services)) {
        return 0;
      }
      return packageItem.services.length;
    };

    // Get package products count
    const getPackageProductsCount = (packageId) => {
      const packageItem = props.servicePackages.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.products || !Array.isArray(packageItem.products)) {
        return 0;
      }
      return packageItem.products.length;
    };

    // Get package price
    const getPackagePrice = (packageId) => {
      const packageItem = props.servicePackages.find(p => p && p.id === packageId);
      return packageItem && packageItem.price ? packageItem.price : 0;
    };

    // Get package original price (before any discount)
    const getPackageOriginalPrice = (packageId) => {
      const packageItem = props.servicePackages.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.price) return 0;
      
      // Harga asli adalah 120% dari harga setelah diskon regular (sesuai contoh foto)
      return Math.round(packageItem.price * 1.2);
    };

    // Get service original price
    const getOriginalPrice = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      if (!service || !service.price) return 0;
      
      // Harga asli adalah 120% dari harga setelah diskon regular (sesuai contoh foto)
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
      for (const pack of props.servicePackages || []) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.name) {
            return product.name;
          }
        }
      }
      
      return `Item #${itemId}`;
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
      for (const pack of props.servicePackages || []) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.price !== undefined) {
            return product.price;
          }
        }
      }
      
      return 0;
    };

    // Get original list price (tanpa diskon apapun)
    const getOriginalListPrice = computed(() => {
      let total = 0;
      
      // Package price before any discount
      if (props.formData.template_id) {
        total += getPackageOriginalPrice(props.formData.template_id);
      }
      
      // Add individual service original prices
      for (const serviceId of visibleServiceIds.value) {
        total += getOriginalPrice(serviceId);
      }
      
      return total;
    });
    
    // Get price after regular discount, but before online booking discount
    const getPriceAfterRegularDiscount = computed(() => {
      let total = 0;
      
      // Package price after regular discount
      if (props.formData.template_id) {
        const packageItem = props.servicePackages.find(p => p && p.id === props.formData.template_id);
        if (packageItem && packageItem.price) {
          total += packageItem.price;
        }
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
    
    // Total discount amount (sum of both discounts)
    const getDiscountAmount = computed(() => {
      return getRegularDiscountAmount.value + getBookingDiscountAmount.value;
    });
    
    // Calculate total discount percentage (compared to original list price)
    const getTotalDiscountPercentage = computed(() => {
      if (getOriginalListPrice.value <= 0) return 0;
      return Math.round((1 - getTotalPrice.value / getOriginalListPrice.value) * 100);
    });

    // Format currency
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
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

    return {
      mobileSummaryVisible,
      handleToggleMobileSummary,
      visibleServiceIds,
      getPackageName,
      getPackageServicesCount,
      getPackageProductsCount,
      getPackagePrice,
      getPackageOriginalPrice,
      getOriginalPrice,
      getServiceDuration,
      getItemName,
      getItemPrice,
      getTotalPrice,
      getOriginalListPrice,
      getPriceAfterRegularDiscount,
      getRegularDiscountAmount,
      getBookingDiscountAmount,
      getDiscountAmount,
      getTotalDiscountPercentage,
      formatCurrency,
      formatDuration,
      // Properties for package breakdown
      showPackageBreakdown,
      showMobilePackageBreakdown,
      togglePackageBreakdown,
      toggleMobilePackageBreakdown,
      packageServices,
      packageProducts
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