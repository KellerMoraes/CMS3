// ESTA PAGINA CONTÉM O CORE DO CMS, AQUI É DEFINIDO A ESTRUTURA PARA SER LIDA PELO COMPONENTE VUE NA HORA DE CONSTRUIR O MESMO
import _cmsProps from "../../config"
function gerarId() {
    return Math.random().toString(36).slice(2);
}

const ListaDeElementos = {
    Pagina: function (nomePagina, dominioId, dataInicial) {
        return {
            [_cmsProps.id]: "pagina",
            nomePagina,
            dominioId,
            versao: 'cms-3.0',
            inicial: dataInicial,
            atributos: { imagem: { mostrar: false, desktop: '', mobile: '', pontoFocal: '' } },
            filhos: [ 

            ]
        };
    },
    SubPagina: function () {
        const PaginaId = gerarId();
        return {

            [_cmsProps.id]: "subpagina-" + PaginaId,
            nome: "Subpágina",
            atributos: { visibilidade: { nome: 'display', valor: 'block', extensao: null }, imagem: { mostrar: false, desktop: '', mobile: '', pontoFocal: '' } },
            filhos: [

            ]
        };
    },
    Linha: function (componente = {
        nome: "Titulo",
        [_cmsProps.id]: "h1-" + gerarId(),
        icone: 'mdi-format-title',
        atributos: [], 
        classe: "", 
        conteudo: "Titulo 1"
    }) {
        // Temporariamente...
        const linhaId = gerarId();
        return {
            nome: "Linha",
            [_cmsProps.id]: "linha-" + linhaId,
            atributos: { estilo: { 'background': '#ffffff','min-height': 105 }, tipoFundo: 'Cor sólida' },
            filhos: [
                {
                    [_cmsProps.id]: "coluna-" + gerarId(),
                    nome: "Coluna",
                    estrutura: 12,
                    filhos: [
                        componente ?? ""
                    ],
                    atributos: { estilo: { 'background': '#ffffff' }, tipoFundo: 'Cor sólida'  }
                }
            ]
        };
    },
    Coluna: function () {
        return {
            [_cmsProps.id]: "coluna-" + gerarId(),
            nome: "Coluna",
            estrutura: 12,
            filhos: [],
            atributos: { estilo: { 'background': '#ffffff' }, tipoFundo: 'Cor sólida'  }
        };
    },
    Celula: function (indice) {
        return {
            [_cmsProps.id]: "cell-" + indice,
            nome: "GridCell",
            estrutura: 1,
            filhos: []
        };
    },
    Recursos: [
        // recursos: [
        //     {Nome: ,icone: , itens}
        // ]
    {
        Nome:"Estruturais",
        NomeRecurso:"Estruturais",
        NomeGrupo:"linhas",
        Icone: "mdi-view-dashboard-outline",
        Itens: [
            {
                Nome: "Genéricos", 
                Componentes: 
                [
                    {
                        [_cmsProps.id]: "linha-",
                        icone: 'mdi-view-day-outline',
                        atributos: { estilo: { 'background': '#ffffff','height': 105 }, tipoFundo: 'Cor sólida' },
                        filhos: []
                    },
                
                ]
            },
        ]
    },
    {
        Nome:"Componentes",
        NomeRecurso:"Componentes",
        NomeGrupo:"componentes",
        Icone: "mdi-plus-box-outline",
        Itens: [
            {
                Nome: "Genéricos", 
                Componentes: 
                [
                    {
                        [_cmsProps.id]: "linha-",
                        icone: 'mdi-view-day-outline',
                        atributos: { estilo: { 'background': '#ffffff','height': 105 }, tipoFundo: 'Cor sólida' },
                        filhos: []
                    },
                
                ]
            },
            {
                Nome: "Textos", 
                Componentes: 
                [
                    {
                        nome: "Titulo",
                        [_cmsProps.id]: "h1-",
                        icone: 'mdi-format-title',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Titulo 1"
                    },
                    {
                        nome: "Paragrafo",
                        [_cmsProps.id]: "p-",
                        icone: 'mdi-format-paragraph',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Pa   ragrafo 1",
                        
                    }   
                ]
            },
            {
                Nome: "Agrupamentos", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            },
        ]
    },
    {
        Nome:"Moldes",
        NomeRecurso:"Moldes",
        NomeGrupo:"linhas",
        Icone: "mdi-group",
        Itens: [
            {
                Nome: "Página", 
                Componentes: 
                [
                    {
                        nome: "Titulo",
                        [_cmsProps.id]: "h1-",
                        icone: 'mdi-format-title',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Titulo 1"
                    },
                    {
                        nome: "Paragrafo",
                        [_cmsProps.id]: "p-",
                        icone: 'mdi-format-paragraph',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Paragrafo 1",
                        
                    }   
                ]
            },
            {
                Nome: "Notícia", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            },
            {
                Nome: "Lato", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            },
            {
                Nome: "Stricto", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            }
        ]
    },
    {
        Nome:"Formulários",
        NomeRecurso:"Formularios",
        NomeGrupo:"componentes",
        Icone: "mdi-form-select",
        Itens: [
            {
                Nome: "Campos", 
                Componentes: 
                [
                    {
                        nome: "Titulo",
                        [_cmsProps.id]: "h1-",
                        icone: 'mdi-format-title',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Titulo 1"
                    },
                    {
                        nome: "Paragrafo",
                        [_cmsProps.id]: "p-",
                        icone: 'mdi-format-paragraph',
                        atributos: [], 
                        classe: "", 
                        conteudo: "Paragrafo 1",
                        
                    }   
                ]
            },
            {
                Nome: "Botões", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            },
            {
                Nome: "Formulários", 
                Componentes: 
                [
                    {  
                        nome: "Card",
                        [_cmsProps.id]: "card-", 
                        atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                        classe: "", 
                        conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                        icone: 'mdi-card-text',
                        
                    } 
                ]
            }
        ]
    },
    ]
    
};

export { ListaDeElementos, gerarId };
