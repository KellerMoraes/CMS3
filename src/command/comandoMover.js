import { encontrarItemPorPath } from '@/helpers/pathUtil.js';

export default class MoverElementoCommand {
  constructor(info) {
    this.itemId = info.itemId;
    this.origem = {
      path: info.origem.path,
      index: info.origem.index
    };
    this.destino = {
      path: info.destino.path,
      index: info.destino.index
    };
    this.eventoNativo = info.eventoNativo
    //evento nativo é para definir se o evento é feito pelo usuário ou não, 
    //já que o executar só deve fazer sua função, caso já não tenha sido feito pela biblioteca 
  }

  executar(dados) {
    if(!this.eventoNativo){
      const listaOrigem = encontrarItemPorPath(dados, this.origem.path).filhos;
      const item = listaOrigem.splice(this.origem.index, 1)[0]; // remove
      const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;
      listaDestino.splice(this.destino.index, 0, item); // insere
    }
  }

  desfazer(dados) {
    const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;
    const item = listaDestino.splice(this.destino.index, 1)[0]; // remove
    const listaOrigem = encontrarItemPorPath(dados, this.origem.path).filhos;
    listaOrigem.splice(this.origem.index, 0, item); // volta
  }
}
