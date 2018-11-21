<template>
  <div>
    <el-input
      placeholder="Search term"
      v-model="input"
      @keyup.enter.native="(val) => createOrReplaceTag(val, 'search')"
      @blur="(val) => createOrReplaceTag(val, 'search')"
      :class="{ 'no-left-border': tags.length, open: isOpen }"
      :style="inputFieldStyle"
    >
      <div
        slot="prepend"
        v-if="tags.length">
        <el-tag
          :disable-transitions="true"
          :key="tag.name"
          v-for="tag in tags"
          closable
          @close="removeTag(tag.name)">
          {{ tag.value }}
        </el-tag>
      </div>
      <i
        slot="suffix"
        @click="toggleDropdown"
        :class="[{'el-icon-arrow-up': isOpen, 'el-icon-arrow-down': !isOpen}, 'caret']"
      />
    </el-input>
    <div
      v-if="isOpen"
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
            @click="$emit('submit', tagsObject)">Search</el-button>
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
      isOpen: true,
      tags: []
    }
  },
  computed: {
    tagsObject () {
      const result = {}
      this.tags.forEach(tag => {
        result[tag.name] = tag.value
      })
      return result
    },
    inputFieldStyle () {
      if (this.width && this.width > 100) {
        return { width: `${parseFloat(this.width) + 60}px` }
      }
    },
    containerStyle () {
      if (this.width && this.width > 100) {
        return { width: `${this.width}px` }
      }
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
    createOrReplaceTag (value, name) {
      let text = value

      if (name === 'search') {
        text = this.input
        this.input = ''
      }

      if (text) {
        const newTag = { value: text, name }
        const index = this.tags.findIndex(tag => tag.name === name)
        if (index !== -1) {
          this.tags.splice(index, 1, newTag)
        } else {
          this.tags.push(newTag)
        }
      } else {
        this.removeTag(name)
      }
    },
    removeTag (name) {
      const index = this.tags.findIndex(tag => tag.name === name)
      this.tags.splice(index, 1)
    },
    toggleDropdown () {
      this.isOpen = !this.isOpen
    },
    reset () {
      this.tags = []
      this.$emit('reset')
    }
  },
  watch: {
    tagsObject (newValues) {
      console.log(newValues)
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

input.el-input >>> .el-input__inner:focus {
  outline-width: 0;
}

.el-input.open.el-input-group--prepend >>> .el-input-group__prepend {
  border-bottom-left-radius: 0px;
}

.el-input.open >>> .el-input__inner {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.el-input.no-left-border >>> .el-input__inner {
  border-left: 0;
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
