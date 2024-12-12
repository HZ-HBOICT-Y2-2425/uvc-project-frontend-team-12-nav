<script>
    // No script needed for static animation
  </script>
  
  <div class="flush-animation">
    <img src="/toilet.gif" alt="Toilet flush animation" class="w-48 h-48 object-cover">
  </div>
  
  <style>
    .flush-animation {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 230, 204, 0.9); /* Slight transparency */
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
      animation: fadeInOut 3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000; /* Ensure it appears above other elements */
    }
  
    @keyframes fadeInOut {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      10% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      90% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
    }
  </style>
  