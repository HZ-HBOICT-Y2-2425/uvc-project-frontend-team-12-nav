<script>
    import { washingStore } from '$lib/stores/washingStore.js';
  
    // Define washing machine brands locally
    const washingMachineBrands = [
      "Whirlpool",
      "Samsung",
      "LG",
      "Bosch",
      "GE Appliances",
      "Maytag",
      "Electrolux",
      "Siemens",
      "Haier",
      "Miele"
    ];
  
    let selectedBrand = $washingStore.selectedBrand;
  
    // Handle brand selection
    const handleChange = (event) => {
      washingStore.changeBrand(event.target.value);
      console.log('Selected brand:', event.target.value);
    };
  </script>
  
  <div class="w-full flex flex-col items-center">
    <label for="brands" class="text-xl font-bold text-gray-700 mb-2">Washing Machine Brands:</label>
    <div class="relative w-full">
      <select
        id="brands"
        bind:value={selectedBrand}
        on:change={handleChange}
        class="block appearance-none w-full bg-white border border-blue-400 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      >
        <option value="" disabled>Select a brand</option>
        {#each washingMachineBrands as brand}
          <option value={brand}>{brand}</option>
        {/each}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.939l3.424-3.392a.75.75 0 111.06 1.06l-4.242 4.22a.75.75 0 01-1.06 0L5.516 8.608a.75.75 0 010-1.06z" />
        </svg>
      </div>
    </div>
  </div>
  
  <style>
    select:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  
    option {
      background-color: #f0f8ff; /* AliceBlue */
      color: #000;
    }
  
    option:hover {
      background-color: skyblue; /* LightCyan */
    }
  </style>
  