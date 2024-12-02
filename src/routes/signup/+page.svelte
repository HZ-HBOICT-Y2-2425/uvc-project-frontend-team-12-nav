<script>
  import { fade, fly, scale } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { goto } from '$app/navigation';

  let showPassword = false;
  let name = '';
  let email = '';
  let postalCode = '';
  let password = '';

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      postalCode,
      password,
    };

    try {
      const response = await fetch('http://localhost:3012/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        goto('/questionnaire');
      } else {
        alert(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup.');
    }
  };

  // Animation for the logo
  let logoScale = tweened(1, {
    duration: 500,
    easing: cubicOut
  });

  // Animate logo on component mount
  $: logoScale.set(1.1);
</script>

<main class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 overflow-hidden">
  <!-- Slot for Background Elements -->
  <slot name="background">
    <!-- Tree and Logo Section -->
    <div class="flex items-center justify-center mb-6 space-x-4">
      <div class="logo text-center ml-24 mt-36" in:fly="{{ y: -50, duration: 500 }}">
        <slot name="logo">
          <img
            src="/beaver_logo.svg"
            alt="BeaverWize Logo"
            class="w-25 mx-auto mb-2"
            style="transform: scale({$logoScale});"
          />
        </slot>
        <h1 class="text-2xl font-bold">BeaverWize</h1>
      </div>
      <img src="/tree1.svg" alt="tree1" class="w-20 h-auto" in:fly="{{ x: -100, duration: 700 }}" />
    </div>
  </slot>

  <h2 class="text-xl font-semibold mb-2" in:fade={{ delay: 200, duration: 500 }}>Create an account</h2>
  <p class="text-gray-600 mb-6" in:fade={{ delay: 300, duration: 500 }}>Connect with your friends today!</p>

  <form
    on:submit={handleSubmit}
    class="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
    in:fade="{{ delay: 400, duration: 500 }}"
  >
    <input
      type="text"
      placeholder="Enter Your Name"
      bind:value={name}
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <input
      type="email"
      placeholder="Enter Your Email"
      bind:value={email}
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <input
      type="text"
      placeholder="Enter Your Postal Code"
      bind:value={postalCode}
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <div class="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter Your Password"
        bind:value={password}
        required
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
      />
      <button
        type="button"
        on:click={togglePasswordVisibility}
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
        transition:scale
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
    <button
      type="submit"
      class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400"
      transition:scale
    >
      Sign Up
    </button>
  </form>

  <!-- "Or With" Section -->
  <div class="flex flex-col items-center my-6 space-y-4" in:fade="{{ delay: 600, duration: 500 }}">
    <span class="text-gray-500">Or With</span>
    <button
      class="flex items-center justify-center gap-2 border py-2 px-4 rounded-lg bg-white hover:bg-gray-100"
      transition:scale
    >
      <slot name="google-icon">
        <img src="/Google_Logo.svg" alt="Google Icon" class="w-6" />
      </slot>
      <span>Signup with Google</span>
    </button>
  </div>
  <p class="mt-4 text-gray-600" in:fade="{{ delay: 700, duration: 500 }}">
    Already have an account?
    <a href="/login" class="text-green-500 font-medium hover:underline">Login</a>
  </p>
  <!-- Tree Near Footer -->
  <div class="flex items-center justify-center mt-6">
    <img src="/tree2.svg" alt="tree2" class="w-24 h-auto mr-60" in:fly="{{ x: 100, duration: 700 }}" />
  </div>
</main>

<style>
  .logo img {
    display: block;
  }
  .logo h1 {
    margin-top: 0.5rem;
  }
</style>
