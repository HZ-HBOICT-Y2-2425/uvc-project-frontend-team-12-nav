<script>
    export let title = "Shower Timer";

    const goBack = () => {
        window.history.back();
    };
</script>

<div class="header w-full bg-green-600 text-white p-6 rounded-b-lg mb-4 relative">
    <button
        on:click={goBack}
        class="back-button bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
    >
        Back
    </button>
    <h1 class="text-3xl font-bold text-center">{title}</h1>
</div>

<style>
    .back-button {
        position: absolute;
        top: 1rem;
        left: 1rem;
    }
</style>
