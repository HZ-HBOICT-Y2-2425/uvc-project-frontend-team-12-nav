<script>
    import { toiletStore } from '$lib/stores/toiletStore.js';
  
    // Subscribe to toiletStore
    const { subscribe, incrementFlush, decrementFlush } = toiletStore;
  </script>
  
  <div class="flush-counter space-y-8 mb-8">
    <!-- Flush Counter UI -->
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center space-x-6 text-2xl font-bold text-gray-800">
        <button 
          on:click={decrementFlush} 
          class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
          disabled={$toiletStore.flushCount === 0}
        >
          &#8592; <!-- Left arrow -->
        </button>
        <div class="text-3xl">{$toiletStore.flushCount}</div>
        <button 
          on:click={incrementFlush} 
          class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
          disabled={$toiletStore.showFlushAnimation}
        >
          &#8594; <!-- Right arrow -->
        </button>
      </div>
    </div>
  </div>
  
  <style>
    .flush-counter {
      /* Add specific styles if needed */
    }
  </style>
  