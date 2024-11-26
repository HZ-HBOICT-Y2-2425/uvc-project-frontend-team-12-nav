<script lang="ts">

  let progress = 0;
  let goal = 20000;
  let communityName = 'HZ Community';

  function updateProgress(event: Event) {
    // Simulate progress update based on user interaction (e.g., clicking a button)
    const target = event.target as HTMLInputElement | null;
    if (target) {
      progress = Number(target.value);
    }
    const progressDisplay = document.getElementById('progressDisplay');
    if (progressDisplay) {
      progressDisplay.innerText = `Progress: ${progress} / ${goal}`;
    }
  }
</script>
<main>
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <img src="https://www.flaticon.com/free-icons/beaver" alt="Beaver Logo" class="w-8 h-8" />
        <h2 class="ml-2 text-xl font-bold">Beaver Wise</h2>
      </div>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
    </div>
    <div class="bg-green-200 rounded-md p-4 mb-4">
      <div class="flex items-center">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c0 1.105-2.29 2-5 2-2.71 0-5-9.895-5-14c0-.39 0-.779.007-1.169.012-.39.028-.778.047-1.168.2-1.1 1.1-1.9 2.2-1.9h12c1.1 0 2 .8 2.2 1.9.02.39.035.778.047 1.168.007.39.007.779.007 1.169 0 4.105-2.29 9-5 9z"></path>
        </svg>
        <span id="progressDisplay" class="ml-2 text-lg font-semibold">Progress: 0 / 20000</span>
      </div>
    </div>
    <input type="range" min="0" max="20000" value="0" class="w-full" on:input={updateProgress} />
  </div>
</div>
    
            <div class="w-full h-[116px] mt-12 bg-green-200 shadow-inner flex justify-around items-center">
                <div class="flex flex-col items-center gap-1">
                    <div class="w-6 h-6"></div>
                    <div class="text-center text-black text-xs font-normal font-poppins">
                        Leave Community
                    </div>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <div class="w-6 h-6"></div>
                    <div class="text-center text-black text-xs font-normal font-poppins">
                        Community Members
                    </div>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <div class="w-6 h-6"></div>
                    <div class="text-center text-black text-xs font-normal font-poppins">
                        Invite
                    </div>
                </div>
            </div>
    
            <div class="max-w-xs mx-auto relative mt-8">
                <div class="w-[80px] h-16 mx-auto"></div>
                <div class="w-[115px] h-[30px] mx-auto relative">
                    <!-- Replace the text below with an image or SVG for the rotated BeaveR Wize -->
                    <div class="absolute text-black font-bold font-ar-one">
                        <!-- Logo rendering -->
                    </div>
                </div>
            </div>
    
            <div class="w-full mt-12 bg-green-400 rounded-[10px] shadow-inner flex justify-center items-center p-4">
                <div class="text-center text-black text-lg font-normal font-poppins leading-7">
                    Save 20.00 Liters of water with your community
                </div>
            </div>
    
            <div class="absolute top-4 left-4 bg-red-600 rounded-[10px] flex items-center gap-2.5 px-4 py-2">
                <div class="text-white text-xs font-normal font-poppins">
                    Back
                </div>
            </div>
    </main>