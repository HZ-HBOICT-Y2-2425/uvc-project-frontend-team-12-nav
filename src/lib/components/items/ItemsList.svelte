<script>
  import Item from './Item.svelte';
  import { items } from '../../stores/items.ts';

  let itemsList = [];
  $: items.subscribe(value => (itemsList = value));
</script>

<ul class="w-full">
  {#each itemsList as item}
    <li
      class="flex justify-between items-center border-b last:border-0 py-4 px-4 hover:bg-gray-100 transition-colors duration-200"
    >
      <!-- Use the Item component to preserve dynamic data and formatting -->
      <Item
        name={item.name}
        type={item.type}
        discount={item.discount}
        status={item.status}
      />
    </li>
  {/each}
</ul>

<style>
  .w-full {
    width: 100%;
  }
  li {
    list-style-type: none;
  }
</style>
