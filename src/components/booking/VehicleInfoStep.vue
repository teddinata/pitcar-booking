<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Informasi Kendaraan</h2>
      
      <!-- Intro Message -->
      <div v-if="!hasCheckedPlate && !isCheckingVehicle" class="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 text-sm text-blue-700">
            <p>Pernah servis di PITCAR sebelumnya? Masukkan nomor plat untuk mempercepat proses booking.</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Plate Number Input with Cek Button -->
        <div>
          <label for="plate-number" class="block text-sm font-medium text-gray-700">
            Nomor Plat Kendaraan <span class="text-red-600">*</span>
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <input
              id="plate-number"
              v-model="formData.plate_number"
              type="text"
              class="pl-10 py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md uppercase"
              placeholder="B1234ABC"
              :class="{ 'border-red-300 bg-red-50': plateError }"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button 
                @click="handleVerifyVehicle" 
                :disabled="!formData.plate_number || isCheckingVehicle"
                class="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50"
              >
                <span v-if="isCheckingVehicle" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mencari...</span>
                </span>
                <span v-else>Cek</span>
              </button>
            </div>
          </div>
          <p v-if="plateError" class="mt-1 text-sm text-red-600">{{ plateError }}</p>
          <p v-else class="mt-1 text-xs text-gray-500">Masukkan nomor plat untuk memeriksa kendaraan terdaftar di database PITCAR</p>
        </div>
        
        <!-- Message after verification -->
        <!-- 1. Tampilkan section loading selama pencarian -->
        <div v-if="isCheckingVehicle" class="mt-4">
          <div class="bg-blue-50 rounded-lg p-4 border border-blue-100 animate-fade-in">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div class="ml-3 text-sm text-blue-700">
                <p>Mencari data kendaraan <span class="font-medium">{{ formData.plate_number.toUpperCase() }}</span>...</p>
                <p class="text-xs mt-1">Mohon tunggu sebentar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Section untuk menampilkan hasil pencarian (hanya jika sudah selesai mencari) -->
        <!-- Perbaikan tampilan hasil verifikasi, tambahkan kondisi hasPlateNumber -->
        <div v-if="hasCheckedPlate && verifikasiSelesai && !isCheckingVehicle && hasPlateNumber" class="mt-4">
          <!-- Pesan jika kendaraan ditemukan -->
          <div v-if="vehicleFound" class="bg-green-50 rounded-lg p-4 border border-green-100 animate-fade-in">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-3 text-sm text-green-700">
                <p>Kendaraan <span class="font-medium">{{ formData.plate_number.toUpperCase() }}</span> ditemukan!</p>
                <p class="text-xs mt-1">{{ getBrandTypeText }}</p>
              </div>
            </div>
          </div>
          
          <!-- Pesan jika kendaraan tidak ditemukan - Hanya ditampilkan jika verifikasiSelesai -->
          <div v-else class="bg-yellow-50 rounded-lg p-4 border border-yellow-100 animate-fade-in">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="ml-3 text-sm text-yellow-700">
                <p>Kendaraan <span class="font-medium">{{ formData.plate_number.toUpperCase() }}</span> tidak ditemukan.</p>
                <p class="text-xs mt-1">Silakan lengkapi data berikut untuk membuat kendaraan baru.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Form kendaraan baru (hanya jika kendaraan tidak ditemukan dan sudah selesai mencari) -->
        <div v-if="hasCheckedPlate && verifikasiSelesai && !vehicleFound && !isCheckingVehicle && hasPlateNumber" class="mt-6 space-y-6 animate-fade-in">
          <h3 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">Data Kendaraan & Pemilik</h3>
          
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- Customer Name -->
            <div class="sm:col-span-3">
              <label for="customer-name" class="block text-sm font-medium text-gray-700">
                Nama Lengkap <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="customer-name"
                  v-model="formData.customer_name"
                  type="text"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Nama lengkap Anda"
                  :class="{ 'border-red-300 bg-red-50': formErrors.customer_name }"
                />
              </div>
              <p v-if="formErrors.customer_name" class="mt-1 text-xs text-red-600">{{ formErrors.customer_name }}</p>
            </div>
            
            <!-- Phone Number -->
            <div class="sm:col-span-3">
              <label for="customer-phone" class="block text-sm font-medium text-gray-700">
                Nomor Telepon <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="customer-phone"
                  v-model="formData.customer_phone"
                  type="tel"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="contoh: 08123456789"
                  :class="{ 'border-red-300 bg-red-50': formErrors.customer_phone }"
                />
              </div>
              <p v-if="formErrors.customer_phone" class="mt-1 text-xs text-red-600">{{ formErrors.customer_phone }}</p>
            </div>
            
            <!-- Email -->
            <div class="sm:col-span-3">
              <label for="customer-email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div class="mt-1">
                <input
                  id="customer-email"
                  v-model="formData.customer_email"
                  type="email"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                  v-model="formData.brand_id"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  :class="{ 'border-red-300 bg-red-50': formErrors.brand_id }"
                >
                  <option value="" disabled>Pilih Merek</option>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                </select>
              </div>
              <p v-if="formErrors.brand_id" class="mt-1 text-xs text-red-600">{{ formErrors.brand_id }}</p>
            </div>
            
            <!-- Brand Type -->
            <div class="sm:col-span-3">
              <label for="brand-type" class="block text-sm font-medium text-gray-700">
                Tipe Mobil <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <select
                  id="brand-type"
                  v-model="formData.brand_type_id"
                  :disabled="!formData.brand_id"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  :class="{ 'border-red-300 bg-red-50': formErrors.brand_type_id }"
                >
                  <option value="" disabled>{{ formData.brand_id ? 'Pilih Tipe' : 'Pilih Merek Dahulu' }}</option>
                  <option v-for="type in brandTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </div>
              <p v-if="formErrors.brand_type_id" class="mt-1 text-xs text-red-600">{{ formErrors.brand_type_id }}</p>
            </div>
            
            <!-- Car Year -->
            <div class="sm:col-span-2">
              <label for="car-year" class="block text-sm font-medium text-gray-700">
                Tahun Mobil
              </label>
              <div class="mt-1">
                <input
                  id="car-year"
                  v-model="formData.car_year"
                  type="number"
                  min="1990"
                  :max="new Date().getFullYear()"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <!-- Car Color -->
            <div class="sm:col-span-2">
              <label for="car-color" class="block text-sm font-medium text-gray-700">
                Warna Mobil
              </label>
              <div class="mt-1">
                <input
                  id="car-color"
                  v-model="formData.car_color"
                  type="text"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Contoh: Putih"
                />
              </div>
            </div>
            
            <!-- Transmission -->
            <div class="sm:col-span-2">
              <label for="transmission" class="block text-sm font-medium text-gray-700">
                Transmisi
              </label>
              <div class="mt-1">
                <select
                  id="transmission"
                  v-model="formData.transmission_id"
                  class="py-3 px-4 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="" disabled>Pilih Transmisi</option>
                  <option v-for="trans in transmissions" :key="trans.id" :value="trans.id">{{ trans.name }}</option>
                </select>
              </div>
            </div>
            
            <!-- Engine Type -->
            <div class="sm:col-span-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Jenis Mesin
              </label>
              <div class="flex flex-wrap gap-3">
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.engine_type" value="petrol" class="form-radio h-4 w-4 text-red-600 focus:ring-red-500" />
                  <span class="ml-2 text-sm text-gray-700">Bensin</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.engine_type" value="diesel" class="form-radio h-4 w-4 text-red-600 focus:ring-red-500" />
                  <span class="ml-2 text-sm text-gray-700">Diesel</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.engine_type" value="hybrid" class="form-radio h-4 w-4 text-red-600 focus:ring-red-500" />
                  <span class="ml-2 text-sm text-gray-700">Hybrid</span>
                </label>
                <label class="inline-flex items-center">
                  <input type="radio" v-model="formData.engine_type" value="electric" class="form-radio h-4 w-4 text-red-600 focus:ring-red-500" />
                  <span class="ml-2 text-sm text-gray-700">Listrik</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
      <button
        @click="handleNextStep"
        :disabled="!isFormValid || isCheckingVehicle"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-300 transform active:scale-95"
      >
        <span v-if="isCheckingVehicle" class="mr-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        Lanjutkan
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
import { ref, computed, reactive, watch, onBeforeUnmount } from 'vue';

export default {
  name: 'VehicleInfoStep',
  props: {
    form: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    vehicleFound: {
      type: Boolean,
      default: false
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
    }
  },
  
  emits: ['update:form', 'update:loading', 'verify-vehicle', 'next-step'],
  
  data() {
    return {
      isCheckingVehicle: false,
      hasCheckedPlate: false,
      verifikasiSelesai: false, 
      plateError: '',
      formErrors: {
        customer_name: '',
        customer_phone: '',
        brand_id: '',
        brand_type_id: ''
      },
      toast: {
        show: false,
        message: '',
        type: 'info',
        progress: 100
      },
      toastTimeout: null,
      progressInterval: null
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
    
    // Tambahkan computed property baru untuk mengecek apakah ada plate number
    hasPlateNumber() {
      return this.formData.plate_number && this.formData.plate_number.trim() !== '';
    },
    
    getBrandTypeText() {
      if (!this.vehicleFound) return '';
      
      let brandName = '';
      let typeName = '';
      
      // Find brand name
      const brand = this.brands.find(b => b.id === this.formData.brand_id);
      if (brand) brandName = brand.name;
      
      // Find type name
      const type = this.brandTypes.find(t => t.id === this.formData.brand_type_id);
      if (type) typeName = type.name;
      
      if (brandName && typeName) {
        return `${brandName} ${typeName} (${this.formData.car_year})`;
      } else if (brandName) {
        return brandName;
      }
      
      return '';
    },
    
    isFormValid() {
      // Require plate number at minimum
      if (!this.formData.plate_number) return false;
      
      // If vehicle is found, form is valid
      if (this.vehicleFound) return true;
      
      // Otherwise, need to do more validation for new vehicle
      if (!this.hasCheckedPlate || this.isCheckingVehicle) return false;
      
      return (
        !!this.formData.customer_name &&
        !!this.formData.customer_phone &&
        !!this.formData.brand_id &&
        !!this.formData.brand_type_id
      );
    }
  },
  
  watch: {
    'formData.plate_number'() {
      if (this.hasCheckedPlate) {
        this.hasCheckedPlate = false;
        this.verifikasiSelesai = false; // Reset verifikasi juga
      }
      
      if (this.plateError) {
        this.plateError = '';
      }
    },
    
    'formData.brand_id'() {
      this.formData.brand_type_id = '';
    },
    
    // Watch untuk loading state dari parent component
    loading(newVal, oldVal) {
      // Jika loading berubah dari true ke false, berarti proses di parent sudah selesai
      if (oldVal === true && newVal === false) {
        // Beritahu komponen bahwa checking vehicle sudah selesai
        this.isCheckingVehicle = false;
        
        // Set hasCheckedPlate ke true agar pesan hasil verifikasi muncul
        this.hasCheckedPlate = true;
        
        // Set verifikasiSelesai ke true
        this.verifikasiSelesai = true;
        
        // Tampilkan toast sesuai hasil pencarian
        if (this.vehicleFound) {
          this.showToast(`Kendaraan dengan plat ${this.formData.plate_number.toUpperCase()} ditemukan!`, 'success');
          
          // Jika kendaraan ditemukan, otomatis ke step berikutnya setelah delay
          setTimeout(() => {
            this.$emit('next-step');
          }, 1500);
        } else if (this.hasPlateNumber) {
          this.showToast(`Kendaraan dengan plat ${this.formData.plate_number.toUpperCase()} belum terdaftar. Silakan lengkapi data kendaraan.`, 'warning');
        }
      }
    }
  },
  
  methods: {
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
    
    validateNewVehicleForm() {
      let isValid = true;
      
      // Reset errors
      this.formErrors.customer_name = '';
      this.formErrors.customer_phone = '';
      this.formErrors.brand_id = '';
      this.formErrors.brand_type_id = '';
      
      // Validate required fields
      if (!this.formData.customer_name) {
        this.formErrors.customer_name = 'Nama lengkap wajib diisi';
        isValid = false;
      }
      
      if (!this.formData.customer_phone) {
        this.formErrors.customer_phone = 'Nomor telepon wajib diisi';
        isValid = false;
      } else if (!/^[0-9]{10,13}$/.test(this.formData.customer_phone.replace(/\s+/g, ''))) {
        this.formErrors.customer_phone = 'Format nomor telepon tidak valid';
        isValid = false;
      }
      
      if (!this.formData.brand_id) {
        this.formErrors.brand_id = 'Merek mobil wajib dipilih';
        isValid = false;
      }
      
      if (!this.formData.brand_type_id) {
        this.formErrors.brand_type_id = 'Tipe mobil wajib dipilih';
        isValid = false;
      }
      
      return isValid;
    },

    async handleVerifyVehicle() {
      // Validate plate number
      if (!this.formData.plate_number.trim()) {
        this.plateError = 'Nomor plat kendaraan wajib diisi';
        this.showToast('Silakan masukkan nomor plat kendaraan', 'error');
        return;
      }
      
      // Check plate format
      const platePattern = /^[A-Z0-9]{1,10}$/i;
      
      if (!platePattern.test(this.formData.plate_number.replace(/\s+/g, ''))) {
        this.plateError = 'Format nomor plat tidak valid';
        this.showToast('Format nomor plat tidak valid', 'error');
        return;
      }
      
      // Clear any previous error
      this.plateError = '';
      
      // PENTING: Reset state
      this.isCheckingVehicle = true;
      this.hasCheckedPlate = false;  
      this.verifikasiSelesai = false;
      
      // Aktifkan loading di parent component
      this.$emit('update:loading', true);
      
      // Emit the verification event ke parent
      this.$emit('verify-vehicle');
    },
    
    handleNextStep() {
      // If we haven't checked the plate yet, do it first
      if (!this.hasCheckedPlate) {
        this.handleVerifyVehicle();
        return;
      }
      
      // If vehicle is found, we can proceed directly
      if (this.vehicleFound) {
        this.$emit('next-step');
        return;
      }
      
      // For new vehicle, validate all required fields
      if (this.validateNewVehicleForm()) {
        this.$emit('next-step');
        this.showToast('Data kendaraan berhasil disimpan', 'success');
      } else {
        // Show error message
        this.showToast('Mohon lengkapi semua field yang wajib diisi', 'error');
      }
    }
  },
  
  beforeUnmount() {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    if (this.progressInterval) clearInterval(this.progressInterval);
  }
}

</script>

<style scoped>
/* Animation for fade in elements */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
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

/* Focus styles for form elements */
input:focus, select:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

/* Smooth transitions */
button, input, select {
  transition: all 0.2s ease-in-out;
}
</style>