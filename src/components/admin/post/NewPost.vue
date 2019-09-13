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
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Category" :items="allCategories" v-model="categories" multiple></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-select label="Main Category" :items="allCategories" v-model="mainCategory"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="featureImageUrl"
                    label="Feature Image Url"
                    id="featureImageUrl"
                    v-model="featureImageUrl"
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <img :src="featureImageUrl">
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-checkbox label="showFeatureImage" v-model="showFeatureImage"></v-checkbox>
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
          <button @click="showcontent">show</button>
        </form>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
         <quill-editor ref="myTextEditor"
                      v-model="content"
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
            <button type="button" class="ql-video"></button>
            <button class="ql-link"></button>
            <div style="position: reletive">
              <input type="text" v-model="contentImage">
              <button @click="insertImage()">Insert</button>
            </div>
            <div style="position: reletive">
              <input type="text" v-model="codeUrl">
              <button @click="insertEmbededCode()">Code</button>
            </div>
          </div>
        </quill-editor>
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
      contentImage: '',
      codeUrl: '',
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
      mainCategory: [],
      categories: [],
      featureImageUrl: '',
      showFeatureImage: false
    }
  },
  methods: {
    insertImage () {
      const currentPosition = this.$refs.myTextEditor.quill.getSelection()
      this.$refs.myTextEditor.quill.insertEmbed(currentPosition.index, 'image', this.contentImage)
    },
    insertEmbededCode () {
      const currentPosition = this.$refs.myTextEditor.quill.getSelection()
      this.$refs.myTextEditor.quill.insertEmbed(currentPosition.index, 'video', this.codeUrl)
    },
    onNewPost () {
      const text = this.$refs.myTextEditor.quill.getText()
      const wordcount = text.split(/\s+/).length
      const readtime = Math.ceil(wordcount / 200) // in minute, round up the number
      const postData = {
        title: this.title,
        subtitle: this.subtitle,
        author: this.author,
        postDate: this.postDate,
        content: this.content,
        mainCategory: this.mainCategory,
        categories: this.categories,
        wordcount: wordcount,
        readtime: readtime,
        featureImageUrl: this.featureImageUrl,
        showFeatureImage: this.showFeatureImage
      }
      this.$store.dispatch('newPost', postData)
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
        this.featureImageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    showcontent () {
      console.log(this.image)
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