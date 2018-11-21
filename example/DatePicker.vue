<template>
  <div class="row">
    <span class="label">Dates</span>
    <vue-date-picker
      @get-dates="handleChange"
      :clearable="true"
      :date-range="value"
      date-type="iso"
      :show-time="false"/>
  </div>
</template>

<script>
import VueDatePicker from '@tillhub/vue-date-picker'
import { parse } from 'date-fns'
import '@tillhub/vue-date-picker/dist/vue-date-picker.css'

export default {
  name: 'DatePicker',
  data () {
    return {
      value: {}
    }
  },
  components: {
    VueDatePicker
  },
  methods: {
    handleChange (dateObject) {
      const text = Object.keys(dateObject).length &&
        `${parse(dateObject.start).toLocaleDateString('en-US')} - ${parse(dateObject.end).toLocaleDateString('en-US')}`
      this.addTag(text, 'dates')
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
  watch: {
    input (newInput) {
      if (!newInput.dates) this.value = {}
    }
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

.row {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
