<template>
  <div class="flex justify-between items-start p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
    <div class="flex items-start">
      <div>
        <span class="text-sm text-gray-700">{{ serviceName }}</span>
        <div class="flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs text-gray-500">{{ formattedDuration }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end">
      <span class="text-xs text-gray-500 line-through">Rp {{ formatCurrency(originalPrice) }}</span>
      <span class="text-sm font-medium text-gray-900">Rp {{ formatCurrency(discountedPrice) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceItem',
  props: {
    serviceName: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    },
    originalPrice: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedDuration() {
      if (typeof this.duration !== 'number' || isNaN(this.duration)) return '0 menit';
      
      const hours = Math.floor(this.duration);
      const minutes = Math.round((this.duration - hours) * 60);
      
      if (hours === 0) {
        return `${minutes} menit`;
      } else if (minutes === 0) {
        return `${hours} jam`;
      } else {
        return `${hours} jam ${minutes} menit`;
      }
    }
  },
  methods: {
    // Format currency
    formatCurrency(value) {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    }
  }
};
</script>