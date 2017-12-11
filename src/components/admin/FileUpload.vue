<template>
  <v-container>
    <v-layout row>
     <div class="container">
        <h1>Upload images</h1>
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
              accept="image/*" class="input-file">
              <p v-if="isInitial">
                Drag your file(s) here to begin
              </p>
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>
        <div v-for="file in files" :key="file.name">{{file.name}}</div>
        <v-btn @click="saveFile">Save</v-btn>
     </div>
    </v-layout>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
export default {
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      files: []
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      this.currentStatus = STATUS_SAVING
      console.log(formData)
    },
    filesChange (fieldName, fileList) {
      if (!fileList.length) return
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          this.files.push(fileList[x])
        })
      console.log(this.files[0].name)
    },
    saveFile () {
      for (let i = 0; i < this.files.length; i++) {
        firebase.storage().ref().child('files/' + this.files[i].name).put(this.files[i])
          .then(() => {
            // need to fix upload on finish
            if (this.files.length === i + 1) {
              this.reset()
            }
          })
      }
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style>
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
