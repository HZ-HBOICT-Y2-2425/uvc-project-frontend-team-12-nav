<script>
    import { onMount, onDestroy } from "svelte";

    let washCount = 0; // Tracks the number of times washing occurred
    let dayTotalWashes = 0; // Total wash count for the day

    // Load saved counts from localStorage if available (only in the browser)
    onMount(() => {
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            const savedWashes = localStorage.getItem('washCount');
            if (savedWashes) {
                washCount = parseInt(savedWashes);
            }

            const savedDayWashes = localStorage.getItem('dayTotalWashes');
            if (savedDayWashes) {
                dayTotalWashes = parseInt(savedDayWashes);
            }
        }
    });

    // Increase wash count
    const incrementWash = () => {
        washCount++;
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            localStorage.setItem('washCount', washCount); // Save the updated wash count
        }
    };

    // Decrease wash count
    const decrementWash = () => {
        if (washCount > 0) {
            washCount--; // Decrease the wash count
            if (typeof window !== 'undefined') {  // Check if we are in the browser
                localStorage.setItem('washCount', washCount); // Save the updated wash count
            }
        }
    };

    // Submit the daily data and reset for a new day
    const submitDayData = () => {
        alert(`Total Washes Today: ${dayTotalWashes + washCount} times`);
        
        // Reset for a new day
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            localStorage.removeItem('washCount');
            localStorage.removeItem('dayTotalWashes');
        }

        dayTotalWashes = 0;
        washCount = 0;
    };

    // Go back to the waterlog page
    const goBack = () => {
        window.history.back(); // Goes back to the previous page in the history
    };

    onDestroy(() => {
        // Save daily totals in localStorage before the component is destroyed (only in the browser)
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            dayTotalWashes += washCount;
            localStorage.setItem('dayTotalWashes', dayTotalWashes);
        }
    });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-8">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Washing Tracker</h1>

    <!-- Wash Counter -->
    <div class="space-y-8 mb-8">
        <!-- Wash Count -->
        <div class="flex flex-col items-center space-y-4">
            <h2 class="text-2xl font-bold text-black-600">Washing Machine Usages</h2>
            <div class="flex items-center space-x-6 text-2xl font-bold text-green-600">
                <!-- Left Arrow (Decreases Wash Count) -->
                <button on:click={decrementWash} class="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none">
                    &#8592; <!-- Left arrow -->
                </button>
                <div>{washCount}</div>
                <!-- Right Arrow (Increases Wash Count) -->
                <button on:click={incrementWash} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
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

    <!-- Washing Beaver Image -->
    <div class="mt-6 mb-6 flex justify-center">
        <img src="/washingbeaver.svg" alt="washing Beaver" class="w-64 h-auto object-contain" />
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
