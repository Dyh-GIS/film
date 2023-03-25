<template>
  <div id="app">
    <router-view/>
    <section>
      <nav-bar v-if="$store.state.navbarShow"></nav-bar>
    </section>
  </div>
</template>

<script>
import navBar from '@/components/film/navbar.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    navBar
  }
}
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    height: 100%;
  }
  ul{
    list-style: none;
  }
  section{
    padding-bottom: 3.0625rem;
  }
</style>
