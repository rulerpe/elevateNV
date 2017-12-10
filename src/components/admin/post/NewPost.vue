<template>
  <v-container class="pa-0 custom-layout">
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <form @submit.prevent="onNewPost">
          <v-layout row>
            <v-flex xs12 sm6>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    v-model="title"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="subtitle"
                    label="Subtitle"
                    id="subtitle"
                    v-model="subtitle"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Author" :items="authors" v-model="author"></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm5 offset-sm1>
              <h2>Post date</h2>
              <v-date-picker v-model="postDate"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-btn class="error" type="submit">Post</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
         <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
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

            <div>
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

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      imageUrl: '',
      name: '01-example',
      content: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      title: '',
      subtitle: '',
      author: '',
      postDate: null,
      category: []
    }
  },
  methods: {
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    },
    insertImage () {
      const currentPosition = this.$refs.myTextEditor.quill.getSelection()
      this.$refs.myTextEditor.quill.insertEmbed(currentPosition.index, 'image', this.imageUrl)
    },
    onNewPost () {
      const postData = {
        title: this.title,
        subtitle: this.subtitle,
        author: this.author,
        postDate: this.postDate,
        content: this.content,
        category: this.category
      }
      this.$store.dispatch('newPost', postData)
    },
    showcontent () {
      console.log(this.content)
      console.log(this.authors)
      console.log(this.postDate)
      console.log(this.$refs.myTextEditor.quill.getSelection())
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
    }
  },
  mounted () {
    this.$store.dispatch('loadAuthors')
  }
}
</script>

<style scoped>
  .quill-code {
    border: none;
    height: auto;
  }
</style>