<template>
  <div id="app">
    <logo></logo>
    <router-view></router-view>
    <navbar></navbar>
  </div>
</template>

<script>
  import Navbar from './Components/Navbar'
  import Logo from './Components/Logo'
  export default {
    name: 'app',
    components: {
      Navbar,
      Logo
    },
    mounted() {
      this.$store.dispatch('getAuth')
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  /* .logo{
    width: 20rem;
  } */
</style>