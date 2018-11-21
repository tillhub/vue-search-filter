<template>
  <div class="row">
    <span class="label">Status</span>
    <el-select
      @change="(val) => addTag(val, 'status')"
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
    isValidOption (value) {
      return this.options.map(option => option.value).includes(value)
    }
  },
  watch: {
    input (newInput) {
      if (newInput && this.isValidOption(newInput.status)) {
        this.value = newInput.status
      } else {
        this.value = ''
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
