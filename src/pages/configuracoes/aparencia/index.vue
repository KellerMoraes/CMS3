<template>
  
    <v-card-title class="pr-5 pl-3  pt-5 pb-1">
      <div style="width: 250px;" class="mr-10">
                <v-text-field append-inner-icon="mdi-magnify" density="compact" label="Buscar"
                  variant="outlined" hide-details single-line ></v-text-field>
              </div>
            </v-card-title>
            <v-card-subtitle class="pr-5 pl-2  py-5" style="font-size: 24px; font-family: Poppins;">
      Configurações
  
    </v-card-subtitle>
    <v-card-text class="pa-5 pl-2 pt-0">
      <!-- <div class="d-flex">
        <v-chip-group>
          <v-chip v-for="type in pageTypes" :key="type.color" :bgColor="type.color" :color="type.color">
            <v-icon class="mr-2" :color="type.color">{{ type.icon }}</v-icon>
            <span style="font-size: 16px; font-weight: 500;"> {{ type.name }}</span>
          </v-chip>
        </v-chip-group>
      </div> -->
        <v-card class="pa-4" flat height="800px" style="overflow: auto;">
            <v-toolbar color="white" class="pr-6" flat>
          <v-toolbar-title class="ml-4" style="font-size: 20px; font-family: Poppins;">
            Aparência
            <br>
            <div style="font-size: 13px; font-weight: 300;">Mude as configurações de visualização do sistema.</div>
          </v-toolbar-title>
            </v-toolbar>
            <v-divider class="ma-4 mb-8"></v-divider>
            <v-row>
                <v-col cols="2">
                    <v-card-title class="pb-1">
                        Tema
                    </v-card-title>
                    <v-card-subtitle>
                        Selecione o tema da interface.
                    </v-card-subtitle>
                    
                </v-col>
                <v-col cols="10" class="d-flex justify-around">
                        <v-card height="160" width="220" class="mx-4">
                            Claro
                        </v-card>
                        <v-card height="160" width="220" class="mx-4">
                            Escuro
                        </v-card>

                </v-col>
            </v-row>
            <v-divider class="ma-4"></v-divider>
            <v-row>
                <v-col cols="12" class="pb-0">
                    <v-card-title class="pb-1">
                        Barra lateral
                    </v-card-title>
                    <v-card-subtitle>
                        Altere a aparência e como é mostrado a barra lateral.
                    </v-card-subtitle>
                    
                </v-col>
            </v-row>
            <v-row class="ml-1 mt-6">
                <v-col cols="5">
                    <v-card-title class="pb-1" style="font-size: 15px; font-family: Poppins;">
                        Barra Transparente
                    </v-card-title>
                    <v-card-subtitle>
                        Definia a barra lateral como transparente.
                    </v-card-subtitle>
                </v-col>
                <v-col cols="7" class="d-flex justify-around">
                    <v-switch></v-switch>
                </v-col>
                <v-col cols="4">
                    <v-card-title class="pb-1" style="font-size: 15px; font-family: Poppins;">
                        Aparência botões
                    </v-card-title>
                    <v-card-subtitle>
                        alterar como é mostrado os botões.
                    </v-card-subtitle>
                </v-col>
                <v-col cols="8" class="d-flex justify-around">
                    <v-card height="110" width="60" class="mx-4">
                        Lista
                    </v-card>
                    <v-card height="110" width="60" class="mx-4">
                        Icones
                    </v-card>
                </v-col>
            </v-row>
            <v-divider class="ma-4 mb-6"></v-divider>
            <v-row>
                <v-col cols="2">
                    <v-card-title class="pb-1">
                        Vizualização de Tabelas
                    </v-card-title>
                    <v-card-subtitle style="text-wrap: wrap;">
                        Altere a aparência de como é mostrado as listas de Páginas, Noticias, etc.
                    </v-card-subtitle>
                    
                </v-col>
                <v-col cols="10" class="d-flex justify-around">
                        <v-card height="160" width="220" class="mx-4">
                            Padrão
                        </v-card>
                        <v-card height="160" width="220" class="mx-4">
                            Compacta
                        </v-card>

                </v-col>
            </v-row>
            <!-- <v-row class="ml-1 mt-6">
                <v-col cols="5">
                    <v-card-title class="pb-1" style="font-size: 15px; font-family: Poppins;">
                        Barra Transparente
                    </v-card-title>
                    <v-card-subtitle>
                        Definia a barra lateral como transparente.
                    </v-card-subtitle>
                </v-col>
                <v-col cols="7" class="d-flex justify-around">
                    <v-switch></v-switch>
                </v-col>
                <v-col cols="4">
                    <v-card-title class="pb-1" style="font-size: 15px; font-family: Poppins;">
                        Aparência botões
                    </v-card-title>
                    <v-card-subtitle>
                        alterar como é mostrado os botões.
                    </v-card-subtitle>
                </v-col>
                <v-col cols="8" class="d-flex justify-around">
                    <v-card height="110" width="60" class="mx-4">
                            Lista
                        </v-card>
                        <v-card height="110" width="60" class="mx-4">
                            Icones
                        </v-card>
                </v-col>
            </v-row> -->
      </v-card>
  
      <!-- <v-data-table :headers="headers" :items="paginas" height="680" :sort-by="[{ key: 'dataModificado', order: 'asc' }]">
        <template v-slot:top>
        </template>
        <template v-slot:item.publicado="{ item }">
          <v-icon class="mx-4" size="large" :color="item.publicado ? 'green' : 'grey'">
            mdi-upload
          </v-icon>
        </template>
        <template v-slot:item.tipo="{ item }">
          <v-chip color="blue">{{ item.tipo }}</v-chip>
        </template>
        <template v-slot:item.configs="{ item }">
          <v-btn class="mx-4" variant="plain" color="blue" :to="`paginas/configuracao/${item.id}`" icon="mdi-cog">
          </v-btn>
        </template>
        <template v-slot:item.editar="{ item }">
          <v-btn class="mx-4" variant="plain" color="blue" :to="`editor/${item.id}`" icon="mdi-application-edit">
          </v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table> -->
  
    </v-card-text>
  
  
  </template>
  <script>
  export default {
    data: () => ({
      dialog: false,
      dialogImportar: false,
      paginaImportadaCarregada: true,
      headers: [
        {
          title: 'Nome',
          align: 'start',
          sortable: false,
          key: 'nome',
        },
        { title: 'Publicado', key: 'publicado', sortable: false },
        { title: 'Última Modificação', key: 'dataModificado' },
        { title: 'Data de Criação', key: 'data' },
        { title: 'Tipo', key: 'tipo' },
        { title: 'Configurações', key: 'configs', sortable: false, align: 'center', },
        { title: 'Editar', key: 'editar', sortable: false, align: 'center', },
      ],
      paginas: [],
      pageTypes: [
        { name: "Cursos", icon: "mdi-school", color: "blue", tipoPagina: "curso" },
        { name: "Notícias", icon: "mdi-newspaper", color: "green" , tipoPagina: "noticia" },
        { name: "Provas", icon: "mdi-head-lightbulb", color: "orange", tipoPagina: "prova" },
      ],
      editedIndex: -1,
    }),
  
    created() {
      this.initialize()
    },
  
    methods: {
      initialize() {
        this.paginas = [
          {
            id: 1,
            dataModificado: '30/11/2024',
            nome: "Direito",
            data: "29/11/2024",
            tipo: "Página de Curso",
            caminho: "direito",
            publicado: false,
          },
  
        ]
      },
      selecionarArquivo(){
      document.getElementById('fileInput').click();
      },
      mostrarArquivoSelecionado(event) {
      const arquivo = event.target.files[0];
      if (arquivo) {
          console.log("Arquivo selecionado:", arquivo);
      }
  }
  
  
    },
  }
  </script>
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  .selecionavelHover {
      transition: opacity .4s ease-in-out;
    }
  
    .selecionavelHover:not(.on-hover) {
      opacity: 0.4;
    }
  
    .show-btns {
      color: rgba(255, 255, 255, 1) !important;
    }
  </style>
  