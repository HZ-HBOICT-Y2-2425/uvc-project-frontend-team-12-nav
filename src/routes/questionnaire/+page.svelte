<!-- src/routes/questionnaire/+page.svelte -->
<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // User Email
  let userEmail = "";

  // Retrieve user email on component mount
  onMount(() => {
    userEmail = localStorage.getItem('userEmail') || '';
    if (!userEmail) {
      alert("User not authenticated. Please sign up or log in.");
      goto('/signup'); // Redirect to signup if not authenticated
    }
  });

  // Questionnaire Responses
  let showerTimes = "";
  let showerDuration = "";
  let toiletFlushes = "";
  let laundryLoads = "";
  let newClothesFrequency = "";
  let recycledClothes = 0;
  let meatConsumption = 0;

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userEmail) {
      alert("User not authenticated. Please sign up or log in.");
      return;
    }

    // Calculate Water Usage
    const waterUsage = calculateWaterUsage({
      showerTimes,
      showerDuration,
      toiletFlushes,
      laundryLoads,
      newClothesFrequency,
      recycledClothes,
      meatConsumption,
    });

    // Prepare Data to Send
    const formData = {
      email: userEmail, // Include user's email to identify them
      showerTimes,
      showerDuration,
      toiletFlushes,
      laundryLoads,
      newClothesFrequency,
      recycledClothes,
      meatConsumption,
      waterUsage, // Add calculated water usage
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch('http://localhost:3012/submit-questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to /home or a success page
        goto('/home');
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('An error occurred during submission.');
    }
  };

  // Function to Calculate Total Water Usage
  const calculateWaterUsage = (data) => {
    let total = 0;

    // Shower Times
    switch (data.showerTimes) {
      case "1-3":
        total += 90; // 30 liters per shower
        break;
      case "4-6":
        total += 180;
        break;
      case "7+":
        total += 300;
        break;
      default:
        break;
    }

    // Shower Duration
    switch (data.showerDuration) {
      case "1-5 minutes":
        total += 30; // 6 liters per minute
        break;
      case "6-15 minutes":
        total += 90;
        break;
      case "16+ minutes":
        total += 120;
        break;
      default:
        break;
    }

    // Toilet Flushes
    switch (data.toiletFlushes) {
      case "1-3":
        total += 30; // 10 liters per flush
        break;
      case "4-6":
        total += 60;
        break;
      case "7+":
        total += 90;
        break;
      default:
        break;
    }

    // Laundry Loads
    switch (data.laundryLoads) {
      case "1-3":
        total += 45; // 15 liters per load
        break;
      case "4-6":
        total += 90;
        break;
      case "7+":
        total += 135;
        break;
      default:
        break;
    }

    // New Clothes Frequency
    switch (data.newClothesFrequency) {
      case "Weekly":
        total += 10;
        break;
      case "Monthly":
        total += 5;
        break;
      case "Yearly":
        total += 2;
        break;
      default:
        break;
    }

    // Recycled Clothes
    total -= data.recycledClothes * 0.1; // Each percentage point saves 0.1 liters

    // Meat Consumption
    total += data.meatConsumption * 0.5; // Each meat consumption increases usage by 0.5 liters

    return total;
  };
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
  <div class="text-center mb-6" in:fly={{ y: -50, duration: 500 }}>
    <img src="/beaver_logo.svg" alt="BeaverWize Logo" class="w-16 mx-auto mb-2" />
    <h1 class="text-2xl font-bold">BeaverWize Questionnaire</h1>
  </div>

  <form on:submit={handleSubmit} class="space-y-6 max-w-lg w-full bg-white p-6 rounded-lg shadow-md" in:fade={{ duration: 500 }}>
    <!-- Shower Times -->
    <div in:fade={{ delay: 100 }}>
      <h2 class="text-lg font-semibold">How many times do you shower a week?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (showerTimes = "1-3")}
          class={`px-4 py-2 rounded-lg ${showerTimes === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (showerTimes = "4-6")}
          class={`px-4 py-2 rounded-lg ${showerTimes === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (showerTimes = "7+")}
          class={`px-4 py-2 rounded-lg ${showerTimes === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
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
          class={`px-4 py-2 rounded-lg ${showerDuration === "1-5 minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          1-5 minutes
        </button>
        <button
          type="button"
          on:click={() => (showerDuration = "6-15 minutes")}
          class={`px-4 py-2 rounded-lg ${showerDuration === "6-15 minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          6-15 minutes
        </button>
        <button
          type="button"
          on:click={() => (showerDuration = "16+ minutes")}
          class={`px-4 py-2 rounded-lg ${showerDuration === "16+ minutes" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
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
          class={`px-4 py-2 rounded-lg ${toiletFlushes === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (toiletFlushes = "4-6")}
          class={`px-4 py-2 rounded-lg ${toiletFlushes === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (toiletFlushes = "7+")}
          class={`px-4 py-2 rounded-lg ${toiletFlushes === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
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
          class={`px-4 py-2 rounded-lg ${laundryLoads === "1-3" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          1-3
        </button>
        <button
          type="button"
          on:click={() => (laundryLoads = "4-6")}
          class={`px-4 py-2 rounded-lg ${laundryLoads === "4-6" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          4-6
        </button>
        <button
          type="button"
          on:click={() => (laundryLoads = "7+")}
          class={`px-4 py-2 rounded-lg ${laundryLoads === "7+" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          7+
        </button>
      </div>
    </div>

    <!-- New Clothes Frequency -->
    <div in:fade={{ delay: 500 }}>
      <h2 class="text-lg font-semibold">How often do you buy new clothes?</h2>
      <div class="flex justify-center space-x-4 mt-2">
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Weekly")}
          class={`px-4 py-2 rounded-lg ${newClothesFrequency === "Weekly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          Weekly
        </button>
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Monthly")}
          class={`px-4 py-2 rounded-lg ${newClothesFrequency === "Monthly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
          transition:scale={{ duration: 100 }}
        >
          Monthly
        </button>
        <button
          type="button"
          on:click={() => (newClothesFrequency = "Yearly")}
          class={`px-4 py-2 rounded-lg ${newClothesFrequency === "Yearly" ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'}`}
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

    <!-- Action Buttons -->
    <div class="flex justify-center space-x-4" in:fade={{ delay: 800 }}>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg" transition:scale={{ duration: 100 }}>Submit</button>
      <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg" transition:scale={{ duration: 100 }} on:click={() => {
        // Reset the form
        showerTimes = "";
        showerDuration = "";
        toiletFlushes = "";
        laundryLoads = "";
        newClothesFrequency = "";
        recycledClothes = 0;
        meatConsumption = 0;
      }}>Cancel</button>
    </div>
  </form>
</main>

<style>
  main {
    font-family: sans-serif;
  }
  button {
    transition: all 0.2s;
  }
  button:hover {
    opacity: 0.9;
  }
</style>
