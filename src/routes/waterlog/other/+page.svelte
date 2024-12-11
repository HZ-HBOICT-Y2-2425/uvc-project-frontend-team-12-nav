<script>
    import { onMount, onDestroy } from "svelte";

    // Categories for water usage
    const categories = [
        { name: "Cooking", icon: "🍳" },
        { name: "Cleaning", icon: "🧼" },
        { name: "Gardening", icon: "🌱" },
        { name: "Drinking", icon: "🥤" }
    ];

    let selectedCategory = ""; // The currently selected category
    let categoryData = {}; // Object to store data for each category
    let currentCount = 0; // Counter for Cooking and Cleaning
    let drinkingLiters = 0; // Input for Drinking category
    let gardeningTime = 0; // Timer for Gardening category in seconds
    let timerInterval = null; // Interval for Gardening timer
    let isTimerRunning = false; // Timer state

    // Define a userId (In production, obtain this dynamically)
    const userId = "1"; // Replace with dynamic user ID as needed

    // Define water usage rates (for frontend calculations if needed)
    const WATER_USAGE_RATES = {
        Cooking: 0.5,    // liters per 500ml cup
        Cleaning: 5,     // liters per 5L bucket
        Gardening: 0.1,  // liters per second
        Drinking: 1,     // liters per liter consumed
    };

    // Load saved category data from localStorage on mount
    onMount(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem("categoryData");
            if (savedData) {
                categoryData = JSON.parse(savedData);
                // Initialize variables based on saved data
                if (selectedCategory === "Cooking" || selectedCategory === "Cleaning") {
                    currentCount = categoryData[selectedCategory] || 0;
                } else if (selectedCategory === "Drinking") {
                    drinkingLiters = categoryData[selectedCategory] || 0;
                } else if (selectedCategory === "Gardening") {
                    gardeningTime = categoryData[selectedCategory] || 0;
                }
            }
        }
    });

    // Cleanup timer on component destroy
    onDestroy(() => {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    });

    // Update the current count/input when a category is selected
    const selectCategory = (event) => {
        selectedCategory = event.target.value;
        // Initialize variables based on selected category
        if (selectedCategory === "Cooking" || selectedCategory === "Cleaning") {
            currentCount = categoryData[selectedCategory] || 0;
        } else if (selectedCategory === "Drinking") {
            drinkingLiters = categoryData[selectedCategory] || 0;
        } else if (selectedCategory === "Gardening") {
            gardeningTime = categoryData[selectedCategory] || 0;
        }
        // Reset timer if switching away from Gardening
        if (selectedCategory !== "Gardening" && isTimerRunning) {
            stopTimer();
        }
    };

    // Increment the counter for Cooking and Cleaning categories
    const incrementCount = () => {
        currentCount++;
    };

    // Decrement the counter for Cooking and Cleaning categories
    const decrementCount = () => {
        if (currentCount > 0) {
            currentCount--;
        }
    };

    // Handle input change for Drinking category
    const handleDrinkingInput = (event) => {
        const value = parseFloat(event.target.value);
        drinkingLiters = isNaN(value) ? 0 : value;
    };

    // Timer functions for Gardening category
    const startTimer = () => {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                gardeningTime++;
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (isTimerRunning) {
            isTimerRunning = false;
            clearInterval(timerInterval);
        }
    };

    const resetTimer = () => {
        stopTimer();
        gardeningTime = 0;
    };

    // Helper function to format time in HH:MM:SS
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

    // Save the current data for the selected category
    const saveCategoryData = async () => {
        if (!selectedCategory) {
            alert("Please select a category first.");
            return;
        }

        try {
            // Prepare the payload based on the selected category
            let payload = { userId, category: selectedCategory };

            switch (selectedCategory) {
                case "Cooking":
                    payload.cups = currentCount;
                    break;
                case "Cleaning":
                    payload.buckets = currentCount;
                    break;
                case "Gardening":
                    payload.time = gardeningTime;
                    break;
                case "Drinking":
                    payload.liters = drinkingLiters;
                    break;
                default:
                    throw new Error("Invalid category selected.");
            }

            console.log('Sending payload to backend:', payload); // Debug log

            // **Ensure the correct endpoint is used here**
            const response = await fetch('http://localhost:3011/api/water-usage/other', {
                method: 'POST', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error:', errorData.message); // Log the backend error
                throw new Error(errorData.message || 'Failed to save data.');
            }

            const responseData = await response.json();
            console.log('API Response:', responseData);

            // Save data to localStorage
            if (typeof window !== 'undefined') {
                categoryData[selectedCategory] = selectedCategory === "Gardening" ? gardeningTime : (selectedCategory === "Drinking" ? drinkingLiters : currentCount);
                localStorage.setItem("categoryData", JSON.stringify(categoryData));
            }

            alert(`${selectedCategory} data saved successfully!`);

            // Optionally, reset inputs after saving
            if (selectedCategory === "Cooking" || selectedCategory === "Cleaning") {
                currentCount = 0;
            } else if (selectedCategory === "Drinking") {
                drinkingLiters = 0;
            } else if (selectedCategory === "Gardening") {
                gardeningTime = 0;
            }
        } catch (error) {
            console.error('Error saving category data:', error);
            alert(`Error: ${error.message}`);
        }
    };

    // Navigate back to the previous page
    const goBack = () => {
        window.history.back();
    };
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4 relative">
    <!-- Back Button in the Top Left Corner -->
    <div class="absolute top-4 left-4">
        <button on:click={goBack} class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
            Back
        </button>
    </div>

    <!-- Green Card Section for Heading (Full width without padding) -->
    <div class="w-screen -mx-4 bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Other Usage</h1>
    </div>

    <!-- Content Below the Green Card (Centered Vertically and Horizontally) -->
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 w-full max-w-md">
        <!-- Dropdown for selecting a category -->
        <div class="w-full flex flex-col items-center">
            <label for="categories" class="text-xl font-bold text-gray-700 mb-2">Let's Add More Of Your Water Usages!</label>
            <div class="relative w-full">
                <select
                    id="categories"
                    bind:value={selectedCategory}
                    on:change={selectCategory}
                    class="block appearance-none w-full bg-white border border-blue-400 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                    <option value="" disabled>Select a category</option>
                    {#each categories as category}
                        <option value={category.name}>{category.icon} {category.name}</option>
                    {/each}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.939l3.424-3.392a.75.75 0 111.06 1.06l-4.242 4.22a.75.75 0 01-1.06 0L5.516 8.608a.75.75 0 010-1.06z" />
                    </svg>
                </div>
            </div>
        </div>

        {#if selectedCategory === "Cooking" || selectedCategory === "Cleaning"}
            <!-- Counter controls for Cooking and Cleaning categories -->
            <div class="w-full flex flex-col items-center space-y-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    {selectedCategory} Usages, Don't Use Too Much Water!
                </h2>
                <div class="flex items-center justify-center space-x-4 text-2xl font-bold text-gray-800">
                    <button on:click={decrementCount} class="bg-gray-300 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-400 focus:outline-none transition duration-300">
                        &#8592; <!-- Left arrow -->
                    </button>
                    <div class="w-16 text-center">
                        {currentCount}
                    </div>
                    <button on:click={incrementCount} class="bg-blue-300 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-400 focus:outline-none transition duration-300">
                        &#8594; <!-- Right arrow -->
                    </button>
                </div>
                <p class="text-gray-600">
                    {selectedCategory === "Cooking" ? "500ml cups used" : "5L buckets used"}
                </p>
                <!-- Save button -->
                <button on:click={saveCategoryData} class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300">
                    Save {selectedCategory} Data
                </button>
            </div>
        {:else if selectedCategory === "Gardening"}
            <!-- Timer controls for Gardening category -->
            <div class="w-full flex flex-col items-center space-y-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    Let's Start Watering The Garden!
                </h2>
                <!-- Clock Encapsulated in a White Card -->
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <div class="text-4xl text-gray-800">
                        {formatTime(gardeningTime)}
                    </div>
                </div>
                <div class="flex space-x-4">
                    {#if !isTimerRunning}
                        <button on:click={startTimer} class="bg-green-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-500 focus:outline-none transition duration-300">
                            Start
                        </button>
                    {:else}
                        <button on:click={stopTimer} class="bg-yellow-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none transition duration-300">
                            Stop
                        </button>
                    {/if}
                    <button on:click={resetTimer} class="bg-red-400 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-500 focus:outline-none transition duration-300">
                        Reset
                    </button>
                </div>
                <!-- Save button -->
                <button on:click={saveCategoryData} class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300">
                    Save Gardening Data
                </button>
            </div>
        {:else if selectedCategory === "Drinking"}
            <!-- Input for Drinking category -->
            <div class="w-full flex flex-col items-center space-y-6">
                <h2 class="text-2xl font-bold text-gray-800">
                    How Much Water Did You Drink Today?
                </h2>
                <div class="flex items-center space-x-4">
                    <input 
                        type="number" 
                        min="0" 
                        step="0.1" 
                        bind:value={drinkingLiters} 
                        on:input={handleDrinkingInput}
                        placeholder="Liters"
                        class="p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-center transition duration-300"
                    />
                    <span class="text-xl text-gray-800">Liters</span>
                </div>
                <!-- Save button -->
                <button on:click={saveCategoryData} class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300">
                    Save Drinking Data
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Custom scrollbar for better aesthetics */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    /* Optional: Enhance the appearance of the select options */
    option {
        background-color: #f0f8ff; /* AliceBlue */
        color: #000;
    }

    option:hover {
        background-color: skyblue; /* LightCyan */
    }
</style>
