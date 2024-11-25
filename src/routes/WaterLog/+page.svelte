<script>
    let currentDate = new Date();
    let maxDate = new Date(); // This is today's date
    
    // Format date to dd mm yyyy
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0'); // Ensures 2-digit day
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month (months are 0-indexed)
      const year = date.getFullYear();
      return `${day} - ${month} - ${year}`;
    };
    
    // Move the date backward
    const moveDateBack = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      if (newDate <= maxDate) {
        currentDate = newDate;
      }
    };
    
    // Move the date forward
    const moveDateForward = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      if (newDate <= maxDate) {
        currentDate = newDate;
      }
    };
</script>

<div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10">
    <!-- Date Selector -->
    <div class="flex items-center mb-6 space-x-4">
      <!-- Back Arrow Button -->
      <button on:click={moveDateBack} class="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none">
        &#8592;
      </button>
      <!-- Display Current Date -->
      <span class="text-xl font-bold">{formatDate(currentDate)}</span>
      <!-- Forward Arrow Button -->
      <button on:click={moveDateForward} class="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none">
        &#8594;
      </button>
    </div>
  
    <!-- Scrollable Container for Buttons -->
    <div class="w-full max-w-md overflow-y-auto space-y-4 h-[60vh] bg-white p-4 rounded-lg shadow-md">

      <!-- Shower Button Container -->    
      <div class="space-y-4">
        <a href="/waterlog/shower">
          <button class="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center">
            <span class="text-xl font-bold">Shower</span>
            <img src="/shower.svg" alt="Shower" class="w-50 h-100" />
          </button>
        </a>
      </div>
  
      <!-- Sink Button Container -->
      <div class="space-y-4">
        <a href="/waterlog/sink">
          <button class="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center">
            <span class="text-xl font-bold">Sink</span>
            <img src="/sink.svg" alt="Sink" class="w-50 h-100" />
          </button>
        </a>
      </div>
  
      <!-- Washing Button Container -->
      <div class="space-y-4">
        <a href="/waterlog/washing">
        <button class="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center">
          <span class="text-xl font-bold">Washing</span>
          <img src="/washing.svg" alt="Washing" class="w-50 h-100" />
        </button>
        </a>
      </div>
  
      <!-- Toilet Button Container -->
      <div class="space-y-4">
        <a href="/waterlog/toilet">
        <button class="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center">
          <span class="text-xl font-bold">Toilet</span>
          <img src="/toilet.svg" alt="Toilet" class="w-50 h-100" />
        </button>
        </a>
      </div>
  
      <!-- Other Button Container -->
      <div class="space-y-4">
        <a href="/waterlog/other">
        <button class="w-full bg-green-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center">
          <span class="text-xl font-bold">Other</span>
          <img src="/other.svg" alt="Other" class="w-50 h-100" />
        </button>
        </a>
      </div>
    </div>
</div>

<style>
    img {
      object-fit: contain; /* Make sure the image doesn't stretch */
    }
  
    /* Styling for the date buttons */
    .text-xl {
      font-size: 1.25rem;
    }
  
    /* Styling for the scrollable container */
    .overflow-y-auto {
      scrollbar-width: thin;
    }
  
    /* Optional styling for WebKit-based browsers (Chrome, Safari, etc.) */
    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
</style>

<!-- fixed the naming -->

