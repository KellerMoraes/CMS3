/* eslint-disable vue/multi-word-component-names */
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import './assets/styles/cms.scss'
import Titulo from '@/components/Componentes/Titulos/Titulo.vue'
import Paragrafo from '@/components/Componentes/Paragrafos/Paragrafo.vue'
import Card from '@/components/Componentes/Cards/Card.vue'
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
let prefixo = "Comp"
registerPlugins(app)
// nome do "Comp" precisa ser sucedido do nome definido no JSON, igual o valor da propriedade "nome"
app.component(prefixo+'Titulo', Titulo);
app.component(prefixo+'Card', Card);
app.component(prefixo+'Paragrafo', Paragrafo);
app.mount('#app')
