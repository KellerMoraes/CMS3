import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';

class Titulo extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'texto',
        [$cms('name')]: 'Titulo',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: 'Título padrão',// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
    };
}
}

export const Elementos = {
 Titulo,
};