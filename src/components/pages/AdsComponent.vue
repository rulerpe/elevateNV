<template>
  <div style="text-align: center;" v-if="randomAd">
    <a v-if="size ==='long'" target="_blank" :href="randomAd.link"><img :src="randomAd.imageUrl" style="width:100%" :alt="randomAd.title"></a>
    <a v-if="size ==='square'" target="_blank" :href="randomAd.link"><img style="height:100%" :src="randomAd.imageUrl" :alt="randomAd.title"></a>
  </div>
</template>

<script>
export default {
  props: ['size', 'page'],
  computed: {
    randomAd () {
      let filteredAds = this.ads.filter(ad => {
        let result = ad.type === this.size
        // for pages that onyl display specific ads
        if (this.page) {
          if (ad.page) {
            result = ad.page === this.page
          } else {
            result = ad.page === this.page
          }
        }
        return result
      })
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
