<template>
  <div>
    <FontSegment :config="configsList"></FontSegment>
    <TextSettingsSegment :config="configsList"></TextSettingsSegment>
    <ColorSegment :config="configsList"></ColorSegment>
    <DecorationSegment :config="configsList"></DecorationSegment>
  </div>
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta'
import FontSegment from '@/components/Menu/Config/Componentes/TextoSegmento/FontSegment.vue'
import TextSettingsSegment from './TextoSegmento/TextSettingsSegment.vue'
import ColorSegment from './TextoSegmento/ColorSegment.vue'
import DecorationSegment from './TextoSegmento/DecorationSegment.vue'
const ferramentaStore = useFerramentaStore()
const configsList = ref(null) //todas as configurações presentes neste componente ativo.


onMounted(() => {
  configsList.value = ferramentaStore.editorConfigs.map(obj => obj.name)
  console.log(configsList.value)
})


</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.tituloConfig {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
  color: #FFB30C;
}

.btnAtivo {
  background-color: #ffc107;
}

.disabled {
  color: grey;
}
</style>