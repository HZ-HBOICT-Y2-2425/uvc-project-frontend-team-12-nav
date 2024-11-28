\<script lang="ts">
  import { onMount } from 'svelte';

  // Mock data for members. Replace this with a fetch call to an API or database in a real scenario.
  let members: { id: number; name: string; role: string }[] = [];

  onMount(() => {
    // Example: Fetch members from an API
    // fetch('/api/members')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     members = data;
    //   });

    // Using mock data for now
    members = [
      { id: 1, name: 'Alice Johnson', role: 'Administrator' },
      { id: 2, name: 'Bob Smith', role: 'Member' },
      { id: 3, name: 'Charlie Brown', role: 'Moderator' }
    ];
  });
</script>

<main class="flex flex-col items-center justify-between min-h-screen bg-gray-100">
  <!-- Header Section -->
  <a href='./home' class="w-full py-4 bg-beaver-100 shadow-md text-center text-white font-bold text-lg">
    Your Community
  </a>

  <!-- Members Section -->
  <section class="my-6 w-3/4 bg-white p-4 rounded shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Members</h2>
    {#if members.length > 0}
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Name</th>
            <th class="border border-gray-300 px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {#each members as member}
            <tr class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2">{member.id}</td>
              <td class="border border-gray-300 px-4 py-2">{member.name}</td>
              <td class="border border-gray-300 px-4 py-2">{member.role}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="text-gray-500">No members found in this group.</p>
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
