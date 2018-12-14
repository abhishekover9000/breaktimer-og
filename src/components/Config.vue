<template>
  <div>
    <h1>Too lazy to punch in 3 numbers?</h1>
    <h3>No problem! Load a config!</h3>

    <row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-input v-model="name">
          <template slot="prepend">
            Config Name
          </template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6">
        <el-input v-model="hours" min="0" type="number">
          <template slot="prepend">
            Hours
          </template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6">
        <el-input v-model="minutes" min="0" type="number">
          <template slot="prepend">
            Minutes
          </template>
        </el-input>
      </el-col>
      <el-col :span="12" :offset="6">
        <el-input v-model="seconds" min="0" type="number">
          <template slot="prepend">
            Seconds
          </template>
        </el-input>
      </el-col>
    </row>
    <row class="center buttonRow">
      <el-button type="primary" v-on:click="setConfig">
        Make this My Config
      </el-button>
      <div v-if="saveError">{{ saveErrorMessage }}</div>
    </row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Button, Input, Row, Col } from 'element-ui'

export default {
  name: 'Config',
  props: ['title'],
  data: function() {
    return {
      name: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      saveError: false,
      saveErrorMessage: ''
    }
  },
  components: {
    'el-button': Button,
    'el-input': Input,
    'el-col': Col,
    row: Row
  },
  methods: {
    ...mapActions({ setConfig: 'setConfig' }),
    setConfig: function() {
      const min = this.$data.minutes
      const sec = this.$data.seconds
      const hours = this.$data.hours
      if (min === 0 && sec === 0 && hours === 0) {
        this.$data.saveError = true
        this.$data.saveErrorMessage =
          'Come on! You gotta work for at least a second before going on break!'
        setTimeout(
          function() {
            this.$data.saveErrorMessage = ''
            this.$data.saveError = false
          }.bind(this),
          3000
        )
      } else {
        this.$store.dispatch('setConfig', {
          name: this.$data.name,
          time: hours * 60 * 60 + min * 60 + sec
        })
        this.$data.minutes = 0
        this.$data.seconds = 0
        this.$data.hours = 0
        this.$data.saveError = false
        this.$data.saveErrorMessage = ''
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>
.thing {
  border: 1px black solid;
  margin: 2rem;
}
</style>
