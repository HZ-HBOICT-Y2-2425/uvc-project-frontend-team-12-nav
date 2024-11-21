<script>
    import { page } from '$app/stores';
  
    // Extract the slug from the URL
    const { slug } = $page.params;
  
    // Hard-coded inventory data for now
    const inventory = {
      'eco-runner-hoodie': {
        name: 'EcoRunner hoodie',
        type: 'Clothing',
        rarity: 'Rare',
        discounts: [
          {
            title: '5% discount for EcoRunner',
            description: 'One-time use for a discount on your next purchase',
          },
          {
            title: 'Bundle Combo',
            description:
              'When combined with other EcoRunner items, enjoy up to 10% off.',
          },
        ],
      },
      'superlight-jogging-pants': {
        name: 'SuperLight jogging pants',
        type: 'Bottomwear',
        rarity: 'Epic',
        discounts: [
          {
            title: '10% discount for SuperLight',
            description: 'One-time use for a discount on your next purchase',
          },
        ],
      },
      'naturefree-beanie': {
        name: 'NatureFree beanie',
        type: 'Head accessory',
        rarity: 'Legendary',
        discounts: [
          {
            title: '1% discount for Naturefree',
            description: 'One-time usage for a discount on your next purchase',
          },
          {
            title: 'Set Combo',
            description: `When combined with more NatureFree items a set combo is applied for your next purchase:
              - 3/5: 7% discount
              - 4/5: Free delivery and 10 euros off
              - 5/5: 15% off your next purchase`,
          },
        ],
      },
    };
  
    // Fetch the data for the current item
    const item = inventory[slug];
  </script>
  
  {#if item}
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-green-100 w-full text-center py-8">
        <h1 class="text-3xl font-bold">{item.name}</h1>
      </div>
  
      <!-- Item Information -->
      <div class="flex-grow p-6">
        <p class="text-gray-500">{item.type}</p>
        <h3 class="text-lg font-semibold mt-4">Characteristics:</h3>
        <ul class="mt-4 space-y-4">
          {#each item.discounts as discount}
            <li class="border-b last:border-b-0 pb-4">
              <h4 class="font-semibold">{discount.title}</h4>
              <p class="text-sm text-gray-600">{discount.description}</p>
            </li>
          {/each}
        </ul>
      </div>
  
      <!-- Redeem Button -->
      <div class="w-full bg-green-100 text-center py-4">
        <button class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700">
          Go to the redeem shop
        </button>
      </div>
    </div>
  {:else}
    <div class="min-h-screen flex items-center justify-center">
      <p class="text-gray-500">Item not found.</p>
    </div>
  {/if}
  