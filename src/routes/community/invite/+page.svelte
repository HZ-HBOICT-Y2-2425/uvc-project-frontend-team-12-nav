\<script lang="ts">
  import { onMount } from 'svelte';

  let memberId = '';
  let memberName = '';

  function addMember() {
    if (memberId && memberName) {
      console.log(`Adding Member - ID: ${memberId}, Name: ${memberName}`);
      // Add logic to send this data to your database
      memberId = '';
      memberName = '';
    } else {
      alert("Both fields are required!");
    }
  }
</script>

<main class="flex flex-col items-center justify-between min-h-screen bg-gray-100">
  <!-- Header Section -->
  <a href='./home' class="w-full py-4 bg-beaver-100 shadow-md text-center text-white font-bold text-lg">
    Your Community
  </a>

  <section class="w-full px-4 py-6 bg-white shadow-md rounded-md mt-4 max-w-md">
    <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Invite Members</h2>
    <form 
      class="flex flex-col gap-4"
      on:submit|preventDefault={addMember}
    >
      <!-- ID Field -->
      <div>
        <label for="id" class="block text-sm font-medium text-gray-700">Member ID</label>
        <input
          id="id"
          type="text"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-beaver-500 focus:border-beaver-500 sm:text-sm"
          bind:value={memberId}
          placeholder="Enter member ID"
        />
      </div>
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Member Name</label>
        <input
          id="name"
          type="text"
          class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-beaver-500 focus:border-beaver-500 sm:text-sm"
          bind:value={memberName}
          placeholder="Enter member name"
        />
      </div>
      <!-- Submit Button -->
      <button
        type="submit"
        class="py-2 px-4 bg-beaver-100 text-white font-semibold rounded-md shadow hover:bg-beaver-200 transition duration-200"
      >
        Add Member
      </button>
    </form>
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
