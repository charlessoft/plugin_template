<script setup>

import {onMounted, ref} from "vue";
import {
  App as PluginApp, ColorSpace, ColorState, Doc, Page, PDFArray, PDFDictionary, PDFString, TextObject, TextState,
} from "./lib/foxit.esm.min.js"


const title = ref('')
const msgLog = ref('message:<br />')


const app = ref({})


let docEventCallbacks = {
  "FRDocWillOpen": function (clientData,doc) {
    console.log("onDocWillOpen", clientData,doc);
    msgLog.value += 'receive: onDocWillOpen <br />'
  },
  "FRDocDidOpen": function (clientData,doc) {
    console.log("onDocDidOpen", doc);
    msgLog.value += 'receive: onDocDidOpen<br />'
  },
  "FRDocOnActivate": function (clientData,doc) {
    console.log("onDocActivate", doc);
    msgLog.value += 'receive: onDocActivate<br />'
  },
  "FRDocOnDeactivate": function (clientData,doc) {
    console.log("onDocDeactivate", doc);
  },
  "FRDocOnOtherDocActivated": function (clientData) {
    console.log("onOtherDocActivated", doc);
  },
  "FRDocOnOtherDocDeactivated": function (clientData) {
    console.log("onOtherDocDeactivated", doc);
  },
  "FRDocWillClose": function (clientData,doc) {
    console.log("onWillClose", doc);
  },
  "FRDocDidClose": function (clientData,doc) {
    console.log("onDidClose", doc);
  },
  "FRDocWillSave": function (clientData,doc,bSaveAs) {
    console.log("onWillSave", doc, bSaveAs);
  },
  "FRDocDidSave": function (clientData,doc,bSaveAs) {
    console.log("onDidSave", doc, bSaveAs);
  },
  "FRDocWillPrint": function (clientData,doc) {
    console.log("onWillPrint", doc);
  },
  "FRDocDidPrint": function (clientData,doc) {
    console.log("onDidPrint", doc);
  },
  "FRDocOnAnnotSelectionChanged": function (clientData) {
    console.log("onAnnotSelectionChanged", doc);
  },
  "FRDocOnAnnotSetFocus": function (clientData,doc,focusAnnot) {
    console.log("onAnnotSetFocus", doc);
  },
  "FRDocOnAnnotKillFocus": function (clientData,doc,focusAnnot) {
    console.log("onAnnotKillFocus", doc);
  },
  "FRDocOnWillDShowFloatyBar": function (clientData,doc,bsCurToolhandleName,pAryBeShowBtnName) {
    console.log("onWillDShowFloatyBar", doc,bsCurToolhandleName,pAryBeShowBtnName);
  }
};


const addText = async () => {
  const doc = await app.value.createBlankDoc(800,800)
  let page = await doc.getPage(0)
  let pageDict = await page.getDict()
  console.log('pageDict', pageDict)
  if (pageDict === null) {
    throw new Error('Create new page failed');
  }
  const pageRect ={
    left: 0,
    top: 0,
    right: 612,
    bottom: 792
  }
  //set media box of the page
  await pageDict.setAtRect('MediaBox', pageRect);
  //create text object
  let textObj = await TextObject.create();
  console.log('FPDTextObject.New', textObj);
  //add specified font to the document
  let font = await doc.addStandardFont('Times-Bold');
  console.log('AddStandardFont', font);
  if (font === null) {
    throw new Error('Add font failed');
  }
  let typename = await font.getFontTypeName();
  console.log('GetFontTypeName', typename);
  //create text state, set font and font size
  let textState = await TextState.create();
  console.log('FPDTextState.New', textState);
  if (textState === null) {
    throw new Error('Create text state failed');
  }
  await textState.setFont(font);
  await textState.setFontSize(25);
  if (textObj === null) {
    throw new Error('Create text object failed');
  }
  await textObj.setTextState(textState);

  let colorState = await ColorState.create();
  console.log('ColorState', colorState);
  let _colorSpace = await ColorSpace.create();
  const colorSpace = await _colorSpace.getStockCS(2);
  if ( colorSpace === null ) {
    throw new Error('Get stock color space failed');
  }
  await colorState.setFillColor(colorSpace, [255, 0, 0]);
  await textObj.setColorState(colorState);
  await textObj.setPosition(300, 400);
  await textObj.setText('Hello, PDF WORLD');

  let pos = await page.getLastObjectPosition();
  console.log('GetLastObjectPosition', pos);
  // add text to page
  if ( pos === null ) {
    throw new Error('pos failed');
  }
  await page.insertObject(pos, textObj);
  await page.generateContent();
}


onMounted(async () => {
  app.value = await PluginApp.create({
    pluginInfo: {
      id: 'starter',
      name: 'starter',
      version: '',
      description: '',
      author: '',
      license: ''
    }
  })

  title.value= await app.value.getAppTitle()
  let bRet = await app.value.registerDocHandlerOfPDDoc(docEventCallbacks);
  console.log(title.value);
})
</script>

<template>
  <div style="margin: 50px; padding: 0; font-size: 16px; font-weight: bold;">
    Javascript Plug-in Demo
  </div>
<!--  <div>-->
<!--    {{title}}-->
<!--  </div>-->
  <button class="text-button" title="Click to create a blank page and add a text object." @click="addText()">
    Hello World
  </button>

<hr />
<div style="text-align: left;"  v-html=msgLog>
</div>

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
