<script>
    import { timerStore } from '$lib/stores/timerStore.js';
    import { get } from 'svelte/store';

    const increaseTime = () => {
        const currentTime = get(timerStore).showerTime;
        if (currentTime < 60) {
            timerStore.updateShowerTime(currentTime + 1);
        }
    };

    const decreaseTime = () => {
        const currentTime = get(timerStore).showerTime;
        if (currentTime > 1) {
            timerStore.updateShowerTime(currentTime - 1);
        }
    };
</script>

<div class="time-selector flex items-center mb-6 space-x-4">
    <button
        on:click={decreaseTime}
        class="adjust-time-btn bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 focus:outline-none w-10 h-10 flex items-center justify-center"
    >
        &#8595;
    </button>

    <span class="text-xl font-bold">
        {$timerStore.showerTime} minutes
    </span>

    <button
        on:click={increaseTime}
        class="adjust-time-btn bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 focus:outline-none w-10 h-10 flex items-center justify-center"
    >
        &#8593;
    </button>
</div>
