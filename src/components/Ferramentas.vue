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
    <v-btn @click="teste" color="white" style="border-radius: 5px;" class="px-4"  variant="flat"  height="45px" size="">
      <v-icon class="mr-2">
        mdi-arrow-left
      </v-icon>
      undo/redo cet
    </v-btn>
    <v-btn @click="exportar" color="white" style="border-radius: 5px;" class="px-4"  variant="flat"  height="45px" size="">
      <v-icon class="mr-2">
        mdi-export
      </v-icon>
      Exportar
    </v-btn>
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
import { usePaginaStore } from '@/stores/pagina.js';
import { useCommandStore } from '@/stores/command.js';
import { storeToRefs } from 'pinia';
let ferramentaStore = useFerramentaStore()
const commandStore = useCommandStore()
let paginaStore = usePaginaStore()
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
function teste() {
commandStore.desfazer()
}

function exportar(){
  console.log(paginaStore.pagina)
 let anchor = document.createElement("a")
anchor.href = `data:text/json;charset=utf-8,${encodeURIComponent(
  JSON.stringify(paginaStore.pagina)
  )}`
anchor.download = paginaStore.pagina.nomePagina + ".json"
anchor.click()
}
</script>
<style scoped>
.itensMenu{
display: grid;
grid-template-columns: 3% 12% auto 45% 30%;
}

</style>