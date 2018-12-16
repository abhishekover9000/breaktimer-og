import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    permissionsAdded: false,
    hasConfig: false,
    started: false,
    paused: false,
    finished: true,
    reset: false,
    secondsLeft: 0,
    musicPlaying: false,
    config: {
      name: '',
      time: 0,
      selectedSound: ''
    },
    configs: [],
    sounds: []
  },
  mutations: {
    startTimer(state, payload) {
      // convert to seconds and store payload
      state.permissionsAdded = true
      state.started = true
      state.paused = false
      state.finished = false
      state.secondsLeft = payload.seconds
      state.musicPlaying = false
      state.reset = false
    },
    pauseTimer(state) {
      state.paused = true
    },
    resumeTimer(state) {
      state.paused = false
    },
    resetTimer(state) {
      console.log('calling reset')
      state.started = false
      state.paused = false
      state.finished = true
      state.secondsLeft = 0
      state.musicPlaying = false
      state.reset = true
    },
    decrement(state) {
      console.log('calling decrement')
      if (state.secondsLeft > 1) state.secondsLeft = state.secondsLeft - 1
      else {
        state.paused = false
        state.finished = true
        state.secondsLeft = 0
        state.musicPlaying = true
      }
    },
    stopMusic(state) {
      state.musicPlaying = false
    },
    setConfig(state, payload) {
      state.hasConfig = true
      // store in local storage
      state.config = payload
    },
    loadConfig(state) {
      if (state.hasConfig) {
        state.secondsLeft = state.config.time
      }
      // update
    },
    checkforConfig(state) {
      // check for localStorage object
      // if exists
      // set config to true
      // set config to that
    }
  },
  actions: {
    startTimer(context, payload) {
      context.commit('startTimer', payload)
    },
    pauseTimer(context) {
      context.commit('pauseTimer')
    },
    resumeTimer(context) {
      context.commit('resumeTimer')
    },
    resetTimer(context) {
      context.commit('resetTimer')
    },
    decrement(context) {
      context.commit('decrement')
    },
    addConfig(context) {
      context.commit('addConfig')
    },
    stopMusic(context) {
      context.commit('stopMusic')
    },
    setConfig(context, payload) {
      context.commit('setConfig', payload)
    },
    loadConfig(context) {
      context.commit('loadConfig')
    }
  }
})

export default store
