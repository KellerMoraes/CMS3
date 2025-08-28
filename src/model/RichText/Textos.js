let nodeCounter = 0

class BaseNode {
  constructor(tipo, attrs = {}, conteudo = []) {
    this.tipo = tipo
    this.attrs = attrs
    this.conteudo = conteudo
    this.__id = nodeCounter++  // adiciona ID único
  }

  toJSON() {
    return {
      tipo: this.tipo,
      attrs: this.attrs,
      conteudo: this.conteudo.map(c => c.toJSON ? c.toJSON() : c)
    }
  }
}


// Texto puro
class TextoNode extends BaseNode {
  constructor(texto) {
    super("texto", {}, [])
    this.texto = texto
  }

  toJSON() {
    return { tipo: "texto", texto: this.texto }
  }
}

// Blocos
class ParagrafoNode extends BaseNode {
  constructor(conteudo = []) {
    super("paragrafo", {}, conteudo)
  }
}

class HeadingNode extends BaseNode {
  constructor(level = 1, conteudo = []) {
    super("heading", { level }, conteudo)
  }
}

// Inline styles
class StrongNode extends BaseNode {
  constructor(conteudo = []) {
    super("strong", {}, conteudo)
  }
}

class ItalicNode extends BaseNode {
  constructor(conteudo = []) {
    super("italic", {}, conteudo)
  }
}

class UnderlineNode extends BaseNode {
  constructor(conteudo = []) {
    super("underline", {}, conteudo)
  }
}

class StrikeNode extends BaseNode {
  constructor(conteudo = []) {
    super("strike", {}, conteudo)
  }
}

// Links
class LinkNode extends BaseNode {
  constructor(href, conteudo = []) {
    super("link", { href }, conteudo)
  }
}

export {
  BaseNode,
  TextoNode,
  ParagrafoNode,
  HeadingNode,
  StrongNode,
  ItalicNode,
  UnderlineNode,
  StrikeNode,
  LinkNode
}
