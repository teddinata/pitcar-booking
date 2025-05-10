// src/composables/useToast.js
import { ref } from 'vue';

/**
 * Composable for managing toast notifications
 * @returns {Object} Toast state and methods
 */
export function useToast() {
  const toast = ref({
    show: false,
    message: '',
    type: 'success', // success, error, warning, info
    duration: 3000
  });

  /**
   * Show a toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type (success, error, warning, info)
   * @param {number} duration - Duration in milliseconds
   */
  const showToast = (message, type = 'success', duration = 3000) => {
    // Clear any existing timeout
    if (toast.value.timeout) {
      clearTimeout(toast.value.timeout);
    }
    
    // Update toast
    toast.value = {
      show: true,
      message,
      type,
      duration,
      timeout: null
    };
    
    // Auto-hide after duration
    toast.value.timeout = setTimeout(() => {
      toast.value.show = false;
    }, duration);
  };

  /**
   * Hide the toast notification
   */
  const hideToast = () => {
    if (toast.value.timeout) {
      clearTimeout(toast.value.timeout);
    }
    toast.value.show = false;
  };

  return {
    toast,
    showToast,
    hideToast
  };
}