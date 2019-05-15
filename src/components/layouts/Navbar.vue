<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <a href="/" class="brand-logo left">Vue-Geo</a>
        <ul class="right">
          <li>
            <router-link to="/signup">Signup</router-link>
          </li>
          <li>
            <a>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
