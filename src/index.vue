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
      queryString: '',
      isOpen: true
    }
  },
  computed: {
    queryObject () {
      const result = {}
      const chunks = this.queryString.split(' ')
      chunks.forEach(chunk => {
        const words = chunk.split(':')
        if (words.length === 2) {
          result[words[0]] = parseBoolean(words[1])
        } else {
          if (result.search && Array.isArray(result.search)) {
            result.search.push(chunk)
          } else {
            result.search = [chunk]
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
      console.log('handleSlotChange received value: ', value.toString())
      const stringValue = value && value.toString()
      // create or replace
      const regex = new RegExp(`\\b${name}\\S*`, 'gi')
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
