<template>
  <v-container class="custom-layout">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Add Dispensary</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onAddDispensary">
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
              <v-btn class="error" :disabled="!formIsValid" type="submit">Add Dispensary</v-btn>
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
      dispensary: {
        name: '',
        shortName: '',
        website: '',
        phone: '',
        address: '',
        geo: '',
        ads: '',
        detailUrl: ''
      },
      imageUrl: '',
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.name !== ''
    }
  },
  methods: {
    onAddDispensary () {
      if (!this.formIsValid) {
        return
      }
      if (this.image === null) {
        this.image = 'default'
      }
      const dispensaryData = {
        ...this.dispensary
      }
      this.$store.dispatch('newDispensary', {data: dispensaryData, image: this.image})
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
