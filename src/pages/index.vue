<template>
  <v-card-title class="px-5 pt-5 pb-1">
    Páginas
  </v-card-title>
  <v-card-text class="pa-5">
    <div class="d-flex">

      <v-card v-for="type in pageTypes" :key="type.color" :color="type.color" variant="outlined" class="d-flex justify-center align-center ma-2" height="70" width="140">
        <v-icon class="mr-2">{{ type.icon }}</v-icon>
        <span style="font-size: 16px; font-weight: 500;"> {{ type.name }}</span>
      </v-card>
    </div>

      <v-data-table
    :headers="headers"
    :items="paginas"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar color="#f5f2f2" class="pr-6"
        flat
      >
        <v-toolbar-title>

          <div class="d-flex justify-start align-center" style="font-size: 16px;">
            <v-icon>mdi-clock</v-icon>Recentes
            
          </div>
        </v-toolbar-title>
        <div class="d-flex justify-center align-center">
          <div style="width: 250px;" class="mt-5 mr-10">
            <v-text-field variant="outlined" density="compact"></v-text-field>
          </div>
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
    <v-icon
      class="mx-4"
      size="large"
      color="blue"
      @click="editItem(item)"
      >
      mdi-cog
    </v-icon>
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
  {name: "Graduação" , icon: "mdi-school", color: "blue" },
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
            dataModificado: '30/11/2024',
            nome: "Direito",
            data: "29/11/2024",
            tipo: "Página de Curso",
            publicado: false,
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.paginas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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

<!-- <script setup>
import { useFerramentaStore } from '@/stores/ferramenta.js';

let ferramentaStore = useFerramentaStore()
const pageTypes = [
  {name: "Graduação" , icon: "mdi-school", color: "blue" },
  {name: "Notícias" , icon: "mdi-newspaper", color: "green" },
  {name: "Provas" , icon: "mdi-head-lightbulb", color: "orange" },
]
    const dialog = ref(false)
      const dialogDelete = ref(false)
      const headers = [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Calories', key: 'calories' },
        { title: 'Fat (g)', key: 'fat' },
        { title: 'Carbs (g)', key: 'carbs' },
        { title: 'Protein (g)', key: 'protein' },
        { title: 'Actions', key: 'actions', sortable: false },
      ]
      const paginas = ref([])
      const editedIndex = ref(-1)
      const editedItem = {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      }
      const defaultItem = {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      }
      const formTitle = computed(()=>{
        return editedIndex.value === -1 ? 'New Item' : 'Edit Item'

      })
      watch(dialog, )
      watch(dialog, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
      computed




</script> -->
<style scoped>
/* *{
  <!-- <v-toolbar
  style="z-index: 1005;background-color:  rgb(var(--v-theme-surface));"
  >
  Oque/onde é/está
  </v-toolbar> -->
  color: #ececec;
} */
</style>
