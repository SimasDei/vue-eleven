<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email*</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password*</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="alias">Alias*</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify';
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signup() {
      /**
       * @todo - integrate firebase auth
       */
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        const ref = db.collection('users').doc(this.slug);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.feedback = 'This alias is already in use';
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: cred.user.uid,
                });
              })
              .then(() => this.$router.push({ name: 'GMap' }))
              .catch((error) => {
                this.feedback = error.message;
              });
            this.feedback = null;
          }
        });
      } else {
        this.feedback = 'Fields are required';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.signup {
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
