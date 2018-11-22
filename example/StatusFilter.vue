<template>
  <div class="row">
    <span class="label">Status</span>
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
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option } from 'element-ui'

Vue.use(Select)
Vue.use(Option)

export default {
  data () {
    const initialValue = this.input.status || ''
    return {
      options: [
        {
          value: 'issued',
          label: 'Ausgestellt'
        },
        {
          value: 'paid',
          label: 'Bezahlt'
        },
        {
          value: 'overdue',
          label: 'Fällig'
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

      this.addTag({ name: 'status', value: this.value, label })
    },
    getLabel (string) {
      const option = this.options.filter(option => option.value === string)
      if (option[0]) return option[0].label
    }
  },
  watch: {
    input (newInput) {
      const value = newInput && newInput.status && newInput.status.value
      if (!value) this.value = ''
    }
  },
  mounted () {
    this.value = (this.input.status && this.input.status.value) || ''
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
