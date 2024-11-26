import { createWebHistory, createRouter } from 'vue-router'

import FlowChart from './FlowChart.vue'

const routes = [
  { path: '/', component: FlowChart },
];

export default createRouter({
  history: createWebHistory(),
  routes,
})