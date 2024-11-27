<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";

  // Initial inventory and outfit data
  let inventory = [
    { id: 1, name: "NatureFree beanie", type: "Head" },
    { id: 2, name: "Nike eco sweater", type: "Shirt" },
    { id: 3, name: "Uniqlo denim pants", type: "Pants" },
    { id: 4, name: "Loro Piana loafers", type: "Shoes" },
    { id: 5, name: "Dior handbag", type: "Accessory" },
  ];

  let outfit = {
    Head: null,
    Shirt: null,
    Pants: null,
    Shoes: null,
    Accessory: null,
  };

  let selectedSlot: string | null = null; // Track which slot is being edited
  let showModal = false; // Track modal visibility

  // Equip an item to a slot
  function equipItem(slot: string, item: { id: number; name: string; type: string }) {
    outfit[slot] = item; // Update the outfit
    showModal = false; // Close modal
  }

  // Open the modal for a specific slot
  function openModal(slot: string) {
    selectedSlot = slot;
    showModal = true;
  }
</script>

<PageContainer>
  <!-- Header -->
  <Header title="Outfit" showBack={true} backRoute="/inventory"/>

  <!-- Beaver Placeholder -->
  <section class="flex flex-col items-center mt-4">
    <div class="mascot">
      <!-- Placeholder for Beaver image -->
      <p class="text-center text-gray-600 pt-16">BEAVER</p>
    </div>
  </section>

  <!-- Equip Slots as a List -->
  <section class="w-full max-w-md mt-8 mx-auto">
    <ul>
      {#each Object.keys(outfit) as slot}
        <li class="flex justify-between items-center border-b py-4 px-4">
          <span class="font-semibold capitalize">{slot}</span>
          <button
            class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            on:click={() => openModal(slot)}
          >
            {outfit[slot] ? `Change (${outfit[slot].name})` : "Equip"}
          </button>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Modal for Selecting Items -->
  {#if showModal}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-4">Select an Item for {selectedSlot}</h2>
        <ul>
          {#each inventory.filter((item) => item.type === selectedSlot) as item}
            <li class="border-b py-2 cursor-pointer hover:bg-gray-100">
              <button
                type="button"
                class="w-full text-left"
                on:click={() => equipItem(selectedSlot, item)}
              >
                {item.name}
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

  /* Global modal styles */
  .modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
