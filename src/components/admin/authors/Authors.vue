<template>
  <v-container class="">
    <v-layout row>
      <v-flex xs6 sm6 offset-sm3>
        <h2>Author List</h2>
      </v-flex>
      <v-flex xs4 sm 3>
        <v-btn raised :to="{name:'NewAuthor'}">Add</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-list two-line>
            <template v-for="author in authors">
              <v-list-tile avatar v-bind:key="author.name">
                <v-list-tile-avatar>
                  <img v-bind:src="author.imageUrl">
                </v-list-tile-avatar>
                <v-list-tile-content style="cursor: pointer;" @click="updateAuthor(author.id)">
                  <v-list-tile-title v-html="author.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="author.bio"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn color="error" raised @click="deleteAuthor({id:author.id,imageName:author.imageName})" >
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
    authors () {
      return this.$store.getters.authors
    }
  },
  mounted () {
    this.$store.dispatch('loadAuthors')
  },
  methods: {
    updateAuthor (id) {
      this.$router.push({name: 'UpdateAuthor', params: {id: id}})
    },
    deleteAuthor (payload) {
      this.$store.dispatch('deleteAuthor', payload)
    }
  }
}
</script>

<style>

</style>
