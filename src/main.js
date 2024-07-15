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
import CampoSelecionavel from '@/components/Menu/Componentes/Formularios/CampoSelecionavel.vue'
import Linha from '@/components/Menu/Componentes/Genericos/Linha.vue'
import Coluna from '@/components/Menu/Componentes/Genericos/Coluna.vue'
import Formulario from '@/components/Menu/Componentes/Formularios/Formulario.vue'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
let prefixo = "Comp"
registerPlugins(app)
// nome do "Comp" precisa ser sucedido do nome definido no JSON, igual o valor da propriedade "nome"
app.component(prefixo+'Linha', Linha);
app.component(prefixo+'Coluna', Coluna);
app.component(prefixo+'Formulario', Formulario);
app.component(prefixo+'Titulo', Titulo);
app.component(prefixo+'Card', Card);
app.component(prefixo+'Paragrafo', Paragrafo);
app.component(prefixo+'CampoTexto', CampoTexto);
app.component(prefixo+'CampoSelecionavel', CampoSelecionavel);
app.mount('#app')
