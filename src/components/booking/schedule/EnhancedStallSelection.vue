<template>
  <div class="space-y-6">
    <!-- Enhanced Garage Layout Visualization -->
    <div class="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div class="text-center py-2 text-sm font-medium text-gray-700 border-b border-gray-200 bg-gray-50">
        Layout Stall Bengkel ({{ formattedSelectedDateDisplay }})
      </div>

      <!-- 3D-like Garage layout visualization -->
      <div class="p-4">
        <div class="bg-gradient-to-b from-gray-800 to-gray-700 p-4 rounded-lg shadow-inner">
          <!-- Entrance sign -->
          <div class="mb-2 mx-auto w-48 text-center">
            <div class="bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-t-md">ENTRANCE</div>
            <div class="h-1 bg-yellow-400"></div>
          </div>
          
          <!-- Garage Layout with perspective effect -->
          <div class="relative bg-gray-600 rounded-lg overflow-hidden transform perspective-900 border-b-8 border-gray-800">
            <!-- Top entrance -->
            <div class="w-full h-6 bg-gray-500 flex items-center justify-center">
              <div class="w-32 h-1 bg-yellow-400"></div>
            </div>
            
            <!-- Garage floor with parking spots -->
            <div class="p-3 grid grid-cols-5 gap-2 justify-center bg-gradient-to-b from-gray-600 to-gray-700">
              <!-- Visual indicator of slots with 3D effect -->
              <div 
                v-for="stall in allStalls" 
                :key="'slot-'+stall.id" 
                @click="$emit('select-stall', stall)"
                class="stall-card relative h-14 rounded-md shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1"
                :class="[
                  { 'bg-gradient-to-b from-green-300 to-green-200 stall-available': isStallAvailable(stall) },
                  { 'bg-gradient-to-b from-red-300 to-red-200 stall-occupied': !isStallAvailable(stall) },
                  { 'ring-4 ring-blue-400 stall-selected animate-pulse': selectedStall && selectedStall.id === stall.id }
                ]"
              >
                <!-- Stall Name -->
                <div class="absolute top-0 left-0 right-0 bg-gray-800 bg-opacity-60 text-white text-xs font-bold text-center py-0.5 rounded-t-md">
                  {{ stall.name }}
                </div>
                
                <!-- Car indicator with perspective effect -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg v-if="!isStallAvailable(stall)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-8 w-8 transform rotate-90" :class="{'text-red-600': stall.id % 4 === 1, 'text-blue-600': stall.id % 4 === 0, 'text-yellow-600': stall.id % 4 === 2, 'text-green-600': stall.id % 4 === 3}">
                    <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                  </svg>
                  
                  <!-- Selected indicator -->
                  <div v-if="selectedStall && selectedStall.id === stall.id" class="h-5 w-5 bg-blue-500 rounded-full animate-ping absolute"></div>
                  
                  <!-- Status indicator dot -->
                  <div v-if="isStallAvailable(stall)" class="absolute bottom-1 right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div v-else class="absolute bottom-1 right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
                
                <!-- Oil stain on floor (for realism) -->
                <div v-if="!isStallAvailable(stall) && stall.id % 3 === 0" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-800 rounded-full opacity-20"></div>
              </div>
            </div>
            
            <!-- Bottom exit -->
            <div class="w-full h-6 bg-gray-500 flex items-center justify-center">
              <div class="w-32 h-1 bg-yellow-400"></div>
            </div>
          </div>
          
          <!-- Exit sign -->
          <div class="mt-2 mx-auto w-48 text-center">
            <div class="h-1 bg-yellow-400"></div>
            <div class="bg-gray-900 text-white text-xs font-bold py-1 px-2 rounded-b-md">EXIT</div>
          </div>

          <!-- Legend with tooltips -->
          <div class="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white">
            <div class="flex items-center bg-gray-900 bg-opacity-40 rounded-full px-2 py-1">
              <div class="w-3 h-3 bg-gradient-to-b from-green-300 to-green-200 rounded-sm mr-1"></div>
              <span>Tersedia</span>
            </div>
            <div class="flex items-center bg-gray-900 bg-opacity-40 rounded-full px-2 py-1">
              <div class="w-3 h-3 bg-gradient-to-b from-red-300 to-red-200 rounded-sm mr-1"></div>
              <span>Terisi</span>
            </div>
            <div class="flex items-center bg-gray-900 bg-opacity-40 rounded-full px-2 py-1">
              <div class="w-3 h-3 ring-2 ring-blue-400 bg-white rounded-sm mr-1"></div>
              <span>Terpilih</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stall Availability Summary -->
      <div class="px-4 py-2 border-t border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between text-sm">
        <div class="flex items-center space-x-2">
          <span class="text-gray-500">Stall Tersedia:</span>
          <span class="font-medium text-green-600">{{ availableStallsCount }} dari {{ allStalls.length }}</span>
        </div>
        
        <div class="flex items-center space-x-1">
          <span v-if="selectedStall" class="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full text-xs">
            Stall {{ selectedStall.name }} terpilih
          </span>
          <span v-else class="bg-yellow-100 text-yellow-800 font-medium px-2 py-0.5 rounded-full text-xs">
            Silakan pilih stall
          </span>
        </div>
      </div>
    </div>
    
    <!-- Stall Grid with Enhanced Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="stall in allStalls" 
        :key="stall.id" 
        class="relative transition-all duration-300 transform"
        :class="[
          { 'opacity-100': isStallAvailable(stall) || (selectedStall && selectedStall.id === stall.id) },
          { 'opacity-80': !isStallAvailable(stall) && (!selectedStall || selectedStall.id !== stall.id) },
          { 'scale-105 z-10': selectedStall && selectedStall.id === stall.id }
        ]"
      >
        <!-- Card Container with 3D effect -->
        <div 
          @click="$emit('select-stall', stall)" 
          class="stall-detail-card relative rounded-lg overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-lg transform perspective-500"
          :class="[
            { 'cursor-pointer': isStallAvailable(stall) },
            { 'cursor-not-allowed': !isStallAvailable(stall) },
            { 'border-2 border-blue-500': selectedStall && selectedStall.id === stall.id }
          ]"
        >
          <!-- Stall Status Badge (Absolute positioned) -->
          <div 
            class="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm"
            :class="[
              { 'bg-green-100 text-green-800': isStallAvailable(stall) },
              { 'bg-red-100 text-red-800': !isStallAvailable(stall) }
            ]"
          >
            <div class="flex items-center">
              <span class="h-2 w-2 mr-1 rounded-full" :class="[
                { 'bg-green-500 animate-pulse': isStallAvailable(stall) },
                { 'bg-red-500': !isStallAvailable(stall) }
              ]"></span>
              {{ isStallAvailable(stall) ? 'Tersedia' : 'Terisi' }}
            </div>
          </div>
          
          <!-- Stall Header -->
          <div class="p-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <div class="flex items-center space-x-2">
              <div class="bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold">
                {{ stall.name.replace('Stall ', '') }}
              </div>
              <div>
                <h3 class="text-base font-medium">{{ stall.name }}</h3>
                <p class="text-xs text-gray-300">{{ selectedHour }} - {{ calculateEndTime(selectedHour, totalServiceDuration) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Stall Body with Advanced Car Visualization -->
          <div class="bg-white p-4 pb-16 relative">
            <!-- Car Visualization -->
            <div class="h-32 relative mb-4">
              <div class="absolute inset-0 bg-gray-100 rounded-lg"></div>
              
              <!-- Car Image Based on Status -->
              <div v-if="!isStallAvailable(stall)" class="absolute inset-0 flex flex-col items-center justify-center">
                <!-- Car SVG with reflection effect -->
                <div class="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-24 w-24 drop-shadow-md"
                    :class="{'text-blue-500': stall.id % 4 === 0, 'text-red-500': stall.id % 4 === 1, 'text-yellow-500': stall.id % 4 === 2, 'text-green-600': stall.id % 4 === 3}"
                  >
                    <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                  </svg>
                  
                  <!-- Reflection -->
                  <div class="h-4 w-16 mx-auto bg-current opacity-20 blur-sm rounded-full transform scale-y-50"></div>
                </div>
                
                <!-- Random vehicle info -->
                <div class="mt-2 text-xs font-medium text-center" :class="{'text-red-800': stall.id % 4 === 1, 'text-blue-800': stall.id % 4 === 0, 'text-yellow-800': stall.id % 4 === 2, 'text-green-800': stall.id % 4 === 3}">
                  {{ getRandomVehicleInfo(stall.id) }}
                </div>
              </div>
              
              <!-- Empty stall with parking markings -->
              <div v-else class="absolute inset-0 flex items-center justify-center">
                <div class="parking-spot">
                  <div class="text-xs text-gray-400 font-medium mb-1 text-center">Slot Parkir {{ stall.name }}</div>
                  <div class="border-2 border-dashed border-gray-300 rounded h-16 w-24 flex items-center justify-center">
                    <div class="text-gray-300 flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                      <span class="text-xs mt-1">Kosong</span>
                    </div>
                  </div>
                </div>
                
                <!-- Current selection indicator -->
                <div v-if="selectedStall && selectedStall.id === stall.id" class="absolute inset-0 border-4 border-blue-400 rounded-lg animate-pulse opacity-50"></div>
              </div>
            </div>
            
            <!-- Stall Information -->
            <div class="space-y-3">
              <!-- Available Stall Info -->
              <div v-if="isStallAvailable(stall)" class="space-y-2">
                <div class="flex items-center rounded-md bg-gradient-to-r from-blue-50 to-white p-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="flex-1">
                    <span class="text-xs text-gray-500">Waktu Servis:</span>
                    <div class="font-medium text-sm">{{ selectedHour }} - {{ calculateEndTime(selectedHour, totalServiceDuration) }}</div>
                  </div>
                </div>
                
                <div class="flex items-center rounded-md bg-gradient-to-r from-green-50 to-white p-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="flex-1">
                    <span class="text-xs text-gray-500">Status:</span>
                    <div class="font-medium text-sm text-green-600">Siap Digunakan</div>
                  </div>
                </div>
                
                <div class="flex items-center rounded-md bg-gradient-to-r from-purple-50 to-white p-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div class="flex-1">
                    <span class="text-xs text-gray-500">Durasi Servis:</span>
                    <div class="font-medium text-sm">{{ formatDuration(totalServiceDuration) }}</div>
                  </div>
                </div>
              </div>
              
              <!-- Booked Stall Info -->
              <div v-else class="space-y-2">
                <p class="text-xs font-medium text-gray-500 uppercase">Jadwal Terisi:</p>
                
                <div v-for="(slot, index) in stall.booked_slots.slice(0, 3)" :key="index" 
                    class="flex items-center justify-between bg-gray-50 p-2 rounded-md shadow-sm border-l-2 border-red-400"
                >
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-xs font-medium">{{ formatTime(slot.start_time) }} - {{ formatTime(slot.end_time) }}</span>
                  </div>
                  <span class="text-xs text-gray-500 truncate max-w-[120px]" :title="slot.customer || 'Customer'">
                    {{ slot.customer || 'Customer' }}
                  </span>
                </div>
                
                <div v-if="stall.booked_slots.length > 3" class="text-center text-xs text-gray-500 italic p-1">
                  + {{ stall.booked_slots.length - 3 }} jadwal lainnya
                </div>
              </div>
            </div>
          </div>
          
          <!-- Selection button at bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200 bg-gray-50">
            <button 
              v-if="isStallAvailable(stall)"
              class="w-full py-2 rounded-md text-xs font-medium shadow-sm transition-colors"
              :class="selectedStall && selectedStall.id === stall.id 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'"
            >
              {{ selectedStall && selectedStall.id === stall.id ? 'Terpilih ✓' : 'Pilih Stall' }}
            </button>
            <div v-else class="w-full p-2 text-center">
              <span class="text-xs text-red-500 font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Stall Tidak Tersedia
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Stall Detail Panel -->
    <div v-if="selectedStall" class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
        <h3 class="text-lg font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Detail Booking {{ selectedStall.name }}
        </h3>
        <div class="px-2 py-0.5 text-xs bg-white text-blue-800 rounded-full font-medium">
          {{ formattedSelectedDateDisplay }}
        </div>
      </div>
      
      <div class="p-4 space-y-4">
        <!-- Vehicle & Time Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Time & Duration Info -->
          <div class="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg shadow-sm space-y-3">
            <h4 class="text-sm font-medium text-gray-700 flex items-center pb-2 border-b border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informasi Waktu Booking
            </h4>
            
            <div class="space-y-2 pl-1">
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Waktu Mulai:</span>
                <span class="font-medium text-gray-900">{{ selectedHour }}</span>
              </div>
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Estimasi Selesai:</span>
                <span class="font-medium text-gray-900">{{ calculateEndTime(selectedHour, totalServiceDuration) }}</span>
              </div>
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Total Durasi:</span>
                <span class="font-medium text-blue-600">{{ formatDuration(totalServiceDuration) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Vehicle & Customer Info -->
          <div class="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg shadow-sm space-y-3">
            <h4 class="text-sm font-medium text-gray-700 flex items-center pb-2 border-b border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              Informasi Kendaraan
            </h4>
            
            <div class="space-y-2 pl-1">
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Plat Nomor:</span>
                <span class="font-medium text-gray-900">{{ customerForm.plate_number.toUpperCase() }}</span>
              </div>
              
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Pemilik:</span>
                <span class="font-medium text-gray-900">{{ customerForm.customer_name }}</span>
              </div>
              
              <div class="flex justify-between text-sm bg-white rounded-md p-2">
                <span class="text-gray-600">Jenis Mobil:</span>
                <span class="font-medium text-gray-900 truncate max-w-[150px]" :title="`${getBrandName(customerForm.brand_id)} ${getBrandTypeName(customerForm.brand_type_id)}`">
                  {{ getBrandName(customerForm.brand_id) }} {{ getBrandTypeName(customerForm.brand_type_id) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Services List with Enhanced UI -->
        <div>
          <h4 class="text-sm font-medium text-gray-700 flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Layanan yang Akan Dilakukan
          </h4>
          
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Layanan
                  </th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durasi
                  </th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="serviceId in customerForm.service_ids" :key="serviceId" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 text-sm text-gray-900">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>{{ getServiceName(serviceId) }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900 text-right">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ formatDuration(getServiceDuration(serviceId)) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-right">
                    <div class="flex flex-col items-end">
                      <span class="text-xs text-gray-500 line-through">
                        Rp {{ formatCurrency(getOriginalPrice(serviceId)) }}
                      </span>
                      <span class="font-medium text-blue-600">
                        Rp {{ formatCurrency(getServicePrice(serviceId)) }}
                      </span>
                    </div>
                  </td>
                </tr>
                
                <!-- Empty state -->
                <tr v-if="customerForm.service_ids.length === 0">
                  <td colspan="3" class="px-4 py-4 text-sm text-gray-500 text-center italic">
                    Belum ada layanan yang dipilih
                  </td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <th scope="row" colspan="2" class="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    Total
                  </th>
                  <td class="px-4 py-3 text-sm text-right">
                    <div class="flex flex-col items-end">
                      <span class="text-xs text-gray-500 line-through">
                        Rp {{ formatCurrency(getTotalOriginalPrice) }}
                      </span>
                      <span class="font-medium text-blue-600">
                        Rp {{ formatCurrency(getTotalPrice) }}
                      </span>
                      <span class="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full mt-0.5">
                        Hemat {{ getTotalDiscountPercentage }}%
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <!-- Notes if any -->
        <div v-if="customerForm.notes" class="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h4 class="text-sm font-medium text-gray-700 flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Catatan Tambahan
          </h4>
          
          <div class="bg-white p-3 rounded-lg border border-yellow-200">
            <p class="text-sm text-gray-700">{{ customerForm.notes }}</p>
          </div>
        </div>
      </div>
      
      <!-- Footer Action -->
      <div class="bg-gray-50 px-4 py-3 flex justify-end">
        <button 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          @click="$emit('confirm-stall-selection')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Konfirmasi Stall Ini
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'EnhancedStallSelection',
  props: {
    allStalls: {
      type: Array,
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
      default: null
    },
    totalServiceDuration: {
      type: Number,
      required: true
    },
    customerForm: {
      type: Object,
      required: true
    },
    services: {
      type: Array,
      default: () => []
    },
    brands: {
      type: Array,
      default: () => []
    },
    brandTypes: {
      type: Array,
      default: () => []
    },
    transmissions: {
      type: Array,
      default: () => []
    },
    formattedSelectedDateDisplay: {
      type: String,
      required: true
    }
  },
  emits: ['select-stall', 'confirm-stall-selection'],
  setup(props) {
    // Count available stalls
    const availableStallsCount = computed(() => {
      if (!props.allStalls || !Array.isArray(props.allStalls)) {
        return 0;
      }
      
      return props.allStalls.filter(stall => isStallAvailable(stall)).length;
    });
    
    // Calculate end time
    const calculateEndTime = (hour, duration) => {
      if (!hour) return '';
      
      const [hours, minutes] = hour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + duration * 60;
      
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = Math.round(totalMinutes % 60);
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    };

    // Format time from float
    const formatTime = (timeFloat) => {
      if (typeof timeFloat !== 'number') return '';
      
      const hours = Math.floor(timeFloat);
      const minutes = Math.round((timeFloat - hours) * 60);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

    // Check if stall is available
    const isStallAvailable = (stall) => {
      if (!props.selectedHour || !stall) return false;
      
      // Convert selected hour to float
      const [hours, minutes] = props.selectedHour.split(':').map(Number);
      const selectedTimeFloat = hours + (minutes / 60);
      
      // Calculate end time
      const endTimeFloat = selectedTimeFloat + props.totalServiceDuration;
      
      // Check if stall is available
      return !stall.booked_slots || !stall.booked_slots.some(slot => {
        return (
          (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
          (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
          (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
        );
      });
    };

    // Get service name
    const getServiceName = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      return service ? service.name : '';
    };

    // Get service duration
    const getServiceDuration = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      return service && service.duration ? service.duration : 0;
    };

    // Get service price
    const getServicePrice = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      return service && service.price ? service.price : 0;
    };

    // Get original price
    const getOriginalPrice = (serviceId) => {
      const service = props.services.find(s => s && s.id === serviceId);
      if (!service || !service.price) return 0;
      
      // 10% markup for online booking discount
      return Math.ceil(service.price * 1.1 / 1000) * 1000;
    };

    // Calculate total price
    const getTotalPrice = computed(() => {
      let total = 0;
      
      // Sum all service prices
      for (const serviceId of props.customerForm.service_ids) {
        const service = props.services.find(s => s && s.id === serviceId);
        if (service && service.price) {
          total += service.price;
        }
      }
      
      return total;
    });

    // Calculate total original price
    const getTotalOriginalPrice = computed(() => {
      let total = 0;
      
      // Sum all original service prices
      for (const serviceId of props.customerForm.service_ids) {
        total += getOriginalPrice(serviceId);
      }
      
      return total;
    });

    // Calculate discount percentage
    const getTotalDiscountPercentage = computed(() => {
      if (getTotalOriginalPrice.value <= 0) return 0;
      return Math.round((1 - getTotalPrice.value / getTotalOriginalPrice.value) * 100);
    });

    // Format currency
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };

    // Get brand name
    const getBrandName = (brandId) => {
      if (!brandId) return 'N/A';
      const brand = props.brands.find(b => b.id === brandId);
      return brand ? brand.name : 'N/A';
    };

    // Get brand type name
    const getBrandTypeName = (typeId) => {
      if (!typeId) return 'N/A';
      const type = props.brandTypes.find(t => t.id === typeId);
      return type ? type.name : 'N/A';
    };

    // Get transmission name
    const getTransmissionName = (transmissionId) => {
      if (!transmissionId) return 'N/A';
      const transmission = props.transmissions.find(t => t.id === transmissionId);
      return transmission ? transmission.name : 'Manual';
    };

    // Car brands data for random vehicles
    const carBrands = [
      { brand: 'Toyota', models: ['Avanza', 'Fortuner', 'Innova', 'Rush', 'Calya', 'Vios', 'Yaris'] },
      { brand: 'Honda', models: ['Brio', 'Civic', 'HR-V', 'CR-V', 'Jazz', 'Mobilio', 'BR-V'] },
      { brand: 'Daihatsu', models: ['Xenia', 'Terios', 'Sigra', 'Ayla', 'Sirion', 'Gran Max'] },
      { brand: 'Suzuki', models: ['Ertiga', 'XL7', 'Ignis', 'Baleno', 'Jimny', 'Carry'] },
      { brand: 'Mitsubishi', models: ['Xpander', 'Pajero', 'Eclipse Cross', 'Outlander'] },
    ];

    // Get random plate number
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

    // Get random vehicle info for booked stalls
    const getRandomVehicleInfo = (stallId) => {
      // Seed random based on stall ID
      const seedRandom = (seed, max) => {
        return Math.floor((Math.sin(seed) * 10000) % max);
      };
      
      // Choose brand and model
      const brandIndex = seedRandom(stallId, carBrands.length);
      const brand = carBrands[brandIndex];
      const modelIndex = seedRandom(stallId + 100, brand.models.length);
      const model = brand.models[modelIndex];
      
      // Generate plate number
      const plateNumber = getRandomPlateNumber(stallId);
      
      // Display format based on stall ID
      if (stallId % 4 === 0) {
        return `${model} (${plateNumber})`;
      } else if (stallId % 4 === 1) {
        return `${brand.brand} ${model} (${plateNumber})`;
      } else if (stallId % 4 === 2) {
        return plateNumber;
      } else {
        return `${model} - ${plateNumber}`;
      }
    };

    return {
      availableStallsCount,
      calculateEndTime,
      formatTime,
      formatDuration,
      isStallAvailable,
      getServiceName,
      getServiceDuration,
      getServicePrice,
      getOriginalPrice,
      getTotalPrice,
      getTotalOriginalPrice,
      getTotalDiscountPercentage,
      formatCurrency,
      getBrandName,
      getBrandTypeName,
      getTransmissionName,
      getRandomVehicleInfo
    };
  }
};
</script>

<style scoped>
/* 3D perspective effect */
.perspective-900 {
  perspective: 900px;
}

.perspective-500 {
  perspective: 500px;
}

/* Stall animation effects */
.stall-available {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.stall-available:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.stall-selected {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.stall-occupied {
  transition: all 0.3s ease;
}

/* Parking spot styling */
.parking-spot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Card styling */
.stall-detail-card {
  background-color: white;
  transition: all 0.3s ease;
}

.stall-card {
  transition: all 0.3s ease;
}

.stall-card:hover {
  transform: translateY(-5px) scale(1.02);
}

/* Animation for showing detail box */
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