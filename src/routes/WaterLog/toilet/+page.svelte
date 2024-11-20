<script>
    import { onMount, onDestroy } from "svelte";

    let usageCount = 0; // Tracks the number of times the bathroom was used
    let flushCount = 0; // Tracks the number of times the toilet was flushed
    let dayTotalUsage = 0; // Total usage count for the day
    let dayTotalFlushes = 0; // Total flushes count for the day

    // Load saved counts from localStorage if available (only in the browser)
    onMount(() => {
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            const savedUsage = localStorage.getItem('toiletUsage');
            if (savedUsage) {
                usageCount = parseInt(savedUsage);
            }

            const savedFlushes = localStorage.getItem('toiletFlushes');
            if (savedFlushes) {
                flushCount = parseInt(savedFlushes);
            }

            const savedDayUsage = localStorage.getItem('dayTotalUsage');
            if (savedDayUsage) {
                dayTotalUsage = parseInt(savedDayUsage);
            }

            const savedDayFlushes = localStorage.getItem('dayTotalFlushes');
            if (savedDayFlushes) {
                dayTotalFlushes = parseInt(savedDayFlushes);
            }
        }
    });

    // Increase bathroom usage count
    const incrementUsage = () => {
        usageCount++;
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            localStorage.setItem('toiletUsage', usageCount); // Save the updated usage count
        }
    };

    // Decrease bathroom usage count
    const decrementUsage = () => {
        if (usageCount > 0) {
            usageCount--; // Decrease the usage count
            if (typeof window !== 'undefined') {  // Check if we are in the browser
                localStorage.setItem('toiletUsage', usageCount); // Save the updated usage count
            }
        }
    };

    // Increase flush count
    const incrementFlush = () => {
        flushCount++;
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            localStorage.setItem('toiletFlushes', flushCount); // Save the updated flush count
        }
    };

    // Decrease flush count
    const decrementFlush = () => {
        if (flushCount > 0) {
            flushCount--; // Decrease the flush count
            if (typeof window !== 'undefined') {  // Check if we are in the browser
                localStorage.setItem('toiletFlushes', flushCount); // Save the updated flush count
            }
        }
    };

    // Submit the daily data and reset for a new day
    const submitDayData = () => {
        alert(`Total Bathroom Uses Today: ${dayTotalUsage + usageCount} times\nTotal Flushes Today: ${dayTotalFlushes + flushCount} times`);
        
        // Reset for a new day
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            localStorage.removeItem('toiletUsage');
            localStorage.removeItem('toiletFlushes');
            localStorage.removeItem('dayTotalUsage');
            localStorage.removeItem('dayTotalFlushes');
        }

        dayTotalUsage = 0;
        dayTotalFlushes = 0;
        usageCount = 0;
        flushCount = 0;
    };

    // Go back to the waterlog page
    const goBack = () => {
        window.history.back(); // Goes back to the previous page in the history
    };

    onDestroy(() => {
        // Save daily totals in localStorage before the component is destroyed (only in the browser)
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            dayTotalUsage += usageCount;
            dayTotalFlushes += flushCount;
            localStorage.setItem('dayTotalUsage', dayTotalUsage);
            localStorage.setItem('dayTotalFlushes', dayTotalFlushes);
        }
    });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-8">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Toilet Usage Tracker</h1>

    <!-- Usage and Flush Counters -->
    <div class="space-y-8 mb-8">
        <!-- Bathroom Usage Counter -->
        <div class="flex flex-col items-center space-y-4">
            <h2 class="text-2xl font-bold text-black-600">Bathroom Usage</h2>
            <div class="flex items-center space-x-6 text-2xl font-bold text-green-600">
                <!-- Left Arrow (Decreases Usage Count) -->
                <button on:click={decrementUsage} class="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none">
                    &#8592; <!-- Left arrow -->
                </button>
                <div>{usageCount}</div>
                <!-- Right Arrow (Increases Usage Count) -->
                <button on:click={incrementUsage} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                    &#8594; <!-- Right arrow -->
                </button>
            </div>
        </div>

        <!-- Flush Counter -->
        <div class="flex flex-col items-center space-y-4">
            <h2 class="text-2xl font-bold text-black-600">Toilet Flushes</h2>
            <div class="flex items-center space-x-6 text-2xl font-bold text-green-600">
                <!-- Left Arrow (Decreases Flush Count) -->
                <button on:click={decrementFlush} class="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none">
                    &#8592; <!-- Left arrow -->
                </button>
                <div>{flushCount}</div>
                <!-- Right Arrow (Increases Flush Count) -->
                <button on:click={incrementFlush} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                    &#8594; <!-- Right arrow -->
                </button>
            </div>
        </div>
    </div>

    <!-- Back Button -->
    <div>
        <button on:click={goBack} class="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
            Back to Waterlog
        </button>
    </div>

    <!-- Submit Button -->
    <div>
        <button on:click={submitDayData} class="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
            Submit Daily Data
        </button>
    </div>

    <!-- Toilet Beaver Image -->
    <div class="mt-6 mb-6 flex justify-center">
        <img src="/toiletbeaver.svg" alt="Sink Beaver" class="w-64 h-auto object-contain" />
    </div>
</div>

<style>
    /* Styling for the counters and buttons */
    button {
        transition: background-color 0.3s ease;
    }

    h2 {
        text-align: center;
    }

    .space-y-8 {
        space-y: 2rem;
    }
</style>
