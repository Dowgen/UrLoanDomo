
import Vue from 'vue'

if (process.BROWSER_BUILD) {
  const Dropzone = require('vue2-dropzone')
  Vue.use(Dropzone)
}

