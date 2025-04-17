<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->

<template>
  <Draggable
    :list="dados.filhos"
    tag="VCol"
    style="transition: all 0.3s ease-out;"
    :class="`coluna ${ferramentaStore.itemSelecionado[idKey] == dados[idKey] ? 'ativa' : ''}`"
    :style="geraEstilos(dados)"
    :item-key="idKey"
    :group="{ name: 'componentes' }"
    :component-data="{cols: dados.estrutura}"
    @click.self.exact="selecionarColuna(dados)"
    
  >
    <template #item="{ element,index}">
      <component
        v-if="element"
        :is="'Comp'+element.nome"
        v-model="dados.filhos[index]"
        :key="element[idKey]"
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
const props = defineProps(
  {
    path: 
    {
    type: Array,
    required: true
  }
})
// onMounted(()=>{console.log(props.path)})
const ferramentaStore = useFerramentaStore()
  function selecionarColuna(coluna) {
      ferramentaStore.selecionarColuna(coluna)
  }
  function geraEstilos(dados) {
    let atributos = dados.atributos
    let estiloCSS = '';
      for (let indexEstilo in atributos.estilo) {
        estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo] }; `;
      }
      return estiloCSS;
    
    }
    function aoMover(evento) {
      console.log(evento)
  // const { oldIndex, newIndex } = evento;

  // if (oldIndex === newIndex) return; // nada foi movido

  // const comando = new MoverElementoCommand(dados.value.filhos, oldIndex, newIndex);
  // manager.executar(comando);
}
</script>

