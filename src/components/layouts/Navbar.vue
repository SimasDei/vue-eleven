<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link to="/" class="brand-logo left">Vue-Geo</router-link>
        <ul class="right">
          <li>
            <router-link to="/signup">Signup</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Navbar',
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>
