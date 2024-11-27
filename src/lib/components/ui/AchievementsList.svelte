<script>
    import { achievements } from "../../stores/achievements.ts";
    import AchievementItem from "./AchievementItem.svelte";
  
    let achievementData = [];
    $: achievements.subscribe((data) => {
      achievementData = data;
    });
  </script>
  
  <div class="achievements-list">
    {#each achievementData as achievement}
      <AchievementItem
        title={achievement.title}
        description={achievement.description}
        reward={achievement.reward}
        status={achievement.status}
      />
    {/each}
  </div>
  
  <style>
    .achievements-list {
      padding: 1rem;
    }
  </style>
  