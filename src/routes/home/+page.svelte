<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  
  const totalCapacity = 1125;
  let currentUsage = 450;
  const weeklySaving = 657;

  $: waterLevel = (currentUsage / totalCapacity) * 100;
  $: displayUsage = Math.round(currentUsage);

  function handleInteraction(event: MouseEvent | KeyboardEvent): void {
    if (
      event.type === 'keydown' &&
      (event as KeyboardEvent).key !== 'Enter' &&
      (event as KeyboardEvent).key !== ' '
    ) {
      return;
    }

    const increment = Math.random() * 30 + 10;
    currentUsage = Math.min(currentUsage + increment, totalCapacity);
    navigateToWaterlog();
  }

  // Navigation functions
  function navigateToProfile() {
    goto('/profile');
  }

  function navigateToInventory() {
    goto('/inventory');
  }

  function navigateToCommunity() {
    goto('/community');
  }

  function navigateToWaterlog() {
    goto('/waterlog');
  }

  const buttonActions = {
    Profile: navigateToProfile,
    Inventory: navigateToInventory,
    Community: navigateToCommunity
  };
</script>

<div class="min-h-screen w-full bg-white flex justify-center">
  <main class="w-full min-h-screen max-w-[450px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[900px] flex flex-col items-center bg-white">
    <!-- Header -->
    <div class="bg-green-500 w-full p-4 rounded-b-[32px]">
      <div class="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h1 class="text-3xl font-normal ml-2 text-white">Home</h1>
      </div>
    </div>

    <!-- Content Container -->
    <div class="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] px-6 flex-1 flex flex-col items-center">
      <button
        type="button"
        class="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 my-8
               rounded-full focus:outline-none bg-gray-100 overflow-hidden shadow-lg"
        on:click={handleInteraction}
        on:keydown={handleInteraction}
        aria-label="Update water level"
      >
        <!-- Water Level -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-blue-500/80 transition-all duration-500"
          style="height: {waterLevel}%"
        >
          <div class="wave-container h-full relative">
            <div class="wave wave1"></div>
            <div class="wave wave2"></div>
          </div>
        </div>

        <!-- Weekly Saving Section -->
        <div class="absolute bottom-0 left-0 right-0 h-[30%] overflow-hidden">
          <div class="wave-container h-full bg-blue-600/90 relative">
            <div class="wave wave3"></div>
            <div class="wave wave4"></div>
          </div>

          <div class="absolute inset-0 flex items-center justify-center text-white flex-col z-10">
            <span class="text-2xl font-medium">{weeklySaving}l</span>
            <span class="text-sm text-gray-100">Weekly Saving</span>
          </div>
        </div>

        <!-- Usage Display -->
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p class="text-2xl font-medium text-gray-800">
            {displayUsage}L/{totalCapacity}L
          </p>
          <p class="text-sm text-gray-600 mt-1">
            Click to add water
          </p>
        </div>
      </button>

      <!-- Action Buttons -->
      <div class="w-full space-y-4 mt-4">
        {#each Object.entries(buttonActions) as [name, action]}
          <button
            type="button"
            class="w-full bg-green-500 text-white py-3 rounded-xl text-xl font-normal
                   hover:bg-green-600 transition-colors duration-200 shadow-md"
            on:click={action}
          >
            {name}
          </button>
        {/each}
      </div>
    </div>
  </main>
</div>

<style>
  .wave-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }

  .wave1, .wave2 {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M0 44.35c261.2-69.4 533.3 42.3 800 0v44.35H0z' fill='%233b82f6'/%3E%3C/svg%3E");
    opacity: 0.5;
  }

  .wave3, .wave4 {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M0 44.35c261.2-69.4 533.3 42.3 800 0v44.35H0z' fill='%232563eb'/%3E%3C/svg%3E");
    opacity: 0.5;
  }

  .wave1 {
    animation: wave 12s linear infinite;
  }

  .wave2 {
    animation: waveReverse 8s linear infinite;
  }

  .wave3 {
    animation: wave 10s linear infinite;
  }

  .wave4 {
    animation: waveReverse 6s linear infinite;
  }

  @keyframes wave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.95);
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }

  @keyframes waveReverse {
    0% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.95);
    }
    100% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
  }
</style>