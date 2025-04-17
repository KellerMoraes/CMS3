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
  }

  executar(dados) {
    const listaOrigem = encontrarItemPorPath(dados, this.origem.path).filhos;
    const item = listaOrigem.splice(this.origem.index, 1)[0]; // remove
    // console.log(item)
    const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;
    listaDestino.splice(this.destino.index, 0, item); // insere
  }

  desfazer(dados) {
    console.log("aceeet")
    const listaDestino = encontrarItemPorPath(dados, this.destino.path).filhos;
    const item = listaDestino.splice(this.destino.index, 1)[0]; // remove
    
    const listaOrigem = encontrarItemPorPath(dados, this.origem.path).filhos;
    listaOrigem.splice(this.origem.index, 0, item); // volta
    console.log(listaOrigem)
  }
}
