<script>
    import { gardeningTime, isTimerRunning, categoryData } from '$lib/stores/otherStore.js';
    import { onDestroy } from 'svelte';
    import { get } from 'svelte/store';

    let timerInterval;

    const start = () => {
        if (!get(isTimerRunning)) {
            isTimerRunning.set(true);
            timerInterval = setInterval(() => {
                gardeningTime.update(n => n + 1);
            }, 1000);
        }
    };

    const stop = () => {
        if (get(isTimerRunning)) {
            isTimerRunning.set(false);
            clearInterval(timerInterval);
        }
    };

    const reset = () => {
        stop();
        gardeningTime.set(0);
    };

    onDestroy(() => {
        clearInterval(timerInterval);
    });

    // Format time
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
</script>

<div class="w-full flex flex-col items-center space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">
        Let's Start Watering The Garden!
    </h2>
    <!-- Clock Encapsulated in a White Card -->
    <div class="bg-white p-4 rounded-lg shadow-md">
        <div class="text-4xl text-gray-800">
            {formatTime($gardeningTime)}
        </div>
    </div>
    <div class="flex space-x-4">
        {#if !$isTimerRunning}
            <button on:click={start} class="bg-green-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-500 focus:outline-none transition duration-300">
                Start
            </button>
        {:else}
            <button on:click={stop} class="bg-yellow-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none transition duration-300">
                Stop
            </button>
        {/if}
        <button on:click={reset} class="bg-red-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-500 focus:outline-none transition duration-300">
            Reset
        </button>
    </div>
</div>
