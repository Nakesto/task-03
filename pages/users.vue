<template>
  <div class="container">
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div
          class="d-flex align-items-left align-items-md-center flex-column flex-md-row"
        >
          <div>
            <h2 class="text-white pb-2 fw-bold">
              Users Global Loyalty Indonesia
            </h2>
            <h5 class="text-white op-7 mb-2">Dashboard for customize users</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="page-inner">
      <div class="row">
        <div class="col-md-12 overflow-auto">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <h2 class="pb-2 fw-bold">List Users</h2>
              </div>
            </div>
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-0 col-md-4 col-lg-6 col-xl-8"></div>
                <div class="input-group col-12 col-md-8 col-lg-6 col-xl-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white">
                      <i class="fa fa-search search-icon"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-label="Text input with dropdown button"
                    v-model="search"
                    placeholder="Search Users"
                    v-auto-focus
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {{ dpFilter === "" ? "Filter" : dpFilter }}
                    </button>
                    <div
                      class="dropdown-menu"
                      x-placement="bottom-start"
                      style="
                        position: absolute;
                        transform: translate3d(221px, 43px, 0px);
                        top: 0px;
                        left: 0px;
                        will-change: transform;
                      "
                    >
                      <button
                        class="dropdown-item"
                        @click="onActive('default', 'Default')"
                      >
                        Default
                      </button>
                      <fragment v-for="(field, index) in fields" :key="index">
                        <button
                          v-if="field.label !== 'Actions'"
                          class="dropdown-item"
                          @click="onActive(field.api, field.label)"
                        >
                          {{ field.label }}
                        </button>
                      </fragment>
                    </div>
                  </div>
                </div>
              </div>
              <b-skeleton-table
                v-if="isLoading && items?.length === 0"
                :rows="4"
                :columns="5"
                :table-props="{ striped: true, responsive: 'sm' }"
              ></b-skeleton-table>
              <fragment v-else>
                <fragment v-if="items.length > 0">
                  <b-table
                    striped
                    responsive="sm"
                    hover
                    :items="items"
                    :fields="fields"
                    :per-page="perPage"
                    :current-page="currentPage"
                    small
                  >
                    <template #cell(actions)="row">
                      <IconButton
                        icon="pencil-square"
                        type="button"
                        class-button="btn btn-icon btn-warning"
                        title="Edit User"
                        :data="row.index"
                        tooltip
                        @buttonClick="editUser(row.item.id)"
                      />
                      <IconButton
                        title="Delete User"
                        icon="x-circle-fill"
                        type="button"
                        class-button="btn btn-icon btn-danger"
                        :data="row.index"
                        tooltip
                        @buttonClick="delUser(row.item.id)"
                      />
                    </template>
                  </b-table>
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                  ></b-pagination>
                </fragment>
                <fragment v-else>
                  <div
                    class="d-flex flex-column align-items-center justify-content-center"
                  >
                    <img
                      src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
                      alt="not found"
                      style="width: 300px; height: 300px"
                    />
                    <p class="text-muted text-center fw-bold">Belum ada user</p>
                  </div>
                </fragment>
              </fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="isModal"
      :title="activeUsers && isEdit ? 'Update User' : 'Delete User'"
      :msg="activeUsers && isDel ? 'Are you sure want to delete the user?' : ''"
    >
      <template v-if="activeUsers && isDel" #icon>
        <div class="swal-icon swal-icon--error">
          <div class="swal-icon--error__x-mark">
            <span
              class="swal-icon--error__line swal-icon--error__line--left"
            ></span>
            <span
              class="swal-icon--error__line swal-icon--error__line--right"
            ></span>
          </div>
        </div>
      </template>
      <template #content>
        <EditTemplate
          v-if="activeUsers && isEdit"
          :firstName="activeUsers.firstName"
          :lastName="activeUsers.lastName"
          :mail="activeUsers.email"
          :phonenum="activeUsers.phone"
          :id="activeUsers.id"
          :pass="activeUsers.password"
          @hideModal="hideModal"
          @showAlert="showAlert"
        />
        <DeleteTemplate
          v-if="activeUsers && isDel"
          :id="activeId"
          @hideModal="hideModal"
          @showAlert="showAlert"
        />
      </template>
    </Modal>
    <Alert v-if="isSuccess" :msg="msg.success" variant="success" />
    <Alert v-if="isError" :msg="msg.error" variant="danger" />
  </div>
</template>
<script>
export default {
  head: {
    script: [
      {
        src: "/assets/js/core/bootstrap.min.js",
        body: true,
      },
    ],
  },
  auth: true,
};
</script>
<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref } from "vue";
import IconButton from "../components/base/IconButton.vue";
import Modal from "../components/base/Modal.vue";
import EditTemplate from "../components/EditTemplate.vue";
import Alert from "../components/base/Alert.vue";

const $root = getCurrentInstance().proxy.$root;
const $store = $root.$store;
const $axios = $root.$axios;
const perPage = ref(5);
const currentPage = ref(1);
const fields = [
  {
    key: "firstName",
    label: "First Name",
    sortable: true,
    api: "firstName",
  },
  {
    key: "lastName",
    label: "Last Name",
    sortable: false,
    api: "lastName",
  },
  {
    key: "phone",
    label: "Phone Number",
    sortable: true,
    api: "phone",
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    api: "email",
  },
  {
    key: "actions",
    label: "Actions",
  },
];
const isLoading = computed(() => $store.getters["regis/getIsLoading"]);
const data = computed(() => $store.getters["regis/getUsers"]);
const items = computed(() => {
  if (search.value === "") {
    if (data.value) {
      return data.value;
    }

    return [];
  }

  if (activeFilter.value === "") {
    return data.value.filter((val) =>
      val["firstName"].toUpperCase().includes(search.value.toUpperCase())
    );
  }

  return data.value.filter((val) =>
    val[activeFilter.value].toUpperCase().includes(search.value.toUpperCase())
  );
});
const isEdit = ref(false);
const isDel = ref(false);
const isSuccess = ref(false);
const isError = ref(false);
const msg = reactive({
  success: "",
  error: "",
});
const search = ref("");
const isModal = ref(false);
const activeId = ref(0);
const activeFilter = ref("");
const dpFilter = ref("");
const activeUsers = computed(() => {
  if (items.value !== undefined) {
    const temp = items.value.filter((val) => val.id === activeId.value);
    return temp.length > 0 ? temp[0] : [];
  } else {
    return [];
  }
});
const rows = computed(() => {
  if (items.value !== undefined) {
    return items.value.length;
  }
  return 0;
});

const onActive = (name, display) => {
  if (name === "default") {
    activeFilter.value = "";
    dpFilter.value = "Filter";
  } else {
    activeFilter.value = name;
    dpFilter.value = display;
  }
};

const editUser = (id) => {
  isModal.value = true;
  isDel.value = false;
  isEdit.value = true;
  activeId.value = id;
};

const hideModal = () => {
  isModal.value = false;
};

const showAlert = ({ isSucc, message }) => {
  if (isSucc) {
    isSuccess.value = true;
    msg.success = message;
    setTimeout(() => {
      isSuccess.value = false;
    }, 4000);
  } else {
    isError.value = true;
    msg.error = message;
    setTimeout(() => {
      isError.value = false;
    }, 4000);
  }
};

const delUser = (id) => {
  isModal.value = true;
  isEdit.value = false;
  isDel.value = true;
  activeId.value = id;
};

onMounted(() => {
  $store.dispatch("regis/fetchUser", $axios);
});
</script>

<style lang="scss" scoped></style>
