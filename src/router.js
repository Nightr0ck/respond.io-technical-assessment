import { createWebHistory, createRouter } from 'vue-router'

import Home from './Home.vue'
import FlowChart from './FlowChart.vue'

const routes = [
  { path: '/FlowChart', component: FlowChart },
  { path: '/', component: Home },
];

export default createRouter({
  history: createWebHistory(),
  routes,
})