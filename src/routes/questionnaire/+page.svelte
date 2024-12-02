<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';
  // import { tweened } from 'svelte/motion';
  // import { cubicOut } from 'svelte/easing';

  let showerTimes = "";
  let showerDuration = "";
  let toiletFlushes = "";
  let laundryLoads = "";
  let newClothesFrequency = "";
  let recycledClothes = 0;
  let meatConsumption = 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      showerTimes,
      showerDuration,
      toiletFlushes,
      laundryLoads,
      newClothesFrequency,
      recycledClothes,
      meatConsumption,
    };
    console.log("Form Data:", formData);
    // Add form submission logic here
  };
</script>

<main class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
  <div class="text-center mb-6" in:fly={{ y: -50, duration: 500 }}>
    <img src="/beaver_logo.svg" alt="BeaverWize Logo" class="w-16 mx-auto mb-2" />
    <h1 class="text-2xl font-bold">BeaverWize</h1>
  </div>

  <form on:submit={handleSubmit} class="space-y-6 max-w-lg w-full bg-white p-6 rounded-lg shadow-md text-center" in:fade={{ duration: 500 }}>
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

    <div in:fade={{ delay: 600 }}>
      <h2 class="text-lg font-semibold">What percentage of your clothes are recycled/second-hand?</h2>
      <input type="range" bind:value={recycledClothes} min="0" max="100" class="w-full mt-2" />
      <p>{recycledClothes}%</p>
    </div>

    <div in:fade={{ delay: 700 }}>
      <h2 class="text-lg font-semibold">How many times per week do you eat meat?</h2>
      <input type="range" bind:value={meatConsumption} min="0" max="30" class="w-full mt-2" />
      <p>{meatConsumption} times</p>
    </div>

    <div class="flex justify-center space-x-4" in:fade={{ delay: 800 }}>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg" transition:scale={{ duration: 100 }} on:click={()=>goto("/home")}>Submit</button>
      <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg" transition:scale={{ duration: 100 }}>Cancel</button>
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
