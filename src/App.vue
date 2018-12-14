<template>
  <div id="app">
    <navigation></navigation>

    <img src="./assets/logo2.png" class="img" />
    <router-view />
  </div>
</template>

<script>
import navigation from './components/Navigation.vue'

// add on ready function to load component
// abstract music data to here
export default {
  name: 'App',
  components: {
    navigation
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img {
  width: 42rem;
}
</style>
