// src/command/EditarElementoCommand.js

import { encontrarItemPorPath } from '@/helpers/pathUtil'; // ajuste o caminho se precisar

export default class EditarElementoCommand {
  constructor({ path, propriedades, valorAntigo, valorNovo }) {
    this.path = path;
    this.propriedades = propriedades; // array, tipo ['estrutura'] ou ['atributos', 'estilo', 'background']
    this.valorAntigo = valorAntigo;
    this.valorNovo = valorNovo;
  }

  executar(dados) {
    const item = encontrarItemPorPath(dados, this.path);
    this._setCampo(item, this.valorNovo);
  }

  desfazer(dados) {
    const item = encontrarItemPorPath(dados, this.path);
    this._setCampo(item, this.valorAntigo);
  }

  _setCampo(objeto, valor) {
    let alvo = objeto;
    for (let i = 0; i < this.propriedades.length - 1; i++) {
      alvo = alvo[this.propriedades[i]];
    }
    alvo[this.propriedades[this.propriedades.length - 1]] = valor;
  }
}
