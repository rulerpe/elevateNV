<template>
  <v-container class="custom-layout">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Update Dispensary</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onUpdateDispensary">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="dispensary.name"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="website"
                label="Website"
                id="website"
                v-model="dispensary.website"
                ></v-text-field>
            </v-flex>
          </v-layout><v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="phone"
                label="Phone"
                id="phone"
                v-model="dispensary.phone"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="address"
                label="Address"
                id="address"
                v-model="dispensary.address"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="geo"
                label="Geo"
                id="geo"
                v-model="dispensary.geo"
                ></v-text-field>
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
              <v-text-field
                name="ads"
                label="Ads"
                id="ads"
                v-model="dispensary.ads"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="detailUrl"
                label="DetailUrl"
                id="detailUrl"
                v-model="dispensary.detailUrl"
                ></v-text-field>
            </v-flex>
          </v-layout>
           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="error" :disabled="!formIsValid" type="submit">Update Dispensary</v-btn>
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
      dispensary: {
        name: '',
        shortName: '',
        website: '',
        phone: '',
        address: '',
        geo: '',
        ads: '',
        detailUrl: '',
        imageName: '',
        imageUrl: ''
      },
      imageUrl: '',
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.dispensary.name !== ''
    }
  },
  mounted () {
    firebase.firestore().collection('dispensaries').doc(this.id).get()
      .then((doc) => {
        var obj = doc.data()
        console.log('update: ', obj)
        this.dispensary.id = this.id
        this.dispensary.name = obj.name
        this.dispensary.shortName = obj.shortName
        this.dispensary.website = obj.website
        this.dispensary.phone = obj.phone
        this.dispensary.address = obj.address
        this.dispensary.geo = obj.geo
        this.dispensary.ads = obj.ads
        this.dispensary.detailUrl = obj.detailUrl
        this.dispensary.imageUrl = obj.imageUrl
        this.imageUrl = obj.imageUrl
        this.dispensary.imageName = obj.imageName
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    onUpdateDispensary () {
      if (!this.formIsValid) {
        return
      }
      const dispensaryData = {
        ...this.dispensary
      }
      this.$store.dispatch('updateDispensary', {data: dispensaryData, image: this.image})
      this.$router.push('/admin/dispensaries')
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
