<script>
    import Header from "$lib/components/layout/Header.svelte";
    import AchievementsList from "$lib/components/achievements/AchievementsList.svelte";
    import PageContainer from "$lib/components/layout/PageContainer.svelte";
    import { goto } from '$app/navigation';
</script>

<PageContainer>
    <!-- Back button -->
    <div class="absolute top-4 left-4 z-10">
        <button 
            class="px-3 py-1 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
            on:click={() => goto('/profile')}
        >
            Back
        </button>
    </div>

    <!-- Page Header -->
    <Header title="Achievements" showBack={true} backRoute="/profile"/>

    <!-- Achievements List -->
    <AchievementsList />
</PageContainer>