<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    store.dispatch("AppModule/listApps");
    const apps = computed(() => store.getters["AppModule/apps"]);

    return {
      apps,
    };
  },
};
</script>

<template>
  <AppBase :menuItems="['Ana Sayfa', 'Uygulamalarım']">
    <h1 class="mb-2">Uygulamalar</h1>

    <router-link :to="{ name: 'apiCreate' }">
      <button class="btn btn-success mb-2">
        <i class="fa fa-plus"></i>Yeni Oluştur
      </button>
    </router-link>
    <table class="table table-striped">
      <thead>
        <th>Uygulama Adı</th>
        <th>Api Key</th>
        <th>App Slug</th>
        <th>İşlem</th>
      </thead>
      <tbody v-if="apps">
        <tr v-for="app in apps" :key="app._id">
          <td>{{ app.name }}</td>
          <td>{{ app.apiKey }}</td>
          <td>{{ app.slug }}</td>
          <td>
            <router-link :to="{ name: 'apiDetail', params: { id: app._id } }">
              <button class="btn btn-primary btn-sm">Uygulamaya Git</button>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">Henüz bir uygulama oluşturmadınız</td>
        </tr>
      </tbody>
    </table>
  </AppBase>
</template>



<style lang="scss" scoped>
</style>