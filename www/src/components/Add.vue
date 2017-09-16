<template>
  <div class="add">
    <div class="container-fluid">
      <hr>
      <div class="row">
        <div class="col-xs-12">
          <h2 class="title">Upload a Design</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-2 col-xs-8">
            <form @submit.prevent="openCloud">
                <md-input-container md-theme="green">
                  <label>How much for your HD design?</label>
                  <md-input type="decimal" v-model="price"></md-input>
                </md-input-container>
                <md-input-container md-theme="red">
                  <label>Add any tags you would like to your design separated by a single space</label>
                  <md-textarea type="text" v-model="tags"></md-textarea>
                </md-input-container>
                <button class="btn btn-default" id="upload_widget_opener">Upload Image</button>
              </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-offset-4 col-xs-4">
          <!-- <form @submit.prevent="openCloud">
            <div class="form-group">
              <input class="form-control" type="text" v-model="tags" placeholder="Tags - For multiple tags, separate by a space">
              <input class="form-control" type="decimal" v-model="price" placeholder="$">
              <button class="btn btn-default" id="upload_widget_opener">Upload Image</button>
            </div>
          </form> -->
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div v-if="uploaded.hasOwnProperty('_id')">
            <h2 class="text">This is the low-res version that people will see before purchase</h2>
            <img :src="uploaded.url" alt="image uploaded">
          </div>
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
        this.signedIn()
        if (this.tags !== '') {
          cloudinary.openUploadWidget({ cloud_name: 'tattoo-me', upload_preset: 'tattoopng' },
            (error, result) => {
              result[0].tags = this.tags
              result[0].price = this.price
              this.$store.dispatch('sendDesign', result)
            });
        } else {
          swal(
            'Oops...',
            'You need to add a tag!',
            'error'
          )
        }
      },
      addFile() {
        if (this.signedIn()) {
          return this.$store.dispatch('addFile', this.file)
        }
      }
    },
    computed: {
      uploaded() {
        return this.$store.state.uploadedTattoo
      }
    },
    mounted() {
      // swal("Step One: How much do you want to charge for your design?", {
      //   content: "input",
      // })
      //   .then((value) => {
      //     var price = value
      //     swal(`Step Two:  ${value}`);
      //   });
    },
    components: {
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin-bottom: 4rem;
    color: white;
  }

  .form-group {
    font-size: 2rem;
  }

  input {
    margin-bottom: 1rem;
  }

  .text {
    color: white;
  }

  img {
    height: 40vh;
    margin-top: 2rem;
    margin-bottom: 5rem;
  }
</style>