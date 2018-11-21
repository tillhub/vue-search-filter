<template>
  <div class="row">
    <span class="label">Dates</span>
    <vue-date-picker
      @get-dates="handleChange"
      :clearable="true"
      :date-range="value"
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
      value: {}
    }
  },
  components: {
    VueDatePicker
  },
  methods: {
    handleChange (dateObject) {
      console.log(dateObject)
      const text = Object.keys(dateObject).length && `${dateObject.start.split('T')[0]} - ${dateObject.end.split('T')[0]}`
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
}

.row {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
</style>
