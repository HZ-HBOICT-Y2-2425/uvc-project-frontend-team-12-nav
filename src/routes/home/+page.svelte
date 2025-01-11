<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Header from '$lib/components/layout/Header.svelte';
  import PageContainer from '$lib/components/layout/PageContainer.svelte';
  import WaterTank from '$lib/components/ui/WaterTank.svelte';
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';

  // If you already have Svelte stores for dailyUsage, monthlyUsage, etc.
  // import { dailyUsage, monthlyUsage } from '$lib/stores/waterData';
  // Otherwise, we can just use local variables for demonstration.

  const API_BASE_URL = 'http://localhost:3011/waterlog';
  const totalCapacity = 150000;  // Example tank capacity

  let currentUsage = 0;   // This is what you display in <WaterTank />
  let weeklySaving = 0;   // Already part of your code
  let isLoading = false;
  let error = '';

  const navigationButtons = [
    { label: 'Profile', action: () => goto('/profile') },
    { label: 'Inventory', action: () => goto('/inventory') },
    { label: 'Community', action: () => goto('/community') }
  ];

  // Combine your existing logic with the new "fetchData" approach:
  const fetchUserData = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');

      if (!userId || !userEmail) {
        console.error('No user data found');
        goto('/login');
        return;
      }

      // 1. Fetch user questionnaire data
      const userResponse = await fetch(`http://localhost:3012/current-user?userId=${userId}`);
      const userData = await userResponse.json();

      if (userResponse.ok && userData.user.questionnaire) {
        // Use waterUsage from questionnaire as initial currentUsage
        currentUsage = userData.user.questionnaire.waterUsage || 0;
        console.log('Questionnaire water usage:', currentUsage);
      }

      // 2. Fetch water usage stats from your /stats endpoint
      const statsResponse = await fetch(`${API_BASE_URL}/stats?userId=${userId}`);
      if (!statsResponse.ok) throw new Error('Failed to fetch water usage stats');
      
      const statsData = await statsResponse.json();
      console.log('Fetched stats data:', statsData);

      // OPTIONAL: Set them in Svelte stores if you have them:
      // dailyUsage.set(statsData.stats.dailyUsage);
      // monthlyUsage.set(statsData.stats.monthlyUsage);

      // Now sum the monthly usage
      let monthlySum = 0;
      for (const month of statsData.stats.monthlyUsage) {
        // If you just want the total usage for the entire month:
        monthlySum += month.totalUsage || 0;

        // (Or if you want to explicitly sum the breakdown categories, you could do so:)
        // monthlySum += (
        //   (month.breakdown?.shower?.usage || 0) +
        //   (month.breakdown?.toilet?.usage || 0) +
        //   (month.breakdown?.sink?.usage || 0) +
        //   (month.breakdown?.washing?.usage || 0) +
        //   ((month.breakdown?.other?.Cooking || 0)
        //     + (month.breakdown?.other?.Cleaning || 0)
        //     + (month.breakdown?.other?.Gardening || 0)
        //     + (month.breakdown?.other?.Drinking || 0))
        // );
      }
      console.log('Sum of all monthly usage:', monthlySum);

      // 3. Fetch total water usage from your /total endpoint
      const totalResponse = await fetch(`${API_BASE_URL}/total?userId=${userId}`);
      if (!totalResponse.ok) throw new Error('Failed to fetch total water usage');

      const totalData = await totalResponse.json();
      console.log('Fetched total data:', totalData);

      weeklySaving = totalData.weeklySaving || 0;
      const totalWaterUsed = totalData.totalWaterUsed || 0;

      // 4. Decide how to combine the data
      // In your current code, you add totalWaterUsed to currentUsage. 
      // You can also add your monthlySum to it if you wish. 
      // But watch out for double-counting:
      // The monthly sum might already be included in totalWaterUsed (depending on your backend logic).
      // 
      // If totalWaterUsed is an "all-time" total, 
      // and monthlySum is just the sum of usage for certain months, 
      // you might not want to add them both. 
      // For demonstration, let's assume monthlySum is separate and should be added:
      
      currentUsage += totalWaterUsed; // existing logic
      currentUsage += monthlySum;     // add the sum of monthly usage if needed

      console.log(
        `currentUsage after questionnaire + monthly usage + totalWaterUsed = ${currentUsage}`
      );
      
    } catch (err) {
      console.error('Error fetching user data:', err);
      error = 'Failed to load water usage data';
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    isLoading = true;
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

    <!-- Water Tank button -->
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
