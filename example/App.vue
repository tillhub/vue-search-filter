<template>
  <th-search-filter
    @submit="handleSubmit"
    @reset="handleReset"
    width="400"
    locale="de"
    input-placeholder="Search in customer names"
  >
    <template
      slot="dropdown-content"
      slot-scope="{input, addTag}">
      <branch-filter
        :input="input"
        :add-tag="addTag"
      />
      <status-filter
        :input="input"
        :add-tag="addTag"
      />
      <active-switch
        :input="input"
        :add-tag="addTag"
      />
      <date-picker
        :input="input"
        :add-tag="addTag"
      />
    </template>
  </th-search-filter>
</template>

<script>
import ThSearchFilter from '../src/index.vue'
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'
import DatePicker from './DatePicker.vue'

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
</style>
