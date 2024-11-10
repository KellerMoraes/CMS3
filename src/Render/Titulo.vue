<!-- eslint-disable vue/multi-word-component-names -->
<template>
    
        <h1
          :id="dados[this._cmsProps.id]" v-html="dados.conteudo"
        >
        </h1>
      
  </template>
  <script setup>
  const props = defineProps(['dados'])
  </script>
  