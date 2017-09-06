<template>
  <div class="home">
    <div class="container-fluid">
        <hr>
      <div class="row">
        <div v-for="card in activeCards">
            <card :cardProp="card"></card>
        </div>
      </div>
    </div>
    <!-- <navbar></navbar> -->
  </div>
</template>

<script>
  import Card from './Card'
  // import Navbar from './Navbar'
  export default {
    name: 'home',
    data() {
      return {

      }
    },
    methods:{
    },
    computed: {
      activeCards() {
        return this.$store.state.activeCards
      }
    },
    mounted(){
      this.$store.dispatch('getTattoos')
    },
    components: {
      Card
      // Navbar
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    background-color: gray;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 100vh;
  }
</style>