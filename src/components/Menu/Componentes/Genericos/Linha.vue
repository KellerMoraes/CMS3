<!-- eslint-disable vue/multi-word-component-names -->
<template>
  
  <Draggable
    style="position: relative; transition: all 0.2s ease-out;"
    :list="dados.filhos"
    :style="geraEstilos(dados)"
    :class="`linha ${ferramentaStore?.itemSelecionado[idKey] == dados[idKey] ? 'ativo' : '' } `"
    tag="VRow" 
    :item-key="idKey"
    :group="{ name: 'colunas' }"
    @click.ctrl.exact="selecionarLinha(dados)"
    @click.self.exact="selecionarLinha(dados)"
  >
    <template #item="{ element,index }">
      <component
        :is="'Comp'+element.nome"
        v-model="dados.filhos[index]"
        :estrutura="dados.filhos.length"
      />
    </template>
  </Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { defineModel } from 'vue';
import useCms from '@/composables/useCms';
// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
let dados = defineModel()

const ferramentaStore = useFerramentaStore()
  function selecionarLinha(elemento) {
    ferramentaStore.selecionarLinha(elemento)
  }
  function geraEstilos(dados) {
    let atributos = dados.atributos
    let estiloCSS = '';
      for (let indexEstilo in atributos.estilo) {
        if(indexEstilo == 'background'){
          // gambiarra para tornar possivel a excução do visual
          dados.filhos.forEach((coluna)=>{
            coluna.atributos.estilo['background'] = atributos.estilo[indexEstilo]
          })
        }
        else{
            estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
        }
      }
      return estiloCSS;
    
    }
  // function geraEstilos(dados) {
  //   ferramentaStore.itemSelecionado?.filhos?.forEach((coluna) => {
  //     console.log(coluna)
  //     coluna.atributos.cor.valor = dados.atributos?.cor?.valor ?? ''
  //    })
  // }


</script>
<style>
</style>
