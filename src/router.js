import { createWebHistory, createRouter } from 'vue-router'

import App from './App.vue'
import FlowChart from './Flowchart.vue'

const routes = [
  { path: '/FlowChart', component: FlowChart },
  { path: '/', component: App },
];

export default createRouter({
  history: createWebHistory(),
  routes,
})