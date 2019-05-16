import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import GMap from '@/views/home/GMap.vue';
import Signup from '@/views/auth/Signup.vue';
import Login from '@/views/auth/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // check for Auth requirement
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check user auth
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next('/');
    }
  }
});

export default router;
