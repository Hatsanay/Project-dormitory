<template>
  <div>
    <!-- Search bar -->
    <CRow style="margin-bottom: 10px">
      <CCol :md="9"></CCol>
      <CCol :md="3" style="margin-bottom: 10px">
        <CInputGroup>
          <CFormInput placeholder="ค้นหา..." v-model="searchQuery" />
          <CInputGroupText>
            <CIcon name="cil-magnifying-glass" />
          </CInputGroupText>
        </CInputGroup>
      </CCol>
    </CRow>

    <!-- Request cards -->
    <CRow>
      <CCol v-for="item in paginatedItems" :key="item.mainr_ID" md="12" class="mb-4">
        <CCard class="card-custom" @click="openModal(item)">
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
            <div>
              <!-- <CButton class="sendTomac" color="warning" @click="sendtomac(item)">
                ส่งคำร้องให้ช่างตรวจสอบ
              </CButton> -->
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Pagination controls -->
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

    <!-- Modal for request details -->
    <CModal
      alignment="center"
      :visible="visibleModal"
      @close="closeModal"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>รายละเอียดคำร้อง: {{ selectedUser.mainr_ID }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p><strong>หัวข้อ:</strong> {{ selectedUser.mainr_ProblemTitle }}</p>
        <p><strong>รายละเอียด:</strong> {{ selectedUser.mainr_ProblemDescription }}</p>
        <p><strong>ประเภท:</strong> {{ selectedUser.Type }}</p>
        <p><strong>สถานะ:</strong> {{ selectedUser.status }}</p>

        <!-- Display images if available -->
        <div v-if="imageUrls.length > 0" class="mt-3">
          <p><strong>รูปภาพ:</strong></p>
          <div style="display: flex; flex-wrap: wrap; gap: 10px">
            <img
              v-for="(url, index) in imageUrls"
              :key="index"
              :src="getImageUrl(url)"
              alt="รูปภาพแจ้งซ่อม"
              style="max-width: 200px; max-height: 200px; object-fit: cover"
            />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">Close</CButton>
        <CButton class="frontwhite" color="danger" @click="sendtomac(selectedUser)">
          ปฎิเสธ
        </CButton>
        <CButton color="primary" @click="sendtomac(selectedUser)">
          ส่งคำร้องให้ช่างตรวจสอบ
        </CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  name: "starffMgnReq",
  setup() {
    const searchQuery = ref(""); // Stores the search query
    const items = ref([]); // Stores the full list of items
    const rowsPerPage = ref(3); // Number of items per page
    const currentPage = ref(1); // Current page number
    const selectedUser = ref({}); // Stores the selected user details
    const imageUrls = ref([]); // Stores the images for selected user
    const visibleModal = ref(false); // Controls modal visibility

    // Fetch the list of requests (items) from the API
    const fetchRequests = async () => {
      const userId = localStorage.getItem("userID");
      try {
        const response = await axios.get(`/api/auth/getReq`);
        items.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งซ่อม:", error);
      }
    };

    // Fetch the images for the selected request
    const fetchImages = async (mainr_ID) => {
      try {
        const response = await axios.get(`/api/auth/getImgById?id=${mainr_ID}`);
        imageUrls.value = response.data.map((img) => img.imges_Path);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงรูปภาพ:", error);
        imageUrls.value = [];
      }
    };

    // Open the modal and load the images
    const openModal = (item) => {
      selectedUser.value = item;
      fetchImages(item.mainr_ID);
      visibleModal.value = true;
    };

    // Close the modal
    const closeModal = () => {
      visibleModal.value = false;
      selectedUser.value = {};
      imageUrls.value = [];
    };

    // Filtered items based on the search query
    const filteredItems = computed(() => {
      return items.value.filter((item) => {
        return (
          item.fullname.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.mainr_ProblemTitle
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      });
    });

    // Paginated items after filtering based on search query
    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return filteredItems.value.slice(start, end); // Apply pagination after filtering
    });

    // Total number of pages after filtering
    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / rowsPerPage.value);
    });

    // URL for image paths
    const getImageUrl = (path) => {
      return `http://localhost:3030/uploads/${path}`;
    };

    // On component mount, fetch the requests
    onMounted(() => {
      fetchRequests();
    });

    return {
      searchQuery,
      currentPage,
      rowsPerPage,
      paginatedItems,
      totalPages,
      selectedUser,
      imageUrls,
      openModal,
      closeModal,
      getImageUrl,
      visibleModal,
    };
  },
};
</script>

<style scoped>
.card-body p {
  margin: 0;
}

.frontwhite{
  color: white;

}
.date {
  font-weight: bold;
  color: white;
}

.sendTomac {
  width: 100%;
}

.viewDetail {
  margin-bottom: 10px;
  width: 100%;
}

.status {
  font-size: 18px;
  color: rgb(228, 148, 0);
  text-align: right;
  margin-top: 10px;
}

.card-custom {
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card-custom:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
