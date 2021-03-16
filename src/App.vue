<template>
  <div id="app" :class="{ body_bule: $route.path === '/' }">
    <top-frame />
    <router-view />
    <foot-frame />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import TopFrame from "./components/TopFrame";
import FootFrame from "./components/FootFrame";

export default {
  components: { FootFrame, TopFrame }
};
</script>
