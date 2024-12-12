<script>
  import Header from '$lib/components/layout/Header.svelte';
  import QuoteDisplay from '$lib/components/waterlog/quoteDisplay.svelte';
  import TimerDisplay from '$lib/components/waterlog/timerDisplay.svelte';
  import ProgressBar from '$lib/components/waterlog/progressBar.svelte';
  import TimeSelector from '$lib/components/waterlog/timeSelector.svelte';
  import ControlButtons from '$lib/components/waterlog/controlButtons.svelte';
  import StatisticsButton from '$lib/components/waterlog/statisticsButton.svelte';

  import { timerStore } from '$lib/stores/timerStore.js';
  import { onDestroy, onMount } from 'svelte';

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

<div class="app-container {isRunning ? 'shower-bg' : ''}">
  <Header title="Shower Timer" showBack={true} backRoute="/waterlog"/>

  <div class="main-content">
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
    align-items: center; /* Center horizontally */
    width: 100vw; /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    background: #e6f7ff;
    padding: 0; /* Remove any padding to avoid extra space */
    overflow: hidden;
  }

  .main-content {
    flex: 1; /* Allow main-content to grow and take available space */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Center vertically within main-content */
    gap: 1.5rem; /* Equivalent to space-y-6 for spacing between elements */
    width: 100%; /* Ensure main-content takes full width */
    max-width: 600px; /* Optional: Limit the maximum width for better readability */
    padding: 1rem; /* Optional: Add some padding */
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
</style>
