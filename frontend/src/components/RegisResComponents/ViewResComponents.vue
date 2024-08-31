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
            @click="$router.push('/RegisResident')"
          >
            New
          </CButton>
        </CCol>
      </CRow>
      <CRow style="margin-bottom: 10px">
        <CCol :md="2">
          <CFormSelect v-model="selectedClass" aria-label="Filter by Class">
            <option value="">ตำแหน่ง</option>
            <option v-for="role in roles" :key="role.role_id" :value="role.role_Name">
              {{ role.role_Name }}
            </option>
          </CFormSelect>
        </CCol>
        <CCol :md="7">

        </CCol>
        <CCol :md="3">
          <CInputGroup>
            <CFormInput placeholder="Search..." v-model="searchQuery" />
            <CInputGroupText>
              <CIcon name="cil-magnifying-glass" />
            </CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol :md="12">
          <CCard class="mb-4">
            <CCardHeader> ตารางผู้ใช้งาน </CCardHeader>
            <CCardBody>
              <CTable :columns="columns" :items="paginatedItems" />
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol :md="4">
                  <div class="d-flex align-items-center">
                    <span>Show</span>
                    <CFormSelect v-model="rowsPerPage" class="mx-2" style="width: auto">
                      <option :value="5">5</option>
                      <option :value="10">10</option>
                      <option :value="20">20</option>
                      <option :value="50">50</option>
                      <option :value="100">100</option>
                    </CFormSelect>
                    <span>entries</span>
                  </div>
                </CCol>
                <CCol :md="8" class="d-flex justify-content-end">
                  <CButton :disabled="currentPage === 1" @click="currentPage--">
                    Previous
                  </CButton>
                  <CButton
                    v-for="page in totalPages"
                    :key="page"
                    @click="setPage(page)"
                    :color="page === currentPage ? 'primary' : 'secondary'"
                    class="mx-1"
                  >
                    {{ page }}
                  </CButton>
                  <CButton :disabled="currentPage === totalPages" @click="currentPage++">
                    Next
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol :md="6"> </CCol>
      </CRow>
      
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
import miniRegisComponent from "./miniRegisComponent.vue";
import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";

export default {
  name: "ViewResComponents",
  components: {
    miniRegisComponent,
  },
  setup() {
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };

    const columns = ref([
      { key: "user_ID", label: "รหัส", _props: { scope: "col", style: "width: 10%;" } },
      {
        key: "user_Fname",
        label: "ชื่อ",
        _props: { scope: "col", style: "width: 10%;" },
      },
      {
        key: "user_Lname",
        label: "สกุล",
        _props: { scope: "col", style: "width: 10%;" },
      },
      {
        key: "user_Email",
        label: "อีเมล์",
        _props: { scope: "col", style: "width: 10%;" },
      },
      {
        key: "user_Phone",
        label: "เบอร์",
        _props: { scope: "col", style: "width: 10%;" },
      },
      {
        key: "user_Name",
        label: "Username",
        _props: { scope: "col", style: "width: 10%;" },
      },
      {
        key: "address",
        label: "ที่อยู่",
        _props: { scope: "col", style: "width: 20%;" },
      },
      {
        key: "roleName",
        label: "ตำแหน่ง",
        _props: { scope: "col", style: "width: 10%;" },
      },
    ]);

    const users = ref([]);
    const roles = ref([]);
    const searchQuery = ref("");
    const selectedClass = ref("");
    const filteredItems = ref([]);
    const rowsPerPage = ref(10);
    const currentPage = ref(1);

    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / rowsPerPage.value);
    });

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        users.value = response.data.map((user) => ({
          ...user,
          address: truncateText(user.address, 10),
        }));
        filterItems();
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:", error);
      }
    };

    const fetchRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getRole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        roles.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล role:", error);
      }
    };

    const filterItems = () => {
      filteredItems.value = users.value.filter((item) => {
        const matchesClass = selectedClass.value
          ? item.roleName === selectedClass.value
          : true;

        const matchesSearch =
          item.user_ID?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.user_Fname?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.user_Lname?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.user_Email?.toLowerCase().includes(searchQuery.value.toLowerCase());

        return matchesClass && matchesSearch;
      });
    };

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return filteredItems.value.slice(start, end);
    });

    const setPage = (page) => {
      currentPage.value = page;
    };

    onMounted(() => {
      fetchUser();
      fetchRole();
    });

    watch([selectedClass, searchQuery], () => {
      filterItems();
      currentPage.value = 1;
    });

    return {
      columns,
      users,
      roles,
      searchQuery,
      selectedClass,
      filteredItems,
      paginatedItems,
      filterItems,
      rowsPerPage,
      currentPage,
      totalPages,
      setPage,
    };
  },
};
</script>
