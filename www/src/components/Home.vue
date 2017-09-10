<template>
  <div class="home">
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-xs-2">
          <div v-if="sortType">
            <button @click="sort" class="btn btn-default">Viewing Newest Designs</button>
          </div>
          <div v-else>
            <button @click="sort" class="btn btn-default">Viewing Most Popular Designs</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-if="sortType">
          <div v-for="card in activeCardsDate">
            <card :cardProp="card"></card>
          </div>
        </div>
        <div v-else>
          <div v-for="card in activeCardsLikes">
            <card :cardProp="card"></card>
          </div>
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
        sortType: true
      }
    },
    methods: {
      sort(){
        this.sortType = !this.sortType
      },
      compareLikes(a, b){
        return b.numLikes-a.numLikes
      },
      compareDate(a, b){
        return b.created-a.created
      }
    },
    computed: {
      activeCardsDate() {
        return this.$store.state.activeCards.sort(this.compareDate)
      },
      activeCardsLikes() {
        return this.$store.state.activeCards.sort(this.compareLikes)
      }
    },
    mounted() {
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
    padding-bottom: 10rem;
  }
  .btn {
        background-color: transparent;
        font-size: 2rem;
        color: black;
    }
</style>