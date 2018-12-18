
<template>
  <div>
    <th-search-filter
      @submit="handleSubmit"
      @reset="handleReset"
      :width="400"
      locale="de"
      input-placeholder="Nach Kundennamen suchen"
    >
      <template
        slot="dropdown-content"
        slot-scope="{input, addTag}"
      >
        <branch-filter
          :input="input"
          :add-tag="addTag"/>
        <status-filter
          :input="input"
          :add-tag="addTag"/>
        <active-switch
          :input="input"
          :add-tag="addTag"/>
        <date-picker
          :input="input"
          :add-tag="addTag"/>
      </template>
    </th-search-filter>
    <th-search-filter
      class="p-t-20"
      @submit="handleSubmit"
      @reset="handleReset"
      locale="en"
      input-placeholder="Search in customer names"
    >
      <template
        slot="dropdown-content"
        slot-scope="{input, addTag}">
        <branch-filter
          :input="input"
          :add-tag="addTag"/>
        <status-filter
          :input="input"
          :add-tag="addTag"/>
        <active-switch
          :input="input"
          :add-tag="addTag"/>
        <date-picker
          :input="input"
          :add-tag="addTag"/>
      </template>
    </th-search-filter>
  </div>
</template>

<script>
import Vue from 'vue'
import ThSearchFilter from '../src/index.vue'
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'
import DatePicker from './DatePicker.vue'
import { Input, Button, Tag } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Input)
Vue.use(Button)
Vue.use(Tag)

export default {
  components: {
    ThSearchFilter,
    BranchFilter,
    StatusFilter,
    ActiveSwitch,
    DatePicker
  },
  methods: {
    handleSubmit (result) {
      console.log('submit', result)
    },
    handleReset () {
      console.log('reset')
    }
  }
}

</script>

<style>
.p-t-20 {
  padding-top: 20px;
}
</style>
