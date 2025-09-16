<template>
        <BaseEditor v-if="model"  @dblclick="toggleEditor"
         v-model="model" :enabled="enabled" :extensions="extensionFilter()"></BaseEditor>
</template>
<script setup>
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import { Mark, mergeAttributes } from '@tiptap/core'
import { TextStyleKit } from '@tiptap/extension-text-style'
const model = defineModel()
const props = defineProps(['config','extensionException'])
const enabled = ref(false)
// extensions vai ser todos os estilos mais comum para todos os elementos de texto, 

  function extensionFilter(){
        // extension map remover alguma exceção props.extensionException
        if(props.extensionException){
                return extensions.filter(()=>{})
        }
     return extensions
  }
function toggleEditor(){
if(!enabled.value){
  enabled.value = !enabled.value
}
}

const FontWeight = Mark.create({
  name: 'fontWeight',
  defaultW: 400,

  addAttributes() {
    return {
      weight: {
        default: 400,
        parseHTML: element => element.style.fontWeight || null,
        renderHTML: attributes => {
          if (!attributes.weight) return {}
          return { style: `font-weight: ${attributes.weight}` }
        },
      },
    }
  },

  parseHTML() {
    return [
      { style: 'font-weight' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontWeight:
        (weight) =>
        ({ commands }) => {
          return commands.setMark(this.name, { weight })
        },
        unsetFontWeight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
        toggleFontWeight:
        (weight) =>
        ({ editor,commands }) => {
          const currentWeight = editor.getAttributes('fontWeight').weight
          if(currentWeight == weight){
            return commands.setMark(this.name, { weight: 400 })
          }
          return commands.setMark(this.name, { weight })
        },
    }
  },
})
const extensions = 
  [
    ...props.config,
    Text,
    Bold,
    Italic,
    Underline,
    FontWeight,
    FontFamily,
    TextStyleKit //pacote com, BackgroundColor, Color ,FontFamily ,FontSize ,LineHeight
  ]
  
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Staatliches&display=swap');
</style>