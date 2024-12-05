<script>
    import { onMount, onDestroy } from "svelte";
  
    let washCount = 0; // Tracks the number of times washing occurred
    let dayTotalWashes = 0; // Total wash count for the day
    let funnyQuote = ""; // Holds the selected funny quote
    let showLaundryAnimation = false; // Controls visibility of the laundry animation
  
    // Array of funny washing machine-related quotes
    const washingQuotes = [
      "Laundry is the only thing that should be separated by color.",
      "A load of laundry is just the beginning of a beautiful cycle.",
      "Wash, rinse, repeat… That’s life!",
      "Doing laundry is a great way to 'spin' your day.",
      "There’s no place like home—especially if it’s freshly washed.",
      "You know it's laundry day when the washer is your best friend.",
      "If laundry was easy, they’d call it football.",
      "Your laundry is waiting. Make it clean again."
    ];
  
    // Array of washing machine brands
    const washingMachineBrands = [
      "Whirlpool",
      "Samsung",
      "LG",
      "Bosch",
      "GE Appliances",
      "Maytag",
      "Electrolux",
      "Siemens",
      "Haier",
      "Miele"
    ];
  
    // Define userId (Replace this with actual user ID logic if you have authentication)
    const userId = '1';
  
    let selectedBrand = ""; // Initialize as empty string
  
    // Environment Variable for Backend URL
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3011';
  
    // Load saved counts and brand from localStorage if available (only in the browser)
    onMount(() => {
      if (typeof window !== 'undefined') { // Check if we are in the browser
        const savedBrand = localStorage.getItem('selectedBrand');
        if (savedBrand) {
          selectedBrand = savedBrand;
          console.log('Loaded saved brand:', selectedBrand);
        }
  
        const savedWashes = localStorage.getItem('washCount');
        if (savedWashes) {
          washCount = parseInt(savedWashes);
          console.log('Loaded saved washCount:', washCount);
        }
  
        const savedDayWashes = localStorage.getItem('dayTotalWashes');
        if (savedDayWashes) {
          dayTotalWashes = parseInt(savedDayWashes);
          console.log('Loaded saved dayTotalWashes:', dayTotalWashes);
        }
      }
  
      // Select a random funny washing machine quote
      funnyQuote = washingQuotes[Math.floor(Math.random() * washingQuotes.length)];
      console.log('Selected funny quote:', funnyQuote);
    });
  
    // Reactive statement to save selected brand to localStorage
    $: if (typeof window !== 'undefined' && selectedBrand) {
      localStorage.setItem('selectedBrand', selectedBrand);
      console.log('Saved selectedBrand to localStorage:', selectedBrand);
    }
  
    // Increase wash count and trigger animation
    const incrementWash = async () => {
      washCount++;
      console.log('Incremented washCount:', washCount);
      triggerLaundryAnimation();
  
      // Save the updated wash count in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('washCount', washCount);
        console.log('Saved washCount to localStorage:', washCount);
      }
  
      // Send POST request to backend API to log the washing usage
      await sendWashData(1); // Each increment represents 1 load
    };
  
    // Decrease wash count
    const decrementWash = () => {
      if (washCount > 0) {
        washCount--;
        console.log('Decremented washCount:', washCount);
  
        // Save the updated wash count in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('washCount', washCount);
          console.log('Saved washCount to localStorage:', washCount);
        }
      }
    };
  
    // Trigger the laundry animation
    const triggerLaundryAnimation = () => {
      showLaundryAnimation = true;
      setTimeout(() => {
        showLaundryAnimation = false; // Hide animation after 3 seconds
      }, 3000); // 3 seconds
    };
  
    // Function to send washing data to the backend
    const sendWashData = async (loads) => {
      try {
        const dataToSend = {
          userId,
          loads,
          brand: selectedBrand,
        };
        console.log('Sending data to backend:', dataToSend);
  
        const response = await fetch(`${BACKEND_URL}/api/water-usage/washing`, {
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
  
    // Function to change the selected brand
    const changeBrand = () => {
      selectedBrand = "";
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedBrand');
        console.log('Removed selectedBrand from localStorage');
      }
    };
  
    // Go back to the previous page
    const goBack = () => {
      window.history.back(); // Goes back to the previous page in the history
    };
  
    onDestroy(() => {
      // Save daily totals in localStorage before the component is destroyed
      if (typeof window !== 'undefined') {
        dayTotalWashes += washCount;
        localStorage.setItem('dayTotalWashes', dayTotalWashes);
        console.log('Saved dayTotalWashes to localStorage:', dayTotalWashes);
      }
    });
  </script>
  
  <div class="min-h-screen bg-blue-50 flex flex-col items-center px-0 mx-0 relative overflow-hidden">
    <!-- Back Button in the Top Left Corner -->
    <div class="absolute top-4 left-4">
      <button on:click={goBack} class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
        Back
      </button>
    </div>
  
    <!-- Change Brand Button in the Top Right Corner -->
    {#if selectedBrand}
      <div class="absolute top-4 right-4">
        <button on:click={changeBrand} class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
          Brands
        </button>
      </div>
    {/if}
  
    {#if !selectedBrand}
      <!-- Brand selection UI -->
      <div class="w-screen -mx-4 bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Select Your Washing Machine Brand</h1>
      </div>
      <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8">
        <div class="w-full flex flex-col items-center">
          <label for="brands" class="text-xl font-bold text-gray-700 mb-2">Washing Machine Brands:</label>
          <div class="relative w-full">
            <select
              id="brands"
              bind:value={selectedBrand}
              class="block appearance-none w-full bg-white border border-blue-400 hover:border-blue-500 px-4 py-3 pr-8 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              on:change={() => console.log('Selected brand:', selectedBrand)}
            >
              <option value="" disabled>Select a brand</option>
              {#each washingMachineBrands as brand}
                <option value={brand}>{brand}</option>
              {/each}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.939l3.424-3.392a.75.75 0 111.06 1.06l-4.242 4.22a.75.75 0 01-1.06 0L5.516 8.608a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <!-- Green Card Section for Heading (Full Width, no padding or margin) -->
      <div class="w-screen -mx-4 bg-green-600 text-white p-6 rounded-b-lg">
        <h1 class="text-3xl font-bold mb-4 text-center">Wash Count</h1>
      </div>
  
      <!-- Content Below the Green Card (Centered Vertically and Horizontally) -->
      <div class="flex-grow flex flex-col items-center justify-center text-center space-y-8 w-full max-w-md">
        <!-- Laundry Animation -->
        {#if showLaundryAnimation}
          <div class="laundry-animation">
            <img src="/laundry.gif" alt="Laundry animation" class="w-48 h-48 object-cover">
          </div>
        {/if}
  
        <!-- Funny Washing Machine Quote Display -->
        <div class="text-lg italic">"{funnyQuote}"</div>
  
        <!-- Wash Counter -->
        <div class="space-y-8 mb-8">
          <div class="flex flex-col items-center space-y-4">
            <div class="flex items-center space-x-6 text-2xl font-bold text-gray-800">
              <button 
                on:click={decrementWash} 
                class="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 focus:outline-none"
                disabled={!washCount}
              >
                &#8592; <!-- Left arrow -->
              </button>
              <div class="text-3xl">{washCount}</div>
              <button 
                on:click={incrementWash} 
                class="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
              >
                &#8594; <!-- Right arrow -->
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    .laundry-animation {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ffe6cc;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
      animation: fadeInOut 3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000; /* Ensure it appears above other elements */
    }
  
    @keyframes fadeInOut {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      10% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      90% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
    }
  
    select:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }
  
    /* Optional: Enhance the appearance of the select options */
    option {
      background-color: #f0f8ff; /* AliceBlue */
      color: #000;
    }
  
    option:hover {
      background-color: skyblue; /* LightCyan */
    }
  
    /* Disable the decrement button when washCount is 0 */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
  