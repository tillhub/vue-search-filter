<template>
  <div class="row">
    <span class="label">Dates</span>
    <vue-date-picker
      @get-dates="handleChange"
      :clearable="true"
      :date-range="input"
      date-type="iso" />
  </div>
</template>

<script>
import VueDatePicker from '@tillhub/vue-date-picker'
import '@tillhub/vue-date-picker/dist/vue-date-picker.css'

export default {
  name: 'DatePicker',
  data () {
    return {
      input: {}
    }
  },
  components: {
    VueDatePicker
  },
  methods: {
    handleChange (dateObject) {
      const text = `${dateObject.start.split('T')[0]} - ${dateObject.end.split('T')[0]}`
      this.parentData.handleSlotChange(text, 'dates')
    }
  },
  props: {
    parentData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    parentData (newProps) {
      if (!newProps.input.dates) this.input = {}
    }
  }
}
</script>

<style scoped>
.label {
  margin-right: 10px;
}

.row {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
</style>
