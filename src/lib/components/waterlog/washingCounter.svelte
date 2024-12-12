<script>
    import { washingStore } from '$lib/stores/washingStore.js';
    import LaundryAnimation from '$lib/components/waterlog/laundryAnimation.svelte';
  
    // Subscribe to washingStore
    const { subscribe, incrementWash, decrementWash } = washingStore;
  </script>
  
  <div class="space-y-8 mb-8">
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center space-x-6 text-2xl font-bold text-gray-800">
        <button 
          on:click={decrementWash} 
          class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
          disabled={$washingStore.washCount === 0}
        >
          &#8592; <!-- Left arrow -->
        </button>
        <div class="text-3xl">{$washingStore.washCount}</div>
        <button 
          on:click={incrementWash} 
          class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
        >
          &#8594; <!-- Right arrow -->
        </button>
      </div>
    </div>
  </div>
  
  <style>
    /* Add any specific styles if needed */
  </style>
  