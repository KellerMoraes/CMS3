<template>
  <EditorContent  :editor="editor" />
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { $cms } from '@/helpers/cmsProviderHelper';
import { useFerramentaStore } from '@/stores/ferramenta'
const editor = ref(null)
const model = defineModel()
const props = defineProps(['enabled', 'extensions'])
const ferramentaStore = useFerramentaStore()
editor.value = new Editor({
  extensions: props.extensions,
  editable: props.enabled,
  content: model.value[$cms('content')], // inicia a partir do JSON salvo
  onUpdate: ({ editor }) => {
    model.value[$cms('content')] = editor.getJSON() // sempre salva JSON no v-model
  },
})
onMounted(()=>{
  ferramentaStore.setEditor(editor.value)
  ferramentaStore.setEditorConfig(props.extensions)
})
watch(() => model.value[$cms('content')], (val) => {
  if (val && editor.value && JSON.stringify(val) !== JSON.stringify(editor.value.getJSON())) {
    editor.value.commands.setContent(val)
  }
})
watch(() => props.enabled, (val) => {
  if (val) {
    editor.value.setEditable(val)
  }
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
<style>
</style>