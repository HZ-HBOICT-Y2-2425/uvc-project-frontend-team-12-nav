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

<div class="min-h-screen bg-blue-50 flex flex-col items-center py-6 relative">
  <!-- Back Button -->
  <a href="/" class="absolute top-1 left-1">
      <button
          class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none flex items-center"
      >
          Back
      </button>
  </a>

  <!-- Date Selector -->
  <div class="flex items-center space-x-4 mb-8">
      <!-- Back Arrow Button -->
      <button
          on:click={moveDateBack}
          class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none"
      >
          &#8592;

      </button>
      <!-- Display Current Date -->
      <span class="text-xl font-bold">{formatDate(currentDate)}</span>
      <!-- Forward Arrow Button -->
      <button
          on:click={moveDateForward}
          class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 focus:outline-none"
      >
          &#8594;
      </button>
  </div>

  <!-- Buttons -->
  <div class="flex flex-col w-full max-w-lg grow space-y-6 px-4">
      <!-- Shower Button -->
      <a href="/waterlog/shower" class="w-full">
          <button
              class="w-full bg-green-500 text-white py-8 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center px-6"
          >
              <span class="text-xl font-bold">Shower</span>
              <img src="/shower.svg" alt="Shower" class="w-16 h-16" />
          </button>
      </a>

      <!-- Sink Button -->
      <a href="/waterlog/sink" class="w-full">
          <button
              class="w-full bg-green-500 text-white py-8 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center px-6"
          >
              <span class="text-xl font-bold">Sink</span>
              <img src="/sink.svg" alt="Sink" class="w-16 h-16" />
          </button>
      </a>

      <!-- Washing Button -->
      <a href="/waterlog/washing" class="w-full">
          <button
              class="w-full bg-green-500 text-white py-8 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center px-6"
          >
              <span class="text-xl font-bold">Washing</span>
              <img src="/washing.svg" alt="Washing" class="w-16 h-16" />
          </button>
      </a>

      <!-- Toilet Button -->
      <a href="/waterlog/toilet" class="w-full">
          <button
              class="w-full bg-green-500 text-white py-8 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center px-6"
          >
              <span class="text-xl font-bold">Toilet</span>
              <img src="/toilet.svg" alt="Toilet" class="w-16 h-16" />
          </button>
      </a>

      <!-- Other Button -->
      <a href="/waterlog/other" class="w-full">
          <button
              class="w-full bg-green-500 text-white py-8 rounded-lg shadow-md hover:bg-green-600 focus:outline-none flex justify-between items-center px-6"
          >
              <span class="text-xl font-bold">Other</span>
              <img src="/other.svg" alt="Other" class="w-16 h-16" />
          </button>
      </a>
  </div>
</div>

<style>
  img {
      object-fit: contain; /* Ensure images don't stretch */
  }

  .text-xl {
      font-size: 1.25rem;
  }

  .grow {
      flex-grow: 1;
  }
</style>