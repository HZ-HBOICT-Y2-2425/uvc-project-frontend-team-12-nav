import { writable } from 'svelte/store';

// Define categories as a writable store
export const categories = writable([
    { name: "Cooking", icon: "🍳" },
    { name: "Cleaning", icon: "🧼" },
    { name: "Gardening", icon: "🌱" },
    { name: "Drinking", icon: "🥤" }
]);

// Initialize categoryData from localStorage if available
let initialCategoryData = {};
if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem("categoryData");
    if (savedData) {
        initialCategoryData = JSON.parse(savedData);
    }
}

export const categoryData = writable(initialCategoryData);

// Other stores
export const selectedCategory = writable("");
export const currentCount = writable(0);
export const drinkingLiters = writable(0);
export const gardeningTime = writable(0);
export const isTimerRunning = writable(false);
