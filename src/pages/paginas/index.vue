<template>
    <v-card-title class="px-5 pt-5 pb-1">
      Páginas
    </v-card-title>
    <v-card-text class="px-3">
        
        <v-data-table
      :headers="headers"
      :ondragover="teste"
      :items="paginas"
      height="720"
      :sort-by="[{ key: 'dataModificado', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar color="white" class="pr-6"
          flat
        >
          <v-toolbar-title class="ml-0">
  
            <div class="d-flex justify-start align-center" style="font-size: 16px;">
                <div style="width: 350px;" class="ma-2">
                    
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Buscar Páginas"
        variant="outlined"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
            </div>
              
            </div>
          </v-toolbar-title>
          <div class="d-flex justify-center align-center">
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
            <template v-slot:activator="{ props }">
              <v-btn
              color="black"
              variant="flat"
              v-bind="props"
              >
              Importar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            
            <v-card-text>
              <v-container>
                
      </v-container>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      color="blue-darken-1"
      variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
              variant="flat"
              class="ml-2"
            color="blue"
              >
              <v-icon>mdi-plus</v-icon>
              Nova Página
            </v-btn>
        </div>
  
  
  
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.publicado="{ item }">
        <v-icon
          class="mx-4"
          size="large"
          :color="item.publicado ? 'green' : 'grey' "
          >
          mdi-upload
        </v-icon>
      </template>
      <template v-slot:item.tipo="{ item }">
        <v-chip color="blue">{{ item.tipo }}</v-chip>
      </template>
      <template v-slot:item.configs="{ item }">
        <v-btn  class="mx-4" variant="plain"
            color="blue"
            :to="`configuracao/${item.id}`" icon="mdi-cog">
          
      </v-btn>
      </template>
      <template v-slot:item.editar="{ item }">
        <v-icon
        size="large"
        color="blue"
          @click="deleteItem(item)"
        >
          mdi-application-edit
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    </v-card-text>
    
    
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
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
    {name: "Cursos" , icon: "mdi-school", color: "blue" },
    {name: "Notícias" , icon: "mdi-newspaper", color: "green" },
    {name: "Provas" , icon: "mdi-head-lightbulb", color: "orange" },
  ],
        editedIndex: -1,
        editedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        defaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
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
  
        editItem (item) {
          this.editedIndex = this.paginas.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        teste(){
            alert("ceta")
        },
  
        deleteItem (item) {
          this.editedIndex = this.paginas.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.paginas.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.paginas[this.editedIndex], this.editedItem)
          } else {
            this.paginas.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>
  