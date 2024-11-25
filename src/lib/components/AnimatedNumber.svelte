<!-- src/lib/components/AnimatedNumber.svelte -->
<script lang="ts">
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
  
    export let value = 0;
    let animatedValue = tweened(0, { duration: 500, easing: cubicOut });
  
    $: animatedValue.set(+value);
  </script>
  
  <span>{$animatedValue.toFixed(0)}</span>
  