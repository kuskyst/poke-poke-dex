<template>
  <div id="app">
    <Header id="headers" />
    <router-view id="main" />
    <Footer id="footers" />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default {
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
@import "~@/assets/scss/app.scss";
</style>
