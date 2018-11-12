<template>
  <div>
    <el-input
      placeholder="Please input"
      v-model="queryString"
    >
      <i
        slot="suffix"
        @click="toggleDropdown"
        :class="[{'el-icon-arrow-up': isOpen, 'el-icon-arrow-down': !isOpen}, 'caret']"
      />
    </el-input>
    <div
      v-if="isOpen"
      class="container">
      <slot
        :input="queryObject"
        :handleSlotChange="clickHandler">DEFAULT</slot>
      <div class="button-wrapper">
        <div class="button-box">
          <span>Reset</span>
          <el-button
            type="primary"
            @click="handleSearchClick">Search</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElementLocale from 'element-ui/lib/locale'
import Vue from 'vue'
import 'typeface-lato'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import deLocale from 'element-ui/lib/locale/lang/de'
import { Input, Button } from 'element-ui'
import { parseBoolean } from './utils/strings'

Vue.use(Input)
Vue.use(Button)

export default {
  name: 'VueQuerySearch',
  data () {
    return {
      // queryString: `branch1:branch1 branch2:"branch2" branch3:"branch 3" branch4:'branch 4' "branch5":branch5 "branch6":"branch6"`,
      queryString: ``,
      isOpen: true
    }
  },
  computed: {
    queryObject () {
      const result = {}
      const regex = /([\da-z]*:?"[^"]*")|([\da-z]*:?'[^']*')|([\da-z]*:?[^\s"']+)/gi
      const chunks = this.queryString.match(regex)

      chunks && chunks.forEach(chunk => {
        const chunk2 = chunk.replace(/["']*/g, '')
        const words = chunk2.split(':')
        if (words.length === 2 && words[0]) {
          result[words[0]] = parseBoolean(words[1])
        } else {
          if (result.search && Array.isArray(result.search)) {
            result.search.push(chunk2)
          } else {
            result.search = [chunk2]
          }
        }
      })
      console.log('queryObject', result)
      return result
    }
  },
  components: {
  },
  props: {
    locale: {
      type: String,
      default: navigator.language
    },
    handleSubmit: {
      type: Function,
      default: () => {}
    }
  },
  beforeMount () {
    if (this.locale === 'de') {
      ElementLocale.use(deLocale)
    } else {
      ElementLocale.use(enLocale)
    }
  },
  methods: {
    clickHandler (value, name) {
      let stringValue = value && value.toString()

      // console.log('handleSlotChange received value: ', stringValue)

      // if contains whitespace wrap in quotation marks
      const whiteSpace = new RegExp(/\s/)
      if (stringValue && whiteSpace.test(stringValue)) {
        stringValue = `"${stringValue}"`
      }

      // check if this new query already exists in the query string
      const regex = new RegExp(`(\\b${name}\\b:"[^"]*")|(\\b${name}\\b:'[^']*')|(\\b${name}\\b:[^\\s"']+)`, 'gi')
      if (regex.test(this.queryString)) {
        // replace
        this.queryString = this.queryString.replace(regex, stringValue ? `${name}:${stringValue}` : '')
      } else {
        // create
        if (this.queryString) {
          this.queryString += ` ${name}:${stringValue}`
        } else {
          this.queryString = `${name}:${stringValue}`
        }
      }
    },
    toggleDropdown () {
      this.isOpen = !this.isOpen
    },
    handleSearchClick () {
      this.handleSubmit({ queryObject: this.queryObject, queryString: this.queryString })
    }
  }
}
</script>

<style scoped>
li,
div,
span {
  font-family: "Lato";
}

.el-input {
  width: 660px;
}

.container {
  border: 1px lightgrey solid;
  width: 600px;
  padding: 30px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.el-button {
  margin-left: 10px;
}

.el-input >>> .el-input__suffix {
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}

.caret {
  cursor: pointer;
}
</style>
