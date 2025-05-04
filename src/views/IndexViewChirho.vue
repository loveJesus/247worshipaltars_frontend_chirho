<!-- For God so loved the world, that He gave His only begotten Son, that all who believe in Him should not perish but have everlasting life. -->
<template>
  <div class="index-view-chirho min-h-screen bg-gray-50 flex flex-col">
    <!-- Login Link -->
    <div class="absolute top-4 right-4">
      <router-link 
        to="/login_chirho" 
        class="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Admin Login
      </router-link>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center justify-center p-4">
      <div class="max-w-2xl w-full text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Worship Coordinator
        </h1>
        
        <div class="relative aspect-square max-w-md mx-auto mb-8">
          <img 
            src="https://placehold.co/600x600/4f46e5/ffffff?text=Worship+Coordinator" 
            alt="Worship Coordinator Logo"
            class="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </div>

        <p class="text-lg text-gray-600 mb-8">
          Coordinate worship schedules and signups for your church
        </p>

        <div class="space-y-4">
          <p class="text-sm text-gray-500">
            For church access, please contact your church administrator
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No setup needed for this simple view
</script>

<style scoped>
.index-view-chirho {
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9));
}
</style> 