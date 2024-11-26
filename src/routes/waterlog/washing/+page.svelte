<script>
    import { onMount, onDestroy } from "svelte";

    let washCount = 0; // Tracks the number of times washing occurred
    let dayTotalWashes = 0; // Total wash count for the day
    let funnyQuote = ""; // Holds the selected funny quote
    let showLaundryAnimation = false; // Controls visibility of the laundry animation

    // Array of funny washing machine-related quotes
    const washingQuotes = [
        "Laundry is the only thing that should be separated by color.",
        "A load of laundry is just the beginning of a beautiful cycle.",
        "Wash, rinse, repeat… That’s life!",
        "Doing laundry is a great way to 'spin' your day.",
        "There’s no place like home—especially if it’s freshly washed.",
        "You know it's laundry day when the washer is your best friend.",
        "If laundry was easy, they’d call it football.",
        "Your laundry is waiting. Make it clean again."
    ];

    // Load saved counts from localStorage if available (only in the browser)
    onMount(() => {
        if (typeof window !== 'undefined') { // Check if we are in the browser
            const savedWashes = localStorage.getItem('washCount');
            if (savedWashes) {
                washCount = parseInt(savedWashes);
            }

            const savedDayWashes = localStorage.getItem('dayTotalWashes');
            if (savedDayWashes) {
                dayTotalWashes = parseInt(savedDayWashes);
            }
        }

        // Select a random funny washing machine quote
        funnyQuote = washingQuotes[Math.floor(Math.random() * washingQuotes.length)];
    });

    // Increase wash count and trigger animation
    const incrementWash = () => {
        washCount++;
        triggerLaundryAnimation();
        if (typeof window !== 'undefined') { // Check if we are in the browser
            localStorage.setItem('washCount', washCount); // Save the updated wash count
        }
    };

    // Decrease wash count
    const decrementWash = () => {
        if (washCount > 0) {
            washCount--; // Decrease the wash count
            if (typeof window !== 'undefined') { // Check if we are in the browser
                localStorage.setItem('washCount', washCount); // Save the updated wash count
            }
        }
    };

    // Trigger the laundry animation
    const triggerLaundryAnimation = () => {
        showLaundryAnimation = true;
        setTimeout(() => {
            showLaundryAnimation = false; // Hide animation after 3 seconds
        }, 3000); // 3 seconds
    };

    // Go back to the waterlog page
    const goBack = () => {
        window.history.back(); // Goes back to the previous page in the history
    };

    onDestroy(() => {
        // Save daily totals in localStorage before the component is destroyed (only in the browser)
        if (typeof window !== 'undefined') { // Check if we are in the browser
            dayTotalWashes += washCount;
            localStorage.setItem('dayTotalWashes', dayTotalWashes);
        }
    });
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center px-0 mx-0 relative overflow-hidden">
    <!-- Back Button in the Top Left Corner -->
    <div class="absolute top-4 left-4">
        <button on:click={goBack} class="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
            Back
        </button>
    </div>

    <!-- Green Card Section for Heading (Full Width, no padding or margin) -->
    <div class="w-full bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Wash Count</h1>
    </div>

    <!-- Content Below the Green Card (Centered Vertically and Horizontally) -->
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8">
        <!-- Laundry Animation -->
        {#if showLaundryAnimation}
            <div class="laundry-animation">
                <img src="/laundry.gif" alt="Laundry animation" class="w-48 h-48 object-cover">
            </div>
        {/if}

        <!-- Funny Washing Machine Quote Display -->
        <div class="text-lg italic">{funnyQuote}</div>

        <!-- Wash Counter -->
        <div class="space-y-8 mb-8">
            <div class="flex flex-col items-center space-y-4">
                <div class="flex items-center space-x-6 text-2xl font-bold text-black-600">
                    <button on:click={decrementWash} class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none">
                        &#8592; <!-- Left arrow -->
                    </button>
                    <div>{washCount}</div>
                    <button on:click={incrementWash} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                        &#8594; <!-- Right arrow -->
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .laundry-animation {
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
        10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        90% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
</style>
