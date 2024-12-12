<script>
    import { onMount } from "svelte";
    import { selectedCategory, categoryData, currentCount, drinkingLiters, gardeningTime } from '$lib/stores/otherStore.js';
    import Header from '$lib/components/layout/Header.svelte';
    import CategorySelector from '$lib/components/waterlog/categorySelector.svelte';
    import CookingCleaningCounter from '$lib/components/waterlog/cookingCleaningCounter.svelte';
    import GardeningTimer from '$lib/components/waterlog/gardeningTimer.svelte';
    import DrinkingInput from '$lib/components/waterlog/drinkingInput.svelte';
    import SaveButton from '$lib/components/waterlog/saveButton.svelte';
    import { get } from 'svelte/store';

    // Define a userId (In production, obtain this dynamically)
    const userId = "1"; // Replace with dynamic user ID as needed

    const goBack = () => {
        window.history.back();
    };

    const handleCategorySelect = (category) => {
        // Initialize variables based on selected category
        if (category === "Cooking" || category === "Cleaning") {
            currentCount.set(get(categoryData)[category] || 0);
        } else if (category === "Drinking") {
            drinkingLiters.set(get(categoryData)[category] || 0);
        } else if (category === "Gardening") {
            gardeningTime.set(get(categoryData)[category] || 0);
        }
    };

    onMount(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem("categoryData");
            if (savedData) {
                categoryData.set(JSON.parse(savedData));
            }
        }
    });
</script>

<div class="min-h-screen flex flex-col relative">
    <Header title="Other Water Usages" showBack={true} backRoute="/waterlog"/>

    <!-- Content Below the Header (Centered Vertically and Horizontally) -->
    <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 w-15 max-w-md">
        <!-- Category Selector -->
        <CategorySelector onSelect={handleCategorySelect} />

        {#if $selectedCategory === "Cooking" || $selectedCategory === "Cleaning"}
            <CookingCleaningCounter category={$selectedCategory} />
        {:else if $selectedCategory === "Gardening"}
            <GardeningTimer />
        {:else if $selectedCategory === "Drinking"}
            <DrinkingInput />
        {/if}

        {#if $selectedCategory}
            <SaveButton userId={userId} />
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
</style>
