<template>
  <v-container class="pa-0 custom-layout">
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <form @submit.prevent="onEditPost">
          <v-layout row>
            <v-flex xs12 sm6>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    v-model="postData.title"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="subtitle"
                    label="Subtitle"
                    id="subtitle"
                    v-model="postData.subtitle"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Author" :items="authors" v-model="postData.author"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Category" :items="allCategories" v-model="postData.categories" multiple></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Main Category" :items="allCategories" v-model="postData.mainCategory"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="featureImageUrl"
                    label="Feature Image Url"
                    id="featureImageUrl"
                    v-model="postData.featureImageUrl"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <img :src="postData.featureImageUrl">
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-checkbox label="showFeatureImage" v-model="postData.showFeatureImage"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm5 offset-sm1>
              <h2>Post date</h2>
              <v-date-picker v-model="postData.postDate"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-btn class="error" type="submit">Update</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
         <quill-editor ref="myTextEditor"
                      v-model="postData.content"
                      :options="editorOption"
                      class="post-content">
            <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <!-- Add font size dropdown -->
            <select class="ql-header">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option selected>Normal</option>
            </select>
            
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>

            <select class="ql-color">
              <option selected></option>
              <option value="red"></option>
              <option value="orange"></option>
              <option value="yellow"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="purple"></option>
            </select>
            <select class="ql-background">
              <option selected></option>
              <option value="red"></option>
              <option value="orange"></option>
              <option value="yellow"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="purple"></option>
            </select>
            <button class="ql-link"></button>
            <div style="position: reletive">
              <input type="text" v-model="imageUrl">
              <button @click="insertImage()">Insert</button>
            </div>
          </div>
        </quill-editor>
        <button @click="showcontent">show</button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import * as firebase from 'firebase'
require('firebase/firestore')

export default {
  components: {
    quillEditor
  },
  props: ['shortname'],
  data () {
    return {
      imageUrl: '',
      name: '01-example',
      content: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        },
        clipboard: {
          matchVisual: false
        }
      },
      test: `<p>test</p><h4>heading</h4>`,
      postData: {
        title: '',
        subtitle: '',
        author: '',
        content: '',
        postDate: '',
        shortname: '',
        mainCategory: [],
        categories: [],
        featureImageUrl: '',
        showFeatureImage: false
      },
      orgPostData: {}
    }
  },
  methods: {
    insertImage () {
      const currentPosition = this.$refs.myTextEditor.quill.getSelection()
      this.$refs.myTextEditor.quill.insertEmbed(currentPosition.index, 'image', this.imageUrl)
    },
    onEditPost () {
      const text = this.$refs.myTextEditor.quill.getText()
      const wordcount = text.split(/\s+/).length
      const readtime = Math.ceil(wordcount / 200) // in minute, round up the number
      this.postData.wordcount = wordcount
      this.postData.readtime = readtime
      console.log(this.postData)
      this.$store.dispatch('editPost', {orginal: this.orgPostData, new: this.postData})
    },
    showcontent () {
      console.log(this.postData)
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    },
    contentCode () {
      return this.content
    },
    authors () {
      var authors = this.$store.getters.authors
      var formatAuthors = []
      for (const author in authors) {
        formatAuthors.push({
          value: authors[author].id,
          text: authors[author].name
        })
      }
      return formatAuthors
    },
    allCategories () {
      return this.$store.getters.categories
    }
  },
  mounted () {
    this.$store.dispatch('loadAuthors')
    this.$store.dispatch('loadCategories')
    firebase.firestore().collection('posts').where('shortname', '==', this.shortname).get()
      .then((data) => {
        var postData = data.docs[0].data()
        for (const key in postData) {
          this.orgPostData[key] = postData[key]
          this.postData[key] = postData[key]
        }
        this.orgPostData.updateAt = postData.updateAt.slice(0)
        this.postData.updateAt = postData.updateAt.slice(0)
        this.orgPostData.id = data.docs[0].id
        this.postData.id = data.docs[0].id
        var categories = []
        for (const value in this.postData.categories) {
          categories.push(parseInt(value))
        }
        this.postData.categories = categories
        var mainCategory = ''
        for (const value in this.postData.mainCategory) {
          mainCategory = (parseInt(value))
        }
        this.postData.mainCategory = mainCategory
        console.log(this.postData)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .quill-editor {
    border: none;
    height: 700px;
    margin-bottom: 50px
  }
</style>