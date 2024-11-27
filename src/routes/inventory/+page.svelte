<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import PageContainer from "$lib/components/layout/PageContainer.svelte";

  // Inventory data
  const inventory = [
    {
      name: "EcoRunner hoodie",
      slug: "eco-runner-hoodie",
      rarity: "Rare",
      description: "An eco-friendly green hoodie made by EcoRunner.",
    },
    {
      name: "SuperLight jogging pants",
      slug: "superlight-jogging-pants",
      rarity: "Epic",
      description: "Jogging pants made with recycled fabrics.",
    },
    {
      name: "NatureFree beanie",
      slug: "naturefree-beanie",
      rarity: "Legendary",
      description: "A beanie made with 100% cotton.",
    },
  ];
</script>

<PageContainer>
  <!-- Header -->
  <Header title="Inventory" showBack={true} backRoute="/home"/>

  <!-- Inventory List -->
  <ul class="w-full">
    {#each inventory as item}
      <li
        class="flex justify-between items-center border-b last:border-0 py-4 px-4 hover:bg-gray-100 transition-colors duration-200"
      >
        <!-- Link to the dynamic route -->
        <a
          href={`/inventory/items/${item.slug}`}
          class="w-full flex justify-between items-center no-underline text-black"
        >
          <div>
            <h2 class="font-semibold">{item.name}</h2>
            <p class="text-sm text-gray-500">{item.description}</p>
          </div>
          <span
            class={`capitalize text-sm font-bold ${
              item.rarity === "Rare" && "text-blue-500"
            } ${item.rarity === "Epic" && "text-purple-500"} ${
              item.rarity === "Legendary" && "text-yellow-500"
            }`}
          >
            {item.rarity}
          </span>
        </a>
      </li>
    {/each}
  </ul>

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