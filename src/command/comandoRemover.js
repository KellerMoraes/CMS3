import { navegarPorPath } from './navegadorDePath.js'

export default class RemoverElementoCommand {
  constructor({ itemId, origem }) {
    this.itemId = itemId;
    this.origem = origem; // path + index
    this.item = null;     // vamos salvar o item completo só na execução
  }

  executar(dadosRaiz) {
    const origemInfo = navegarPorPath(dadosRaiz, this.origem.path);
    if (!origemInfo) return;

    const index = origemInfo.alvo.findIndex(el => el.id === this.itemId);
    if (index === -1) return;

    [this.item] = origemInfo.alvo.splice(index, 1);
  }

  desfazer(dadosRaiz) {
    const origemInfo = navegarPorPath(dadosRaiz, this.origem.path);
    if (!origemInfo || !this.item) return;

    origemInfo.alvo.splice(this.origem.index, 0, this.item);
  }
}