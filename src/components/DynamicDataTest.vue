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

  <input type="text" v-on:input="changeThis" v-bind:value="thisName" placeholder="Add a Name" />
  <button v-on:click="addName"> Add Name </button>


</div>
</template>

<script>
import dataitem from "./DataItem.vue";

export default {
  name: 'DynamicDataTest',
  components: { dataitem
  },
  data () {
    return {
      testInfo: "Dynamic Data Test",
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
      showName: true,
      thisName: ''
    }
  },
  methods: {
    toggle: function() {
      this.$data.showName = !this.$data.showName;
    },
    changeThis: function(event) {
      this.$data.thisName= event.target.value;
    },
    addName: function() {
      const newName = this.$data.nameData;
      newName.push( {name: this.$data.thisName});
      this.$data.nameData = newName;
      this.$data.thisName='';
    }
  }
}
</script>
