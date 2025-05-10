<template>
  <div class="space-y-4">
    <!-- Stall layout visualization -->
    <div class="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div class="text-center py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
        Layout Stall ({{ formattedSelectedDateDisplay }})
      </div>

      <!-- Garage layout visualization -->
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
              <div 
                v-for="stall in allStalls" 
                :key="'mini-'+stall.id" 
                @click="$emit('select-stall', stall)"
                class="w-12 h-10 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative"
                :class="{
                  'bg-green-200 text-green-800 hover:bg-green-300': isStallAvailable(stall),
                  'bg-red-200 text-red-800': !isStallAvailable(stall),
                  'ring-2 ring-white': selectedStall && selectedStall.id === stall.id
                }"
              >
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
        <div 
          v-for="stall in allStalls" 
          :key="stall.id" 
          class="relative rounded-lg transition-all duration-200 transform hover:scale-105"
          :class="[
            { 'opacity-100': isStallAvailable(stall) || (selectedStall && selectedStall.id === stall.id) },
            { 'opacity-80': !isStallAvailable(stall) && (!selectedStall || selectedStall.id !== stall.id) },
            { 'ring-4 ring-red-500 shadow-lg': selectedStall && selectedStall.id === stall.id }
          ]"
        >
          <!-- Card Container -->
          <div 
            @click="$emit('select-stall', stall)" 
            class="cursor-pointer bg-gray-200 rounded-lg overflow-hidden h-full"
            :class="{'cursor-not-allowed': !isStallAvailable(stall)}"
          >
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
                  :class="{'text-blue-500': stall.id % 4 === 0, 'text-red-500': stall.id % 4 === 1, 'text-yellow-500': stall.id % 4 === 2, 'text-green-700': stall.id % 4 === 3}"
                >
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
                    <span class="flex-1">{{ selectedHour }} - {{ calculateEndTime }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between text-xs text-gray-700 bg-white p-1 rounded">
                    <span>Estimasi Durasi:</span>
                    <span class="font-medium">{{ formatDuration(totalServiceDuration) }}</span>
                  </div>
                </div>
                
                <!-- Booked Stall Info -->
                <div v-else class="space-y-1 text-xs">
                  <div v-for="(slot, index) in stall.booked_slots.slice(0, 2)" :key="index" 
                      class="flex items-center justify-between text-xs font-medium bg-white p-1 rounded"
                  >
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
                :class="{'bg-red-50': selectedStall && selectedStall.id === stall.id}"
            >
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

      <!-- Selected Stall Detail -->
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
                  <span class="font-medium text-gray-900">{{ calculateEndTime }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Total Durasi:</span>
                  <span class="font-medium text-gray-900">{{ formatDuration(totalServiceDuration) }}</span>
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
                
                <div class="flex justify-between text-sm">
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
                          Rp {{ formatCurrency(getOriginalPrice(serviceId)) }}
                        </span>
                        <span class="font-medium text-red-600">
                          Rp {{ formatCurrency(getServicePrice(serviceId)) }}
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
                          Rp {{ formatCurrency(getTotalOriginalPrice) }}
                        </span>
                        <span class="font-medium text-red-600">
                          Rp {{ formatCurrency(getTotalPrice) }}
                        </span>
                        <span class="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full mt-0.5">
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
            @click="$emit('confirm-stall-selection')"
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
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StallSelectionSection',
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
    // Calculate end time
    const calculateEndTime = computed(() => {
      if (!props.selectedHour) return '';
      
      const [hours, minutes] = props.selectedHour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + props.totalServiceDuration * 60;
      
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    });

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

    // Car brands data
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

    // Get random vehicle info
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
        return `${model}\n${plateNumber}`;
      } else if (stallId % 4 === 1) {
        return `${brand.brand} ${model}\n${plateNumber}`;
      } else if (stallId % 4 === 2) {
        return `${plateNumber}`;
      } else {
        return `${model} - ${plateNumber}`;
      }
    };

    return {
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