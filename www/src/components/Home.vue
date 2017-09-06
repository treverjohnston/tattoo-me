<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div v-for="card in activeCards">
          <div class="col-xs-4">
            <card :cardProp="card"></card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './Card'
  export default {
    name: 'home',
    data() {
      return {

      }
    },
    computed: {
      activeCards() {
        return this.$store.state.activeCards
      }
    },
    components: {
      Card
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
  }
</style>