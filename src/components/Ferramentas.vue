<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="itensMenu" style="width: 100%;">
  <v-btn color="#003d7c" style="border-radius: 5px; " @click="$router.back()" class="px-3"  size="70">
    <v-icon class="mr-2">
      mdi-arrow-left
    </v-icon>
  </v-btn>
  <div class="d-flex justify-start align-center">
    
    <v-list-item
    subtitle="SubPágina 1"
    title="Pagina Teste and ceta and ceta"
    >
  <template #append>
    <v-btn icon="mdi-cog" variant="text" @click="ferramentaStore.selecionarCabecalho()"></v-btn>
  </template></v-list-item>
  </div>
  <v-divider vertical inset ></v-divider>
  <div class="d-flex justify-start align-center">
    Teste
  </div>
  <div class="d-flex justify-end align-center mr-8">
    <v-btn color="#003d7c" style="border-radius: 5px;" class="px-3"  variant="flat"  height="45px" size="">
      <v-icon class="mr-2">
        mdi-content-save
      </v-icon>
      Salvar
    </v-btn>
    <v-btn color="green"  variant="flat" size="" style="border-radius: 5px;" height="45px" class="px-2 mx-2">
      <v-icon class="mr-2">
        mdi-upload
      </v-icon>
      Publicar
    </v-btn>
    <v-btn color="primary"  variant="flat" size="" style="border-radius: 5px;" height="45px" class="px-2" to="/editor/visualizacao">
      <v-icon class="mr-2">
        mdi-play
      </v-icon>
      Visualizar
    </v-btn>
  </div>

  </div>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { storeToRefs } from 'pinia';
let ferramentaStore = useFerramentaStore()
const { selecionarCabecalho } = storeToRefs(ferramentaStore)

const botoesLinha = [
        { nome: "Colar coluna", icone: "mdi-clipboard-file-outline"},
        { nome: `Copiar linha`, icone: "mdi-content-copy"},
        { nome: "Excluir", icone: "mdi-delete" },
      ]
const botoesColuna = [
        { nome: "Colar componente", icone: "mdi-clipboard-file-outline"},
        { nome: `Copiar coluna`, icone: "mdi-content-copy" },
        { nome: "Excluir", icone: "mdi-delete" },
      ]
      function salvar() {
        console.log(this.ferramentaStore.itemSelecionado)
      }

</script>
<style scoped>
.itensMenu{
display: grid;
grid-template-columns: 3% 12% auto 45% 30%;
}

</style>