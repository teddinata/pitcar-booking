<template>
  <div class="bg-white shadow rounded-lg overflow-hidden mt-4">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900">Pilih Jenis Servis</h2>
        <div class="mt-2 sm:mt-0">
          <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tambahan Diskon 10% dengan<br> Booking Online
          </div>
        </div>
      </div>
      
      <!-- Alert Info Promo -->
      <div class="mb-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
        <div class="flex items-start">
          <svg class="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <p class="text-sm text-blue-800 font-medium">HEMAT! Booking online lebih murah</p>
            <p class="text-xs text-blue-700">Dapatkan <strong>tambahan diskon 10%</strong> untuk semua layanan dengan booking melalui aplikasi.</p>
          </div>
        </div>
      </div>
      
      <!-- Loading indicator -->
      <div v-if="loading" class="py-8 flex justify-center">
        <svg class="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      <div v-else>
        <!-- Main content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Columns 1+2: Categories, Packages & Services -->
          <div class="lg:col-span-2 space-y-4">
            <!-- Category Selection -->
            <div v-if="!selectedServiceCategory" class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 class="text-sm font-medium text-gray-700">Pilih Kategori Servis</h3>
              </div>
              
              <!-- Service categories grid -->
              <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Kategori: Servis Berkala -->
                <div 
                  @click="handleCategorySelect('berkala')" 
                  class="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all hover:shadow-md"
                >
                  <div class="flex items-center">
                    <div class="p-2 bg-blue-100 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <span class="font-medium">Servis Berkala</span>
                      <p class="text-xs text-blue-600 mt-1">Perawatan rutin kendaraan</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                
                <!-- Kategori: Tune Up -->
                <div 
                  @click="handleCategorySelect('tuneup')" 
                  class="bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all hover:shadow-md"
                >
                  <div class="flex items-center">
                    <div class="p-2 bg-green-100 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div>
                      <span class="font-medium">Tune Up</span>
                      <p class="text-xs text-green-600 mt-1">Performa mesin optimal</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                
                <!-- Kategori: Servis AC -->
                <div 
                  @click="handleCategorySelect('ac')" 
                  class="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all hover:shadow-md"
                >
                  <div class="flex items-center">
                    <div class="p-2 bg-purple-100 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <span class="font-medium">Servis AC</span>
                      <p class="text-xs text-purple-600 mt-1">Sistem pendingin optimal</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                
                <!-- Kategori: Perbaikan Lain -->
                <div 
                  @click="handleCategorySelect('repair')" 
                  class="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all hover:shadow-md"
                >
                  <div class="flex items-center">
                    <div class="p-2 bg-amber-100 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <span class="font-medium">Perbaikan Lain</span>
                      <p class="text-xs text-amber-600 mt-1">Berbagai jenis perbaikan</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- When category is selected -->
            <template v-if="selectedServiceCategory">
              <!-- Header with back button -->
              <div class="flex flex-wrap items-center mb-3">
                <button 
                  @click="handleCategorySelect(null)"
                  class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Semua Kategori
                </button>
                
                <!-- Selected category label -->
                <div 
                  class="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                  :class="{
                    'bg-blue-100 text-blue-800': selectedServiceCategory === 'berkala',
                    'bg-green-100 text-green-800': selectedServiceCategory === 'tuneup',
                    'bg-purple-100 text-purple-800': selectedServiceCategory === 'ac',
                    'bg-amber-100 text-amber-800': selectedServiceCategory === 'repair'
                  }"
                >
                  <!-- Category icon -->
                  <svg v-if="selectedServiceCategory === 'berkala'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <svg v-if="selectedServiceCategory === 'tuneup'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <svg v-if="selectedServiceCategory === 'ac'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg v-if="selectedServiceCategory === 'repair'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span class="font-medium">
                    {{ 
                      selectedServiceCategory === 'berkala' ? 'Servis Berkala' : 
                      selectedServiceCategory === 'tuneup' ? 'Tune Up' : 
                      selectedServiceCategory === 'ac' ? 'Servis AC' : 
                      'Perbaikan Lain' 
                    }}
                  </span>
                </div>
              </div>

              <!-- Service Packages -->
              <service-packages-section 
                :category-packages="getCategoryPackages"
                :selected-template-id="formData.template_id"
                :open-package-details="openPackageDetailsId"
                @select-package="handlePackageSelect"
                @toggle-package-details="togglePackageDetails"
              />

              <!-- Individual Services -->
              <service-items-section
                :category-services="getCategoryServices"
                :selected-service-ids="formData.service_ids"
                :service-search-query="serviceSearchQuery"
                @search="$emit('search-services', $event)"
                @toggle-service="handleServiceToggle"
              />
            </template>
          </div>
          
          <!-- Column 3: Service Summary -->
          <service-summary-section
            :form-data="formData"
            :total-service-duration="totalServiceDuration"
            :service-packages="servicePackages"
            :services="services"
            :has-services="hasServices"
            :selected-service-category="selectedServiceCategory"
            :show-mobile-summary="showMobileSummaryState"
            @select-service-category="handleCategorySelect"
            @toggle-mobile-summary="toggleMobileSummary"
            @select-package="handlePackageSelect"
            @toggle-service="handleServiceToggle"
            @next-step="handleNextStep"
          />
        </div>
        
        <!-- Notes Section -->
        <div class="mt-6">
          <label for="notes" class="block text-sm font-medium text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Apa Keluhan Mobilnya, nih?
          </label>
          <div class="mt-1">
            <textarea
              id="notes"
              v-model="formData.notes"
              rows="3"
              class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Masukkan catatan atau keluhan tambahan kendaraan Anda di sini"
            ></textarea>
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
        @click="handleNextStep"
        :disabled="(formData.service_ids.length === 0 && !formData.template_id) || loading"
        class="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        <span v-if="loading" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        Lanjut Pilih Jadwal
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <!-- Toast notification -->
    <div 
      v-if="toast.show" 
      class="fixed bottom-20 inset-x-0 px-4 z-50 animate-slide-up"
    >
      <div 
        class="bg-white shadow-lg rounded-lg max-w-md mx-auto border-l-4 overflow-hidden"
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
            <button @click="hideToast" class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
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
  </div>
</template>

<script>
import { computed, ref, reactive } from 'vue';
import ServicePackagesSection from './service/ServicePackagesSection.vue';
import ServiceItemsSection from './service/ServiceItemsSection.vue';
import ServiceSummarySection from './service/ServiceSummarySection.vue';

export default {
  name: 'ServiceSelectionStep',
  components: {
    ServicePackagesSection,
    ServiceItemsSection,
    ServiceSummarySection
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    servicePackages: {
      type: Array,
      default: () => []
    },
    services: {
      type: Array,
      default: () => []
    },
    selectedServiceCategory: {
      type: String,
      default: null
    },
    totalServiceDuration: {
      type: Number,
      default: 0
    },
    showMobileSummary: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'update:form',
    'select-service-category',
    'select-package',
    'toggle-service',
    'toggle-package-details',
    'search-services',
    'update:show-mobile-summary',
    'prev-step',
    'next-step'
  ],
  data() {
    return {
      // Toast notification system
      toast: {
        show: false,
        message: '',
        type: 'info',
        progress: 100
      },
      toastTimeout: null,
      progressInterval: null,
      
      // Other state
      openPackageDetailsId: null,
      showMobileSummaryState: this.showMobileSummary,
      serviceSearchQuery: ''
    };
  },
  computed: {
    formData: {
      get() {
        return this.form;
      },
      set(value) {
        this.$emit('update:form', value);
      }
    },
    
    // Category keyword mappings
    categoryKeywords() {
      return {
        'berkala': ['berkala', 'service berkala', 'servis berkala'],
        'tuneup': ['tune up', 'tune-up', 'tuneup'],
        'ac': ['ac', 'air conditioner', 'pendingin', 'freon'],
        'repair': ['perbaikan', 'ganti', 'repair', 'penggantian']
      };
    },
    
    getCategoryPackages() {
      if (!this.selectedServiceCategory || !this.servicePackages) {
        return [];
      }
      
      return this.servicePackages.filter(pack => {
        if (!pack || !pack.name) return false;
        
        const packName = pack.name.toLowerCase();
        return this.categoryKeywords[this.selectedServiceCategory].some(keyword => 
          packName.includes(keyword)
        );
      });
    },

    getCategoryServices() {
      if (!this.selectedServiceCategory || !this.services) {
        return [];
      }
      
      return this.services.filter(service => {
        if (!service || !service.name || service.duration <= 0) return false;
        
        const serviceName = service.name.toLowerCase();
        return this.categoryKeywords[this.selectedServiceCategory].some(keyword => 
          serviceName.includes(keyword)
        );
      });
    },

    hasServices() {
      return (this.formData.service_ids && this.formData.service_ids.length > 0) || 
            this.formData.template_id !== null;
    },
    
    // Fungsi untuk mendapatkan nama kategori dalam bahasa Indonesia
    getCategoryName() {
      switch(this.selectedServiceCategory) {
        case 'berkala':
          return 'Servis Berkala';
        case 'tuneup':
          return 'Tune Up';
        case 'ac':
          return 'Servis AC';
        case 'repair':
          return 'Perbaikan Lain';
        default:
          return '';
      }
    }
  },
  methods: {
    // Toast methods
    showToast(message, type = 'info') {
      // Clear existing timeouts and intervals
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
      if (this.progressInterval) clearInterval(this.progressInterval);
      
      // Set toast properties
      this.toast.show = true;
      this.toast.message = message;
      this.toast.type = type;
      this.toast.progress = 100;
      
      // Set up progress bar
      const duration = 5000; // 5 seconds
      const intervalTime = 50; // Update every 50ms
      const steps = duration / intervalTime;
      const decrementValue = 100 / steps;
      
      this.progressInterval = setInterval(() => {
        this.toast.progress -= decrementValue;
        if (this.toast.progress <= 0) {
          clearInterval(this.progressInterval);
        }
      }, intervalTime);
      
      // Auto-hide the toast after duration
      this.toastTimeout = setTimeout(() => {
        this.hideToast();
      }, duration);
    },
    
    hideToast() {
      this.toast.show = false;
      if (this.progressInterval) clearInterval(this.progressInterval);
      if (this.toastTimeout) clearTimeout(this.toastTimeout);
    },
    
    // Handler untuk memilih kategori dengan toast
    handleCategorySelect(category) {
      // Emit event to parent
      this.$emit('select-service-category', category);
      
      // Show toast when category selected
      if (category) {
        // Get category name for toast
        const categoryName = category === 'berkala' ? 'Servis Berkala' : 
                        category === 'tuneup' ? 'Tune Up' : 
                        category === 'ac' ? 'Servis AC' : 
                        'Perbaikan Lain';
        
        this.showToast(`Kategori ${categoryName} dipilih`, 'info');
      }
    },
    
    // Handler untuk memilih paket dengan toast
    handlePackageSelect(packageId) {
      // Emit event to parent
      this.$emit('select-package', packageId);
      
      // Show toast when package selected or deselected
      if (packageId) {
        // Find the package to get its name
        const selectedPackage = this.servicePackages.find(p => p.id === packageId);
        
        if (selectedPackage) {
          this.showToast(`${selectedPackage.name} ditambahkan ke keranjang`, 'success');
        }
      } else {
        this.showToast('Paket layanan dibatalkan', 'info');
      }
    },
    
    // Handler untuk memilih layanan individual dengan toast
    handleServiceToggle(serviceId) {
      // Emit event to parent
      this.$emit('toggle-service', serviceId);
      
      // Show toast when service selected or deselected
      // Check if service exists in selection after emission
      const serviceExists = this.formData.service_ids.includes(serviceId);
      const service = this.services.find(s => s.id === serviceId);
      
      if (service) {
        if (serviceExists) {
          this.showToast(`${service.name} ditambahkan`, 'success');
        } else {
          this.showToast(`${service.name} dihapus`, 'info');
        }
      }
    },
    
    // Handler untuk pindah ke langkah berikutnya dengan toast
    handleNextStep() {
      // Validasi apakah sudah memilih layanan
      if (this.formData.service_ids.length === 0 && !this.formData.template_id) {
        this.showToast('Silakan pilih minimal satu layanan', 'error');
        return;
      }
      
      // Show toast
      this.showToast('Layanan berhasil dipilih! Melanjutkan ke pemilihan jadwal...', 'success');
      
      // Navigate to next step after short delay
      setTimeout(() => {
        this.$emit('next-step');
      }, 1000);
    },
    
    // Fungsi untuk package details toggle
    togglePackageDetails(packageId) {
      this.openPackageDetailsId = this.openPackageDetailsId === packageId ? null : packageId;
      this.$emit('toggle-package-details', packageId);
    },
    
    // Fungsi untuk toggle mobile summary
    toggleMobileSummary() {
      this.showMobileSummaryState = !this.showMobileSummaryState;
      this.$emit('update:show-mobile-summary', this.showMobileSummaryState);
    }
  },
  beforeDestroy() {
    // Clean up any timers
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    if (this.progressInterval) clearInterval(this.progressInterval);
  }
};
</script>

<style scoped>
/* Animation for slide up toast */
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

/* Focus styles */
button:focus, input:focus, select:focus, textarea:focus {
  outline: none;
}

/* Smooth transitions */
button, input, select, textarea {
    transition: all 0.2s ease-in-out;
  }
  </style>

