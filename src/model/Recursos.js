import { ListaDeElementos } from "./Elementos";
import _cmsProps from "../../config"
function id() {
    return Math.random().toString(36).slice(2);
}
const Recursos =  [
    // {
//     Nome:"Estruturais",
//     NomeRecurso:"Estruturais",
//     NomeGrupo:"linhas",
//     Icone: "mdi-view-dashboard-outline",
//     Itens: [
//         {
//             Nome: "Genéricos",
//             Grupo: "linhas", 
//             Componentes: 
//             [
                
//                 new ListaDeElementos.Linha()
                
//             ]
//         },
//         {
//             Nome: "Genéricos",
//             Grupo: "colunas", 
//             Componentes: 
//             [
                
//                 new ListaDeElementos.Coluna()
            
//             ]
//         },
//     ]
// },
{
    Nome:"Componentes",
    NomeRecurso:"Componentes",
    NomeGrupo:"componentes",
    Icone: "mdi-plus-box-outline",
    Itens: [
        {
            Nome: "Textos",
            Grupo: "componentes",  
            Componentes: 
            [
                {
                    [_cmsProps.name]: "Titulo",
                    [_cmsProps.id]: "h1-",
                    icone: 'mdi-format-title',
                    atributos: [], 
                    classe: "", 
                    conteudo: "Titulo 1"
                },
                {
                    [_cmsProps.name]: "Paragrafo",
                    [_cmsProps.id]: "p-",
                    icone: 'mdi-format-paragraph',
                    atributos: [], 
                    classe: "", 
                    conteudo: "Paragrafo 1",
                    
                }   
            ]
        },
    ]
    },
//         {
//             Nome: "Agrupamentos", 
//             Componentes: 
//             [
//                 {  
//                     [_cmsProps.name]: "Card",
//                     [_cmsProps.id]: "card-" + id, 
//                     atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
//                     classe: "", 
//                     conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
//                     icone: 'mdi-card-text',
                    
//                 } 
//             ]
//         },
//     ]
// },
// {
//     Nome:"Moldes",
//     NomeRecurso:"Moldes",
//     NomeGrupo:"linhas",
//     Icone: "mdi-group",
//     Itens: [
//         {
//             Nome: "Página",
//             Grupo: "componentes", 
//             Componentes: 
//             [
//                 {
//                     [_cmsProps.name]: "Titulo",
//                     [_cmsProps.id]: "h1-" + id,
//                     icone: 'mdi-format-title',
//                     atributos: [], 
//                     classe: "", 
//                     conteudo: "Titulo 1"
//                 },
//                 {
//                     [_cmsProps.name]: "Paragrafo",
//                     [_cmsProps.id]: "p-" + id,
//                     icone: 'mdi-format-paragraph',
//                     atributos: [], 
//                     classe: "", 
//                     conteudo: "Paragrafo 1",
                    
//                 }   
//             ]
//         }
        
//     ]
// },
{
    Nome:"Formulários",
    NomeRecurso:"Formularios",
    NomeGrupo:"componentes",
    Icone: "mdi-form-select",
    Itens: [
        {
            Nome: "Campos",
            Grupo: "componentes", 
            Componentes: 
            [
                {
                    [_cmsProps.name]: "Campo",
                    [_cmsProps.id]: "Campo-",
                    configuracoes:["Input","Dimensoes"],
                    icone: 'mdi-form-textbox',
                    atributos: { estilo: { 'background': '#ffffff' }, definicoes: {variante: "outlined", densidade: 'comfortable', tipo: "Blank" } },
                    conteudo: ""
                },
                {
                    [_cmsProps.name]: "Selecionavel",
                    [_cmsProps.id]: "Selecionavel-",
                    configuracoes:["GridMaker"],
                    icone: 'mdi-radiobox-marked',
                    atributos: { estilo: {}, definicoes: { tipo: "Blank", grid: [1,1] } },
                    filhos: [],
                    conteudo: "",
                    
                }   
            ]
        },
        // {
        //     Nome: "Botões", 
        //     Componentes: 
        //     [
        //         {
        //             [_cmsProps.name]: "BotaoSimples",
        //             [_cmsProps.id]: "BotaoSimples-" + id,
        //             icone: 'mdi-button-cursor',
        //             atributos: [],
        //             conteudo: { "label": "Botão", "Icone": "mdi-check" }
                    
        //         }   
        //     ]
        // },
        {
            Nome: "Formulários",
            Grupo: "linhas", 
            Componentes:
            [ 
            
                {

      conteudo: {},
      [_cmsProps.name]: "Formulario",
      [_cmsProps.id]: "Formulario-",
      atributos: [],
      configuracoes:[""],
      tiposCampo: [
        "Nome",
        "CPF",
        "Telefone",
        "Email",
        "Descricao"
      ],
      icone: 'mdi-list-box-outline',
      filhos: [
        new ListaDeElementos.Linha(),
        new ListaDeElementos.Linha({
            [_cmsProps.name]: "Botao",
            [_cmsProps.id]: "btn-1243124124",
            atributos: { estilo: { }, definicoes: {variante: "tonal", tipo: "Submit" } }, 
            classe: "", 
            conteudo: "Titulo 1"
        })
        // {
        //     [_cmsProps.id]: "linha-" + id(),
        //     [_cmsProps.name]: "Linha",
        //     atributos: { estilo: { 'background': '#ffffff','min-height': 105 }, tipoFundo: 'Cor sólida' },
        //     filhos: [
        //         {
        //             [_cmsProps.name]: "Coluna",
        //             [_cmsProps.id]: "coluna-" + id(),
        //             estrutura: 12,
        //             filhos: [
        //                 {
        //                     [_cmsProps.name]: "Titulo",
        //                     [_cmsProps.id]: "h1-" + id(),
        //                     icone: 'mdi-format-title',
        //                     atributos: [], 
        //                     classe: "", 
        //                     conteudo: "Titulo 1"
        //                 },
        //             ],
        //             atributos: { estilo: { 'background': '#ffffff' }, tipoFundo: 'Cor sólida'  }
        //         }
        //     ]
        // }
      ],
                },
        ]
        }
    ]
},

]

export { Recursos };