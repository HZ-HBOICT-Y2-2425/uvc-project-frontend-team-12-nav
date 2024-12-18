import { writable } from 'svelte/store';

// Define userId (Replace this with actual user ID logic if you have authentication)
const userId = '1';

function createWashingStore() {
  const initialState = {
    washCount: 0,
    dayTotalWashes: 0,
    selectedBrand: "",
    showLaundryAnimation: false,
  };

  const { subscribe, set, update } = writable(initialState);
  let timer = null;

  // Initialize store by loading data from localStorage
  if (typeof window !== 'undefined') {
    const savedBrand = localStorage.getItem('selectedBrand');
    const savedWashes = localStorage.getItem('washCount');
    const savedDayWashes = localStorage.getItem('dayTotalWashes');

    set({
      ...initialState,
      selectedBrand: savedBrand || "",
      washCount: savedWashes ? parseInt(savedWashes) : 0,
      dayTotalWashes: savedDayWashes ? parseInt(savedDayWashes) : 0,
    });
  }

  // Subscribe to changes and persist to localStorage
  subscribe((state) => {
    if (typeof window !== 'undefined') {
      if (state.selectedBrand) {
        localStorage.setItem('selectedBrand', state.selectedBrand);
      }
      localStorage.setItem('washCount', state.washCount);
      localStorage.setItem('dayTotalWashes', state.dayTotalWashes);
    }
  });

  // Function to increment wash count and send data to backend
  const incrementWash = async () => {
    update(state => ({ ...state, washCount: state.washCount + 1 }));
    triggerLaundryAnimation();

    // Send POST request to backend API to log the washing usage
    await sendWashData(1); // Each increment represents 1 load
  };

  // Function to decrement wash count
  const decrementWash = () => {
    update(state => {
      if (state.washCount > 0) {
        return { ...state, washCount: state.washCount - 1 };
      }
      return state;
    });
  };

  // Function to trigger laundry animation
  const triggerLaundryAnimation = () => {
    update(state => ({ ...state, showLaundryAnimation: true }));
    setTimeout(() => {
      update(state => ({ ...state, showLaundryAnimation: false }));
    }, 3000); // Hide animation after 3 seconds
  };

  // Function to send washing data to the backend
  const sendWashData = async (loads) => {
    try {
      const dataToSend = {
        userId,
        loads,
        brand: getSelectedBrand(),
      };
      console.log('Sending data to backend:', dataToSend);

      const response = await fetch(`http://localhost:3011/waterlog/washing?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error logging washing usage:', data.message);
        alert(`Error logging washing usage: ${data.message}`);
      } else {
        console.log('Washing usage logged:', data);
        alert('Washing usage logged successfully!');
      }
    } catch (error) {
      console.error('Error sending wash data:', error);
      alert('An error occurred while sending wash data. Please try again.');
    }
  };

  // Helper function to get selected brand from the store
  const getSelectedBrand = () => {
    let brand = "";
    const unsubscribe = subscribe(state => {
      brand = state.selectedBrand;
    });
    unsubscribe();
    return brand;
  };

  // Function to change the selected brand
  const changeBrand = (brand) => {
    update(state => ({ ...state, selectedBrand: brand }));
  };

  // Function to reset day total washes
  const resetDayTotalWashes = () => {
    update(state => ({ ...state, dayTotalWashes: 0 }));
  };

  // Function to destroy the store and save daily totals
  const destroyStore = () => {
    update(state => ({
      ...state,
      dayTotalWashes: state.dayTotalWashes + state.washCount,
      washCount: 0,
    }));
  };

  return {
    subscribe,
    incrementWash,
    decrementWash,
    changeBrand,
    resetDayTotalWashes,
    destroyStore,
  };
}

export const washingStore = createWashingStore();
