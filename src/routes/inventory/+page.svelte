<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";
  import ItemsList from "$lib/components/items/ItemsList.svelte";
  import { goto } from '$app/navigation';
</script>

<PageContainer>
  <!-- Header -->
  <Header title="Inventory" showBack={true} backRoute="/home" />

      <!-- Back button -->
      <div class="absolute top-4 left-4 z-10">
        <button 
            class="px-3 py-1 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
            on:click={() => goto('/home')}
        >
            Back
        </button>
    </div>


  <ItemsList></ItemsList>

  <!-- Inventory List -->

  <!-- Outfit Button -->
  <footer class="w-full bg-green-100 fixed bottom-0 left-0 text-center py-4">
    <a href="/outfit" class="inline-block">
      <button
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
      >
        Your outfit
      </button>
    </a>
  </footer>
</PageContainer>

<style>
  .hover\:bg-green-600:hover {
    background-color: #2f855a;
  }
</style>
