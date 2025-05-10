<template>
  <!-- ServiceSummary hardcoded dibawah bagian paket -->
  <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-3 mb-4">
    <!-- Original price -->
    <div class="flex justify-between items-center py-1">
      <span class="text-gray-600">Harga Normal:</span>
      <span class="text-gray-500 line-through">Rp {{ formatCurrency(getOriginalListPrice) }}</span>
    </div>
    
    <!-- Regular Discount -->
    <div class="flex justify-between items-center py-1">
      <span class="text-green-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        Diskon Promo:
      </span>
      <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getRegularDiscountAmount) }}</span>
    </div>
    
    <!-- Booking Online Discount -->
    <div class="flex justify-between items-center py-1 border-b border-gray-200 pb-2">
      <span class="text-green-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Diskon Booking Online (10%):
      </span>
      <span class="text-green-600 font-medium">-Rp {{ formatCurrency(getBookingDiscountAmount) }}</span>
    </div>
    
    <!-- Total -->
    <div class="flex justify-between items-center py-2 mt-1">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="text-gray-800 font-medium">Total Biaya:</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-base font-bold text-red-600">Rp {{ formatCurrency(getTotalPrice) }}</span>
        <span class="text-xs text-green-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Hemat {{ getTotalDiscountPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceSummary',
  props: {
    originalPrice: {
      type: Number,
      required: true
    },
    regularDiscountAmount: {
      type: Number,
      required: true
    },
    bookingDiscountAmount: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    discountPercentage: {
      type: Number,
      required: true
    }
  },
  setup() {
    // Format currency
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };

    return {
      formatCurrency
    };
  }
};
</script>