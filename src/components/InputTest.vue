<template>
<div>
<h1> Input Example </h1>

<input type="text" v-on:input="changeThis" v-bind:value="inputVal" placeholder="test input" />
<h2> Value is: <span> {{inputVal}} </span> </h2> 
</div>
</template>

<script>
export default {
  name: 'InputTest',
  data () {
  return{
    inputVal: ''
    }
  },
  methods: {
  changeThis: function(event) {
    this.$data.inputVal= event.target.value;
  }
  }
}
</script>
