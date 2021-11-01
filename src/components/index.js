import Vue from 'vue'

import d2Container from './d2-container'
import D2pTreeSelector from './tree-selector'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
Vue.component('pc-base', () => import('./pc-base/index.vue'))
Vue.component('pc-tree-table', () => import('./pc-tree-table/index.vue'))
Vue.component('user-selector', () => import('./user-selector/index.vue'))
Vue.use(D2pTreeSelector)
