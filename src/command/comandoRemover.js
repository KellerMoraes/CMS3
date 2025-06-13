import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper.js'; // precisa importar se ainda não importou

export default class RemoverElementoCommand {
  constructor(info) {
    this.origem = {
      path: info.origem.path,
      index: info.origem.index
    };
    this.itemRemovido = null;
  }

  executar(dados) {
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];

    if (!this.itemRemovido) {
      this.itemRemovido = listaOrigem[this.origem.index];
    }

    if (listaOrigem[this.origem.index] === this.itemRemovido) {
      listaOrigem.splice(this.origem.index, 1);
    }
  }

  desfazer(dados) {
    if (this.itemRemovido) {
      const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('container')];
      listaOrigem.splice(this.origem.index, 0, this.itemRemovido);
    }
  }
}

