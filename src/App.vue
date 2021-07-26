<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from '@/components/layout';
import SiteAside from "@/components/SiteAside"
import ToTop from "@/components/ToTop"
export default {
  name: 'app',
  components: {
    Layout,
    SiteAside,
    ToTop
  },
}
</script>

<style lang="less" scoped>
@import "~@/styles/minix.less";
@import "~@/styles/var.less";
.app-container{
  .self-fill(fixed);
  .aside{
    width: 250px;
    height: 100%;
    background:@dark;
  }
}
</style>
