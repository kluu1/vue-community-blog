<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
* {
  font-family: 'Arimo', sans-serif;
  border-radius: 0px !important;
}

body {
  background-image: url('./assets/stripes-light.png');
}
</style>
