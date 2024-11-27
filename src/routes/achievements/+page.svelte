<script>
    import Header from "$lib/components/layout/Header.svelte";
    import AchievementsList from "$lib/components/ui/AchievementsList.svelte";
    import NavigationButton from "$lib/components/ui/NavigationButton.svelte";
  
    import { goto } from "$app/navigation";
  
    // Back button handler
    const handleBack = () => {
      goto("/profile"); // Redirect to the homepage or another route
    };
  </script>
  
  <main>
    <!-- Back button to navigate to the previous page -->
    <NavigationButton label="Back" onClick={handleBack} />
  
    <!-- Page Header -->
    <Header title="Achievements" />
  
    <!-- Achievements List -->
    <AchievementsList />
  </main>
  
  <style>
    main {
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
      padding: 1rem;
    }
  </style>
  