<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const alertData = computed(() => store.getters["alertData"]);

    return {
      alertData,
    };
  },
};
</script>


<template>
  <div
    v-if="alertData.show"
    class="alert"
    :class="`alert-${alertData.alertClass}`"
  >
    {{ alertData.text }}
  </div>
</template>


<style lang="scss" scoped>
</style>