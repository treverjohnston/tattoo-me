<template>
  <div class="add">
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-xs-offset-4 col-xs-4">
          <form @submit.prevent="openCloud">
            <div class="form-group">
              <input class="form-control" type="text" v-model="tags" placeholder="Tags - EX. cool, awesome">
              <input class="form-control" type="decimal" v-model="price" placeholder="$">
              <button class="btn btn-default" id="upload_widget_opener">Upload Image</button>
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
        tags: '',
        price: 0
      }
    },
    methods: {
      openCloud() {
        if (this.tags !== ''){
          cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
            (error, result) => { 
              result[0].tags = this.tags
              result[0].price = this.price
            this.$store.dispatch('sendDesign', result)
            });
        } else {
          alert('need to make a stylish alert saying to fill in the right fields')
        }

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
  
  .form-group{
    font-size: 2rem;
  }
  input{
    margin-bottom: 1rem;
  }
</style>