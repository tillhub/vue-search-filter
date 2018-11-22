<template>
  <div class="row">
    <div class="label">Branch</div>
    <el-select
      @change="handleChange"
      v-model="value"
      placeholder="Select"
      clearable
      filterable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'

Vue.use(Select)
Vue.use(Option)

export default {
  data () {
    const initialValue = this.input.branch || ''
    return {
      options: [
        {
          value: 'uuid1',
          label: 'Filiale 1'
        },
        {
          value: 'uuid2',
          label: 'Filiale 2'
        },
        {
          value: 'uuid3',
          label: 'Filiale 3'
        }
      ],
      value: initialValue
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
      const label = this.getLabel(val)

      this.addTag({ name: 'branch', value: this.value, label })
    },
    getLabel (string) {
      const option = this.options.filter(option => option.value === string)
      if (option[0]) return option[0].label
    }
  },
  watch: {
    input (newInput) {
      const value = newInput && newInput.branch && newInput.branch.value
      if (!value) this.value = ''
    }
  },
  mounted () {
    this.value = (this.input.branch && this.input.branch.value) || ''
  }
}
</script>

<style scoped>
.label {
  margin-right: 10px;
  width: 60px;
  line-height: 40px;
  display: inline-block;
}
</style>
