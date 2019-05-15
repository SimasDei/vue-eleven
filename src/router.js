import Vue from 'vue';
import Router from 'vue-router';

import GMap from '@/views/home/GMap.vue';
import Signup from '@/views/auth/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
});
