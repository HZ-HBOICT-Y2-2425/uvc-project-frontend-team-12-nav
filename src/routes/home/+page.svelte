<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/layout/Header.svelte';
  import PageContainer from '$lib/components/layout/PageContainer.svelte';
  import WaterTank from '$lib/components/ui/WaterTank.svelte';
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';
  
  const totalCapacity = 1125;
  let currentUsage = 450;
  const weeklySaving = 40;

  const navigationButtons = [
    { label: 'Profile', action: () => goto('/profile') },
    { label: 'Inventory', action: () => goto('/inventory') },
    { label: 'Community', action: () => goto('/community') }
  ];
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