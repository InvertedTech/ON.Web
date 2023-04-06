<template>
  <div class="w-full p-6">
    <ui-btn class="w-40 mb-4" @click="createNewPlan">New Plan</ui-btn>

    <div class="flex flex-wrap mb-4 -mx-2">
      <template v-for="(tier, index) in TiersSorted">
        <div :key="index" class="w-64 relative rounded-2xl px-6 py-12 text-white bg-primary m-2" :style="{ border: `4px solid ${tier.Color}` }">
          <div class="absolute inset-0 w-full h-full pointer-events-auto opacity-10" :style="{ backgroundColor: tier.Color }" />

          <p class="text-2xl text-center mb-6 font-bold">
            ${{ (tier.AmountCents / 100).toFixed(2) }}
            <!-- <span class="font-bold">${{ (tier.AmountCents / 100).toFixed(2) }}</span> /month -->
          </p>

          <p class="text-xl text-center mb-6">{{ tier.Name }}</p>

          <div class="rich-text prose prose-sm prose-invert text-white text-center" v-html="tier.Description" />
        </div>
      </template>
    </div>

    <modals-subscription-plan-modal v-model="showPlanModal" :plan="selectedPlan" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPlanModal: false,
      selectedPlan: null
    }
  },
  computed: {
    Tiers() {
      return this.$store.getters['settings/SubscriptionTiers']
    },
    TiersSorted() {
      const tiers = this.Tiers.map((t) => {
        const _t = {
          ...t
        }
        if (_t.Color.includes('linear-gradient')) {
          _t.Color = '#897458'
        }
        return _t
      })
      tiers.sort((a, b) => a.AmountCents - b.AmountCents)
      return tiers
    }
  },
  methods: {
    createNewPlan() {
      this.selectedPlan = null
      this.showPlanModal = true
    },
    editPlan(plan) {
      this.selectedPlan = plan
      this.showPlanModal = true
    }
  },
  mounted() {}
}
</script>