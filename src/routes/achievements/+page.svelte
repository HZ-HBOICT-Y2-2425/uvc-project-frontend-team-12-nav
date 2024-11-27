<script>
    import Header from "$lib/components/layout/Header.svelte";
    import AchievementsList from "$lib/components/ui/AchievementsList.svelte";
    import PageContainer from "$lib/components/layout/PageContainer.svelte";

    import { goto } from "$app/navigation";

    // Back button handler
    const handleBack = () => {
        goto("/profile"); // Redirect to the homepage or another route
    };
</script>

<PageContainer>
    <!-- Page Header -->
    <Header title="Achievements" showBack={true} />

    <!-- Achievements List -->
    <AchievementsList />
</PageContainer>
