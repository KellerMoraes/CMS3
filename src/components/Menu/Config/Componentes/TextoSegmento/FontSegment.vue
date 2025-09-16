<template>
    <div>
        <v-row>
            <v-col cols="8">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('textStyleKit') }">Fonte
                </h5>
                <v-select variant="outlined" v-model="fontFamily" density="comfortable"
                    :disabled="checkConfigMark('textStyleKit')" hide-details>
                </v-select>
            </v-col>
            <v-col cols="4">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('fontWeight') }">Peso
                </h5>
                <v-select variant="outlined" v-model="fontWeight" density="comfortable"
                    :disabled="checkConfigMark('fontWeight')" hide-details>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('textStyleKit') }">Tamanho da
                    fonte
                </h5>
                <v-slider v-model="fontSize" :max="72" :min="10" :step="1" label="10"
                    :disabled="checkConfigMark('textStyleKit')" hide-details>
                    <template v-slot:append>
                        <v-text-field v-model="fontSize" :max="72" :min="10" density="compact" style="width: 80px"
                            type="number" variant="outlined" hide-details></v-text-field>
                    </template>
                </v-slider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h5 class="tituloConfig ml-2" :class="{ disabled: checkConfigMark('bold', 'italic') }">
                    Estilo
                </h5>
                <v-btn-toggle variant="outlined" selected-class="btnAtivo" multiple v-model="textStyles">
                    <v-btn v-for="btn in styleBtns" :icon="btn.icon" @click="toggleStyle(btn.value)"
                         :value="btn.value"></v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-divider class="ma-6 mx-2"></v-divider>
    </div>

</template>
<script setup>
import { useFerramentaStore } from '@/stores/ferramenta'
const ferramentaStore = useFerramentaStore()
const props = defineProps(['config'])
const styleBtns = [
    { icon: "mdi-format-text", name: "Light", value: "thin" },
    { icon: "mdi-format-bold", name: "Negrito", value: "bold" },
    { icon: "mdi-format-color-text", name: "Normal", value: "regular" },
    { icon: "mdi-format-italic", name: "Itálico", value: "italic" },
]
const fontFamily = ref('Arial')
const fontWeight = ref(null)
const fontSize = ref(10)
const textStyles = ref([])
const editorRichText = ferramentaStore.editor //  Instancia do editor
function checkStyleMarks(editor) {
    const styles = []

    if (editor.isActive('bold')) styles.push('bold')
    if (editor.isActive('italic')) styles.push('italic')
    if (editor.isActive('underline')) styles.push('underline')
    if (!editor.isActive('bold') && editor.getAttributes("fontWeight")?.weight == 400) styles.push('regular')
    if (editor.getAttributes("fontWeight")?.weight == 100) styles.push('thin')
    if (editor.getAttributes("textStyle")?.fontSize) fontSize.value = parseInt(editor.getAttributes("textStyle")?.fontSize.match(/\d+/)[0], 10);
    if(editor.isActive('fontWeight')) fontWeight.value = editor.getAttributes("fontWeight").weight
    textStyles.value = styles
}

onMounted(() => {
    editorRichText.on('selectionUpdate', ({ editor }) => {
        checkStyleMarks(editor)
    })
    editorRichText.on('focus', ({ editor }) => {
        checkStyleMarks(editor)
    })
})
watch(() => fontSize.value, (val, lastVal) => {
    const { from, to } = editorRichText.state.selection;
    const hasSelection = from !== to;
    if (val && hasSelection) {
        editorRichText.commands.setFontSize(val + 'px')
    }
    else {
        fontSize.value = lastVal
    }
})
function toggleStyle(chave) {
    // Alterna o estilo atual, chamando a função exposta no editor
    switch (chave) {
        case 'bold':
            editorRichText.chain().focus().toggleBold().run()
            return
        case 'italic':
            editorRichText.chain().focus().toggleItalic().run()
            return
        case 'thin':
            editorRichText.chain().focus().toggleFontWeight(100).run()
            return
    }
}
function checkConfigMark(...marks) {
    return !props.config?.some(e => marks.includes(e))
}
</script>
