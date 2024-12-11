<script>
    export let timeInSeconds = 0;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    };
</script>

<div class="timer-display text-4xl font-bold text-gray-800 mb-6">
    {formatTime(timeInSeconds)}
</div>
