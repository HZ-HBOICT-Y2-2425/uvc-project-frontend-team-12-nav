<script>
    import { onMount, onDestroy } from "svelte";

    let flushCount = 0; // Tracks the number of times the toilet was flushed
    let dayTotalFlushes = 0; // Total flushes count for the day
    let funnyQuote = ""; // Holds the selected funny quote
    let showFlushAnimation = false; // Controls visibility of the flush animation

    // Array of funny toilet-related quotes
    const toiletQuotes = [
        "When nature calls, you must answer!",
        "Flush your worries away!",
        "The throne is the best thinking place.",
        "A royal flush beats a full house.",
        "Don't rush while on the flush!",
        "This is where the magic happens.",
        "You know it's serious business when the door locks.",
        "Always leave the seat up for debate.",
    ];

    // Load saved counts and set a random funny quote on mount
    onMount(() => {
        if (typeof window !== 'undefined') { // Check if we are in the browser
            const savedFlushes = localStorage.getItem('toiletFlushes');
            if (savedFlushes) {
                flushCount = parseInt(savedFlushes);
            }

            const savedDayFlushes = localStorage.getItem('dayTotalFlushes');
            if (savedDayFlushes) {
                dayTotalFlushes = parseInt(savedDayFlushes);
            }
        }

        // Select a random funny quote
        funnyQuote = toiletQuotes[Math.floor(Math.random() * toiletQuotes.length)];
    });

    // Increase flush count and trigger animation
    const incrementFlush = () => {
        flushCount++;
        triggerFlushAnimation();
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

    // Trigger the flush animation
    const triggerFlushAnimation = () => {
        showFlushAnimation = true;
        setTimeout(() => {
            showFlushAnimation = false; // Hide animation after 3 seconds
        }, 3000);
    };

    // Go back to the waterlog page
    const goBack = () => {
        window.history.back(); // Goes back to the previous page in the history
    };

    onDestroy(() => {
        // Save daily totals in localStorage before the component is destroyed (only in the browser)
        if (typeof window !== 'undefined') {  // Check if we are in the browser
            dayTotalFlushes += flushCount;
            localStorage.setItem('dayTotalFlushes', dayTotalFlushes);
        }
    });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-8 px-4">
    <!-- Green Card Section for Heading -->
    <div class="w-full bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Flush Count</h1>
    </div>

    <!-- Flush Animation (using toilet.gif) -->
    {#if showFlushAnimation}
        <div class="flush-animation">
            <img src="/toilet.gif" alt="Toilet flush animation" class="w-48 h-48 object-cover">
        </div>
    {/if}

    <!-- Funny Quote Display -->
    <div class="flex flex-col items-center space-y-4">
        <div class="text-center text-lg italic">{funnyQuote}</div>
    </div>

    <!-- Flush Counter -->
    <div class="flex flex-col items-center space-y-4">
        <div class="flex items-center space-x-6 text-2xl font-bold">
            <button on:click={decrementFlush} class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none">
                &#8592; <!-- Left arrow -->
            </button>
            <div>{flushCount}</div>
            <button on:click={incrementFlush} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                &#8594; <!-- Right arrow -->
            </button>
        </div>
    </div>

    <!-- Back Button -->
    <div class="flex flex-col space-y-4 items-center">
        <button on:click={goBack} class="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
            Back to Waterlog
        </button>
    </div>
</div>

<style>
    .flush-animation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffe6cc;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
        animation: fadeInOut 3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @keyframes fadeInOut {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
</style>
