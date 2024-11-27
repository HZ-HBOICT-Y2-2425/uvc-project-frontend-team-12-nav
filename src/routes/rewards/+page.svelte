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
  
  <div class="redeem-page">
    <!-- Logo at the top -->
    <div class="logo-container">
      <img src="/beaver_logo.svg" alt="Beaverwize Logo" class="logo" />
    </div>
  
    <!-- Green card with heading -->
    <div class="green-card">
      <h1 class="heading">Redeem</h1>
    </div>
  
    <!-- Redeemable items list -->
    <div class="redeemable-list">
      {#each redeemableItems as item, index}
        <div class="redeemable-item">
          <img src={item.src} alt={item.alt} class="redeemable-image" />
          <h2 class="item-title">{item.title}</h2>
          <p class="item-price">
            <span class="original-price">{item.originalPrice}</span>
            <span class="discounted-price">{item.discountedPrice}</span>
          </p>
        </div>
        {#if index < redeemableItems.length - 1}
          <div class="separator"></div>
        {/if}
      {/each}
    </div>
  </div>
  
  <style>
    /* Ensure body has no margin or padding */
    body {
      margin: 0;
      padding: 0;
    }
  
    .redeem-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
    }
  
    .logo-container {
      margin-bottom: 1.5rem;
    }
  
    .logo {
      width: 150px;
      height: auto;
    }
  
    .green-card {
      background-color: #4caf50;
      color: white;
      padding: 1rem 0;
      width: 100%; /* Full width */
      text-align: center;
    }
  
    .heading {
      margin: 0;
      font-size: 1.5rem;
    }
  
    .redeemable-list {
      width: 100%;
      max-width: 400px;
    }
  
    .redeemable-item {
      text-align: center;
      margin: 1.5rem 0;
    }
  
    .redeemable-image {
      width: 100%;
      max-width: 200px;
      height: auto;
    }
  
    .item-title {
      font-size: 1.1rem;
      margin: 0.5rem 0 0.3rem;
      font-weight: bold;
      color: #333;
    }
  
    .item-price {
      font-size: 1rem;
      margin: 0;
    }
  
    .original-price {
      text-decoration: line-through;
      color: red;
      margin-right: 0.5rem;
    }
  
    .discounted-price {
      color: #4caf50;
      font-weight: bold;
    }
  
    .separator {
      height: 1px;
      background-color: #4caf50;
      margin: 1rem 0;
    }
  </style>
  