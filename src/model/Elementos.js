// ESTA PAGINA CONTÉM O CORE DO CMS, AQUI É DEFINIDO A ESTRUTURA PARA SER LIDA PELO COMPONENTE VUE NA HORA DE CONTRUIR O MESMO

function gerarId() {
    return Math.random().toString(36).slice(2);
}

const ListaDeElementos = {
    Pagina: function (nomePagina, dominioId, dataInicial) {
        return {
            nomeTag: "pagina",
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

            nomeTag: "subpagina-" + PaginaId,
            nome: "Subpágina",
            atributos: { visibilidade: { nome: 'display', valor: 'block', extensao: null }, imagem: { mostrar: false, desktop: '', mobile: '', pontoFocal: '' } },
            filhos: [

            ]
        };
    },
    Linha: function () {
        const linhaId = gerarId();
        return {
            nomeTag: "linha-" + linhaId,
            atributos: { cor: { nome: 'background-color', valor: '#ffffff' } },
            filhos: [
                {
                    nomeTag: "coluna-" + gerarId(),
                    estrutura: 12,
                    filhos: [
                        {
                            nome: "Titulo",
                            nomeTag: "h1-" + gerarId(),
                            icone: 'mdi-format-title',
                            atributos: [], 
                            classe: "", 
                            conteudo: "Titulo 1"
                        },
                    ],
                    atributos: { estilo: { 'background-color': '#ffffff' } }
                }
            ]
        };
    },
    Coluna: function () {
        return {
            nomeTag: "coluna-" + gerarId(),
            estrutura: 12,
            filhos: [],
            atributos: []
        };
    },
    Componentes:  
        [        
        {
            Nome: "Textos", 
            Componentes: 
            [
                {
                    nome: "Titulo",
                    nomeTag: "h1-" + gerarId(),
                    icone: 'mdi-format-title',
                    atributos: [], 
                    classe: "", 
                    conteudo: "Titulo 1"
                },
                {
                    nome: "Paragrafo",
                    nomeTag: "p-" + gerarId(),
                    icone: 'mdi-format-paragraph',
                    atributos: [], 
                    classe: "", 
                    conteudo: "Paragrafo 1",
                    
                }   
            ]
        },
        {
            Nome: "Agrupamentos", 
            Componentes: 
            [
                {  
                    nome: "Card",
                    nomeTag: "card-" + gerarId(), 
                    atributos: [{ 'max-width': '344px', 'border-left': 'solid 4px #ffb30c', 'border-radius': '0px' }], 
                    classe: "", 
                    conteudo: { "titulo": "Título", "subtitulo": "Sub Título", "texto": "Lorem ipsum dolor, sit amet consectetur adipisicing elit." },
                    icone: 'mdi-card-text',
                    
                } 
            ]
        }
       ]
    
};

export { ListaDeElementos, gerarId };
