<script lang="ts">
  import { goto } from '$app/navigation';
  
  export let title: string;
  export let showBack: boolean = false;
  export let color: 'green' | 'white' = 'green';
  export let backRoute: string = '/'; // New property
  
  function goBack() {
    if (backRoute.startsWith('/')) {
        goto(backRoute);
    } else {
        console.error('Invalid backRoute:', backRoute);
        goto('/');
    }
  }
</script>

<div class="w-full {color === 'green' ? 'bg-green-500' : 'bg-white'} p-4 rounded-b-[32px]">
  <div class="flex justify-center items-center relative">
      {#if showBack}
          <button 
              class="absolute left-0 px-4 py-2 text-white hover:bg-green-600 rounded-lg transition-colors"
              on:click={goBack}
          >
              Back
          </button>
      {/if}
      
      <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" 
               class="h-6 w-6 {color === 'green' ? 'text-white' : 'text-gray-800'}" 
               fill="none"
               viewBox="0 0 24 24" 
               stroke="currentColor">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h1 class="text-3xl font-normal {color === 'green' ? 'text-white' : 'text-gray-800'}">{title}</h1>
      </div>
  </div>
</div>
