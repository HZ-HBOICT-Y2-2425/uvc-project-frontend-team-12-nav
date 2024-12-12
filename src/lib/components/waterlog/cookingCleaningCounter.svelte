<script>
    import { currentCount, categoryData, selectedCategory } from '$lib/stores/otherStore.js';
    import { onMount } from 'svelte';

    export let category;

    const increment = () => {
        currentCount.update(n => n + 1);
    };

    const decrement = () => {
        currentCount.update(n => (n > 0 ? n - 1 : 0));
    };
</script>

<div class="w-full flex flex-col items-center space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">
        {category} Usages, Don't Use Too Much Water!
    </h2>
    <div class="flex items-center justify-center space-x-4 text-2xl font-bold text-gray-800">
        <button on:click={decrement} class="bg-gray-300 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-400 focus:outline-none transition duration-300">
            &#8592; <!-- Left arrow -->
        </button>
        <div class="w-16 text-center">
            {$currentCount}
        </div>
        <button on:click={increment} class="bg-blue-300 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-400 focus:outline-none transition duration-300">
            &#8594; <!-- Right arrow -->
        </button>
    </div>
    <p class="text-gray-600">
        {category === "Cooking" ? "500ml cups used" : "5L buckets used"}
    </p>
</div>