<template>
  <div ref="searchFilterDropdown">
    <el-input
      ref="el-input"
      :placeholder="inputPlaceholder || this.translate('input.placeholder')"
      v-model="input"
      :clearable="clearable"
      @clear="handleClear"
      @keyup.enter.native="handleEnter({ name: textFieldName, value: input })"
      :class="{ 'no-left-border': tags.length, open: dropdownOpen, 'text-input-disabled': allowTextInput === false }"
      :style="inputFieldStyle"
    >
      <div
        slot="prepend"
        v-if="tags.length"
      >
        <el-tag
          :disable-transitions="true"
          :key="tag.name"
          v-for="tag in tags"
          closable
          @close="removeTag(tag.name)"
        >
          {{ tag.label || tag.value }}
        </el-tag>
      </div>
      <div
        slot="append"
        class="dropdown-action"
        @click="toggleDropdown"
      >
        <i
          :class="[{'el-icon-arrow-up': dropdownOpen, 'el-icon-arrow-down': !dropdownOpen}, 'caret']"
        />
      </div>
    </el-input>
    <div
      v-if="dropdownOpen"
      class="container"
      :style="containerStyle"
    >
      <slot
        name="dropdown-content"
        :input="tagsObject"
        :addTag="handleAdd"
      >
        DEFAULT
      </slot>
      <div class="button-wrapper">
        <div class="button-box">
          <span
            @click="reset"
            class="reset"
          >
            {{ resetButtonText || translate("buttons.reset") }}
          </span>
          <el-button
            type="primary"
            :disabled="searchDisabled"
            @click="handleSearchClick"
          >
            {{ searchButtonText || translate("buttons.search") }}
          </el-button>
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
    const val = this.value

    return {
      input: ``,
      dropdownOpen: false,
      tagsObject: val || {}
    }
  },
  computed: {
    tags () {
      return Object.keys(this.tagsObject).map(name => this.tagsObject[name])
    },
    inputFieldStyle () {
      const obj = {}

      if (this.width && this.width > 350) {
        return { ...obj, width: `${parseFloat(this.width) + 60}px` }
      }
      return obj
    },
    containerStyle () {
      if (this.width && this.width > 350) {
        return { width: `${this.width}px` }
      }
      return {}
    },
    searchDisabled () {
      return !Object.keys(this.tagsObject).length
    }
  },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    value: {
      type: Object,
      required: false,
      default: () => ({})
    },
    textFieldName: {
      type: String,
      required: false,
      default: 'search'
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
    },
    submitOnEnter: {
      type: Boolean,
      required: false,
      default: false
    },
    submitOnItem: {
      type: Boolean,
      required: false,
      default: false
    },
    submitOnItemRemove: {
      type: Boolean,
      required: false,
      default: false
    },
    submitOnReset: {
      type: Boolean,
      required: false,
      default: false
    },
    closeOnSubmit: {
      type: Boolean,
      required: false,
      default: true
    },
    openOnTag: {
      type: Boolean,
      required: false,
      default: false
    },
    allowTextInput: {
      type: Boolean,
      required: false,
      default: true
    },
    clickAwayListener: {
      type: Boolean,
      required: false,
      default: true
    },
    clearable: {
      type: Boolean,
      required: false,
      default: undefined
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

      if (name === this.textFieldName) {
        this.input = ''
      }
    },
    handleClear () {
      this.reset()
    },
    handleAdd ({ name, value, label }) {
      this.createOrReplaceTag({ name, value, label })
      if (this.submitOnItem) this.$emit('submit', this.handleSubmit())
    },
    handleEnter ({ name, value, label }) {
      this.createOrReplaceTag({ name, value, label })
      if (this.submitOnEnter) this.$emit('submit', this.handleSubmit())
    },
    removeTag (name) {
      this.$emit('before-remove-tag', this.tagsObject[name])

      const copy = JSON.parse(JSON.stringify({
        ...this.tagsObject,
        [name]: undefined
      }))

      this.tagsObject = copy
      if (this.submitOnItemRemove === true) this.$emit('submit', this.handleSubmit())
    },
    openDropdown () {
      this.$emit('open-dropdown')
      this.dropdownOpen = true
      this.$emit('opened-dropdown')
    },
    toggleDropdown () {
      this.dropdownOpen = !this.dropdownOpen
      if (this.dropdownOpen === false) this.$emit('close-dropdown')
      this.$emit('toggled-dropdown')
    },
    closeDropdown () {
      this.dropdownOpen = false
      this.$emit('close-dropdown')
    },
    reset () {
      this.tagsObject = {}
      this.$emit('reset')
      if (this.submitOnReset === true) {
        this.$emit('submit', this.handleSubmit())
      }
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
    handleSubmit () {
      if (this.closeOnSubmit) this.closeDropdown()

      const result = {}
      Object.keys(this.tagsObject).forEach(key => {
        result[key] = {
          value: this.tagsObject[key].value,
          label: this.tagsObject[key].label
        }
      })

      return result
    },
    handleSearchClick () {
      this.$emit('submit', this.handleSubmit())
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
        this.closeDropdown()
      }
    }
  },
  watch: {
    tagsObject (newValues) {
      this.$emit('input', newValues)
      this.setInputPrependWidth()
      if (this.openOnTag) this.openDropdown()
    },
    value (newValues) {
      this.tagsObject = newValues
    }
  },
  created () {
    if (!this.clickAwayListener === false) return
    document.addEventListener('click', this.closeOnOutsideClick)
    this.$emit('listeners-attached')
  },
  beforeDestroy () {
    if (!this.clickAwayListener === false) return
    document.removeEventListener('click', this.closeOnOutsideClick)
    this.$emit('listeners-detached')
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

.el-input >>> .el-input__inner {
  height: 51px;
}

.el-input >>> .el-input-group__prepend {
  background: transparent;
  overflow: auto;
}

.el-input >>> .el-input__inner:hover {
  border-color: rgb(220, 223, 230);
}

.el-input.open.el-input-group--prepend >>> .el-input-group__prepend {
  border-bottom-left-radius: 0px;
  overflow: auto;
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

.el-input.text-input-disabled >>> input {
  pointer-events: none;
}

.el-input >>> .el-input-group__append {
  background: white;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* mind the 1px border */
  width: 38px;
  height: 38px;
  line-height: 38px;
}

.dropdown-action {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
