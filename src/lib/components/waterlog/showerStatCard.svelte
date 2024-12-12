<script>
  import BottleVisualization from '/src/lib/components/waterlog/BottleVisualisation.svelte'; 

  // Define the props expected by this component
  export let title = 'Title'; // e.g., "Today's Shower Time"
  export let formattedTime = '0h 0m 0s';
  export let waterUsage = 0; // in liters
  export let bottleCount = 0; // Number of bottles to display
</script>

<div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
  <h2 class="text-2xl font-bold text-green-600">{title}</h2>
  <p class="text-xl mt-2">{formattedTime}</p>
  <p class="text-lg text-gray-600">{waterUsage} liters of water used</p>
  
  <!-- Bottles Visualization within the card -->
  <BottleVisualization count={bottleCount} />
</div>

<style>
  /* Optional: Add any specific styles for the card here */
</style>
