<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- basicamente resolver o problema do flick por causa do v-if   -->
        <BaseEditor :style="pronto ? 'display: unset' : 'display: none'" @completamenteCarregado="carregado()" @desabilitarEdicao="editavel = false"  :desabilitado="!editavel" v-model="conteudo"></BaseEditor>
        <!-- <span :style="pronto && editavel ? 'display: none' : 'display: unset'" v-html="conteudo"></span> -->
</template>

<style>
.comp{
  background-color: bisque;
}
</style>
<script setup>
import { defineModel,ref } from 'vue';
let conteudo = defineModel('conteudo')
let editavel = defineModel('editavel')
let pronto = ref(false)
function carregado() {
  pronto.value = true
    }
</script>

<style>
.editavelHabilitado{
  border: 2px black solid;
  border-radius: 5px;
}
.editavelDesabilitado{
  border: none;
}
</style>
