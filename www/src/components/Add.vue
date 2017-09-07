<template>
  <div class="add">
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-xs-12">
          <form type="submit">
            <button  @click="openCloud" id="upload_widget_opener">Upload Image</button>
            <input type="text" v-model="comment" placeholder="Tattoo Name">
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
        comment: ''
      }
    },
    methods: {
      openCloud() {
        cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
          function (error, result) { console.log(error, result) });
        
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
</style>