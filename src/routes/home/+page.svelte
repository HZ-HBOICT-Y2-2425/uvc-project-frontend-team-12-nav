<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/layout/Header.svelte';
  import PageContainer from '$lib/components/layout/PageContainer.svelte';
  import WaterTank from '$lib/components/ui/WaterTank.svelte';
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';

  const totalCapacity = 1500; // Tank total capacity
  let currentUsage = 0;       // Initialize total usage to 0
  let weeklySaving = 0;       // Initialize weekly saving to 0
  const userId = '1';

  const navigationButtons = [
    { label: 'Profile', action: () => goto('/profile') },
    { label: 'Inventory', action: () => goto('/inventory') },
    { label: 'Community', action: () => goto('/community') }
  ];

  const fetchTotalWaterUsage = async () => {
    try {
      const response = await fetch(`http://localhost:3011/waterlog/total?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        currentUsage = data.totalWaterUsed || 0; // Ensure fallback to 0
        weeklySaving = data.weeklySaving || 0;   // Ensure fallback to 0
      } else {
        console.error('Failed to fetch total water usage:', data.message);
      }
    } catch (error) {
      console.error('Network error while fetching total water usage:', error);
    }
  };

  onMount(() => {
    fetchTotalWaterUsage();
  });
</script>

<PageContainer>
  <Header title="Home" />
  
  <div class="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] px-6 flex-1 flex flex-col items-center on:hover pointer">
  <button type="button" on:click={() => goto("/waterlog")} aria-label="Go to water log">
    <WaterTank
      {currentUsage}
      {totalCapacity}
      {weeklySaving}
    />
  </button>

    <!-- Action Buttons -->
    <div class="w-full space-y-4 mt-4">
      {#each navigationButtons as { label, action }}
        <NavigationButton
          {label}
          on:click={action}
        />
      {/each}
    </div>
  </div>
</PageContainer>