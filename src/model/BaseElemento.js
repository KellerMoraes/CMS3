// src/model/BaseElemento.js
import { gerarId } from '@/helpers/gerarId';
import { $cms } from '@/helpers/cmsProviderHelper'; // <-- este é o certo aqui

export class ElementoBase {
  static criarEstrutura({ tipo, nome = '', filhos = [], atributos = {}, meta = {} }) {
    return {
      [$cms('id')]: `${tipo}-${gerarId()}`,
      [$cms('nome')]: nome,
      [$cms('tipo')]: tipo,
      [$cms('atributos')]: atributos,
      [$cms('filhos')]: filhos,
      [$cms('meta')]: meta,
    };
  }
}
