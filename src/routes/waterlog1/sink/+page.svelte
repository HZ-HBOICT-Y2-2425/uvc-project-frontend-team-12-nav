<script>
    import { onMount, onDestroy } from "svelte";

    let timer;
    let elapsedTime = 0; // Total time spent on the sink (in seconds)
    let isRunning = false; // To track if the timer is running
    let dayTotalTime = 0; // To track total time for the day

    // List of funny sink usage quotes
    const quotes = [
        "A clean sink is a sign of a dirty mind.",
        "I came, I saw, I washed my hands.",
        "Sink or swim? I choose sink.",
        "When in doubt, wash your hands.",
        "Life is short. Enjoy the sink while it lasts.",
        "Sink time is me time.",
        "Why do they call it a sink when it's more of a 'think'?"
    ];

    // Pick a random quote
    let currentQuote = quotes[Math.floor(Math.random() * quotes.length)];

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

    // Reset the timer and water height
    const resetTimer = () => {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = 0;
        localStorage.setItem('sinkTime', elapsedTime); // Save reset time to localStorage
    };

    // Go back to the previous page (Back button functionality)
    const goBack = () => {
        localStorage.removeItem('sinkTime');
        localStorage.removeItem('dayTotalTime');
        window.history.back(); // Navigate back to the previous page
    };

    // Format seconds into HH:MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };

    // Dynamically calculate water height
    $: waterHeight = Math.min((elapsedTime / 300) * 100, 100); // Max 100% for 5 minutes of elapsed time

    onDestroy(() => {
        clearInterval(timer); // Clean up the interval when the component is destroyed
    });
</script>

<!-- Full Screen Green Card -->
<div class="min-h-screen flex flex-col relative">
    <!-- Green Card Section for Heading -->
    <div class="w-full bg-green-600 text-white p-6 rounded-b-lg mb-0">
        <h1 class="text-3xl font-bold text-center">Sink Timer</h1>
    </div>

    <!-- Timer and other content section -->
    <div class="flex flex-col items-center justify-center py-10 space-y-6 flex-1">
        <!-- Timer Display -->
        <div class="text-4xl font-bold text-black-600 mb-6">
            {formatTime(elapsedTime)}
        </div>

        <!-- Funny Sink Quote -->
        <div class="text-lg text-center text-gray-600 mb-6 italic">
            {currentQuote}
        </div>

        <!-- Start, Pause Buttons -->
        <div class="flex flex-col items-center mb-6">
            {#if !isRunning}
                <button on:click={startTimer} class="bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none mb-4">
                    Start Timer
                </button>
            {:else}
                <button on:click={pauseTimer} class="bg-yellow-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none mb-4">
                    Pause Timer
                </button>
            {/if}

            <!-- Reset Button -->
            <button on:click={resetTimer} class="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none mb-4">
                Reset Timer
            </button>

            <!-- Back Button -->
            <button on:click={goBack} class="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
                End Usage
            </button>
        </div>
    </div>

    <!-- Realistic Flowing Water Background -->
    <div class="water-background" style="height: {waterHeight}%; transition: height 1s ease-out;">
        <div class="water-wave wave1"></div>
        <div class="water-wave wave2"></div>
        <div class="water-wave wave3"></div>
    </div>
</div>

<style>
    :root {
        --water-height: 0%;
    }

    /* Full screen layout */
    .min-h-screen {
        min-height: 100vh;
    }

    /* Water Background */
    .water-background {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        z-index: -1; /* Behind the main content */
        background: rgba(0, 180, 216, 0.7);
        border-radius: 20% 20% 0 0;
    }

    /* Waves inside the water */
    .water-wave {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 20px;
        background: rgba(0, 180, 216, 0.5);
        opacity: 0.6;
        border-radius: 50%;
        transform: scaleX(1.5);
    }

    .wave1 {
        animation: wave-animation 5s infinite linear;
        z-index: 2;
    }

    .wave2 {
        animation: wave-animation 6s infinite linear reverse;
        background: rgba(0, 150, 199, 0.5);
        z-index: 3;
    }

    .wave3 {
        animation: wave-animation 7s infinite linear;
        background: rgba(0, 100, 150, 0.4);
        z-index: 1;
    }

    /* Wave Animation */
    @keyframes wave-animation {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    /* Styling for Buttons */
    button {
        padding: 12px 24px; /* Consistent padding */
        font-size: 1rem; /* Consistent font size */
        width: 160px; /* Set the same width for all buttons */
        text-align: center; /* Center text in buttons */
        border-radius: 0.375rem; /* Consistent border radius */
        transition: background-color 0.3s ease; /* Smooth transition */
    }
</style>
