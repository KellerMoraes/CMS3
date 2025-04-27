import { encontrarItemPorPath } from '@/helpers/pathUtil.js';

export default class AdicionarElementoCommand {
  constructor(info) {
    this.elemento = info.elemento;
    this.destino = {
      path: info.destino.path,
      index: info.destino.index ?? null,
    };
    this.eventoNativo = info.eventoNativo || false;
  }

  executar(dados) {
    if (!this.eventoNativo) {
      const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;

      if (this.destino.index === null || this.destino.index > listaDestino.length) {
        listaDestino.push(this.elemento);
      } else {
        listaDestino.splice(this.destino.index, 0, this.elemento);
      }
    }
  }

  desfazer(dados) {
    const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;
    const index = listaDestino.findIndex(e => e.id === this.elemento.id);
    if (index !== -1) {
      listaDestino.splice(index, 1);
    }
  }
}
