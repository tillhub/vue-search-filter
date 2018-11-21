<template>
  <div>
    <el-input
      placeholder="Search term"
      v-model="input"
      @keyup.enter.native="createOrReplaceTag({ name: 'search', value: input })"
      :class="{ 'no-left-border': tags.length, open: dropdownOpen }"
      :style="inputFieldStyle"
    >
      <div
        slot="prepend"
        :style="inputPrependStyle"
        v-if="tags.length">
        <el-tag
          :disable-transitions="true"
          :key="tag.value"
          v-for="tag in tags"
          closable
          @close="removeTag(tag.name)">
          {{ tag.label || tag.value }}
        </el-tag>
      </div>
      <i
        slot="suffix"
        @click="toggleDropdown"
        :class="[{'el-icon-arrow-up': dropdownOpen, 'el-icon-arrow-down': !dropdownOpen}, 'caret']"
      />
    </el-input>
    <div
      v-if="dropdownOpen"
      class="container"
      :style="containerStyle">
      <slot
        :input="tagsObject"
        :addTag="createOrReplaceTag">DEFAULT</slot>
      <div class="button-wrapper">
        <div class="button-box">
          <span
            @click="reset"
            class="reset">Reset</span>
          <el-button
            type="primary"
            :disabled="searchDisabled"
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
import { Input, Button, Tag } from 'element-ui'

Vue.use(Input)
Vue.use(Button)
Vue.use(Tag)

export default {
  name: 'VueQuerySearch',
  data () {
    return {
      input: ``,
      dropdownOpen: false,
      tagsObject: {}
    }
  },
  computed: {
    tags () {
      return Object.keys(this.tagsObject).map(name => this.tagsObject[name])
    },
    inputFieldStyle () {
      if (this.width && this.width > 350) {
        return { width: `${parseFloat(this.width) + 60}px` }
      }
    },
    containerStyle () {
      if (this.width && this.width > 350) {
        return { width: `${this.width}px` }
      }
    },
    inputPrependStyle () {
      if (this.width && this.width > 350) {
        return { 'max-width': `${this.width - 100}px` }
      }
    },
    searchDisabled () {
      return !Object.keys(this.tagsObject).length
    }
  },
  components: {
  },
  props: {
    locale: {
      type: String,
      default: navigator.language
    },
    width: {
      type: String,
      default: ''
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
    createOrReplaceTag ({ name, value, label }) {
      if (!label && !value) return this.removeTag(name)

      const tagObject = {
        [name]: { name, value, label }
      }

      this.tagsObject = {
        ...this.tagsObject,
        ...tagObject
      }

      if (name === 'search') {
        this.input = ''
      }
    },
    removeTag (name) {
      const copy = JSON.parse(JSON.stringify(this.tagsObject))
      delete copy[name]
      this.tagsObject = copy
    },
    toggleDropdown () {
      this.dropdownOpen = !this.dropdownOpen
    },
    reset () {
      this.tagsObject = {}
      this.$emit('reset')
    },
    setInputPrependWidth () { // ugly hack to set style dynamically in element-ui component based on custom width
      const div = document.querySelectorAll('.el-input-group__prepend')
      if (div[0]) div[0].style.maxWidth = `${this.width - 100}px`
    },
    handleSearchClick () {
      this.dropdownOpen = false
      this.$emit('submit', this.tagsObject)
    }
  },
  watch: {
    tagsObject (newValues) {
      console.log('tabgsObject', newValues)
      this.setInputPrependWidth()
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
  width: 460px;
}

.el-input >>> .el-input-group__prepend {
  background: transparent;
}

.el-input >>> .el-input__inner:hover {
  border-color: rgb(220, 223, 230);
}

.el-input.open.el-input-group--prepend >>> .el-input-group__prepend {
  border-bottom-left-radius: 0px;
  overflow: scroll;
}

.el-input.open >>> .el-input__inner {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.el-input.no-left-border >>> .el-input__inner {
  border-left: 0;
}

.el-input >>> .el-input__inner:focus {
  border-color: rgb(220, 223, 230);
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

.reset {
  cursor: pointer;
}

.reset:hover {
  color: rgb(47, 161, 243);
}

.container {
  border: 1px lightgrey solid;
  width: 400px;
  padding: 29px;
  transform: translate(0, -1px);
  border-top: 0;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.el-button {
  margin-left: 10px;
}

.el-tag {
  margin-right: 10px;
}

.el-tag:last-child {
  margin: 0;
}
</style>
