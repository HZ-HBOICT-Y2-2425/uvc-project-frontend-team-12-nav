<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Success Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="flex flex-col items-center justify-center h-screen bg-white shadow-lg rounded-none p-6 w-full">
    <!-- Heading -->
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Congratulations</h1>
    <p class="text-xl text-gray-700 font-medium mb-4">For:</p>

    <!-- Highlighted Text -->
    <p class="text-2xl font-semibold text-green-600 mb-6">Saving 110L last week!</p>

    <!-- Image -->
    <div class="flex justify-center mb-6">
      <img src="/beaver.svg" alt="Beaver" class="w-40 h-auto">
    </div>

    <!-- Rewards Section -->
    <p class="text-gray-700 mb-2">You have received</p>
    <p class="text-4xl font-bold text-gray-900">11</p>
    <p class="text-gray-600 mb-6">beaver bucks</p>

    <!-- Redeem Button -->
    <button class="bg-purple-600 text-white text-lg font-medium py-2 px-6 rounded-full hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none">
      redeem
    </button>
  </div>

</body>
</html>
