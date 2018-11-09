<template>
  <div class="row">
    <el-select
      @change="handleChange"
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
    <div>parentData: {{ parentData.input.branch }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'

Vue.use(Select)
Vue.use(Option)

export default {
  data () {
    const initialValue = this.parentData.input.branch || ''
    return {
      options: [
        {
          value: 'uuid1',
          label: 'Filiale1'
        },
        {
          value: 'uuid2',
          label: 'Filiale2'
        },
        {
          value: 'uuid3',
          label: 'Filiale3'
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
      return this.options.map(option => option.label).includes(value)
    },
    handleChange (val) {
      const label = this.getOptionLabel(val)
      this.parentData.handleSlotChange(label, 'branch')
    },
    getOptionLabel (string) {
      const option = this.options.filter(option => option.value === string)
      if (option[0]) return option[0].label
    },
    getOptionValue (string) {
      const option = this.options.filter(option => option.label === string)
      if (option[0]) return option[0].value
    }
  },
  watch: {
    parentData (newProps) {
      const value = this.getOptionValue(newProps.input.branch)
      if (value) {
        this.value = value
      } else {
        this.value = ''
      }
    }
  }
}
</script>

<style scoped>
</style>
