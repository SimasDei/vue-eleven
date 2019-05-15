import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
let app = null;

/**
 * @await - firebase Authentication
 */
firebase.auth().onAuthStateChanged(() => {
  /**
   * @init - initialize App if absent
   */
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
