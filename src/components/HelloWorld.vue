<script setup>
import {onMounted, ref} from 'vue'

import {
  App as PluginApp
} from "../lib/foxit.esm.min.js"
defineProps({
  msg: String,
})

const count = ref(0)




onMounted(async () => {
  //foxit.umd.min.js
  // 1. index.html 引入script
  // 2. code...
  // let pluginApp = await window.Foxit.App.create({
  //   pluginInfo: {
  //     id: 'client_id',
  //     name: 'jsplugin_1',
  //     version: '',
  //     description: '',
  //     author: '',
  //     license: ''
  //   }
  // })
  // let title= await pluginApp.getAppTitle()
  // console.log(title);


  let pluginApp = await PluginApp.create({
    pluginInfo: {
      id: 'client_id',
      name: 'jsplugin_1',
      version: '',
      description: '',
      author: '',
      license: ''
    }
  })

  // ems
  let title=await pluginApp.getAppTitle()
  let doc =await pluginApp.getActiveDoc()
  console.log(title);
  console.log(doc)

  //console.log()


})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
