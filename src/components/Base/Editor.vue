<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div>
    <Editor
      v-model="dados"
      :inline="true"
      height="400"
      @init="retornaOk()"
      @blur="desabilitaEdicao()"
      :disabled="props.desabilitado"
      :toolbar="''"
      api-key="fgx0lgv6jj1x2u1vkch05dfg5xcgvty2bmkwxfo6sruujuxu"
      :init="{
        language: 'pt_BR',
        min_height: 400,
        menubar: false,
        statusbar: false,
        toolbar_persist: false,
        toolbar_mode: 'wrap',
        fixed_toolbar_container: '.configuracoesComponentes',
        plugins: 'lists link',
        toolbar: toolbarCompleta,
        //  toolbar4: 'alignleft aligncenter alignright',
        //  toolbar5: 'alignleft aligncenter alignright',
        //  toolbar6: 'alignleft aligncenter alignright'
      
      }"
    />
  </div>
</template>
<script setup>
import Editor from '@tinymce/tinymce-vue'
let dados = defineModel()
const emit = defineEmits(['completamenteCarregado', "desabilitarEdicao"])
const props = defineProps({
  desabilitado: Boolean
})
function retornaOk() {
  emit('completamenteCarregado')
}
function desabilitaEdicao() {
  setTimeout(() => { 

      
      emit('desabilitarEdicao')
  },100)
}
let toolbarCompleta = [
    { name: 'formatting', items: [ 'bold', 'italic', 'strikethrough','underline' ] },
    { name: 'sizes', items: [ 'fontsizeinput', 'fontfamily' ] },
    { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify','outdent', 'indent' ] },
    { name: 'indentation', items: [ 'lineheight', 'superscript' ] },
    { name: 'links', items: [ 'link', 'unlink' ] }
  ]
  //     let toolbarSimples = [
  //   { name: 'history', items: [ 'undo', 'redo' ] },
  //   { name: 'styles', items: [ 'styles' ] },
  //   { name: 'formatting', items: [ 'bold', 'italic' ] },
  //   { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
  //   { name: 'indentation', items: [ 'outdent', 'indent' ] }
  // ]




</script>