<script>
  import { onMount } from 'svelte';

  let outfits = [];
  let outfit = {
    Head: null,
    Shirt: null,
    Pants: null,
    Shoes: null,
    Accessory: null
  };
  let selectedSlot = null;
  let showModal = false;
  let error = null;
  let loading = true;

  async function fetchOutfits() {
    try {
      loading = true;
      error = null;
      const response = await fetch('http://localhost:3011/api/outfits');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched outfits:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      outfits = data;
    } catch (err) {
      console.error('Error fetching outfits:', err);
      error = 'Failed to fetch outfits. Please try again later.';
      outfits = [];
    } finally {
      loading = false;
    }
  }

  function openModal(slot) {
    selectedSlot = slot;
    showModal = true;
  }

  function equipItem(item) {
    outfit[selectedSlot] = item;
    showModal = false;
  }

  function removeItem(slot) {
    outfit[slot] = null;
  }

  onMount(fetchOutfits);
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <header class="bg-green-100 py-6 mb-8">
    <h1 class="text-3xl font-bold text-center text-green-800">Outfit Customization</h1>
  </header>

  {#if loading}
    <div class="text-center text-gray-600">Loading outfits...</div>
  {/if}

  {#if error}
    <div class="text-center text-red-600 mb-4">{error}</div>
    <div class="text-center">
      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        on:click={fetchOutfits}
      >
        Try Again
      </button>
    </div>
  {/if}

  {#if !loading && !error}
    <!-- Rest of your component code stays the same -->
    <!-- Mascot Display -->
    <div class="mascot mb-8">
      <p class="text-center text-gray-600 pt-4 font-semibold">BEAVER MASCOT</p>
      
      {#if outfit.Head}
        <img 
          src={outfit.Head.image} 
          alt={outfit.Head.name}
          class="avatar-item head"
          on:error={(e) => console.error('Error loading head image:', e)}
        />
      {/if}

      {#if outfit.Shirt}
        <img 
          src={outfit.Shirt.image} 
          alt={outfit.Shirt.name}
          class="avatar-item shirt"
          on:error={(e) => console.error('Error loading shirt image:', e)}
        />
      {/if}

      <!-- Equipment Controls -->
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <ul class="divide-y divide-gray-200">
          {#each Object.keys(outfit) as slot}
            <li class="p-4 flex justify-between items-center">
              <span class="font-medium text-gray-700 capitalize">{slot}</span>
              <div class="space-x-2">
                {#if outfit[slot]}
                  <button
                    class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    on:click={() => removeItem(slot)}
                  >
                    Remove
                  </button>
                {/if}
                <button
                  class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  on:click={() => openModal(slot)}
                >
                  {outfit[slot] ? 'Change' : 'Equip'}
                </button>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  <!-- Modal -->
  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Select {selectedSlot}</h2>
        
        {#if outfits.filter(item => item.type === selectedSlot).length > 0}
          <ul class="space-y-2">
            {#each outfits.filter(item => item.type === selectedSlot) as item}
              <li class="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                <div class="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    class="w-12 h-12 object-cover rounded mr-4"
                  />
                  <span>{item.name} - {item.price} points</span>
                </div>
                <button
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  on:click={() => equipItem(item)}
                >
                  Select
                </button>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-500 text-center">No items available for this slot.</p>
        {/if}

        <button
          class="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          on:click={() => (showModal = false)}
        >
          Close
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .mascot {
    width: 300px;
    height: 400px;
    background-color: #f0f0f0;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .avatar-item {
    position: absolute;
    transition: all 0.3s ease;
  }

  .head {
    top: 20px;
    left: 100px;
    width: 100px;
    height: 100px;
  }

  .shirt {
    top: 130px;
    left: 75px;
    width: 150px;
    height: 150px;
  }
</style>