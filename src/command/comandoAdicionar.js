import { encontrarItemPorPath } from '@/helpers/pathUtil.js';
import { $cms } from '@/helpers/cmsProviderHelper';
import _ from 'lodash'
export default class AdicionarElementoCommand {
  constructor(info) {
    this.elemento = _.cloneDeep(info.elemento); // Evita mutações inesperadas
    this.destino = {
      path: info.destino.path,
      index: info.destino.index ?? null,
    };
    this.eventoNativo = !!info.eventoNativo;
  }

  executar(dados) {
    if (this.eventoNativo) return;

    const listaDestino = encontrarItemPorPath(dados, this.destino.path)[$cms('subpages')];

    if (this.destino.index === null || this.destino.index > listaDestino.length) {
      listaDestino.push(this.elemento);
    } else {
      listaDestino.splice(this.destino.index, 0, this.elemento);
    }
  }

  desfazer(dados) {
    console.log(dados)
    const listaDestino = encontrarItemPorPath(dados, this.destino.path)[$cms('subpages')];
    const index = listaDestino.findIndex(e => e[$cms('id')] === this.elemento[$cms('id')]);
    console.log(index)
    if (index !== -1) listaDestino.splice(index, 1);
  }
}
