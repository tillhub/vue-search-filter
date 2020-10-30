# @tillhub/vue-search-filter [![CircleCI](https://circleci.com/gh/tillhub/vue-search-filter/tree/master.svg?style=svg)](https://circleci.com/gh/tillhub/vue-search-filter/tree/master)
> Vue search input with dropdown for more filters


## Install

```bash
npm install --save @tillhub/vue-search-filter
```

## Usage

Please see src/stories folder for complete code example. Note, that the css has to be imported separately. This library assumes that element-ui is being used by the caller.

To see the examples in action:

```bash
npm run storybook
```

```html
<template>
  <th-search-filter
    @submit="handleSubmit"
    @reset="handleReset"
    :width="500"
    locale="de"
    resetButtonText="Reset now"
    input-placeholder="Search in customer names"
  >
    <template slot="dropdown-content" slot-scope="{input, addTag}">
      <branch-filter :input="input" :add-tag="addTag"/>
      <status-filter :input="input" :add-tag="addTag"/>
      <active-switch :input="input" :add-tag="addTag"/>
      <date-picker :input="input" :add-tag="addTag"/>
    </template>
  </th-search-filter>
</template>

<script>
import ThSearchFilter from '../src/index.vue'
import BranchFilter from './BranchFilter.vue'
import StatusFilter from './StatusFilter.vue'
import ActiveSwitch from './ActiveSwitch.vue'
import DatePicker from './DatePicker.vue'

export default {
  components: {
    ThSearchFilter,
    BranchFilter,
    StatusFilter,
    ActiveSwitch,
    DatePicker
  },
  methods: {
    handleSubmit (result) {
      console.log('submit', result)
    },
    handleReset () {
      console.log('reset')
    }
  }
}

</script>
```

### Attributes

| Attribute        | Type   | Required | Example              | Default  | Description                                                         |
|------------------|--------|----------|----------------------|----------|---------------------------------------------------------------------|
| width            | number | no       | 500                  | 460      | sets fixed width of component in pixels, minimum is 350             |
| locale           | string | no       | "de"                 | "en"     | Currently only German and English is supported. Only 'de' and 'en ' |
| inputPlaceholder | string | no       | "Search in products" | "Search" | Sets the placeholder text in the input field                        |
| searchButtonText | string | no       | "Submit"             | "Search" | Sets a custom text in the blue submitting button                    |
| resetButtonText  | string | no       | "Reset"              | "Cancel" | Sets a custom text in the reset button                              |


### Events

| Event           | Description                                         | Params  |
|-----------------|-----------------------------------------------------|---------|
| submit          | triggers when the user clicks on "search" button    | filters |
| reset           | triggers when the user clicks on the "reset" button | --      |
| close-dropwdown | triggers when the user closes the dropwdown         | --      |


### Slot

One named slot it provided: "dropwdown-content". It is highly advised to refer to the example folder to see how this slot is used. Understanding the parent-child communication is crucial as the dropdown content and input content are closely linked.

| Name   | Type     | Example                                                                                                        | Description                                                                                                                                                                                                                                                                                                  |
|--------|----------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| input  | object   | { key1: { label: "product name", value: "product uuid"}, key2: { label: "branch name", value: "branch uuid"} } | this is an object that depicts the current state of the tags in the input field,<br> on every change they are passed to the slot so the consumer can update the slot children accordingly.<br> The key name is determined by the user, when it is being passed in the "addTag" method (see below).           |
| addTag | function | ({ name, value, label }) => {}                                                                                 | This method communicates the changes in the slot children to the parent.<br>It adds tags to the parent input field.E.g. it can be called on every change in the child.<br>The method expects to be called with an object with at least the "name" prop.<br>If "label" is falsey, it will default to "value". |


## License

MIT © [qtotuan](https://github.com/qtotuan)
