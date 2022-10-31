<template>
  <div class="w-full p-6">
    <div class="flex flex-wrap">
      <template v-for="(tier, index) in Tiers">
        <div :key="index" class="w-64 rounded-2xl p-6 text-white" :style="{ backgroundColor: tier.Color }">
          <p class="text-2xl font-bold text-center mb-2">{{ tier.Name }}</p>

          <p class="text-base text-center mb-4">
            <span class="font-bold">${{ tier.Amount }}</span> /month
          </p>

          <p class="text-sm text-center">{{ tier.Description }}</p>
        </div>
      </template>
    </div>
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
    }
  },
  methods: {},
  mounted() {}
}
</script>