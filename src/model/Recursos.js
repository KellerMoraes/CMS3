import { criarElemento } from "@/model/Elementos";
import RecursoBase from "@/model/Base/BaseRecurso";
import { $cms } from '@/helpers/cmsProviderHelper';
function id() {
    return Math.random().toString(36).slice(2);
}
const Estruturais = new RecursoBase("Estruturais","linhas","estruturais", "mdi-view-dashboard-outline")
Estruturais.adicionarGrupo("Genéricos","linhas", //Componentes
    [
        {
            [$cms("name")]: "Linha",
            [$cms("id")]: "linha-",
            [$cms("icon")]: 'mdi-view-sequential',
        },
    ]
)
Estruturais.adicionarGrupo("Genéricos","colunas", //Componentes
    [
        {
            [$cms("name")]: "Coluna",
            [$cms("id")]: "coluna-",
            [$cms("icon")]: 'mdi-view-column',
        },
    ]
)
const Componentes = new RecursoBase("Componentes","componentes","Componentes", "mdi-plus-box-outline")
Componentes.adicionarGrupo("Textos","componentes", //Componentes
    [
        {
            [$cms("name")]: "Titulo",
            [$cms("id")]: "h1-",
            [$cms("icon")]: 'mdi-format-title'
        },
        {
            [$cms("name")]: "Parágrafo",
            [$cms("id")]: "p-",
            [$cms("icon")]: 'mdi-format-paragraph'
        },
    ]
)
const Agrupamentos = new RecursoBase("Agrupamentos","componentes","Agrupamentos", "mdi-group")
Agrupamentos.adicionarGrupo("Cards","componentes", //Componentes
    [
        {
            [$cms("name")]: "Card",
            [$cms("id")]: "card-",
            [$cms("icon")]: 'mdi-card-text'
        },
    ]
)
const Formularios = new RecursoBase("Formularios","componentes","Formularios", "mdi-form-select")
Formularios.adicionarGrupo("Campos","componentes", //Componentes
    [
        {
            [$cms("name")]: "Campo",
            [$cms("id")]: "Campo-",
            [$cms("icon")]: 'mdi-form-textbox'
        },
        {
            [$cms("name")]: "Selecionavel",
            [$cms("id")]: "Selecionavel-",
            [$cms("icon")]: 'mdi-radiobox-marked'
        },
    ]
)
Formularios.adicionarGrupo("Formulários","linhas", //Componentes
    [
        {
            [$cms("name")]: "Formulario",
            [$cms("id")]: "Formulario-",
            [$cms("icon")]: 'mdi-list-box-outline'
        },
    ]
)
const Recursos =  [
    Estruturais,
    Componentes,
    Agrupamentos,
    Formularios
]

export { Recursos };