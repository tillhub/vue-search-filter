import { configure } from '@storybook/vue';

import Vue from 'vue'
import ElemenUi from 'element-ui'
import { action, configureActions } from '@storybook/addon-actions';
import 'element-ui/lib/theme-chalk/index.css'

// Import your custom components.
import ThSearchFilter from '../src/index.vue';

Vue.prototype.$action = action

Vue.use(ElemenUi)
// Register custom components.
Vue.component('th-search-filter', ThSearchFilter);

function loadStories() {
  // You can require as many stories as you need.
  require('../src/stories');
}

configure(loadStories, module);
