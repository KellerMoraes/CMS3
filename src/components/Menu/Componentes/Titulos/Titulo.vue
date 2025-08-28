<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BaseComponenteItem v-model="dados">
    <template
      v-if="dados"
      #edicao
    >
      <h1
        :id="dados[idKey] ?? ''"
         class="text-primary"
      >
        <BaseConteudoEditavel
          v-model="dados.conteudo"
        />
      </h1>
    </template>
  </BaseComponenteItem>
</template>
<script setup>
import useCms from '@/composables/useCms';
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
let dados = defineModel()
let editavel = ref(false)

</script>
