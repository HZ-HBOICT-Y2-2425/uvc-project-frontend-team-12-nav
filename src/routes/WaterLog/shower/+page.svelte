<script>
  let showerTime = 5; // Default shower time in minutes
  let timer;
  let remainingTime = showerTime * 60; // Convert to seconds
  let isRunning = false;
  let isPaused = false;
  let totalShowerTime = 0; // Track total time spent in seconds

  // Format seconds into HH:MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  // Function to update remaining time when showerTime changes
  const updateRemainingTime = () => {
    remainingTime = showerTime * 60;
  };

  const startTimer = () => {
    if (isPaused) {
      isPaused = false;
    }
    isRunning = true;
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Shower time's up!");
        totalShowerTime += showerTime * 60; // Add completed time
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timer);
    isRunning = false;
    isPaused = true;
  };

  const endTimer = () => {
    clearInterval(timer);
    isRunning = false;
    totalShowerTime += showerTime * 60 - remainingTime; // Add remaining time to total
    remainingTime = showerTime * 60; // Reset timer
  };

  const submitData = () => {
    // Mock submission logic
    alert(`Total shower time for today: ${Math.floor(totalShowerTime / 60)} minutes.`);
    totalShowerTime = 0; // Reset total after submission
  };
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10">
  <!-- Page Header -->
  <h1 class="text-3xl font-bold text-green-600 mb-6">Shower Timer</h1>

  <!-- Timer Display -->
  <div class="text-4xl font-bold text-black-600 mb-6">
    {formatTime(remainingTime)}
  </div>

  <!-- Progress Bar Container (Centered) -->
  <div class="w-full max-w-xs bg-gray-200 rounded-full h-4 mb-6">
    <div class="bg-green-500 h-4 rounded-full" style="width: {((showerTime * 60 - remainingTime) / (showerTime * 60)) * 100}%"></div>
  </div>

  <!-- Adjustable Time Selector -->
  <div class="flex items-center mb-6 space-x-4">
    <button on:click={() => {showerTime = Math.min(60, showerTime + 1); updateRemainingTime();}} class="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none">
      &#8593; 
    </button>
    <span class="text-xl font-bold">{showerTime} min</span>
    <button on:click={() => {showerTime = Math.max(1, showerTime - 1); updateRemainingTime();}} class="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none">
      &#8595;
    </button>
  </div>

  <!-- Start, Pause, End Buttons -->
  <div class="space-x-4">
    {#if !isRunning}
      <button on:click={startTimer} class="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
        Start Timer
      </button>
    {:else}
      {#if !isPaused}
        <button on:click={pauseTimer} class="bg-yellow-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none">
          Pause
        </button>
      {:else}
        <button on:click={startTimer} class="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
          Resume
        </button>
      {/if}
      <button on:click={endTimer} class="bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
        End Shower
      </button>
    {/if}
  </div>

  <!-- Submit Data Button -->
  <div class="mt-6">
    <button on:click={submitData} class="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
      Submit Data
    </button>
  </div>

  <!-- Statistics and Back Buttons -->
  <div class="mt-6 space-x-4">
    <a href="/waterlog/shower/showerstatistics">
    <button class="bg-gray-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
      View Statistics
    </button>
    </a>

    <button on:click={() => window.history.back()} class="bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
      Back to Waterlog
    </button>
  </div>
</div>

<style>
  /* Styling for the timer and buttons */
  button {
    transition: background-color 0.3s ease;
  }
  .max-w-xs {
    max-width: 300px; /* Adjust width for the progress bar container */
  }
</style>
