<script>
  // Redeemable items array with additional details
  const redeemableItems = [
    {
      id: 1,
      src: '/redeemitem1.svg',
      alt: 'Redeem Item 1',
      title: 'Stylish Eco-Runners',
      originalPrice: '€50.00',
      discountedPrice: '€30.00'
    },
    {
      id: 2,
      src: '/redeemitem2.svg',
      alt: 'Redeem Item 2',
      title: 'Eco-Friendly Jogging Shoes',
      originalPrice: '€98.00',
      discountedPrice: '€72.00'
    },
    {
      id: 3,
      src: '/redeemitem3.svg',
      alt: 'Redeem Item 3',
      title: 'All White Sunsavers (Run On Solar)',
      originalPrice: '€112.00',
      discountedPrice: '€87.00'
    }
  ];
</script>

<div class="flex flex-col items-center font-sans">
  <!-- Logo at the top -->
  <div class="mb-6">
    <img src="/beaver_logo.svg" alt="Beaverwize Logo" class="w-[150px] h-auto" />
  </div>

  <!-- Green card with heading -->
  <div class="bg-[#4caf50] text-white py-4 w-full text-center">
    <h1 class="m-0 text-2xl">Redeem</h1>
  </div>

  <!-- Redeemable items list -->
  <div class="w-full max-w-[400px]">
    {#each redeemableItems as item, index}
      <div class="text-center my-6">
        <img src={item.src} alt={item.alt} class="w-full max-w-[200px] h-auto" />
        <h2 class="text-[1.1rem] mt-2 mb-1 font-bold text-[#333]">{item.title}</h2>
        <p class="text-base m-0">
          <span class="line-through text-red-500 mr-2">{item.originalPrice}</span>
          <span class="text-[#4caf50] font-bold">{item.discountedPrice}</span>
        </p>
      </div>
      {#if index < redeemableItems.length - 1}
        <div class="h-px bg-[#4caf50] my-4"></div>
      {/if}
    {/each}
  </div>
</div>
