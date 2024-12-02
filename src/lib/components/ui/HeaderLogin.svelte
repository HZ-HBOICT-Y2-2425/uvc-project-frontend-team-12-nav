<script>
  import { fly } from 'svelte/transition';
</script>

<div class="flex items-center justify-center mb-6 space-x-4">
  <div class="logo text-center ml-24 mt-24" in:fly={{ y: -50, duration: 500 }}>
    <img
      src="/beaver_logo.svg"
      alt="BeaverWize Logo"
      class="w-25 mx-auto mb-2"
    />
    <h1 class="text-2xl font-bold">BeaverWize</h1>
  </div>
  <img src="/tree1.svg" alt="tree1" class="w-20 h-auto" in:fly={{ x: -100, duration: 700 }} />
</div>
