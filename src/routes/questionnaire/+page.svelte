<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let showerTimes = "";
  let showerDuration = "";
  let toiletFlushes = "";
  let laundryLoads = "";
  let newClothesFrequency = "";
  let recycledClothes = 0;
  let meatConsumption = 0;
  let error = "";

  // When the component mounts, check if the user is logged in
  onMount(() => {
    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    console.log('Component mounted with user data:', { userEmail, userId });

    if (!userEmail || !userId) {
      console.log('No user data found, redirecting to login');
      goto('/login');
    }
  });

  /**
   * Calculate the total water usage based on user inputs
   */
  function calculateWaterUsage() {
    let waterUsage = 0;

    // Shower water usage
    switch(showerTimes) {
      case "1-3": waterUsage += 3 * 50; break;
      case "4-6": waterUsage += 5 * 50; break;
      case "7+": waterUsage += 7 * 50; break;
    }
    
    // Shower duration multiplier
    switch(showerDuration) {
      case "1-5 minutes": waterUsage *= 1; break;
      case "6-15 minutes": waterUsage *= 2; break;
      case "16+ minutes": waterUsage *= 3; break;
    }

    // Toilet flushes
    switch(toiletFlushes) {
      case "1-3": waterUsage += 3 * 6 * 7; break;
      case "4-6": waterUsage += 5 * 6 * 7; break;
      case "7+": waterUsage += 8 * 6 * 7; break;
    }

    // Laundry loads
    switch(laundryLoads) {
      case "1-3": waterUsage += 2 * 50; break;
      case "4-6": waterUsage += 5 * 50; break;
      case "7+": waterUsage += 8 * 50; break;
    }

    // Subtract some usage for recycled clothes
    waterUsage -= (recycledClothes / 100) * 100;

    // Add impact from meat consumption
    waterUsage += meatConsumption * 1000;

    console.log('Calculated water usage:', waterUsage);
    return Math.round(waterUsage);
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    error = "";

    const userEmail = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');

    console.log('Submitting questionnaire for user:', {
      email: userEmail,
      userId,
      localStorage: { ...localStorage }
    });

    // Check for user session
    if (!userEmail || !userId) {
      error = "User session expired. Please log in again.";
      console.error('No user data found');
      goto('/login');
      return;
    }

    // Validate form fields
    if (
      !showerTimes ||
      !showerDuration ||
      !toiletFlushes ||
      !laundryLoads ||
      !newClothesFrequency
    ) {
      error = "Please fill in all fields";
      return;
    }

    // Calculate water usage
    const waterUsage = calculateWaterUsage();
    console.log('Calculated water usage:', waterUsage);

    // Prepare submission data
    // -- IMPORTANT: add userId in the body
    const submissionData = {
      userId, // <--- this is crucial so the backend can find the correct user
      email: userEmail, 
      showerTimes,
      showerDuration,
      toiletFlushes,
      laundryLoads,
      newClothesFrequency,
      recycledClothes,
      meatConsumption,
      waterUsage
    };

    console.log('Submitting data:', submissionData);

    // Send data to the server
    try {
      const response = await fetch('http://localhost:3012/submit-questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      console.log('Response status:', response.status);

      // Read raw response text (for debugging)
      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      // Attempt to parse JSON
      let result;
      try {
        result = JSON.parse(rawResponse);
      } catch (e) {
        console.error('Failed to parse response:', e);
        throw new Error('Invalid response format');
      }

      if (response.ok) {
        console.log('Questionnaire submitted successfully:', result);
        goto('/home');
      } else {
        error = result.message || 'Failed to submit questionnaire';
        console.error('Submission error:', error);
      }
    } catch (err) {
      console.error('Error submitting questionnaire:', err);
      error = 'Failed to submit questionnaire. Please try again.';
    }
  };
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
  <div class="text-center mb-6" in:fly={{ y: -50, duration: 500 }}>
    <img src="/beaver_logo.svg" alt="BeaverWize Logo" class="w-16 mx-auto mb-2" />
    <h1 class="text-2xl font-bold">BeaverWize</h1>
  </div>

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 max-w-lg w-full"
      role="alert"
    >
      <span class="block sm:inline">{error}</span>
    </div>
  {/if}

  <form on:submit={handleSubmit} class="space-y-6 max-w-lg w-full bg-white p-6 rounded-lg shadow-md text-center" in:fade={{ duration: 500 }}>
    <!-- Shower Times -->
    <div in:fade={{ delay: 100 }}>
      <h2 class="text-lg font-semibold">How many times do you shower a week?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (showerTimes = "1-3")}
          class={`px-4 py-2 rounded-lg ${
            showerTimes === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (showerTimes = "4-6")}
          class={`px-4 py-2 rounded-lg ${
            showerTimes === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (showerTimes = "7+")}
          class={`px-4 py-2 rounded-lg ${
            showerTimes === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          7+
        </button>
      </div>
    </div>

    <!-- Shower Duration -->
    <div in:fade={{ delay: 200 }}>
      <h2 class="text-lg font-semibold">How long do you shower for?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (showerDuration = "1-5 minutes")}
          class={`px-4 py-2 rounded-lg ${
            showerDuration === "1-5 minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          1-5 minutes
        </button>
        <button
          type="button"
          on:click={() => (showerDuration = "6-15 minutes")}
          class={`px-4 py-2 rounded-lg ${
            showerDuration === "6-15 minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          6-15 minutes
        </button>
        <button
          type="button"
          on:click={() => (showerDuration = "16+ minutes")}
          class={`px-4 py-2 rounded-lg ${
            showerDuration === "16+ minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          16+ minutes
        </button>
      </div>
    </div>

    <!-- Toilet Flushes -->
    <div in:fade={{ delay: 300 }}>
      <h2 class="text-lg font-semibold">How often do you flush the toilet in a day?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (toiletFlushes = "1-3")}
          class={`px-4 py-2 rounded-lg ${
            toiletFlushes === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (toiletFlushes = "4-6")}
          class={`px-4 py-2 rounded-lg ${
            toiletFlushes === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (toiletFlushes = "7+")}
          class={`px-4 py-2 rounded-lg ${
            toiletFlushes === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          7+
        </button>
      </div>
    </div>

    <!-- Laundry Loads -->
    <div in:fade={{ delay: 400 }}>
      <h2 class="text-lg font-semibold">How many loads of laundry do you do per week?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (laundryLoads = "1-3")}
          class={`px-4 py-2 rounded-lg ${
            laundryLoads === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (laundryLoads = "4-6")}
          class={`px-4 py-2 rounded-lg ${
            laundryLoads === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (laundryLoads = "7+")}
          class={`px-4 py-2 rounded-lg ${
            laundryLoads === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          7+
        </button>
      </div>
    </div>

    <!-- Clothes Frequency -->
    <div in:fade={{ delay: 500 }}>
      <h2 class="text-lg font-semibold">How often do you buy new clothes?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Weekly")}
          class={`px-4 py-2 rounded-lg ${
            newClothesFrequency === "Weekly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          Weekly
        </button>
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Monthly")}
          class={`px-4 py-2 rounded-lg ${
            newClothesFrequency === "Monthly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          Monthly
        </button>
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Yearly")}
          class={`px-4 py-2 rounded-lg ${
            newClothesFrequency === "Yearly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
          }`}
          transition:scale={{ duration: 100 }}
        >
          Yearly
        </button>
      </div>
    </div>

    <!-- Recycled Clothes -->
    <div in:fade={{ delay: 600 }}>
      <h2 class="text-lg font-semibold">What percentage of your clothes are recycled/second-hand?</h2>
      <input type="range" bind:value={recycledClothes} min="0" max="100" class="w-full mt-2" />
      <p>{recycledClothes}%</p>
    </div>

    <!-- Meat Consumption -->
    <div in:fade={{ delay: 700 }}>
      <h2 class="text-lg font-semibold">How many times per week do you eat meat?</h2>
      <input type="range" bind:value={meatConsumption} min="0" max="30" class="w-full mt-2" />
      <p>{meatConsumption} times</p>
    </div>

    <!-- Submit and Skip Buttons -->
    <div class="flex justify-center space-x-4" in:fade={{ delay: 800 }}>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        transition:scale={{ duration: 100 }}
      >
        Submit
      </button>
      <button
        type="button"
        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        transition:scale={{ duration: 100 }}
        on:click={() => goto('/home')}
      >
        Skip
      </button>
    </div>
  </form>
</main>
