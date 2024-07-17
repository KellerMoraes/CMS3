/* eslint-disable vue/multi-word-component-names */
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './assets/styles/cms.scss'
import Titulo from '@/components/Menu/Componentes/Titulos/Titulo.vue'
import Paragrafo from '@/components/Menu/Componentes/Paragrafos/Paragrafo.vue'
import Card from '@/components/Menu/Componentes/Cards/Card.vue'
import CampoTexto from '@/components/Menu/Componentes/Formularios/CampoTexto.vue'
import CampoNome from '@/components/Menu/Componentes/Formularios/Campos/Nome.vue'
import CampoCPF from '@/components/Menu/Componentes/Formularios/Campos/CPF.vue'
import CampoDescricao from '@/components/Menu/Componentes/Formularios/Campos/Descricao.vue'
import CampoEmail from '@/components/Menu/Componentes/Formularios/Campos/Email.vue'
import CampoTelefone from '@/components/Menu/Componentes/Formularios/Campos/Telefone.vue'
import CampoSelecionavel from '@/components/Menu/Componentes/Formularios/CampoSelecionavel.vue'
import ConfigInput from '@/components/Menu/Config/Componentes/Input.vue'
import ConfigDimensoes from '@/components/Menu/Config/Componentes/Dimensoes.vue'
import Linha from '@/components/Menu/Componentes/Genericos/Linha.vue'
import Coluna from '@/components/Menu/Componentes/Genericos/Coluna.vue'
import Formulario from '@/components/Menu/Componentes/Formularios/Formulario.vue'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
let prefixoComp = "Comp"
let prefixoConfig = "Config"
let prefixoCampo = "Campo"
registerPlugins(app)
// nome do "Comp" precisa ser sucedido do nome definido no JSON, igual o valor da propriedade "nome"
app.component(prefixoComp+'Linha', Linha);
app.component(prefixoComp+'Coluna', Coluna);
app.component(prefixoComp+'Formulario', Formulario);
app.component(prefixoComp+'Titulo', Titulo);
app.component(prefixoComp+'Card', Card);
app.component(prefixoComp+'Paragrafo', Paragrafo);
app.component(prefixoComp+'CampoTexto', CampoTexto);
app.component(prefixoComp+'CampoSelecionavel', CampoSelecionavel);
app.component(prefixoConfig+'Input', ConfigInput);
app.component(prefixoConfig+'Dimensoes', ConfigDimensoes);
app.component(prefixoCampo+'Nome', CampoNome);
app.component(prefixoCampo+'CPF', CampoCPF);
app.component(prefixoCampo+'Telefone', CampoTelefone);
app.component(prefixoCampo+'Email', CampoEmail);
app.component(prefixoCampo+'Descricao', CampoDescricao);
app.mount('#app')
