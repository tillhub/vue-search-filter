import Vue from 'vue' //eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { Input, Button, Tag } from 'element-ui'
import { action } from '@storybook/addon-actions'
import Many from './App.vue'
import Events from './events.vue'
import VModelSupport from './v-model-support.vue'
import DisallowTextInput from './disallow-text-input.vue'

Vue.prototype.$action = action
Vue.use(Input)
Vue.use(Button)
Vue.use(Tag)

storiesOf('Vue Search Filter', module)
  // .add('story as a component', () => ({
  //   template: '<vue-search-filter :rounded="true">rounded</vue-search-filter>'
  // }))
  .add('Many', () => (Many))
  .add('Events', () => (Events))
  .add('VModelSupport', () => (VModelSupport))
  .add('Disallow Text Input', () => (DisallowTextInput))
