<template>
  <div class="bg-gray-50 min-h-screen pb-12">
    <!-- Toast notification -->
    <app-toast
      v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />

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
    <booking-progress-steps :current-step="currentStep" />

    <!-- Main content area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Step 1: Vehicle Information -->
      <vehicle-info-step 
        v-if="currentStep === 1" 
        v-model:form="customerForm"
        v-model:loading="loading"
        :vehicle-found="vehicleFound"
        :brands="brands"
        :brand-types="brandTypes"
        :transmissions="transmissions"
        @verify-vehicle="verifyVehicle"
        @next-step="nextStep"
      />


      <!-- Step 2: Service Selection -->
      <service-selection-step
        v-if="currentStep === 2"
        v-model:form="customerForm"
        :loading="loading"
        :service-packages="servicePackages"
        :services="services"
        :selected-service-category="selectedServiceCategory"
        :total-service-duration="totalServiceDuration"
        :show-mobile-summary="showMobileSummary"
        @select-service-category="selectServiceCategory"
        @select-package="selectPackage"
        @toggle-service="toggleServiceSelection"
        @toggle-package-details="togglePackageDetails"
        @search-services="searchServices"
        @prev-step="prevStep"
        @next-step="nextStep"
      />

      <!-- Step 3: Schedule and Stall Selection -->
      <!-- Ganti schedule-step yang lama dengan versi baru -->
      <schedule-step
        v-if="currentStep === 3"
        :selected-date="selectedDate"
        @update:selected-date="selectedDate = $event"
        :selected-hour="selectedHour"
        @update:selected-hour="selectedHour = $event"
        :selected-stall="selectedStall"
        @update:selected-stall="selectedStall = $event"
        :customer-form="customerForm"
        :loading="loading"
        :total-service-duration="totalServiceDuration"
        :min-date="minDate"
        :is-date-today="isDateToday"
        :is-tomorrow="isTomorrow"
        :available-hours="availableHours"
        :time-selection-error="timeSelectionError"
        :is-service-time-warning="isServiceTimeWarning"
        :all-stalls="allStalls"
        :brands="brands"
        :brand-types="brandTypes"
        :transmissions="transmissions"
        :services="services"
        @validate-selected-date="validateSelectedDate"
        @select-hour="selectHour"
        @select-stall="selectStall"
        @confirm-stall-selection="confirmStallSelection"
        @prev-step="prevStep"
        @next-step="nextStep"
      />

      <!-- Step 4: Confirmation -->
      <confirmation-step
        v-if="currentStep === 4"
        :customer-form="customerForm"
        :selected-date="selectedDate"
        :selected-hour="selectedHour"
        :selected-stall="selectedStall"
        :total-service-duration="totalServiceDuration"
        :services="services"
        :loading="loading"
        @prev-step="prevStep"
        @create-booking="createBooking"
      />
      
      <!-- Success Modal -->
      <booking-success-modal
        v-if="showSuccessModal"
        :booking-result="bookingResult"
        @close="resetForm"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, defineComponent, onMounted, nextTick } from 'vue';
import BookingService from '@/services/booking.service';
import VehicleService from '@/services/vehicle.service';
import { useToast } from '@/composables/useToast';
import { useDateHelpers } from '@/composables/useDateHelpers';
import { useAuthStore } from '@/stores/auth';
import AppToast from '@/components/common/AppToast.vue';
import BookingProgressSteps from '@/components/booking/BookingProgressSteps.vue';
import VehicleInfoStep from '@/components/booking/VehicleInfoStep.vue';
import ServiceSelectionStep from '@/components/booking/ServiceSelectionStep.vue';
import ScheduleStep from '@/components/booking/ScheduleStep.vue';
import ConfirmationStep from '@/components/booking/ConfirmationStep.vue';
import BookingSuccessModal from '@/components/booking/BookingSuccessModal.vue';
import EnhancedStallSelection from '@/components/booking/schedule/EnhancedStallSelection.vue';
import { useAvailabilityCheck } from '@/composables/useAvailabilityCheck';

export default defineComponent({
  name: 'ServiceBooking',
  components: {
    AppToast,
    BookingProgressSteps,
    VehicleInfoStep,
    ServiceSelectionStep,
    ScheduleStep,        // Diganti dengan komponen yang sudah ditingkatkan
    ConfirmationStep,
    BookingSuccessModal,
    EnhancedStallSelection // Tambahkan komponen ini
  },
  setup() {
    const authStore = useAuthStore(); // Add this line
    // Services injection
    const bookingService = new BookingService();
    const vehicleService = new VehicleService();
    
    // Composables
    const { toast, showToast } = useToast();
    const { formatDate, formatDisplayDate, formatDuration, formatTime } = useDateHelpers();

    // State Management - Core Booking Data
    const currentStep = ref(1);
    const loading = ref(false);
    const vehicleFound = ref(false);
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
      template_id: null,
      notes: ''
    });

    // Reference Data
    const vehicleInfoRef = ref(null);
    const brands = ref([]);
    const brandTypes = ref([]);
    const transmissions = ref([]);
    const services = ref([]);
    const servicePackages = ref([]);

    
    // Service Selection
    const selectedServiceCategory = ref(null);
    const openPackageDetails = ref(null);
    const serviceSearchQuery = ref('');
    const searchResults = ref([]);
    const showMobileSummary = ref(true);
    
    // Scheduling
    const selectedDate = ref(new Date());
    const selectedHour = ref('');
    const selectedStall = ref(null);
    const allStalls = ref([]);
    const timeSelectionError = ref('');
    const isServiceTimeWarning = ref(false);
    const availableHours = ref([
      '08:00', '09:00', '10:00', '11:00', '12:00', 
      '13:00', '14:00', '15:00', '16:00'
    ]);
    
    // Success/Confirmation
    const showSuccessModal = ref(false);
    const bookingResult = ref(null);
    
    // Computed Properties for Service Selection
    const totalServiceDuration = computed(() => {
      let duration = 0;
      
      // If a package is selected, use its duration
      if (customerForm.value.template_id) {
        const packageItem = servicePackages.value.find(p => p && p.id === customerForm.value.template_id);
        if (packageItem && packageItem.duration) {
          return packageItem.duration;
        }
      }
      
      // Otherwise calculate from individual services
      return customerForm.value.service_ids.reduce((total, serviceId) => {
        const service = services.value.find(s => s && s.id === serviceId);
        return total + (service && service.duration ? service.duration : 0);
      }, 0);
    });
    
    // Category to keywords mapping
    const categoryKeywords = {
      'berkala': ['berkala', 'service berkala', 'servis berkala'],
      'tuneup': ['tune up', 'tune-up', 'tuneup'],
      'ac': ['ac', 'air conditioner', 'pendingin', 'freon'],
      'repair': ['perbaikan', 'ganti', 'repair', 'penggantian']
    };
    
    // Filter packages by selected category
    const getCategoryPackages = computed(() => {
      if (!selectedServiceCategory.value || !servicePackages.value) {
        return [];
      }
      
      return servicePackages.value.filter(pack => {
        if (!pack || !pack.name) return false;
        
        const packName = pack.name.toLowerCase();
        return categoryKeywords[selectedServiceCategory.value].some(keyword => 
          packName.includes(keyword)
        );
      });
    });
    
    // Filter services by selected category
    const getCategoryServices = computed(() => {
      if (!selectedServiceCategory.value || !services.value) {
        return [];
      }
      
      return services.value.filter(service => {
        if (!service || !service.name || service.duration <= 0) return false;
        
        const serviceName = service.name.toLowerCase();
        return categoryKeywords[selectedServiceCategory.value].some(keyword => 
          serviceName.includes(keyword)
        );
      });
    });
    
    // Services that are not included in the selected package
    const getVisibleServiceIds = computed(() => {
      if (!customerForm.value.service_ids || !Array.isArray(customerForm.value.service_ids)) {
        return [];
      }
      
      // If no package selected, show all services
      if (!customerForm.value.template_id) {
        return customerForm.value.service_ids;
      }
      
      const packageItem = servicePackages.value.find(p => p && p.id === customerForm.value.template_id);
      if (!packageItem) {
        return customerForm.value.service_ids;
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
      return customerForm.value.service_ids.filter(id => !packageItemIds.includes(id));
    });
    
    // Determine if there are any services selected
    const hasServices = computed(() => {
      return (customerForm.value.service_ids && customerForm.value.service_ids.length > 0) || 
             customerForm.value.template_id !== null;
    });
    
    // Computed properties for pricing
    const getTotalPrice = computed(() => {
      let total = 0;
      
      // Package price if selected
      if (customerForm.value.template_id) {
        const packageItem = servicePackages.value.find(p => p && p.id === customerForm.value.template_id);
        if (packageItem && packageItem.price) {
          total += packageItem.price;
        }
      }
      
      // Add individual service prices
      for (const serviceId of getVisibleServiceIds.value) {
        const service = services.value.find(s => s && s.id === serviceId);
        if (service && service.price) {
          total += service.price;
        }
      }
      
      return total;
    });
    
    const getTotalOriginalPrice = computed(() => {
      let total = 0;
      
      // Original package price if selected
      if (customerForm.value.template_id) {
        const packageItem = servicePackages.value.find(p => p && p.id === customerForm.value.template_id);
        if (packageItem && packageItem.price) {
          total += Math.ceil(packageItem.price * 1.1 / 1000) * 1000;
        }
      }
      
      // Add original individual service prices
      for (const serviceId of getVisibleServiceIds.value) {
        const service = services.value.find(s => s && s.id === serviceId);
        if (service && service.price) {
          total += Math.ceil(service.price * 1.1 / 1000) * 1000;
        }
      }
      
      return total;
    });
    
    const getDiscountAmount = computed(() => {
      return getTotalOriginalPrice.value - getTotalPrice.value;
    });
    
    const getTotalDiscountPercentage = computed(() => {
      const originalPrice = getTotalOriginalPrice.value;
      if (originalPrice <= 0) return 0;
      return Math.round((1 - getTotalPrice.value / originalPrice) * 100);
    });
    
    // Scheduling computed properties
    const formattedSelectedDate = computed(() => {
      return formatDate(selectedDate.value);
    });
    
    const formattedSelectedDateDisplay = computed(() => {
      return formatDisplayDate(selectedDate.value);
    });

    const minDate = computed(() => {
      const today = new Date();
      return formatDate(today);
    });

    
    const minDateH1 = computed(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return formatDate(tomorrow);
    });
    
    const maxDate = computed(() => {
      const date = new Date();
      date.setDate(date.getDate() + 30); // 30 days from now
      return formatDate(date);
    });
    
    const isDateToday = computed(() => {
      const today = new Date();
      return (
        selectedDate.value.getDate() === today.getDate() &&
        selectedDate.value.getMonth() === today.getMonth() &&
        selectedDate.value.getFullYear() === today.getFullYear()
      );
    });

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

    
    
    // Core functionality methods - organized by feature
    const login = async () => {
      try {
        const loginData = {
          database: 'Pitcar1',
          email: 'cs@pitcar.co.id',
          password: 'pitcar123$%^'
        }
        
        console.log('Attempting auto-login with:', {
          database: loginData.database,
          email: loginData.email
        })

        await authStore.login(
          loginData.database,
          loginData.email,
          loginData.password
        )
        
        console.log('Auto-login successful')
        return true
        
      } catch (err) {
        console.error('Auto-login error:', err)
        return false
      }
    }
    // Vehicle Information Methods
    const verifyVehicle = async () => {
      if (!customerForm.value.plate_number.trim()) {
        return;
      }

      try {
        loading.value = true;
        
        // // Login terlebih dahulu dengan penanganan error yang lebih baik
        // const loginData = {
        //   database: 'Pitcar1',
        //   email: 'cs@pitcar.co.id',
        //   password: 'pitcar123$%^'
        // };
        
        // let loginSuccess = false;
        
        // try {
        //   await authStore.login(
        //     loginData.database,
        //     loginData.email,
        //     loginData.password
        //   );
        //   console.log('Auto-login successful');
        //   loginSuccess = true;
        // } catch (loginErr) {
        //   console.error('Auto-login error:', loginErr);
        //   // Gagal login tidak menghentikan verifikasi, tapi catat ke log
        // }
        
        // Berikan sedikit delay untuk memastikan UI loading tampil dengan baik
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Lakukan verifikasi kendaraan setelah proses login selesai
        const result = await vehicleService.verifyVehicle(customerForm.value.plate_number);
        
        if (result.status === 'found') {
          // Vehicle found, fill form with data
          const vehicleData = result.data;
          
          customerForm.value.customer_name = vehicleData.customer_name;
          customerForm.value.customer_id = vehicleData.customer_id;
          customerForm.value.brand_id = vehicleData.car_brand?.id || '';
          customerForm.value.brand_type_id = vehicleData.car_type?.id || '';
          customerForm.value.car_color = vehicleData.car_color || '';
          customerForm.value.car_year = vehicleData.car_year || '';
          customerForm.value.transmission_id = vehicleData.transmission?.id || '';
          customerForm.value.engine_type = vehicleData.engine_type || 'petrol';
          
          vehicleFound.value = true;
          
          // Load required data before moving to next step
          await Promise.all([
            fetchServices(),
            fetchServicePackages()
          ]);
          
        } else {
          // Vehicle not found, show form for new vehicle
          vehicleFound.value = false;
          
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
            template_id: null,
            notes: ''
          };
          
          // Load reference data for new vehicle form
          await Promise.all([
            fetchBrands(),
            fetchTransmissions()
          ]);
        }
      } catch (error) {
        console.error('Error verifying vehicle:', error);
        vehicleFound.value = false;
      } finally {
        // Berikan sedikit delay untuk UX yang lebih baik
        // sehingga loading message sempat terlihat
        setTimeout(() => {
          // Set loading ke false setelah semua proses selesai
          loading.value = false;
        }, 500);
      }
    };


    
    // Service Selection Methods
    const selectServiceCategory = (category) => {
      selectedServiceCategory.value = category;
      
      // Reset search when changing category
      serviceSearchQuery.value = '';
      searchResults.value = [];
    };
    
    const toggleServiceSelection = (serviceId) => {
      const index = customerForm.value.service_ids.indexOf(serviceId);
      if (index === -1) {
        customerForm.value.service_ids.push(serviceId);
      } else {
        customerForm.value.service_ids.splice(index, 1);
      }
    };
    
    const isServiceSelected = (serviceId) => {
      return customerForm.value.service_ids.includes(serviceId);
    };
    
    const searchServices = () => {
      if (!serviceSearchQuery.value || serviceSearchQuery.value.trim().length < 2) {
        searchResults.value = [];
        return;
      }
      
      const query = serviceSearchQuery.value.toLowerCase();
      
      // If no category selected, search globally
      if (!selectedServiceCategory.value) {
        searchResults.value = services.value.filter(service => {
          if (!service || service.duration <= 0) return false;
          return service.name.toLowerCase().includes(query);
        });
        return;
      }
      
      // If category is selected, search within that category
      searchResults.value = getCategoryServices.value.filter(service => 
        service.name.toLowerCase().includes(query)
      );
    };
    
    const togglePackageDetails = (packageId) => {
      openPackageDetails.value = openPackageDetails.value === packageId ? null : packageId;
    };
    
    const selectPackage = async (packageId) => {
      // Toggle off if selecting the same package
      if (!packageId || customerForm.value.template_id === packageId) {
        customerForm.value.template_id = null;
        return;
      }
      
      try {
        loading.value = true;
        
        const templateDetails = await bookingService.getTemplateDetails(packageId);
        
        if (templateDetails) {
          // Set template_id
          customerForm.value.template_id = packageId;
          
          // Get all product_ids from the template
          if (templateDetails.lines && Array.isArray(templateDetails.lines)) {
            const productIds = templateDetails.lines
              .filter(line => line && !line.display_type && line.product_id)
              .map(line => line.product_id);
            
            // Update service_ids
            customerForm.value.service_ids = productIds;
            
            // Store product info for display
            const productLines = templateDetails.lines.filter(line => 
              line && !line.display_type && line.product_id && line.product_type === 'product'
            );
            
            if (productLines.length > 0) {
              if (!window.templateProductsMap) {
                window.templateProductsMap = {};
              }
              
              productLines.forEach(line => {
                window.templateProductsMap[line.product_id] = {
                  id: line.product_id,
                  name: line.name,
                  price: line.price_unit,
                  type: 'product'
                };
              });
            }
          }
          
          const packageItem = servicePackages.value.find(p => p && p.id === packageId);
          if (packageItem) {
            showToast(`Paket ${packageItem.name} berhasil dipilih`, 'success');
          }
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
        showToast('Gagal memuat detail paket', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // Scheduling Methods
    const validateSelectedDate = (event) => {
      timeSelectionError.value = '';
      
      try {
        // Get the selected date from the input
        const inputDate = event.target.value;
        const selectedInputDate = new Date(inputDate);
        
        // Basic validation to make sure it's a valid date
        if (isNaN(selectedInputDate.getTime())) {
          throw new Error('Invalid date');
        }
        
        // Make sure the date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedInputDate < today) {
          showToast('Tidak dapat memilih tanggal yang sudah lewat', 'warning');
          // Reset to today
          selectedDate.value = new Date();
          return;
        }
        
        // Update the selectedDate
        selectedDate.value = selectedInputDate;
        
        // Reset selections that depend on date
        selectedHour.value = '';
        selectedStall.value = null;
        
        // Clear any existing stalls data
        allStalls.value = [];
        
      } catch (error) {
        console.error('Error validating date:', error);
        showToast('Format tanggal tidak valid', 'error');
      }
    };
    
    const isHourAvailable = (hour) => {
      if (!hour) return false;
      
      // If today is selected, hours already passed are not available
      if (isDateToday.value) {
        const now = new Date();
        const [hourNum, minuteNum] = hour.split(':').map(Number);
        const hourDate = new Date(now);
        hourDate.setHours(hourNum, minuteNum, 0, 0);
        
        return hourDate > now;
      }
      
      // Check operating hours (08:00 - 17:00)
      const [hours, minutes] = hour.split(':').map(Number);
      const timeFloat = hours + (minutes / 60);
      
      return timeFloat >= 8 && timeFloat <= 17;
    };
    
    const selectHour = (hour) => {
      timeSelectionError.value = '';
      
      if (!isHourAvailable(hour)) {
        timeSelectionError.value = 'Jam ini tidak tersedia untuk booking.';
        return;
      }
      
      // Check if service duration exceeds operating hours
      const [hours, minutes] = hour.split(':').map(Number);
      const timeFloat = hours + (minutes / 60);
      const endTimeFloat = timeFloat + totalServiceDuration.value;
      
      isServiceTimeWarning.value = endTimeFloat > 17;
      
      selectedHour.value = hour;
      selectedStall.value = null; // Reset stall selection
      
      // Check stall availability with simple timeout to avoid UI jank
      setTimeout(() => {
        checkAvailability();
      }, 100);
    };
    
    // const isStallAvailable = (stall) => {
    //   if (!selectedHour.value || !stall) return false;
      
    //   // Convert selected hour to float
    //   const [hours, minutes] = selectedHour.value.split(':').map(Number);
    //   const selectedTimeFloat = hours + (minutes / 60);
      
    //   // Calculate end time
    //   const endTimeFloat = selectedTimeFloat + totalServiceDuration.value;
      
    //   // Check if stall is available during selected time
    //   return !stall.booked_slots || !stall.booked_slots.some(slot => {
    //     return (
    //       (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
    //       (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
    //       (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
    //     );
    //   });
    // };
    
    const selectStall = (stall) => {
      // Check if stall is available for the selected time and duration
      const [hours, minutes] = selectedHour.value.split(':').map(Number);
      const selectedTimeFloat = hours + (minutes / 60);
      const endTimeFloat = selectedTimeFloat + totalServiceDuration.value;
      
      const isAvailable = !stall.booked_slots || !stall.booked_slots.some(slot => {
        return (
          (selectedTimeFloat >= slot.start_time && selectedTimeFloat < slot.end_time) ||
          (endTimeFloat > slot.start_time && endTimeFloat <= slot.end_time) ||
          (selectedTimeFloat <= slot.start_time && endTimeFloat >= slot.end_time)
        );
      });
      
      if (!isAvailable) {
        showToast(`Stall ${stall.name} tidak tersedia pada waktu yang dipilih`, 'warning');
        return;
      }
      
      // Set the selected stall
      selectedStall.value = stall;
      showToast(`Stall ${stall.name} berhasil dipilih`, 'success');
    };
    
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
        
        // Panggil API check-availability
        const result = await bookingService.checkAvailability({
          date: formattedSelectedDate.value,
          time: timeFloat,
          duration: totalServiceDuration.value
        });
        
        if (result.status === 'success') {
          // Store available stalls
          allStalls.value = result.available_stalls || [];
          
          // Reset selected stall if no longer available
          if (selectedStall.value) {
            const stillAvailable = allStalls.value.some(stall => 
              stall.id === selectedStall.value.id && 
              !stall.booked_slots.some(slot => {
                const slotStartTime = slot.start_time;
                const slotEndTime = slot.end_time;
                const serviceStartTime = timeFloat;
                const serviceEndTime = timeFloat + totalServiceDuration.value;
                
                return (
                  (serviceStartTime >= slotStartTime && serviceStartTime < slotEndTime) ||
                  (serviceEndTime > slotStartTime && serviceEndTime <= slotEndTime) ||
                  (serviceStartTime <= slotStartTime && serviceEndTime >= slotEndTime)
                );
              })
            );
            
            if (!stillAvailable) {
              selectedStall.value = null;
              showToast('Stall yang Anda pilih tidak lagi tersedia. Silakan pilih stall lain.', 'warning');
            }
          }
        } else if (result.status === 'error') {
          timeSelectionError.value = result.message || 'Gagal memeriksa ketersediaan';
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
        // Jika ada rekomendasi, tawarkan untuk menggunakannya
        if (recommendedStall.value) {
          showToast('Silakan pilih stall atau gunakan tombol "Gunakan Rekomendasi" di bawah pemilihan stall', 'warning');
        } else {
          showToast('Silakan pilih stall', 'error');
        }
        return false;
      }
      
      // Validasi sekali lagi untuk memastikan stall masih tersedia
      if (!isStallAvailable(selectedStall.value, selectedHour.value, totalServiceDuration.value)) {
        showToast(`Stall ${selectedStall.value.name} tidak lagi tersedia. Silakan pilih stall lain.`, 'error');
        selectedStall.value = null;
        return false;
      }
      
      // Warn about service extending beyond operating hours
      if (isServiceTimeWarning.value) {
        showToast('Perhatian: Durasi servis melebihi jam operasional. Servis mungkin dilanjutkan keesokan harinya.', 'warning');
      }
      
      return true;
    };
    
    // Booking Confirmation and Submission
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
          template_id: customerForm.value.template_id,
          notes: customerForm.value.notes,
          is_online_booking: true,
          online_discount: 10.0,  // Diskon 10% untuk booking online
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
        
        const result = await bookingService.createBooking(bookingData);
        
        if (result.status === 'success') {
          bookingResult.value = result.data;
          showSuccessModal.value = true;
        } else {
          showToast(result.message || 'Gagal membuat booking', 'error');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        showToast('Error terhubung ke layanan. Silakan coba lagi nanti.', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // API Data Fetching Methods
    const fetchBrands = async () => {
      try {
        loading.value = true;
        brands.value = await vehicleService.getBrands();
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
        brandTypes.value = await vehicleService.getBrandTypes(brandId);
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
        transmissions.value = await vehicleService.getTransmissions();
      } catch (error) {
        console.error('Error fetching transmissions:', error);
        showToast('Gagal memuat data transmisi', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    const fetchServices = async () => {
      try {
        loading.value = true;
        services.value = await bookingService.getServices(customerForm.value.service_category);
        return true;
      } catch (error) {
        console.error('Error fetching services:', error);
        showToast('Gagal memuat data layanan', 'error');
        services.value = [];
        return false;
      } finally {
        loading.value = false;
      }
    };
    
    const fetchServicePackages = async () => {
      try {
        loading.value = true;
        servicePackages.value = await bookingService.getServicePackages();
        return true;
      } catch (error) {
        console.error('Error fetching service packages:', error);
        showToast('Gagal memuat data paket layanan', 'error');
        servicePackages.value = [];
        return false;
      } finally {
        loading.value = false;
      }
    };
    
    // Navigation and Reset
    const nextStep = async () => {
      // Step-specific validations
      if (currentStep.value === 1 && !vehicleFound.value) {
        // Validate first step form for new vehicle
        if (!customerForm.value.customer_name || !customerForm.value.customer_phone ||
            !customerForm.value.brand_id || !customerForm.value.brand_type_id) {
          showToast('Harap isi semua kolom yang wajib diisi', 'error');
          return;
        }
      }
      
      if (currentStep.value === 1) {
        try {
          loading.value = true;
          // Ensure all required data is loaded
          await Promise.all([
            fetchServices(),
            fetchServicePackages(),
          ]);
          currentStep.value++;
        } catch (error) {
          console.error("Error loading data:", error);
          showToast('Gagal memuat data layanan. Silakan coba lagi.', 'error');
        } finally {
          loading.value = false;
        }
        return;
      }
      
      // Step 2 validation
      if (currentStep.value === 2) {
        if (customerForm.value.service_ids.length === 0 && !customerForm.value.template_id) {
          showToast('Harap pilih minimal satu layanan', 'error');
          return;
        }
        
        // Reset scheduling selections
        selectedHour.value = '';
        selectedStall.value = null;
      }
      
      // Step 3 validation
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
    
    const resetForm = () => {
      currentStep.value = 1;
      selectedDate.value = new Date();
      selectedHour.value = '';
      selectedStall.value = null;
      vehicleFound.value = false;
      showSuccessModal.value = false;
      bookingResult.value = null;
      selectedServiceCategory.value = null;
      
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
        template_id: null,
        notes: ''
      };
    };
    
    // Initialize stalls data
    const initAllStalls = async () => {
      try {
        const stalls = await bookingService.getStalls();
        allStalls.value = stalls.map(stall => ({
          ...stall,
          is_available: true,
          booked_slots: []
        }));
      } catch (error) {
        console.error('Error initializing all stalls:', error);
      }
    };
    
    // Helper methods for UI display
    const getItemName = (itemId) => {
      // Check in services array
      const service = services.value.find(s => s && s.id === itemId);
      if (service && service.name) {
        return service.name;
      }
      
      // Check in templateProductsMap
      if (window.templateProductsMap && window.templateProductsMap[itemId]) {
        return window.templateProductsMap[itemId].name;
      }
      
      // Check in package products
      for (const pack of servicePackages.value || []) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.name) {
            return product.name;
          }
        }
      }
      
      return `Item #${itemId}`;
    };
    
    const getItemPrice = (itemId) => {
      // Check in services array
      const service = services.value.find(s => s && s.id === itemId);
      if (service && service.price !== undefined) {
        return service.price;
      }
      
      // Check in templateProductsMap
      if (window.templateProductsMap && window.templateProductsMap[itemId] && 
          window.templateProductsMap[itemId].price !== undefined) {
        return window.templateProductsMap[itemId].price;
      }
      
      // Check in package products
      for (const pack of servicePackages.value || []) {
        if (pack && pack.products && Array.isArray(pack.products)) {
          const product = pack.products.find(p => p && p.id === itemId);
          if (product && product.price !== undefined) {
            return product.price;
          }
        }
      }
      
      return 0;
    };
    
    const getPackageName = (packageId) => {
      const packageItem = servicePackages.value.find(p => p && p.id === packageId);
      return packageItem ? packageItem.name : '';
    };
    
    const getPackageServicesCount = (packageId) => {
      const packageItem = servicePackages.value.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.services || !Array.isArray(packageItem.services)) {
        return 0;
      }
      return packageItem.services.length;
    };
    
    const getPackageProductsCount = (packageId) => {
      const packageItem = servicePackages.value.find(p => p && p.id === packageId);
      if (!packageItem || !packageItem.products || !Array.isArray(packageItem.products)) {
        return 0;
      }
      return packageItem.products.length;
    };

     // Tambahkan composable availability check
    const { 
      availableStalls: availabilityStalls,
      timeSelectionError: availabilityError,
      checkAvailability: checkStallAvailability,
      recommendedStall,
      isStallAvailable,
      hourlyOccupancyMap
    } = useAvailabilityCheck();

    watch(() => totalServiceDuration.value, (newDuration, oldDuration) => {
      // Hanya jika current step adalah schedule step (step 3) dan durasi berubah cukup signifikan
      if (currentStep.value === 3 && Math.abs(newDuration - oldDuration) > 0.1) {
        checkAvailability();
      }
    });

    // Watch untuk validasi stall ketika stall dipilih
    watch(() => selectedStall.value, (newStall) => {
      if (newStall && currentStep.value === 3) {
        // Verifikasi stall dengan backend untuk memastikan masih tersedia
        if (!isStallAvailable(newStall, selectedHour.value, totalServiceDuration.value)) {
          showToast(`Stall ${newStall.name} tidak tersedia pada waktu yang dipilih.`, 'warning');
          selectedStall.value = null;
        } else {
          showToast(`${newStall.name} dipilih.`, 'success');
        }
      }
    });

    // Tambahkan fungsi ini untuk memilih stall yang direkomendasikan secara otomatis
    const useRecommendedStall = () => {
      if (!recommendedStall.value) {
        showToast('Tidak ada rekomendasi stall tersedia saat ini.', 'warning');
        return;
      }
      
      selectedStall.value = recommendedStall.value;
      showToast(`Stall ${recommendedStall.value.name} dipilih berdasarkan rekomendasi sistem.`, 'success');
    };

    // Juga tambahkan fungsi ini untuk mencari alternatif jika tidak ada stall tersedia
    const findAlternativeTime = async () => {
      try {
        loading.value = true;
        
        const alternatives = await findAlternativeTimeSlots(
          formattedSelectedDate.value,
          selectedHour.value,
          totalServiceDuration.value,
          3 // Max 3 alternatif
        );
        
        if (alternatives.length > 0) {
          // Format alternatives for display
          const altText = alternatives.map(alt => 
            `${alt.hour} (Stall ${alt.stall.name})`
          ).join(', ');
          
          showToast(`Waktu alternatif tersedia: ${altText}`, 'info');
          
          // Optional: Auto-select first alternative
          // selectedHour.value = alternatives[0].hour;
          // selectedStall.value = alternatives[0].stall;
        } else {
          showToast('Tidak ada waktu alternatif yang tersedia hari ini. Silakan coba tanggal lain.', 'warning');
        }
      } catch (error) {
        console.error('Error finding alternatives:', error);
        showToast('Gagal mencari waktu alternatif.', 'error');
      } finally {
        loading.value = false;
      }
    };

    // Di dalam setup() function pada ServiceBooking.vue
    const confirmStallSelection = () => {
      if (!selectedStall.value) {
        showToast('Silakan pilih stall terlebih dahulu', 'error');
        return;
      }
      
      showToast(`Stall ${selectedStall.value.name} dipilih.`, 'success');
    };
    
    // Watch handlers
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
    
    watch(() => customerForm.value.brand_id, (newVal) => {
      fetchBrandTypes(newVal);
      customerForm.value.brand_type_id = '';
    });
    
    watch(() => customerForm.value.service_category, () => {
      fetchServices();
    });
    
    watch(() => currentStep.value, (newStep, oldStep) => {
      if (newStep !== 2 && oldStep === 2) {
        // Reset category selection when leaving step 2
        selectedServiceCategory.value = null;
      }
    });
    
    watch(() => isServiceTimeWarning.value, (newValue) => {
      if (newValue) {
        showToast('Perhatian: Durasi servis melebihi jam operasional. Servis mungkin dilanjutkan keesokan harinya.', 'warning');
      }
    });
    
    // Lifecycle hooks
    onMounted(async () => {
      await login();
      await initAllStalls();
      await fetchServices();
      await fetchServicePackages();
    });
    
    // Return all data and methods needed by the template
    return {
      // State
      currentStep,
      loading,
      customerForm,
      selectedDate,
      formattedSelectedDate,
      formattedSelectedDateDisplay,
      selectedHour,
      selectedStall,
      vehicleFound,
      toast,
      showSuccessModal,
      bookingResult,
      selectedServiceCategory,
      openPackageDetails,
      serviceSearchQuery,
      searchResults,
      brands,
      brandTypes,
      transmissions,
      services,
      servicePackages,
      timeSelectionError,
      allStalls,
      availableHours,
      isServiceTimeWarning,
      showMobileSummary,
       // Tambahkan properti baru
      minDate,
      recommendedStall,
      hourlyOccupancyMap,
      confirmStallSelection,
      
      // Computed
      totalServiceDuration,
      getCategoryPackages,
      getCategoryServices,
      getVisibleServiceIds,
      hasServices,
      minDateH1,
      maxDate,
      isDateToday,
      isTomorrow,
      getTotalPrice,
      getTotalOriginalPrice,
      getDiscountAmount,
      getTotalDiscountPercentage,
      
      // Methods
      verifyVehicle,
      nextStep,
      prevStep,
      selectServiceCategory,
      toggleServiceSelection,
      isServiceSelected,
      searchServices,
      togglePackageDetails,
      selectPackage,
      validateSelectedDate,
      selectHour,
      isHourAvailable,
      selectStall,
      isStallAvailable,
      confirmStallSelection,
      createBooking,
      resetForm,
      formatDuration,
      formatTime,
      getItemName,
      getItemPrice,
      getPackageName,
      getPackageServicesCount,
      getPackageProductsCount,
       // Tambahkan fungsi baru
      useRecommendedStall,
      findAlternativeTime,
    };
  }
});
</script>

<style>
/* Animations for stall selection */
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

/* Hover animation for stall cards */
.stall-card {
  transition: all 0.3s ease;
}

.stall-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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