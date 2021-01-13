<script>
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

export default {
  props: {
    menuItems: {
      type: Array,
    },
  },
  components: {
    AppBreadcrumb,
  },
};
</script>


<template>
  <div id="layoutSidenav_content">
    <main class="container-fluid">
      <AppBreadcrumb :items="menuItems" />
      <slot></slot>
    </main>
  </div>
</template>


<style lang="scss" scoped>
</style>