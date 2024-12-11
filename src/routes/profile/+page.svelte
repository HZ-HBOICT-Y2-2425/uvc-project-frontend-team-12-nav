<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/userStore'; // Import the user store
  import type { User } from '$lib/stores/userStore'; // Import the User interface
  import NavigationButton from '$lib/components/ui/NavigationButton.svelte';
  import { CircleDollarSign, BarChart2, Award } from 'lucide-svelte';

  let mounted = false;

  // Subscribe to the user store
  let loggedInUser: User | null = null; // Declare loggedInUser with type User or null
  $: loggedInUser = $user;

  // Display the username or a fallback
  $: username = loggedInUser ? loggedInUser.name : 'Guest';

  onMount(() => {
    mounted = true;
  });

  const navigationButtons = [
    { label: 'Redeem rewards', icon: CircleDollarSign, action: () => goto('/rewards') },
    { label: 'Personal Statistics', icon: BarChart2, action: () => goto('/statistics') },
    { label: 'Achievements', icon: Award, action: () => goto('/achievements') },
  ];
</script>





<div class="min-h-screen bg-white relative overflow-hidden">
    <!-- Curved line decoration at the top -->
    <div class="absolute top-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path
          fill="none"
          stroke="#4CAF50"
          stroke-width="2"
          d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,213.3C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160" 
        />
      </svg>
    </div>

    <!-- Back button -->
    <div class="absolute top-4 left-4 z-10">
      <button 
        class="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors"
        on:click={() => goto('/')}
      >
        Back
      </button>
    </div>
  
    {#if mounted}
      <div class="container mx-auto px-4 pt-16 pb-32" in:fade>
        <!-- Profile Header -->
        <div class="text-center mb-8" in:slide={{ delay: 200 }}>
          <h1 class="text-4xl font-bold mb-4">{username}</h1>
        </div>
  
        <!-- Beaver Avatar -->
        <div class="flex justify-center mb-12" in:slide={{ delay: 400 }}>
          <div class="w-48 h-48 relative">
            <img
              src="/beaver.svg" 
              alt="Beaver Avatar"
              class="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="space-y-4 max-w-sm mx-auto" in:slide={{ delay: 600 }}>
          {#each navigationButtons as { label, icon, action }}
            <NavigationButton
              {label}
              {icon}
              on:click={action}
            />
          {/each}
        </div>
      </div>
  
      <!-- Forest decoration at bottom -->
      <div class="absolute bottom-0 left-0 right-0">
        <div class="flex justify-between px-4">
          {#each Array(3) as _, i}
            <div 
              class="relative tree-container" 
              style="transform: translateY({20 * (i % 2)}px)"
              in:slide={{
                delay: 800 + (i * 200),
                duration: 1000,
                axis: 'y'
              }}
            >
              <img 
                src="/Tree.svg" 
                alt="Tree"
                class="h-32 w-auto object-contain growing-tree"
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}
</div>
  
<style>
  .tree-container {
    transform-origin: bottom center;
  }

  .growing-tree {
    animation: grow 1s ease-out forwards;
    transform-origin: bottom center;
  }

  @keyframes grow {
    0% {
      transform: scale(0, 0);
      opacity: 0;
    }
    50% {
      transform: scale(0.5, 0.2);
      opacity: 0.5;
    }
    100% {
      transform: scale(1, 1);
      opacity: 1;
    }
  }
</style>