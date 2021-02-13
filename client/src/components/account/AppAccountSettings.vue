<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    async function deleteApp() {
      const result = await store.dispatch("AppModule/deleteAllApps");
      if (result == true) {
        store.commit("showAlert", {
          show: true,
          text: "Uygulamalarınız Kaldırıldı",
          alertClass: "success",
        });
        store.dispatch("AppModule", "listApps");
      }
    }
    return {
      deleteApp,
    };
  },
};
</script>

<template>
  <AppBase :menuItems="['Ana Sayfa', 'Hesap Ayarları']">
    <AppModal title="Silme İşlemini Onayla">
      <div class="modal-body">
        <p>
          Bütün uygulamalarınızı <b>SİLMEK</b> üzeresiniz. Bu işlem geri
          alınamaz ve uygulamalarınzda hataya sebep olabilir.
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Kapat
        </button>
        <button
          data-dismiss="modal"
          aria-label="Close"
          type="button"
          class="btn btn-danger"
          @click="deleteApp"
        >
          Evet tüm Uygulamalarımı Sil
        </button>
      </div>
    </AppModal>
    <h1 class="mb-2">Hesap Ayarları</h1>
    <AppAlert></AppAlert>
    <button
      data-toggle="modal"
      data-target="#exampleModal"
      class="btn btn-danger"
    >
      Bütün Uygulamalarımı Sil <i class="fa fa-trash"></i>
    </button>
  </AppBase>
</template>



<style lang="scss" scoped>
</style>