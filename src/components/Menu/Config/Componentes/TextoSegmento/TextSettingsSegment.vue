<template>
  <v-row>
      <v-col cols="12">
        <h5 class="tituloConfig ml-2" :class="{ disabled: !config?.some(e => e == 'alignmentLeft' || e == 'alignmentCenter') }">Alinhamento</h5>
        <v-btn-toggle variant="outlined" selected-class="btnAtivo" v-model="alignments">
          <v-btn v-for="btn in alignmentBtns" :icon="btn.icon" :disabled="!config?.some(e => e == btn.value)" @click="toggleAlignment(btn.value)" :value="btn.value" ></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <!-- <br>
    ├─ Line height
    <br>
    ├─ Letter spacing
    <br>
    └─ Word spacing
    <br>
    └─ Indentação
    <br> -->
    <!-- _________________________ -->
</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta'
const ferramentaStore = useFerramentaStore()
const props = defineProps(['config'])
const editorRichText = ferramentaStore.editor //  Instancia do editor

const alignments = ref([])
const alignmentBtns = [
          {icon: "mdi-format-align-left", value: "left" },
          {icon: "mdi-format-align-center", value: "center" },
          {icon: "mdi-format-align-right", value: "right" },
          {icon: "mdi-format-align-justify", value: "justify" },
          ]
onMounted(() => {
  editorRichText.on('selectionUpdate', ({ editor }) => {
    checkAlignmentMarks(editor)
  })})
function checkAlignmentMarks(editor){
  const alignments = []
    if (editor.isActive('bold')) alignments.push('bold')
    if (editor.isActive('italic')) alignments.push('italic')
    if (editor.isActive('underline')) alignments.push('underline')
    if (editor.isActive('thin')) alignments.push('thin')
    if (editor.isActive('regular')) alignments.push('regular')
    alignments.value = alignments
}
  function toggleAlignment(chave) {
  switch (chave) {
    case 'left':
    //   editorRichText.chain().focus().toggleBold().run()
      return
    case 'center':
    //   editorRichText.chain().focus().toggleItalic().run()
      return
  }

}
</script>