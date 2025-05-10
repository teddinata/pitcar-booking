<template>
  <div class="bg-gray-50 min-h-screen pb-12">
    <!-- Toast notification -->
    <div v-if="toast.show" class="fixed top-4 right-4 z-50">
      <div :class="{
        'bg-green-50 text-green-800 border-green-500': toast.type === 'success',
        'bg-red-50 text-red-800 border-red-500': toast.type === 'error',
        'bg-yellow-50 text-yellow-800 border-yellow-500': toast.type === 'warning'
      }" class="px-4 py-3 rounded-lg shadow-md border-l-4 flex items-start">
        <div v-if="toast.type === 'success'" class="flex-shrink-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div v-else-if="toast.type === 'error'" class="flex-shrink-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div v-else class="flex-shrink-0 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Booking Servis</h1>
            <p class="mt-1 text-sm text-gray-500">Pesan jadwal servis untuk kendaraan Anda dengan mudah</p>
          </div>
          <div>
            <button 
              v-if="currentStep > 1" 
              @click="resetForm"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Mulai Baru
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress steps -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <div class="flex items-center">
            <div :class="{
              'bg-red-600 text-white': currentStep >= 1,
              'bg-gray-200 text-gray-400': currentStep < 1
            }" class="rounded-full h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div class="ml-2">
              <p :class="{
                'font-medium text-gray-900': currentStep >= 1,
                'text-gray-500': currentStep < 1
              }" class="text-sm">Data Kendaraan</p>
            </div>
          </div>
        </div>
        
        <div class="flex-1 hidden sm:block">
          <div class="h-0.5 bg-gray-200 relative">
            <div :class="{
              'w-full': currentStep >= 2,
              'w-0': currentStep < 2
            }" class="absolute inset-0 bg-red-600 transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center">
            <div :class="{
              'bg-red-600 text-white': currentStep >= 2,
              'bg-gray-200 text-gray-400': currentStep < 2
            }" class="rounded-full h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-2">
              <p :class="{
                'font-medium text-gray-900': currentStep >= 2,
                'text-gray-500': currentStep < 2
              }" class="text-sm">Jenis Servis</p>
            </div>
          </div>
        </div>
        
        <div class="flex-1 hidden sm:block">
          <div class="h-0.5 bg-gray-200 relative">
            <div :class="{
              'w-full': currentStep >= 3,
              'w-0': currentStep < 3
            }" class="absolute inset-0 bg-red-600 transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center">
            <div :class="{
              'bg-red-600 text-white': currentStep >= 3,
              'bg-gray-200 text-gray-400': currentStep < 3
            }" class="rounded-full h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-2">
              <p :class="{
                'font-medium text-gray-900': currentStep >= 3,
                'text-gray-500': currentStep < 3
              }" class="text-sm">Jadwal & Stall</p>
            </div>
          </div>
        </div>
        
        <div class="flex-1 hidden sm:block">
          <div class="h-0.5 bg-gray-200 relative">
            <div :class="{
              'w-full': currentStep >= 4,
              'w-0': currentStep < 4
            }" class="absolute inset-0 bg-red-600 transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center">
            <div :class="{
              'bg-red-600 text-white': currentStep >= 4,
              'bg-gray-200 text-gray-400': currentStep < 4
            }" class="rounded-full h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-2">
              <p :class="{
                'font-medium text-gray-900': currentStep >= 4,
                'text-gray-500': currentStep < 4
              }" class="text-sm">Konfirmasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Step 1: Vehicle Information -->
      <div v-if="currentStep === 1" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">Data Kendaraan</h2>
          
          <div class="space-y-6">
            <!-- Plate Number -->
            <div>
              <label for="plate-number" class="block text-sm font-medium text-gray-700">
                Nomor Plat <span class="text-red-600">*</span>
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <input
                  id="plate-number"
                  v-model="customerForm.plate_number"
                  type="text"
                  class="pl-10 py-3 px-2 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md uppercase"
                  placeholder="B1234ABC"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    @click="verifyVehicle" 
                    :disabled="!customerForm.plate_number || loading"
                    class="text-red-600 hover:text-red-900 font-medium text-sm"
                  >
                    <span v-if="loading">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    <span v-else>Cek</span>
                  </button>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">Masukkan nomor plat untuk memeriksa kendaraan terdaftar</p>
            </div>
            
            <!-- New Vehicle Form -->
            <div v-if="!vehicleFound && customerForm.plate_number" class="mt-6 space-y-6">
              <h3 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">Kendaraan baru, silakan lengkapi data berikut</h3>
              
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- Customer Name -->
                <div class="sm:col-span-3">
                  <label for="customer-name" class="block text-sm font-medium text-gray-700">
                    Nama Lengkap <span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <input
                      id="customer-name"
                      v-model="customerForm.customer_name"
                      type="text"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <!-- Phone Number -->
                <div class="sm:col-span-3">
                  <label for="customer-phone" class="block text-sm font-medium text-gray-700">
                    Nomor Telepon <span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <input
                      id="customer-phone"
                      v-model="customerForm.customer_phone"
                      type="tel"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
                
                <!-- Email -->
                <div class="sm:col-span-3">
                  <label for="customer-email" class="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div class="mt-1">
                    <input
                      id="customer-email"
                      v-model="customerForm.customer_email"
                      type="email"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <!-- Brand Selection -->
                <div class="sm:col-span-3">
                  <label for="brand" class="block text-sm font-medium text-gray-700">
                    Merek Mobil <span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <select
                      id="brand"
                      v-model="customerForm.brand_id"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="" disabled>Pilih Merek</option>
                      <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                    </select>
                  </div>
                </div>
                
                <!-- Brand Type -->
                <div class="sm:col-span-3">
                  <label for="brand-type" class="block text-sm font-medium text-gray-700">
                    Tipe Mobil <span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <select
                      id="brand-type"
                      v-model="customerForm.brand_type_id"
                      :disabled="!customerForm.brand_id"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="" disabled>Pilih Tipe</option>
                      <option v-for="type in brandTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                    </select>
                  </div>
                </div>
                
                <!-- Car Year -->
                <div class="sm:col-span-3">
                  <label for="car-year" class="block text-sm font-medium text-gray-700">
                    Tahun Mobil
                  </label>
                  <div class="mt-1">
                    <input
                      id="car-year"
                      v-model="customerForm.car_year"
                      type="number"
                      min="1990"
                      :max="new Date().getFullYear()"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <!-- Car Color -->
                <div class="sm:col-span-3">
                  <label for="car-color" class="block text-sm font-medium text-gray-700">
                    Warna Mobil
                  </label>
                  <div class="mt-1">
                    <input
                      id="car-color"
                      v-model="customerForm.car_color"
                      type="text"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Putih"
                    />
                  </div>
                </div>
                
                <!-- Transmission -->
                <div class="sm:col-span-3">
                  <label for="transmission" class="block text-sm font-medium text-gray-700">
                    Transmisi
                  </label>
                  <div class="mt-1">
                    <select
                      id="transmission"
                      v-model="customerForm.transmission_id"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="" disabled>Pilih Transmisi</option>
                      <option v-for="trans in transmissions" :key="trans.id" :value="trans.id">{{ trans.name }}</option>
                    </select>
                  </div>
                </div>
                
                <!-- Engine Type -->
                <div class="sm:col-span-3">
                  <label for="engine-type" class="block text-sm font-medium text-gray-700">
                    Jenis Mesin
                  </label>
                  <div class="mt-1">
                    <select
                      id="engine-type"
                      v-model="customerForm.engine_type"
                      class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="petrol">Bensin</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Listrik</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
          <button
            @click="nextStep"
            :disabled="!isValidForm || loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            <span v-if="loading" class="mr-2">
              <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            Lanjut
          </button>
        </div>
      </div>

      <!-- Step 2: Service Selection (Jenis Servis) -->
      <!-- Step 2: Service Selection (Dynamic Popular Services) -->
      <!-- Step 2: Service Selection (Simple with Top Services Header) -->
      <div v-if="currentStep === 2" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <!-- <h2 class="text-lg font-medium text-gray-900 mb-6">Pilih Jenis Servis</h2> -->
          <div class="flex items-center mb-6">
            <h2 class="text-lg font-medium text-gray-900">Pilih Jenis Servis</h2>
            <div class="ml-3 flex items-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Promo Spesial
              </span>
            </div>
          </div>
          
          <!-- Tambahkan banner diskon di atas layanan -->
          <div class="mb-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg shadow-md">
            <div class="px-4 py-3 text-white">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-bold">Promo Spesial Booking!</h3>
                  <p class="text-sm opacity-90">Dapatkan diskon hingga 30% untuk semua layanan</p>
                </div>
                <div class="bg-white text-red-600 rounded-full px-3 py-1 font-bold text-sm">
                  HEMAT!
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-8">
            <!-- Top Services Section -->
            <div>
              <div class="flex items-center mb-3">
                <h3 class="text-sm font-medium text-gray-700">Top Layanan yang Ada di Pitcar</h3>
                <span class="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">Rekomendasi</span>
                <span class="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Diskon 10-30%</span>
              </div>
              
              <div v-if="loading" class="py-8 flex justify-center">
                <svg class="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              
              <div v-else-if="filteredTopServices.length === 0" class="py-8 text-center">
                <p class="text-gray-500">Tidak ada layanan utama tersedia saat ini.</p>
              </div>
              
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="service in filteredTopServices" :key="service.id" class="relative flex items-start p-4 border border-gray-300 rounded-lg hover:border-gray-400">
                  <div class="flex items-center h-5">
                    <input
                      :id="`service-${service.id}`"
                      type="checkbox"
                      :value="service.id"
                      v-model="customerForm.service_ids"
                      class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      @change="calculateTotalDuration"
                    />
                  </div>
                  <div class="ml-3 flex-1">
                    <label :for="`service-${service.id}`" class="text-sm font-medium text-gray-700 cursor-pointer">
                      {{ service.name }}
                    </label>
                    <p class="text-sm text-gray-500">{{ service.description || 'Tidak ada deskripsi' }}</p>
                    <div class="mt-1 flex justify-between">
                      <div>
                        <span class="text-xs text-gray-500 line-through">Rp {{ getOriginalPrice(service.id).toLocaleString() }}</span>
                        <span class="ml-1 text-sm font-medium text-red-600">Rp {{ service.price.toLocaleString() }}</span>
                        <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">-{{ getServiceDiscountPercentage(service.id) }}%</span>
                      </div>
                      <span class="text-xs text-gray-500">Durasi: {{ formatDuration(service.duration) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Search and Additional Services -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cari Layanan Lainnya</label>
                <div class="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="serviceSearchQuery"
                    @input="searchServices"
                    class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Ketik nama layanan yang Anda butuhkan..."
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Search Results -->
              <div v-if="serviceSearchQuery && searchResults.length > 0" class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div class="max-h-64 overflow-y-auto">
                  <div v-for="service in searchResults" :key="service.id" class="border-b border-gray-200 last:border-b-0">
                    <div 
                      @click="toggleServiceSelection(service.id)"
                      class="flex items-start p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      :class="{'bg-red-50': isServiceSelected(service.id)}"
                    >
                      <div class="flex-shrink-0 mt-0.5">
                        <div 
                          class="h-5 w-5 rounded border flex items-center justify-center"
                          :class="isServiceSelected(service.id) ? 'bg-red-600 border-red-600' : 'border-gray-300'"
                        >
                          <svg v-if="isServiceSelected(service.id)" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-3 flex-1">
                        <h4 class="text-sm font-medium text-gray-900">{{ service.name }}</h4>
                        <p v-if="service.description" class="mt-1 text-xs text-gray-500">{{ service.description }}</p>
                        <div class="mt-1 flex justify-between items-center">
                          <div>
                            <span class="text-xs text-gray-500 line-through">Rp {{ getOriginalPrice(service.id).toLocaleString() }}</span>
                            <span class="ml-1 text-sm font-medium text-red-600">Rp {{ service.price.toLocaleString() }}</span>
                            <span class="ml-1 text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">-{{ getServiceDiscountPercentage(service.id) }}%</span>
                          </div>
                          <span class="text-xs text-gray-500">Durasi: {{ formatDuration(service.duration) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else-if="serviceSearchQuery && searchResults.length === 0" class="py-8 text-center">
                <p class="text-gray-500">Tidak ada layanan yang sesuai dengan pencarian Anda.</p>
              </div>
            </div>
            
            <!-- Service Duration Summary -->
            <div v-if="totalServiceDuration > 0" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 class="text-sm font-medium text-gray-700">Ringkasan Layanan</h4>
              <div class="mt-2 space-y-2 max-h-64 overflow-y-auto">
                <div v-for="serviceId in customerForm.service_ids" :key="serviceId" class="flex justify-between items-center text-sm">
                  <div class="flex items-center">
                    <button 
                      @click="toggleServiceSelection(serviceId)"
                      class="mr-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <span class="text-gray-700">{{ getServiceName(serviceId) }}</span>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-500 line-through">Rp {{ getOriginalPrice(serviceId).toLocaleString() }}</span>
                    <span class="text-gray-900 font-medium">Rp {{ getServicePrice(serviceId).toLocaleString() }}</span>
                  </div>
                  <!-- <span class="text-gray-900 font-medium">Rp {{ getServicePrice(serviceId).toLocaleString() }}</span> -->
                </div>
              </div>
              <div class="pt-2 mt-2 border-t border-gray-200">
                <div class="flex justify-between items-center py-1">
                  <span class="text-gray-500">Total Durasi:</span>
                  <span class="text-gray-900 font-medium">{{ formatDuration(totalServiceDuration) }}</span>
                </div>
                <div class="flex justify-between items-center py-1">
                  <div class="flex items-center">
                    <span class="text-gray-500">Total Biaya Estimasi:</span>
                    <span class="ml-2 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
                      Hemat {{ getTotalDiscountPercentage() }}%
                    </span>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="text-xs text-gray-500 line-through">Rp {{ getTotalOriginalPrice().toLocaleString() }}</span>
                    <span class="text-lg font-bold text-red-600">Rp {{ getTotalPrice().toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Additional Notes -->
            <div>
              <label for="notes" class="block text-sm font-medium text-gray-700">Catatan Tambahan</label>
              <div class="mt-1">
                <textarea
                  id="notes"
                  v-model="customerForm.notes"
                  rows="3"
                  class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Masukkan catatan atau keluhan tambahan di sini"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
          <button
            @click="prevStep"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Kembali
          </button>
          <button
            @click="nextStep"
            :disabled="customerForm.service_ids.length === 0 || loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            Lanjut
          </button>
        </div>
      </div>

      <!-- Step 3: Schedule and Stall Selection -->
      <!-- Step 3: Schedule and Stall Selection (Improved) -->
      <div v-if="currentStep === 3" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-6">Jadwal & Pilih Stall</h2>
          
          <div class="space-y-8">
            <!-- Date Selection with H-1 rule -->
            <div>
              <label for="booking-date" class="block text-sm font-medium text-gray-700">
                Tanggal Booking <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="booking-date"
                  v-model="formattedSelectedDate"
                  type="date"
                  :min="minDateH1"
                  :max="maxDate"
                  class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  @change="validateSelectedDate"
                />
              </div>
              <div class="mt-1 flex items-center">
                <p v-if="selectedDate" class="text-sm text-gray-500">
                  <span class="font-medium">{{ formattedSelectedDateDisplay }}</span>
                  <span v-if="isDateToday" class="ml-2 text-yellow-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Booking hanya tersedia minimal H-1
                  </span>
                  <span v-if="isTomorrow" class="ml-2 text-green-600 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    Tersedia untuk booking besok
                  </span>
                </p>
              </div>
            </div>
            
            <!-- Time Selection with visual indicators -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Waktu Booking <span class="text-red-600">*</span></label>
              <p class="mt-1 text-xs text-gray-500">Pilih waktu mulai servis (jam operasional: 08:00 - 17:00)</p>
              
              <div class="mt-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                <div v-for="hour in availableHours" :key="hour">
                  <button
                    @click="selectHour(hour)"
                    :disabled="!isHourAvailable(hour)"
                    :class="{
                      'bg-red-100 border-red-500 text-red-800': selectedHour === hour,
                      'border-gray-300 hover:bg-gray-50 text-gray-700': selectedHour !== hour && isHourAvailable(hour),
                      'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed': !isHourAvailable(hour)
                    }"
                    class="w-full py-2 border rounded-md text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span class="relative">
                      {{ hour }}
                      <span v-if="!isHourAvailable(hour)" class="absolute -top-1 -right-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              
              <!-- Error message for time selection -->
              <div v-if="timeSelectionError" class="mt-2 rounded-md bg-red-50 p-2">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-700">
                      {{ timeSelectionError }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Summary of Service Duration -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-sm font-medium text-gray-900">Informasi Durasi</h3>
              </div>
              <p class="text-xs text-gray-500 mb-2">Durasi servis dihitung otomatis berdasarkan layanan yang dipilih.</p>
              
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <dt class="text-xs text-gray-500">Total Durasi:</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ formatDuration(totalServiceDuration) }}</dd>
                </div>
                
                <div v-if="selectedHour">
                  <dt class="text-xs text-gray-500">Waktu Mulai:</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ selectedHour }}</dd>
                </div>
                
                <div v-if="selectedHour">
                  <dt class="text-xs text-gray-500">Estimasi Selesai:</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ calculateEndTime(selectedHour, totalServiceDuration) }}</dd>
                </div>
              </div>
              
              <!-- Service time warning -->
              <div v-if="isServiceTimeWarning" class="mt-3 rounded-md bg-yellow-50 p-2">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                      Waktu selesai melebihi jam operasional bengkel (17:00). Servis mungkin akan dilanjutkan keesokan harinya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Stall Selection with improved UI -->
            <div>
              <div class="mb-3 flex justify-between items-center">
                <label class="block text-sm font-medium text-gray-700">Pilih Stall <span class="text-red-600">*</span></label>
                <div v-if="loading" class="inline-flex items-center space-x-2">
                  <svg class="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-sm text-gray-500">Memeriksa ketersediaan...</span>
                </div>
              </div>


              
              <!-- Stalls grid with improved visualization -->
              <div v-if="selectedHour" class="space-y-4">
                <!-- Stall layout visualization -->
                <div class="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div class="text-center py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                    Layout Stall ({{ formattedSelectedDateDisplay }})
                  </div>

                  <!-- Tambahkan visualisasi lantai garasi sebelum stall grid -->
                  <!-- Tambahkan kode ini sebelum div grid stall -->

                  <div class="mb-6">
                    <h3 class="text-sm font-medium text-gray-700 mb-2">Denah Stall Bengkel</h3>
                    
                    <div class="bg-gray-800 p-3 rounded-lg">
                      <!-- Garage Layout -->
                      <div class="relative bg-gray-700 rounded-lg overflow-hidden">
                        <!-- Top entrance -->
                        <div class="w-full h-8 bg-gray-600 flex items-center justify-center">
                          <div class="w-40 h-2 bg-yellow-400"></div>
                        </div>
                        
                        <!-- Garage floor with parking spots -->
                        <div class="p-3 flex flex-wrap gap-2 justify-center">
                          <!-- Visual indicator of slots -->
                          <div v-for="stall in allStalls" :key="'mini-'+stall.id" 
                              @click="selectStall(stall)"
                              class="w-12 h-10 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative"
                              :class="{
                                'bg-green-200 text-green-800 hover:bg-green-300': isStallAvailable(stall),
                                'bg-red-200 text-red-800': !isStallAvailable(stall),
                                'ring-2 ring-white': selectedStall && selectedStall.id === stall.id
                              }">
                            {{ stall.name.replace('Stall ', '') }}
                            
                            <!-- Car indicator -->
                            <div v-if="!isStallAvailable(stall)" class="absolute inset-0 flex items-center justify-center opacity-40">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6" :class="{'text-red-700': stall.id % 4 === 1, 'text-blue-700': stall.id % 4 === 0, 'text-yellow-700': stall.id % 4 === 2, 'text-green-700': stall.id % 4 === 3}">
                                <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                              </svg>
                            </div>
                            
                            <!-- Selected indicator -->
                            <div v-if="selectedStall && selectedStall.id === stall.id" class="absolute inset-0 border-2 border-white rounded animate-pulse opacity-60"></div>
                          </div>
                        </div>
                        
                        <!-- Bottom entrance -->
                        <div class="w-full h-8 bg-gray-600 flex items-center justify-center">
                          <div class="w-40 h-2 bg-yellow-400"></div>
                        </div>
                      </div>
                      
                      <!-- Legend -->
                      <div class="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-white">
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-green-200 rounded-sm mr-1"></div>
                          <span>Tersedia</span>
                        </div>
                        <div class="flex items-center">
                          <div class="w-3 h-3 bg-red-200 rounded-sm mr-1"></div>
                          <span>Terisi</span>
                        </div>
                        <div class="flex items-center">
                          <div class="w-3 h-3 border-2 border-white rounded-sm mr-1"></div>
                          <span>Terpilih</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Stall grid visualization -->
                  <div class="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="stall in allStalls" :key="stall.id" 
                        class="relative rounded-lg transition-all duration-200 transform hover:scale-105"
                        :class="[
                          { 'opacity-100': isStallAvailable(stall) || (selectedStall && selectedStall.id === stall.id) },
                          { 'opacity-80': !isStallAvailable(stall) && (!selectedStall || selectedStall.id !== stall.id) },
                          { 'ring-4 ring-red-500 shadow-lg': selectedStall && selectedStall.id === stall.id }
                        ]">
                      
                      <!-- Card Container -->
                      <div @click="selectStall(stall)" 
                          class="cursor-pointer bg-gray-200 rounded-lg overflow-hidden h-full"
                          :class="{'cursor-not-allowed': !isStallAvailable(stall)}">
                        
                        <!-- Stall Header -->
                        <div class="p-2 bg-gray-300 flex items-center justify-between">
                          <h3 class="text-base font-medium text-gray-900">{{ stall.name }}</h3>
                          <div v-if="isStallAvailable(stall)" class="flex items-center px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            <span class="h-2 w-2 mr-1 rounded-full bg-green-500"></span>
                            Tersedia
                          </div>
                          <div v-else class="flex items-center px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                            <span class="h-2 w-2 mr-1 rounded-full bg-red-500"></span>
                            Terisi
                          </div>
                        </div>
                        
                        <!-- Stall Body with Car Visualization -->
                        <div class="relative p-2 pb-4">
                          <!-- Car Image Based on Status -->
                          <div v-if="!isStallAvailable(stall)" class="h-28 flex items-center justify-center">
                            <!-- Car SVG for filled stall -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-20 w-full"
                                :class="{'text-blue-500': stall.id % 4 === 0, 'text-red-500': stall.id % 4 === 1, 'text-yellow-500': stall.id % 4 === 2, 'text-green-700': stall.id % 4 === 3}">
                              <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                            </svg>
                          </div>
                          <div v-else class="h-28 flex items-center justify-center">
                            <!-- Empty stall space -->
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-20 w-full text-gray-400 opacity-40">
                              <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                            </svg>
                            
                            <!-- Pulsing indicator for available stall -->
                            <span class="absolute inset-0 flex items-center justify-center">
                              <span v-if="selectedStall && selectedStall.id === stall.id" class="h-full w-full border-4 border-red-500 absolute rounded-lg animate-pulse"></span>
                            </span>
                          </div>
                          
                          <!-- Stall Information -->
                          <div class="mt-2">
                            <!-- Available Stall Info -->
                            <div v-if="isStallAvailable(stall)" class="space-y-1">
                              <div class="flex items-center text-xs font-medium text-gray-500 bg-white p-1 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="flex-1">{{ selectedHour }} - {{ calculateEndTime(selectedHour, totalServiceDuration) }}</span>
                              </div>
                              
                              <div class="flex items-center justify-between text-xs text-gray-700 bg-white p-1 rounded">
                                <span>Estimasi Durasi:</span>
                                <span class="font-medium">{{ formatDuration(totalServiceDuration) }}</span>
                              </div>
                            </div>
                            
                            <!-- Booked Stall Info -->
                            <div v-else class="space-y-1 text-xs">
                              <div v-for="(slot, index) in stall.booked_slots.slice(0, 2)" :key="index" 
                                  class="flex items-center justify-between text-xs font-medium bg-white p-1 rounded">
                                <div class="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{{ formatTime(slot.start_time) }} - {{ formatTime(slot.end_time) }}</span>
                                </div>
                              </div>
                              
                              <div v-if="stall.booked_slots.length > 2" class="text-center text-gray-500 italic p-1">
                                + {{ stall.booked_slots.length - 2 }} jadwal lainnya
                              </div>
                              
                              <!-- Random vehicle info for realism -->
                              <div class="mt-1 bg-white p-1 rounded">
                                <div :class="{'text-red-800': stall.id % 4 === 1, 'text-blue-800': stall.id % 4 === 0, 'text-yellow-800': stall.id % 4 === 2, 'text-green-800': stall.id % 4 === 3}">
                                  {{ getRandomVehicleInfo(stall.id) }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Selection button at bottom -->
                        <div v-if="isStallAvailable(stall)" 
                             class="p-2 border-t border-gray-300 bg-white flex justify-center"
                             :class="{'bg-red-50': selectedStall && selectedStall.id === stall.id}">
                          <button 
                            class="w-full text-xs py-1 px-2 rounded transition-colors"
                            :class="selectedStall && selectedStall.id === stall.id 
                              ? 'bg-red-600 text-white font-medium' 
                              : 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'"
                          >
                            {{ selectedStall && selectedStall.id === stall.id ? 'Terpilih' : 'Pilih Stall' }}
                          </button>
                        </div>
                        <div v-else class="p-2 border-t border-gray-300 bg-gray-100 flex justify-center">
                          <span class="text-xs text-red-500 font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Stall Tidak Tersedia
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Information Box untuk Stall Terpilih (Lanjutan) -->

                  <div v-if="selectedStall" class="mt-6 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <div class="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
                      <h3 class="text-lg font-medium">Detail Booking {{ selectedStall.name }}</h3>
                      <div class="px-2 py-0.5 text-xs bg-white text-red-800 rounded-full font-medium">
                        {{ formattedSelectedDateDisplay }}
                      </div>
                    </div>
                    
                    <div class="p-4 space-y-4">
                      <!-- Vehicle & Time Info -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Time & Duration Info -->
                        <div class="bg-gray-50 p-3 rounded-lg space-y-2">
                          <h4 class="text-sm font-medium text-gray-700 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Informasi Waktu
                          </h4>
                          
                          <div class="space-y-1 pl-5">
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Waktu Mulai:</span>
                              <span class="font-medium text-gray-900">{{ selectedHour }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Estimasi Selesai:</span>
                              <span class="font-medium text-gray-900">{{ calculateEndTime(selectedHour, totalServiceDuration) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Total Durasi:</span>
                              <span class="font-medium text-gray-900">{{ formatDuration(totalServiceDuration) }}</span>
                            </div>
                            
                            <!-- Warning for service extending beyond operating hours -->
                            <div v-if="isServiceTimeWarning" class="mt-1 text-xs text-yellow-600 flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span>Melebihi jam operasional bengkel. Servis akan dilanjutkan keesokan harinya.</span>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Vehicle & Customer Info -->
                        <div class="bg-gray-50 p-3 rounded-lg space-y-2">
                          <h4 class="text-sm font-medium text-gray-700 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                            Informasi Kendaraan
                          </h4>
                          
                          <div class="space-y-1 pl-5">
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Plat Nomor:</span>
                              <span class="font-medium text-gray-900">{{ customerForm.plate_number.toUpperCase() }}</span>
                            </div>
                            
                            <div v-if="vehicleFound" class="flex justify-between text-sm">
                              <span class="text-gray-600">Pemilik:</span>
                              <span class="font-medium text-gray-900">{{ customerForm.customer_name }}</span>
                            </div>
                            
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Jenis Mobil:</span>
                              <span class="font-medium text-gray-900">
                                {{ getBrandName(customerForm.brand_id) }} {{ getBrandTypeName(customerForm.brand_type_id) }}
                              </span>
                            </div>
                            
                            <div class="flex justify-between text-sm">
                              <span class="text-gray-600">Transmisi:</span>
                              <span class="font-medium text-gray-900">{{ getTransmissionName(customerForm.transmission_id) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Services List -->
                      <div>
                        <h4 class="text-sm font-medium text-gray-700 flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Layanan yang Akan Dilakukan
                        </h4>
                        
                        <div class="bg-gray-50 rounded-lg overflow-hidden">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                              <tr>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Nama Layanan
                                </th>
                                <th scope="col" class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Durasi
                                </th>
                                <th scope="col" class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Harga
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr v-for="serviceId in customerForm.service_ids" :key="serviceId">
                                <td class="px-4 py-2 text-sm text-gray-900">
                                  {{ getServiceName(serviceId) }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900 text-right">
                                  {{ formatDuration(getServiceDuration(serviceId)) }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900 text-right">
                                  <div class="flex flex-col items-end">
                                    <span class="text-xs text-gray-500 line-through">
                                      Rp {{ getOriginalPrice(serviceId).toLocaleString() }}
                                    </span>
                                    <span class="font-medium text-red-600">
                                      Rp {{ getServicePrice(serviceId).toLocaleString() }}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tfoot class="bg-gray-50">
                              <tr>
                                <th scope="row" colspan="2" class="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                                  Total
                                </th>
                                <td class="px-4 py-2 text-sm text-right">
                                  <div class="flex flex-col items-end">
                                    <span class="text-xs text-gray-500 line-through">
                                      Rp {{ getTotalOriginalPrice().toLocaleString() }}
                                    </span>
                                    <span class="font-medium text-red-600">
                                      Rp {{ getTotalPrice().toLocaleString() }}
                                    </span>
                                    <span class="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full mt-0.5">
                                      Hemat {{ getTotalDiscountPercentage() }}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      
                      <!-- Notes if any -->
                      <div v-if="customerForm.notes">
                        <h4 class="text-sm font-medium text-gray-700 flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Catatan Tambahan
                        </h4>
                        
                        <div class="bg-gray-50 p-3 rounded-lg">
                          <p class="text-sm text-gray-700">{{ customerForm.notes }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Footer Action -->
                    <div class="bg-gray-50 px-4 py-3 flex justify-end">
                      <button 
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        @click="confirmStallSelection"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Konfirmasi Stall Ini
                      </button>
                    </div>
                  </div>
                  
                  <!-- Legend -->
                  <div class="px-4 py-2 border-t border-gray-200 flex flex-wrap items-center gap-3 text-xs">
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-green-100 border border-green-300 rounded-sm mr-1"></div>
                      <span>Tersedia</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-red-50 border border-red-200 rounded-sm mr-1"></div>
                      <span>Terisi</span>
                    </div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-red-100 border-2 border-red-500 rounded-sm mr-1"></div>
                      <span>Terpilih</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="py-12 flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Pilih waktu terlebih dahulu</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Silakan pilih waktu untuk melihat ketersediaan stall.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
          <button
            @click="prevStep"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Kembali
          </button>
          <button
            @click="nextStep"
            :disabled="!selectedStall || loading"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            Lanjut
          </button>
        </div>
      </div>

      <!-- Step 4: Confirmation -->
      <div v-if="currentStep === 4" class="bg-white shadow rounded-lg overflow-hidden">
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
                      <span class="text-sm font-medium text-gray-900">{{ selectedHour }} - {{ calculateEndTime(selectedHour, totalServiceDuration) }}</span>
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
                    <span class="text-sm text-gray-500">Durasi servis: <span class="font-medium text-gray-900">{{ formatDuration(totalServiceDuration) }}</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Service Information -->
            <div>
              <h3 class="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2 mb-3">Detail Servis</h3>
              
              <div class="rounded-lg border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Layanan
                      </th>
                      <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Durasi
                      </th>
                      <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="serviceId in customerForm.service_ids" :key="serviceId">
                      <td class="px-4 py-4 text-sm text-gray-900">
                        {{ getServiceName(serviceId) }}
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-900 text-center hidden sm:table-cell">
                        {{ formatDuration(getServiceDuration(serviceId)) }}
                      </td>
                      <td class="px-4 py-4 text-sm text-gray-900 text-right">
                        Rp {{ getServicePrice(serviceId).toLocaleString() }}
                      </td>
                    </tr>
                    <tr v-if="customerForm.service_ids.length === 0">
                      <td colspan="3" class="px-4 py-4 text-sm text-gray-500 text-center">
                        Tidak ada layanan yang dipilih
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="bg-gray-50">
                    <tr>
                      <th scope="row" class="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Total
                      </th>
                      <th scope="row" class="px-4 py-3 text-center text-sm font-medium text-gray-900 hidden sm:table-cell">
                        {{ formatDuration(totalServiceDuration) }}
                      </th>
                      <td class="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        Rp {{ getTotalPrice().toLocaleString() }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div v-if="customerForm.notes" class="mt-4">
                <h4 class="text-xs font-medium text-gray-500">Catatan:</h4>
                <p class="mt-1 text-sm text-gray-700">{{ customerForm.notes }}</p>
              </div>
            </div>
            
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
            @click="prevStep"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Kembali
          </button>
          <button
            @click="createBooking"
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
      
      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          
          <!-- Modal panel -->
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Booking Berhasil!
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Booking servis Anda telah berhasil dibuat. Silakan datang sesuai jadwal yang telah ditentukan.
                  </p>
                </div>
                
                <div class="mt-4">
                  <div class="rounded-md bg-gray-50 p-4">
                    <div class="flex">
                      <div class="flex-1">
                        <dt class="text-xs text-gray-500">Referensi Booking</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.booking_reference }}</dd>
                      </div>
                      <div class="flex-1">
                        <dt class="text-xs text-gray-500">Tanggal & Waktu</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.booking_date }} {{ bookingResult?.booking_time }}</dd>
                      </div>
                    </div>
                    <div class="mt-2 flex">
                      <div class="flex-1">
                        <dt class="text-xs text-gray-500">Stall</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.stall }}</dd>
                      </div>
                      <div class="flex-1">
                        <dt class="text-xs text-gray-500">Total</dt>
                        <dd class="text-sm font-medium text-gray-900">Rp {{ bookingResult?.total_amount.toLocaleString() }}</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                @click="resetForm"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'ServiceBooking',
  setup() {
    // API base URL
    const apiClient = axios.create({
      baseURL: '/web', // Ini akan diarahkan ke https://sokasistem.pitcar.co.id/web melalui proxy
      withCredentials: true, // Untuk mengirim cookie
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    // State untuk toast notification
    const toast = ref({
      show: false,
      message: '',
      type: 'success',
      duration: 3000
    });
    
    // State untuk data booking
    const loading = ref(false);
    const selectedDate = ref(new Date());
    const formattedSelectedDate = computed(() => {
      return formatDate(selectedDate.value);
    });
    
    // Format date function (YYYY-MM-DD)
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    // Format display date function (in Indonesian)
    const formatDisplayDate = (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    };
    
    const availableHours = ref([
      '08:00', '09:00', '10:00', '11:00', '12:00', 
      '13:00', '14:00', '15:00', '16:00'
    ]);
    
    const selectedHour = ref('');
    const stalls = ref([]);
    const selectedStall = ref(null);
    
    // State untuk form booking
    const customerForm = ref({
      plate_number: '',
      customer_name: '',
      customer_phone: '',
      customer_email: '',
      brand_id: '',
      brand_type_id: '',
      car_color: '',
      car_year: new Date().getFullYear().toString(),
      transmission_id: '',
      engine_type: 'petrol',
      service_category: 'maintenance',
      service_subcategory: 'periodic_service',
      service_ids: [],
      notes: ''
    });
    
    const brands = ref([]);
    const brandTypes = ref([]);
    const transmissions = ref([]);
    const services = ref([]);
    const filteredServices = ref([]);
    
    const vehicleFound = ref(false);
    const currentStep = ref(1); // 1: Vehicle Info, 2: Service Selection, 3: Schedule, 4: Confirmation
    const showSuccessModal = ref(false);
    const bookingResult = ref(null);
    
    // Calculated service duration - NEW
    const totalServiceDuration = ref(0);

    const serviceSearchQuery = ref('');
    const searchResults = ref([]);
    const filteredTopServices = ref([]);

    // Kata kunci untuk top services (Tune Up dan Service Berkala)
    const topServiceKeywords = [
      'tune up', 'tune-up', 'tuneup',
      'service berkala', 'servis berkala', 'berkala'
    ];
    const popularServiceCategories = ref([
      { 
        id: 'tune_up', 
        keywords: ['tune up', 'tune-up'],
        title: 'Tune Up',
        description: 'Servis ringan untuk performa optimal'
      },
      { 
        id: 'service_berkala', 
        keywords: ['service berkala', 'servis berkala', 'berkala'],
        title: 'Service Berkala',
        description: 'Perawatan rutin sesuai kebutuhan kendaraan'
      }
    ]);

    // Layanan populer yang ditemukan dari data aktual
    const popularServices = ref({
      tune_up: [],
      service_berkala: []
    });

    // Method untuk mencari layanan
    const searchServices = () => {
      if (!serviceSearchQuery.value || serviceSearchQuery.value.trim().length < 2) {
        searchResults.value = [];
        return;
      }
      
      const query = serviceSearchQuery.value.toLowerCase();
      searchResults.value = services.value.filter(service => {
        // Hanya tampilkan layanan dengan durasi > 0 (layanan aktif)
        if (service.duration <= 0) return false;
        
        // Jangan tampilkan layanan yang sudah ada di top services
        if (filteredTopServices.value.some(topService => topService.id === service.id)) {
          return false;
        }
        
        // Cari berdasarkan nama layanan
        return service.name.toLowerCase().includes(query);
      });
    };

    // Method untuk toggle pilihan layanan
    const toggleServiceSelection = (serviceId) => {
      const index = customerForm.value.service_ids.indexOf(serviceId);
      if (index === -1) {
        customerForm.value.service_ids.push(serviceId);
      } else {
        customerForm.value.service_ids.splice(index, 1);
      }
    };

    // Method untuk mengecek apakah layanan sudah dipilih
    const isServiceSelected = (serviceId) => {
      return customerForm.value.service_ids.includes(serviceId);
    };

    const filterTopServices = () => {
      filteredTopServices.value = services.value.filter(service => {
        // Hanya layanan dengan durasi > 0
        if (service.duration <= 0) return false;
        
        // Filter berdasarkan kata kunci top services
        const serviceName = service.name.toLowerCase();
        return topServiceKeywords.some(keyword => serviceName.includes(keyword));
      });
      
      // Jika tidak ada layanan yang ditemukan, tampilkan layanan jasa dengan durasi > 0
      if (filteredTopServices.value.length === 0) {
        filteredTopServices.value = services.value.filter(service => 
          service.duration > 0 && 
          (service.name.toLowerCase().includes('jasa') || service.name.toLowerCase().includes('service'))
        ).slice(0, 8); // Ambil 8 layanan teratas
      }
    };

    // Method untuk memilih atau membatalkan layanan dalam kategori
    const toggleCategorySelection = (categoryId) => {
      const selectedServices = popularServices.value[categoryId];
      if (!selectedServices || selectedServices.length === 0) return;
      
      // Cek apakah semua layanan dalam kategori ini sudah dipilih
      const allSelected = selectedServices.every(service => 
        customerForm.value.service_ids.includes(service.id)
      );
      
      if (allSelected) {
        // Jika semua sudah dipilih, hapus semua layanan dalam kategori ini
        customerForm.value.service_ids = customerForm.value.service_ids.filter(
          id => !selectedServices.some(service => service.id === id)
        );
      } else {
        // Jika belum semua dipilih, tambahkan semua layanan dalam kategori ini
        selectedServices.forEach(service => {
          if (!customerForm.value.service_ids.includes(service.id)) {
            customerForm.value.service_ids.push(service.id);
          }
        });
      }
    };

    // Method untuk mengecek apakah semua layanan dalam kategori sudah dipilih
    const isCategorySelected = (categoryId) => {
      const selectedServices = popularServices.value[categoryId];
      if (!selectedServices || selectedServices.length === 0) return false;
      
      return selectedServices.every(service => 
        customerForm.value.service_ids.includes(service.id)
      );
    };

    // Method untuk mendapatkan total harga kategori
    const getCategoryPrice = (categoryId) => {
      const selectedServices = popularServices.value[categoryId];
      if (!selectedServices || selectedServices.length === 0) return 0;
      
      return selectedServices.reduce((total, service) => total + service.price, 0);
    };

    // Method untuk mendapatkan total durasi kategori
    const getCategoryDuration = (categoryId) => {
      const selectedServices = popularServices.value[categoryId];
      if (!selectedServices || selectedServices.length === 0) return 0;
      
      return selectedServices.reduce((total, service) => total + service.duration, 0);
    };

    // Method untuk menyusun layanan populer dari data aktual
    const organizePopularServices = () => {
      // Reset layanan populer
      popularServiceCategories.value.forEach(category => {
        popularServices.value[category.id] = [];
      });
      
      // Hanya proses jika ada data layanan
      if (!services.value || services.value.length === 0) return;
      
      // Cari layanan untuk setiap kategori
      popularServiceCategories.value.forEach(category => {
        const matchingServices = services.value.filter(service => 
          // Hanya layanan dengan durasi > 0
          service.duration > 0 && 
          // Cocokkan dengan kata kunci kategori
          category.keywords.some(keyword => 
            service.name.toLowerCase().includes(keyword)
          )
        );
        
        if (matchingServices.length > 0) {
          popularServices.value[category.id] = matchingServices;
        }
      });
      
      // Jika tidak ditemukan layanan Tune Up, cari layanan dengan kata kunci terkait
      if (popularServices.value.tune_up.length === 0) {
        const fallbackTuneUpServices = services.value.filter(service => 
          service.duration > 0 && 
          (service.name.toLowerCase().includes('tune') || 
          service.name.toLowerCase().includes('jasa tune'))
        );
        
        if (fallbackTuneUpServices.length > 0) {
          popularServices.value.tune_up = fallbackTuneUpServices;
        }
      }
      
      // Jika tidak ditemukan layanan Service Berkala, cari layanan dengan kata kunci terkait
      if (popularServices.value.service_berkala.length === 0) {
        const fallbackServiceBerkalaServices = services.value.filter(service => 
          service.duration > 0 && 
          (service.name.toLowerCase().includes('service') ||
          service.name.toLowerCase().includes('perawatan'))
        );
        
        if (fallbackServiceBerkalaServices.length > 0) {
          popularServices.value.service_berkala = fallbackServiceBerkalaServices;
        }
      }
    };


    
    // Helper function to format duration - NEW
    const formatDuration = (duration) => {
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
    
    // Calculate total duration based on selected services - NEW
    const calculateTotalDuration = () => {
      totalServiceDuration.value = customerForm.value.service_ids.reduce((total, serviceId) => {
        const service = services.value.find(s => s.id === serviceId);
        return total + (service ? service.duration : 0);
      }, 0);
    };
    
    // Filter services to only show Tune Up and Service Berkala
    const filterServices = () => {
      const tuneUpKeywords = ['tune up', 'tune-up'];
      const serviceBerkalaKeywords = ['service berkala', 'servis berkala'];
      
      filteredServices.value = services.value.filter(service => {
        const name = service.name.toLowerCase();
        return (
          tuneUpKeywords.some(keyword => name.includes(keyword)) ||
          serviceBerkalaKeywords.some(keyword => name.includes(keyword))
        );
      });
      
      // If no filtered services found, show all services with duration > 0
      if (filteredServices.value.length === 0) {
        filteredServices.value = services.value.filter(service => 
          service.duration > 0 && 
          (service.name.toLowerCase().includes('jasa') || 
           service.name.toLowerCase().includes('service'))
        );
      }
    };
    
    // Get service details by ID - NEW
    const getServiceName = (serviceId) => {
      const service = services.value.find(s => s.id === serviceId);
      return service ? service.name : '';
    };
    
    const getServiceDuration = (serviceId) => {
      const service = services.value.find(s => s.id === serviceId);
      return service ? service.duration : 0;
    };
    
    const getServicePrice = (serviceId) => {
      const service = services.value.find(s => s.id === serviceId);
      return service ? service.price : 0;
    };
    
    // Computed properties
    const calculateEndTime = (startHour, durationHours) => {
      if (!startHour) return '';
      
      const [hours, minutes] = startHour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + durationHours * 60;
      
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    };
    
    const formattedSelectedDateDisplay = computed(() => {
      return formatDisplayDate(selectedDate.value);
    });

    
    
    const filterAvailableStalls = computed(() => {
      if (!selectedHour.value) return [];
      
      // Convert selected hour to float (8:30 -> 8.5)
      const [hours, minutes] = selectedHour.value.split(':').map(Number);
      const selectedTimeFloat = hours + (minutes / 60);
      
      // Calculate end time in float using the totalServiceDuration
      const endTimeFloat = selectedTimeFloat + totalServiceDuration.value;
      
      return stalls.value.filter(stall => {
        // Check if stall is available during the selected time range
        return stall.is_available || !stall.booked_slots.some(slot => {
          // Check if any booked slot overlaps with our selected time
          return (
            (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
            (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
            (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
          );
        });
      });
    });
    
    const isValidForm = computed(() => {
      // Validate first step
      if (currentStep.value === 1) {
        return customerForm.value.plate_number.trim() !== '';
      }
      
      // Validate second step (Service Selection)
      if (currentStep.value === 2) {
        return customerForm.value.service_ids.length > 0;
      }
      
      // Validate third step (Schedule)
      if (currentStep.value === 3) {
        return selectedDate.value && selectedHour.value && selectedStall.value;
      }
      
      return true;
    });
    
    const getTodayDateString = () => {
      return formatDate(new Date());
    };
    
    const getMaxDateString = () => {
      const date = new Date();
      date.setDate(date.getDate() + 30); // 30 days from now
      return formatDate(date);
    };
    
    const minDate = getTodayDateString();
    const maxDate = getMaxDateString();
    
    // Calculate total price
    const getTotalPrice = () => {
      if (!services.value.length || !customerForm.value.service_ids.length) return 0;
      
      return customerForm.value.service_ids.reduce((total, serviceId) => {
        const service = services.value.find(s => s.id === serviceId);
        return total + (service ? service.price : 0);
      }, 0);
    };

    // State tambahan untuk perbaikan jadwal dan stall
    const timeSelectionError = ref('');
    const allStalls = ref([]);
    const isServiceTimeWarning = ref(false);

    // Pengecekan tanggal dengan aturan H-1
    const minDateH1 = computed(() => {
      const today = new Date();
      // Tambah 1 hari untuk aturan H-1
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return formatDate(tomorrow);
    });

    // Cek apakah tanggal yang dipilih adalah hari ini
    const isDateToday = computed(() => {
      const today = new Date();
      return (
        selectedDate.value.getDate() === today.getDate() &&
        selectedDate.value.getMonth() === today.getMonth() &&
        selectedDate.value.getFullYear() === today.getFullYear()
      );
    });

    // Cek apakah tanggal yang dipilih adalah besok
    const isTomorrow = computed(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return (
        selectedDate.value.getDate() === tomorrow.getDate() &&
        selectedDate.value.getMonth() === tomorrow.getMonth() &&
        selectedDate.value.getFullYear() === tomorrow.getFullYear()
      );
    });

    // Validasi tanggal yang dipilih
    const validateSelectedDate = () => {
      timeSelectionError.value = '';
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Pastikan tanggal yang dipilih valid
      const selectedInputDate = new Date(formattedSelectedDate.value);
      
      // Jika selectedInputDate adalah hari ini atau sebelumnya, reset ke besok
      if (selectedInputDate <= today) {
        showToast('Booking hanya tersedia minimal H-1', 'warning');
        selectedDate.value = tomorrow;
        return;
      }
      
      // Update selectedDate dengan inputDate yang valid
      selectedDate.value = selectedInputDate;
      
      // Reset pilihan stall setiap kali tanggal berubah
      selectedStall.value = null;
      selectedHour.value = '';
    };

    // Cek apakah waktu dapat dipilih
    const isHourAvailable = (hour) => {
      if (!hour) return false;
      
      // Jika dipilih hari ini, jam yang sudah lewat tidak bisa dipilih
      if (isDateToday.value) {
        const now = new Date();
        const [hourNum, minuteNum] = hour.split(':').map(Number);
        const hourDate = new Date(now);
        hourDate.setHours(hourNum, minuteNum, 0, 0);
        
        return hourDate > now;
      }
      
      // Validasi jam operasional (08:00 - 17:00)
      const [hours, minutes] = hour.split(':').map(Number);
      const timeFloat = hours + (minutes / 60);
      
      return timeFloat >= 8 && timeFloat <= 17;
    };

    // Pilih jam dengan validasi
    const selectHour = (hour) => {
      timeSelectionError.value = '';
      
      if (!isHourAvailable(hour)) {
        timeSelectionError.value = 'Jam ini tidak tersedia untuk booking.';
        return;
      }
      
      // Cek apakah waktu layanan melebihi jam operasional
      const [hours, minutes] = hour.split(':').map(Number);
      const timeFloat = hours + (minutes / 60);
      const endTimeFloat = timeFloat + totalServiceDuration.value;
      
      // Cek apakah waktu selesai melebihi jam operasional (17:00)
      isServiceTimeWarning.value = endTimeFloat > 17;
      
      selectedHour.value = hour;
      selectedStall.value = null; // Reset pilihan stall
      
      // Periksa ketersediaan stall
      checkAvailability();
    };

    // Format waktu dari float ke string "HH:MM"
    const formatTime = (timeFloat) => {
      if (typeof timeFloat !== 'number') return '';
      
      const hours = Math.floor(timeFloat);
      const minutes = Math.round((timeFloat - hours) * 60);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // Cek apakah stall tersedia berdasarkan waktu yang dipilih
    const isStallAvailable = (stall) => {
      if (!selectedHour.value || !stall) return false;
      
      // Convert selected hour to float
      const [hours, minutes] = selectedHour.value.split(':').map(Number);
      const selectedTimeFloat = hours + (minutes / 60);
      
      // Calculate end time in float using the totalServiceDuration
      const endTimeFloat = selectedTimeFloat + totalServiceDuration.value;
      
      // Cek apakah stall kosong atau tidak ada konflik dengan booking yang ada
      return !stall.booked_slots || !stall.booked_slots.some(slot => {
        // Cek apakah ada overlap dengan slot yang sudah dibooking
        return (
          (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
          (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
          (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
        );
      });
    };

    // Get class untuk styling stall berdasarkan status
    const getStallClasses = (stall) => {
      // Jika stall ini yang terpilih
      if (selectedStall && selectedStall.id === stall.id) {
        return 'border-red-500 bg-red-100';
      }
      
      // Jika stall tersedia
      if (isStallAvailable(stall)) {
        return 'border-green-300 bg-green-100 hover:border-green-500';
      }
      
      // Jika stall tidak tersedia
      return 'border-gray-300 bg-red-50 opacity-70';
    };

    // Get class untuk teks pada stall
    const getStallTextClass = (stall) => {
      // Jika stall tersedia
      if (isStallAvailable(stall)) {
        return selectedStall && selectedStall.id === stall.id 
          ? 'text-red-800' 
          : 'text-gray-900';
      }
      
      // Jika stall tidak tersedia
      return 'text-gray-500';
    };

    
    // Improved checkAvailability dengan penanganan error yang lebih baik
    const checkAvailability = async () => {
      if (!selectedDate.value || !selectedHour.value) {
        return;
      }
      
      try {
        loading.value = true;
        timeSelectionError.value = '';
        
        // Convert hour to float
        const [hours, minutes] = selectedHour.value.split(':').map(Number);
        const timeFloat = hours + (minutes / 60);
        
        const response = await apiClient.post('/v1/booking/check-availability', {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            date: formattedSelectedDate.value,
            time: timeFloat,
            duration: totalServiceDuration.value
          }
        });
        
        if (response.data.result) {
          if (response.data.result.status === 'success') {
            // Store all stalls with availability info
            allStalls.value = response.data.result.available_stalls;
            
            // Update stalls with filter for UI (tetapi semua stall ditampilkan)
            stalls.value = response.data.result.available_stalls;
            
            // Reset selected stall if it's no longer available
            if (selectedStall.value && !isStallAvailable(selectedStall.value)) {
              selectedStall.value = null;
            }
          } else if (response.data.result.status === 'error') {
            timeSelectionError.value = response.data.result.message || 'Gagal memeriksa ketersediaan';
            
            // Specific error for time range
            if (response.data.result.message && response.data.result.message.includes('between')) {
              timeSelectionError.value = 'Booking hanya tersedia antara jam 08:00 dan 17:00';
            }
            
            showToast(timeSelectionError.value, 'error');
          }
        } else {
          timeSelectionError.value = 'Gagal memeriksa ketersediaan';
          showToast(timeSelectionError.value, 'error');
        }
      } catch (error) {
        console.error('Error checking availability:', error);
        timeSelectionError.value = 'Error terhubung ke layanan. Silakan coba lagi nanti.';
        showToast(timeSelectionError.value, 'error');
      } finally {
        loading.value = false;
      }
    };

    // Improved selectStall with animation
    const selectStall = (stall) => {
      if (!isStallAvailable(stall)) {
        showToast(`Stall ${stall.name} tidak tersedia pada waktu yang dipilih`, 'warning');
        return;
      }
      
      // Tambahkan efek animasi saat memilih stall
      selectedStall.value = null; // Reset dulu untuk efek animasi
      setTimeout(() => {
        selectedStall.value = stall;
      }, 50);
    };

    // Validasi sebelum lanjut ke step berikutnya
    const validateScheduleSelection = () => {
      if (!selectedDate.value) {
        showToast('Silakan pilih tanggal booking', 'error');
        return false;
      }
      
      if (!selectedHour.value) {
        showToast('Silakan pilih waktu booking', 'error');
        return false;
      }
      
      if (!selectedStall.value) {
        showToast('Silakan pilih stall', 'error');
        return false;
      }
      
      // Tambahan validasi jika durasi servis melebihi jam operasional
      if (isServiceTimeWarning.value) {
        // Konfirmasi dengan pengguna bahwa service mungkin akan dilanjutkan esok hari
        // Untuk sederhananya, hanya menampilkan pesan warning, bisa ditambahkan konfirmasi
        showToast('Perhatian: Durasi servis melebihi jam operasional. Servis mungkin dilanjutkan keesokan harinya.', 'warning');
      }

      return true;
    };

    // UI methods
    // PENTING: Gunakan let bukan const agar bisa di-override
    let nextStep = () => {
      if (currentStep.value === 1 && !vehicleFound.value) {
        // Validate first step form for new vehicle
        if (!customerForm.value.customer_name || !customerForm.value.customer_phone ||
            !customerForm.value.brand_id || !customerForm.value.brand_type_id) {
          showToast('Harap isi semua kolom yang wajib diisi', 'error');
          return;
        }
      }
      
      if (currentStep.value === 2) {
        // Service Selection validation
        if (customerForm.value.service_ids.length === 0) {
          showToast('Harap pilih minimal satu layanan', 'error');
          return;
        }
        
        // Reset schedule selection when changing services
        selectedHour.value = '';
        selectedStall.value = null;
      }
      
      if (currentStep.value === 3) {
        if (!validateScheduleSelection()) {
          return;
        }
      }
      
      currentStep.value++;
    };
    
    const prevStep = () => {
      currentStep.value--;
    };

    const verifyVehicle = async () => {
      if (!customerForm.value.plate_number.trim()) {
        showToast('Nomor plat harus diisi', 'error');
        return;
      }
      
      try {
        loading.value = true;
        
        const response = await apiClient.post('/v1/booking/verify-vehicle', {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            plate_number: customerForm.value.plate_number.toUpperCase().replace(/\s/g, '')
          }
        });
        
         // Odoo JSON-RPC mengembalikan hasil dalam property 'result'
         if (response.data.result && response.data.result.status === 'found') {
          // Vehicle found, fill form with data
          const vehicleData = response.data.result.data;
          
          customerForm.value.customer_name = vehicleData.customer_name;
          customerForm.value.customer_id = vehicleData.customer_id;
          customerForm.value.brand_id = vehicleData.car_brand?.id || '';
          customerForm.value.brand_type_id = vehicleData.car_type?.id || '';
          customerForm.value.car_color = vehicleData.car_color || '';
          customerForm.value.car_year = vehicleData.car_year || '';
          customerForm.value.transmission_id = vehicleData.transmission?.id || '';
          customerForm.value.engine_type = vehicleData.engine_type || 'petrol';
          
          vehicleFound.value = true;
          
          // Show success toast message
          showToast(`Kendaraan ditemukan dengan nomor plat ${customerForm.value.plate_number.toUpperCase()}`, 'success');
          
          // Go to next step - Service Selection
          currentStep.value = 2;
          
          // Load services for this category
          fetchServices();
        } else {
          // Vehicle not found, show form for new vehicle
          vehicleFound.value = false;
          
          // Show notification toast
          showToast(`Kendaraan dengan plat ${customerForm.value.plate_number.toUpperCase()} tidak ditemukan. Silakan lengkapi data.`, 'warning');
          
          // Reset form except plate number
          const plateNumber = customerForm.value.plate_number;
          customerForm.value = {
            plate_number: plateNumber,
            customer_name: '',
            customer_phone: '',
            customer_email: '',
            brand_id: '',
            brand_type_id: '',
            car_color: '',
            car_year: new Date().getFullYear().toString(),
            transmission_id: '',
            engine_type: 'petrol',
            service_category: 'maintenance',
            service_subcategory: 'periodic_service',
            service_ids: [],
            notes: ''
          };
          
          // Load reference data for new vehicle form
          fetchBrands();
          fetchTransmissions();
        }
      } catch (error) {
        console.error('Error verifying vehicle:', error);
        showToast('Error terhubung ke layanan. Silakan coba lagi nanti.', 'error');
      } finally {
        loading.value = false;
      }
    };

    // Add this computed property in your setup function
    const filteredPopularServiceCategories = computed(() => {
      return popularServiceCategories.value.filter(category => 
        popularServices.value[category.id] && 
        popularServices.value[category.id].length > 0
      );
    });

    const fetchBrands = async () => {
      try {
        loading.value = true;
        const response = await apiClient.post('/v1/booking/get-brands', {
          jsonrpc: '2.0',
          method: 'call'
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          brands.value = response.data.result.data;
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        showToast('Gagal memuat data merek mobil', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    const fetchBrandTypes = async (brandId) => {
      if (!brandId) {
        brandTypes.value = [];
        return;
      }
      
      try {
        loading.value = true;
        const response = await apiClient.post('/v1/booking/get-brand-types', {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            brand_id: brandId
          }
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          brandTypes.value = response.data.result.data;
        }
      } catch (error) {
        console.error('Error fetching brand types:', error);
        showToast('Gagal memuat data tipe mobil', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    const fetchTransmissions = async () => {
      try {
        loading.value = true;
        const response = await apiClient.post('/v1/booking/get-transmissions', {
          jsonrpc: '2.0',
          method: 'call'
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          transmissions.value = response.data.result.data;
        }
      } catch (error) {
        console.error('Error fetching transmissions:', error);
        showToast('Gagal memuat data transmisi', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // Modifikasi fetchServices untuk memanggil organizePopularServices
    const fetchServices = async () => {
      try {
        loading.value = true;
        const response = await apiClient.post('/v1/booking/get-services', {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            service_category: customerForm.value.service_category
          }
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          services.value = response.data.result.data;
          
          // Filter top services
          filterTopServices();
          
          // Reset selected services when category changes
          customerForm.value.service_ids = [];
          totalServiceDuration.value = 0;
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        showToast('Gagal memuat data layanan', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    const createBooking = async () => {
      try {
        loading.value = true;
        
        // Convert selected hour to float
        const [hours, minutes] = selectedHour.value.split(':').map(Number);
        const timeFloat = hours + (minutes / 60);
        
        const bookingData = {
          plate_number: customerForm.value.plate_number.toUpperCase().replace(/\s/g, ''),
          date: formattedSelectedDate.value,
          time: timeFloat,
          stall_id: selectedStall.value.id,
          service_category: customerForm.value.service_category,
          service_subcategory: customerForm.value.service_subcategory,
          service_ids: customerForm.value.service_ids,
          notes: customerForm.value.notes
        };
        
        // Add additional fields for new vehicles
        if (!vehicleFound.value) {
          bookingData.customer_name = customerForm.value.customer_name;
          bookingData.customer_phone = customerForm.value.customer_phone;
          bookingData.customer_email = customerForm.value.customer_email;
          bookingData.brand_id = customerForm.value.brand_id;
          bookingData.brand_type_id = customerForm.value.brand_type_id;
          bookingData.car_color = customerForm.value.car_color;
          bookingData.car_year = customerForm.value.car_year;
          bookingData.transmission_id = customerForm.value.transmission_id;
          bookingData.engine_type = customerForm.value.engine_type;
        }
        
        const response = await apiClient.post('/v1/booking/create', {
          jsonrpc: '2.0',
          method: 'call',
          params: bookingData
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          bookingResult.value = response.data.result.data;
          showSuccessModal.value = true;
        } else {
          showToast(response.data.result?.message || 'Gagal membuat booking', 'error');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        showToast('Error terhubung ke layanan. Silakan coba lagi nanti.', 'error');
      } finally {
        loading.value = false;
      }
    };

    // Array data merk mobil
    const carBrands = [
      { brand: 'Toyota', models: ['Avanza', 'Fortuner', 'Innova', 'Rush', 'Calya', 'Vios', 'Yaris'] },
      { brand: 'Honda', models: ['Brio', 'Civic', 'HR-V', 'CR-V', 'Jazz', 'Mobilio', 'BR-V'] },
      { brand: 'Daihatsu', models: ['Xenia', 'Terios', 'Sigra', 'Ayla', 'Sirion', 'Gran Max'] },
      { brand: 'Suzuki', models: ['Ertiga', 'XL7', 'Ignis', 'Baleno', 'Jimny', 'Carry'] },
      { brand: 'Mitsubishi', models: ['Xpander', 'Pajero', 'Eclipse Cross', 'Outlander'] },
      { brand: 'Nissan', models: ['Grand Livina', 'X-Trail', 'Serena', 'Terra', 'Juke'] },
      { brand: 'HINO', models: ['Truck', 'Bus'] }
    ];

    // Array untuk kategori servis
    const serviceTypes = [
      'Tune Up', 'Ganti Oli', 'Service Berkala', 'Perbaikan Rem', 
      'Ganti Kampas Kopling', 'Perbaikan AC', 'Perbaikan Transmisi'
    ];

    // Array untuk mekanik
    const mechanics = [
      'Budi', 'Ahmad', 'Roro', 'Joko', 'Wawan', 'Supri', 'Eko', 'Dedi', 'Andi'
    ];

    // Array untuk status
    const serviceStatus = [
      'Sedang Dikerjakan', 'Menunggu Suku Cadang', 'Selesai 70%', 'Estimasi Selesai 2 Jam'
    ];

    // Fungsi untuk mengambil random plate number
    const getRandomPlateNumber = (stallId) => {
      const areas = ['B', 'D', 'F', 'T', 'AB', 'Z', 'R', 'BK', 'BG'];
      const area = areas[stallId % areas.length];
      
      // Generate random 4 digit number
      const numbers = Math.floor(1000 + Math.random() * 9000);
      
      // Generate 3 random letters
      const letters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
      let plateLetters = '';
      for (let i = 0; i < 3; i++) {
        plateLetters += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      
      return `${area} ${numbers} ${plateLetters}`;
    };

    // Fungsi untuk mendapatkan informasi kendaraan acak
    const getRandomVehicleInfo = (stallId) => {
      // Gunakan stallId sebagai seed untuk selalu mendapatkan
      // hasil yang sama per stall, sehingga tidak berubah setiap render
      const seedRandom = (seed, max) => {
        return Math.floor((Math.sin(seed) * 10000) % max);
      };
      
      // Pilih merk dan model mobil
      const brandIndex = seedRandom(stallId, carBrands.length);
      const brand = carBrands[brandIndex];
      const modelIndex = seedRandom(stallId + 100, brand.models.length);
      const model = brand.models[modelIndex];
      
      // Pilih plat nomor
      const plateNumber = getRandomPlateNumber(stallId);
      
      // Pilih mekanik
      const mechanicIndex = seedRandom(stallId + 200, mechanics.length);
      const mechanic = mechanics[mechanicIndex];
      
      // Pilih tipe servis
      const serviceIndex = seedRandom(stallId + 300, serviceTypes.length);
      const service = serviceTypes[serviceIndex];
      
      // Pilih status
      const statusIndex = seedRandom(stallId + 400, serviceStatus.length);
      const status = serviceStatus[statusIndex];
      
      // Tentukan format tampilan
      // Gunakan format berbeda berdasarkan stall id untuk variasi
      if (stallId % 4 === 0) {
        return `${model}\n${plateNumber}\nMekanik: ${mechanic}`;
      } else if (stallId % 4 === 1) {
        return `${brand.brand} ${model}\n${plateNumber}\n${service}`;
      } else if (stallId % 4 === 2) {
        return `${plateNumber}\n${service}\nStatus: ${status}`;
      } else {
        return `${model} - ${plateNumber}\nMekanik ${mechanic}`;
      }
    };

    // Fungsi untuk mendapatkan nama brand dari ID
    const getBrandName = (brandId) => {
      if (!brandId) return 'N/A';
      const brand = brands.value.find(b => b.id === brandId);
      return brand ? brand.name : 'N/A';
    };

    // Fungsi untuk mendapatkan nama tipe dari ID
    const getBrandTypeName = (typeId) => {
      if (!typeId) return 'N/A';
      const type = brandTypes.value.find(t => t.id === typeId);
      return type ? type.name : 'N/A';
    };

    // Fungsi untuk mendapatkan nama transmisi dari ID
    const getTransmissionName = (transmissionId) => {
      if (!transmissionId) return 'N/A';
      const transmission = transmissions.value.find(t => t.id === transmissionId);
      return transmission ? transmission.name : 'Manual';
    };

    // Fungsi untuk konfirmasi pemilihan stall
    const confirmStallSelection = () => {
      if (!selectedStall) {
        showToast('Silakan pilih stall terlebih dahulu', 'error');
        return;
      }
      
      // Tampilkan konfirmasi dan efek visual
      showToast(`Stall ${selectedStall.name} berhasil dipilih`, 'success');
      
      // Tambahkan efek animasi konfirmasi
      const stallElement = document.getElementById(`stall-${selectedStall.id}`);
      if (stallElement) {
        stallElement.classList.add('confirmed-stall');
        setTimeout(() => {
          stallElement.classList.remove('confirmed-stall');
        }, 1500);
      }
    };


    // DISCOUNT
    // Tambahkan fungsi untuk menghitung harga asli (dicoret)
    const getOriginalPrice = (serviceId) => {
      const service = services.value.find(s => s.id === serviceId);
      if (!service) return 0;
      
      // Tambahkan margin random antara 10-30%
      const margin = 1 + (Math.floor(Math.random() * 21) + 10) / 100; // 1.10 to 1.30
      
      // Bulatkan ke atas ke ribuan terdekat
      return Math.ceil(service.price * margin / 1000) * 1000;
    };

    // Fungsi untuk menghitung total harga asli (dicoret)
    const getTotalOriginalPrice = () => {
      if (!services.value.length || !customerForm.value.service_ids.length) return 0;
      
      return customerForm.value.service_ids.reduce((total, serviceId) => {
        return total + getOriginalPrice(serviceId);
      }, 0);
    };

    // Fungsi untuk menghitung persentase diskon
    const getDiscountPercentage = (originalPrice, discountPrice) => {
      if (originalPrice <= 0) return 0;
      return Math.round((1 - discountPrice / originalPrice) * 100);
    };

    // Fungsi untuk menghitung persentase diskon per layanan
    const getServiceDiscountPercentage = (serviceId) => {
      const originalPrice = getOriginalPrice(serviceId);
      const discountPrice = getServicePrice(serviceId);
      return getDiscountPercentage(originalPrice, discountPrice);
    };

    // Fungsi untuk menghitung persentase diskon total
    const getTotalDiscountPercentage = () => {
      const originalPrice = getTotalOriginalPrice();
      const discountPrice = getTotalPrice();
      return getDiscountPercentage(originalPrice, discountPrice);
    };

    const resetForm = () => {
      currentStep.value = 1;
      selectedDate.value = new Date();
      selectedHour.value = '';
      selectedStall.value = null;
      vehicleFound.value = false;
      showSuccessModal.value = false;
      bookingResult.value = null;
      totalServiceDuration.value = 0;
      
      customerForm.value = {
        plate_number: '',
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        brand_id: '',
        brand_type_id: '',
        car_color: '',
        car_year: new Date().getFullYear().toString(),
        transmission_id: '',
        engine_type: 'petrol',
        service_category: 'maintenance',
        service_subcategory: 'periodic_service',
        service_ids: [],
        notes: ''
      };
    };
    
    const showToast = (message, type = 'success') => {
      toast.value = {
        show: true,
        message,
        type,
        duration: 3000
      };
      
      // Auto hide after duration
      setTimeout(() => {
        toast.value.show = false;
      }, toast.value.duration);
    };
    
    // Inisialisasi semua stall
    const initAllStalls = async () => {
      try {
        const response = await apiClient.post('/v1/booking/get-stalls', {
          jsonrpc: '2.0',
          method: 'call'
        });
        
        if (response.data.result && response.data.result.status === 'success') {
          allStalls.value = response.data.result.data.map(stall => ({
            ...stall,
            is_available: true,
            booked_slots: []
          }));
        }
      } catch (error) {
        console.error('Error initializing all stalls:', error);
      }
    };
    
    // Watch for changes that require updates
    watch(() => selectedDate.value, () => {
      checkAvailability();
    });
    
    watch(() => selectedHour.value, () => {
      checkAvailability();
    });
    
    watch(() => totalServiceDuration.value, () => {
      if (currentStep.value === 3) {
        checkAvailability();
      }
    });
    
    watch(() => customerForm.value.service_ids, () => {
      calculateTotalDuration(); // Recalculate total duration when services change
    }, { deep: true });
    
    watch(() => customerForm.value.brand_id, (newVal) => {
      fetchBrandTypes(newVal);
      customerForm.value.brand_type_id = '';
    });
    
    watch(() => customerForm.value.service_category, () => {
      fetchServices();
    });
    
    // Tambahkan watch untuk memantau isServiceTimeWarning
    watch(() => isServiceTimeWarning.value, (newValue) => {
      if (newValue) {
        showToast('Perhatian: Durasi servis melebihi jam operasional. Servis mungkin dilanjutkan keesokan harinya.', 'warning');
      }
    });
    
    onMounted(() => {
      initAllStalls();
    });

    return {
      // State
      loading,
      selectedDate,
      formattedSelectedDate,
      formattedSelectedDateDisplay,
      availableHours,
      selectedHour,
      stalls,
      selectedStall,
      customerForm,
      brands,
      brandTypes,
      transmissions,
      services,
      filteredServices,
      vehicleFound,
      currentStep,
      toast,
      showSuccessModal,
      bookingResult,
      totalServiceDuration,
      serviceSearchQuery,
      searchResults,
      popularServiceCategories,
      popularServices,
      filteredTopServices,
      timeSelectionError,
      isServiceTimeWarning,
      allStalls,
      minDateH1,
      isDateToday,
      isTomorrow,
      
      // Computed
      filterAvailableStalls,
      isValidForm,
      minDate,
      maxDate,
      
      // Methods
      verifyVehicle,
      nextStep,
      prevStep,
      selectStall,
      createBooking,
      resetForm,
      showToast,
      getTotalPrice,
      formatDuration,
      calculateTotalDuration,
      calculateEndTime,
      getServiceName,
      getServiceDuration,
      getServicePrice,
      filterServices,
      searchServices,
      toggleServiceSelection,
      isServiceSelected,
      toggleCategorySelection,
      isCategorySelected,
      getCategoryPrice,
      getCategoryDuration,
      organizePopularServices,
      searchServices,
      toggleServiceSelection,
      isServiceSelected,
      filterTopServices,
      validateSelectedDate,
      isHourAvailable,
      selectHour,
      formatTime,
      isStallAvailable,
      getStallClasses,
      getStallTextClass,
      validateScheduleSelection,

      // Fungsi-fungsi discount (tambahan baru)
      getOriginalPrice,
      getTotalOriginalPrice,
      getDiscountPercentage,
      getServiceDiscountPercentage,
      getTotalDiscountPercentage,
      getRandomVehicleInfo,
      getBrandName,
      getBrandTypeName,
      getTransmissionName,
      confirmStallSelection
    };
  }
};
</script>

<!-- Tambahkan styling ini di bagian bawah template Vue Anda -->

<style>
/* Animasi untuk stall yang dipilih */
@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.confirmed-stall {
  animation: pulse-border 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animasi untuk hover pada stall yang tersedia */
.stall-card {
  transition: all 0.3s ease;
}

.stall-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Styling untuk car icons */
.car-icon {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
}

/* Car slot animation */
@keyframes car-slot {
  0% {
    opacity: 0.6;
    transform: translateY(-5px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.6;
    transform: translateY(-5px);
  }
}

.car-slot-animation {
  animation: car-slot 3s ease-in-out infinite;
}

/* Improve mini garage layout */
.mini-stall {
  transition: all 0.2s ease;
}

.mini-stall:hover {
  transform: scale(1.1);
  z-index: 10;
}

.mini-stall.selected {
  z-index: 20;
}

/* Animation for showing stall detail box */
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.stall-detail-box {
  animation: slide-up 0.3s ease-out forwards;
}
</style>