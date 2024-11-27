<script>
    import { onMount } from "svelte";

    // Categories for water usage
    const categories = ["Cooking", "Gardening", "Cleaning", "Other"];

    let selectedCategory = ""; // The currently selected category
    let categoryData = {}; // Object to store counters for each category
    let currentCount = 0; // Counter for the selected category

    // Load saved category data from localStorage on mount
    onMount(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem("categoryData");
            if (savedData) {
                categoryData = JSON.parse(savedData);
            }
        }
    });

    // Update the current count when a category is selected
    const selectCategory = (event) => {
        selectedCategory = event.target.value;
        currentCount = categoryData[selectedCategory] || 0; // Default to 0 if no data exists
    };

    // Increment the counter
    const incrementCount = () => {
        currentCount++;
    };

    // Decrement the counter
    const decrementCount = () => {
        if (currentCount > 0) {
            currentCount--;
        }
    };

    // Save the current count for the selected category
    const saveCategoryData = () => {
        if (selectedCategory) {
            categoryData[selectedCategory] = currentCount;
            if (typeof window !== 'undefined') {
                localStorage.setItem("categoryData", JSON.stringify(categoryData));
            }
            alert(`${selectedCategory} count saved: ${currentCount}`);
        } else {
            alert("Please select a category first.");
        }
    };

    // Navigate back to the waterlog page
    const goBack = () => {
        window.history.back(); // Navigate to the previous page
    };
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-0">
    <!-- Back Button in the Top Left Corner -->
    <div class="absolute top-4 left-4">
        <button on:click={goBack} class="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
            Back
        </button>
    </div>

    <!-- Green Card Section for Heading (Full width without padding) -->
    <div class="w-full bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Other Usage</h1>
    </div>

    <!-- Content Below the Green Card (Centered Vertically and Horizontally) -->
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8">
        <!-- Dropdown for selecting a category -->
        <div class="w-full flex flex-col items-center">
            <label for="categories" class="text-xl font-bold text-gray-700 mb-2">Select a Category:</label>
            <select id="categories" bind:value={selectedCategory} on:change={selectCategory} class="p-2 border rounded-lg w-full max-w-xs">
                <option value="" disabled selected>Select a category</option>
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </div>

        {#if selectedCategory}
            <!-- Counter controls for the selected category -->
            <div class="w-full flex flex-col items-center space-y-6 max-w-md">
                <h2 class="text-2xl font-bold text-black-600 text-center">
                    How many times have you used water on {selectedCategory}
                </h2>
                <div class="flex items-center justify-center space-x-6 text-2xl font-bold text-black-600">
                    <button on:click={decrementCount} class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none">
                        &#8592; <!-- Left arrow -->
                    </button>
                    <div class="w-12 text-center">{currentCount}</div>
                    <button on:click={incrementCount} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                        &#8594; <!-- Right arrow -->
                    </button>
                </div>

                <!-- Save button -->
                <button on:click={saveCategoryData} class="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
                    Save {selectedCategory} Data
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    button {
        transition: background-color 0.3s ease;
    }

    select {
        text-align: center;
        background-color: white;
    }

    h2 {
        text-align: center;
    }

    .min-h-screen {
        padding-left: 0;
        padding-right: 0;
    }
</style>
