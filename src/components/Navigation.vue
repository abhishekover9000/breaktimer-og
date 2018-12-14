<template>
  <div>
  <router-link to="/"> Break Time </router-link>
  <router-link to="/config"> Config </router-link>
  <router-link to="/next-steps"> Next Steps </router-link>

  </div>
</template>
<script>
export default {
  name: 'navigation'
}
</script>
<style>
  a {
    padding-right: 2rem;
  }
</style>
