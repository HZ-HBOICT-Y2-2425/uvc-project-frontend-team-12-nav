<script>
  let showPassword = false;

  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
  };
</script>

<main class="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 overflow-hidden">
  <!-- Slot for Background Elements -->
  <slot name="background">
    <!-- Tree and Logo Section -->
    <div class="flex items-center justify-center mb-6 space-x-4">

      <div class="logo text-center ml-24 mt-36">
        <slot name="logo">
          <img src="/beaver_logo.svg" alt="BeaverWize Logo" class="w-25 mx-auto mb-2" />
        </slot>
        <h1 class="text-2xl font-bold">BeaverWize</h1>
      </div>
      <img src="/tree1.svg" alt="tree1" class="w-20 h-auto" />
    </div>
  </slot>

  <!-- Form Section -->
  <h2 class="text-xl font-semibold mb-2">Create an account</h2>
  <p class="text-gray-600 mb-6">Connect with your friends today!</p>

  <form on:submit={handleSubmit} class="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
    <input
      type="text"
      placeholder="Enter Your Name"
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <input
      type="email"
      placeholder="Enter Your Email"
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <input
      type="text"
      placeholder="Enter Your Postal Code"
      required
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
    />
    <div class="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Your Password"
        required
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
      />
      <button
        type="button"
        on:click={togglePasswordVisibility}
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
    <button
      type="submit"
      class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400"
    >
      Sign Up
    </button>
  </form>

  <!-- "Or With" Section -->
  <div class="flex flex-col items-center my-6 space-y-4">
    <span class="text-gray-500">Or With</span>
    <button class="flex items-center justify-center gap-2 border py-2 px-4 rounded-lg bg-white hover:bg-gray-100">
      <slot name="google-icon">
        <img src="/Google_Logo.svg" alt="Google Icon" class="w-6" />
      </slot>
      <span>Signup with Google</span>
    </button>
  </div>
  <p class="mt-4 text-gray-600">
    Already have an account?
    <a href="/login" class="text-green-500 font-medium hover:underline">Login</a>
  </p>
  <!-- Tree Near Footer -->
  <div class="flex items-center justify-center mt-6">
    <img src="/tree2.svg" alt="tree2" class="w-24 h-auto mr-60" />
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
