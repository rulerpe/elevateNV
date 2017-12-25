<template>
  <div :data-configid="code" :style="issuuStyle" class="issuuembed"></div>
</template>

<script>
export default {
  props: ['code'],
  data () {
    return {
      issuuStyle: {
        width: '100%',
        height: document.documentElement.clientHeight - 117 - 36 + 'px'
      }
    }
  },
  computed: {
    mobile () {
      return this.$store.getters.mobile
    }
  },
  mounted () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.issuuStyle.height = document.documentElement.clientHeight - 44 + 'px'
      console.log(this.issuuStyle)
    }
  },
  created () {
    let issuu = document.createElement('script')
    issuu.setAttribute('src', '//e.issuu.com/embed.js')
    document.head.appendChild(issuu)
  }
}
</script>

<style>
</style>
