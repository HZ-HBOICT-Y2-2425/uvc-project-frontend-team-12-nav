<script>
    import { waterHeight } from '$lib/stores/sinktimerStore.js';
    import { onDestroy } from 'svelte';

    let height = 0;
    const unsubscribe = waterHeight.subscribe(value => {
        height = value;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="water-background" style="height: {height}%; transition: height 1s ease-out;">
    <div class="water-wave wave1"></div>
    <div class="water-wave wave2"></div>
    <div class="water-wave wave3"></div>
</div>

<style>
    .water-background {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        z-index: -1; /* Behind the main content */
        background: rgba(0, 180, 216, 0.7);
        border-radius: 20% 20% 0 0;
    }

    .water-wave {
        position: absolute;
        bottom: 0;
        width: 200%;
        height: 20px;
        background: rgba(0, 180, 216, 0.5);
        opacity: 0.6;
        border-radius: 50%;
        transform: scaleX(1.5);
    }

    .wave1 {
        animation: wave-animation 5s infinite linear;
        z-index: 2;
    }

    .wave2 {
        animation: wave-animation 6s infinite linear reverse;
        background: rgba(0, 150, 199, 0.5);
        z-index: 3;
    }

    .wave3 {
        animation: wave-animation 7s infinite linear;
        background: rgba(0, 100, 150, 0.4);
        z-index: 1;
    }

    @keyframes wave-animation {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>
