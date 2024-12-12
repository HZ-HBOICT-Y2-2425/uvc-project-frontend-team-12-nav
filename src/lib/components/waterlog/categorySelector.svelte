<script>
    import { categories, selectedCategory } from '$lib/stores/otherStore.js';
    import { get } from 'svelte/store';

    export let onSelect;

    const handleChange = (event) => {
        selectedCategory.set(event.target.value);
        onSelect(event.target.value);
    };
</script>

<div class="w-full flex flex-col items-center">
    <label for="categories" class="text-xl font-bold text-gray-700 mb-2">Let's Add More Of Your Water Usages!</label>
    <div class="relative w-full">
        <select
            id="categories"
            on:change={handleChange}
            class="block appearance-none w-full bg-white border border-blue-400 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
            <option value="" disabled selected>Select a category</option>
            {#each $categories as category}
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
