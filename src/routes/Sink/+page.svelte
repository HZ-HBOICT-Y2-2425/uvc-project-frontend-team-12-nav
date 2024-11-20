<script>
    import { onMount, onDestroy } from "svelte";

    let timer;
    let elapsedTime = 0; // Total time spent on the sink (in seconds)
    let isRunning = false; // To track if the timer is running
    let dayTotalTime = 0; // To track total time for the day

    // Load saved time data from localStorage if available
    onMount(() => {
        const savedTime = localStorage.getItem('sinkTime');
        if (savedTime) {
            elapsedTime = parseInt(savedTime);
        }

        const savedDayTotal = localStorage.getItem('dayTotalTime');
        if (savedDayTotal) {
            dayTotalTime = parseInt(savedDayTotal);
        }
    });

    // Start the timer
    const startTimer = () => {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                elapsedTime++;
                localStorage.setItem('sinkTime', elapsedTime); // Save the elapsed time to localStorage
            }, 1000);
        }
    };

    // Pause the timer
    const pauseTimer = () => {
        clearInterval(timer);
        isRunning = false;
    };

    // End the timer and record the total time for the day
    const endUsage = () => {
        clearInterval(timer);
        isRunning = false;
        dayTotalTime += elapsedTime; // Add the elapsed time to the day's total
        localStorage.setItem('dayTotalTime', dayTotalTime); // Save to localStorage

        // Reset the timer for the next session
        elapsedTime = 0;
        localStorage.setItem('sinkTime', elapsedTime); // Reset saved time
    };

    // Submit the total time for the day (could be displayed or saved in localStorage)
    const submitDayTotal = () => {
        alert(`Total time for today: ${formatTime(dayTotalTime)}`);
        // Reset for a new day
        localStorage.removeItem('sinkTime');
        localStorage.removeItem('dayTotalTime');
        dayTotalTime = 0;
        elapsedTime = 0;
    };

    // Format seconds into HH:MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };

    // Go back to the waterlog page
    const goBack = () => {
        window.history.back(); // Go back to the previous page in the history
    };

    onDestroy(() => {
        clearInterval(timer); // Clean up the interval when the component is destroyed
    });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-6">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Sink Timer</h1>

    <!-- Timer Display -->
    <div class="text-4xl font-bold text-green-600 mb-6">
        {formatTime(elapsedTime)}
    </div>

    <!-- Start, Pause, and End Buttons -->
    <div class="space-x-4 flex mb-6">
        {#if !isRunning}
            <button on:click={startTimer} class="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
                Start Timer
            </button>
        {:else}
            <button on:click={pauseTimer} class="bg-yellow-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none">
                Pause Timer
            </button>
        {/if}

        <button on:click={endUsage} class="bg-red-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
            End Usage
        </button>
    </div>

    <!-- Submit and Back Buttons in a Horizontal Layout -->
    <div class="flex space-x-4 mb-6">
        <button on:click={submitDayTotal} class="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
            Submit Total Time
        </button>

        <button on:click={goBack} class="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
            Back to Waterlog
        </button>
    </div>

    <!-- Sink Beaver Image -->
    <div class="mt-6 mb-6 flex justify-center">
        <img src="/sinkbeaver.svg" alt="Sink Beaver" class="w-64 h-auto object-contain" />
    </div>
</div>

<style>
    /* Styling for the timer and buttons */
    button {
        transition: background-color 0.3s ease;
    }
</style>
