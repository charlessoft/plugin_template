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



})
</script>

<template>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
