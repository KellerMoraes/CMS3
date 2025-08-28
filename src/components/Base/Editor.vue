<template>
  <div
    ref="editorEl"
    contenteditable="true"
    class="border p-2 min-h-[100px] editor"
    :key="editorKey"
    @keydown="onKeyDown"
    @mouseup="onMouseUp"
  >
    <Node v-for="(node,i) in model.conteudo" :key="node.id" v-model="model.conteudo[i]" />
  </div>
</template>

<script setup>
import Node from '@/components/Base/RichText/Node.vue'
// modelo raiz (um bloco com textos, etc.)
const model = defineModel()
const editorKey = ref(0);
const editorEl = ref(null)
const selection = reactive({
  blocoId: null,     // em qual bloco está
  focus: null        // posição atual do caret/fim
})
// --- Eventos principais ---
function onKeyDown(e) {
  // intercepta para evitar edição nativa do DOM
  if(e.key == "Delete"){
    e.preventDefault()
    removeChar()
  }
  if (["Backspace", "Enter"].includes(e.key)) {
    e.preventDefault()
    removeChar(true)
    // TODO: implementar lógica de deletar/enter na model
  }

  // exemplo: inserir caractere manualmente
  if (e.key.length === 1 && !e.ctrlKey) {
    e.preventDefault()
    insertChar(e.key)
  }
}
function findNode(id) {
  console.log(model.value)
  let node = model.value.conteudo?.find((b)=>{return b.id == id})
  if (node) return node

  for (const bloco of model.value.conteudo) {
    const node = bloco.conteudo?.find((c) => c.id === id)
    if (!node) return bloco
    return node
  }
  return null
}
function insertChar(char) {
  pegarPosicaoCaret()
  // TODO: localizar caret na seleção atual e inserir em model
  let node = findNode(selection.blocoId)
  if(!node) return
  let indiceCaret = selection.focus
  let textoAtual = node.texto
  console.log(textoAtual.slice(0,indiceCaret))
  node.texto = textoAtual.slice(0,indiceCaret) + char + textoAtual.slice(indiceCaret)
  selection.focus = indiceCaret + 1;
  moverCaret(selection.focus)
}
function removeChar(backspace) {
  pegarPosicaoCaret()
  let node = findNode(selection.blocoId)
  if (!node) return

  let indiceCaret = selection.focus
  let textoAtual = node.texto

  if (backspace) {
    if (indiceCaret > 0) {
      node.texto = textoAtual.slice(0, indiceCaret - 1) + textoAtual.slice(indiceCaret)
      selection.focus = indiceCaret - 1
    }
  } else {
    node.texto = textoAtual.slice(0, indiceCaret) + textoAtual.slice(indiceCaret + 1)
  }

  // --- se o nó ficou vazio ---
  if (node.texto.length === 0) {
  const parent = node.__parent
  if (parent) {
    const idx = parent.conteudo.findIndex(c => c.id === node.id)

    // ⚡ não deixa apagar se for o último
    if (parent.conteudo.length === 1) {
      node.texto = "" // mantém vazio
      selection.focus = 0
      return
    }

    // se não for o último, pode apagar normalmente
    let newTarget = null
    let newOffset = 0

    if (idx > 0) {
      newTarget = parent.conteudo[idx - 1]
      newOffset = newTarget.texto.length
    } else if (idx < parent.conteudo.length - 1) {
      newTarget = parent.conteudo[idx + 1]
      newOffset = 0
    }

    parent.conteudo.splice(idx, 1)

    if (newTarget) {
      selection.blocoId = newTarget.id
      selection.focus = newOffset
    }
  }
}

  moverCaret(selection.focus)
}

function moverCaret() {
  nextTick(()=>{
    const newRange = document.createRange();
    const selectionDom = window.getSelection();
    let ele = document.getElementById(selection.blocoId)
    console.log(ele)
    newRange.setStart(ele.firstChild, selection.focus);  // Define a posição inicial do caret
    newRange.setEnd(ele.firstChild, selection.focus);    // Define a posição final do caret (sem seleção)
    selectionDom.removeAllRanges();
    selectionDom.addRange(newRange);
    ele.focus();
  })
  }
function pegarPosicaoCaret(){
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  selection.blocoId = range.startContainer.parentElement?.id
  selection.focus = range.startOffset
  // selection.collapsed = range.collapsed
  // selection.range = {}
}
function onMouseUp() {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  console.log(range)
  selection.blocoId = range.startContainer.parentElement?.id
  selection.focus = range.startOffset
  // pega data-id do start e end
  const startNode = range.startContainer.parentElement?.id
  const endNode = range.endContainer.parentElement?.id
  console.log("Seleção entre:", startNode, "->", endNode)
}
</script>
<style>
.editor{
  white-space: pre-wrap;
}
</style>