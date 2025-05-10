<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-red-600 to-red-500 text-white py-8 px-4">
      <div class="max-w-lg mx-auto text-center">
        <h1 class="text-2xl font-bold mb-2">Cek Status Booking</h1>
        <p class="text-white text-opacity-90">Pantau status servis kendaraan Anda dengan mudah</p>
      </div>
    </div>
    
    <!-- Search Form Section with Card Design -->
    <div class="px-4 py-6">
      <div class="bg-white rounded-xl shadow-md overflow-hidden -mt-12 relative z-10 border border-gray-100">
        <div class="p-6">
          <div class="space-y-5">
            <div>
              <label for="booking-code" class="block text-sm font-medium text-gray-700 mb-1">
                Kode Booking <span class="text-red-600">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <input
                  id="booking-code"
                  v-model="bookingCode"
                  type="text"
                  placeholder="Masukkan kode booking 6 karakter (contoh: ABC123)"
                  class="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                  :class="{ 'border-red-300 bg-red-50': errors.bookingCode }"
                />
              </div>
              <p v-if="errors.bookingCode" class="mt-1 text-sm text-red-600">{{ errors.bookingCode }}</p>
              <p v-else class="mt-1 text-xs text-gray-500">Masukkan kode booking 6 karakter atau nomor referensi lengkap</p>
            </div>
            
            <div>
              <label for="plate-number" class="block text-sm font-medium text-gray-700 mb-1">
                Nomor Plat <span class="text-red-600">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <input
                  id="plate-number"
                  v-model="plateNumber"
                  type="text"
                  placeholder="Contoh: B 1234 XYZ"
                  class="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-red-500 focus:border-red-500 text-base"
                  :class="{ 'border-red-300 bg-red-50': errors.plateNumber }"
                />
              </div>
              <p v-if="errors.plateNumber" class="mt-1 text-sm text-red-600">{{ errors.plateNumber }}</p>
            </div>
            
            <button
              @click="searchBooking"
              class="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform active:scale-95"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mencari...
              </span>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cek Status
              </span>
            </button>
          </div>
          
          <!-- Help Text with Scanner Option -->
          <div class="mt-4 flex justify-center">
            <button 
              @click="openScanner"
              class="text-sm text-gray-600 flex items-center hover:text-red-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Scan QR Code dari Email
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Results Section -->
    <div v-if="bookingResult" class="px-4 pt-2 pb-6 animate-fade-in">
      <!-- Status Badge -->
      <div class="mb-4 flex justify-center">
        <div 
          class="py-1 px-4 rounded-full text-sm font-medium inline-flex items-center"
          :class="{
            'bg-green-100 text-green-800': bookingResult.state === 'confirmed',
            'bg-blue-100 text-blue-800': bookingResult.state === 'converted',
            'bg-red-100 text-red-800': bookingResult.state === 'cancelled',
            'bg-yellow-100 text-yellow-800': bookingResult.state === 'draft'
          }"
        >
          <svg v-if="bookingResult.state === 'confirmed'" class="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="bookingResult.state === 'converted'" class="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else-if="bookingResult.state === 'cancelled'" class="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else class="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          {{ getStatusLabel(bookingResult.state) }}
        </div>
      </div>
    
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <!-- Booking Header Card -->
        <div 
          class="p-4 text-white relative overflow-hidden"
          :class="{
            'bg-gradient-to-r from-green-600 to-green-500': bookingResult.state === 'confirmed',
            'bg-gradient-to-r from-blue-600 to-blue-500': bookingResult.state === 'converted',
            'bg-gradient-to-r from-red-600 to-red-500': bookingResult.state === 'cancelled',
            'bg-gradient-to-r from-yellow-600 to-yellow-500': bookingResult.state === 'draft'
          }"
        >
          <!-- Background pattern for decoration -->
          <div class="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="white" stroke-width="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
            </svg>
          </div>
          
          <div class="relative">
            <!-- Kode Unik & Referensi Booking -->
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-white text-opacity-80">Kode Booking</p>
                <h2 class="text-xl font-bold tracking-wider">{{ bookingResult.unique_code }}</h2>
                <p class="text-xs text-white text-opacity-80 mt-1">Ref: {{ bookingResult.booking_reference }}</p>
              </div>
              
              <!-- QR Code button -->
              <button 
                @click="showQRCode"
                class="p-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>
            </div>
            
            <!-- Booking Date Info -->
            <div class="mt-4 flex justify-between items-center">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-white text-opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm">{{ formatDate(bookingResult.booking_date) }}</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-white text-opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">{{ bookingResult.booking_time }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Booking Main Info -->
        <div class="p-5">
          <!-- Vehicle & Customer Info -->
          <div class="flex justify-between items-center mb-5">
            <div>
              <h3 class="text-xs font-medium text-gray-500 uppercase">Kendaraan</h3>
              <p class="text-lg font-medium text-gray-900">{{ bookingResult.car_info }}</p>
              <p class="text-sm text-gray-500">{{ bookingResult.plate_number }}</p>
            </div>
            <div class="text-right">
              <h3 class="text-xs font-medium text-gray-500 uppercase">Pelanggan</h3>
              <p class="text-base font-medium text-gray-900">{{ bookingResult.customer_name }}</p>
            </div>
          </div>
          
          <!-- Stall Info -->
          <div class="bg-gray-50 rounded-lg p-3 flex items-center mb-5">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-gray-500">Lokasi</h3>
              <p class="text-base font-medium text-gray-900">{{ bookingResult.stall }}</p>
            </div>
          </div>
          
          <!-- Progress Timeline -->
          <div class="mb-5">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Status Proses</h3>
            <div class="relative">
              <!-- Progress Line -->
              <div class="absolute left-5 top-0 ml-px border-l-2 border-gray-200 h-full"></div>
              
              <!-- Progress Steps -->
              <div class="space-y-6">
                <!-- Step 1: Booking -->
                <div class="flex items-start">
                  <div class="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 z-10">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-sm font-medium text-gray-900">Booking Dibuat</h4>
                    <p class="text-xs text-gray-500">Booking telah dibuat dan menunggu konfirmasi</p>
                  </div>
                </div>
                
                <!-- Step 2: Confirmed -->
                <div class="flex items-start">
                  <div 
                    class="flex items-center justify-center h-10 w-10 rounded-full z-10"
                    :class="{
                      'bg-green-100 text-green-600': ['confirmed', 'converted'].includes(bookingResult.state),
                      'bg-gray-100 text-gray-400': !['confirmed', 'converted'].includes(bookingResult.state)
                    }"
                  >
                    <svg v-if="['confirmed', 'converted'].includes(bookingResult.state)" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span v-else class="h-6 w-6 flex items-center justify-center text-xl">2</span>
                  </div>
                  <div class="ml-4">
                    <h4 
                      class="text-sm font-medium"
                      :class="{
                        'text-gray-900': ['confirmed', 'converted'].includes(bookingResult.state),
                        'text-gray-500': !['confirmed', 'converted'].includes(bookingResult.state)
                      }"
                    >
                      Booking Terkonfirmasi
                    </h4>
                    <p class="text-xs text-gray-500">
                      <span v-if="['confirmed', 'converted'].includes(bookingResult.state)">
                        Booking telah dikonfirmasi oleh bengkel
                      </span>
                      <span v-else>
                        Menunggu konfirmasi dari bengkel
                      </span>
                    </p>
                  </div>
                </div>
                
                <!-- Step 3: In Progress -->
                <div class="flex items-start">
                  <div 
                    class="flex items-center justify-center h-10 w-10 rounded-full z-10"
                    :class="{
                      'bg-green-100 text-green-600': bookingResult.state === 'converted',
                      'bg-gray-100 text-gray-400': bookingResult.state !== 'converted'
                    }"
                  >
                    <svg v-if="bookingResult.state === 'converted'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span v-else class="h-6 w-6 flex items-center justify-center text-xl">3</span>
                  </div>
                  <div class="ml-4">
                    <h4 
                      class="text-sm font-medium"
                      :class="{
                        'text-gray-900': bookingResult.state === 'converted',
                        'text-gray-500': bookingResult.state !== 'converted'
                      }"
                    >
                      Servis Sedang Berlangsung
                    </h4>
                    <p class="text-xs text-gray-500">
                      <span v-if="bookingResult.state === 'converted'">
                        Kendaraan Anda sedang dikerjakan
                      </span>
                      <span v-else>
                        Menunggu kendaraan masuk bengkel
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Services List -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Layanan yang Dipesan
            </h3>
            
            <div class="rounded-lg overflow-hidden border border-gray-200 divide-y divide-gray-200">
              <div v-for="(service, index) in bookingResult.services" :key="index" class="p-3 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                    <p class="text-xs text-gray-500">{{ service.quantity }}x</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">Rp {{ formatCurrency(service.subtotal) }}</p>
                </div>
              </div>
              
              <!-- Total -->
              <div class="p-3 bg-gray-50 flex justify-between items-center">
                <span class="text-sm font-medium text-gray-900">Total</span>
                <span class="text-sm font-bold text-red-600">Rp {{ formatCurrency(bookingResult.total_amount) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              @click="downloadInvoice"
              class="flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-all duration-300 transform active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Download Invoice
            </button>
            
            <button
            @click="shareBooking" 
            class="flex justify-center items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Bagikan
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Empty State (When No Results) -->
  <div v-else-if="searched && !loading" class="px-4 py-6 animate-fade-in">
    <div class="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
      <!-- Illustration -->
      <div class="mb-4 flex justify-center">
        <div class="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">Booking Tidak Ditemukan</h3>
      <p class="text-gray-500 mb-5">Pastikan kode booking dan nomor plat kendaraan sudah benar.</p>
      
      <div class="flex flex-col space-y-3">
        <button
          @click="resetSearch"
          class="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Coba Lagi
        </button>
        
        <a 
          href="/"
          class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Buat Booking Baru
        </a>
      </div>
    </div>
  </div>
  
  <!-- Initial State Instructions -->
  <div v-if="!searched && !loading && !bookingResult" class="px-4 py-6">
    <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Cara melihat status booking</h3>
          <div class="mt-2 text-sm text-blue-700">
            <ul class="list-disc pl-5 space-y-1">
              <li>Masukkan kode booking 6 karakter (contoh: ABC123) atau nomor referensi lengkap</li>
              <li>Masukkan nomor plat kendaraan yang digunakan saat booking</li>
              <li>Anda juga dapat memindai QR Code dari email konfirmasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- QR Code Modal -->
  <div v-if="showQRModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all animate-scale-in">
      <div class="relative">
        <!-- Header -->
        <div class="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">QR Code Booking</h3>
          <button @click="showQRModal = false" class="text-gray-400 hover:text-gray-500 transition-colors">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-4 text-center">
          <div class="bg-gray-50 p-4 rounded-lg">
            <!-- QR Code -->
            <div class="h-64 w-64 mx-auto border border-gray-200 rounded-lg mb-3 flex items-center justify-center bg-white">
              <img 
                v-if="qrCodeUrl" 
                :src="qrCodeUrl" 
                alt="Booking QR Code"
                class="max-h-full max-w-full p-2"
              />
              <div v-else class="text-gray-400 flex flex-col items-center justify-center h-full">
                <svg class="animate-spin h-10 w-10 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Memuat QR Code...</span>
              </div>
            </div>
            <p class="text-sm text-gray-600">Tunjukkan QR Code ini saat tiba di bengkel</p>
            <div class="mt-1">
              <p class="text-xs text-gray-500">Kode Booking:</p>
              <p class="text-base font-bold tracking-wider text-gray-800">{{ bookingResult?.unique_code }}</p>
              <p class="text-xs text-gray-400">{{ bookingResult?.booking_reference }}</p>
            </div>
          </div>
        </div>
        
        <!-- Footer Actions -->
        <div class="p-4 border-t border-gray-100 bg-gray-50">
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="downloadQRCode"
              class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Unduh QR
            </button>
            
            <button
              @click="shareQRCode"
              class="flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- QR Scanner Modal -->
  <div v-if="showScannerModal" class="fixed inset-0 z-50 bg-black flex flex-col">
    <div class="bg-white p-4 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Scan QR Code</h3>
      <button @click="closeScannerModal" class="text-gray-400 hover:text-gray-500">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="flex-1 relative">
      <!-- Scanner frame overlay -->
      <div class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div class="w-64 h-64 border-2 border-white rounded-lg relative">
          <!-- Scanner corners -->
          <div class="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-white"></div>
          <div class="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-white"></div>
          <div class="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-white"></div>
          <div class="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-white"></div>
          
          <!-- Scanner line animation -->
          <div class="absolute top-0 left-0 right-0 h-0.5 bg-red-500 animate-scanner-line"></div>
        </div>
      </div>
      
      <!-- This would be a real QR scanner in production -->
      <div class="w-full h-full bg-black flex items-center justify-center">
        <div class="text-white text-center">
          <p class="mb-2">Kamera akan otomatis memindai QR Code</p>
          <p class="text-sm text-gray-400">Pastikan QR Code terlihat jelas di layar</p>
        </div>
      </div>
    </div>
    
    <!-- Manual input option -->
    <div class="bg-white p-4">
      <button 
        @click="closeScannerModal"
        class="w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Input Manual
      </button>
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
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// State management
const bookingCode = ref('')
const plateNumber = ref('')
const loading = ref(false)
const searched = ref(false)
const bookingResult = ref(null)
const showQRModal = ref(false)
const showScannerModal = ref(false)
const qrCodeUrl = ref(null)
const errors = reactive({
bookingCode: '',
plateNumber: ''
})

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

// Validate form
const validateForm = () => {
let isValid = true
errors.bookingCode = ''
errors.plateNumber = ''

if (!bookingCode.value.trim()) {
  errors.bookingCode = 'Kode booking harus diisi'
  isValid = false
}

if (!plateNumber.value.trim()) {
  errors.plateNumber = 'Nomor plat harus diisi'
  isValid = false
}

return isValid
}

// Search for a booking
const searchBooking = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    loading.value = true;
    searched.value = true;
    
    // Format JSON-RPC untuk Odoo
    const data = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        booking_code: bookingCode.value.trim(),
        plate_number: plateNumber.value.trim()
      },
      id: new Date().getTime()
    };
    
    console.log('Sending payload:', data);
    
    const response = await axios.post('/web/v1/booking/search', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Raw response:', response);
    
    // Untuk Odoo JSON-RPC, hasil sebenarnya ada di response.data.result
    const result = response.data.result;
    console.log('Parsed result:', result);
    
    if (result && result.status === 'success') {
      bookingResult.value = result.data;
      showToast('Booking ditemukan!', 'success');
      
      // Generate QR code URL
      if (bookingResult.value.unique_code) {
        qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(bookingResult.value.unique_code)}`;
      }
    } else {
      bookingResult.value = null;
      showToast((result && result.message) || 'Booking tidak ditemukan', 'error');
    }
  } catch (error) {
    console.error('Error searching booking:', error);
    // ... error handling ...
    bookingResult.value = null;
  } finally {
    loading.value = false;
  }
};

// Reset search form
const resetSearch = () => {
bookingCode.value = ''
plateNumber.value = ''
bookingResult.value = null
searched.value = false
errors.bookingCode = ''
errors.plateNumber = ''
}

// Format currency
const formatCurrency = (value) => {
if (typeof value !== 'number') {
  value = Number(value) || 0
}
return value.toLocaleString('id-ID')
}

// Format date
const formatDate = (dateString) => {
if (!dateString) return ''

const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}

try {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', options)
} catch (e) {
  return dateString
}
}

// Get status label
const getStatusLabel = (state) => {
switch (state) {
  case 'draft':
    return 'Menunggu Konfirmasi'
  case 'confirmed':
    return 'Terkonfirmasi'
  case 'converted':
    return 'Sedang Diproses'
  case 'cancelled':
    return 'Dibatalkan'
  default:
    return 'Tidak Diketahui'
}
}

// Open QR Scanner
const openScanner = () => {
showScannerModal.value = true
}

// Close QR Scanner modal
const closeScannerModal = () => {
showScannerModal.value = false
}

// Show QR Code
const showQRCode = () => {
if (!bookingResult.value) return
showQRModal.value = true
}

// Download QR Code
const downloadQRCode = () => {
if (!qrCodeUrl.value) {
  showToast('QR Code belum tersedia', 'warning')
  return
}

// Buat link untuk download QR Code
const downloadLink = document.createElement('a')
downloadLink.href = qrCodeUrl.value
downloadLink.download = `booking-${bookingResult.value.unique_code}.png`
document.body.appendChild(downloadLink)
downloadLink.click()
document.body.removeChild(downloadLink)

showToast('QR Code telah diunduh', 'success')
}

// Download invoice
const downloadInvoice = () => {
if (!bookingResult.value) return

showToast('Mengunduh invoice...', 'info')

// Implementasi download invoice sesuai kebutuhan
// Di sini bisa menggunakan axios untuk memanggil endpoint yang menghasilkan PDF
setTimeout(() => {
  showToast('Invoice telah diunduh', 'success')
}, 1500)
}

// Share QR Code
const shareQRCode = () => {
if (!qrCodeUrl.value) {
  showToast('QR Code belum tersedia', 'warning')
  return
}

// Check if Web Share API is supported
if (navigator.share) {
  navigator.share({
    title: `Booking ${bookingResult.value.unique_code}`,
    text: `QR Code booking servis untuk ${bookingResult.value.car_info}`,
    url: window.location.href
  })
  .then(() => showToast('QR Code berhasil dibagikan', 'success'))
  .catch((error) => {
    console.error('Error sharing:', error)
    showToast('Gagal membagikan QR Code', 'error')
  })
} else {
  // Fallback for browsers that don't support the Web Share API
  showToast('Browser Anda tidak mendukung fitur berbagi', 'info')
}
}

// Share Booking
const shareBooking = () => {
if (!bookingResult.value) return

// Check if Web Share API is supported
if (navigator.share) {
  navigator.share({
    title: `Booking ${bookingResult.value.unique_code}`,
    text: `Booking servis untuk ${bookingResult.value.car_info} pada ${formatDate(bookingResult.value.booking_date)} jam ${bookingResult.value.booking_time}`,
    url: window.location.href
  })
  .then(() => showToast('Booking berhasil dibagikan', 'success'))
  .catch((error) => {
    console.error('Error sharing:', error)
    showToast('Gagal membagikan booking', 'error')
  })
} else {
  // Fallback for browsers that don't support the Web Share API
  showToast('Browser Anda tidak mendukung fitur berbagi', 'info')
}
}

onMounted(() => {
// Bisa digunakan untuk inisialisasi scanner QR jika tersedia
})
</script>

<style scoped>
/* Animation for fading in elements */
.animate-fade-in {
animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
from {
  opacity: 0;
  transform: translateY(10px);
}
to {
  opacity: 1;
  transform: translateY(0); 
}
}

/* Animation for scanner line */
.animate-scanner-line {
animation: scannerLine 2s linear infinite;
}

@keyframes scannerLine {
0% {
  top: 0%;
}
50% {
  top: 100%;
}
50.1% {
  top: 0%;
}
100% {
  top: 100%;
}
}

/* Animation for sliding up toast */
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

/* Animation for scale in modal */
.animate-scale-in {
 animation: scaleIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
 from {
   opacity: 0;
   transform: scale(0.95);
 }
 to {
   opacity: 1;
   transform: scale(1);
 }
}
</style>