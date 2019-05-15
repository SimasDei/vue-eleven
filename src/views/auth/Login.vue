<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center blue-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" v-model="email" name="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password">
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field">
        <button class="btn blue">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            /**
             * @todo - delete console log
             */
            // eslint-disable-next-line
            console.log(cred.user)
            this.feedback = null;
            this.$router.push('/');
          })
          .catch((error) => {
            this.feedback = error.message;
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  max-width: 400px;
  margin-top: 60px;
  h2 {
    font-size: 2.4em;
  }
  .field {
    margin-bottom: 16px;
  }
}
</style>
