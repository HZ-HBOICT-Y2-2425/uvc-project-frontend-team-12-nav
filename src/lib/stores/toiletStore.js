import { writable } from 'svelte/store';

// Define userId (Replace this with actual user identification logic)
const userId = '1';

// Backend API URL (Use environment variables for flexibility)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3011';

function createToiletStore() {
  const initialState = {
    flushCount: 0,
    dayTotalFlushes: 0,
    showFlushAnimation: false,
  };

  const { subscribe, set, update } = writable(initialState);
  let animationTimer = null;

  // Initialize store by loading data from localStorage
  if (typeof window !== 'undefined') {
    const savedFlushes = localStorage.getItem('toiletFlushes');
    const savedDayFlushes = localStorage.getItem('dayTotalFlushes');

    set({
      ...initialState,
      flushCount: savedFlushes ? parseInt(savedFlushes) : 0,
      dayTotalFlushes: savedDayFlushes ? parseInt(savedDayFlushes) : 0,
    });
  }

  // Subscribe to changes and persist to localStorage
  subscribe((state) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('toiletFlushes', state.flushCount);
      localStorage.setItem('dayTotalFlushes', state.dayTotalFlushes);
    }
  });

  // Function to increment flush count and trigger animation
  const incrementFlush = async () => {
    update(state => ({ ...state, flushCount: state.flushCount + 1 }));
    triggerFlushAnimation();

    // Log flush to backend
    await logFlushUsage(1);
  };

  // Function to decrement flush count
  const decrementFlush = async () => {
    update(state => {
      if (state.flushCount > 0) {
        return { ...state, flushCount: state.flushCount - 1 };
      }
      return state;
    });

    // Log flush decrement to backend
    await logFlushUsage(-1);
  };

  // Function to trigger flush animation
  const triggerFlushAnimation = () => {
    update(state => ({ ...state, showFlushAnimation: true }));

    // Clear any existing timers to prevent multiple animations
    if (animationTimer) {
      clearTimeout(animationTimer);
    }

    // Hide animation after 3 seconds
    animationTimer = setTimeout(() => {
      update(state => ({ ...state, showFlushAnimation: false }));
      animationTimer = null;
    }, 3000);
  };

  // Function to log flush usage to backend
  const logFlushUsage = async (flushes) => {
    try {
      const response = await fetch(`http://localhost:3011/waterlog/toilet?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          flushes, // +1 for increment, -1 for decrement
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error logging toilet usage:', errorData.message);
        // Optionally, handle errors (e.g., revert state changes)
      } else {
        const result = await response.json();
        console.log('Toilet usage logged:', result);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      // Optionally, handle network errors
    }
  };

  // Function to destroy the store and save daily totals
  const destroyStore = () => {
    update(state => ({
      ...state,
      dayTotalFlushes: state.dayTotalFlushes + state.flushCount,
      flushCount: 0,
    }));
  };

  return {
    subscribe,
    incrementFlush,
    decrementFlush,
    destroyStore,
  };
}

export const toiletStore = createToiletStore();
