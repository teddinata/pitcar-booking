// src/composables/useDateHelpers.js

/**
 * Composable for date and time formatting helpers
 * @returns {Object} Date helper methods
 */
export function useDateHelpers() {
  /**
   * Format date to YYYY-MM-DD
   * @param {Date} date - Date object
   * @returns {string} Formatted date
   */
  const formatDate = (date) => {
    if (!(date instanceof Date)) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  /**
   * Format date in Indonesian locale
   * @param {Date} date - Date object
   * @returns {string} Formatted date for display
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
   * Format duration in hours and minutes
   * @param {number} duration - Duration in hours (float)
   * @returns {string} Formatted duration
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
   * Format time float to HH:MM string
   * @param {number} timeFloat - Time as float (e.g., 8.5 for 8:30)
   * @returns {string} Formatted time
   */
  const formatTime = (timeFloat) => {
    if (typeof timeFloat !== 'number' || isNaN(timeFloat)) return '';
    
    const hours = Math.floor(timeFloat);
    const minutes = Math.round((timeFloat - hours) * 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  /**
   * Calculate end time based on start time and duration
   * @param {string} startTime - Start time as HH:MM
   * @param {number} durationHours - Duration in hours (float)
   * @returns {string} End time as HH:MM
   */
  const calculateEndTime = (startTime, durationHours) => {
    if (!startTime || typeof durationHours !== 'number') return '';
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationHours * 60;
    
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  };

  return {
    formatDate,
    formatDisplayDate,
    formatDuration,
    formatTime,
    calculateEndTime
  };
}