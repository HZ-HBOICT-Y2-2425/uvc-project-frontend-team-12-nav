<!-- src/lib/components/layout/PageContainer.svelte -->
<script lang="ts">
    export let bgColor: 'white' | 'gray' = 'white';
  </script>
  
  <div class="min-h-screen w-full bg-{bgColor} flex justify-center">
    <main class="w-full min-h-screen max-w-[450px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[900px] flex flex-col items-center bg-{bgColor}">
      <slot />
    </main>
  </div>