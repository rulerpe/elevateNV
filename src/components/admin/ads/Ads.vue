<template>
  <v-container class="">
    <v-layout row>
      <v-flex xs6 sm6 offset-sm3>
        <h2>Dispensary List</h2>
      </v-flex>
      <v-flex xs4 sm 3>
        <v-btn raised :to="{name:'NewAds'}">Add</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-list two-line>
            <template v-for="ad in ads">
              <v-list-tile avatar v-bind:key="ad.name">
                <v-list-tile-content style="cursor: pointer;" @click="updateAd(ad.id)">
                  <v-list-tile-title v-html="ad.title"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn color="error" raised @click="deleteAd({id:ad.id,imageName:ad.imageName})" >
                    Delete
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    ads () {
      return this.$store.getters.ads
    }
  },
  mounted () {
    this.$store.dispatch('loadAds')
  },
  methods: {
    updateAd (id) {
      this.$router.push({name: 'UpdateAds', params: {id: id}})
    },
    deleteAd (payload) {
      this.$store.dispatch('deleteAds', payload)
    }
  }
}
</script>

<style>

</style>
