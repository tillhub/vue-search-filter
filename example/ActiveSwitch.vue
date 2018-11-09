<template>
  <div class="row">
    <span class="label">Active</span>
    <el-switch
      @change="(val) => parentData.handleSlotChange(val, 'active')"
      v-model="value"
      active-color="#269ff6"
      inactive-color="#d3d3d3"/>
    <div>value: {{ value }}</div>
    <div>parentData: {{ parentData.input.active }}</div>
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
  },
  watch: {
    parentData (newProps) {
      if (typeof newProps.input.active === 'boolean') {
        this.value = newProps.input.active
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
