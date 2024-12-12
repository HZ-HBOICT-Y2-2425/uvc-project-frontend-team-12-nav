<script>
    import { sinkStore } from '$lib/stores/sinktimerStore.js';

    import Header from '$lib/components/layout/Header.svelte';
    import TimerDisplay from '$lib/components/waterlog/timerDisplay.svelte';
    import QuoteDisplay from '$lib/components/waterlog/quoteDisplay.svelte';
    import ControlButtons from '$lib/components/waterlog/controlButtons.svelte';
    import WaterBackground from '$lib/components/waterlog/waterBackground.svelte';
</script>

<div class="min-h-screen flex flex-col relative">
    <!-- Using Header as is. If you added props like `title` or `showBackButton`, you can adjust here -->
    <Header title="Sink Timer" showBack={true} backRoute="/waterlog"/>

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
</style>
