// richTextUtils.js

/** Compara dois objetos rasos de estilos */
export function jsonEq(a = {}, b = {}) {
  const ka = Object.keys(a), kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every(k => a[k] === b[k])
}

/** Merge de blocos adjacentes com estilos idênticos */
export function mergeBlocos(arr) {
  const out = []
  for (const b of arr) {
    if (b.tag === 'br') { out.push({ tag: 'br', texto: '', estilos: {} }); continue }
    const last = out[out.length - 1]
    const estilosEq = last && !last.tag && JSON.stringify(last.estilos||{}) === JSON.stringify(b.estilos||{})
    if (last && !last.tag && estilosEq) {
      last.texto += b.texto || ''
    } else {
      out.push({ texto: b.texto || '', estilos: { ...(b.estilos || {}) } })
    }
  }
  return out
}

/** Converte bloco/offset relativo em offset absoluto no texto */
export function getAbsoluteOffset(model, blocoIndex, relOffset) {
  let total = 0
  for (let i = 0; i < blocoIndex; i++) total += model[i].texto.length
  return total + relOffset
}

/** Converte offset absoluto em {index, relOffset} no modelo */
export function getIndexAndRelFromAbs(model, abs) {
  
  let running = 0
  for (let i = 0; i < model.length; i++) {
    const len = model[i].texto.length
    if (abs <= running + len) return { index: i, relOffset: abs - running }
    running += len
  }
  const last = model.length - 1
  return { index: last, relOffset: model[last].texto.length }
}

/** Retorna { blocoIndex, relativeOffset } a partir de um DOM node/offset */
export function getBlockInfoFromDOM(model, node, offset) {
  let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node
  while (el && !el.dataset?.index) el = el.parentElement
  if (!el) return null
  const blocoIndex = Number(el.dataset.index)
  if (!model[blocoIndex]) return null
  return { blocoIndex, relativeOffset: offset }
}

/** Dado caret em range, retorna offsets absolutos da palavra sob o caret */
export function getWordSelectionAbsFromCaret(model, range) {
  const info = getBlockInfoFromDOM(model, range.startContainer, range.startOffset)
  if (!info) return null
  const bloco = model[info.blocoIndex]
  if (!bloco || !bloco.texto.length) return null

  let pos = Math.min(Math.max(info.relativeOffset, 0), bloco.texto.length)
  if (pos > 0 && (pos === bloco.texto.length || /\s/.test(bloco.texto[pos]))) pos -= 1
  if (pos < 0 || /\s/.test(bloco.texto[pos])) return null

  let left = pos, right = pos + 1
  while (left > 0 && !/\s/.test(bloco.texto[left - 1])) left--
  while (right < bloco.texto.length && !/\s/.test(bloco.texto[right])) right++

  return {
    sAbs: getAbsoluteOffset(model, info.blocoIndex, left),
    eAbs: getAbsoluteOffset(model, info.blocoIndex, right)
  }
}
