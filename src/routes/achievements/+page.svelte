<script>
    import Header from "$lib/components/layout/Header.svelte";
    import AchievementsList from "$lib/components/achievements/AchievementsList.svelte";
    import PageContainer from "$lib/components/layout/PageContainer.svelte";
</script>

<PageContainer>
    <!-- Page Header -->
    <Header title="Achievements" showBack={true} backRoute="/profile"/>

    <!-- Achievements List -->
    <AchievementsList />
</PageContainer>
