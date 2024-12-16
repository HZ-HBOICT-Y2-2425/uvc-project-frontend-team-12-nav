<script lang="ts">
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import Header from '$lib/components/layout/Header.svelte';
    import PageContainer from '$lib/components/layout/PageContainer.svelte';
    import NavigationButton from '$lib/components/ui/NavigationButton.svelte';
  
    const { status, error } = get(page); // Retrieve status and error from the store
  </script>
  
  <PageContainer>
    <Header title={`Error ${status || 500}`} />
  
    <div class="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] px-6 flex-1 flex flex-col items-center justify-center space-y-6 text-center">
      <h1 class="text-4xl font-bold text-red-500">{status || 500}</h1>
      <p class="text-lg text-gray-700">{error?.message || "An unexpected error occurred."}</p>
  
      <NavigationButton label="Go to Home" on:click={() => window.location.href = '/'} />
    </div>
  </PageContainer>
  
  <style>
    h1 {
      font-size: 2.5rem;
      color: #e63946;
    }
    p {
      font-size: 1.125rem;
      color: #4a4a4a;
    }
  </style>
  