<template>
  <div>
    <CRow style="margin-bottom: 10px">
      <CCol :md="7"></CCol>
      <CCol :md="3" style="margin-bottom: 10px">
        <CInputGroup>
          <CFormInput placeholder="ค้นหา..." v-model="searchQuery" />
          <CInputGroupText>
            <CIcon name="cil-magnifying-glass" />
          </CInputGroupText>
        </CInputGroup>
      </CCol>
      <CCol :md="2">
        <CButton
          color="primary"
          class="w-100"
          block
          style="margin-bottom: 10px"
          @click="$router.push('/UserAddReqView')"
        >
          แจ้งซ่อมบำรุง
        </CButton>
      </CCol>
    </CRow>

    <CRow>
      <CCol v-for="item in paginatedItems" :key="item.mainr_ID" md="12" class="mb-4">
        <CCard class="card-custom">
          <CCardHeader>
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="m-0">ผู้แจ้ง: {{ item.fullname }}</h5>
              <span class="date">{{ item.mainr_Date }}</span>
            </div>
          </CCardHeader>
          <CCardBody>
            <div class="d-flex flex-column">
              <p><strong>รหัส:</strong> {{ item.mainr_ID }}</p>
              <p><strong>ห้อง:</strong> {{ item.roomNumber }}</p>
              <p><strong>หัวข้อ:</strong> {{ item.mainr_ProblemTitle }}</p>
              <p><strong>รายละเอียด:</strong> {{ item.mainr_ProblemDescription }}</p>
              <p><strong>ประเภท:</strong> {{ item.Type }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p></p>
              <p class="status mb-0"><strong>สถานะ:</strong> {{ item.status }}</p>
            </div>
            <CButton class="cancelButton" color="danger" @click="showModalcancel(item)">
              ยกเลิก
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <div class="card-footer">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <CButton
          class="btn btn-secondary"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </CButton>

        <div>
          <span>Showing page {{ currentPage }} of {{ totalPages }}</span>
        </div>

        <CButton
          class="btn btn-secondary"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </CButton>
      </div>

      <div class="d-flex align-items-center">
        <span>Show</span>
        <select v-model="rowsPerPage" class="form-select mx-2" style="width: auto">
          <option :value="3">3</option>
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span>entries</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  name: "ViewReqComponent",
  setup() {
    const searchQuery = ref("");
    const items = ref([]);
    const rowsPerPage = ref(3);
    const currentPage = ref(1);

    const fetchRequests = async () => {
      const userId = localStorage.getItem("userID");
      try {
        const response = await axios.get(`/api/auth/getReqById?id=${userId}`);
        items.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งซ่อม:", error);
      }
    };

    const filteredItems = computed(() => {
      return items.value.filter((item) => {
        return Object.keys(item).some((key) => {
          return String(item[key])
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        });
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / rowsPerPage.value);
    });

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return filteredItems.value.slice(start, end);
    });

    const setPage = (page) => {
      currentPage.value = page;
    };

    onMounted(() => {
      fetchRequests();
    });

    return {
      searchQuery,
      paginatedItems,
      totalPages,
      rowsPerPage,
      currentPage,
      setPage,
    };
  },
};
</script>

<style scoped>
.card-body p {
  margin: 0;
}

.date {
  font-weight: bold;
  /* color: #6c757d; */
  color: white;

}

.cancelButton {
  color: white;
  width: 100%;
}

.status {
  font-size: 18px;
  color: rgb(228, 148, 0);
  text-align: right;
  margin-top: 10px;
}
.card-header:first-child{
background-color: #5856d6;
color: white;
}
</style>
