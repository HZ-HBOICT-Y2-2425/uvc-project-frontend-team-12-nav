<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';
    import { goto } from '$app/navigation';
    
    let username = "Ivan Iliev";
    let mounted = false;
  
    onMount(() => {
      mounted = true;
    });

    // Navigation functions
    function goBack() {
      goto('/');
    }

    function navigateToRewards() {
      goto('/rewards');
    }

    function navigateToStatistics() {
      goto('/statistics');
    }

    function navigateToAchievements() {
      goto('/achievements');
    }
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
        on:click={goBack}
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
          <button 
            class="w-full py-4 bg-green-500 text-white text-xl rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            on:click={navigateToRewards}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Redeem rewards
          </button>
  
          <button 
            class="w-full py-4 bg-green-500 text-white text-xl rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            on:click={navigateToStatistics}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Personal Statistics
          </button>
  
          <button 
            class="w-full py-4 bg-green-500 text-white text-xl rounded-xl shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            on:click={navigateToAchievements}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Achievements
          </button>
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