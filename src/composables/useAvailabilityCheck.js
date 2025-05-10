import { ref, computed, watch } from 'vue';
import BookingService from '@/services/booking.service';

/**
 * Composable for checking stall availability
 * Provides reactive integration with the backend check-availability API
 */
export function useAvailabilityCheck() {
  const bookingService = new BookingService();
  
  // State
  const loading = ref(false);
  const error = ref(null);
  const availableStalls = ref([]);
  const timeSelectionError = ref('');
  const lastCheckParams = ref(null);
  
  /**
   * Check availability with the backend
   * @param {Object} params - Parameters for checking availability
   * @param {string} params.date - Date in format YYYY-MM-DD
   * @param {number} params.time - Time as float (e.g. 14.5 for 14:30)
   * @param {number} params.duration - Service duration in hours
   */
  const checkAvailability = async (params) => {
    // Skip if same params as last check
    if (
      lastCheckParams.value && 
      lastCheckParams.value.date === params.date && 
      lastCheckParams.value.time === params.time && 
      lastCheckParams.value.duration === params.duration
    ) {
      return { availableStalls: availableStalls.value, timeSelectionError: timeSelectionError.value };
    }
    
    try {
      loading.value = true;
      error.value = null;
      timeSelectionError.value = '';
      
      // Convert hour string to float for API
      if (typeof params.time === 'string') {
        const [hours, minutes] = params.time.split(':').map(Number);
        params.time = hours + (minutes / 60);
      }
      
      // Store params for future reference
      lastCheckParams.value = { ...params };
      
      const result = await bookingService.checkAvailability(params);
      
      if (result.status === 'success') {
        // Process stall data
        availableStalls.value = processStallData(result.available_stalls);
        return { availableStalls: availableStalls.value, timeSelectionError: '' };
      } else if (result.status === 'error') {
        timeSelectionError.value = result.message || 'Gagal memeriksa ketersediaan';
        
        // Specific error handling for time range
        if (result.message && result.message.includes('between')) {
          timeSelectionError.value = 'Booking hanya tersedia antara jam 08:00 dan 17:00';
        }
        
        return { availableStalls: [], timeSelectionError: timeSelectionError.value };
      }
      
      return { availableStalls: [], timeSelectionError: '' };
    } catch (err) {
      error.value = err.message || 'Error terhubung ke layanan';
      timeSelectionError.value = 'Error terhubung ke layanan. Silakan coba lagi nanti.';
      return { availableStalls: [], timeSelectionError: timeSelectionError.value };
    } finally {
      loading.value = false;
    }
  };
  
  /**
   * Process stall data from the API to add additional information
   * @param {Array} stalls - Stalls data from API
   * @returns {Array} - Enhanced stalls data
   */
  const processStallData = (stalls) => {
    if (!stalls || !Array.isArray(stalls)) return [];
    
    return stalls.map(stall => {
      // Sort booked slots by time
      if (stall.booked_slots && Array.isArray(stall.booked_slots)) {
        stall.booked_slots.sort((a, b) => a.start_time - b.start_time);
      }
      
      // Add occupancy rate
      stall.occupancy_rate = calculateOccupancyRate(stall);
      
      // Add visual position data if not provided
      if (!stall.stall_position) {
        stall.stall_position = getStallPosition(stall);
      }
      
      return stall;
    });
  };
  
  /**
   * Calculate occupancy rate for a stall
   * @param {Object} stall - Stall data
   * @returns {number} - Occupancy rate as percentage
   */
  const calculateOccupancyRate = (stall) => {
    if (!stall.booked_slots || !Array.isArray(stall.booked_slots) || stall.booked_slots.length === 0) {
      return 0;
    }
    
    // Calculate total booked hours
    const totalBookedMinutes = stall.booked_slots.reduce((total, slot) => {
      return total + ((slot.end_time - slot.start_time) * 60);
    }, 0);
    
    // Assuming 9 working hours (8:00 - 17:00)
    const totalWorkingMinutes = 9 * 60;
    
    // Return as percentage
    return Math.min(100, Math.round((totalBookedMinutes / totalWorkingMinutes) * 100));
  };
  
  /**
   * Get stall position based on stall name or ID
   * @param {Object} stall - Stall data
   * @returns {string} - Position identifier
   */
  const getStallPosition = (stall) => {
    // Try to extract number from stall name (e.g. "Stall 1" -> "stall1")
    if (stall.name && stall.name.includes(' ')) {
      const stallNumber = stall.name.split(' ')[1];
      if (!isNaN(parseInt(stallNumber))) {
        return `stall${stallNumber}`;
      }
    }
    
    // Fallback to ID-based position
    return `stall${stall.id}`;
  };
  
  /**
   * Convert hour string (HH:MM) to float representation
   * @param {string} hourString - Hour in format HH:MM
   * @returns {number} - Float representation (e.g. 14.5 for 14:30)
   */
  const hourToFloat = (hourString) => {
    if (!hourString) return 0;
    
    const [hours, minutes] = hourString.split(':').map(Number);
    return hours + (minutes / 60);
  };
  
  /**
   * Format float hour to string
   * @param {number} hourFloat - Hour as float
   * @returns {string} - Hour in format HH:MM
   */
  const formatHour = (hourFloat) => {
    if (typeof hourFloat !== 'number') return '';
    
    const hours = Math.floor(hourFloat);
    const minutes = Math.round((hourFloat - hours) * 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  /**
   * Check if a stall is available at a specific time with a duration
   * @param {Object} stall - Stall data
   * @param {string} hourString - Start hour in format HH:MM
   * @param {number} duration - Service duration in hours
   * @returns {boolean} - Whether the stall is available
   */
  const isStallAvailable = (stall, hourString, duration) => {
    if (!stall || !hourString) return false;
    
    // Convert hour to float
    const startTime = hourToFloat(hourString);
    const endTime = startTime + duration;
    
    // Check if stall has any booked slots
    if (!stall.booked_slots || !Array.isArray(stall.booked_slots)) {
      return true;
    }
    
    // Check if any booked slot overlaps with the requested time
    return !stall.booked_slots.some(slot => {
      return (
        (startTime >= slot.start_time && startTime < slot.end_time) ||
        (endTime > slot.start_time && endTime <= slot.end_time) ||
        (startTime <= slot.start_time && endTime >= slot.end_time)
      );
    });
  };
  
  /**
   * Find the best available stall based on various criteria
   * @param {Array} stalls - All stalls
   * @param {string} hourString - Start hour in format HH:MM  
   * @param {number} duration - Service duration in hours
   * @returns {Object|null} - Best stall or null if none available
   */
  const findBestAvailableStall = (stalls, hourString, duration) => {
    if (!stalls || !Array.isArray(stalls) || stalls.length === 0) {
      return null;
    }
    
    // Filter available stalls
    const available = stalls.filter(stall => isStallAvailable(stall, hourString, duration));
    
    if (available.length === 0) {
      return null;
    }
    
    // Sort by occupancy rate (prefer less occupied stalls)
    return available.sort((a, b) => a.occupancy_rate - b.occupancy_rate)[0];
  };
  
  /**
   * Get all booked slots from all stalls
   * @param {Array} stalls - All stalls
   * @returns {Array} - Combined booked slots with stall info
   */
  const getAllBookedSlots = (stalls) => {
    if (!stalls || !Array.isArray(stalls)) {
      return [];
    }
    
    const allSlots = [];
    
    stalls.forEach(stall => {
      if (stall.booked_slots && Array.isArray(stall.booked_slots)) {
        stall.booked_slots.forEach(slot => {
          allSlots.push({
            ...slot,
            stall_id: stall.id,
            stall_name: stall.name
          });
        });
      }
    });
    
    // Sort by start time
    return allSlots.sort((a, b) => a.start_time - b.start_time);
  };
  
  /**
   * Get the next available time slot for a specific date
   * @param {string} date - Date in format YYYY-MM-DD
   * @param {number} duration - Service duration in hours
   * @returns {Promise<{hour: string, stall: Object}|null>} - Next available time and stall
   */
  const findNextAvailableSlot = async (date, duration) => {
    // Working hours 8:00 - 17:00
    const workingHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    
    for (const hour of workingHours) {
      const result = await checkAvailability({
        date,
        time: hour,
        duration
      });
      
      if (result.availableStalls.length > 0) {
        const bestStall = findBestAvailableStall(result.availableStalls, hour, duration);
        if (bestStall) {
          return {
            hour,
            stall: bestStall
          };
        }
      }
    }
    
    return null;
  };
  
  /**
   * Check if a specific date has any available slots
   * @param {string} date - Date in format YYYY-MM-DD
   * @param {number} duration - Service duration in hours
   * @returns {Promise<boolean>} - Whether date has any available slots
   */
  const hasAvailableSlots = async (date, duration) => {
    const nextSlot = await findNextAvailableSlot(date, duration);
    return nextSlot !== null;
  };
  
  /**
   * Find alternative time slots if the requested one is not available
   * @param {string} date - Date in format YYYY-MM-DD
   * @param {string} requestedHour - Requested hour in format HH:MM
   * @param {number} duration - Service duration in hours
   * @param {number} maxAlternatives - Maximum number of alternatives to return
   * @returns {Promise<Array>} - Alternative time slots
   */
  const findAlternativeTimeSlots = async (date, requestedHour, duration, maxAlternatives = 3) => {
    // Working hours 8:00 - 17:00
    const workingHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    
    // Convert requested hour to index
    const requestedIndex = workingHours.indexOf(requestedHour);
    if (requestedIndex === -1) return [];
    
    // Sort hours by proximity to the requested hour
    const sortedHours = [...workingHours].sort((a, b) => {
      const aIndex = workingHours.indexOf(a);
      const bIndex = workingHours.indexOf(b);
      
      return Math.abs(aIndex - requestedIndex) - Math.abs(bIndex - requestedIndex);
    });
    
    // Skip the first one (which is the requested hour)
    const alternatives = [];
    
    for (const hour of sortedHours.slice(1)) {
      if (alternatives.length >= maxAlternatives) break;
      
      const result = await checkAvailability({
        date,
        time: hour,
        duration
      });
      
      if (result.availableStalls.length > 0) {
        const bestStall = findBestAvailableStall(result.availableStalls, hour, duration);
        if (bestStall) {
          alternatives.push({
            hour,
            stall: bestStall
          });
        }
      }
    }
    
    return alternatives;
  };
  
  // Computed properties
  const availableStallsCount = computed(() => {
    if (!lastCheckParams.value || !lastCheckParams.value.time || !lastCheckParams.value.duration) {
      return 0;
    }
    
    return availableStalls.value.filter(stall => 
      isStallAvailable(stall, formatHour(lastCheckParams.value.time), lastCheckParams.value.duration)
    ).length;
  });
  
  const recommendedStall = computed(() => {
    if (!lastCheckParams.value || !lastCheckParams.value.time || !lastCheckParams.value.duration) {
      return null;
    }
    
    return findBestAvailableStall(
      availableStalls.value, 
      formatHour(lastCheckParams.value.time), 
      lastCheckParams.value.duration
    );
  });
  
  const allBookedSlots = computed(() => {
    return getAllBookedSlots(availableStalls.value);
  });
  
  const stallAvailabilityMap = computed(() => {
    const map = {};
    
    if (!lastCheckParams.value || !lastCheckParams.value.time || !lastCheckParams.value.duration) {
      return map;
    }
    
    const timeFloat = lastCheckParams.value.time;
    const duration = lastCheckParams.value.duration;
    
    availableStalls.value.forEach(stall => {
      map[stall.id] = isStallAvailable(stall, formatHour(timeFloat), duration);
    });
    
    return map;
  });
  
  /**
   * Calculate the occupancy status for each hour in working hours
   * @returns {Object} - Hour availability map
   */
  const hourlyOccupancyMap = computed(() => {
    const map = {};
    const workingHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    
    workingHours.forEach(hour => {
      const hourFloat = hourToFloat(hour);
      
      // Count stalls available at this hour
      const availableCount = availableStalls.value.filter(stall => 
        isStallAvailable(stall, hour, 1) // Check for 1 hour duration
      ).length;
      
      // Calculate occupancy percentage
      const totalStalls = availableStalls.value.length || 1; // Avoid division by zero
      const occupancyPercentage = Math.round(((totalStalls - availableCount) / totalStalls) * 100);
      
      map[hour] = {
        availableCount,
        totalStalls,
        occupancyPercentage,
        status: occupancyPercentage >= 80 ? 'high' : occupancyPercentage >= 50 ? 'medium' : 'low'
      };
    });
    
    return map;
  });
  
  return {
    // State
    loading,
    error,
    availableStalls,
    timeSelectionError,
    
    // Computed
    availableStallsCount,
    recommendedStall,
    allBookedSlots,
    stallAvailabilityMap,
    hourlyOccupancyMap,
    
    // Methods
    checkAvailability,
    isStallAvailable,
    hourToFloat,
    formatHour,
    findBestAvailableStall,
    findNextAvailableSlot,
    hasAvailableSlots,
    findAlternativeTimeSlots
  };
}
