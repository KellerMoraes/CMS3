// src/helpers/comandoMover.js
import { findItemByPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper';

export default class MoverElementoCommand {
  constructor(info) {
    this.item = info.item;
    this.origem = { ...info.origem };
    this.destino = { ...info.destino };
    this.eventoNativo = !!info.eventoNativo;
    this.executado = false;
  }

  executar(dados) {
    // Se o movimento foi feito pelo usuário, desfazemos primeiro para registrar corretamente
    if (this.eventoNativo && !this.executado) {
      const listaDestino = findItemByPath(dados, this.destino.path)[$cms('subpages')];
      const item = listaDestino.splice(this.destino.index, 1)[0];

      const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('subpages')];
      listaOrigem.splice(this.origem.index, 0, item);
    }

    // Executa movimento de forma previsível
    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('subpages')];
    const item = listaOrigem.splice(this.origem.index, 1)[0];

    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('subpages')];
    listaDestino.splice(this.destino.index, 0, item);

    this.executado = true;
  }

  desfazer(dados) {
    const listaDestino = findItemByPath(dados, this.destino.path)[$cms('subpages')];
    console.log(listaDestino)
    const item = listaDestino.splice(this.destino.index, 1)[0];

    const listaOrigem = findItemByPath(dados, this.origem.path)[$cms('subpages')];
    listaOrigem.splice(this.origem.index, 0, item);
  }
}
