<script>
    import { selectedCategory, categoryData, currentCount, drinkingLiters, gardeningTime } from '$lib/stores/otherStore.js';
    import { get } from 'svelte/store';

    export let userId = "1";

    const saveCategoryData = async () => {
        const category = get(selectedCategory);
        if (!category) {
            alert("Please select a category first.");
            return;
        }

        try {
            // Prepare the payload based on the selected category
            let payload = { userId, category };

            switch (category) {
                case "Cooking":
                    payload.cups = get(currentCount);
                    break;
                case "Cleaning":
                    payload.buckets = get(currentCount);
                    break;
                case "Gardening":
                    payload.time = get(gardeningTime);
                    break;
                case "Drinking":
                    payload.liters = get(drinkingLiters);
                    break;
                default:
                    throw new Error("Invalid category selected.");
            }

            console.log('Sending payload to backend:', payload); // Debug log

            // **Ensure the correct endpoint is used here**
            const response = await fetch('http://localhost:3011/waterlog/other', {
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
            const updatedData = get(categoryData);
            if (category === "Gardening") {
                updatedData[category] = get(gardeningTime);
            } else if (category === "Drinking") {
                updatedData[category] = get(drinkingLiters);
            } else {
                updatedData[category] = get(currentCount);
            }
            categoryData.set(updatedData);
            if (typeof window !== 'undefined') {
                localStorage.setItem("categoryData", JSON.stringify(updatedData));
            }

            alert(`${category} data saved successfully!`);

            // Optionally, reset inputs after saving
            if (category === "Cooking" || category === "Cleaning") {
                currentCount.set(0);
            } else if (category === "Drinking") {
                drinkingLiters.set(0);
            } else if (category === "Gardening") {
                gardeningTime.set(0);
            }
        } catch (error) {
            console.error('Error saving category data:', error);
            alert(`Error: ${error.message}`);
        }
    };
</script>

<button on:click={saveCategoryData} class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300">
    Save Data
</button>
