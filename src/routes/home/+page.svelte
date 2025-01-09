<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/layout/Header.svelte';
  import PageContainer from '$lib/components/layout/PageContainer.svelte';
  import WaterTank from '$lib/components/ui/WaterTank.svelte';
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';

  const totalCapacity = 15000; // Tank total capacity
  let currentUsage = 0;       // Initialize total usage to 0
  let weeklySaving = 0;       // Initialize weekly saving to 0
  let error = '';

  const navigationButtons = [
    { label: 'Profile', action: () => goto('/profile') },
    { label: 'Inventory', action: () => goto('/inventory') },
    { label: 'Community', action: () => goto('/community') }
  ];

  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');

      if (!userId || !userEmail) {
        console.error('No user data found');
        goto('/login');
        return;
      }

      // First, fetch user questionnaire data
      const userResponse = await fetch(`http://localhost:3012/current-user?userId=${userId}`);
      const userData = await userResponse.json();

      if (userResponse.ok && userData.user.questionnaire) {
        // Use the waterUsage from questionnaire as currentUsage
        currentUsage = userData.user.questionnaire.waterUsage || 0;
        console.log('Questionnaire water usage:', currentUsage);
      }

      // Then fetch additional water log data
      const waterLogResponse = await fetch(`http://localhost:3011/waterlog/total?userId=${userId}`);
      const waterLogData = await waterLogResponse.json();
      
      if (waterLogResponse.ok) {
        // Add any additional water usage from water logs
        currentUsage += waterLogData.totalWaterUsed || 0;
        weeklySaving = waterLogData.weeklySaving || 0;
        console.log('Total water usage:', currentUsage, 'Weekly saving:', weeklySaving);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      error = 'Failed to load water usage data';
    }
  };

  onMount(() => {
    fetchUserData();
  });
</script>

<PageContainer>
  <Header title="Home" />
  
  <div class="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] px-6 flex-1 flex flex-col items-center">
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{error}</span>
      </div>
    {/if}

    <button type="button" on:click={() => goto("/waterlog")} class="w-full" aria-label="Go to water log">
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