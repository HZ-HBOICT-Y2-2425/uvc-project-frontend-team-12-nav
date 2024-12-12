<script>
  import Header from '$lib/components/layout/Header.svelte';
  import QuoteDisplay from '$lib/components/waterlog/quoteDisplay.svelte';
  import FlushCounter from '$lib/components/waterlog/flushCounter.svelte';
  import FlushAnimation from '$lib/components/waterlog/flushAnimation.svelte';
  
  import { toiletStore } from '$lib/stores/toiletStore.js';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';
  
  // Automatically subscribe to toiletStore with $ syntax
  $: isRunning = $toiletStore.isRunning;
  
  // Go back to the previous page
  const goBack = () => {
    window.history.back(); // Goes back to the previous page in the history
  };
  
  onMount(() => {
    // Any additional initialization if needed
  });
  
  onDestroy(() => {
    toiletStore.destroyStore();
  });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col relative overflow-hidden">
  <!-- Header Component -->
  <Header title="Toilet Flush Counter" showBack={true} backRoute="/waterlog"/>

  {#if $toiletStore.showFlushAnimation}
    <FlushAnimation />
  {/if}

  <!-- Content Below Header (Centered in the remaining screen space) -->
  <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 p-4">
    <!-- Funny Quote Display -->
    <QuoteDisplay type="toilet" />

    <!-- Flush Counter Component -->
    <FlushCounter />
  </div>
</div>

<style>
  .min-h-screen {
    min-height: 100vh;
  }

  .flex-grow {
    flex-grow: 1;
  }

  /* Prevent horizontal overflow */
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  /* Ensure images and other media are responsive */
  img {
    max-width: 100%;
    height: auto;
  }
</style>
