import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';

class Titulo extends ElementoBase {
  static criar() {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'texto',
        [$cms('name')]: 'Titulo',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: 'Título padrão'// aqui no nível do item, fora dos attrs
    };
}
}

export const Elementos = {
 Titulo,
};