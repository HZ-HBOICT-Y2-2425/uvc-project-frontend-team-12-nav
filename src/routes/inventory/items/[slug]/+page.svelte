<script>
  import { page } from "$app/stores";
  import { items } from "$lib/stores/items.ts";
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";
  import { get } from "svelte/store";

  let slug;
  let item;

  // Extract the slug dynamically from the page store
  $: slug = $page.params.slug;

  // Get items from the store and match the slug to find the correct item
  $: {
    const allItems = get(items);
    item = allItems.find((i) => i.name.toLowerCase().replace(/\s+/g, "-") === slug);
  }
</script>

<PageContainer>
  {#if item}
    <Header title={item.name} showBack={true} backRoute="/inventory" />
    <div class="min-h-screen w-full flex flex-col gap-6 px-4 mx-auto max-w-screen-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <!-- Item Information -->
      <div class="border border-gray-200 rounded-lg shadow-md bg-white p-6 w-full">
        <div class="flex justify-between items-start gap-4">
          <!-- Left Section: Item Type and Name -->
          <div class="flex-grow">
            <p class="text-gray-500 capitalize text-sm md:text-base">{item.type}</p>
            <h3 class="text-2xl font-semibold mt-1">{item.name}</h3>
          </div>
          <!-- Right Section: Discount and Status -->
          <div class="text-right flex-shrink-0">
            <h4 class="font-semibold text-gray-700 text-sm md:text-base">Discount</h4>
            <p class="text-gray-600 text-sm md:text-base mt-1">{item.discount}</p>
            <h4 class="font-semibold text-gray-700 text-sm md:text-base mt-4">Status</h4>
            <p class="text-gray-600 text-sm md:text-base capitalize mt-1">{item.status}</p>
          </div>
        </div>
      </div>
      <!-- Bundle Combo Information -->
      {#if item.bundleCombo}
        <hr class="border-gray-300" />
        <div class="bg-green-100 text-green-800 p-6 rounded-lg shadow">
          <h4 class="font-semibold text-lg">Bundle Combo Offer</h4>
          <p class="text-sm mt-2">{item.bundleCombo}</p>
        </div>
       <hr class="border-gray-300" />
      {/if}

      <!-- Redeem Button -->
      <div class="w-full flex justify-center">
        <button
          class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 w-full max-w-md"
        >
          Go to the redeem shop
        </button>
      </div>
    </div>
  {:else}
    <Header title="Item not found" showBack={true} backRoute="/inventory" />
    <div class="min-h-screen flex items-center justify-center">
      <p class="text-gray-500">Item not found.</p>
    </div>
  {/if}
</PageContainer>
