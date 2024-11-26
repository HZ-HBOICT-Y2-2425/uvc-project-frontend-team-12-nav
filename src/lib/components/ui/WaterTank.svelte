<!-- src/lib/components/ui/WaterTank.svelte -->
<script lang="ts">
  export let currentUsage: number;
  export let totalCapacity: number;
  export let weeklySaving: number;

  $: waterLevel = (currentUsage / totalCapacity) * 100;
  $: displayUsage = Math.round(currentUsage);
</script>

<div
  class="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 my-8
         rounded-full bg-gray-100 overflow-hidden shadow-lg"
>
  <!-- Base Water Layer -->
  <div
    class="absolute bottom-0 left-0 right-0 transition-[height] duration-1000"
    style="height: {waterLevel}%"
  >
    <!-- Gradient Water Fill -->
    <div class="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-400"></div>
    
    <!-- Surface Waves -->
    <div class="absolute -top-8 left-0 right-0 h-16 overflow-hidden">
      {#each Array(5) as _, i}
        <div 
          class="wave-wrapper"
          style="animation-delay: -{i * 2}s;"
        >
          <svg 
            class="wave"
            style="animation-duration: {30 + i * 2}s"
            viewBox="0 0 2400 50" 
            preserveAspectRatio="none"
          >
            <path 
              d="M2400,25 
                 C2250,45 2100,5 1950,25 
                 C1800,45 1650,5 1500,25 
                 C1350,45 1200,5 1050,25 
                 C900,45 750,5 600,25 
                 C450,45 300,5 150,25 
                 C0,45 -150,5 -300,25 
                 L-300,50 L2400,50 Z" 
              class="fill-blue-400/30"
            ></path>
          </svg>
        </div>
      {/each}
    </div>
  </div>

  <!-- Usage Display -->
  <div class="absolute inset-0 flex flex-col items-center justify-center">
    <p class="text-2xl font-medium text-gray-800">
      {displayUsage}L/{totalCapacity}L
    </p>
    <p class="text-sm text-gray-600 mt-1">Current Usage</p>
  </div>

  <!-- Weekly Saving Display -->
  <div class="absolute bottom-4 left-0 right-0 flex justify-center">
    <div class="bg-blue-600/20 backdrop-blur-sm rounded-full px-4 py-1 text-center">
      <p class="text-lg font-medium text-white">{weeklySaving}L</p>
      <p class="text-xs text-blue-50">Weekly Saving</p>
    </div>
  </div>
</div>

<style>
  .wave-wrapper {
    position: absolute;
    inset: 0;
  }

  .wave {
    width: 300%;
    height: 100%;
    transform-origin: center center;
    position: absolute;
    left: 0;
    animation: waveMove linear infinite;
  }

  @keyframes waveMove {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  /* Add clip-path to maintain circular shape */
  :global(.wave path) {
    clip-path: circle(50%);
  }
</style>