<script>
  import Header from '$lib/components/layout/Header.svelte';
  import QuoteDisplay from '$lib/components/waterlog/quoteDisplay.svelte';
  import BrandSelector from '$lib/components/waterlog/brandSelector.svelte';
  import WashCounter from '$lib/components/waterlog/washingCounter.svelte';
  import LaundryAnimation from '$lib/components/waterlog/laundryAnimation.svelte';
  
  import { washingStore } from '$lib/stores/washingStore.js';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';
  
  // Automatically subscribe to washingStore with $ syntax
  $: isRunning = $washingStore.isRunning;
  
  // Go back to the previous page
  const goBack = () => {
    window.history.back(); // Goes back to the previous page in the history
  };
  
  onMount(() => {
    // Any additional initialization if needed
  });
  
  onDestroy(() => {
    washingStore.destroyStore();
  });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col relative overflow-hidden">
  <!-- Header Component -->
  <Header title="Washing Timer" showBack={true} backRoute="/waterlog"/>
  
  {#if $washingStore.selectedBrand}
    <!-- Change Brand Button -->
    <div class="mt-4 mb-4 flex justify-center">
      <button 
        on:click={() => washingStore.changeBrand("")} 
        class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Change Brand
      </button>
    </div>
  {/if}
  
  {#if !$washingStore.selectedBrand}
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 p-4">
      <BrandSelector />
    </div>
  {:else}
    <!-- Wash Count UI -->
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 w-full max-w-md p-4 mx-auto">
      <!-- Quote Display -->
      <QuoteDisplay type="washing" />

      <!-- Wash Counter Component -->
      <WashCounter />
    </div>
  {/if}
  
  <!-- Laundry Animation -->
  {#if $washingStore.showLaundryAnimation}
  <LaundryAnimation />
  {/if}
  </div>
<style>
  .min-h-screen {
    min-height: 100vh;
  }

  .flex-grow {
    flex-grow: 1;
  }
</style>
