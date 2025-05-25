<template>
    <!-- <div style="position: relative; height: 100%;"> -->
            
            <Draggable
            :list="userConfigsStore.quickAcessElements"
            class="d-flex flex-wrap ma-2 quickAcessGroup"
            style="top: 59px; height: 100%; width: 100%; position: absolute; padding-left: 84px ; background-color:  rgb(var(--v-theme-surface));"
            tag="div"
            :clone="clonar"
            :move="checkMove"
            :sort="false"
            @add="addedElement"
            :item-key="idKey"
            :group="{ name: group, pull: 'clone', put: true}"
            >
            <template #item="{ element }">
                <v-card v-if="userConfigsStore.quickAcessBarSize > 20" color="#f5f5f5" flat height="110px" style="border: 1px black solid; cursor: grab" class="mx-1 my-1 ">
                    <v-card-title class="text-center pb-0">
                        <v-icon size="40">{{ element.icone }}</v-icon>
                    </v-card-title>
                    <v-card-text style="height: 28px;" class="pa-1">
                        <div class="text-center">{{ element.nome }}</div>
                    </v-card-text>
                    <div class="d-flex justify-center">
                        <v-icon size="32" class="d-flex justify-center" color="#d9d9d9">mdi-drag-horizontal</v-icon>
                    </div>
                </v-card>
                <v-card v-else color="#f5f5f5" flat height="60px" width="120px" style="border: 1px black solid; cursor: grab" class="d-flex justify-center align-center mx-1 pr-2 my-1 ">
                    <v-card-title class="text-center pr-1 ">
                        <v-icon size="40">{{ element.icone }}</v-icon>
                    </v-card-title>
                    <v-card-text style="height: 28px;" class="pa-1">
                        <div class="text-center">{{ element.nome }}</div>
                    </v-card-text>
                    <div class="d-flex justify-center">
                        <v-icon size="32" class="d-flex justify-center" color="#d9d9d9">mdi-drag-vertical</v-icon>
                    </div>
                </v-card>
                
            </template>
        </Draggable>
<!-- </div> -->
</template>
<script setup>
import { useUserConfigStore } from '@/stores/userConfigs';
import Draggable from 'vuedraggable';
import { criarElemento } from "@/model/Elementos";
const group = ref(null)

function clonar(item) {
    console.log(item)
    group.value = item.grupo
    return criarElemento(item.tipo, {icon: item.icone , group: item.grupo})
  
}
function checkMove(evt) {
    if( evt.to.classList.contains('quickAcessGroup') && userConfigsStore.quickAcessElements.find((item)=>{return item.nome == evt.draggedContext.element.nome})){
        return false
    }
}
const userConfigsStore = useUserConfigStore()
</script>