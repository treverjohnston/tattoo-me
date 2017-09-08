<template>
  <div class="add">
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-xs-12">
          <form @submit.prevent="openCloud">
            <div class="form-group">
              <button id="upload_widget_opener">Upload Image</button>
              <input type="text" v-model="tags" placeholder="tags">
              <input type="decimal" v-model="price" placeholder="$">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'add',
    data() {
      return {
        file: '',
        tags: 'money',
        price: 0.99
      }
    },
    methods: {
      openCloud() {
        cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
          (error, result) => { 
            // console.log(error, result)
            result[0].tags = this.tags
            result[0].price = this.price
            // console.log(result)
          this.$store.dispatch('sendDesign', result)
          });

      },
      addFile() {
        return this.$store.dispatch('addFile', this.file)
      }
    },
    computed: {
    },
    mounted() {
    },
    components: {
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
  .form-group{
    font-size: 2rem;
  }
</style>