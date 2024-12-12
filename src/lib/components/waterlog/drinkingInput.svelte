<script>
    import { drinkingLiters } from '$lib/stores/otherStore.js';

    const handleInput = (event) => {
        const value = parseFloat(event.target.value);
        drinkingLiters.set(isNaN(value) ? 0 : value);
    };
</script>

<div class="w-full flex flex-col items-center space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">
        How Much Water Did You Drink Today?
    </h2>
    <div class="flex items-center space-x-4">
        <input 
            type="number" 
            min="0" 
            step="0.1" 
            bind:value={$drinkingLiters} 
            on:input={handleInput}
            placeholder="Liters"
            class="p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-center transition duration-300"
        />
        <span class="text-xl text-gray-800">Liters</span>
    </div>
</div>
