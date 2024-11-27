<script lang="ts">
  import { onMount } from 'svelte';

  class ProgressTracker {
    private progress: number;
    private goal: number;
    private progressText: HTMLElement | null;
    private waterWave: HTMLElement | null;
    private progressCircle: SVGCircleElement | null;

    constructor(
      textId: string,
      waveId: string,
      circleId: string,
      initialProgress: number,
      goal: number
    ) {
      this.progress = initialProgress;
      this.goal = goal;
      this.progressText = document.getElementById(textId) as HTMLElement | null;
      this.waterWave = document.getElementById(waveId) as HTMLElement | null;
      this.progressCircle = document.getElementById(circleId) as SVGCircleElement | null;
      this.updateUI();
      this.startWaveMovement();
    }

    updateProgress(value: number): void {
      this.progress = Math.min(value, this.goal);
      this.updateUI();
    }

    private updateUI(): void {
      const percentage = (this.progress / this.goal) * 100;

      // Update water level vertically based on progress
      if (this.waterWave) {
        const heightPercentage = percentage; // Water height increases with progress
        this.waterWave.style.height = `${heightPercentage}%`; // Adjust the height of the water wave
      }

      // Update circular progress bar (stroke animation)
      if (this.progressCircle) {
        const radius = this.progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.progressCircle.style.strokeDashoffset = `${offset}`;
      }

      // Update progress text
      if (this.progressText) {
        this.progressText.innerText = `${this.progress} / ${this.goal}`;
      }
    }

    // Function to start random horizontal wave movement
    private startWaveMovement(): void {
      if (this.waterWave) {
        let position = 0; // Track the wave's position

        setInterval(() => {
          // Randomize wave movement by adjusting the horizontal position of the entire wave
          position += Math.random() * 4 - 2; // Random change between -2px and 2px
          position = position % 10; // Reset the position when it exceeds 10px to keep it in a cycle
          if (this.waterWave) {
            this.waterWave.style.transform = `translateY(${position}px)`; // Move horizontally
          }
        }, 100); // Change the wave position every 100ms
      }
    }
  }

  let tracker: ProgressTracker | null = null;
  let sliderValue = 2000;
  const goal = 20000;

  onMount(() => {
    tracker = new ProgressTracker(
      'progressText',
      'waterWave',
      'progressCircle',
      sliderValue,
      goal
    );
  });

  const handleInput = (event: Event): void => {
    if (tracker) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        sliderValue = Number(target.value);
        tracker.updateProgress(sliderValue);
      }
    }
  };
</script>

<style>
  .progress-container {
    position: relative;
    width: 150px;
    height: 150px;
  }

  .progress-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2; /* Above the water */
    transform: rotate(-90deg);
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    z-index: 3; /* Above everything */
  }

  .water-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: circle(50% at 50% 50%);
    overflow: hidden;
    z-index: 1; /* Below the text and circle */
  }

  .water-wave {
    width: 100%;
    height: 0%;
    position: absolute;
    bottom: 0; /* Start from the bottom of the circle */
    background: #1677ff;
    opacity: 0.7;
    transition: height 0.3s ease-out, transform 0.2s ease-out; /* Smooth transform for wave movement */
  }
</style>

<main class="flex flex-col items-center justify-between min-h-screen bg-gray-100">
  <!-- Header Section -->
  <header class="w-full py-4 bg-beaver-100 shadow-md text-center text-white font-bold text-lg">
    Your Community
  </header>

  <!-- Progress Section -->
  <section class="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <div class="progress-container">
      <!-- Circular Progress Outline -->
      <svg class="progress-svg" width="150" height="150">
        <circle
          cx="75"
          cy="75"
          r="70"
          fill="none"
          stroke="#e5e5e5"
          stroke-width="10"
        ></circle>
        <circle
          id="progressCircle"
          cx="75"
          cy="75"
          r="70"
          fill="none"
          stroke="#1677ff"
          stroke-width="10"
          stroke-linecap="round"
          style="stroke-dasharray: 440; stroke-dashoffset: 440; transition: stroke-dashoffset 0.3s;"
        ></circle>
      </svg>

      <!-- Moving Water -->
      <div class="water-container">
        <div id="waterWave" class="water-wave"></div>
      </div>

      <!-- Progress Text -->
      <div id="progressText" class="progress-text text-center">Community Goal <br /> 0 / 20000 Liters</div>
    </div>

    <!-- Input Slider -->
    <input
      type="range"
      min="0"
      max="20000"
      value={sliderValue}
      class="w-full mt-4"
      on:input={handleInput}
    />
  </section>

  <section class="w-full py-4 bg-beaver-100 shadow-md text-center text-white font-bold text-lg">
    Save 20.000 Liters with your community.
  </section>

  <!-- Footer Section -->
  <footer class="w-full bg-beaver-100 py-4 shadow-inner">
    <div class="flex justify-evenly items-center">
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Leave
      </button>
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Members
      </button>
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Invite
      </button>
    </div>
  </footer>
</main>
