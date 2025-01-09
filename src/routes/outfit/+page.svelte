<script lang="ts">
  import { onMount } from 'svelte';
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";
 
  const showBack = true;

  // Types
  type User = {
    id: number;
    name: string;
    email: string;
    completedQuestionnaire: boolean;
  };
 
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

  type Balance = {
    id: number;
    amount: number;
  };
 
  // State variables
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
  let userBalance: number = 0;
  let purchaseError: string | null = null;
  let currentUser: User | null = null;


  async function fetchCurrentUser() {
  try {
    console.log('Fetching current user...');
    
    // Check localStorage
    const userId = localStorage.getItem('userId');
    console.log('UserId from localStorage:', userId);

    if (!userId) {
      console.log('No userId in localStorage');
      // Instead of redirecting, let's set an error state
      error = 'Please log in first';
      return;
    }

    // Log the full URL being fetched
    const url = `http://localhost:3012/current-user?userId=${userId}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      // Don't fall back to user 2, instead handle the error
      error = 'Failed to fetch user data';
      return;
    }

    const userData = await response.json();
    console.log('Received user data:', userData);
    currentUser = userData.user;
    await fetchBalance();
    
  } catch (err) {
    console.error('Error in fetchCurrentUser:', err);
    error = 'An error occurred while fetching user data';
  }
}

  async function fetchBalance() {
    if (!currentUser?.id) {
      console.log('No current user id');
      return;
    }

    try {
      console.log('Fetching balance for user ID:', currentUser.id, typeof currentUser.id);
      const response = await fetch(`http://localhost:3020/bank/balance/${currentUser.id}`);
      console.log('Balance response:', response.status);
      
      if (!response.ok) {
        console.error('Failed to fetch balance:', response.status);
        return;
      }
      
      const data = await response.json();
      console.log('Raw balance data received:', data);
      
      if (typeof data.amount === 'number') {
        userBalance = data.amount;
        console.log('Set user balance to:', userBalance);
      } else {
        console.error('Invalid balance data:', data);
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  }
 
  async function fetchInventory() {
    try {
      loading = true;
      error = null;
      const response = await fetch('http://localhost:3013/outfits');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      inventory = await response.json();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to load inventory';
    } finally {
      loading = false;
    }
  }

  async function purchaseAndEquipItem(slot: string, item: Item) {
    if (!currentUser?.id) {
      purchaseError = 'Unable to make purchase. Please try again later.';
      return;
    }

    purchaseError = null;
    
    if (userBalance < item.price) {
      purchaseError = `Not enough coins! You need ${item.price} coins.`;
      return;
    }

    try {
      const response = await fetch(`http://localhost:3013/outfits/purchase/${item.id}/${currentUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        purchaseError = errorData.error || 'Purchase failed';
        return;
      }

      const result = await response.json();
      userBalance = result.transaction.balanceAfter;
      equipItem(slot, item);
      
    } catch (error) {
      purchaseError = 'Failed to complete purchase';
      console.error('Purchase failed:', error);
    }
  }
 
  function equipItem(slot: string, item: Item) {
    outfit[slot] = { ...item };
    showModal = false;
  }
 
  function openModal(slot: string) {
    selectedSlot = slot;
    showModal = true;
    purchaseError = null;
  }
 
  function svgToDataURL(svgString: string): string {
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);
  }
 
  onMount(async () => {
    await Promise.all([fetchCurrentUser(), fetchInventory()]);
  });
</script>
 
<PageContainer>
  <Header title="Outfit" {showBack} backRoute="/inventory"/>

  <!-- Debug info -->
  <div class="fixed top-4 left-4 bg-gray-100 p-2 rounded text-xs">
    User ID: {currentUser?.id ?? 'none'}<br>
    Balance: {userBalance}
  </div>

  <!-- Balance Display -->
  <div class="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-40">
    <span class="font-bold">🌿 {userBalance}</span>
    <span class="text-xs block">(ID: {currentUser?.id})</span>
  </div>
 
  {#if loading}
    <div class="flex justify-center items-center h-[calc(100vh-100px)]">
      <p class="text-gray-600">Loading inventory...</p>
    </div>
  {:else if error}
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="flex flex-col items-center justify-center max-w-md w-full mx-4">
          <div class="relative mb-8">
            <svg class="w-24 h-24 animate-bounce" viewBox="0 0 100 100">
              <path 
                fill="#EF4444"
                d="M50 0 C50 0 20 50 20 70 C20 85.75 33.25 100 50 100 C66.75 100 80 85.75 80 70 C80 50 50 0 50 0 Z"
              >
                <animate 
                  attributeName="fill" 
                  values="#EF4444;#3B82F6;#EF4444" 
                  dur="2s" 
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-200 rounded-full animate-pulse"/>
          </div>
 
          <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">
            We're sorry, but our servers appear to be offline!
          </h1>
          
          <p class="text-lg text-gray-600 text-center mb-6">
            Please check back in a little while.
          </p>
 
          <button 
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
            on:click={fetchInventory}
          >
            Try Again
          </button>
      </div>
    </div>
  {:else}
  <section class="flex flex-col items-center mt-4">
    <!-- The main beaver container with Tailwind classes -->
    <div class="relative w-72 h-80"> 
      <!-- Base Beaver Image -->
      <img
        src="/beaver.svg" alt="Beaver"
        class="absolute w-full h-full top-0 left-0 object-cover"
      />
  
      <!-- HEAD item (if we have a Head slot) -->
      {#if outfit.Head}
        <img
          src={svgToDataURL(outfit.Head.image)}
          alt="Head"
          class="absolute top-0 left-14 w-20 h-auto z-10"
        />
      {/if}
  
      <!-- SHIRT item -->
      {#if outfit.Shirt}
        <img
          src={svgToDataURL(outfit.Shirt.image)}
          alt="Shirt"
          class="absolute top-20 left-8 w-28 h-auto z-10"
        />
      {/if}
  
      <!-- PANTS item -->
      {#if outfit.Pants}
        <img
          src={svgToDataURL(outfit.Pants.image)}
          alt="Pants"
          class="absolute top-40 left-10 w-24 h-auto z-10"
        />
      {/if}
  
      <!-- SHOES item -->
      {#if outfit.Shoes}
        <img
          src={svgToDataURL(outfit.Shoes.image)}
          alt="Shoes"
          class="absolute bottom-0 left-12 w-20 h-auto z-10"
        />
      {/if}
  
      <!-- ACCESSORY item -->
      {#if outfit.Accessory}
        <img
          src={svgToDataURL(outfit.Accessory.image)}
          alt="Accessory"
          class="absolute top-14 right-6 w-16 h-auto z-10"
        />
      {/if}
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
          
          {#if purchaseError}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {purchaseError}
            </div>
          {/if}

          <ul>
            {#each inventory.filter((item) => item.type === selectedSlot) as item}
              <li class="border-b py-2 cursor-pointer hover:bg-gray-100">
                <button
                  type="button"
                  class="w-full text-left flex items-center gap-4 px-2"
                  on:click={() => purchaseAndEquipItem(selectedSlot, item)}
                  disabled={userBalance < item.price}
                >
                  <img 
                    src={svgToDataURL(item.image)}
                    alt={item.name}
                    class="w-12 h-12 object-contain"
                  />
                  <div>
                    <p class="font-medium">{item.name}</p>
                    <p class="text-sm text-gray-600">{item.description}</p>
                    <p class="text-sm {userBalance >= item.price ? 'text-green-600' : 'text-red-600'}">
                      🌿 {item.price}
                    </p>
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
  /* The .mascot class becomes a container for the base beaver plus any outfit items */
  .mascot {
    position: relative;
    width: 300px;   /* Adjust width to your desired size */
    height: 350px;  /* Adjust height to match your base beaver image */
    margin: 0 auto; /* Center horizontally */
    /* background-color, border-radius removed to avoid covering the beaver */
  }

  /* Example of a base beaver image inside the container */
  .beaver-base {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; 
    z-index: 1; 
  }

  /* Example for an item, e.g., Head */
  .item-head {
    position: absolute;
    top: 10px;   /* Adjust to position on the beaver’s head */
    left: 50px;  /* Adjust horizontally */
    width: 80px; /* Adjust size of the item */
    height: auto;
    z-index: 2;  /* Above the base beaver */
  }

  /* Additional item classes (e.g. item-shirt, item-pants, etc.) can go here */
</style>
