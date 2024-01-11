<template>
  <modals-modal v-model="show" name="publish-post" :width="800" :height="'unset'" :processing="processing">
    <template #outer>
      <div class="absolute top-0 left-0 p-5 w-2/3 overflow-hidden">
        <p class="text-3xl text-white truncate">Publish Post</p>
      </div>
    </template>
    <form @submit.prevent="submitForm">
      <div class="p-8 w-full text-sm rounded-lg bg-bg shadow-lg">
        <div class="flex items-center mb-4 -mx-2">
          <div class="flex-grow px-2">
            <ui-text-input-with-label v-model="scheduledAt" label="Scheduled At" type="datetime-local" />
          </div>
        </div>

        <div class="flex pt-4 px-2">
          <div class="flex-grow" />
          <ui-btn type="submit">Submit</ui-btn>
        </div>
      </div>
    </form>
  </modals-modal>
</template>

<script>
export default {
  props: {
    value: Boolean,
    post: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      processing: false,
      scheduledAt: null
    }
  },
  watch: {
    show: {
      handler(newVal) {
        if (newVal) {
          this.init()
        }
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    submitForm() {
      const jsDate = new Date(this.scheduledAt)
      const payload = {
        PublishOnUTC: jsDate.toISOString()
      }
      this.$axios
        .$post(`/api/cms/admin/content/${this.post.ContentID}/publish`, payload)
        .then((data) => {
          console.log('Published post', data)
          this.$toast.success('Post scheduled')
          this.$set(this.post, 'PublishOnUTC', jsDate.toISOString())
          this.show = false
        })
        .catch((error) => {
          console.error('Failed to publish', error)
          this.$toast.error('Failed')
        })
    },
    init() {
      let date = null
      if (this.post.PublishOnUTC) {
        date = new Date(this.post.PublishOnUTC)
      } else {
        date = new Date()
      }
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
      this.scheduledAt = date.toISOString().slice(0, 16)
    }
  },
  mounted() {}
}
</script>
