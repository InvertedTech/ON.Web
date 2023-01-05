<template>
  <div class="w-full p-6">
    <div class="flex flex-wrap mb-4 -mx-2">
      <template v-for="(tier, index) in TiersSorted">
        <div :key="index" class="w-64 rounded-2xl p-6 text-white m-2" :style="{ background: tier.Color }">
          <img src="/icons/crown.svg" class="h-8 mx-auto mb-4" />

          <p class="text-2xl font-bold text-center mb-2">{{ tier.Name }}</p>

          <p class="text-base text-center mb-4">
            <span class="font-bold">${{ (tier.AmountCents / 100).toFixed(2) }}</span> /month
          </p>

          <div class="mb-6">
            <div class="rich-text prose prose-sm prose-invert text-white" v-html="tier.Description" />
          </div>

          <div class="flex justify-center">
            <nuxt-link :to="`/admin/subscriptions/plans/${tier.AmountCents}/edit`" class="bg-white rounded-md text-blue-500 text-xs px-6 py-2 font-bold flex items-center">Edit <span class="material-icons-outlined ml-2 text-base">edit</span></nuxt-link>
          </div>
        </div>
      </template>
    </div>

    <ui-btn to="/admin/subscriptions/plans/create">New Plan</ui-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    Tiers() {
      return this.$store.getters['settings/SubscriptionTiers']
    },
    TiersSorted() {
      const tiers = this.Tiers.map((t) => ({ ...t }))
      tiers.sort((a, b) => a.AmountCents - b.AmountCents)
      return tiers
    }
  },
  methods: {},
  mounted() {}
}
</script>