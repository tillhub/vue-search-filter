
<template>
  <div>
    <th-search-filter
      ref="searchFilter"
      @submit="handleSubmit"
      :submit-on-enter="true"
      :close-on-submit="true"
      :open-on-tag="false"
      @reset="handleReset"
      v-model="filter"
      :width="400"
      locale="de"
      input-placeholder="Nach Kundennamen suchen"
      :logger="logger"
    >
      <template
        slot="dropdown-content"
        slot-scope="{input, addTag}"
      >
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

    <pre v-html="JSON.stringify(filter, null, 2)" />
  </div>
</template>

<script>
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'
import DatePicker from './DatePicker.vue'

export default {
  components: {
    BranchFilter,
    StatusFilter,
    ActiveSwitch,
    DatePicker
  },
  mounted () {
    const oldEmit = this.$refs.searchFilter.$emit

    this.$refs.searchFilter.$emit = (...args) => {
      oldEmit.apply(this.$refs.searchFilter, args)
    }
  },
  data () {
    return {
      filter: { 'some_filter': { label: 'some filter', value: 1 } }
    }
  },
  methods: {
    handleSubmit (result) {
      console.log('submit', result)
    },
    handleReset () {
      console.log('reset')
    },
    logger (messsage, ...args) {
      console.log('logger:', messsage, args)
    }
  }
}

</script>

<style>
.p-t-20 {
  padding-top: 20px;
}
pre {
  white-space: pre-line;
}
</style>
