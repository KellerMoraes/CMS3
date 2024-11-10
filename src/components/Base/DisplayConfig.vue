<!-- eslint-disable vue/multi-word-component-names -->
<template>
    
        <v-list
          density="compact"
          class="pt-1"
        >
          <v-list-item>
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Display
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo.display"
              >
              <v-btn v-for="item in display" :key="item.propriedade" :value="item.propriedade" :disabled="habilitados? habilitados?.find((habilitado)=>{return habilitado == item.propriedade}) ? false : true : false" @click="defineDisplay(item.propriedade)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icone+"Light" : '$'+item.icone+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
  
          <v-divider
          class="border-opacity-75 my-3 mx-6" v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'"
          />
          <!-- daqui pra baixo é tudo condicional -->
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'" >
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Direction
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['flex-direction']"
                            >
              <v-btn v-for="item in direction" :key="item[_cmsProps.name]" :value="item.propriedade" @click="defineDirection(item.propriedade)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icone+"Light" : '$'+item.icone+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Align
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['align-items']"
              >
              <v-btn v-for="item in align" :key="item[_cmsProps.name]" :value="item.propriedade" @click="defineAlign(item.propriedade)"  size="small">
                <v-icon :size="item.size ?? '26'" >{{ theme.name.value == 'dark' ? '$'+item.icone+(ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-direction'] == 'row' ? 'V': '' ) +"Light" : '$'+item.icone+(ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-direction'] == 'row' ? 'V': '')+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Justify
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['justify-content']"
              >
              <v-btn v-for="item in justify" :value="item.propriedade" :key="item[_cmsProps.name]" @click="defineJustify(item.propriedade)"  size="small">
                <v-icon  :size="item.size ?? '26'">{{ theme.name.value == 'dark' ? '$'+item.icone+(ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-direction'] == 'row' ? 'V': '' )+"Light" : '$'+item.icone+(ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-direction'] == 'row' ? 'V': '')+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-divider v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'"
            class="border-opacity-75 my-3 mx-3"
          />
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.display == 'flex'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Children
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['flex-wrap']"
              >
              <v-btn v-for="item in children" :value="item.propriedade" :key="item[_cmsProps.name]" @click="defineWrap(item.propriedade)"  size="small">
                <v-icon size="26">{{ theme.name.value == 'dark' ? '$'+item.icone+"Light" : '$'+item.icone+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <v-list-item v-if="ferramentaStore.itemSelecionado?.atributos?.estilo?.['flex-wrap'] == 'wrap'">
            <div class="d-flex justify-space-between mx-2">
              <span style="align-self: center;">
                Align content
              </span>
              <v-btn-toggle
                rounded="xl"
                variant="outlined"
                v-model="ferramentaStore.itemSelecionado.atributos.estilo['align-content']"
              >
              <v-btn v-for="item in alignContent" :value="item.propriedade" :key="item[_cmsProps.name]" @click="defineAlignContent(item.propriedade)"  size="x-small">
                <v-icon size="24">{{ theme.name.value == 'dark' ? '$'+item.icone+"Light" : '$'+item.icone+"Dark" }}</v-icon>
                <v-tooltip
          activator="parent"
          location="top"
        ><span :class="theme.name.value == 'dark'? 'text-black' : 'text-white' "  style="color: black;">{{ item[_cmsProps.name] }}</span></v-tooltip>
              </v-btn>
              </v-btn-toggle>
            </div>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-subheader class="justify-center">
              GAP
            </v-list-subheader>
            <div class="d-flex justify-center">
              <v-text-field label="5px" />
              X
              <v-text-field label="5px" />
            </div>
          </v-list-item> -->
        </v-list>
  </template>
  <script setup>
  import { useFerramentaStore } from '@/stores/ferramenta';
  import { useTheme } from 'vuetify'
  const props = defineProps(['habilitados'])
  const theme = useTheme()
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