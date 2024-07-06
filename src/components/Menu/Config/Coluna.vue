<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-expansion-panels
    v-model="panel"
    multiple
    variant="accordion"
  >
    <v-expansion-panel :value="1">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Layout</h3>
      </v-expansion-panel-title>
      <BaseDisplayConfig :habilitados="['block', 'flex']"></BaseDisplayConfig>
    </v-expansion-panel>
    <v-expansion-panel :value="2">
      <v-expansion-panel-title style="min-height: 50px;">
        <h3>Espaçamentos</h3>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="pa-4">Padding</div>
        <BaseSeletorInterativo tipo="padding" ></BaseSeletorInterativo>
      </v-expansion-panel-text>
      <!-- <v-expansion-panel-text>
        <v-row>
          <v-col cols="7">
            <div class="pa-2 pl-4">Largura</div>
          </v-col>
          <v-col cols="5">
            <v-number-input v-model="ferramentaStore.itemSelecionado.atributos.estilo['width']" width="150" suffix="%" rounded="5" flat variant="outlined" inset density="compact" control-variant="stacked"></v-number-input>

          </v-col>
        </v-row>
      </v-expansion-panel-text> -->
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta';
import { reactive } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
// expansion panel
let panel = reactive([1, 2, 3])
let ferramentaStore = useFerramentaStore()

if(!ferramentaStore.itemSelecionado.atributos?.estilo?.display){
  defineDisplay('block')
}



onMounted(()=>{
  if(!ferramentaStore.itemSelecionado.atributos?.estilo?.display){
    defineDisplay('block')
  }

})

function defineDisplay(display){
  ferramentaStore.itemSelecionado.atributos.estilo['display'] = display
  if(display == 'flex'){
    defineDirection('row')
    defineWrap('nowrap')
  }
}
function defineDirection(direction){
  ferramentaStore.itemSelecionado.atributos.estilo['flex-direction'] = direction
}
function defineAlign(align){
  ferramentaStore.itemSelecionado.atributos.estilo['align-items'] = align
}
function defineJustify(justify){
  ferramentaStore.itemSelecionado.atributos.estilo['justify-content'] = justify
}
function defineWrap(wrap){
  ferramentaStore.itemSelecionado.atributos.estilo['flex-wrap'] = wrap
}
function defineAlignContent(alignContent){
  ferramentaStore.itemSelecionado.atributos.estilo['align-content'] = alignContent
}



// botoes
const display = [
  {nome: "Block", icone: "Block", propriedade: 'block'},
  {nome: "Flex", icone: "Flex", propriedade: 'flex'},
  {nome: "Inline", icone: "Inline", propriedade: 'inline'},
  {nome: "Inline Block", icone: "InlineBlock", propriedade: 'inline-block'},
] 
const direction = [
{nome: "Flex Row", icone: "FlexRow", propriedade: 'row'},
{nome: "Flex Column", icone: "FlexColumn", propriedade: 'column'}
] 
const align = [
  {nome: "Align Start", icone: "AlignStart" , propriedade: 'start'},
  {nome: "Align Center",   icone: "AlignCenter" , propriedade: 'center'},
  {nome: "Align End", icone: "AlignEnd", propriedade: 'end'},
  {nome: "Align Strech",  icone: "AlignStrech", propriedade: 'strech'},
  {nome: "Align Baseline", icone: "AlignBaseline", propriedade: 'baseline'},
] 
const justify = [
  {nome: "Justify Start",  icone: "JustifyStart", propriedade: 'start' },
  {nome: "Justify Center",  icone: "JustifyCenter", propriedade: 'center' },
  {nome: "Justify End",  icone: "JustifyEnd" , propriedade: 'end'},
  {nome: "Justify Space-Between", icone: "JustifyBetween", propriedade: 'space-between'},
  {nome: "Justify Space-Around",  icone: "JustifyAround", propriedade: 'space-around'},
]
const children = [
  {nome: "Flex Wrap", icone: "FlexWrap", propriedade: 'wrap'},
  {nome: "Flex NoWrap", icone: "FlexNoWrap", propriedade: 'nowrap'}
]
const alignContent = [
  {nome: "Align Start", icone: "AlignContentStart" , propriedade: 'start'},
  {nome: "Align Center", icone: "AlignContentCenter", propriedade: 'center'},
  {nome: "Align End", icone: "AlignContentEnd", propriedade: 'end'},
  {nome: "Align Strech", icone: "AlignContentStrech", propriedade: 'strech'},
  {nome: "Align Space-Between", icone: "AlignContentSpaceBetween", propriedade: 'space-between'},
  {nome: "Align Space-Around", icone: "AlignContentSpaceAround", propriedade: 'space-around'},
] 

</script>