<script>
  import Header from '$lib/components/layout/Header.svelte';
  import QuoteDisplay from '$lib/components/waterlog/QuoteDisplay.svelte';
  import ShowerStatCard from '$lib/components/waterlog/showerStatCard.svelte';
  
  import { showerStore } from '$lib/stores/showerStore.js';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';
  
  // Declare all necessary variables
  let todayShowerTime = 0; // in seconds
  let yesterdayShowerTime = 0; // in seconds

  let todayWaterUsage = 0; // in liters
  let yesterdayWaterUsage = 0; // in liters

  let bottlesForToday = 0;
  let bottlesForYesterday = 0;

  let isLoading = true;
  let errorMessage = '';

  // Reactive assignments from the store
  $: {
    todayShowerTime = $showerStore.todayShowerTime;
    yesterdayShowerTime = $showerStore.yesterdayShowerTime;
    todayWaterUsage = $showerStore.todayWaterUsage;
    yesterdayWaterUsage = $showerStore.yesterdayWaterUsage;
    bottlesForToday = $showerStore.bottlesForToday.length;
    bottlesForYesterday = $showerStore.bottlesForYesterday.length;

    // Check if data is loaded
    if ($showerStore.todayShowerTime !== undefined && !$showerStore.errorMessage) {
      isLoading = false;
      errorMessage = '';
    } else if ($showerStore.errorMessage) {
      isLoading = false;
      errorMessage = $showerStore.errorMessage;
    }
  }

  // Format time helper function
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Go back to the previous page
  const goBack = () => {
    window.history.back(); // Goes back to the previous page in the history
  };

  onMount(() => {
    // Fetch shower stats when the component mounts
    showerStore.fetchShowerStats();
  });

  onDestroy(() => {
    showerStore.destroyStore();
  });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col relative overflow-hidden">
  <!-- Header Component -->
  <Header title="Shower Statistics" showBack={true} backRoute="/waterlog/shower"/>

  <!-- Content Below Header (Centered in the remaining screen space) -->
  <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 p-4">
    {#if isLoading}
      <p>Loading shower statistics...</p>
    {:else if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {:else}
      <!-- Quote Display -->
      <QuoteDisplay type="shower" />

      <!-- Today's Shower Statistics -->
      <ShowerStatCard 
        title="Today's Shower Time" 
        formattedTime={formatTime(todayShowerTime)} 
        waterUsage={todayWaterUsage} 
        bottleCount={bottlesForToday} 
      />

      <!-- Yesterday's Shower Statistics -->
      <ShowerStatCard 
        title="Yesterday's Shower Time" 
        formattedTime={formatTime(yesterdayShowerTime)} 
        waterUsage={yesterdayWaterUsage} 
        bottleCount={bottlesForYesterday} 
      />
    {/if}
  </div>
</div>

<style>
  .min-h-screen {
    min-height: 100vh;
  }

  .flex-grow {
    flex-grow: 1;
  }
</style>
