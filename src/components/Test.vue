<template>
  <div>
    <h2>{{ testInfo }}</h2>
    <h2 v-html="colorInfo"></h2>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      testInfo: 'Writing some test information here',
      colorInfo: "<div style='color:red'> HERE IS MORE INFORMATION HERE</div>"
    }
  }
}
</script>

<style></style>
