import { navegarPorPath } from './navegadorDePath.js'

export default class AdicionarElementoCommand {
  constructor({ item, destino }) {
    this.item = item; // o item novo precisa ser clonado (não é referência de outro lugar)
    this.destino = destino; // path + index
  }

  executar(dadosRaiz) {
    const destinoInfo = navegarPorPath(dadosRaiz, this.destino.path);
    if (!destinoInfo) return;

    destinoInfo.alvo.splice(this.destino.index, 0, this.item);
  }

  desfazer(dadosRaiz) {
    const destinoInfo = navegarPorPath(dadosRaiz, this.destino.path);
    if (!destinoInfo) return;

    const index = destinoInfo.alvo.findIndex(el => el.id === this.item.id);
    if (index !== -1) destinoInfo.alvo.splice(index, 1);
  }
}