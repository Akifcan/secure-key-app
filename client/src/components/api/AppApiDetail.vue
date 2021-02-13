<script>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import AppNotExist from "../AppNotExist";
export default {
  components: {
    AppNotExist,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    store.dispatch("AppModule/listApp", route.params.id);
    const app = computed(() => store.getters["AppModule/app"]);

    //fields
    const appName = ref(null);
    const appDescription = ref(null);
    const appApiKey = ref(null);
    const appLimit = ref(null);
    const appTime = ref(null);

    const blockIpAddress = ref("");
    const allowIpAddress = ref("");

    async function appDetailUpdate() {
      const result = await store.dispatch("AppModule/updateApp", {
        id: route.params.id,
        body: {
          name: appName.value.value,
          apiKey: appApiKey.value.value,
          appDescription: appDescription.value.value,
        },
      });
      store.commit("showAlert", {
        show: true,
        text: result[1],
        alertClass: result[0] ? "success" : "danger",
      });
    }

    async function appLimiterUpdate() {
      const result = await store.dispatch("AppModule/updateApp", {
        id: route.params.id,
        body: {
          time: appTime.value.value,
          limit: appLimit.value.value,
        },
      });
      console.log(result);
      store.commit("showAlert", {
        show: true,
        text: result[1],
        alertClass: result[0] ? "success" : "danger",
      });
    }

    async function updateIpList(type, ipAddress = null) {
      console.log(type);
      console.log(ipAddress);

      if (type == "blockList-add") {
        const result = await store.dispatch("AppModule/updateIpList", {
          path: "add-to-block-list",
          id: route.params.id,
          body: { ipAddress: blockIpAddress.value },
        });
        store.commit("showAlert", {
          show: true,
          text: result[1],
          alertClass: result[0] ? "success" : "danger",
        });
      } else if (type == "allowList-add") {
        const result = await store.dispatch("AppModule/updateIpList", {
          path: "add-to-allow-list",
          id: route.params.id,
          body: { ipAddress: allowIpAddress.value },
        });
        store.commit("showAlert", {
          show: true,
          text: result[1],
          alertClass: result[0] ? "success" : "danger",
        });
      } else if (type == "blockList-remove") {
        const result = await store.dispatch("AppModule/updateIpList", {
          path: "remove-to-block-list",
          id: route.params.id,
          body: { ipAddress },
        });
        const store = store.commit("showAlert", {
          show: true,
          text: result[1],
          alertClass: result[0] ? "success" : "danger",
        });
      } else if (type == "allowList-remove") {
        const result = await store.dispatch("AppModule/updateIpList", {
          path: "remove-to-allow-list",
          id: route.params.id,
          body: { ipAddress },
        });
        store.commit("showAlert", {
          show: true,
          text: result[1],
          alertClass: result[0] ? "success" : "danger",
        });
      }
    }

    return {
      blockIpAddress,
      allowIpAddress,
      updateIpList,
      appName,
      appDescription,
      appApiKey,
      appTime,
      appLimit,
      appDetailUpdate,
      appLimiterUpdate,
      app,
    };
  },
};
</script>



<template>
  <AppBase
    v-if="app != null"
    :menuItems="['Ana Sayfa', 'Uygulamalar', app.name]"
  >
    <div
      class="alert alert-primary"
      v-if="app.limit == 10 && app.time == 10000"
    >
      <i class="fa fa-info"></i> Uygulamınız istek sınırlarını ayarlamanızı
      tavsiye ederiz.
    </div>

    <AppAlert></AppAlert>

    <h1 class="mb-2">{{ app.name }}</h1>
    <div class="row">
      <div class="col-md-6">
        <div>
          <b>Uygulama Ayarları</b>
          <form @submit.prevent="appDetailUpdate">
            <div class="form-group">
              <label for="appName">Uygulama Adı*</label>
              <input
                ref="appName"
                :value="app.name"
                required
                maxlength="50"
                type="text"
                id="appName"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="apiKey">Api Key*</label>
              <input
                ref="appApiKey"
                :value="app.apiKey"
                required
                maxlength="200"
                type="text"
                id="apiKey"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label for="appDescription">Açıklama</label>
              <textarea
                ref="appDescription"
                :value="app.description"
                maxlength="500"
                rows="3"
                id="appDescription"
                class="form-control"
              ></textarea>
            </div>
            <button class="btn btn-success w-100">Güncelle</button>
          </form>
        </div>
        <div class="mt-5">
          <b>İstek Logları</b>
          <table class="table table-striped">
            <thead>
              <th>Ip Adresi</th>
              <th>Tarih</th>
              <th>Ülke</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-5">
          <h1>Graphic!</h1>
        </div>
      </div>
      <div class="col-md-6">
        <div>
          <b>Uygulama Limitleri</b>
          <form @submit.prevent="appLimiterUpdate">
            <div class="form-group">
              <label for="appLimit">İstek Limiti</label>
              <input
                ref="appLimit"
                :value="app.limit"
                type="number"
                id="appLimit"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="appDuration">Süre</label>
              <input
                ref="appTime"
                :value="app.time"
                type="number"
                id="appDuration"
                class="form-control"
              />
            </div>
            <button class="btn btn-success w-100">Güncelle</button>
          </form>
        </div>
        <div class="mt-5">
          <b>İzin Verilen Listesi</b>
          <form @submit.prevent="updateIpList('allowList-add')">
            <div class="row">
              <input
                required
                pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                v-model="allowIpAddress"
                type="text"
                class="form-control col-md-10"
                placeholder="Ip Adresi"
              />
              <button class="btn btn-warning btn-sm col-md-2">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </form>
          <table class="table table-striped">
            <thead>
              <th>İp Adresi</th>
              <th>İşlem</th>
            </thead>
            <tbody v-if="app.allowList">
              <tr v-for="allow in app.allowList" :key="allow">
                <td>{{ allow }}</td>
                <td>
                  <button
                    @click="updateIpList('allowList-remove', allow)"
                    class="btn btn-danger"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <AppNotExist v-if="!app.allowList.length"></AppNotExist>
          </table>
        </div>
        <div class="mt-5">
          <b>Yasaklı Listesi</b>
          <form @submit.prevent="updateIpList('blockList-add')">
            <div class="row">
              <input
                required
                pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                v-model="blockIpAddress"
                type="text"
                class="form-control col-md-10"
                placeholder="Ip Adresi"
              />
              <button class="btn btn-warning btn-sm col-md-2">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </form>
          <table class="table table-striped">
            <thead>
              <th>İp Adresi</th>
              <th>İşlem</th>
            </thead>
            <tbody v-if="app.blockList">
              <tr v-for="block in app.blockList" :key="block">
                <td>{{ block }}</td>
                <td>
                  <button
                    @click="updateIpList('blockList-remove', block)"
                    class="btn btn-danger"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <AppNotExist v-if="!app.blockList.length"></AppNotExist>
          </table>
        </div>
      </div>
    </div>
  </AppBase>
</template>


<style lang="scss" scoped>
</style>