<template>
  <v-container class="custom-layout">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Add Ads</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddAds">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="ads.title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="link"
                label="Link"
                id="link"
                v-model="ads.link"
                ></v-text-field>
            </v-flex>
          </v-layout>
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select label="Type" :items="types" v-model="ads.type"></v-select>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="error" raised dark @click="onPickFile">Upload image</v-btn>
              <input 
                ref="fileInput" 
                type="file" 
                style="display: none" 
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl">
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="error" :disabled="!formIsValid" type="submit">Add Ads</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      ads: {
        title: '',
        link: '',
        type: ''
      },
      imageUrl: '',
      image: null,
      types: [
        {
          value: 'long',
          text: 'long'
        },
        {
          value: 'square',
          text: 'square'
        }
      ]
    }
  },
  computed: {
    formIsValid () {
      return this.title !== ''
    }
  },
  methods: {
    onAddAds () {
      if (!this.formIsValid) {
        return
      }
      if (this.image === null) {
        this.image = 'default'
      }
      const adsData = {
        ...this.ads
      }
      this.$store.dispatch('newAds', {data: adsData, image: this.image})
      this.$router.push('/admin/ads')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('please add a vild file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style>

</style>
