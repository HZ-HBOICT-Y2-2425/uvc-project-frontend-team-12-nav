<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/layout/Header.svelte';
  import PageContainer from '$lib/components/layout/PageContainer.svelte';
  import WaterTank from '$lib/components/ui/WaterTank.svelte';
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';
  import { user } from '$lib/stores/userStore';
  import { onMount } from 'svelte';

  const totalCapacity = 1125;
  const weeklySaving = 40;
  let mounted = false;

  // ✅ Get the logged-in user from store
  let loggedInUser = null;
  $: loggedInUser = $user;

  // ✅ Get total water usage
  $: currentUsage = loggedInUser?.total || 0;

  // ✅ Debugging: Log user data
  $: console.log("User Store Data in Home:", loggedInUser);

  onMount(() => {
    mounted = true;
  });

  const navigationButtons = [
    { label: 'Profile', action: () => goto('/profile') },
    { label: 'Inventory', action: () => goto('/inventory') },
    { label: 'Community', action: () => goto('/community') }
  ];
</script>

<PageContainer>
  <Header title="Home" />

  {#if mounted}
    <div class="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] px-6 flex-1 flex flex-col items-center">
      <!-- ✅ Ensure WaterTank receives the correct total -->
      <button type="button" on:click={() => goto("/waterlog")} aria-label="Go to water log">
        <WaterTank
          {currentUsage}
          {totalCapacity}
          {weeklySaving}
        />
      </button>

      <!-- ✅ Debugging: Show total -->
      <p class="text-gray-500 mt-2">Total Water Usage: {currentUsage}L</p>

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
  {/if}
</PageContainer>
