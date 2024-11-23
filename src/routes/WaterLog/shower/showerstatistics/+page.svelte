<script>
  // Mock Data: Replace with actual data from the backend in a real app
  let todayShowerTime = 1; // in minutes
  let yesterdayShowerTime = 7; // in minutes

  // Calculate water usage (e.g., 10 liters per minute)
  const litersPerMinute = 10;
  const todayWaterUsage = todayShowerTime * litersPerMinute;
  const yesterdayWaterUsage = yesterdayShowerTime * litersPerMinute;

  // Calculate number of bottles (1 bottle = 1 liter)
  const bottlesForToday = Array(todayWaterUsage).fill(1);
  const bottlesForYesterday = Array(yesterdayWaterUsage).fill(1);
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-8 px-4">
  <!-- Green Card Section for Heading -->
  <div class="w-full bg-green-600 text-white p-6 rounded-b-lg mb-6">
    <h1 class="text-3xl font-bold text-center">Shower Statistics</h1>
  </div>

  <!-- Today's Shower Time -->
  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
    <h2 class="text-2xl font-bold text-green-600">Today's Shower Time</h2>
    <p class="text-xl mt-2">{todayShowerTime} minutes</p>
    <p class="text-lg text-gray-600">{todayWaterUsage} liters of water used</p>
    <!-- Bottles Visualization -->
    <div class="flex flex-wrap mt-4 gap-2">
      {#each bottlesForToday as _}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 60"
          class="w-8 h-16"
          fill="currentColor"
        >
          <rect x="8" y="2" width="8" height="8" rx="2" fill="#4f46e5" />
          <rect x="6" y="10" width="12" height="40" rx="4" fill="#93c5fd" />
        </svg>
      {/each}
    </div>
  </div>

  <!-- Yesterday's Shower Time -->
  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h2 class="text-2xl font-bold text-green-600">Yesterday's Shower Time</h2>
    <p class="text-xl mt-2">{yesterdayShowerTime} minutes</p>
    <p class="text-lg text-gray-600">{yesterdayWaterUsage} liters of water used</p>
    <!-- Bottles Visualization -->
    <div class="flex flex-wrap mt-4 gap-2">
      {#each bottlesForYesterday as _}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 60"
          class="w-8 h-16"
          fill="currentColor"
        >
          <rect x="8" y="2" width="8" height="8" rx="2" fill="#4f46e5" />
          <rect x="6" y="10" width="12" height="40" rx="4" fill="#93c5fd" />
        </svg>
      {/each}
    </div>
  </div>

  <!-- Back Button -->
  <button on:click={() => window.history.back()} class="mt-6 bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
    Back
  </button>
</div>

<style>
  /* Styling for the page */
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .gap-2 {
    gap: 0.5rem; /* Adjust spacing between bottles */
  }
  .w-8 {
    width: 2rem;
  }
  .h-16 {
    height: 4rem;
  }
</style>
