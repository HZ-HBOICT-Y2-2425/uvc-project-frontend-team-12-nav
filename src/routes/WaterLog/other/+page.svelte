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

    // Submit all data and calculate the total
    const submitAllData = () => {
        const totalUsage = Object.values(categoryData).reduce((sum, count) => sum + count, 0);
        alert(`Total water usage for the day: ${totalUsage}`);
        // Logic for submitting data, e.g., sending to a server, can go here

        // Optionally reset data for a new day
        if (typeof window !== 'undefined') {
            localStorage.removeItem("categoryData");
        }
        categoryData = {};
    };

    // Navigate back to the waterlog page
    const goBack = () => {
        window.history.back(); // Navigate to the previous page
    };
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 space-y-8">
    <h1 class="text-3xl font-bold text-green-600 mb-4">Other Water Usage</h1>

    <!-- Dropdown for selecting a category -->
    <div>
        <label for="categories" class="text-xl font-bold text-gray-700">Select a Category:</label>
        <select id="categories" bind:value={selectedCategory} on:change={selectCategory} class="mt-2 p-2 border rounded-lg">
            <option value="" disabled selected>Select a category</option>
            {#each categories as category}
                <option value={category}>{category}</option>
            {/each}
        </select>
    </div>

    {#if selectedCategory}
        <!-- Counter controls for the selected category -->
        <div class="space-y-6">
            <h2 class="text-2xl font-bold text-black-600">How many times have you used water on {selectedCategory}</h2>
            <div class="flex items-center space-x-6 text-2xl font-bold text-green-600">
                <button on:click={decrementCount} class="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none">
                    &#8592; <!-- Left arrow -->
                </button>
                <div>{currentCount}</div>
                <button on:click={incrementCount} class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none">
                    &#8594; <!-- Right arrow -->
                </button>
            </div>

            <!-- Save button -->
            <button on:click={saveCategoryData} class="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
                Save {selectedCategory} Data
            </button>
        </div>
    {/if}

    <!-- Submit data button -->
    <button on:click={submitAllData} class="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
        Submit Daily Data
    </button>

    <!-- Back button -->
    <button on:click={goBack} class="bg-gray-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
        Back to Waterlog
    </button>

    <!-- Other Beaver Image -->
    <div class="mt-6 mb-6 flex justify-center">
        <img src="/otherbeaver.svg" alt="other Beaver" class="w-64 h-auto object-contain" />
    </div>
</div>

<style>
    /* Styling for the page */
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

    .space-y-6 {
        space-y: 1.5rem;
    }
</style>
