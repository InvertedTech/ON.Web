<template>
  <div class="w-full">
    <p :class="disabled ? 'text-gray-400' : 'text-gray-300'">{{ label }}</p>
    <div ref="wrapper" class="relative" v-click-outside="clickOutsideObj">
      <div ref="inputWrapper" class="flex-wrap relative w-full shadow-sm flex items-center border border-stroke focus:border-grayscale-600 rounded-xl px-2 py-1 h-12" :class="wrapperClass" @click.stop.prevent="clickWrapper" @mouseup.stop.prevent @mousedown.prevent>
        <div v-for="item in selectedItems" :key="item[itemKey]" class="rounded-full px-2 py-1 mx-0.5 my-0.5 text-xs bg-accent-darker flex flex-nowrap break-all items-center relative text-accent">
          <div v-if="!disabled" class="w-full h-full rounded-full absolute top-0 left-0 opacity-0 hover:opacity-100 px-1 bg-accent-darker bg-opacity-75 flex items-center justify-end">
            <span class="material-icons text-accent hover:text-red-500 cursor-pointer" style="font-size: 1.1rem" @click.stop="removeItem(item[itemKey])">close</span>
          </div>
          <span class="font-bold">{{ item[itemText] }}</span>
        </div>
      </div>

      <div ref="menu" v-show="showMenu" class="absolute z-50 mt-1 w-full bg-grayscale-300 shadow-lg max-h-56 rounded-lg py-1 text-base overflow-y-auto overflow-x-hidden focus:outline-none sm:text-sm">
        <template v-for="item in itemsToShow">
          <div :key="item[itemKey]" class="flex items-center text-gray-50 relative px-4 py-2 cursor-pointer bg-grayscale-300 hover:bg-grayscale-400" @click="clickedOption($event, item[itemKey])" @mouseup.stop.prevent @mousedown.prevent>
            <p class="font-normal block truncate">{{ item[itemText] }}</p>
            <div v-if="selected.includes(item[itemKey])" class="absolute h-full flex items-center top-0 right-0 w-10">
              <span class="text-yellow-400 material-icons text-xl w-10">checkmark</span>
            </div>
          </div>
        </template>
        <div v-if="!itemsToShow.length" class="text-gray-50 select-none relative p-2" role="option">
          <div class="flex items-center justify-center">
            <span class="font-normal">{{ noItemsText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemKey: String,
    itemText: String,
    label: String,
    disabled: Boolean,
    readonly: Boolean,
    noItemsText: {
      type: String,
      default: 'No Items'
    }
  },
  data() {
    return {
      clickOutsideObj: {
        handler: this.clickedOutside,
        events: ['mousedown'],
        isActive: true
      },
      showMenu: false,
      menu: null
    }
  },
  watch: {
    showMenu(newVal) {
      if (newVal) this.setListener()
      else this.removeListener()
    }
  },
  computed: {
    selected: {
      get() {
        return this.value || []
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    selectedItems() {
      return this.selected
        .map((s) => {
          return this.itemsToShow.find((i) => i[this.itemKey] === s)
        })
        .filter((i) => !!i)
    },
    wrapperClass() {
      var classes = []
      if (this.disabled) classes.push('bg-black-300')
      else classes.push('bg-primary')
      if (!this.readonly) classes.push('cursor-pointer')
      return classes.join(' ')
    },
    itemsToShow() {
      return this.items
    }
  },
  methods: {
    clickedOutside() {
      this.showMenu = false
    },
    recalcMenuPos() {
      if (!this.menu) return
      var boundingBox = this.$refs.inputWrapper.getBoundingClientRect()
      if (boundingBox.y > window.innerHeight - 8) {
        // Input is off the page
        return this.forceBlur()
      }
      var menuHeight = this.menu.clientHeight
      var top = boundingBox.y + boundingBox.height - 4
      if (top + menuHeight > window.innerHeight - 20) {
        // Reverse menu to open upwards
        top = boundingBox.y - menuHeight - 4
      }

      this.menu.style.top = top + 'px'
      this.menu.style.left = boundingBox.x + 'px'
      this.menu.style.width = boundingBox.width + 'px'
    },
    unmountMountMenu() {
      if (!this.$refs.menu) return
      this.menu = this.$refs.menu

      var boundingBox = this.$refs.inputWrapper.getBoundingClientRect()
      this.menu.remove()
      document.body.appendChild(this.menu)
      this.menu.style.top = boundingBox.y + boundingBox.height - 4 + 'px'
      this.menu.style.left = boundingBox.x + 'px'
      this.menu.style.width = boundingBox.width + 'px'
    },
    clickedOption(e, itemKey) {
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }

      if (this.selected.includes(itemKey)) {
        this.selected = this.selected.filter((s) => s !== itemKey)
        this.$emit('removedItem', itemKey)
      } else {
        this.selected = this.selected.concat([itemKey])
      }

      this.$nextTick(() => {
        this.recalcMenuPos()
      })
    },
    clickWrapper() {
      if (this.disabled) return
      this.showMenu = true
    },
    removeItem(itemKey) {
      this.selected = this.selected.filter((i) => i !== itemKey)
      this.$emit('removedItem', itemKey)
      this.$nextTick(() => {
        this.recalcMenuPos()
      })
    },
    scroll() {
      this.recalcMenuPos()
    },
    setListener() {
      document.addEventListener('scroll', this.scroll, true)
    },
    removeListener() {
      document.removeEventListener('scroll', this.scroll, true)
    }
  },
  mounted() {},
  beforeDestroy() {
    if (this.menu) this.menu.remove()
  }
}
</script>
