<template>
  <div>
    <CRow>
      <CCol :md="10"></CCol>
      <CCol :md="2">
        <CButton
          color="primary"
          class="w-100"
          block
          style="margin-bottom: 10px"
          @click="$router.push('')"
        ><i class="fa-solid fa-user-plus"></i>
          New
        </CButton>
      </CCol>
    </CRow>

  
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-4">
          <div class="card-header">ตารางตำแหน่ง</div>
          <div class="card-body table-responsive p-0">
            <table class="table">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                  <th>แก้ไข</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in paginatedItems" :key="item.role_ID">
                  <td>{{ item.role_ID }}</td>
                  <td>{{ item.role_Name }}</td>
                  <td>{{ item.stat_Name }}</td>
                  <td>
                    <button
                      class="btn btn-warning btn-sm fontwhite"
                      @click="editRole(item.role_ID)"
                    ><i class="fa-solid fa-user-pen"></i>
                    แก้ไข
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm fontwhite"
                      @click="showModalDelete(item)"
                    ><i class="fa-solid fa-trash"></i>
                    ลบ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-4">
                <div class="d-flex align-items-center">
                  <span>Show</span>
                  <select
                    v-model="rowsPerPage"
                    class="form-select mx-2"
                    style="width: auto"
                    @change="filterItems"
                  >
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>
              <div class="col-md-8 d-flex justify-content-end">
                <button
                  class="btn btn-secondary"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                >
                  Previous
                </button>
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="setPage(page)"
                  :class="page === currentPage ? 'btn btn-primary mx-1' : 'btn btn-secondary mx-1'"
                >
                  {{ page }}
                </button>
                <button
                  class="btn btn-secondary"
                  :disabled="currentPage === totalPages"
                  @click="currentPage++"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <CModal
      alignment="center"
      :visible="visibleDeleteModal"
      @close="closeDeleteModal"
      aria-labelledby="VerticallyCenteredExample"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <DeleteRoleComponent
          :selectedRole="selectedRole"
          :closeModal="closeDeleteModal"
          :refreshViewData="fetchRoles"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">Close</CButton>
      </CModalFooter>
    </CModal>

    <!-- Toaster for Notifications -->
    <CToaster class="p-3" placement="top-end">
      <CToast v-for="(toast, index) in toasts" :key="index" visible>
        <CToastHeader closeButton>
          <span class="me-auto fw-bold">{{ toast.title }}</span>
        </CToastHeader>
        <CToastBody>{{ toast.content }}</CToastBody>
      </CToast>
    </CToaster>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/vue";
import axios from "axios";



export default {
  name: "ViewRoleComponents",

  setup() {
    const columns = ref([
      { key: "role_ID", label: "รหัสตำแหน่ง" },
      { key: "role_Name", label: "ชื่อตำแหน่ง" },
      { key: "stat_Name", label: "สถานะ" },
    ]);
    const roles = ref([]);
    const searchQuery = ref("");
    const filteredItems = ref([]);
    const rowsPerPage = ref(10);
    const currentPage = ref(1);
    const visibleDeleteModal = ref(false);
    const selectedRole = ref({});

    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / rowsPerPage.value);
    });

    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getRolesForView", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        roles.value = response.data;
        filterItems();
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const filterItems = () => {
      filteredItems.value = roles.value
        .filter((item) => {
          const matchesSearch =
            item.role_ID?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.role_Name?.toLowerCase().includes(searchQuery.value.toLowerCase());

          return matchesSearch;
        })
        .sort((a, b) => a.role_ID.localeCompare(b.role_ID));
    };

    const closeDeleteModal = () => {
      visibleDeleteModal.value = false;
      selectedRole.value = {};
      fetchRoles();
    };

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      return filteredItems.value.slice(start, start + rowsPerPage.value);
    });

    const setPage = (page) => {
      currentPage.value = page;
    };

    const editRole = (roleId) => {
      $router.push({ path: '/EditRoleView', query: { id: roleId } });
    };

    onMounted(() => {
      fetchRoles();
    });

    watch([searchQuery], () => {
      filterItems();
      currentPage.value = 1;
    });

    return {
      columns,
      roles,
      searchQuery,
      filteredItems,
      paginatedItems,
      rowsPerPage,
      currentPage,
      totalPages,
      setPage,
      visibleDeleteModal,
      closeDeleteModal,
      selectedRole,
      editRole,
    };
  },
};
</script>
