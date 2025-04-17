<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <Draggable 
  style="position: relative; transition: all 0.2s ease-out;" :list="dados.filhos" 
  :style="geraEstilos(dados)"
   :class="`linha ${ferramentaStore?.itemSelecionado[idKey] == dados[idKey] ? 'ativo' : ''} `" 
   tag="VRow"
   :item-key="idKey" 
   :group="{ name: 'colunas' }" 
   @click.ctrl.exact="selecionarLinha(dados)"
   @click.self.exact="selecionarLinha(dados)"
   @start="aoMoverComponente"
   @remove="colunaRemovida($event,dados)"
   @add="colunaAdicionada">
    <template #item="{ element, index }">
      <component :is="'Comp' + element.nome" v-model="dados.filhos[index]" :path="[...path, { tipo: element.tipo, index, id: element[idKey] }]"  :estrutura="dados.filhos.length" />
    </template>
  </Draggable>
</template>

<script setup>
import Draggable from "vuedraggable";
import { useFerramentaStore } from '@/stores/ferramenta.js';
import { useCommandStore } from '@/stores/command.js';
import { defineModel } from 'vue';
import useCms from '@/composables/useCms';
const comandoTemp = ref(null)
import MoverElementoCommand from '@/command/comandoMover.js'

// VARIAVEIS TEMPLATE
const $cms = useCms();
const idKey = $cms('id')
// VARIAVEIS TEMPLATE
const props = defineProps({
  path: {
    type: Array,
    required: true
  }
})
let dados = defineModel()
// const manager = new CommandManager()
// onMounted(()=>{ console.log(props.path)})
const ferramentaStore = useFerramentaStore()
const commandStore = useCommandStore()

function selecionarLinha(elemento) {
  ferramentaStore.selecionarLinha(elemento)
}
function aoMoverComponente(evt){
  const index = evt.oldIndex
  ferramentaStore.iniciarDrag({
    path: props.path,  // ex: [{ tipo: 'linha', index: 0, id: 'linha-xyz' }, { tipo: 'coluna', index: 2, id: 'coluna-abc' }]
    index,
  })
}
function colunaRemovida(evento) {
  const item = evento.item._underlying_vm_;
  if (!item) return;

  comandoTemp.value = {
    itemId: item[idKey],
    origem: {
      path: [...props.path], // importante: não inclui o próprio item aqui
      index: evento.oldIndex
    }
  };
  
}
function colunaAdicionada(evento) {
  const item = evento.item._underlying_vm_;
  if (!item || !comandoTemp.value) return;

  comandoTemp.value.destino = {
    path: [...props.path],
    index: evento.newIndex
  };

  const comando = new MoverElementoCommand(comandoTemp.value);
  commandStore.executar(comando);
  comandoTemp.value = null;
}

function geraEstilos(dados) {
  let atributos = dados.atributos
  let estiloCSS = '';
  for (let indexEstilo in atributos.estilo) {
    if (indexEstilo == 'background') {
      // gambiarra para tornar possivel a excução do visual
      dados.filhos.forEach((coluna) => {
        coluna.atributos.estilo['background'] = atributos.estilo[indexEstilo]
      })
    }
    else {
      estiloCSS += `${indexEstilo}: ${typeof atributos.estilo[indexEstilo] == 'number' ? atributos.estilo[indexEstilo] + 'px' : atributos.estilo[indexEstilo]}; `;
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
<style></style>
