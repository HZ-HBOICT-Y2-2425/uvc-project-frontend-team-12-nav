<script>
  export let name; // Item name
  export let type; // Item type (hats, shirts, pants, shoes, accessories)
  export let discount; // Discount percentage
  export let status; // locked, unlocked, or equipped

  // Generate a slug by lowercasing the name and replacing spaces with hyphens
  $: slug = name.toLowerCase().replace(/\s+/g, '-');
</script>

<a
  href={`/inventory/items/${slug}`}
  class="no-underline text-black"
>
  <div class="flex justify-between items-center border-b last:border-0 py-4 px-4 hover:bg-gray-100 transition-colors duration-200">
    <div>
      <h2 class="font-semibold text-lg">{name}</h2>
      <p class="text-sm text-gray-500"><strong>Type:</strong> {type}</p>
      <p class="text-sm text-gray-500"><strong>Discount:</strong> {discount}%</p>
      
    </div>
    <span
      class={`capitalize text-sm font-bold ${
        status === "locked" ? "text-red-500" : ""
      } ${status === "unlocked" ? "text-green-500" : ""} ${
        status === "equipped" ? "text-yellow-500" : ""
      }`}
    >
      {status}
    </span>
  </div>
</a>

<style>
  /* Styling consistent with your list formatting */
  a {
    display: block;
    width: 100%;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0;
  }

  span {
    white-space: nowrap;
  }
</style>
