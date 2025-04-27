import { encontrarItemPorPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper.js'; // precisa importar se ainda não importou

export default class RemoverElementoCommand {
  constructor(info) {
    this.itemId = info.itemId;
    this.origem = {
      path: info.origem.path,
      index: info.origem.index
    };
    this.itemRemovido = null; // será preenchido no momento da execução
  }

  executar(dados) {
    const listaOrigem = encontrarItemPorPath(dados, this.origem.path)[$cms('container')];

    if (!this.itemRemovido) {
      // Guarda o item só na primeira execução
      this.itemRemovido = listaOrigem[this.origem.index];
    }

    listaOrigem.splice(this.origem.index, 1); // Remove o item
  }

  desfazer(dados) {
    const listaOrigem = encontrarItemPorPath(dados, this.origem.path)[$cms('container')];

    if (this.itemRemovido) {
      listaOrigem.splice(this.origem.index, 0, this.itemRemovido); // Reinsere no lugar original
    }
  }
}
