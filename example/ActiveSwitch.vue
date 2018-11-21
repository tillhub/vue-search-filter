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
    input: {
      type: Object,
      default: () => {}
    },
    addTag: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleChange (val) {
      this.addTag(val ? 'active' : 'inactive', 'active')
    }
  },
  watch: {
    input (newInput) {
      const value = newInput && newInput.active
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
  margin-top: 15px;
}

.label {
  margin-right: 10px;
  width: 60px;
  line-height: 40px;
  display: inline-block;
}
</style>
