<template>
  <th-query-search
    @submit="handleSubmit"
    @reset="handleReset"
    width="600">
    <template slot-scope="{input, addTag}">
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
  </th-query-search>
</template>

<script>
import ThQuerySearch from '../src/index.vue'
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'
import DatePicker from './DatePicker.vue'

export default {
  components: {
    ThQuerySearch,
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
