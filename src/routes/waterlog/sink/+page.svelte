<script>
    import { sinkStore } from '$lib/stores/sinktimerStore.js';

    import Header from '$lib/components/header.svelte';
    import TimerDisplay from '$lib/components/timerDisplay.svelte';
    import QuoteDisplay from '$lib/components/quoteDisplay.svelte';
    import ControlButtons from '$lib/components/controlButtons.svelte';
    import WaterBackground from '$lib/components/waterBackground.svelte';
</script>

<div class="min-h-screen flex flex-col relative">
    <!-- Using Header as is. If you added props like `title` or `showBackButton`, you can adjust here -->
    <Header />

    <div class="flex flex-col items-center justify-center py-10 space-y-6 flex-1">
        <!-- Pass sinkStore's elapsedTime to TimerDisplay -->
        <TimerDisplay timeInSeconds={$sinkStore.elapsedTime} />

        <!-- Use sink quotes -->
        <QuoteDisplay type="sink" />

        <!-- Provide sinkStore to ControlButtons and customize end button text -->
        <ControlButtons store={sinkStore} endButtonText="End Usage" />
    </div>

    <WaterBackground />
</div>

<style>
    :root {
        --water-height: 0%;
    }

    .min-h-screen {
        min-height: 100vh;
    }

    /* Button and layout styling matches original */
    button {
        padding: 12px 24px;
        font-size: 1rem;
        width: 160px;
        text-align: center;
        border-radius: 0.375rem;
        transition: background-color 0.3s ease;
    }
</style>
