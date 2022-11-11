<template>
  <div class="w-full">
    <div class="flex items-center mb-4 text-gray-200 hover:text-white">
      <ui-icon-btn icon="arrow_back" to="/admin/subscriptions/plans" />
      <nuxt-link to="/admin/subscriptions/plans" class="pl-1 uppercase font-bold">Back</nuxt-link>
    </div>
    <ui-text-input-with-label v-model="newPlan.Name" label="Name" class="mb-4" />

    <ui-rich-text-editor v-model="newPlan.Description" name="description" label="Description" class="mb-4" />

    <div class="flex flex-wrap mb-4 -mx-2">
      <div class="w-full md:w-1/2 p-2">
        <p class="mb-0.5 text-gray-300">Color</p>

        <div class="flex flex-wrap -m-2">
          <template v-for="color in colors">
            <button :key="color" :style="{ background: color }" class="w-12 h-12 rounded-2xl m-2 relative" @click.stop="selectColor(color)">
              <div v-show="newPlan.Color === color" class="absolute top-0 left-0 w-full h-full rounded-2xl border-4 border-white pointer-events-none" />
            </button>
          </template>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-2">
        <ui-text-input-with-label v-model="newPlan.Amount" label="Price" />
      </div>
    </div>

    <div class="flex justify-between py-4">
      <ui-btn :disabled="processing" classes="bg-red-500 hover:bg-red-400 text-red-100 hover:text-red-50 disabled:bg-red-300 disabled:text-red-200" @click.stop="deleteSub">Delete</ui-btn>
      <ui-btn :disabled="processing" @click.stop="submit">Save</ui-btn>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, params, redirect }) {
    const tiers = store.getters['settings/SubscriptionTiers']
    const tier = tiers.find((t) => t.Amount == params.id)
    if (!tier) {
      return redirect('/admin/subscriptions/plans')
    }
    return {
      currentPlan: tier
    }
  },
  data() {
    return {
      processing: false,
      newPlan: {
        Name: '',
        Description: '',
        Amount: 0,
        Color: ''
      },
      colors: ['linear-gradient(180deg, #F44771 0%, #FD29B5 100%)', 'linear-gradient(180deg, #47B6F4 0%, #297EFD 100%)', 'linear-gradient(180deg, #7FF156 0%, #4FA261 100%)', 'linear-gradient(180deg, rgba(255,153,0,1) 0%, rgba(255,208,67,1) 100%)', 'linear-gradient(180deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', 'linear-gradient(180deg, rgba(102,0,255,1) 0%, rgba(139,67,255,1) 100%)']
    }
  },
  computed: {
    Tiers() {
      return this.$store.getters['settings/SubscriptionTiers']
    }
  },
  methods: {
    deleteSub() {
      if (confirm(`Are you sure you want to delete this subscription plan?`)) {
        this.processing = true
        const existingPlans = this.Tiers.filter((t) => t.Amount != this.currentPlan.Amount)

        const payload = {
          Data: {
            Tiers: existingPlans
          }
        }
        this.$axios
          .$post(`/api/settings/subscription/public`, payload)
          .then(() => {
            this.$store.commit('settings/updateTiers', existingPlans)
            this.$toast.success('Subscription plan deleted')
            this.$router.push('/admin/subscriptions/plans')
          })
          .catch((error) => {
            console.error('Failed', error)
            this.$toast.error('Failed to remove plan')
          })
          .finally(() => {
            this.processing = false
          })
      }
    },
    selectColor(color) {
      this.newPlan.Color = color
    },
    submit() {
      this.processing = true

      const existingPlans = this.Tiers.filter((t) => t.Amount != this.currentPlan.Amount)
      const _newPlan = {
        ...this.newPlan
      }
      const newTiers = [...existingPlans, _newPlan]

      const payload = {
        Data: {
          Tiers: newTiers
        }
      }
      this.$axios
        .$post(`/api/settings/subscription/public`, payload)
        .then(() => {
          this.$store.commit('settings/updateTiers', newTiers)
          this.$toast.success('Subscription plan saved')
          this.$router.push('/admin/subscriptions/plans')
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to save plan')
        })
        .finally(() => {
          this.processing = false
        })
    },
    init() {
      this.newPlan = {
        Name: this.currentPlan.Name,
        Description: this.currentPlan.Description,
        Amount: this.currentPlan.Amount,
        Color: this.currentPlan.Color
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>