<template>
  <th-query-search
    :handle-submit="handleSubmit">
    <div
      slot-scope="data"
    >
      <branch-filter
        :parent-data="data"
      />
      <status-filter
        :parent-data="data"
      />
      <active-switch
        :parent-data="data"
      />
    </div>
  </th-query-search>
</template>

<script>
import ThQuerySearch from '../src/index.vue'
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'

export default {
  components: {
    ThQuerySearch,
    BranchFilter,
    StatusFilter,
    ActiveSwitch
  },
  methods: {
    handleSubmit (result) {
      console.log('submit', result)
    }
  }
}

</script>

<style>
</style>
