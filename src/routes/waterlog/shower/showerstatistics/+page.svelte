<script>
  import { onMount } from 'svelte';

  let todayShowerTime = 0; // in minutes
  let yesterdayShowerTime = 0; // in minutes

  let todayWaterUsage = 0; // in liters
  let yesterdayWaterUsage = 0; // in liters

  let bottlesForToday = [];
  let bottlesForYesterday = [];

  const fetchShowerStats = async () => {
    try {
      const response = await fetch('http://localhost:3011/api/water-usage/shower/stats?userId=1');
      const data = await response.json();

      if (response.ok) {
        console.log('Shower stats:', data);

        // Assuming the data contains waterUsageToday and waterUsageYesterday in liters
        todayWaterUsage = data.waterUsageToday;
        yesterdayWaterUsage = data.waterUsageYesterday;

        // Since water usage per minute is 9 liters
        todayShowerTime = (todayWaterUsage / 9).toFixed(2); // in minutes
        yesterdayShowerTime = (yesterdayWaterUsage / 9).toFixed(2); // in minutes

        // Calculate number of bottles (assuming 1 bottle = 1 liter)
        bottlesForToday = Array(Math.round(todayWaterUsage)).fill(1);
        bottlesForYesterday = Array(Math.round(yesterdayWaterUsage)).fill(1);
      } else {
        console.error('Error fetching shower stats:', data);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred while fetching shower statistics.');
    }
  };

  onMount(() => {
    fetchShowerStats();
  });
</script>

<div class="bg-blue-50 flex flex-col items-center relative">
  <!-- Back Button -->
  <button 
    on:click={() => window.history.back()} 
    class="absolute top-4 left-4 bg-red-500 text-white py-2 px-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
  >
    Back
  </button>

  <!-- Green Card Section for Heading -->
  <div class="w-full bg-green-600 text-white p-6 rounded-b-lg">
    <h1 class="text-3xl font-bold text-center">Shower Statistics</h1>
  </div>

  <!-- Today's Shower Time -->
  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
    <h2 class="text-2xl font-bold text-green-600">Today's Shower Time</h2>
    <p class="text-xl mt-2">{todayShowerTime} minutes</p>
    <p class="text-lg text-gray-600">{todayWaterUsage} liters of water used</p>
    <!-- Bottles Visualization -->
    <div class="flex flex-wrap justify-center gap-2">
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
  <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
    <h2 class="text-2xl font-bold text-green-600">Yesterday's Shower Time</h2>
    <p class="text-xl mt-2">{yesterdayShowerTime} minutes</p>
    <p class="text-lg text-gray-600">{yesterdayWaterUsage} liters of water used</p>
    <!-- Bottles Visualization -->
    <div class="flex flex-wrap justify-center gap-2">
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
  /* Ensuring the bottle container doesn't use the full screen width */
  .flex {
    display: flex;
    justify-content: center;
  }
  .max-w-md {
    max-width: 80%;
  }
  .justify-center {
    justify-content: center;
  }
</style>
