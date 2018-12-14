import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Config from '@/components/Config'
import DataTest from '@/components/DataTest'
import InputTest from '@/components/InputTest'
import DynamicDataTest from '@/components/DynamicDataTest'
import NextSteps from '@/components/NextSteps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    },
    {
      path:'/next-steps',
      name: 'Next Steps',
      component: NextSteps
    },
    {
      path: '/data-test',
      name: 'DataTest',
      component: DataTest,
    },
    {
      path:'/data-test-dynamic',
      name: 'DynamicDataTest',
      component: DynamicDataTest
    },
    {
      path: '/input-test',
      name: 'InputTest',
      component: InputTest
    }
  ]
})
