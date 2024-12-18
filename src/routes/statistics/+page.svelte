<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import AnimatedNumber from '$lib/components/AnimatedNumber.svelte';
  import { dailyUsage, monthlyUsage } from '$lib/stores/waterData';

  let mounted = false;
  let totalSaved = 0;
  let weeklyTarget = 1500; // Weekly target
  let weeklyUsage = 0;
  let weeklyProgress = 0; // Initialize to 0
  let averageDaily = 0; // Initialize to 0

  const userId = '1';
  const strokeDashoffset = tweened(226.19, { duration: 1000, easing: cubicOut });

  function formatMonthYear(dateStr: string): string {
    const [year, month] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    return `${date.toLocaleString('default', { month: 'long' })} ${year}`;
  }

  // Fetch statistics data
  const fetchStats = async () => {
    try {
      const response = await fetch(`http://localhost:3011/waterlog/stats?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        dailyUsage.set(data.stats.dailyUsage);
        monthlyUsage.set(data.stats.monthlyUsage);

        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        weeklyUsage = data.stats.dailyUsage
          .filter(day => day.date >= startOfWeek.toISOString().split('T')[0])
          .reduce((sum, day) => sum + day.totalUsage, 0);

        totalSaved = data.stats.weeklyUsage.reduce((sum, week) => {
          const weeklySaved = Math.max(0, weeklyTarget - week.totalUsage);
          return sum + weeklySaved;
        }, 0);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  $: weeklyProgress = weeklyUsage > 0 ? (weeklyUsage / weeklyTarget) * 100 : 0;
  $: if ($dailyUsage.length > 0) {
    const totalUsage = $dailyUsage.reduce((total, day) => total + day.totalUsage, 0);
    averageDaily = totalUsage / $dailyUsage.length;
  }

  onMount(async () => {
    mounted = true;
    await fetchStats();
  });
</script>

<div class="w-full max-w-7xl mx-auto p-4 space-y-8">
  {#if mounted}
    <!-- Header Section -->
    <div class="bg-green-500 rounded-xl p-6 text-white" transition:slide>
      <h1 class="text-3xl font-bold mb-2">Water Usage Statistics</h1>
      <p class="opacity-90">Track your water consumption and savings</p>
    </div>

    <!-- Weekly Progress Card -->
    <div class="bg-emerald-400 rounded-lg p-4 text-white" transition:slide>
      <h2 class="text-xl font-semibold mb-2">Weekly Progress</h2>
      <div class="flex items-center gap-4">
        <div class="relative w-20 h-20">
          <svg class="w-full h-full transform -rotate-90">
            <circle
              class="text-emerald-200 stroke-current"
              stroke-width="8"
              cx="40"
              cy="40"
              r="36"
              fill="transparent"
            />
            <circle
              class="text-white stroke-current"
              stroke-width="8"
              stroke-linecap="round"
              cx="40"
              cy="40"
              r="36"
              fill="transparent"
              style="stroke-dasharray: 226.19; stroke-dashoffset: {$strokeDashoffset}"
            />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {Math.round(weeklyProgress)}%
          </span>
        </div>
        <div>
          <p class="text-sm opacity-90">Current Usage: {Math.round(weeklyUsage)}L</p>
          <p class="text-sm opacity-90">Target: {weeklyTarget}L</p>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <!-- Total Water Saved -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade="{{ delay: 100 }}">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-white-100 rounded-lg">
            <!--water drop Svg-->
<svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#239B02;" d="M323.2,84.8c5.6-22.4,22.4-46.4,39.2-50.4l0,0l0,0l0,0l0,0c12,11.2,15.2,40,9.6,62.4 s-19.2,32-35.2,36l0,0l0,0l0,0l0,0C324,122.4,316.8,108,323.2,84.8z"></path> <path style="fill:#34B515;" d="M336.8,134.4L336.8,134.4L336.8,134.4C336,134.4,336,134.4,336.8,134.4L336.8,134.4 c-12.8-11.2-19.2-26.4-13.6-48.8s22.4-46.4,39.2-50.4l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M381.6,119.2c18.4-18.4,48-31.2,65.6-26.4l0,0l0,0l0,0l0,0c5.6,17.6-8,47.2-26.4,65.6 s-36.8,20-54.4,15.2l0,0l0,0l0,0l0,0C361.6,155.2,363.2,137.6,381.6,119.2z"></path> <path style="fill:#34B515;" d="M367.2,173.6L367.2,173.6C366.4,173.6,366.4,173.6,367.2,173.6C366.4,173.6,366.4,173.6,367.2,173.6 L367.2,173.6c-5.6-18.4-4-36,14.4-54.4s48-31.2,65.6-26.4l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M435.2,258.4c22.4,7.2,45.6,24.8,48.8,41.6l0,0l0,0l0,0l0,0c-12,12-41.6,13.6-64,6.4 s-32-20.8-35.2-37.6l0,0l0,0l0,0l0,0C396.8,257.6,412.8,251.2,435.2,258.4z"></path> <path style="fill:#34B515;" d="M384.8,269.6L384.8,269.6L384.8,269.6L384.8,269.6L384.8,269.6c12-12,27.2-18.4,49.6-11.2 c22.4,7.2,45.6,24.8,48.8,41.6l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M417.6,324c17.6,12,32.8,34.4,31.2,49.6l0,0H448l0,0l0,0c-13.6,7.2-39.2,0.8-56.8-12 c-17.6-12-21.6-27.2-20-42.4l0,0l0,0l0,0l0,0C385.6,312.8,400.8,311.2,417.6,324z"></path> <path style="fill:#34B515;" d="M371.2,320L371.2,320L371.2,320C371.2,319.2,371.2,319.2,371.2,320L371.2,320c13.6-7.2,28.8-8,46.4,4 s32.8,34.4,31.2,49.6l0,0H448l0,0l0,0"></path> <path style="fill:#239B02;" d="M384.8,380c12,15.2,19.2,37.6,13.6,50.4l0,0l0,0l0,0l0,0c-13.6,2.4-33.6-9.6-45.6-24.8 c-12-15.2-12-28-6.4-40.8l0,0l0,0l0,0l0,0C360,362.4,372.8,365.6,384.8,380z"></path> <path style="fill:#34B515;" d="M346.4,364.8L346.4,364.8L346.4,364.8L346.4,364.8L346.4,364.8c13.6-2.4,26.4,0,38.4,15.2 s19.2,37.6,13.6,50.4l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M347.2,461.6L347.2,461.6c-9.6,0-24-12.8-30.4-24.8c-7.2-12-5.6-22.4,0-30.4l0,0l0,0l0,0l0,0 c10.4,0,19.2,3.2,26.4,16C349.6,433.6,352,452.8,347.2,461.6"></path> <g> <path style="fill:#34B515;" d="M316.8,405.6L316.8,405.6L316.8,405.6L316.8,405.6L316.8,405.6c10.4,0,19.2,3.2,26.4,15.2 c7.2,12,9.6,31.2,4,40"></path> </g> <path style="fill:#239B02;" d="M428,185.6c26.4-2.4,57.6,5.6,68,21.6l0,0l0,0l0,0l0,0c-7.2,17.6-36,32-61.6,34.4s-41.6-7.2-52-22.4 l0,0l0,0l0,0l0,0C389.6,201.6,402.4,188.8,428,185.6z"></path> <path style="fill:#34B515;" d="M382.4,219.2L382.4,219.2L382.4,219.2L382.4,219.2L382.4,219.2c7.2-17.6,20-30.4,45.6-33.6 c26.4-2.4,57.6,5.6,68,21.6l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M172.8,84.8c-5.6-22.4-22.4-46.4-39.2-50.4l0,0l0,0l0,0l0,0c-12,11.2-15.2,40-9.6,62.4 c5.6,22.4,19.2,32,35.2,36l0,0l0,0l0,0l0,0C172,122.4,179.2,108,172.8,84.8z"></path> <path style="fill:#34B515;" d="M159.2,134.4L159.2,134.4L159.2,134.4C160,134.4,160,134.4,159.2,134.4L159.2,134.4 c12.8-11.2,19.2-26.4,13.6-48.8c-5.6-22.4-22.4-46.4-39.2-50.4l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M114.4,119.2C96,100.8,66.4,88,48.8,92.8l0,0l0,0l0,0l0,0c-5.6,17.6,8,47.2,26.4,65.6 s36.8,20,54.4,15.2l0,0l0,0l0,0l0,0C134.4,155.2,132.8,137.6,114.4,119.2z"></path> <path style="fill:#34B515;" d="M128.8,173.6L128.8,173.6C129.6,173.6,129.6,173.6,128.8,173.6C129.6,173.6,129.6,173.6,128.8,173.6 L128.8,173.6c5.6-18.4,4-36-14.4-54.4S66.4,88,48.8,92.8l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M60.8,258.4C38.4,265.6,15.2,283.2,12,300l0,0l0,0l0,0l0,0c12,12,41.6,13.6,64,6.4s32-20.8,35.2-37.6 l0,0l0,0l0,0l0,0C99.2,257.6,83.2,251.2,60.8,258.4z"></path> <path style="fill:#34B515;" d="M111.2,269.6L111.2,269.6L111.2,269.6L111.2,269.6L111.2,269.6c-12-12-27.2-18.4-49.6-11.2 C39.2,265.6,16,283.2,12.8,300l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M78.4,324c-17.6,12-32.8,34.4-31.2,49.6l0,0H48l0,0l0,0c13.6,7.2,39.2,0.8,56.8-12 c17.6-12,21.6-27.2,20-42.4l0,0l0,0l0,0l0,0C110.4,312.8,95.2,311.2,78.4,324z"></path> <path style="fill:#34B515;" d="M124.8,320L124.8,320L124.8,320C124.8,319.2,124.8,319.2,124.8,320L124.8,320 c-13.6-7.2-28.8-8-46.4,4s-32.8,34.4-31.2,49.6l0,0H48l0,0l0,0"></path> <path style="fill:#239B02;" d="M111.2,380c-12,15.2-19.2,37.6-13.6,50.4l0,0l0,0l0,0l0,0c13.6,2.4,33.6-9.6,45.6-24.8 c12-15.2,12-28,6.4-40.8l0,0l0,0l0,0l0,0C136,362.4,123.2,365.6,111.2,380z"></path> <path style="fill:#34B515;" d="M149.6,364.8L149.6,364.8L149.6,364.8L149.6,364.8L149.6,364.8c-13.6-2.4-26.4,0-38.4,15.2 S92,417.6,97.6,430.4l0,0l0,0l0,0l0,0"></path> <path style="fill:#239B02;" d="M148.8,461.6L148.8,461.6c9.6,0,24-12.8,30.4-24.8c7.2-12,5.6-22.4,0-30.4l0,0l0,0l0,0l0,0 c-10.4,0-19.2,3.2-26.4,16C146.4,433.6,144,452.8,148.8,461.6"></path> <path style="fill:#34B515;" d="M179.2,405.6L179.2,405.6L179.2,405.6L179.2,405.6L179.2,405.6c-10.4,0-19.2,3.2-26.4,15.2 s-9.6,31.2-4,40l0,0c0,0,0-2.4,0,0l0,0V460"></path> <path style="fill:#239B02;" d="M68,185.6c-26.4-2.4-57.6,5.6-68,21.6l0,0l0,0l0,0l0,0c7.2,17.6,36,32,61.6,34.4s41.6-7.2,52-22.4 l0,0l0,0l0,0l0,0C106.4,201.6,93.6,188.8,68,185.6z"></path> <path style="fill:#34B515;" d="M113.6,219.2L113.6,219.2L113.6,219.2L113.6,219.2L113.6,219.2c-7.2-17.6-20-30.4-45.6-33.6 c-26.4-2.4-57.6,5.6-68,21.6l0,0l0,0l0,0l0,0"></path> <path style="fill:#00A1AD;" d="M325.6,246.4L325.6,246.4L248,88.8l-78.4,157.6l0,0c-4.8,10.4-8,22.4-8,35.2 c0.8,47.2,39.2,85.6,86.4,85.6s85.6-38.4,85.6-85.6C333.6,269.6,330.4,257.6,325.6,246.4z"></path> <path style="fill:#027F89;" d="M248,367.2c47.2,0,85.6-38.4,85.6-85.6c0-12.8-2.4-24.8-7.2-35.2l0,0L248,88.8"></path> <path style="fill:#63D6D3;" d="M196.8,325.6c10.4,14.4,24,21.6,29.6,17.6c6.4-4.8,2.4-19.2-8-33.6s-24-21.6-29.6-17.6 S186.4,311.2,196.8,325.6z"></path> </g></svg>
          </div>
          <div>
            <p class="text-sm text-gray-700">Total Water Saved</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={totalSaved} />L
            </p>
          </div>
        </div>
      </div>

      <!-- Average Daily Usage -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200 " transition:fade="{{ delay: 200 }}">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-white-100 rounded-lg">
            <svg fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 56.00 56.00" xml:space="preserve" stroke="#000000" stroke-width="0.00056"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M47.533,0H8.467C3.798,0,0,3.798,0,8.467v39.066C0,52.202,3.798,56,8.467,56h39.066C52.202,56,56,52.202,56,47.533V8.467 C56,3.798,52.202,0,47.533,0z M54,47.533C54,51.099,51.099,54,47.533,54H8.467C4.901,54,2,51.099,2,47.533V30.414l6.247-6.247 C9.038,24.691,9.983,25,11,25s1.962-0.309,2.753-0.833l10.08,10.08C23.309,35.038,23,35.983,23,37c0,2.757,2.243,5,5,5s5-2.243,5-5 c0-1.017-0.309-1.962-0.833-2.753L46,20.414V27c0,0.553,0.447,1,1,1s1-0.447,1-1V17H38c-0.553,0-1,0.447-1,1s0.447,1,1,1h6.586 L30.753,32.833C29.962,32.309,29.017,32,28,32s-1.962,0.309-2.753,0.833l-10.08-10.08C15.691,21.962,16,21.017,16,20 c0-2.757-2.243-5-5-5s-5,2.243-5,5c0,1.017,0.309,1.962,0.833,2.753L2,27.586V8.467C2,4.901,4.901,2,8.467,2h39.066 C51.099,2,54,4.901,54,8.467V47.533z M11,23c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3S12.654,23,11,23z M31,37 c0,1.654-1.346,3-3,3s-3-1.346-3-3s1.346-3,3-3S31,35.346,31,37z"></path> </g></svg>
          </div>
          <div>
            <p class="text-sm text-gray-700">Average Daily Usage</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={Math.round(averageDaily)} />L
            </p>
          </div>
        </div>
      </div>

      <!-- Money Saved -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade="{{ delay: 300 }}">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-white-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">

              <defs>
              </defs>
              <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                <rect x="4.02" y="23.49" rx="0" ry="0" width="81.96" height="43.02" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(62,108,144); fill-rule: nonzero; opacity: 1;" transform=" matrix(0.9791 -0.2035 0.2035 0.9791 -8.217 10.1009) "/>
                <path d="M 9.255 74.898 c -0.097 0 -0.192 -0.028 -0.274 -0.082 C 8.87 74.744 8.792 74.63 8.765 74.5 L 0.01 32.385 c -0.056 -0.27 0.118 -0.535 0.388 -0.591 l 80.245 -16.682 c 0.129 -0.025 0.265 -0.001 0.376 0.072 c 0.11 0.073 0.188 0.187 0.215 0.316 l 8.755 42.115 c 0.057 0.271 -0.117 0.535 -0.388 0.591 L 9.356 74.888 C 9.323 74.895 9.289 74.898 9.255 74.898 z M 1.091 32.671 l 8.551 41.137 l 79.267 -16.479 l -8.552 -41.136 L 1.091 32.671 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(18,34,46); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <rect x="4.02" y="23.49" rx="0" ry="0" width="81.96" height="43.02" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(179,229,159); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>
                <path d="M 59.284 41.842 h -0.759 c -0.646 0 -1.236 -0.398 -1.447 -1.009 c -0.169 -0.491 -0.368 -0.967 -0.594 -1.429 c -0.282 -0.578 -0.149 -1.273 0.305 -1.727 l 0.544 -0.544 c 0.238 -0.238 0.238 -0.625 0 -0.863 l -3.604 -3.604 c -0.238 -0.238 -0.625 -0.238 -0.863 0 l -0.544 0.544 c -0.455 0.455 -1.15 0.587 -1.727 0.305 c -0.461 -0.226 -0.938 -0.424 -1.429 -0.594 c -0.611 -0.211 -1.009 -0.801 -1.009 -1.447 v -0.759 c 0 -0.337 -0.273 -0.61 -0.61 -0.61 h -5.096 c -0.337 0 -0.61 0.273 -0.61 0.61 v 0.759 c 0 0.646 -0.398 1.236 -1.009 1.447 c -0.491 0.169 -0.967 0.368 -1.429 0.594 c -0.578 0.282 -1.273 0.149 -1.727 -0.305 l -0.544 -0.544 c -0.238 -0.238 -0.625 -0.238 -0.863 0 l -3.604 3.604 c -0.238 0.238 -0.238 0.625 0 0.863 l 0.544 0.544 c 0.455 0.455 0.587 1.15 0.305 1.727 c -0.226 0.461 -0.424 0.938 -0.594 1.429 c -0.211 0.611 -0.801 1.009 -1.447 1.009 h -0.759 c -0.337 0 -0.61 0.273 -0.61 0.61 v 5.096 c 0 0.337 0.273 0.61 0.61 0.61 h 0.759 c 0.646 0 1.236 0.398 1.447 1.009 c 0.169 0.491 0.368 0.967 0.594 1.429 c 0.282 0.578 0.149 1.273 -0.305 1.727 l -0.544 0.544 c -0.238 0.238 -0.238 0.625 0 0.863 l 3.604 3.604 c 0.238 0.238 0.625 0.238 0.863 0 l 0.544 -0.544 c 0.455 -0.455 1.15 -0.587 1.727 -0.305 c 0.461 0.226 0.938 0.424 1.429 0.594 c 0.611 0.211 1.009 0.801 1.009 1.447 v 0.759 c 0 0.337 0.273 0.61 0.61 0.61 h 5.096 c 0.337 0 0.61 -0.273 0.61 -0.61 v -0.759 c 0 -0.646 0.398 -1.236 1.009 -1.447 c 0.491 -0.169 0.967 -0.368 1.429 -0.594 c 0.578 -0.282 1.273 -0.149 1.727 0.305 l 0.544 0.544 c 0.238 0.238 0.625 0.238 0.863 0 l 3.604 -3.604 c 0.238 -0.238 0.238 -0.625 0 -0.863 l -0.544 -0.544 c -0.455 -0.455 -0.587 -1.15 -0.305 -1.727 c 0.226 -0.461 0.424 -0.938 0.594 -1.429 c 0.211 -0.611 0.801 -1.009 1.447 -1.009 h 0.759 c 0.337 0 0.61 -0.273 0.61 -0.61 v -5.096 C 59.894 42.115 59.621 41.842 59.284 41.842 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(117,159,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 45.747 54.18 c -5.674 0.448 -10.374 -4.252 -9.927 -9.927 c 0.352 -4.464 3.968 -8.08 8.432 -8.432 c 5.674 -0.447 10.374 4.252 9.927 9.927 C 53.828 50.211 50.211 53.827 45.747 54.18 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,208,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 47.548 60.395 h -5.096 c -0.612 0 -1.11 -0.498 -1.11 -1.11 v -0.759 c 0 -0.444 -0.27 -0.836 -0.672 -0.975 c -0.5 -0.172 -1 -0.38 -1.485 -0.617 c -0.378 -0.184 -0.842 -0.102 -1.154 0.21 l -0.544 0.544 c -0.419 0.42 -1.151 0.42 -1.57 0 l -3.604 -3.604 c -0.21 -0.21 -0.325 -0.488 -0.325 -0.785 s 0.115 -0.575 0.325 -0.785 l 0.544 -0.544 c 0.311 -0.312 0.395 -0.775 0.209 -1.154 c -0.235 -0.48 -0.442 -0.98 -0.617 -1.485 c -0.139 -0.401 -0.531 -0.672 -0.975 -0.672 h -0.759 c -0.612 0 -1.11 -0.498 -1.11 -1.11 v -5.096 c 0 -0.612 0.498 -1.11 1.11 -1.11 h 0.759 c 0.444 0 0.836 -0.27 0.975 -0.672 c 0.174 -0.503 0.381 -1.003 0.617 -1.485 c 0.186 -0.379 0.101 -0.843 -0.209 -1.154 l -0.544 -0.544 c -0.21 -0.209 -0.325 -0.488 -0.325 -0.785 c 0 -0.297 0.115 -0.576 0.325 -0.785 l 3.604 -3.604 c 0.433 -0.433 1.137 -0.432 1.569 0 l 0.544 0.545 c 0.313 0.311 0.776 0.396 1.154 0.209 c 0.484 -0.236 0.983 -0.443 1.485 -0.617 c 0.402 -0.139 0.672 -0.53 0.672 -0.975 v -0.759 c 0 -0.612 0.498 -1.11 1.11 -1.11 h 5.096 c 0.612 0 1.11 0.498 1.11 1.11 v 0.759 c 0 0.444 0.271 0.836 0.672 0.975 c 0.505 0.174 1.005 0.382 1.485 0.617 c 0.376 0.185 0.842 0.103 1.154 -0.209 l 0.544 -0.544 c 0.42 -0.42 1.15 -0.42 1.57 0 l 3.604 3.604 c 0.21 0.209 0.325 0.488 0.325 0.785 c 0 0.296 -0.115 0.575 -0.325 0.785 l -0.544 0.544 c -0.312 0.311 -0.396 0.775 -0.21 1.154 c 0.237 0.486 0.445 0.986 0.617 1.486 c 0.139 0.401 0.53 0.671 0.975 0.671 h 0.759 c 0.612 0 1.11 0.498 1.11 1.11 v 5.096 c 0 0.612 -0.498 1.11 -1.11 1.11 h -0.759 c -0.444 0 -0.836 0.271 -0.975 0.672 c -0.173 0.503 -0.381 1.002 -0.617 1.485 c -0.186 0.379 -0.102 0.843 0.21 1.154 l 0.544 0.544 c 0.21 0.21 0.325 0.488 0.325 0.785 s -0.115 0.575 -0.325 0.785 l -3.604 3.604 c -0.42 0.42 -1.15 0.42 -1.57 0 l -0.544 -0.544 c -0.312 -0.311 -0.776 -0.396 -1.154 -0.21 c -0.483 0.236 -0.982 0.444 -1.485 0.617 c -0.401 0.139 -0.672 0.53 -0.672 0.975 v 0.759 C 48.658 59.896 48.16 60.395 47.548 60.395 z M 38.761 55.836 c 0.293 0 0.588 0.065 0.863 0.199 c 0.449 0.22 0.911 0.411 1.372 0.57 c 0.806 0.278 1.346 1.05 1.346 1.92 v 0.759 c 0 0.061 0.049 0.11 0.11 0.11 h 5.096 c 0.061 0 0.11 -0.05 0.11 -0.11 v -0.759 c 0 -0.87 0.541 -1.642 1.346 -1.92 c 0.464 -0.16 0.926 -0.352 1.372 -0.57 c 0.764 -0.372 1.689 -0.212 2.301 0.401 l 0.544 0.544 c 0.037 0.037 0.119 0.037 0.156 0 l 3.604 -3.604 c 0.037 -0.037 0.037 -0.119 0 -0.156 l -0.544 -0.544 c -0.613 -0.613 -0.774 -1.538 -0.401 -2.301 c 0.219 -0.446 0.41 -0.908 0.57 -1.372 c 0.278 -0.805 1.05 -1.346 1.92 -1.346 h 0.759 c 0.061 0 0.11 -0.05 0.11 -0.11 v -5.096 c 0 -0.061 -0.05 -0.11 -0.11 -0.11 h -0.759 c -0.87 0 -1.642 -0.541 -1.92 -1.346 c -0.159 -0.461 -0.351 -0.923 -0.57 -1.372 c -0.373 -0.764 -0.212 -1.688 0.401 -2.301 l 0.544 -0.544 c 0.037 -0.037 0.037 -0.119 0 -0.156 l -3.604 -3.604 c -0.037 -0.037 -0.119 -0.037 -0.156 0 l -0.544 0.544 c -0.613 0.612 -1.538 0.773 -2.301 0.4 c -0.444 -0.217 -0.906 -0.409 -1.372 -0.57 c -0.805 -0.278 -1.346 -1.05 -1.346 -1.92 v -0.759 c 0 -0.061 -0.05 -0.11 -0.11 -0.11 h -5.096 c -0.061 0 -0.11 0.049 -0.11 0.11 v 0.759 c 0 0.871 -0.541 1.642 -1.346 1.92 c -0.463 0.16 -0.925 0.352 -1.373 0.57 c -0.761 0.374 -1.687 0.213 -2.3 -0.4 l -0.544 -0.544 c -0.043 -0.043 -0.112 -0.042 -0.156 0 l -3.603 3.604 c -0.037 0.037 -0.037 0.119 0 0.156 l 0.544 0.544 c 0.613 0.613 0.774 1.537 0.401 2.301 c -0.218 0.446 -0.41 0.907 -0.57 1.372 c -0.278 0.805 -1.049 1.346 -1.92 1.346 h -0.759 c -0.061 0 -0.11 0.049 -0.11 0.11 v 5.096 c 0 0.061 0.049 0.11 0.11 0.11 h 0.759 c 0.87 0 1.642 0.541 1.92 1.346 c 0.161 0.466 0.353 0.928 0.57 1.372 c 0.374 0.763 0.213 1.688 -0.4 2.301 l -0.544 0.544 c -0.037 0.037 -0.037 0.119 0 0.156 l 3.604 3.604 c 0.038 0.037 0.119 0.037 0.156 0 l 0.544 -0.544 C 37.716 56.044 38.237 55.836 38.761 55.836 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(18,34,46); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 45.013 54.709 c -2.577 0 -5.048 -1.014 -6.878 -2.844 c -2.012 -2.013 -3.038 -4.801 -2.813 -7.651 c 0.371 -4.699 4.193 -8.521 8.892 -8.892 c 2.851 -0.228 5.639 0.8 7.652 2.813 c 2.013 2.012 3.037 4.801 2.813 7.651 c -0.369 4.698 -4.192 8.521 -8.891 8.892 h 0 C 45.528 54.698 45.27 54.709 45.013 54.709 z M 44.987 36.292 c -0.231 0 -0.463 0.009 -0.695 0.027 c -4.213 0.332 -7.641 3.76 -7.973 7.974 c -0.202 2.558 0.718 5.06 2.523 6.866 c 1.805 1.805 4.308 2.717 6.867 2.523 c 4.213 -0.333 7.641 -3.761 7.973 -7.974 c 0.201 -2.559 -0.719 -5.061 -2.523 -6.866 C 49.518 37.201 47.299 36.292 44.987 36.292 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(18,34,46); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 46.376 44.424 h -2.752 c -0.489 0 -0.887 -0.398 -0.887 -0.887 v -2.135 c 0 -0.489 0.398 -0.887 0.887 -0.887 h 2.752 c 0.489 0 0.887 0.398 0.887 0.887 c 0 0.276 0.224 0.5 0.5 0.5 s 0.5 -0.224 0.5 -0.5 c 0 -1.041 -0.847 -1.887 -1.887 -1.887 H 45.5 v -1.218 c 0 -0.276 -0.224 -0.5 -0.5 -0.5 s -0.5 0.224 -0.5 0.5 v 1.218 h -0.876 c -1.041 0 -1.887 0.847 -1.887 1.887 v 2.135 c 0 1.041 0.846 1.887 1.887 1.887 h 2.752 c 0.489 0 0.887 0.398 0.887 0.887 v 2.135 c 0 0.489 -0.397 0.887 -0.887 0.887 h -2.752 c -0.489 0 -0.887 -0.397 -0.887 -0.887 c 0 -0.276 -0.224 -0.5 -0.5 -0.5 s -0.5 0.224 -0.5 0.5 c 0 1.04 0.846 1.887 1.887 1.887 H 44.5 v 1.369 c 0 0.276 0.224 0.5 0.5 0.5 s 0.5 -0.224 0.5 -0.5 v -1.369 h 0.876 c 1.04 0 1.887 -0.847 1.887 -1.887 v -2.135 C 48.263 45.271 47.416 44.424 46.376 44.424 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(18,34,46); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 15.711 23.492 c 0 6.457 -5.234 11.691 -11.691 11.691 V 23.492 H 15.711 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(117,159,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 15.711 66.508 c 0 -6.457 -5.234 -11.691 -11.691 -11.691 v 11.691 H 15.711 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(117,159,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 74.329 23.492 c 0 6.457 5.234 11.691 11.691 11.691 V 23.492 H 74.329 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(117,159,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 74.329 66.508 c 0 -6.457 5.234 -11.691 11.691 -11.691 v 11.691 H 74.329 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(117,159,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 86.521 35.184 V 23.492 c 0 -0.276 -0.224 -0.5 -0.5 -0.5 h -0.04 H 74.329 H 15.711 H 4.02 c -0.276 0 -0.5 0.224 -0.5 0.5 v 11.691 v 19.633 v 11.691 c 0 0.276 0.224 0.5 0.5 0.5 h 11.691 h 58.618 H 85.98 h 0.04 c 0.276 0 0.5 -0.224 0.5 -0.5 V 54.816 c 0 -0.07 -0.014 -0.136 -0.04 -0.196 V 35.379 C 86.506 35.319 86.521 35.253 86.521 35.184 z M 85.48 54.344 c -6.304 0.278 -11.368 5.355 -11.626 11.664 H 16.186 C 15.927 59.685 10.842 54.6 4.52 54.342 V 35.658 c 6.322 -0.258 11.408 -5.344 11.666 -11.666 h 57.669 c 0.258 6.309 5.322 11.386 11.626 11.664 V 54.344 z M 85.48 23.992 v 10.677 c -5.756 -0.275 -10.385 -4.916 -10.641 -10.677 H 85.48 z M 4.52 23.992 H 15.2 c -0.255 5.774 -4.906 10.425 -10.68 10.68 V 23.992 z M 4.52 66.008 V 55.327 c 5.774 0.256 10.425 4.906 10.68 10.681 H 4.52 z M 74.84 66.008 c 0.255 -5.761 4.885 -10.401 10.641 -10.677 v 10.677 H 74.84 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(18,34,46); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
              </g>
              </svg>
          </div>
          <div>
            <p class="text-sm text-gray-700">Money Saved</p>
            <p class="text-2xl font-bold">
              $<AnimatedNumber value={parseFloat((totalSaved * 0.002).toFixed(2))} />
            </p>
          </div>
        </div>
      </div>

      <!-- Environmental Impact -->
      <div class="bg-white rounded-xl p-6 shadow-sm border-solid border-2 border-green-200" transition:fade="{{ delay: 400 }}">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-white-100 rounded-lg">
            <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 474.08 474.08" xml:space="preserve" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.94817"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style="fill:#ACDDDE;" cx="237.042" cy="236.966" r="236.966"></circle> <path style="fill:#9ACA42;" d="M237.016,474.085c100.781,0,186.811-62.944,221.074-151.635c-61.87-37.302-142.322-55-230.283-55 c-80.886,0-155.414,14.982-214.994,46.39C44.708,407.044,133.006,474.085,237.016,474.085z"></path> <path style="fill:#9F7235;" d="M239.725,181.075c-6.267,0-11.345,5.078-11.345,11.341v197.303c0,6.264,5.078,11.349,11.345,11.349 c6.267,0,11.341-5.085,11.341-11.349V192.416C251.066,186.156,245.993,181.075,239.725,181.075z"></path> <path style="fill:#B28D5D;" d="M239.725,181.075c-6.267,0-11.345,5.078-11.345,11.341v197.303c0,6.264,5.078,11.349,11.345,11.349 V181.075z"></path> <path style="fill:#15AA63;" d="M350.642,302.207c-6.297-10.327-98.708-122.37-98.708-122.37c-7.057-13.298-18.499-13.298-25.564,0 c0,0-92.167,110.565-98.704,122.37c-6.533,11.787-6.133,36.737,0,48.074c10.993,20.351,206.594,21.377,222.975,0 C358.578,339.924,356.943,312.534,350.642,302.207z"></path> <path style="fill:#1EAE64;" d="M323.365,233.265l-74.551-108.593c-5.336-10.035-13.979-10.035-19.315,0l-74.547,108.593 c-5.332,10.024-7.296,26.278-1.964,36.314h172.338C330.65,259.543,328.701,243.285,323.365,233.265z"></path> <path style="fill:#28B467;" d="M179.344,194.066c-3.794-7.128-3.794-18.675,0-25.803l52.953-99.594c3.787-7.136,9.923-7.136,13.71,0 l52.961,99.598c3.794,7.124,3.794,18.671,0,25.803H179.344V194.066z"></path> </g></svg>          </div>
          <div>
            <p class="text-sm text-gray-700">Trees Equivalent</p>
            <p class="text-2xl font-bold">
              <AnimatedNumber value={Math.round(totalSaved / 100)} />
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Rest of the code remains unchanged -->
    <!-- Monthly Usage Breakdown -->
    <div class="w-full max-w-7xl mx-auto p-4 space-y-8">
      {#if mounted}
        <!-- Monthly Usage Breakdown -->
        <div class="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <h2 class="text-xl font-semibold">Monthly Usage Breakdown</h2>
    
          {#each $monthlyUsage as month, index}
            <div class="space-y-2" transition:slide="{{ delay: index * 100 }}">
              <div class="flex justify-between items-center">
                <!-- Format Month and Year -->
                <span class="font-medium">{formatMonthYear(month.month)}</span>
                <span class="text-gray-600">
                  <AnimatedNumber value={month.totalUsage} />L
                </span>
              </div>
    
              <!-- Stacked bar chart -->
              <div class="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                <!-- Shower Bar -->
                <div
                  class="absolute h-full bg-blue-500"
                  style="width: {(month.breakdown.shower.usage / month.totalUsage) * 100}%"
                ></div>
                <!-- Sink Bar -->
                <div
                  class="absolute h-full bg-cyan-500"
                  style="
                    width: {(month.breakdown.sink.usage / month.totalUsage) * 100}%;
                    left: {(month.breakdown.shower.usage / month.totalUsage) * 100}%;
                  "
                ></div>
                <!-- Toilet Bar -->
                <div
                  class="absolute h-full bg-violet-500"
                  style="
                    width: {(month.breakdown.toilet.usage / month.totalUsage) * 100}%;
                    left: {((month.breakdown.shower.usage + month.breakdown.sink.usage) / month.totalUsage) * 100}%;
                  "
                ></div>
                <!-- Washing Bar -->
                <div
                  class="absolute h-full bg-yellow-500"
                  style="
                    width: {(month.breakdown.washing.usage / month.totalUsage) * 100}%;
                    left: {((month.breakdown.shower.usage + month.breakdown.sink.usage + month.breakdown.toilet.usage) / month.totalUsage) * 100}%;
                  "
                ></div>
                <!-- Other Bar -->
                <div
                  class="absolute h-full bg-gray-500"
                  style="
                    width: {(month.breakdown.other.usage / month.totalUsage) * 100}%;
                    left: {((month.breakdown.shower.usage + month.breakdown.sink.usage + month.breakdown.toilet.usage + month.breakdown.washing.usage) / month.totalUsage) * 100}%;
                  "
                ></div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Today's Usage -->
    <div class="bg-white rounded-xl p-6 shadow-sm" transition:fade>
      <h2 class="text-xl font-semibold mb-4">Today's Usage</h2>
      {#if $dailyUsage.length > 0}
        {@const today = $dailyUsage[$dailyUsage.length - 1]}
        <div class="flex justify-between items-center">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>
                Shower: <AnimatedNumber value={today.shower.usage} />L
                ({today.shower.times} uses)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-violet-500"></div>
              <span>
                Toilet: <AnimatedNumber value={today.toilet.usage} />L
                ({today.toilet.times} uses)
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>
                Tap: <AnimatedNumber value={today.tap.usage} />L
                ({today.tap.times} uses)
              </span>
            </div>
          </div>
          <div class="text-center">
            <span class="text-3xl font-bold">
              <AnimatedNumber value={today.totalUsage} />L
            </span>
            <span class="block text-gray-500">Total</span>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  circle {
    transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .progress-bar {
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>