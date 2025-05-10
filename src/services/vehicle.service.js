// src/services/vehicle.service.js
import axios from 'axios';

export default class VehicleService {
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
   * Verify vehicle by plate number
   * @param {string} plateNumber - Vehicle plate number
   * @returns {Promise<Object>} Vehicle verification result
   */
  async verifyVehicle(plateNumber) {
    try {
      const response = await this.apiClient.post('/v1/booking/verify-vehicle', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          plate_number: plateNumber.toUpperCase().replace(/\s/g, '')
        }
      });

      if (response.data.result) {
        return response.data.result;
      }
      
      return { status: 'error', message: 'Failed to verify vehicle' };
    } catch (error) {
      console.error('Error verifying vehicle:', error);
      throw new Error('Failed to verify vehicle');
    }
  }

  /**
   * Get all car brands
   * @returns {Promise<Array>} List of car brands
   */
  async getBrands() {
    try {
      const response = await this.apiClient.post('/v1/booking/get-brands', {
        jsonrpc: '2.0',
        method: 'call'
      });

      if (response.data.result && response.data.result.status === 'success') {
        return response.data.result.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw new Error('Failed to fetch brands');
    }
  }

  /**
   * Get car brand types by brand ID
   * @param {number} brandId - Brand ID
   * @returns {Promise<Array>} List of brand types
   */
  async getBrandTypes(brandId) {
    try {
      const response = await this.apiClient.post('/v1/booking/get-brand-types', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          brand_id: brandId
        }
      });

      if (response.data.result && response.data.result.status === 'success') {
        return response.data.result.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching brand types:', error);
      throw new Error('Failed to fetch brand types');
    }
  }

  /**
   * Get all car transmissions
   * @returns {Promise<Array>} List of transmissions
   */
  async getTransmissions() {
    try {
      const response = await this.apiClient.post('/v1/booking/get-transmissions', {
        jsonrpc: '2.0',
        method: 'call'
      });

      if (response.data.result && response.data.result.status === 'success') {
        return response.data.result.data || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching transmissions:', error);
      throw new Error('Failed to fetch transmissions');
    }
  }
}