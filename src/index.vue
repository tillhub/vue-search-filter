<template>
  <div ref="searchFilterDropdown">
    <el-input
      ref="el-input"
      :placeholder="inputPlaceholder || this.translate('input.placeholder')"
      v-model="input"
      @keyup.enter.native="createOrReplaceTag({ name: 'search', value: input })"
      :class="{ 'no-left-border': tags.length, open: dropdownOpen }"
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
          @close="removeTag(tag.name)"
        >{{ tag.label || tag.value }}</el-tag>
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
        name="dropdown-content"
        :input="tagsObject"
        :addTag="createOrReplaceTag">DEFAULT</slot>
      <div class="button-wrapper">
        <div class="button-box">
          <span
            @click="reset"
            class="reset"
          >{{ this.resetButtonText || this.translate("buttons.reset") }}</span>
          <el-button
            type="primary"
            :disabled="searchDisabled"
            @click="handleSearchClick"
          >{{ this.searchButtonText || this.translate("buttons.search") }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import safeGet from 'just-safe-get'
import messages from './i18n/'

export default {
  name: 'VueSearchFilter',
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
    searchDisabled () {
      return !Object.keys(this.tagsObject).length
    }
  },
  components: {
  },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    width: {
      type: Number,
      default: 0
    },
    inputPlaceholder: {
      type: String,
      default: ''
    },
    searchButtonText: {
      type: String,
      default: ''
    },
    resetButtonText: {
      type: String,
      default: ''
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
      this.$emit('close-dropdown')
    },
    reset () {
      this.tagsObject = {}
      this.$emit('reset')
    },
    setInputPrependWidth () { // set input prepend box style dynamically ibased on custom width
      // wrap it in $nextTick as classList of child is not available on mounted() yet
      this.$nextTick(() => {
        const nodesArray = Array.from(this.$refs['el-input'].$el.childNodes)
        nodesArray && nodesArray.forEach(node => {
          if (node.classList && node.classList.contains('el-input-group__prepend')) {
            node.style.maxWidth = `${this.width - 100}px`
          }
        })
      })
    },
    handleSearchClick () {
      this.dropdownOpen = false
      const result = {}
      Object.keys(this.tagsObject).forEach(key => {
        result[key] = {
          value: this.tagsObject[key].value,
          label: this.tagsObject[key].label
        }
      })
      this.$emit('submit', result)
    },
    translate (path) {
      let dictionary = messages[this.locale]
      if (!dictionary) dictionary = messages['en']

      const translated = safeGet(dictionary, path)
      return translated || path
    },
    closeOnOutsideClick (e) {
      let el = this.$refs.searchFilterDropdown
      let target = e.target
      if (this.dropdownOpen && el !== target && !el.contains(target)) {
        this.dropdownOpen = false
        this.$emit('close-dropdown')
      }
    }
  },
  watch: {
    tagsObject (newValues) {
      this.dropdownOpen = true
      this.setInputPrependWidth()
    }
  },
  created () {
    document.addEventListener('click', this.closeOnOutsideClick)
  },
  destroyed () {
    document.removeEventListener('click', this.closeOnOutsideClick)
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
  overflow: scroll;
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
  position: absolute;
  z-index: 10;
  background: white;
  margin-top: 1px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
