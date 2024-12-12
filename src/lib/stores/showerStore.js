import { writable } from 'svelte/store';

// Define userId (Replace this with actual user identification logic)
const userId = '1';

function createShowerStore() {
  const initialState = {
    todayShowerTime: 0, // in seconds
    yesterdayShowerTime: 0, // in seconds
    todayWaterUsage: 0, // in liters
    yesterdayWaterUsage: 0, // in liters
    bottlesForToday: [],
    bottlesForYesterday: [],
  };

  const { subscribe, set, update } = writable(initialState);

  // Initialize store by loading data from localStorage and fetching stats
  const initialize = async () => {
    if (typeof window !== 'undefined') {
      const savedDayFlushes = localStorage.getItem('dayTotalFlushes');
      // Add any other initializations if necessary

      // Fetch shower statistics from backend
      await fetchShowerStats();
    }
  };

  // Fetch shower statistics from the backend
  const fetchShowerStats = async () => {
    try {
      const response = await fetch(`http://localhost:3011/waterlog/shower/stats?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Shower stats:', data);

        // Assuming the data contains waterUsageToday and waterUsageYesterday in liters
        const { waterUsageToday, waterUsageYesterday } = data;

        // Calculate shower time in seconds (assuming 9 liters per minute)
        const todayMinutes = waterUsageToday / 9;
        const yesterdayMinutes = waterUsageYesterday / 9;

        const todayShowerTime = todayMinutes * 60;
        const yesterdayShowerTime = yesterdayMinutes * 60;

        // Calculate number of bottles (assuming 1 bottle = 1 liter)
        const bottlesForToday = Array(Math.round(waterUsageToday)).fill(1);
        const bottlesForYesterday = Array(Math.round(waterUsageYesterday)).fill(1);

        // Update the store state
        set({
          ...initialState,
          todayShowerTime,
          yesterdayShowerTime,
          todayWaterUsage: waterUsageToday,
          yesterdayWaterUsage: waterUsageYesterday,
          bottlesForToday,
          bottlesForYesterday,
        });
      } else {
        console.error('Error fetching shower stats:', data);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred while fetching shower statistics.');
    }
  };

  // Function to destroy the store and save daily totals (if applicable)
  const destroyStore = () => {
    // Implement any cleanup or data persistence if necessary
    // For example, saving daily totals to localStorage
  };

  // Initialize the store
  initialize();

  return {
    subscribe,
    fetchShowerStats, // Expose if you need to refresh stats manually
    destroyStore,
  };
}

export const showerStore = createShowerStore();
