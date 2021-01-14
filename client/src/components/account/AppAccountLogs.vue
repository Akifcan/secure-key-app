<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
export default {
  setup() {
    const store = useStore();
    const logs = ref();
    const filterCount = ref("");

    store.dispatch("LogModule/logs", 10);

    watch(filterCount, (newVal, oldVal) => {
      store.dispatch("LogModule/logs", newVal);
    });

    logs.value = computed(() => store.getters["LogModule/allLogs"]);

    function formattedDate(date) {
      const dateFormat = new Date(date);
      const dateNow = new Date();

      const showDate = `${dateFormat.getDay()} / ${
        dateFormat.getMonth() + 1
      } / ${dateFormat.getFullYear()}`;

      const dateNowFormatted = `${dateNow.getDay()} / ${
        dateNow.getMonth() + 1
      } / ${dateNow.getFullYear()}`;

      return showDate == dateNowFormatted ? "Bugün" : showDate;
    }

    async function deleteLogs() {
      const result = await store.dispatch("LogModule/removeAllLogs");
      store.commit("showAlert", {
        show: true,
        text: result[1],
        alertClass: result[0] ? "success" : "danger",
      });
    }

    function filterLogs(type) {
      if (type == "auth") {
        logs.value = computed(() => store.getters["LogModule/authLogs"]);
      } else if (type == "app") {
        logs.value = computed(() => store.getters["LogModule/appLogs"]);
      } else {
        logs.value = computed(() => store.getters["LogModule/allLogs"]);
      }
    }

    return {
      filterCount,
      filterLogs,
      formattedDate,
      logs,
      deleteLogs,
    };
  },
};
</script>

<template>
  <AppBase :menuItems="['Ana Sayfa', 'Hesap Aktiviteleri']">
    <AppModal title="Silme İşlemini Onayla">
      <div class="modal-body">
        <p>
          Bütün geçmiş kayıtlarınızı <b>silmek</b> istediğinizden emin misiniz?
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
          @click="deleteLogs"
        >
          Kayıtları Sil
        </button>
      </div>
    </AppModal>
    <h1>Hesap Aktiviteleri</h1>
    <button @click="filterLogs('auth')" class="btn btn-primary">
      Giriş Geçmişi
    </button>
    <button @click="filterLogs('app')" class="btn btn-success ml-2">
      Uygulama Geçmişi
    </button>
    <button @click="filterLogs('all')" class="btn btn-info ml-2">
      Hepsini Göster
    </button>
    <button
      data-toggle="modal"
      data-target="#exampleModal"
      class="btn btn-danger float-right"
    >
      Hepsini Sil
    </button>
    <select v-model="filterCount" class="form-control mb-3 mt-3">
      <option value="3" selected="selected">Son 10 Kayıt</option>
      <option value="6">Son 20 Kayıt</option>
      <option value="all">Hepsini Göster</option>
    </select>
    <AppAlert />
    <table class="table table-striped">
      <thead>
        <th>İşlem</th>
        <th>Tür</th>
        <th>Tarih</th>
      </thead>
      <tbody v-if="logs.value.length">
        <tr v-for="log in logs.value" :key="log.id">
          <td>{{ log.description }}</td>
          <td>
            <button
              :class="
                log.type == 'auth' ? 'btn btn-primary' : 'btn btn-success'
              "
            >
              {{ log.type }}
              <i
                :class="log.type == 'auth' ? 'fa fa-lock' : 'fa fa-server'"
              ></i>
            </button>
          </td>
          <td>{{ formattedDate(log.createdAt) }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">
            <p class="d-flex">
              <i class="fa fa-info-circle fa-2x mr-3"></i> Geçmiş Kayıtlarınız
              Burada Görünür
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </AppBase>
</template>

<style lang="scss" scoped>
</style>