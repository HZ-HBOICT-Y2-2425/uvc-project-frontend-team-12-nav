<script>
    import { onDestroy } from 'svelte';
    
    // Accept a generic store and customizable button text
    export let store;
    export let endButtonText = "End Shower"; // or "End Shower" depending on your context

    let state;
    const unsubscribe = store.subscribe(value => {
        state = value;
    });

    const startTimer = () => store.startTimer();
    const pauseTimer = () => store.pauseTimer();
    const resumeTimer = () => store.resumeTimer();

    // End usage calls store.endTimer(), which handles logging usage and resetting internally
    const endUsage = async () => {
        await store.endTimer();
        // Additional logic after ending usage if needed
    };

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="action-buttons space-y-4 w-full max-w-xs">
    {#if !state.isRunning && !state.isPaused}
        <!-- Only a Start Timer button is shown here -->
        <button
            on:click={startTimer}
            class="start-btn bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none w-full"
        >
            Start Timer
        </button>
    {:else if state.isRunning}
        <button
            on:click={pauseTimer}
            class="pause-btn bg-yellow-500 text-white py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none w-full"
        >
            Pause
        </button>
        <button
            on:click={endUsage}
            class="end-btn bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none w-full"
        >
            {endButtonText}
        </button>
    {:else if state.isPaused}
        <button
            on:click={resumeTimer}
            class="resume-btn bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none w-full"
        >
            Resume
        </button>
        <button
            on:click={endUsage}
            class="end-btn bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none w-full"
        >
            {endButtonText}
        </button>
    {/if}
</div>
