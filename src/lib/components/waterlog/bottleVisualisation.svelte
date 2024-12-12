<script>
    export let count = 0; // Number of bottles to display
  
    // Generate an array with 'count' elements for iteration
    let bottles = Array(count).fill(1);
  </script>
  
  <div class="flex flex-wrap justify-center gap-2">
    {#each bottles as _}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 60"
        class="w-8 h-16"
        fill="currentColor"
      >
        <rect x="8" y="2" width="8" height="8" rx="2" fill="#4f46e5" />
        <rect x="6" y="10" width="12" height="40" rx="4" fill="#93c5fd" />
      </svg>
    {/each}
  </div>
  
  <style>
    .flex-wrap {
      display: flex;
      flex-wrap: wrap;
    }
    .gap-2 {
      gap: 0.5rem; /* Adjust spacing between bottles */
    }
    .w-8 {
      width: 2rem;
    }
    .h-16 {
      height: 4rem;
    }
  </style>
  