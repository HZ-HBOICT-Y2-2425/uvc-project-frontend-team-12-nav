<script>
    import { sinkStore } from '$lib/stores/sinktimerStore.js';

<<<<<<< HEAD
    let timer;
    let elapsedTime = 0; // Total time spent on the sink (in seconds)
    let isRunning = false; // To track if the timer is running
    // let dayTotalTime = 0; // To track total time for the day

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
=======
    import Header from '$lib/components/header.svelte';
    import TimerDisplay from '$lib/components/timerDisplay.svelte';
    import QuoteDisplay from '$lib/components/quoteDisplay.svelte';
    import ControlButtons from '$lib/components/controlButtons.svelte';
    import WaterBackground from '$lib/components/waterBackground.svelte';
>>>>>>> feature/waterlog
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
