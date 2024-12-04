<script>
  let showerTime = 5; // Default shower time in minutes
  let timer;
  let remainingTime = showerTime * 60; // Convert to seconds
  let isRunning = false;
  let isPaused = false;
  let totalShowerTime = 0; // Track total time spent in seconds

  // Funny shower quotes
  const showerQuotes = [
    "I don’t trust people who don’t shower. What are you hiding?",
    "Shower thoughts: The best way to start your day.",
    "I like my water like I like my humor: Warm and steamy.",
    "Shower beer is the best kind of beer.",
    "Taking a shower is a chance to finally talk to yourself.",
    "I’m just here for the hot water and the thinking time.",
    "Showering is my daily time for reflection and plotting my world domination.",
    "There’s nothing like a good shower to make you feel clean… unless you’re doing it wrong.",
    "Shower: The only place where my singing sounds good.",
    "A good shower is like a mini vacation.",
  ];

  // Pick a random quote
  const randomQuote = showerQuotes[Math.floor(Math.random() * showerQuotes.length)];

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
  };

  // Update remaining time when showerTime changes
  const updateRemainingTime = () => {
    remainingTime = showerTime * 60;
  };

  const startTimer = () => {
    if (isPaused) {
      isPaused = false;
    }
    isRunning = true;
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Shower time's up!");
        totalShowerTime += showerTime * 60; // Add completed time
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timer);
    isRunning = false;
    isPaused = true;
  };

  const endTimer = async () => {
    clearInterval(timer);
    isRunning = false;
    const timeSpent = showerTime * 60 - remainingTime; // Time spent in seconds
    totalShowerTime += timeSpent;
    remainingTime = showerTime * 60; // Reset timer

    // Convert timeSpent to minutes
    const duration = timeSpent / 60;

    // Send POST request to log shower usage
    try {
      const response = await fetch('http://localhost:3011/api/water-usage/shower', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Replace with actual userId
          duration: duration,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Shower usage logged:', data);
        alert('Shower usage logged successfully!');
      } else {
        console.error('Error logging shower usage:', data);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error occurred while logging shower usage.');
    }
  };
</script>

<div class="app-container {isRunning ? 'shower-bg' : ''} w-full">
  <!-- Back Button (Top Left Corner) -->
  <button
    on:click={() => window.history.back()}
    class="back-button absolute top-4 left-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
  >
    Back
  </button>

  <!-- Green Card Section for Heading -->
  <div class="header w-full bg-green-600 text-white p-6 rounded-b-lg mb-4">
    <h1 class="text-3xl font-bold text-center">Shower Timer</h1>
  </div>

  <!-- Main Content Section (Centered Below Green Card) -->
  <div class="main-content flex flex-col items-center justify-center space-y-6">
    <!-- Funny Shower Quote -->
    <div class="quote-container text-lg text-center text-gray-600 mb-6 italic">
      <p class="text-xl font-italic text-black">"{randomQuote}"</p>
    </div>

    <!-- Timer Display -->
    <div class="timer-display text-4xl font-bold text-black-600 mb-6">
      {formatTime(remainingTime)}
    </div>

    <!-- Progress Bar -->
    <div class="progress-container w-full max-w-xs bg-gray-200 rounded-full h-4 mb-6">
      <div
        class="progress-bar bg-green-500 h-4 rounded-full"
        style="width: {((showerTime * 60 - remainingTime) / (showerTime * 60)) * 100}%"
      ></div>
    </div>

    <!-- Adjustable Time Selector -->
    <div class="time-selector flex items-center mb-6 space-x-4">
      <button
        on:click={() => {
          showerTime = Math.min(60, showerTime + 1);
          updateRemainingTime();
        }}
        class="adjust-time-btn bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 focus:outline-none w-10 h-10 flex items-center justify-center"
      >
        &#8593;
      </button>
      <span class="text-xl font-bold">{showerTime} min</span>
      <button
        on:click={() => {
          showerTime = Math.max(1, showerTime - 1);
          updateRemainingTime();
        }}
        class="adjust-time-btn bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 focus:outline-none w-10 h-10 flex items-center justify-center"
      >
        &#8595;
      </button>
    </div>

    <!-- Start, Pause, End Buttons -->
    <div class="action-buttons space-y-4 w-full max-w-xs">
      {#if !isRunning}
        <button
          on:click={startTimer}
          class="start-btn bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none w-full"
        >
          Start Timer
        </button>
      {:else}
        {#if !isPaused}
          <button
            on:click={pauseTimer}
            class="pause-btn bg-yellow-500 text-white py-2 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none w-full"
          >
            Pause
          </button>
        {:else}
          <button
            on:click={startTimer}
            class="resume-btn bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none w-full"
          >
            Resume
          </button>
        {/if}
        <button
          on:click={endTimer}
          class="end-btn bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none w-full"
        >
          End Shower
        </button>
      {/if}
    </div>

    <!-- Statistics and Back Buttons -->
    <div class="statistics-buttons mt-6 flex flex-col space-y-4 w-full max-w-xs">
      <a href="/waterlog/shower/showerstatistics" class="w-full">
        <button class="statistics-btn bg-gray-500 text-white py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none w-full">
          View Statistics
        </button>
      </a>
    </div>
  </div>
</div>

<style>
  .app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Ensures content starts at the top */
    align-items: center;
    width: 100vw; /* Full width of the viewport */
    height: 100vh; /* Full height of the viewport */
    background: #e6f7ff;
    padding: 0; /* Remove any padding to avoid extra space */
    overflow: hidden;
  }

  /* Back button styles */
  .back-button {
    font-size: 1rem;
    font-weight: 500;
    padding: 8px 16px;
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: red;
    color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .back-button:hover {
    background-color: red;
  }

  /* Center the content below the green card */
  .main-content {
    flex: 1; /* Ensure the content takes the remaining height */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Vertically center the content */
    align-items: center; /* Horizontally center the content */
    width: 100%; /* Full width */
    padding: 0 20px; /* Padding for spacing */
  }

  /* Shower background animation when running */
  .shower-bg::before,
  .shower-bg::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: #1821c7;
    border-radius: 50%;
    opacity: 0.8;
    animation: fall linear infinite;
  }

  .shower-bg::before {
    top: -10%;
    left: 30%;
    animation-duration: 1.5s;
  }

  .shower-bg::after {
    top: -20%;
    left: 70%;
    animation-duration: 2.5s;
  }

  @keyframes fall {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(100vh) scale(0.8);
    }
  }
</style>
