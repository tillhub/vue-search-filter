import Vue from 'vue' //eslint-disable-line

import { storiesOf } from '@storybook/vue'
import Many from './App.vue'

storiesOf('Vue Search Filter', module)
  // .add('story as a component', () => ({
  //   template: '<vue-search-filter :rounded="true">rounded</vue-search-filter>'
  // }))
  .add('Many', () => (Many))
