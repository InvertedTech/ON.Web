<template>
  <div>
    <h1 class="text-3xl text-center font-bold mb-4">Top Members</h1>
    <div class="w-full rounded-3xl bg-primary border-4 border-white shadow-sm px-4 py-0">
      <div v-for="(member, index) in topMembers" :key="index" class="my-6 flex items-center">
        <div class="w-5 h-5 rounded-full overflow-hidden">
          <img :src="member.image" class="h-full w-full" />
        </div>
        <p class="text-gray-300 px-4 text-xs">{{ member.name }}</p>

        <div class="flex-grow"></div>

        <div class="w-10 h-4 bg-accent rounded-full text-black flex items-center justify-center text-xs font-semibold">{{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topMembers: [
        {
          image: 'https://picsum.photos/300/300',
          name: 'Tim Pool'
        },
        {
          image: 'https://picsum.photos/300/300?v=2',
          name: 'distroTube'
        },
        {
          image: 'https://picsum.photos/300/300?v=3',
          name: 'Darknet Diaries'
        },
        {
          image: 'https://picsum.photos/300/300',
          name: 'Tim Pool'
        },
        {
          image: 'https://picsum.photos/300/300',
          name: 'Tim Pool'
        }
      ]
    }
  },
  computed: {},
  methods: {},
  mounted() {}
}
</script>