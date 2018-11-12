<template>
  <div class="row">
    <span class="label">Active</span>
    <el-switch
      @change="handleChange"
      v-model="value"
      active-color="#269ff6"
      inactive-color="#d3d3d3"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Switch } from 'element-ui'

Vue.use(Switch)

export default {
  data () {
    return {
      value: true
    }
  },
  props: {
    parentData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleChange (val) {
      this.parentData.handleSlotChange(val ? 'active' : 'inactive', 'active')
    }
  },
  watch: {
    parentData (newProps) {
      const value = newProps.input.active
      if (value === 'active') {
        this.value = true
      } else if (value === 'inactive') {
        this.value = false
      } else {
        this.value = true
      }
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 20px;
}

.label {
  margin-right: 10px;
}
</style>
