<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Reactive store for the water level
  const waterLevel = writable(0); // Current water level
  const waterGoal = 20000; // Community goal

  class ProgressTracker {
    private goal: number;
    private progressCircle: SVGCircleElement | null;

    constructor(circleId: string, goal: number) {
      this.progressCircle = document.getElementById(circleId) as SVGCircleElement;
      this.goal = goal;
    }

    updateProgress(value: number): void {
      if (this.progressCircle) {
        const radius = this.progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (value / this.goal) * circumference;
        this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.progressCircle.style.strokeDashoffset = `${offset}`;
      }
    }
  }

  let tracker: ProgressTracker | null = null;

  onMount(() => {
    tracker = new ProgressTracker('progressCircle', waterGoal);

    // Fetch the current water level from the database
    fetch('/api/water-level') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        waterLevel.set(data.currentWaterLevel || 0);
      })
      .catch((error) => {
        console.error('Error fetching water level:', error);
      });

    // Reactively update the circle when the water level changes
    waterLevel.subscribe((level) => {
      if (tracker) {
        tracker.updateProgress(level);
      }
    });
  });

  // Function to add water (this should update the database)
  const addWater = () => {
    fetch('/api/add-water', { method: 'POST', body: JSON.stringify({ amount: 1000 }) }) // Replace with your API endpoint and payload
      .then((response) => response.json())
      .then((data) => {
        waterLevel.set(data.newWaterLevel); // Update the store with the new level
      })
      .catch((error) => {
        console.error('Error adding water:', error);
      });
  };
</script>

<main class="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-green-100">
  <!-- Placeholder for BeaverWize Logo -->
  <div class="mt-6">
    <a href="#" class="block">
      <img src="/beaver_logo_community.svg" alt="BeaverWize Logo" class="w-32 mx-auto" />
    </a>
  </div>

  <!-- Community Section -->
  <section class="bg-green-200 w-full max-w-md py-6 rounded-lg shadow-md text-center mt-4">
    <a href="#" class="flex flex-col items-center">
      <img src="/User.svg" alt="Community Icon" class="w-12 h-12 mb-2" />
      <span class="text-lg font-semibold text-gray-800">HZ Community</span>
    </a>
  </section>

  <!-- Progress Section -->
  <section class="flex flex-col items-center mt-12">
    <div class="relative w-72 h-72 flex items-center justify-center">
      <svg class="absolute top-0 left-0 w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="110"
          fill="none"
          stroke="#e5e5e5"
          stroke-width="6"
        ></circle>
        <circle
          id="progressCircle"
          cx="50%"
          cy="50%"
          r="110"
          fill="none"
          stroke="#3b82f6"
          stroke-width="6"
          stroke-linecap="round"
          style="stroke-dasharray: 690; stroke-dashoffset: 0; transition: stroke-dashoffset 0.3s;"
        ></circle>
      </svg>
      <div id="progressText" class="absolute text-center text-gray-800 font-semibold">
        <span class="text-sm">Community Goal</span>
        <br />
        <span class="text-2xl font-bold">
          {$waterLevel.toLocaleString()} / {waterGoal.toLocaleString()} Liters
        </span>
      </div>
    </div>

    <!-- Add Water Button -->
    <button
      class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      on:click={addWater}
    >
      Add Water
    </button>
  </section>

  <!-- Footer -->
  <footer class="w-full bg-green-200 py-4 mt-auto shadow-inner">
    <div class="flex justify-around items-center">
      <button
        class="flex flex-col items-center justify-center text-sm text-gray-800 w-20 h-20"
        on:click={() => alert('Leave Community')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Leave Community
      </button>
      <button
        class="flex flex-col items-center justify-center text-sm text-gray-800 w-20 h-20"
        on:click={() => alert('Community Members')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Community Members
      </button>
      <button
        class="flex flex-col items-center justify-center text-sm text-gray-800 w-20 h-20"
        on:click={() => alert('Invite')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8m-4 4v-8" />
        </svg>
        Invite
      </button>
      <button
        class="flex flex-col items-center justify-center text-sm text-gray-800 w-20 h-20"
        on:click={() => alert('Community Settings')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Settings
      </button>
    </div>
  </footer>
</main>

<!-- GET /api/water-level:

javascript
Copy code
app.get('/api/water-level', (req, res) => {
  res.json({ currentWaterLevel: 8000 }); // Replace with your database logic
});
POST /api/add-water:

javascript
Copy code
app.post('/api/add-water', (req, res) => {
  const newWaterLevel = 8000 + 1000; // Replace with your database logic
  res.json({ newWaterLevel });
}); -->
