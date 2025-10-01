// utils/editorOps.js
// As operações trabalham com:
// - model: RichTextBloco root
// - caret: { node: RichTextTexto, offset: number }
// - selection: { start: {node, offset}, end: {node, offset} } | null

function idxOf(flat, n) {
  const i = flat.indexOf(n);
  if (i === -1) throw new Error("Node não pertence ao modelo atual.");
  return i;
}

export function deleteRange(model, selection) {
  if (!selection) return;
  const flat = model.flatten();

  const si = idxOf(flat, selection.start.node);
  const ei = idxOf(flat, selection.end.node);

  const [fromIdx, toIdx] = si <= ei ? [si, ei] : [ei, si];
  const start = si <= ei ? selection.start : selection.end;
  const end = si <= ei ? selection.end : selection.start;

  for (let i = fromIdx; i <= toIdx; i++) {
    const node = flat[i];
    if (i === fromIdx && i === toIdx) {
      // seleção dentro do mesmo nó
      node.texto =
        node.texto.slice(0, start.offset) + node.texto.slice(end.offset);
    } else if (i === fromIdx) {
      node.texto = node.texto.slice(0, start.offset);
    } else if (i === toIdx) {
      node.texto = node.texto.slice(end.offset);
    } else {
      node.texto = "";
    }
  }
  model.cleanup();

  // retorna nova posição do caret (colapsado no início do range)
  const newFlat = model.flatten();
  // tentar colocar no nó de início original, se ainda existir e offset válido
  const base = start.node;
  const idx = newFlat.indexOf(base);
  if (idx !== -1) {
    const off = Math.min(start.offset, newFlat[idx].length());
    return { node: newFlat[idx], offset: off };
  }
  // fallback: encontrar próximo nó após fromIdx
  for (let j = fromIdx; j < newFlat.length; j++) {
    return { node: newFlat[j], offset: 0 };
  }
  // se nada sobrou, criar um nó vazio mínimo?
  return null;
}

export function insertText(model, caret, text, selection = null) {
  if (selection) {
    const collapsed = deleteRange(model, selection);
    if (collapsed) {
      caret.node = collapsed.node;
      caret.offset = collapsed.offset;
    } else {
      // documento pode ter ficado vazio: cria 1 nó
      const { RichTextBloco, RichTextTexto } = require("../models/richtext.js");
      if (model.conteudo.length === 0) {
        model.conteudo.push(new (require("../models/richtext.js").RichTextTexto)({ texto: "" }));
      }
      const flat = model.flatten();
      caret.node = flat[0];
      caret.offset = 0;
    }
  }

  const node = caret.node;
  const before = node.texto.slice(0, caret.offset);
  const after = node.texto.slice(caret.offset);
  node.texto = before + text + after;
  caret.offset += text.length;
}

export function backspace(model, caret, selection = null) {
  if (selection) {
    const collapsed = deleteRange(model, selection);
    if (collapsed) {
      caret.node = collapsed.node;
      caret.offset = collapsed.offset;
    }
    return;
  }
  const flat = model.flatten();
  const i = idxOf(flat, caret.node);

  if (caret.offset > 0) {
    const n = caret.node;
    n.texto = n.texto.slice(0, caret.offset - 1) + n.texto.slice(caret.offset);
    caret.offset -= 1;
    if (n.texto.length === 0) {
      n.texto = ""; // será limpo no cleanup
      model.cleanup();
      const nf = model.flatten();
      // reposiciona caret para fim do nó anterior (se houver)
      const pos = Math.min(i - 1, nf.length - 1);
      if (pos >= 0) {
        caret.node = nf[pos];
        caret.offset = caret.node.length();
      } else if (nf.length) {
        caret.node = nf[0];
        caret.offset = 0;
      }
    }
    return;
  }

  // offset == 0 → juntar com anterior
  if (i > 0) {
    const prev = flat[i - 1];
    const cur = flat[i];
    const prevLen = prev.length();
    prev.texto += cur.texto;
    cur.texto = "";
    model.cleanup();
    caret.node = prev;
    caret.offset = prevLen;
  }
}

export function delForward(model, caret, selection = null) {
  if (selection) {
    const collapsed = deleteRange(model, selection);
    if (collapsed) {
      caret.node = collapsed.node;
      caret.offset = collapsed.offset;
    }
    return;
  }
  const flat = model.flatten();
  const i = idxOf(flat, caret.node);

  if (caret.offset < caret.node.length()) {
    const n = caret.node;
    n.texto = n.texto.slice(0, caret.offset) + n.texto.slice(caret.offset + 1);
    if (n.length() === 0) {
      model.cleanup();
      const nf = model.flatten();
      if (nf.length) {
        // manter caret na mesma posição lógica (no mesmo índice se possível)
        const pos = Math.min(i, nf.length - 1);
        caret.node = nf[pos];
        caret.offset = Math.min(caret.offset, caret.node.length());
      }
    }
    return;
  }

  // offset no fim → merge com próximo
  if (i < flat.length - 1) {
    const next = flat[i + 1];
    caret.node.texto += next.texto;
    next.texto = "";
    model.cleanup();
  }
}

export function moveLeft(model, caret) {
  const flat = model.flatten();
  const i = idxOf(flat, caret.node);
  if (caret.offset > 0) {
    caret.offset -= 1;
    return;
  }
  if (i > 0) {
    caret.node = flat[i - 1];
    caret.offset = caret.node.length();
  }
}

export function moveRight(model, caret) {
  const flat = model.flatten();
  const i = idxOf(flat, caret.node);
  if (caret.offset < caret.node.length()) {
    caret.offset += 1;
    return;
  }
  if (i < flat.length - 1) {
    caret.node = flat[i + 1];
    caret.offset = 0;
  }
}
