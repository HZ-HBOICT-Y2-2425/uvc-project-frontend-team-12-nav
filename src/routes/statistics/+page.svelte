<script lang="ts">
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import {
    dailyUsage,
    monthlyUsage,
    totalWaterUsed,
    weeklySaving,
  } from '$lib/stores/waterData';
  import AnimatedNumber from '$lib/components/AnimatedNumber.svelte';

  let mounted = false;
  let weeklyTarget = 1500; // Weekly target in liters
  let isLoading = true;
  let errorMessage: string | null = null;

  // Replace with your actual method to retrieve the current user's ID
  const userId = '1'; 

  // Calculate weekly usage based on totalWaterUsed (current week's usage)
  $: weeklyUsage = $totalWaterUsed;

  // Calculate weekly progress percentage
  $: weeklyProgress = (weeklyUsage / weeklyTarget) * 100;

  // Tweened value for the progress circle
  const strokeDashoffset = tweened(226.19, { duration: 1000, easing: cubicOut });
  $: strokeDashoffset.set(226.19 - ((weeklyProgress || 0) / 100) * 226.19);

  // Calculate total savings and stats
  $: totalSaved = $monthlyUsage.reduce((total, month) => total + (month.saved || 0), 0);
  $: averageDaily =
    $dailyUsage.reduce((total, day) => total + (day.totalUsage || 0), 0) / ($dailyUsage.length || 1);

  // Define a reactive variable for 'today'
  $: today = $dailyUsage[$dailyUsage.length - 1];
  $: console.log('Today:', today); // Debugging

  // Define your backend API base URL
  const API_BASE_URL = 'http://localhost:3011/waterlog'; 

  // Define cost per liter in EUR (Set to actual value in Netherlands)
  const costPerLiter = 0.02; // Example: 0.02 EUR per liter

  // Define water used to chop down one tree in liters
  const waterUsedPerTree = 1000; // Example: 1000 liters per tree

  // Calculate money saved based on weekly difference
  $: moneySaved = Math.max(0, (weeklyTarget - weeklyUsage)) * costPerLiter;

  // Calculate trees saved based on weekly difference
  $: treesSaved = Math.max(0, (weeklyTarget - weeklyUsage)) / waterUsedPerTree;

  // Calculate weekly water saved
  $: weeklySaved = Math.max(0, (weeklyTarget - weeklyUsage));

  // Function to fetch data from the backend
  const fetchData = async () => {
    isLoading = true;
    errorMessage = null;
    try {
      // Fetch water usage stats
      const statsResponse = await fetch(`${API_BASE_URL}/stats?userId=${userId}`);
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch water usage stats');
      }
      const statsData = await statsResponse.json();
      console.log('Fetched stats data:', statsData); // Debugging
      dailyUsage.set(statsData.stats.dailyUsage);
      monthlyUsage.set(statsData.stats.monthlyUsage);
      console.log('dailyUsage set to:', $dailyUsage);
      console.log('monthlyUsage set to:', $monthlyUsage);

      // Fetch total water usage
      const totalResponse = await fetch(`${API_BASE_URL}/total?userId=${userId}`);
      if (!totalResponse.ok) {
        throw new Error('Failed to fetch total water usage');
      }
      const totalData = await totalResponse.json();
      console.log('Fetched total data:', totalData); // Debugging
      totalWaterUsed.set(totalData.totalWaterUsed);
      weeklySaving.set(totalData.weeklySaving);
      console.log('totalWaterUsed set to:', $totalWaterUsed);
      console.log('weeklySaving set to:', $weeklySaving);

      isLoading = false;
      mounted = true;
    } catch (error) {
      console.error('Error fetching water usage data:', error);
      errorMessage = 'Failed to load water usage data. Please try again later.';
      isLoading = false;
    }
  };

  // Fetch data on mount
  onMount(() => {
    fetchData();
  });
</script>

<div class="w-full max-w-7xl mx-auto p-4 space-y-8">
  <!-- Back Button -->
  <button
    on:click={() => window.history.back()}
    class="flex items-center px-3 py-2 bg-red-200 text-white-700 rounded hover:bg-red-300 transition-colors duration-300"
    aria-label="Go Back"
  >
    Back
  </button>

  {#if isLoading}
    <!-- Loader Section -->
    <div class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>
  {:else if errorMessage}
    <!-- Error Message Section -->
    <div class="flex flex-col justify-center items-center h-64">
      <p class="text-xl text-red-500 mb-4">{errorMessage}</p>
      <!-- Retry Button -->
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        on:click={fetchData}
      >
        Retry
      </button>
    </div>
  {:else if mounted}
    <!-- Header Section -->
    <div class="bg-green-500 rounded-xl p-6 text-white" transition:slide>
      <h1 class="text-3xl font-bold mb-2">Water Usage Statistics</h1>
      <p class="opacity-90">Track your water consumption and savings</p>
    </div>

    <!-- Weekly Progress Card -->
    <div class="bg-emerald-400 rounded-lg p-4 text-white" transition:slide>
      <h2 class="text-xl font-semibold mb-2">Weekly Progress</h2>
      <div class="flex items-center gap-4">
        <div class="relative w-20 h-20">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle
              class="text-emerald-200 stroke-current"
              stroke-width="8"
              cx="40"
              cy="40"
              r="36"
              fill="transparent"
            />
            <circle
              class="text-white stroke-current"
              stroke-width="8"
              stroke-linecap="round"
              cx="40"
              cy="40"
              r="36"
              fill="transparent"
              style="stroke-dasharray: 226.19; stroke-dashoffset: {$strokeDashoffset}"
            />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {Math.round(weeklyProgress)}%
          </span>
        </div>
        <div>
          <p class="text-sm opacity-90">Current Usage: {Math.round(weeklyUsage)}L</p>
          <p class="text-sm opacity-90">Target: {weeklyTarget}L</p>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <!-- Total Water Saved -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade={{ delay: 100 }}>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <img src="/ocean.svg" alt="Ocean Icon" class="w-12 h-12" />
          </div>
          <div>
            <p class="text-sm text-gray-700">Total Water Saved</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={weeklySaved} />L
            </p>
          </div>
        </div>
      </div>

      <!-- Average Daily Usage -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade={{ delay: 200 }}>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <img src="/showerhead.svg" alt="Shower Head Icon" class="w-12 h-12" />
          </div>
          <div>
            <p class="text-sm text-gray-700">Average Daily Usage</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={Math.round(averageDaily) || 0} />L
            </p>
          </div>
        </div>
      </div>

      <!-- Money Saved -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade={{ delay: 300 }}>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <img src="/money.svg" alt="Money Icon" class="w-12 h-12" />
          </div>
          <div>
            <p class="text-sm text-gray-700">Money Saved</p>
            <p class="text-2xl font-bold">
              €<AnimatedNumber value={moneySaved.toFixed(2)} />
            </p>
          </div>
        </div>
      </div>

      <!-- Environmental Impact -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade={{ delay: 400 }}>
        <div class="flex items-center gap-4">
          <div class="p-3 bg-red-100 rounded-lg">
            <img src="/tree2.svg" alt="Tree Icon" class="w-12 h-12" />
          </div>
          <div>
            <p class="text-sm text-gray-700">Trees Equivalent</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={treesSaved.toFixed(2)} /> tree(s)
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Usage Breakdown -->
    <div class="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <h2 class="text-xl font-semibold">Monthly Usage Breakdown</h2>

      {#if $monthlyUsage.length > 0}
        {#each $monthlyUsage as month, index}
          <div class="space-y-6" transition:slide={{ delay: index * 100 }}>
            <div class="flex justify-between items-center">
              <span class="font-medium">{month.month} {month.year}</span>
              <span class="text-gray-600">
                <AnimatedNumber value={month.totalUsage || 0} />L
              </span>
            </div>

            <!-- Stacked bar chart -->
            <div class="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
              {#if month.totalUsage > 0}
                <!-- Shower bar -->
                <div
                  class="absolute h-full bg-blue-500 progress-bar"
                  style="
                    width: {((month.breakdown?.shower?.usage || 0) / month.totalUsage) * 100}%;
                    left: 0%;
                  "
                ></div>
                <!-- Toilet bar -->
                <div
                  class="absolute h-full bg-violet-500 progress-bar"
                  style="
                    width: {((month.breakdown?.toilet?.usage || 0) / month.totalUsage) * 100}%;
                    left: {((month.breakdown?.shower?.usage || 0) / month.totalUsage) * 100}%;
                  "
                ></div>
                <!-- Sink bar -->
                <div
                  class="absolute h-full bg-emerald-500 progress-bar"
                  style="
                    width: {((month.breakdown?.sink?.usage || 0) / month.totalUsage) * 100}%;
                    left: {(
                      ((month.breakdown?.shower?.usage || 0) + (month.breakdown?.toilet?.usage || 0)) / month.totalUsage
                    ) * 100}%;
                  "
                ></div>
                <!-- Washing bar -->
                <div
                  class="absolute h-full bg-orange-500 progress-bar"
                  style="
                    width: {((month.breakdown?.washing?.usage || 0) / month.totalUsage) * 100}%;
                    left: {(
                      ((month.breakdown?.shower?.usage || 0) + 
                       (month.breakdown?.toilet?.usage || 0) + 
                       (month.breakdown?.sink?.usage || 0)) / month.totalUsage
                    ) * 100}%;
                  "
                ></div>
                <!-- Other bar -->
                <div
                  class="absolute h-full bg-red-500 progress-bar"
                  style="
                    width: {(
                      (
                        (month.breakdown?.other?.Cooking || 0) + 
                        (month.breakdown?.other?.Cleaning || 0) + 
                        (month.breakdown?.other?.Gardening || 0) + 
                        (month.breakdown?.other?.Drinking || 0)
                      ) / month.totalUsage
                    ) * 100}%;
                    left: {(
                      (
                        (month.breakdown?.shower?.usage || 0) + 
                        (month.breakdown?.toilet?.usage || 0) + 
                        (month.breakdown?.sink?.usage || 0) + 
                        (month.breakdown?.washing?.usage || 0)
                      ) / month.totalUsage
                    ) * 100}%;
                  "
                ></div>
              {/if}
            </div>

            <!-- Usage breakdown as cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <!-- Shower Usage -->
              <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition-colors duration-300">
                <img src="/shower.svg" alt="Shower Icon" class="w-8 h-8" />
                <div>
                  <p class="text-sm text-gray-600">Shower</p>
                  <p class="text-lg font-semibold">
                    <AnimatedNumber value={month.breakdown?.shower?.usage || 0} />L
                  </p>
                  <p class="text-xs text-gray-500">({month.breakdown?.shower?.times || 0} uses)</p>
                </div>
              </div>

              <!-- Toilet Usage -->
              <div class="flex items-center gap-3 p-4 bg-violet-50 rounded-lg shadow-sm hover:bg-violet-100 transition-colors duration-300">
                <img src="/toilet.svg" alt="Toilet Icon" class="w-8 h-8" />
                <div>
                  <p class="text-sm text-gray-600">Toilet</p>
                  <p class="text-lg font-semibold">
                    <AnimatedNumber value={month.breakdown?.toilet?.usage || 0} />L
                  </p>
                  <p class="text-xs text-gray-500">({month.breakdown?.toilet?.times || 0} uses)</p>
                </div>
              </div>

              <!-- Sink Usage -->
              <div class="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg shadow-sm hover:bg-emerald-100 transition-colors duration-300">
                <img src="/sink.svg" alt="Sink Icon" class="w-8 h-8" />
                <div>
                  <p class="text-sm text-gray-600">Sink</p>
                  <p class="text-lg font-semibold">
                    <AnimatedNumber value={month.breakdown?.sink?.usage || 0} />L
                  </p>
                  <p class="text-xs text-gray-500">({month.breakdown?.sink?.times || 0} uses)</p>
                </div>
              </div>

              <!-- Washing Usage -->
              <div class="flex items-center gap-3 p-4 bg-orange-50 rounded-lg shadow-sm hover:bg-orange-100 transition-colors duration-300">
                <img src="/washing.svg" alt="Washing Icon" class="w-8 h-8" />
                <div>
                  <p class="text-sm text-gray-600">Washing</p>
                  <p class="text-lg font-semibold">
                    <AnimatedNumber value={month.breakdown?.washing?.usage || 0} />L
                  </p>
                  <p class="text-xs text-gray-500">({month.breakdown?.washing?.times || 0} uses)</p>
                </div>
              </div>

              <!-- Other Usage -->
              <div class="flex items-center gap-3 p-4 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 transition-colors duration-300">
                <img src="/other.svg" alt="Other Usage Icon" class="w-8 h-8" />
                <div>
                  <p class="text-sm text-gray-600">Other</p>
                  <p class="text-lg font-semibold">
                    <AnimatedNumber value={(
                      (month.breakdown?.other?.Cooking || 0) +
                      (month.breakdown?.other?.Cleaning || 0) +
                      (month.breakdown?.other?.Gardening || 0) +
                      (month.breakdown?.other?.Drinking || 0)
                    )} />L
                  </p>
                  <p class="text-xs text-gray-500">
                    (
                    {month.breakdown?.other?.Cooking || 0} Cooking, 
                    {month.breakdown?.other?.Cleaning || 0} Cleaning, 
                    {month.breakdown?.other?.Gardening || 0} Gardening, 
                    {month.breakdown?.other?.Drinking || 0} Drinking
                    )
                  </p>
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <p class="text-center text-gray-500">No monthly usage data available.</p>
      {/if}
    </div>

    <!-- Today's Usage -->
    <div class="bg-white rounded-xl p-6 shadow-sm" transition:fade>
      <h2 class="text-xl font-semibold mb-4">Today's Usage</h2>
      {#if $dailyUsage.length > 0}
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <!-- Usage Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <!-- Shower Usage -->
            <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-lg shadow-sm">
              <img src="/shower.svg" alt="Shower Icon" class="w-8 h-8" />
              <div>
                <p class="text-sm text-gray-600">Shower</p>
                <p class="text-lg font-semibold">
                  <AnimatedNumber value={today.breakdown?.shower?.usage || 0} />L
                </p>
                <p class="text-xs text-gray-500">({today.breakdown?.shower?.times || 0} uses)</p>
              </div>
            </div>

            <!-- Toilet Usage -->
            <div class="flex items-center gap-3 p-4 bg-violet-50 rounded-lg shadow-sm">
              <img src="/toilet.svg" alt="Toilet Icon" class="w-8 h-8" />
              <div>
                <p class="text-sm text-gray-600">Toilet</p>
                <p class="text-lg font-semibold">
                  <AnimatedNumber value={today.breakdown?.toilet?.usage || 0} />L
                </p>
                <p class="text-xs text-gray-500">({today.breakdown?.toilet?.times || 0} uses)</p>
              </div>
            </div>

            <!-- Sink Usage -->
            <div class="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg shadow-sm">
              <img src="/sink.svg" alt="Sink Icon" class="w-8 h-8" />
              <div>
                <p class="text-sm text-gray-600">Sink</p>
                <p class="text-lg font-semibold">
                  <AnimatedNumber value={today.breakdown?.sink?.usage || 0} />L
                </p>
                <p class="text-xs text-gray-500">({today.breakdown?.sink?.times || 0} uses)</p>
              </div>
            </div>

            <!-- Washing Usage -->
            <div class="flex items-center gap-3 p-4 bg-orange-50 rounded-lg shadow-sm">
              <img src="/washing.svg" alt="Washing Icon" class="w-8 h-8" />
              <div>
                <p class="text-sm text-gray-600">Washing</p>
                <p class="text-lg font-semibold">
                  <AnimatedNumber value={today.breakdown?.washing?.usage || 0} />L
                </p>
                <p class="text-xs text-gray-500">({today.breakdown?.washing?.times || 0} uses)</p>
              </div>
            </div>

            <!-- Other Usage -->
            <div class="flex items-center gap-3 p-4 bg-red-50 rounded-lg shadow-sm hover:bg-red-100 transition-colors duration-300">
              <img src="/other.svg" alt="Other Usage Icon" class="w-8 h-8" />
              <div>
                <p class="text-sm text-gray-600">Other</p>
                <p class="text-lg font-semibold">
                  <AnimatedNumber value={(
                    (today.breakdown?.other?.Cooking || 0) +
                    (today.breakdown?.other?.Cleaning || 0) +
                    (today.breakdown?.other?.Gardening || 0) +
                    (today.breakdown?.other?.Drinking || 0)
                  )} />L
                </p>
                <p class="text-xs text-gray-500">
                  (
                  {today.breakdown?.other?.Cooking || 0} Cooking, 
                  {today.breakdown?.other?.Cleaning || 0} Cleaning, 
                  {today.breakdown?.other?.Gardening || 0} Gardening, 
                  {today.breakdown?.other?.Drinking || 0} Drinking
                  )
                </p>
              </div>
            </div>
          </div>

          <!-- Total Usage Display -->
          <div class="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 shadow-sm flex flex-col items-center justify-center">
            <p class="text-sm text-gray-600">Total Usage</p>
            <p class="text-4xl font-bold text-gray-800">
              <AnimatedNumber value={today.totalUsage || 0} />L
            </p>
          </div>
        </div>
      {:else}
        <p class="text-center text-gray-500">No daily usage data available.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* Existing styles remain unchanged */

  circle {
    transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .progress-bar {
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Hover Effects for Usage Cards */
  .bg-blue-50:hover,
  .bg-violet-50:hover,
  .bg-emerald-50:hover,
  .bg-orange-50:hover,
  .bg-red-50:hover,
  .bg-green-100:hover,
  .bg-blue-100:hover,
  .bg-yellow-100:hover,
  .bg-purple-100:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  /* Enhanced Styles for Monthly Usage Breakdown Lists */

  /* Usage Cards within Monthly Breakdown */
  .bg-blue-50,
  .bg-violet-50,
  .bg-emerald-50,
  .bg-orange-50,
  .bg-red-50 {
    transition: background-color 0.3s, transform 0.3s;
  }

  /* Adjusted grid for usage cards */
  .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  /* Usage Cards Hover Effects */
  .bg-blue-50:hover,
  .bg-violet-50:hover,
  .bg-emerald-50:hover,
  .bg-orange-50:hover,
  .bg-red-50:hover {
    /* Optional: Adjust background color on hover if needed */
    /* Example for red: */
    /* background-color: rgba(255, 0, 0, 0.1); */
  }

  /* Responsive Adjustments for Monthly Usage Breakdown */
  @media (max-width: 768px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1025px) {
    .grid-cols-1.sm\:grid-cols-2.md\:grid-cols-3.lg\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
</style>
