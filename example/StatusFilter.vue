<template>
  <div class="row">
    <el-select
      @change="(val) => parentData.handleSlotChange(val, 'status')"
      v-model="value"
      placeholder="Select"
      clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <div>value: {{ value }}</div>
    <div>parentData: {{ parentData.input.status }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'

Vue.use(Select)
Vue.use(Option)

export default {
  data () {
    const initialValue = this.parentData.input.status || ''
    return {
      options: [
        {
          value: 'issued',
          label: 'issued'
        },
        {
          value: 'paid',
          label: 'paid'
        },
        {
          value: 'overdue',
          label: 'overdue'
        }
      ],
      value: initialValue
    }
  },
  props: {
    parentData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    isValidOption (value) {
      return this.options.map(option => option.value).includes(value)
    }
  },
  watch: {
    parentData (newProps) {
      if (this.isValidOption(newProps.input.status)) {
        this.value = newProps.input.status
      } else {
        this.value = ''
      }
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
