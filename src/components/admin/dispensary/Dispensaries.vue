<template>
  <v-container class="">
    <v-layout row>
      <v-flex xs6 sm6 offset-sm3>
        <h2>Dispensary List</h2>
      </v-flex>
      <v-flex xs4 sm 3>
        <v-btn raised :to="{name:'NewDispensary'}">Add</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-list two-line>
            <template v-for="dispensary in dispensaries">
              <v-list-tile avatar v-bind:key="dispensary.name">
                <v-list-tile-avatar>
                  <img v-bind:src="dispensary.imageUrl" :alt="dispensary.name">
                </v-list-tile-avatar>
                <v-list-tile-content style="cursor: pointer;" @click="updateDispensary(dispensary.id)">
                  <v-list-tile-title v-html="dispensary.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="dispensary.ads"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn color="error" raised @click="deleteDispensary({id:dispensary.id,imageName:dispensary.imageName})" >
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
    dispensaries () {
      return this.$store.getters.dispensaries
    }
  },
  mounted () {
    this.$store.dispatch('loadDispensaries')
  },
  methods: {
    updateDispensary (id) {
      this.$router.push({name: 'UpdateDispensary', params: {id: id}})
    },
    deleteDispensary (payload) {
      this.$store.dispatch('deleteDispensary', payload)
    }
  }
}
</script>

<style>

</style>
