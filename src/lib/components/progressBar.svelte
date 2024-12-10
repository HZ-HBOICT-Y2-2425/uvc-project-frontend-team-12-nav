<script>
    import { timerStore } from '../stores/timerStore.js';
    import { derived } from 'svelte/store';

    const progressPercentage = derived(timerStore, $timerStore => {
        const elapsed = $timerStore.showerTime * 60 - $timerStore.remainingTime;
        return ((elapsed) / ($timerStore.showerTime * 60)) * 100;
    });
</script>

<div class="progress-container w-full max-w-xs bg-gray-200 rounded-full h-4 mb-6">
    <div
        class="progress-bar bg-green-500 h-4 rounded-full transition-all duration-1000 ease-linear"
        style="width: {$progressPercentage}%"
    ></div>
</div>
