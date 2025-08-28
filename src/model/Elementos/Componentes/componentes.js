import { ElementoBase } from '@/model/Base/BaseElemento';
import { $cms } from '@/helpers/cmsProviderHelper';
import { RichTextBloco, RichTextTexto } from "@/model/RichText/Texto"
export class Titulo extends ElementoBase {
  static criar(args) {
    const texto1 = new RichTextTexto({ texto: "Título " })
    const texto2 = new RichTextTexto({ texto: "padrão" })
    const bloco = new RichTextBloco({ tipo: "h1", conteudo: [texto1, texto2] })
    texto1.__parent = bloco  // referência para o parent
    texto2.__parent = bloco  // referência para o parent

    return {
      ...this.criarEstrutura({
        [$cms("type")]: "Componente",
        [$cms("name")]: "Titulo",
        [$cms("attrs")]: {},
      }),
      [$cms("content")]: bloco,
      [$cms("icon")]: args?.icon,
      [$cms("configs")]: ["Texto"],
      [$cms("group")]: args?.group,
      compName: "Titulo",
    }
  }
}
class Paragrafo extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Parágrafo',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: 'Título padrão',// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Paragrafo',
    };
  }
}
class Card extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Card',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: {titulo:'Título padrão',subtitulo: 'Subtítulo padrão',texto: 'Texto padrão'},// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Card',
    };
  }
}
class Container extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Componente',
        [$cms('name')]: 'Container',
        [$cms('attrs')]: {
        },
      }),
      [$cms('content')]: 'Título padrão',// aqui no nível do item, fora dos attrs
      [$cms('container')]: [],// aqui no nível do item, fora dos attrs
      [$cms('icon')]: args?.icon,
      [$cms('group')]: args?.group,
      compName: 'Container',
    };
}
}
class Formulario extends ElementoBase {
  static criar(args) {
    return {
      ...this.criarEstrutura({
        [$cms('type')]: 'Formulario',
        [$cms('name')]: 'Formulário',
        [$cms('attrs')]: {
        },
      }),
      [$cms('icon')]: args?.icon,
      [$cms('container')]: [],
      [$cms('group')]: args?.group,
      compName: 'Formulario',
    };
}
}

export const Elementos = {
 Titulo,
 Paragrafo,
 Card,
 Container,
 Formulario
};