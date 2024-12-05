<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";
  import ItemsList from "$lib/components/items/ItemsList.svelte";
</script>

<PageContainer>
  <!-- Header -->
  <Header title="Inventory" showBack={true} backRoute="/home" />

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
