<script setup>

import {onMounted, ref} from "vue";

const title = ref('')

import {
  App as PluginApp
} from "./lib/foxit.esm.min.js"



let docEventCallbacks = new FR_DocEventCallbacks({
  "FRDocWillOpen": function (clientData,doc) {
    console.log("FRDocWillOpen", clientData,doc);
  },
  "FRDocDidOpen": function (clientData,doc) {
    console.log("OnDocDidOpen", doc);
  },
  "FRDocOnActivate": function (clientData,doc) {
    console.log("OnDocActivate", doc);
  },
  "FRDocOnDeactivate": function (clientData,doc) {
    console.log("OnDocDeactivate", doc);
  },
  "FRDocOnOtherDocActivated": function (clientData) {
    console.log("OnOtherDocActivated", doc);
  },
  "FRDocOnOtherDocDeactivated": function (clientData) {
    console.log("OnOtherDocDeactivated", doc);
  },
  "FRDocWillClose": function (clientData,doc) {
    console.log("OnWillClose", doc);
  },
  "FRDocDidClose": function (clientData,doc) {
    console.log("OnDidClose", doc);
  },
  "FRDocWillSave": function (clientData,doc,bSaveAs) {
    console.log("OnWillSave", doc, bSaveAs);
  },
  "FRDocDidSave": function (clientData,doc,bSaveAs) {
    console.log("OnDidSave", doc, bSaveAs);
  },
  "FRDocWillPrint": function (clientData,doc) {
    console.log("OnWillPrint", doc);
  },
  "FRDocDidPrint": function (clientData,doc) {
    console.log("OnDidPrint", doc);
  },
  "FRDocOnAnnotSelectionChanged": function (clientData) {
    console.log("OnAnnotSelectionChanged", doc);
  },
  "FRDocOnAnnotSetFocus": function (clientData,doc,focusAnnot) {
    console.log("OnAnnotSetFocus", doc);
  },
  "FRDocOnAnnotKillFocus": function (clientData,doc,focusAnnot) {
    console.log("OnAnnotKillFocus", doc);
  },
  "FRDocOnWillDShowFloatyBar": function (clientData,doc,bsCurToolhandleName,pAryBeShowBtnName) {
    console.log("FRDocOnWillDShowFloatyBar", doc,bsCurToolhandleName,pAryBeShowBtnName);
  }
});
// const RegisterDocHandlerOfPDDoc = async() =>{
//   let bRet = await app.RegisterDocHandlerOfPDDoc(docEventCallbacks);
//   console.log('app.RegisterDocHandlerOfPDDoc', bRet);
// };



onMounted(async () => {
  let pluginApp = await PluginApp.create({
    pluginInfo: {
      id: 'starter',
      name: 'starter',
      version: '',
      description: '',
      author: '',
      license: ''
    }
  })
  title.value= await pluginApp.getAppTitle()
  let bRet = await pluginApp.RegisterDocHandlerOfPDDoc(docEventCallbacks);
  console.log(title.value);
})
</script>

<template>
  <div style="margin:0;padding:0">
    {{title}}
    <br />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
