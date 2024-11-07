/* eslint-disable vue/multi-word-component-names */
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './assets/styles/cms.scss'
import properties from '../config';

import Titulo from '@/components/Menu/Componentes/Titulos/Titulo.vue'
import Botao from '@/components/Menu/Componentes/Botoes/Botao.vue'
import Paragrafo from '@/components/Menu/Componentes/Paragrafos/Paragrafo.vue'
import Card from '@/components/Menu/Componentes/Cards/Card.vue'
import GridCell from '@/components/Base/BaseGridCell.vue'
import Campo from '@/components/Menu/Componentes/Formularios/Campo.vue'
import CampoNome from '@/components/Menu/Componentes/Formularios/Campos/Nome.vue'
import CampoCPF from '@/components/Menu/Componentes/Formularios/Campos/CPF.vue'
import CampoDescricao from '@/components/Menu/Componentes/Formularios/Campos/Descricao.vue'
import CampoEmail from '@/components/Menu/Componentes/Formularios/Campos/Email.vue'
import CampoBlank from '@/components/Menu/Componentes/Formularios/Campos/Blank.vue'
import CampoTelefone from '@/components/Menu/Componentes/Formularios/Campos/Telefone.vue'
import Selecionavel from '@/components/Menu/Componentes/Formularios/Selecionavel.vue'
import ConfigInput from '@/components/Menu/Config/Componentes/Input.vue'
import ConfigGridMaker from '@/components/Menu/Config/Componentes/GridMaker.vue'
import ConfigDimensoes from '@/components/Menu/Config/Componentes/Dimensoes.vue'
import Linha from '@/components/Menu/Componentes/Genericos/Linha.vue'
import Coluna from '@/components/Menu/Componentes/Genericos/Coluna.vue'
import Formulario from '@/components/Menu/Componentes/Formularios/Formulario.vue'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.config.globalProperties._cmsProps = properties
let prefixoComp = "Comp"
let prefixoConfig = "Config"
let prefixoCampo = "Campo"
registerPlugins(app)
// nome do "Comp" precisa ser sucedido do nome definido no JSON, igual o valor da propriedade "nome"
app.component(prefixoComp+'Linha', Linha);
app.component(prefixoComp+'Coluna', Coluna);
app.component(prefixoComp+'Formulario', Formulario);
app.component(prefixoComp+'Titulo', Titulo);
app.component(prefixoComp+'Botao', Botao);
app.component(prefixoComp+'Card', Card);
app.component('Base'+'GridCell', GridCell);
app.component(prefixoComp+'Paragrafo', Paragrafo);
app.component(prefixoComp+'Campo', Campo);
app.component(prefixoComp+'Selecionavel', Selecionavel);
app.component(prefixoConfig+'Input', ConfigInput);
app.component(prefixoConfig+'GridMaker', ConfigGridMaker);
app.component(prefixoConfig+'Dimensoes', ConfigDimensoes);
app.component(prefixoCampo+'Nome', CampoNome);
app.component(prefixoCampo+'CPF', CampoCPF);
app.component(prefixoCampo+'Telefone', CampoTelefone);
app.component(prefixoCampo+'Email', CampoEmail);
app.component(prefixoCampo+'Descricao', CampoDescricao);
app.component(prefixoCampo+'Blank', CampoBlank);
app.mount('#app')
