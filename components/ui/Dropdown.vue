<template>
  <div class="relative w-full" v-click-outside="clickOutsideObj">
    <p :class="disabled ? 'text-gray-400' : 'text-gray-300'">{{ label }}</p>
    <button type="button" :disabled="disabled" class="relative w-full text-text border shadow-sm pl-3 pr-8 h-12 rounded-xl text-left focus:outline-none" :class="buttonClass" aria-haspopup="listbox" aria-expanded="true" @click.stop.prevent="clickShowMenu">
      <span class="flex items-center">
        <span class="block truncate" :class="small ? 'text-sm' : ''">{{ selectedText }}</span>
      </span>
      <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <span class="material-icons text-2xl">expand_more</span>
      </span>
    </button>

    <transition name="menu">
      <ul v-show="showMenu" class="absolute z-10 mt-0.5 w-full bg-grayscale-300 max-h-56 rounded-lg py-1 overflow-auto shadow-lg focus:outline-none" tabindex="-1" role="listbox">
        <template v-for="item in items">
          <li :key="item.value" class="text-text hover:bg-grayscale-400 select-none relative py-2 cursor-pointer hover:bg-black-400" id="listbox-option-0" role="option" @click="clickedOption(item.value)">
            <div class="flex items-center">
              <span class="font-normal ml-3 block truncate">{{ item.text }}</span>
            </div>
          </li>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    small: Boolean
  },
  data() {
    return {
      clickOutsideObj: {
        handler: this.clickedOutside,
        events: ['mousedown'],
        isActive: true
      },
      showMenu: false
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    selectedItem() {
      return this.items.find((i) => i.value === this.selected)
    },
    selectedText() {
      return this.selectedItem ? this.selectedItem.text : ''
    },
    buttonClass() {
      var classes = []
      if (this.disabled) classes.push('cursor-not-allowed border-gray bg-accent bg-opacity-70 border-opacity-70 text-gray-400')
      else classes.push('cursor-pointer border-gray border-stroke bg-primary')

      return classes.join(' ')
    }
  },
  methods: {
    clickShowMenu() {
      if (this.disabled) return
      this.showMenu = !this.showMenu
    },
    clickedOutside() {
      this.showMenu = false
    },
    clickedOption(itemValue) {
      this.selected = itemValue
      this.showMenu = false
    }
  },
  mounted() {}
}
</script>