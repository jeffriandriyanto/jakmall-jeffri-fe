import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import StepOne from '@/views/StepOne';
import StepTwo from '@/views/StepTwo';
import StepThree from '@/views/StepThree';

Vue.use(VueRouter)

const routes = [
  {
    path: '/step-one',
    name: 'StepOne',
    component: StepOne
  },
  {
    path: '/step-two',
    name: 'StepTwo',
    component: StepTwo
  },
  {
    path: '/step-three',
    name: 'StepThree',
    component: StepThree
  },
  {
    path: '*',
    redirect: '/step-one'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
