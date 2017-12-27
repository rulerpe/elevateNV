<template>
  <a v-if="randomAd" :href="randomAd.link"><img :src="randomAd.imageUrl" style="width:100%" :alt="randomAd.title"></a>
</template>

<script>
export default {
  props: ['size'],
  computed: {
    randomAd () {
      let filteredAds = this.ads.filter(ad => ad.type === this.size)
      return filteredAds[Math.floor(Math.random() * filteredAds.length)]
    },
    ads () {
      return this.$store.getters.ads
    }
  },
  mounted () {
    if (this.$store.getters.ads.length === 0) {
      this.$store.dispatch('loadAds')
    }
  }
}
</script>

<style>

</style>
