<template>
  <modals-modal v-model="show" name="subscription-plan" :width="800" :height="'unset'" :processing="processing">
    <template #outer>
      <div class="absolute top-0 left-0 p-5 w-2/3 overflow-hidden">
        <p class="text-3xl text-white truncate">{{ title }}</p>
      </div>
    </template>
    <form @submit.prevent="submitForm">
      <div class="p-8 w-full text-sm rounded-lg bg-bg shadow-lg">
        <div class="flex items-center mb-4 -mx-2">
          <div class="flex-grow px-2">
            <ui-text-input-with-label v-model="newPlan.Name" label="Name" />
          </div>
          <div class="w-1/5 px-2">
            <ui-text-input-with-label v-model="newPlan.Amount" step="any" type="number" label="Price" />
          </div>
          <div class="w-12 px-2">
            <ui-color-picker-input ref="colorInputRef" v-model="newPlan.Color" label="Color" class="mt-5" />
          </div>
        </div>

        <ui-rich-text-editor v-model="newPlan.Description" name="description" label="Description" class="mb-4" />

        <div class="flex pt-4 px-2">
          <ui-btn v-if="plan" classes="bg-error hover:bg-error-darken text-error-darken hover:text-grayscale-300 disabled:bg-error-darker/20 disabled:text-error-darken/30" type="button" @click.stop="deleteClick">Delete</ui-btn>
          <div class="flex-grow" />
          <ui-btn type="submit">Save</ui-btn>
        </div>
      </div>
    </form>
  </modals-modal>
</template>

<script>
export default {
  props: {
    value: Boolean,
    plan: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      processing: false,
      newPlan: {}
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
    },
    title() {
      return this.plan ? 'Edit Plan' : 'New Plan'
    },
    Tiers() {
      return this.$store.getters['settings/SubscriptionTiers']
    }
  },
  methods: {
    deleteClick() {
      const payload = {
        message: `Delete subscription plan ${this.plan.Name}?`,
        yesButtonText: 'Delete',
        yesButtonColor: 'error',
        confirmDeleteText: this.plan.Name,
        callback: (confirmed) => {
          if (confirmed) {
            this.delete()
          }
        },
        type: 'yesNo'
      }
      this.$store.commit('globals/setConfirmPrompt', payload)
    },
    delete() {
      const payload = {
        Data: {
          Tiers: this.Tiers.filter((t) => t.AmountCents != this.plan.AmountCents)
        }
      }
      this.$axios
        .$post(`/api/settings/subscription/public`, payload)
        .then(() => {
          this.$store.commit('settings/updateTiers', payload.Data.Tiers)
          this.$toast.success('Subscription plan deleted')
          this.show = false
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to delete plan')
        })
        .finally(() => {
          this.processing = false
        })
    },
    validateForm() {
      if (this.newPlan.Amount) {
        this.newPlan.AmountCents = Math.round(Number(this.newPlan.Amount) * 100)
      } else {
        this.newPlan.AmountCents = 0
      }

      if (isNaN(this.newPlan.AmountCents)) {
        this.$toast.error('Invalid Amount')
        return false
      }

      return true
    },
    submitForm() {
      if (!this.validateForm()) return

      this.processing = true
      const _newPlan = {
        ...this.newPlan
      }
      delete _newPlan.Amount

      const existingPlans = this.plan ? this.Tiers.filter((t) => t.AmountCents != this.plan.AmountCents) : this.Tiers
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
          this.$toast.success('Subscription plan created')
          this.show = false
        })
        .catch((error) => {
          console.error('Failed', error)
          this.$toast.error('Failed to create plan')
        })
        .finally(() => {
          this.processing = false
        })
    },
    init() {
      this.newPlan = {
        Name: this.plan?.Name ?? '',
        Description: this.plan?.Description ?? '',
        Amount: this.plan?.AmountCents ?? 0,
        Color: this.plan?.Color ?? '#777777'
      }

      if (this.$refs.colorInputRef && !this.newPlan.Color.startsWith('#')) {
        this.newPlan.Color = this.$refs.colorInputRef.getHexFromColorName(this.newPlan.Color) || '#777777'
      }

      if (this.newPlan.Amount) {
        this.newPlan.Amount = Number((this.newPlan.Amount / 100).toFixed(2)) // Convert cents to dollars
      } else {
        this.newPlan.Amount = 0
      }
    }
  },
  mounted() {}
}
</script>
