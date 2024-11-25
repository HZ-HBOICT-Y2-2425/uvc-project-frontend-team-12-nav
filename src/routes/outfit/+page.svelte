<script>
      let data = {
        outfit: [
          { name: "NatureFree beanie", type: "Head" },
          { name: "Nike eco sweater", type: "Shirt" },
          { name: "Uniqlo denim pants", type: "Pants" },
          { name: "Loro Piana loafers", type: "Shoes" },
          { name: "Dior handbag", type: "Accessory" },
        ],
      };
  </script>
  
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-green-100 w-full text-center pb-8 mb-2">
      <h1 class="text-3xl font-bold mt-6">Clothing</h1>
    </div>
  
    <div class="flex-grow w-full">
      <!-- Header Text -->
      <div class="text-left ml-4 mb-4">
        <p class="text-gray-500">
          Combine your outfit for the best deals and glamour.
        </p>
        <h5 class="text-2xl font-semibold">Your outfit:</h5>
      </div>
  
      <!-- Outfit List -->
      <ul class="w-full">
        {#each data.outfit as item}
          <li
            class="flex justify-between items-center border-b last:border-0 py-4 px-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div>
              <h2 class="font-semibold">{item.name}</h2>
              <p class="text-sm text-gray-500">{item.type}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  