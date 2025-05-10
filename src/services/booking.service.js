// src/services/booking.service.js
import axios from 'axios';

export default class BookingService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: '/web', // Akan diarahkan ke https://sokasistem.pitcar.co.id/web melalui proxy
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
  }

  /**
   * Get all available service packages
   * @returns {Promise<Array>} List of service packages
   */
  async getServicePackages() {
    try {
      const response = await this.apiClient.post('/v1/booking/get-templates', {
        jsonrpc: '2.0',
        method: 'call'
      });

      if (response.data.result && response.data.result.status === 'success') {
        // Process packages to ensure consistent structure
        const packagesData = response.data.result.data || [];
        return packagesData.map(pack => ({
          ...pack,
          // Ensure services and products are always arrays
          services: Array.isArray(pack.services) ? pack.services : [],
          products: Array.isArray(pack.products) ? pack.products : []
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching service packages:', error);
      throw new Error('Failed to fetch service packages');
    }
  }

  /**
   * Get service template details
   * @param {number} templateId - The template ID
   * @returns {Promise<Object>} Template details
   */
  async getTemplateDetails(templateId) {
    try {
      const response = await this.apiClient.post('/v1/booking/get-template-details', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          template_id: templateId
        }
      });

      if (response.data.result && response.data.result.status === 'success') {
        return response.data.result.data;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching template details:', error);
      throw new Error('Failed to fetch template details');
    }
  }

  /**
   * Get services by category
   * @param {string} serviceCategory - Service category
   * @returns {Promise<Array>} List of services
   */
  async getServices(serviceCategory) {
    try {
      const response = await this.apiClient.post('/v1/booking/get-services', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service_category: serviceCategory
        }
      });

      if (response.data.result && response.data.result.status === 'success') {
        // Handle different API response structures
        if (Array.isArray(response.data.result.data)) {
          return response.data.result.data;
        } else if (response.data.result.data && Array.isArray(response.data.result.data.individual_services)) {
          return response.data.result.data.individual_services;
        }
        
        return [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  /**
   * Check availability of stalls
   * @param {Object} params - Parameters for checking availability
   * @param {string} params.date - Date in YYYY-MM-DD format
   * @param {number} params.time - Time as float (e.g., 8.5 for 8:30)
   * @param {number} params.duration - Service duration in hours
   * @returns {Promise<Object>} Availability result
   */
  async checkAvailability(params) {
    try {
      const response = await this.apiClient.post('/v1/booking/check-availability', {
        jsonrpc: '2.0',
        method: 'call',
        params: params
      });

      if (response.data.result) {
        return response.data.result;
      }
      
      return { status: 'error', message: 'Failed to check availability' };
    } catch (error) {
      console.error('Error checking availability:', error);
      throw new Error('Failed to check availability');
    }
  }

  /**
   * Get all stalls
   * @returns {Promise<Array>} List of stalls
   */
  async getStalls() {
    try {
      const response = await this.apiClient.post('/v1/booking/get-stalls', {
        jsonrpc: '2.0',
        method: 'call'
      });

      if (response.data.result && response.data.result.status === 'success') {
        return response.data.result.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching stalls:', error);
      throw new Error('Failed to fetch stalls');
    }
  }

  /**
   * Create a booking
   * @param {Object} bookingData - Booking data
   * @returns {Promise<Object>} Booking result
   */
  async createBooking(bookingData) {
    try {
      const response = await this.apiClient.post('/v1/booking/create', {
        jsonrpc: '2.0',
        method: 'call',
        params: bookingData
      });

      if (response.data.result) {
        return response.data.result;
      }
      
      return { status: 'error', message: 'Failed to create booking' };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }
}