<script>
    export let title;
    export let description;
    export let reward;
    export let status; // locked or unlocked
  </script>
  
  <div class="achievement-item">
    <div class="info">
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>Reward:</strong> {reward}</p>
    </div>
    <div class="status">
      {#if status === "locked"}
        <span class="locked">🔒 Locked</span>
      {:else}
        <span class="unlocked">✅ Unlocked</span>
      {/if}
    </div>
  </div>
  
  <style>
    .achievement-item {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ddd;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 5px;
    }
  
    .info h3 {
      margin: 0;
      font-size: 1.2rem;
    }
  
    .info p {
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }
  
    .status {
      display: flex;
      align-items: center;
    }
  
    .locked {
      color: red;
    }
  
    .unlocked {
      color: green;
    }
  </style>
  