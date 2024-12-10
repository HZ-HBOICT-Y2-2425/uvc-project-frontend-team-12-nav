<!-- src/routes/waterlog/shower/+page.svelte -->
<script>
  import Header from '$lib/components/header.svelte';
  import QuoteDisplay from '$lib/components/quoteDisplay.svelte';
  import TimerDisplay from '$lib/components/timerDisplay.svelte';
  import ProgressBar from '$lib/components/progressBar.svelte';
  import TimeSelector from '$lib/components/timeSelector.svelte';
  import ControlButtons from '$lib/components/controlButtons.svelte';
  import StatisticsButton from '$lib/components/statisticsButton.svelte';

  import { timerStore } from '$lib/stores/timerStore.js';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';

  // Automatically subscribe to timerStore with $ syntax
  $: isRunning = $timerStore.isRunning;

  onMount(() => {
    timerStore.initializeAlarm();
  });

  // Cleanup the store when the component is destroyed
  onDestroy(() => {
    timerStore.destroy();
  });
</script>

<div class="app-container {isRunning ? 'shower-bg' : ''} w-full">
  <Header />

  <div class="main-content flex flex-col items-center justify-center space-y-6">
    <!-- Pass type="shower" to display shower quotes -->
    <QuoteDisplay type="shower" />

    <!-- Pass timeInSeconds from the store's remainingTime -->
    <TimerDisplay timeInSeconds={$timerStore.remainingTime} />

    <!-- ProgressBar remains unchanged if it already derives from timerStore internally -->
    <ProgressBar />

    <!-- TimeSelector remains as is, assuming it interacts with timerStore as before -->
    <TimeSelector />

    <!-- Pass timerStore and the desired endButtonText to ControlButtons -->
    <ControlButtons store={timerStore} endButtonText="End Shower" />

    <StatisticsButton />
  </div>
</div>

<style>
  .app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Ensures content starts at the top */
    align-items: center; /* Center horizontally */
    width: 100vw; /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    background: #e6f7ff;
    padding: 0; /* Remove any padding to avoid extra space */
    overflow: hidden;
  }

  /* Shower background animation when running */
  .shower-bg::before,
  .shower-bg::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: #1821c7;
    border-radius: 50%;
    opacity: 0.8;
    animation: fall linear infinite;
  }

  .shower-bg::before {
    top: -10%;
    left: 30%;
    animation-duration: 1.5s;
  }

  .shower-bg::after {
    top: -20%;
    left: 70%;
    animation-duration: 2.5s;
  }

  @keyframes fall {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(100vh) scale(0.8);
    }
  }

  /* Additional Styling */
  .header {
    width: 100%;
  }

  .quote-container {
    max-width: 400px;
  }

  .timer-display {
    font-family: 'Arial', sans-serif; /* Preserved Font */
    color: #1a202c; /* Tailwind's text-gray-800 equivalent */
  }

  .progress-container {
    position: relative;
  }

  .progress-bar {
    transition: width 1s linear;
  }

  .time-selector button {
    font-size: 1.5rem;
  }

  .action-buttons button,
  .statistics-buttons button {
    font-size: 1rem;
  }

  .statistics-buttons a {
    text-decoration: none;
  }
</style>
