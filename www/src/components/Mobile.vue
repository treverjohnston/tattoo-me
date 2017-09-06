<template>
        <div class="mobile">
          <div class="container-fluid">
              <hr>
            <div class="row">
                <div class="col-xs-2">
                    <router-link :to="'/home'">
                    <button class="btn btn default glyphicon glyphicon-menu-left"></button>
                    </router-link>
                    <button class="btn btn-default glyphicon glyphicon-usd"></button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12">
                    <img :src="card.url" alt="image">
                </div>
            </div>
          </div>
        </div>
      </template>
      
      <script>
        export default {
          name: 'mobile',
          data() {
            return {
      
            }
          },
          computed: {
              card(){
                  return this.$store.state.mobileView
              }
          },
          components: {
          }
        }
      
      </script>
      
      <!-- Add "scoped" attribute to limit CSS to this component only -->
      <style scoped>
          .logo{
              float: right;
          }
          img{
              height: 40vh
          }
          .mobile{
              background-color: gray;
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
              padding-bottom: 100vh
          }
      </style>