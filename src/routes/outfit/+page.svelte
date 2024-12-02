<script lang="ts">
  import { onMount } from 'svelte';
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";

  const showBack = true;

  type Item = {
    id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    image: string;
  };

  type Outfit = {
    [key: string]: Item | null;
  };

  let inventory: Item[] = [];
  let outfit: Outfit = {
    Head: null,
    Shirt: null,
    Pants: null,
    Shoes: null,
    Accessory: null,
  };

  let selectedSlot: string = '';
  let showModal = false;
  let loading = true;
  let error: string | null = null;

  async function fetchInventory() {
    try {
      const response = await fetch('http://localhost:3011/api/outfits');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      inventory = await response.json();
      loading = false;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load inventory';
      loading = false;
    }
  }

  function equipItem(slot: string, item: Item) {
    outfit[slot] = { ...item };
    showModal = false;
  }

  function openModal(slot: string) {
    selectedSlot = slot;
    showModal = true;
  }

  // Helper function to convert SVG code to data URL
  function svgToDataURL(svgString: string): string {
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);
  }

  onMount(fetchInventory);
</script>

<PageContainer>
  <Header title="Outfit" {showBack} backRoute="/inventory"/>

  {#if loading}
    <div class="flex justify-center items-center mt-8">
      <p class="text-gray-600">Loading inventory...</p>
    </div>
  {:else if error}
    <div class="flex justify-center items-center mt-8">
      <p class="text-red-500">{error}</p>
      <button 
        class="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        on:click={fetchInventory}
      >
        Retry
      </button>
    </div>
  {:else}
    <section class="flex flex-col items-center mt-4">
      <div class="mascot">
        <p class="text-center text-gray-600 pt-16">BEAVER</p>
      </div>
    </section>

    <section class="w-full max-w-md mt-8 mx-auto">
      <ul>
        {#each Object.entries(outfit) as [slot, item]}
          <li class="flex justify-between items-center border-b py-4 px-4">
            <div class="flex items-center gap-4">
              <span class="font-semibold capitalize">{slot}</span>
              {#if item?.image}
                <img 
                  src={svgToDataURL(item.image)}
                  alt={item.name}
                  class="w-12 h-12 object-contain"
                />
              {/if}
            </div>
            <button
              class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              on:click={() => openModal(slot)}
            >
              {item ? `Change (${item.name})` : "Equip"}
            </button>
          </li>
        {/each}
      </ul>
    </section>

    {#if showModal && selectedSlot}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-lg font-bold mb-4">Select an Item for {selectedSlot}</h2>
          <ul>
            {#each inventory.filter((item) => item.type === selectedSlot) as item}
              <li class="border-b py-2 cursor-pointer hover:bg-gray-100">
                <button
                  type="button"
                  class="w-full text-left flex items-center gap-4 px-2"
                  on:click={() => equipItem(selectedSlot, item)}
                >
                  <img 
                    src={svgToDataURL(item.image)}
                    alt={item.name}
                    class="w-12 h-12 object-contain"
                  />
                  <div>
                    <p class="font-medium">{item.name}</p>
                    <p class="text-sm text-gray-600">{item.description}</p>
                  </div>
                </button>
              </li>
            {/each}
          </ul>
          <button
            class="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            on:click={() => (showModal = false)}
          >
            Cancel
          </button>
        </div>
      </div>
    {/if}
  {/if}
</PageContainer>

<style>
  .mascot {
    width: 150px;
    height: 200px;
    background-color: lightgray;
    border-radius: 50%;
    margin: 0 10;
    position: relative;
  }
</style>
