<script lang="ts">
  import { onMount } from 'svelte';

  class ProgressTracker {
    private progress: number = 8000;
    private goal: number = 20000;
    private progressCircle: SVGCircleElement | null;
    private progressText: HTMLElement | null;

    constructor(circleId: string, textId: string) {
      this.progressCircle = document.getElementById(circleId) as unknown as SVGCircleElement;
      this.progressText = document.getElementById(textId);
      this.updateUI();
    }

    updateProgress(value: number): void {
      this.progress = Math.min(value, this.goal);
      this.updateUI();
    }

    private updateUI(): void {
      if (this.progressCircle) {
        const radius = this.progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this.progress / this.goal) * circumference;
        this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        this.progressCircle.style.strokeDashoffset = `${offset}`;
      }
      if (this.progressText) {
        this.progressText.innerText = `${this.progress} / ${this.goal}`;
      }
    }
  }

  let tracker: ProgressTracker | null = null;

  // Initialize tracker when the component is mounted
  onMount(() => {
    tracker = new ProgressTracker('progressCircle', 'progressText');
  });

  const handleInput = (event: Event): void => {
    if (tracker) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        tracker.updateProgress(Number(target.value));
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
    transform:rotate(-90deg);
  }
  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    font-weight: bold;
    color: #000;
  }
</style>

<main class="flex flex-col items-center justify-between min-h-screen bg-gray-100">
  <!-- Header Section -->
  <header class="w-full py-4 bg-green-400 shadow-md text-center text-white font-bold text-lg">
    Save 20.00 Liters of Water with Your Community
  </header>

  <!-- Progress Section -->
  <section class="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <div class="progress-container">
      <!-- Circular Progress Bar -->
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
          stroke="#34d399"
          stroke-width="10"
          stroke-linecap="round"
          style="stroke-dasharray: 440; stroke-dashoffset: 440; transition: stroke-dashoffset 0.3s;"
        ></circle>
      </svg>
      <div id="progressText" class="progress-text">0 / 20000</div>
    </div>

    <!-- Input Slider -->
    <input
      type="range"
      min="0"
      max="20000"
      value="0"
      class="w-full mt-4"
      on:input={handleInput}
    />
  </section>

  <!-- Footer Section -->
  <footer class="w-full bg-green-200 py-4 shadow-inner">
    <div class="flex justify-around items-center">
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Leave Community
      </button>
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Community Members
      </button>
      <button class="flex flex-col items-center text-sm text-black">
        <div class="w-6 h-6 bg-gray-400 rounded-full mb-1"></div>
        Invite
      </button>
    </div>
  </footer>
</main>
