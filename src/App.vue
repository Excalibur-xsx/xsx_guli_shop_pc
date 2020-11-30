<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isFooterHide" />
  </div>
</template>

<script>
import Header from "@comps/Header";
import Footer from "@comps/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
</style>