<template>
<div>
  <h2> {{testInfo}}</h2>
  <button v-on:click="toggle"><span v-if="showName"> Hide </span> <span v-else> Show </span> Name </button>
  <ul v-if="showName">
  <li v-for="item in nameData">
  {{ item.name }}
</li>
</ul>
  <div v-else>
    Names are hidden
  </div>

  <div v-for="item in nameData">
  <dataitem :title="item.name"></dataitem> 
  </div>

  <div v-if="showHidden"> You've unlocked the hidden field! <br/>
    <img src="https://img.huffingtonpost.com/asset/5bad5bba1f0000390122a1bd.jpeg?ops=scalefit_720_noupscale" />
  </div>
  <div v-else @click.shift.exact="onShiftClick" @mouseover="hoverHint"> Can you unlock the hidden field? </div>


</div>
</template>

<script>
import dataitem from "./DataItem.vue";

export default {
  name: 'DataTest',
  components: { dataitem
  },
  data () {
    return {
      testInfo: "This is A Toggle Test",
      showHidden: false,
      nameData: [
      {
      name: "Bob"
      },
      {
      name: "Jenny"
      },
      {
      name: "Elizabeth"
      }
      ],
      showName: true
    }
  },
  methods: {
    toggle: function() {
      this.$data.showName = !this.$data.showName;
    },
    onShiftClick: function() {
      this.$data.showHidden = true;
    },
    hoverHint: function() {
      console.log("hint: click and shift");
    }
  }
}
</script>
