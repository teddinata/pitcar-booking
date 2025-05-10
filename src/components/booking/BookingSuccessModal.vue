<template>
  <div class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="$emit('close')"></div>
      
      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Booking Berhasil!
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Booking servis Anda telah berhasil dibuat. Silakan datang sesuai jadwal yang telah ditentukan.
              </p>
            </div>
            
            <!-- Kode Booking Unik - Highlighted with copy option -->
            <div class="mt-4">
              <div class="rounded-md bg-yellow-50 p-4 border border-yellow-100">
                <div class="flex flex-col items-center">
                  <dt class="text-xs font-semibold text-yellow-800">KODE BOOKING</dt>
                  <dd class="text-3xl font-bold text-yellow-900 mt-1 tracking-wider">{{ bookingResult?.unique_code || 'N/A' }}</dd>
                  <button 
                    @click="copyBookingCode" 
                    class="mt-2 inline-flex items-center px-2 py-1 text-xs rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Salin Kode
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Referensi Booking - Secondary info -->
            <div class="mt-2">
              <div class="flex flex-col items-center">
                <dt class="text-xs text-gray-500">REFERENSI BOOKING</dt>
                <dd class="text-sm font-medium text-gray-700">{{ bookingResult?.booking_reference || 'N/A' }}</dd>
              </div>
            </div>
            
            <div class="mt-4">
              <div class="rounded-md bg-gray-50 p-4">
                <div class="flex flex-col gap-3">
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div class="mb-2 sm:mb-0">
                      <dt class="text-xs text-gray-500">Status</dt>
                      <dd class="text-sm font-medium">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          Terkonfirmasi
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Total</dt>
                      <dd class="text-sm font-medium text-gray-900">
                        Rp {{ formatCurrency(bookingResult?.total_amount) }}
                      </dd>
                    </div>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div class="mb-2 sm:mb-0">
                      <dt class="text-xs text-gray-500">Tanggal</dt>
                      <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.booking_date || 'N/A' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Waktu</dt>
                      <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.booking_time || 'N/A' }}</dd>
                    </div>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div class="mb-2 sm:mb-0">
                      <dt class="text-xs text-gray-500">Kendaraan</dt>
                      <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.car_info || 'N/A' }}</dd>
                    </div>
                    <div>
                      <dt class="text-xs text-gray-500">Plat Nomor</dt>
                      <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.plate_number || 'N/A' }}</dd>
                    </div>
                  </div>
                  
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <dt class="text-xs text-gray-500">Stall</dt>
                      <dd class="text-sm font-medium text-gray-900">{{ bookingResult?.stall || 'N/A' }}</dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 bg-blue-50 rounded-md p-3 border border-blue-100">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-blue-700 text-left">
                    <strong>Simpan kode booking Anda!</strong> Kode 6 digit ini akan diperlukan untuk check-in saat kedatangan. Informasi booking juga telah dikirim ke email dan nomor WA Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 space-y-3">
          <button
            @click="$emit('close')"
            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Kembali ke Beranda
          </button>
          
          <button
            @click="printBookingTicket"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Bukti Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingSuccessModal',
  props: {
    bookingResult: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  setup() {
    /**
     * Format currency to Indonesian Rupiah format
     */
    const formatCurrency = (value) => {
      if (typeof value !== 'number') return '0';
      return value.toLocaleString('id-ID');
    };

    /**
     * Copy booking code to clipboard
     */
    const copyBookingCode = (evt) => {
      const bookingCode = evt.target.closest('button').previousElementSibling.textContent;
      navigator.clipboard.writeText(bookingCode)
        .then(() => {
          // Optional: Show a tooltip or notification that copying was successful
          const button = evt.target.closest('button');
          const originalText = button.textContent;
          button.textContent = 'Tersalin!';
          setTimeout(() => {
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Salin Kode';
          }, 2000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    };

    /**
     * Print booking ticket
     */
    const printBookingTicket = () => {
      // Implement ticket printing logic here
      console.log('Print booking ticket');
    };

    return {
      formatCurrency,
      copyBookingCode,
      printBookingTicket
    };
  }
};
</script>

<style scoped>
.sm\:max-w-md {
  max-width: 28rem;
}
</style>