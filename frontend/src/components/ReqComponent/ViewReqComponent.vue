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
          class="w-100 modern-button"
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
        <CCard class="card-modern" @click="showModal(item)">
          <CCardHeader class="card-header-modern">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="m-0 card-title-modern">ผู้แจ้ง: {{ item.fullname }}</h5>
              <span class="date-modern">{{ item.mainr_Date }}</span>
            </div>
          </CCardHeader>
          <CCardBody>
            <div class="d-flex flex-column">
              <p><strong>รหัส:</strong> {{ item.mainr_ID }}</p>
              <p><strong>ห้อง:</strong> {{ item.roomNumber }}</p>
              <p><strong>หัวข้อ:</strong> {{ item.mainr_ProblemTitle }}</p>
              <p><strong>ประเภท:</strong> {{ item.Type }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p></p>
              <p class="status-modern mb-0"><strong>สถานะ:</strong> {{ item.status }}</p>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <div class="card-footer-modern">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <CButton class="btn-modern" :disabled="currentPage === 1" @click="currentPage--">
          Previous
        </CButton>

        <div>
          <span>Showing page {{ currentPage }} of {{ totalPages }}</span>
        </div>

        <CButton
          class="btn-modern"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </CButton>
      </div>

      <div class="d-flex align-items-center">
        <span>Show</span>
        <select v-model="rowsPerPage" class="form-select-modern mx-2" style="width: auto">
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

    <CModal
      alignment="center"
      :visible="visibleModelDetailRequest"
      @close="closeModelDetailRequest"
      aria-labelledby="VerticallyCenteredExample"
      size="xl"
    >
      <CModalHeader>
        <CModalTitle id="ModelDetailRequest">รายละเอียดการแจ้งซ่อม: {{ selectedUser.mainr_ID }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p><strong>หัวข้อ:</strong> {{ selectedUser.mainr_ProblemTitle }}</p>
        <p><strong>รายละเอียด:</strong> {{ selectedUser.mainr_ProblemDescription }}</p>
        <p><strong>ประเภท:</strong> {{ selectedUser.Type }}</p>
        <p><strong>สถานะ:</strong> {{ selectedUser.status }}</p>

        <div v-if="imageUrls.length > 0" class="mt-3">
          <!-- <p><strong>รูปภาพ:</strong></p> -->
          <div style="display: flex; flex-wrap: wrap; gap: 10px">
            <img
              v-for="(url, index) in imageUrls"
              :key="index"
              :src="getImageUrl(url)"
              alt="รูปภาพแจ้งซ่อม"
              style="max-width: 200px; max-height: 200px; object-fit: cover; cursor: pointer;"
              @click="openImageModal(index)"
            />
          </div>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" @click="closeModelDetailRequest">Close</CButton>
        <CButton class="cancelButton" color="danger" @click.stop="cancel(selectedUser)">
          ยกเลิกแจ้งซ่อม
        </CButton>
      </CModalFooter>
    </CModal>

    <vue-easy-lightbox
      :visible="visibleImageModal"
      :imgs="imageUrls.map(url => getImageUrl(url))"
      :index="currentImageIndex"
      @hide="closeImageModalOnly"
      @prev="handlePreviousImage"
      @next="handleNextImage"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "ViewReqComponent",
  components: {
    VueEasyLightbox, 
  },
  setup() {
    const searchQuery = ref("");
    const items = ref([]);
    const rowsPerPage = ref(3);
    const currentPage = ref(1);
    const visibleModelDetailRequest = ref(false); 
    const visibleImageModal = ref(false); 
    const selectedUser = ref({});
    const imageUrls = ref([]);
    const currentImageIndex = ref(0);

    // ฟังก์ชันดึงข้อมูลการแจ้งซ่อม
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

    const showModal = (item) => {
      selectedUser.value = item;
      fetchImages(item.mainr_ID);
      visibleModelDetailRequest.value = true;
    };

    const closeModelDetailRequest = () => {
      visibleModelDetailRequest.value = false;
      selectedUser.value = {};
      imageUrls.value = [];
    };

    const fetchImages = async (mainr_ID) => {
      try {
        const response = await axios.get(`/api/auth/getImgById?id=${mainr_ID}`);
        imageUrls.value = response.data.map((img) => img.imges_Path);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงรูปภาพ:", error);
        imageUrls.value = [];
      }
    };

    const getImageUrl = (path) => {
      return `http://localhost:3030/uploads/${path}`;
    };

    const openImageModal = (index) => {
      currentImageIndex.value = index;
      visibleImageModal.value = true;
    };

    const closeImageModalOnly = () => {
      visibleImageModal.value = false; 
    };

    const handlePreviousImage = () => {
      if (currentImageIndex.value > 0) {
        currentImageIndex.value -= 1;
      }
    };

    const handleNextImage = () => {
      if (currentImageIndex.value < imageUrls.value.length - 1) {
        currentImageIndex.value += 1;
      }
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
      visibleModelDetailRequest,
      closeModelDetailRequest,
      showModal,
      selectedUser,
      imageUrls,
      getImageUrl,
      openImageModal,
      closeImageModalOnly,
      visibleImageModal,
      currentImageIndex,
      handlePreviousImage,
      handleNextImage,
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
  color: white;
}

.cancelButton {
  color: white;
}

.status {
  font-size: 18px;
  color: rgb(228, 148, 0);
  text-align: right;
  margin-top: 10px;
}

.card-modern {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-header-modern {
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
}

.card-title-modern {
  font-size: 1.2rem;
  font-weight: bold;
}

.date-modern {
  font-weight: bold;
  color: #e0e0e0;
}

.status-modern {
  font-size: 16px;
  color: #ff9800;
  text-align: right;
}

.cancelButton-modern {
  width: 100%;
  color: white;
  background-color: #f44336;
  border-radius: 5px;
  padding: 10px;
}

.card-footer-modern {
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-modern {
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-modern:hover {
  background-color: #5a6268;
}

.form-select-modern {
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #ced4da;
}
</style>
