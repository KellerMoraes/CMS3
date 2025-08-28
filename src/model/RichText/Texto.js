export class RichTextTexto {
  constructor({ texto = "", estilos = {} } = {}) {
    this.id = crypto.randomUUID()
    this.texto = texto
    this.estilos = estilos
    this.__parent = null
  }
}

export class RichTextBloco {
  constructor({ tipo = "paragrafo", conteudo = [] } = {}) {
    this.id = crypto.randomUUID()
    this.tipo = tipo
    this.conteudo = conteudo
    conteudo.forEach(c => (c.__parent = this))
  }
}