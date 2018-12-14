<template>
<div>
<b> {{title}}'s  Data Item </b>
<div class="thing">
  Something 
</div>
</div>
</template>

<script>
export default {
  name: 'dataitem',
  props: ['title']
}
</script>

<style>
  .thing {
    border: 1px black solid;
    margin: 2rem;
  }
</style>
