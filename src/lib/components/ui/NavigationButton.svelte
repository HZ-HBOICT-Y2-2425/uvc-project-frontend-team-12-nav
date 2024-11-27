<script lang="ts">
    import type { ComponentType } from 'svelte';
    
    export let label: string;
    export let icon: ComponentType | undefined = undefined;
</script>
  
<button 
    type="button"
    class="w-full bg-green-500 text-white py-3 rounded-xl text-xl font-normal hover:bg-green-600 transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
    on:click
>
    {#if icon}
        <svelte:component this={icon} class="w-6 h-6" />
    {/if}
    {label}
</button>