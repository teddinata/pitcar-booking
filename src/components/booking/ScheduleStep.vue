<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <div class="px-4 py-5 sm:p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-6">Jadwal & Pilih Stall</h2>
      
      <div class="space-y-8">
        <!-- Date Selection -->
        <div>
          <label for="booking-date" class="block text-sm font-medium text-gray-700">
            Tanggal Booking <span class="text-red-600">*</span>
          </label>
          <div class="mt-1">
            <input
              id="booking-date"
              :value="formattedSelectedDate"
              type="date"
              :min="minDate"
              class="focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
              @input="$emit('update:selected-date', new Date($event.target.value))"
            />
          </div>
          <div class="mt-1 flex items-center">
            <p v-if="selectedDate" class="text-sm text-gray-500">
              <span class="font-medium">{{ formattedSelectedDateDisplay }}</span>
              <span v-if="isDateToday" class="ml-2 text-blue-600 font-medium">
                (Hari ini)
              </span>
              <span v-if="isTomorrow" class="ml-2 text-green-600 font-medium">
                (Besok)
              </span>
            </p>
          </div>
        </div>
        
        <!-- Time Selection - Simplified -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Waktu Booking <span class="text-red-600">*</span>
          </label>
          <p class="mt-1 text-xs text-gray-500">
            Pilih waktu mulai servis (jam operasional: 08:00 - 17:00)
          </p>
          
          <div class="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2">
            <button
              v-for="hour in availableHours" 
              :key="hour"
              @click="$emit('select-hour', hour)"
              :disabled="!isHourAvailable(hour)"
              :class="{
                'bg-red-600 text-white': selectedHour === hour,
                'bg-white hover:bg-red-50 border-gray-300 text-gray-700': selectedHour !== hour && isHourAvailable(hour),
                'bg-gray-100 text-gray-400 cursor-not-allowed': !isHourAvailable(hour)
              }"
              class="py-2 px-3 border rounded-md text-sm font-medium focus:outline-none"
            >
              {{ hour }}
            </button>
          </div>
          
          <!-- Error message -->
          <div v-if="timeSelectionError" class="mt-2 text-sm text-red-600">
            {{ timeSelectionError }}
          </div>
        </div>

        <!-- Service Duration Summary -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-sm font-medium text-gray-900">Informasi Durasi</h3>
          </div>
          
          <div class="flex justify-between">
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
          
          <!-- Warning if applicable -->
          <div v-if="isServiceTimeWarning" class="mt-3 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Waktu selesai melebihi jam operasional. Servis mungkin dilanjutkan keesokan harinya.
          </div>
        </div>
        
        <!-- Stall Selection - Simplified -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Pilih Stall <span class="text-red-600">*</span>
          </label>

          <div v-if="selectedHour">
            <!-- Loading indicator -->
            <div v-if="loading" class="text-center py-8">
              <svg class="animate-spin h-8 w-8 text-red-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="mt-2 text-sm text-gray-500">Memeriksa ketersediaan stall...</p>
            </div>
            
            <!-- Stall Grid -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div 
                v-for="stall in allStalls" 
                :key="stall.id" 
                @click="isStallAvailable(stall) ? $emit('select-stall', stall) : null"
                class="border rounded-lg overflow-hidden transition-all duration-200"
                :class="{
                  'cursor-pointer hover:shadow-md transform hover:-translate-y-1 border-gray-300': isStallAvailable(stall),
                  'cursor-not-allowed opacity-60 border-gray-200': !isStallAvailable(stall),
                  'ring-2 ring-red-500 shadow-lg': selectedStall && selectedStall.id === stall.id
                }"
              >
                <!-- Stall Header -->
                <div class="px-3 py-2 bg-gray-100 flex justify-between items-center border-b">
                  <h3 class="text-sm font-medium">{{ stall.name }}</h3>
                  <span 
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800': isStallAvailable(stall),
                      'bg-red-100 text-red-800': !isStallAvailable(stall)
                    }"
                  >
                    {{ isStallAvailable(stall) ? 'Tersedia' : 'Terisi' }}
                  </span>
                </div>
                
                <!-- Stall Content -->
                <div class="p-3 bg-white">
                  <!-- Car visualization -->
                  <div class="h-16 flex items-center justify-center mb-2">
                    <svg v-if="!isStallAvailable(stall)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-12 w-12" :class="{'text-red-500': stall.id % 4 === 1, 'text-blue-500': stall.id % 4 === 0, 'text-yellow-500': stall.id % 4 === 2, 'text-green-500': stall.id % 4 === 3}">
                      <path fill="currentColor" d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
                    </svg>
                    <div v-else class="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Status info -->
                  <div v-if="isStallAvailable(stall)" class="text-center text-xs text-gray-600">
                    Tersedia untuk waktu {{ selectedHour }}
                  </div>
                  <div v-else class="text-center text-xs text-gray-600">
                    Sudah terisi
                  </div>
                  
                  <!-- Selection button -->
                  <div class="mt-2">
                    <button
                      v-if="isStallAvailable(stall)"
                      class="w-full py-1 rounded-md text-xs font-medium"
                      :class="selectedStall && selectedStall.id === stall.id 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'"
                    >
                      {{ selectedStall && selectedStall.id === stall.id ? 'Terpilih' : 'Pilih Stall' }}
                    </button>
                    <div v-else class="w-full py-1 text-center text-xs text-red-500">
                      Tidak Tersedia
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty state for no stalls -->
            <div v-if="!loading && (!allStalls || allStalls.length === 0)" class="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="mt-2 text-sm text-gray-500">Tidak ada stall tersedia untuk waktu ini</p>
              <p class="text-xs text-gray-500">Silakan pilih waktu lain</p>
            </div>
          </div>
          
          <!-- No hour selected message -->
          <div v-else class="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        @click="$emit('prev-step')"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>
      <button
        @click="$emit('next-step')"
        :disabled="!selectedStall || loading"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        Lanjut
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';

export default {
  name: 'ScheduleStep',
  props: {
    selectedDate: {
      type: Date,
      required: true
    },
    selectedHour: {
      type: String,
      default: ''
    },
    selectedStall: {
      type: Object,
      default: null
    },
    customerForm: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    totalServiceDuration: {
      type: Number,
      default: 0
    },
    minDate: {
      type: String,
      required: true
    },
    isDateToday: {
      type: Boolean,
      default: false
    },
    isTomorrow: {
      type: Boolean,
      default: false
    },
    availableHours: {
      type: Array,
      default: () => []
    },
    timeSelectionError: {
      type: String,
      default: ''
    },
    isServiceTimeWarning: {
      type: Boolean,
      default: false
    },
    allStalls: {
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
    services: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'update:selected-date',
    'update:selected-hour',
    'update:selected-stall',
    'validate-selected-date',
    'select-hour',
    'select-stall',
    'prev-step',
    'next-step'
  ],
  setup(props) {
    // Format the date for the date input
    // Format the date for the date input
    const formattedSelectedDate = computed(() => {
      if (!(props.selectedDate instanceof Date) || isNaN(props.selectedDate.getTime())) {
        return '';
      }
      
      return formatDate(props.selectedDate);
    });

    // Format the date for display
    const formattedSelectedDateDisplay = computed(() => {
      if (!(props.selectedDate instanceof Date) || isNaN(props.selectedDate.getTime())) {
        return '';
      }
      
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      return props.selectedDate.toLocaleDateString('id-ID', options);
    });

    // Format date helper
    const formatDate = (date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };

    const minDate = computed(() => {
      const today = new Date();
      return formatDate(today);
    });
    
    /**
     * Format date for display
     */
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
    
    /**
     * Check if hour is available
     */
    const isHourAvailable = (hour) => {
      if (!hour) return false;
      
      // If today is selected, hours already passed are not available
      if (props.isDateToday) {
        const now = new Date();
        const [hourNum, minuteNum] = hour.split(':').map(Number);
        const hourDate = new Date(now);
        hourDate.setHours(hourNum, minuteNum, 0, 0);
        
        return hourDate > now;
      }
      
      // Operating hours check (08:00 - 17:00)
      const [hours, minutes] = hour.split(':').map(Number);
      const timeFloat = hours + (minutes / 60);
      
      return timeFloat >= 8 && timeFloat <= 17;
    };
    
    /**
     * Check if stall is available
     */
    const isStallAvailable = (stall) => {
      if (!props.selectedHour || !stall) return false;
      
      // Convert selected hour to float
      const [hours, minutes] = props.selectedHour.split(':').map(Number);
      const selectedTimeFloat = hours + (minutes / 60);
      
      // Calculate end time
      const endTimeFloat = selectedTimeFloat + props.totalServiceDuration;
      
      // Check if stall is available (not booked during the selected time)
      return !stall.booked_slots || !stall.booked_slots.some(slot => {
        return (
          (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
          (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
          (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
        );
      });
    };
    
    /**
     * Format duration
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
     * Calculate end time
     */
    const calculateEndTime = (hour, duration) => {
      if (!hour) return '';
      
      const [hours, minutes] = hour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes + duration * 60;
      
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = Math.round(totalMinutes % 60);
      
      return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    };

    // Di dalam setup di ScheduleStep.vue
    watch(() => props.selectedDate, (newDate) => {
      console.log('ScheduleStep: selectedDate changed to:', newDate);
      console.log('Formatted date:', formatDate(newDate));
      console.log('Is date today?', props.isDateToday);
    });
    
    return {
      formattedSelectedDate,
      formattedSelectedDateDisplay,
      minDate,
      isHourAvailable,
      isStallAvailable,
      formatDuration,
      calculateEndTime
    };
  }
};
</script>

<style scoped>
/* Simple hover & transition effects */
.transform {
  transition: all 0.2s ease;
}
.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}
</style>