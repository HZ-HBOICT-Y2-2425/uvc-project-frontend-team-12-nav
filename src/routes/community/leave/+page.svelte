<script lang="ts">
  let showConfirmation = false;

  function handleLeaveClick() {
    showConfirmation = true;
  }

  function confirmLeave() {
    // Add logic to handle leaving the community
    console.log("User left the community");
    showConfirmation = false;
  }

  function cancelLeave() {
    showConfirmation = false;
  }
</script>

<main class="flex flex-col items-center justify-between min-h-screen bg-gray-100">
  <!-- Header Section -->
  <a href="./home" class="w-full py-4 bg-beaver-100 shadow-md text-center text-white font-bold text-lg">
    Your Community
  </a>

  <!-- Leave Page Section -->
  <section class="flex flex-col items-center mt-10">
    <h1 class="text-2xl font-semibold text-gray-800">Leave Community</h1>
    <button 
      on:click={handleLeaveClick} 
      class="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
      Leave Community
    </button>

    {#if showConfirmation}
      <div class="mt-6 p-6 w-3/4 max-w-md bg-yellow-300 border border-yellow-400 text-yellow-800 rounded-md shadow-md text-center">
        <p class="text-lg font-medium">Are you sure you want to leave the community?</p>
        <div class="flex justify-around mt-4">
          <button 
            on:click={confirmLeave} 
            class="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
            Yes, Leave
          </button>
          <button 
            on:click={cancelLeave} 
            class="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition">
            Cancel
          </button>
        </div>
      </div>
    {/if}
  </section>

  <!-- Footer Section -->
  <footer class="w-full bg-beaver-100 py-4 shadow-inner">
    <div class="flex justify-evenly items-center">
      <a href="./leave" class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Leave
      </a>
      <a href="./members" class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Members
      </a>
      <a href="./invite" class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Invite
      </a>
    </div>
  </footer>
</main>
