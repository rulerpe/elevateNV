<template>
  <v-container class="custom-layout">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Update Author</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onUpdateAuthor">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="name"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="bio"
                label="Bio"
                id="bio"
                v-model="bio"></v-text-field>
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
              <v-btn class="error" :disabled="!formIsValid" type="submit">Update Author</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
export default {
  props: ['id'],
  data () {
    return {
      name: '',
      bio: '',
      imageUrl: '',
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.name !== ''
    }
  },
  mounted () {
    firebase.firestore().collection('authors').doc(this.id).get()
      .then((doc) => {
        var obj = doc.data()
        console.log('update: ', obj)
        this.name = obj.name
        this.bio = obj.bio
        this.imageUrl = obj.imageUrl
        this.imageName = obj.imageName
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onUpdateAuthor () {
      if (!this.formIsValid) {
        return
      }
      if (this.iamge === null) {
        return
      }
      const authorData = {
        id: this.id,
        name: this.name,
        bio: this.bio,
        image: this.image,
        imageName: this.imageName
      }
      this.$store.dispatch('updateAuthor', authorData)
      this.$router.push('/authors')
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
