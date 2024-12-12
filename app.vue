<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
     <!-- <p>hello</p> -->
     <Header></Header>
     <NuxtPage />
  </div>
</template>

<style scoped>
  .app-container {
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/bg.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
