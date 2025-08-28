<template>
  <span
    ref="editor"
    contenteditable="true"
    class="editor"
    @input="onInput"
    @mouseup="onSelectionChange"
    @keyup="onSelectionChange"
    @keydown="onKeyDown"
    @paste="onPaste"
  >
    <template v-for="(parte, index) in model" :key="index">
  <br v-if="parte.tag === 'br'" :data-index="index" />
  <div
    v-else
    style="display: inline-block;"
    :data-index="index"
    :class="gerarClasse(parte.estilos)"
  >
    {{ parte.texto === '' ? ZWSP : parte.texto }}
  </div>
</template>
  </span>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useFerramentaStore } from '@/stores/ferramenta'
import {
  mergeBlocos,
  getAbsoluteOffset,
  getIndexAndRelFromAbs,
  getBlockInfoFromDOM,
  getWordSelectionAbsFromCaret
} from '@/helpers/richtext'

const editor = ref(null)
const model = defineModel() // Array<{ texto, estilos }>
const ferramentaStore = useFerramentaStore()
const ZWSP = '\u200B';   // sentinela do bloco vazio
const NBSP = '\u00A0'; 

onMounted(() => { ferramentaStore.aplicarEstiloNoEditor = toggleEstiloSelecao })
onBeforeUnmount(() => { ferramentaStore.aplicarEstiloNoEditor = null })

function toggleEstiloSelecao(estilo, valor = true) {
  console.log(/^\s+$/.test(window.getSelection().getRangeAt(0).toString()))
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  // if (!range.collapsed && /^\s+$/.test(range.toString())) return

  let sAbs, eAbs
  if (range.collapsed) {
    const word = getWordSelectionAbsFromCaret(model.value, range)
    if (!word) return
    sAbs = word.sAbs; eAbs = word.eAbs
  } else {
    const startInfo = getBlockInfoFromDOM(model.value, range.startContainer, range.startOffset)
    const endInfo = getBlockInfoFromDOM(model.value, range.endContainer, range.endOffset)
    if (!startInfo || !endInfo) return
    sAbs = Math.min(getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset),
                    getAbsoluteOffset(model.value, endInfo.blocoIndex, endInfo.relativeOffset))
    eAbs = Math.max(getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset),
                    getAbsoluteOffset(model.value, endInfo.blocoIndex, endInfo.relativeOffset))
  }

  let todosTem = true, pos = 0
  for (const b of model.value) {
    const len = b.texto.length
    if (pos + len > sAbs && pos < eAbs && !b.estilos?.[estilo]) todosTem = false
    pos += len
  }
  const aplicar = !todosTem

  // Reconstrói modelo
  const novoModel = []
  pos = 0
  for (const bloco of model.value) {
    const len = bloco.texto.length
    const blocoStart = pos, blocoEnd = pos + len
    pos = blocoEnd
    if (blocoEnd <= sAbs || blocoStart >= eAbs) {
  // ⬇️ preserva a tag se houver (ex.: 'br')
  novoModel.push({ texto: bloco.texto, estilos: { ...bloco.estilos }, ...(bloco.tag ? { tag: bloco.tag } : {}) })
  continue
}
    const selStartIn = Math.max(0, sAbs - blocoStart)
    const selEndIn   = Math.min(len, eAbs - blocoStart)
    const antes = bloco.texto.slice(0, selStartIn)
    const meio  = bloco.texto.slice(selStartIn, selEndIn)
    const depois= bloco.texto.slice(selEndIn)

    if (antes) novoModel.push({ texto: antes, estilos: { ...bloco.estilos } })
if (meio) {
  const novoEstilo = { ...(bloco.estilos||{}) }
  if (aplicar) novoEstilo[estilo] = true
  else delete novoEstilo[estilo]
  novoModel.push({ texto: meio, estilos: novoEstilo })
}
if (depois) novoModel.push({ texto: depois, estilos: { ...bloco.estilos } })
  }

  model.value = mergeBlocos(novoModel)

  nextTick(() => {
    restoreSelection(sAbs, eAbs)
  })
}

function restoreSelection(sAbs, eAbs) {
  const sel = window.getSelection()
  sel.removeAllRanges()
  const { index: sIdx, relOffset: sRel } = getIndexAndRelFromAbs(model.value, sAbs)
  const { index: eIdx, relOffset: eRel } = getIndexAndRelFromAbs(model.value, eAbs)
  const startEl = editor.value.querySelector(`[data-index="${sIdx}"]`)
  const endEl = editor.value.querySelector(`[data-index="${eIdx}"]`)
  if (!startEl || !endEl) return
  const r = document.createRange()
  r.setStart(startEl.firstChild||startEl, sRel)
  r.setEnd(endEl.firstChild||endEl, eRel)
  sel.addRange(r)
  onSelectionChange()
}

function onInput() {
  const sel = window.getSelection()
  const range = sel?.rangeCount ? sel.getRangeAt(0) : null

  // salva offsets absolutos antes de tocar no model
  let savedAbsStart = null, savedAbsEnd = null
  if (range) {
    const sInfo = getBlockInfoFromDOM(model.value, range.startContainer, range.startOffset)
    const eInfo = getBlockInfoFromDOM(model.value, range.endContainer, range.endOffset)
    if (sInfo && eInfo) {
      savedAbsStart = getAbsoluteOffset(model.value, sInfo.blocoIndex, sInfo.relativeOffset)
      savedAbsEnd   = getAbsoluteOffset(model.value, eInfo.blocoIndex, eInfo.relativeOffset)
    }
  }

  // Reconstrói modelo a partir do DOM (leva estilos do model antigo quando possível)
  const novoModel = []
 editor.value.childNodes.forEach((node) => {
  if (node.nodeType !== 1) return // só elementos
  const idx = Number(node.dataset?.index)
  const tagName = node.tagName // 'DIV' ou 'BR'

  if (tagName === 'BR') {
    novoModel.push({ texto: '', estilos: {}, tag: 'br' })
    return
  }

  // DIV de texto
  let texto = node.textContent || ''
  texto = texto.replaceAll(ZWSP, '').replaceAll(NBSP, ' ')
  const estilosOrig = model.value[idx]?.estilos || {}
  novoModel.push({ texto, estilos: { ...estilosOrig } })
})

// Garante pelo menos 1 parte sempre
if (novoModel.length === 0) novoModel.push({ texto: '', estilos: {} })
  // Filtra blocos vazios EXCETO quando for o único bloco
 let filtrado = novoModel
if (filtrado.length > 1) {
  filtrado = filtrado.filter(b => (b.tag === 'br') || (b.texto && b.texto.length > 0))
}

model.value = mergeBlocos(filtrado)
  // garante ao menos um bloco
  // if (filtrado.length === 0) filtrado = [{ texto: '', estilos: {} }]

  // Aplica merge para limpar fragments
  // model.value = mergeBlocos(filtrado)

  // Restaura seleção (tentativa baseada nos offsets capturados)
  nextTick(() => {
    if (savedAbsStart == null || savedAbsEnd == null) {
      // sem offsets salvos: só atualiza seleção/estado
      onSelectionChange()
      return
    }
    const sel2 = window.getSelection()
    sel2.removeAllRanges()

    const { index: sIdx, relOffset: sRel } = getIndexAndRelFromAbs(model.value, savedAbsStart)
    const { index: eIdx, relOffset: eRel } = getIndexAndRelFromAbs(model.value, savedAbsEnd)

    const startSpan = editor.value.querySelector(`[data-index="${sIdx}"]`)
    const endSpan   = editor.value.querySelector(`[data-index="${eIdx}"]`)
    if (!startSpan || !endSpan) {
      onSelectionChange()
      return
    }

    const rangeRestore = document.createRange()
    rangeRestore.setStart(startSpan.firstChild || startSpan, sRel)
    rangeRestore.setEnd(endSpan.firstChild || endSpan, eRel)
    sel2.addRange(rangeRestore)
    onSelectionChange()
  })
}


function onSelectionChange() {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)

  const startInfo = getBlockInfoFromDOM(model.value, range.startContainer, range.startOffset)
  const endInfo   = getBlockInfoFromDOM(model.value, range.endContainer, range.endOffset)
  if (!startInfo || !endInfo) return

  const sAbs = Math.min(
    getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset),
    getAbsoluteOffset(model.value, endInfo.blocoIndex, endInfo.relativeOffset)
  )
  const eAbs = Math.max(
    getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset),
    getAbsoluteOffset(model.value, endInfo.blocoIndex, endInfo.relativeOffset)
  )

  if (range.collapsed) {
    const { index: idx } = getIndexAndRelFromAbs(model.value, sAbs)
    const estilos = model.value[idx]?.estilos || {}
    ferramentaStore.aplicarEstilo(estilos)
    ferramentaStore.estilosAtivos = Object.keys(estilos).filter(k => estilos[k])
    return
  }

  const blocosNaSelecao = []
  let pos = 0
  let indiceBloco
  model.value.forEach((bloco,i)=>{
    const len = bloco.texto.length
    if (pos + len > sAbs && pos < eAbs){
      blocosNaSelecao.push(bloco)
      indiceBloco = i
    } 
    pos += len
  })
  if (!blocosNaSelecao.length) {
    ferramentaStore.aplicarEstilo({ bold:false, italic:false, underline:false })
    ferramentaStore.estilosAtivos = []
    return
  }

  const chaves = Object.keys(ferramentaStore.estilosAtivos)
  const novos = {}
  for (const k of chaves) novos[k] = blocosNaSelecao.every(b => !!b.estilos?.[k])
  ferramentaStore.aplicarEstilo(novos)

  const indice = indiceBloco
  const estilos = model.value[indice]?.estilos || {}
  ferramentaStore.estilosAtivos = Object.keys(estilos).filter(k => estilos[k])
}

// --- Handle Enter / Backspace / Delete ---
function onKeyDown(e) {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  // const abs = getAbsoluteOffsetFromRange(range)

  // Enter → quebra de bloco
  if (e.key === 'Enter') {
  e.preventDefault()

  const sel = window.getSelection()
  if (!sel || !sel.rangeCount) return
  const range = sel.getRangeAt(0)

  const startInfo = getBlockInfoFromDOM(model.value, range.startContainer, range.startOffset)
  if (!startInfo) return

  // offset absoluto do caret
  const sAbs = getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset)
  // mapeia p/ índice + offset relativo confiável
  const { index, relOffset } = getIndexAndRelFromAbs(model.value, sAbs)
  const atual = model.value[index]

  // se o bloco atual for um <br>, apenas insere um bloco vazio depois e posiciona o caret
  if (atual?.tag === 'br') {
    model.value.splice(index + 1, 0, { texto: '', estilos: {} })
    nextTick(() => {
      const el = editor.value.querySelector(`[data-index="${index + 1}"]`)
      if (!el) return
      if (!el.firstChild) el.appendChild(document.createTextNode(ZWSP))
      const r = document.createRange()
      r.setStart(el.firstChild, 1)
      r.collapse(true)
      sel.removeAllRanges()
      sel.addRange(r)
      onSelectionChange()
    })
    return
  }

  // divide o texto atual
  const antes  = atual.texto.slice(0, relOffset)
  const depois = atual.texto.slice(relOffset)

  // monta as partes: head, <br>, vazio, tail (se houver)
  const head  = { texto: antes,  estilos: { ...atual.estilos } }
  const br    = { texto: '', estilos: {}, tag: 'br' }
  const vazio = { texto: '', estilos: {} }
  const partes = [head, br, vazio]
  if (depois) partes.push({ texto: depois, estilos: { ...atual.estilos } })

  // substitui no modelo
  model.value.splice(index, 1, ...partes)
  model.value = mergeBlocos(model.value) // <br> deve bloquear merges

  // caret no início do "vazio" recém-criado
  nextTick(() => {
    const caretIndex = index + 2 // head(0), br(1), vazio(2)
    const el = editor.value.querySelector(`[data-index="${caretIndex}"]`)
    if (!el) return
    if (!el.firstChild) el.appendChild(document.createTextNode(ZWSP))
    const r = document.createRange()
    r.setStart(el.firstChild, 1) // depois do ZWSP
    r.collapse(true)
    sel.removeAllRanges()
    sel.addRange(r)
    onSelectionChange()
  })
}
  if (e.ctrlKey && e.key == "b") {
    e.preventDefault()
    const ativo = ferramentaStore.estilosAtivos['bold']
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) {
      ferramentaStore.aplicarEstiloNoCursorEditor('bold', !ativo)
    return
  }
  ferramentaStore.aplicarEstiloNoEditor('bold', !ativo)
  }
  if (e.ctrlKey && e.key == "i") {
    e.preventDefault()
    const ativo = ferramentaStore.estilosAtivos['italic']
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) {
      ferramentaStore.aplicarEstiloNoCursorEditor('italic', !ativo)
    return
  }
  ferramentaStore.aplicarEstiloNoEditor('italic', !ativo)
  }

  // Backspace/Delete → atualiza texto e merge
  // console.log(model.value)
 if (e.key === 'Backspace' || e.key === 'Delete') {
    // espaço não-quebrável que o browser injeta

function cleanForCount(str = '') {
  // não conte ZWSP e converta NBSP para espaço normal
  return str.replaceAll(ZWSP, '').replaceAll(NBSP, ' ');
}
function placeCaret(textNode, offset) {
  const sel = window.getSelection();
  const r = document.createRange();
  r.setStart(textNode, Math.min(offset, (textNode.nodeValue || '').length));
  r.collapse(true);
  sel.removeAllRanges();
  sel.addRange(r);
}
  const sel = window.getSelection();
  if (!sel?.rangeCount) return;

  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return;

  const div = node.parentElement;
  const editorEl = div?.closest('.editor');
  if (!editorEl) return;

  const isLastDiv = editorEl.querySelectorAll('div').length === 1;

  // Texto “limpo” para contar corretamente
  const raw = node.nodeValue || '';
  const cleanLen = cleanForCount(raw).length;

  if (!isLastDiv) return; // em outros divs, deixa apagar normal

  if (range.collapsed) {
    // caret sem seleção
    if (cleanLen <= 1) {
      e.preventDefault();
      node.textContent = ZWSP;     // mantém vivo
      placeCaret(node, 1);         // caret no fim
    }
  } else {
    // há seleção
    const allSelected =
      range.startOffset === 0 &&
      range.endOffset === raw.length; // usar comprimento real do nó

    if (allSelected || cleanLen <= 1) {
      e.preventDefault();
      node.textContent = ZWSP;
      placeCaret(node, 1);
    }
  }
    
  
    }
  }

// --- Handle Paste (multi-line) ---
function onPaste(e) {
  e.preventDefault()
  const text = e.clipboardData.getData('text/plain')
  const linhas = text.split(/\r?\n/)
  const sel = window.getSelection()
  const range = sel.getRangeAt(0)
  const abs = getAbsoluteOffsetFromRange(range)
  const { index, relOffset } = getIndexAndRelFromAbs(model.value, abs)
  const bloco = model.value[index]
  const antes = bloco.texto.slice(0, relOffset)
  const depois = bloco.texto.slice(relOffset)

  const novosBlocos = [ { texto: antes + linhas[0], estilos: { ...bloco.estilos } } ]
  for (let i = 1; i < linhas.length; i++) novosBlocos.push({ texto: linhas[i], estilos: { ...bloco.estilos } })
  novosBlocos.push({ texto: depois, estilos: { ...bloco.estilos } })

  model.value.splice(index, 1, ...novosBlocos)
  model.value = mergeBlocos(model.value)
  nextTick(() => {
    restoreSelection(abs, abs)
    onSelectionChange()  
  } 
)

}

// --- Helpers ---
function getAbsoluteOffsetFromRange(range) {
  const startInfo = getBlockInfoFromDOM(model.value, range.startContainer, range.startOffset)
  return getAbsoluteOffset(model.value, startInfo.blocoIndex, startInfo.relativeOffset)
}
function gerarClasse(estilos = {}) {
  const classes = []
  if (estilos.bold) classes.push('txt-bold')
  if (estilos.thin) classes.push('txt-thin')
  if (estilos.italic) classes.push('txt-italic')
  if (estilos.underline) classes.push('txt-underline') // se tiver underline
  return classes.join(' ')
}
</script>

<style scoped>
.editor {
  outline: none;
  min-height: 1.5em;
  user-select: text;
  cursor: text;
  white-space: pre-wrap;
  display: inline-block;
}
.txt-thin{
  font-weight: lighter;
}
.txt-bold{
  font-weight: bold;
}
.txt-italic{
  font-style: italic;
}
[contenteditable="true"] {
  border: 1px rgb(180, 180, 180) solid;
  border-radius: 6px;
  width: 100%;
        /* Styles for any contenteditable element */
    }
</style>
