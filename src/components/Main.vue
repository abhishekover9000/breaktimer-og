<template>
  <div>
    <div class="sideContainer">
      <div v-if="!playing">
        <el-button type="primary" v-if="hasConfig" v-on:click="loadConfig">
          Load {{ configName }}</el-button
        >
        <router-link v-else to="/config"> Have a Routine? </router-link>
      </div>
    </div>

    <div v-if="showTime">
      <b> Awwww yeaa we taking a break in.. </b>
      <row :gutter="20">
        <el-col :span="8"> {{ remainingHours() }} Hours </el-col>
        <el-col :span="8"> {{ remainingMinutes() }} Minutes </el-col>
        <el-col :span="8"> {{ remainingSeconds() }} Seconds </el-col>
      </row>
      <el-button type="primary" v-if="!paused" v-on:click="pause">
        Pause Timer
      </el-button>
      <el-button type="primary" v-else v-on:click="resume"> Resume </el-button>
      <el-button type="danger" v-on:click="reset"> Reset Timer </el-button>
    </div>
    <div v-else>
      <div v-if="!playing">
        <row :gutter="20">
          <el-col :span="8">
            <el-input
              type="number"
              min="0"
              v-on:input="changeThis('hours', $event)"
              v-bind:value="hours"
            >
              <template slot="append">
                Hours
              </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input
              type="number"
              min="0"
              v-on:input="changeThis('minutes', $event)"
              v-bind:value="minutes"
            >
              <template slot="append">
                Minutes
              </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input
              type="number"
              min="0"
              v-on:input="changeThis('seconds', $event)"
              :value="seconds"
            >
              <template slot="append">
                Seconds
              </template>
            </el-input>
          </el-col>
        </row>
        <row class="center buttonRow">
          <el-button v-on:click="start" type="primary"> Start Timer </el-button>
          <div v-if="playError">{{ playErrorMessage }}</div>
        </row>
      </div>
      <div v-else>
        <h2>Time for a Break!</h2>
        <row class="center buttonRow">
          <el-button type="primary" v-if="playing" v-on:click="stopMusic">
            Thanks, got it!
          </el-button>
        </row>
      </div>
    </div>
    <audio ref="audioplayer" controls>
      <source type="audio/mpeg" src="./../assets/doomsday.mp3" />
    </audio>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Button, Input, Row, Col } from 'element-ui'
import sendPush from '../mixins/sendPush'

export default {
  name: 'Main',
  mixins: [sendPush],
  props: ['title'],
  data() {
    return {
      minutes: 0,
      seconds: 0,
      hours: 0,
      playError: false,
      playErrorMessage: ''
    }
  },
  updated: function() {
    if (
      this.$store.state.secondsLeft > 0 &&
      this.$store.state.started &&
      !this.$store.state.finished &&
      !this.$store.state.paused &&
      !this.$store.state.reset
    ) {
      // set seconds left
      setTimeout(
        function() {
          this.$store.dispatch('decrement')
        }.bind(this),
        1000
      )
    }

    if (this.$store.state.finished) {
      // send the api request
      console.log('sending a request')
    }

    this.$store.state.musicPlaying && !this.$store.state.reset
      ? this.$refs['audioplayer'].play()
      : this.$refs['audioplayer'].pause()
  },
  components: {
    'el-button': Button,
    'el-input': Input,
    'el-col': Col,
    row: Row
  },
  computed: {
    started: function() {
      return this.$store.state.started
    },
    paused: function() {
      return this.$store.state.paused
    },
    showTime: function() {
      return !this.$store.state.finished
    },
    playing: function() {
      return this.$store.state.musicPlaying && this.$store.state.started
    },
    hasConfig: function() {
      return this.$store.state.hasConfig
    },
    configName: function() {
      return this.$store.state.config.name
    }
  },
  methods: {
    ...mapActions({
      start: 'startTimer',
      pause: 'pauseTimer',
      decrement: 'decrement',
      resume: 'resumeTimer',
      reset: 'resetTimer',
      stopMusic: 'stopMusic',
      loadConfig: 'loadConfig'
    }),
    start: function() {
      // set dispatch if neeeded
      if (!this.$store.state.permissionsAdded) {
        window.messaging
          .requestPermission()
          .then(() => {
            console.log('subscribed successfully')
            if (window.location.host.indexOf('push-notifications-fef03') > -1) {
              this.getAndSendToken()
            }
          })
          .catch(function(err) {
            alert('Unable to get permission to notify: ' + err)
          })
      }

      const min = this.$data.minutes
      const sec = this.$data.seconds
      const hours = this.$data.hours
      if (min === 0 && sec === 0 && hours === 0) {
        this.$data.playError = true
        this.$data.playErrorMessage =
          'Come on! You gotta work for at least a second before going on break!'
        setTimeout(
          function() {
            this.$data.playErrorMessage = ''
            this.$data.playError = false
          }.bind(this),
          3000
        )
      } else {
        this.$store.dispatch('startTimer', {
          seconds: hours * 60 * 60 + min * 60 + sec * 1
        })
        this.$data.minutes = 0
        this.$data.seconds = 0
        this.$data.hours = 0
        this.$data.playError = false
        this.$data.playErrorMessage = ''
      }
    },
    remainingHours: function() {
      return Math.floor(this.$store.state.secondsLeft / 3600)
    },
    remainingMinutes: function() {
      return Math.floor((this.$store.state.secondsLeft % 3600) / 60)
    },
    remainingSeconds: function() {
      return Math.floor((this.$store.state.secondsLeft % 3600) % 60)
    },
    decrement: function() {
      this.$store.dispatch('decrement')
    },
    pause: function() {
      this.$store.dispatch('pauseTimer')
    },
    resume: function() {
      this.$store.dispatch('resumeTimer')
    },
    reset: function() {
      this.$store.dispatch('resetTimer')
    },
    stopMusic: function() {
      this.$store.dispatch('stopMusic')
    },
    loadConfig: function() {
      this.$data.hours = Math.floor(this.$store.state.config.time / 3600)
      this.$data.minutes = Math.floor(
        (this.$store.state.config.time % 3600) / 60
      )
      this.$data.seconds = Math.floor(
        (this.$store.state.config.time % 3600) % 60
      )
      this.$store.dispatch('loadConfig')
    },
    changeThis: function(type, event) {
      console.log(event)
      switch (type) {
        case 'minutes':
          this.$data.minutes = event
          break
        case 'seconds':
          this.$data.seconds = event
          break
        case 'hours':
          this.$data.hours = event
          break
        default:
          break
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
.center {
  text-align: center;
}

.buttonRow {
  margin: 2rem 0;
}
</style>
