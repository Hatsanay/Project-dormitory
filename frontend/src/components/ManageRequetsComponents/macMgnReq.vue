<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '1' }"
          @click.prevent="setActiveTab('1')"
          href="#"
        >
          รับเรื่องแจ้งซ่อมบำรุง
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === '2' }"
          @click.prevent="setActiveTab('2')"
          href="#"
        >
          เบิกวัสดุอุปกรณ์
        </a>
      </li>
    </ul>

    <div class="tab-content mt-3">
      <!-- Tab 1 -->
      <div v-if="activeTab === '1'" class="tab-pane active">
        <CRow style="margin-bottom: 10px">
          <CCol :md="9"></CCol>
          <CCol :md="3" style="margin-bottom: 10px">
            <CInputGroup>
              <CFormInput placeholder="ค้นหา..." v-model="searchQueryTab1" />
              <CInputGroupText>
                <CIcon name="cil-magnifying-glass" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol
            v-for="item in paginatedItemsTab1"
            :key="item.mainr_ID"
            md="12"
            class="mb-4"
          >
            <CCard class="card-modern" @click="showModalTab1(item)">
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
                  <p class="status-modern mb-0">
                    <strong>สถานะ:</strong> {{ item.status }}
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <div class="card-footer-modern">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <CButton
              class="btn-modern"
              :disabled="currentPageTab1 === 1"
              @click="currentPageTab1--"
            >
              Previous
            </CButton>

            <div>
              <span>Showing page {{ currentPageTab1 }} of {{ totalPagesTab1 }}</span>
            </div>

            <CButton
              class="btn-modern"
              :disabled="currentPageTab1 === totalPagesTab1"
              @click="currentPageTab1++"
            >
              Next
            </CButton>
          </div>

          <div class="d-flex align-items-center">
            <span>Show</span>
            <select
              v-model="rowsPerPageTab1"
              class="form-select-modern mx-2"
              style="width: auto"
            >
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
          :visible="visibleModelDetailRequestTab1"
          @close="closeModelDetailRequestTab1"
          aria-labelledby="VerticallyCenteredExample"
          size="xl"
          backdrop="static"
        >
          <CModalHeader>
            <CModalTitle id="ModelDetailRequest">
              รายละเอียดการแจ้งซ่อม ID: {{ selectedUserTab1.mainr_ID }}
              <span>วันที่: {{ selectedUserTab1.mainr_Date }}</span>
            </CModalTitle>
          </CModalHeader>
          <CModalBody style="max-height: 400px; overflow-y: auto">
            <p><strong>ผู้แจ้ง:</strong> {{ selectedUserTab1.fullname }}</p>
            <p><strong>ห้อง:</strong> {{ selectedUserTab1.roomNumber }}</p>
            <p><strong>หัวข้อ:</strong> {{ selectedUserTab1.mainr_ProblemTitle }}</p>
            <p>
              <strong>รายละเอียด:</strong> {{ selectedUserTab1.mainr_ProblemDescription }}
            </p>
            <p><strong>ประเภท:</strong> {{ selectedUserTab1.Type }}</p>
            <p><strong>สถานะ:</strong> {{ selectedUserTab1.status }}</p>

            <div v-if="imageUrls.length > 0" class="mt-3">
              <div
                style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center"
              >
                <img
                  v-for="(url, index) in imageUrls"
                  :key="index"
                  :src="getImageUrl(url)"
                  alt="รูปภาพแจ้งซ่อม"
                  style="
                    max-width: 500px;
                    max-height: 500px;
                    object-fit: cover;
                    cursor: pointer;
                  "
                  @click="openImageModal(index)"
                />
              </div>
            </div>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" @click="closeModelDetailRequestTab1">ปิด</CButton>
            <CButton color="primary" @click="assessProblemReqTab1(selectedUserTab1)">
              รับเรื่องการแจ้งซ่อม
            </CButton>
          </CModalFooter>
        </CModal>

        <vue-easy-lightbox
          :visible="visibleImageModal"
          :imgs="imageUrls.map((url) => getImageUrl(url))"
          :index="currentImageIndex"
          @hide="closeImageModalOnly"
          @prev="handlePreviousImage"
          @next="handleNextImage"
        />
      </div>

      <!-- Tab 2 -->
      <div v-if="activeTab === '2'" class="tab-pane active">
        <CRow style="margin-bottom: 10px">
          <CCol :md="9"></CCol>
          <CCol :md="3" style="margin-bottom: 10px">
            <CInputGroup>
              <CFormInput placeholder="ค้นหา..." v-model="searchQueryTab2" />
              <CInputGroupText>
                <CIcon name="cil-magnifying-glass" />
              </CInputGroupText>
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol
            v-for="item in paginatedWithdrawItems"
            :key="item.mainr_ID"
            md="12"
            class="mb-4"
          >
            <CCard class="card-modern" @click="showModalTab2(item)">
              <CCardHeader class="card-header-modern">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="m-0 card-title-modern">ผู้เบิก: {{ item.fullname }}</h5>
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
                  <p class="status-modern mb-0">
                    <strong>สถานะ:</strong> {{ item.status }}
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <div class="card-footer-modern">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <CButton
              class="btn-modern"
              :disabled="currentPageWithdraw === 1"
              @click="currentPageWithdraw--"
            >
              Previous
            </CButton>

            <div>
              <span
                >Showing page {{ currentPageWithdraw }} of {{ totalWithdrawPages }}</span
              >
            </div>

            <CButton
              class="btn-modern"
              :disabled="currentPageWithdraw === totalWithdrawPages"
              @click="currentPageWithdraw++"
            >
              Next
            </CButton>
          </div>

          <div class="d-flex align-items-center">
            <span>Show</span>
            <select
              v-model="rowsPerPageWithdraw"
              class="form-select-modern mx-2"
              style="width: auto"
            >
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
          :visible="visibleModelDetailRequestTab2"
          @close="closeModelDetailRequestTab2"
          aria-labelledby="VerticallyCenteredExample"
          size="xl"
          backdrop="static"
          fullscreen
        >
          <CModalHeader>
            <CModalTitle id="ModelDetailRequest">
              รายละเอียดการแจ้งซ่อม ID: {{ selectedUserTab2.mainr_ID }}
              <span>วันที่: {{ selectedUserTab2.mainr_Date }}</span>
            </CModalTitle>
          </CModalHeader>
          <CModalBody style="display: flex; flex-direction: column; height: 100%">
            <CRow style="flex-grow: 1">
              <CCol :md="7" style="flex-grow: 1; max-height: 800px; overflow-y: auto">
                <CCard style="flex-grow: 1">
                  <CCardHeader>
                    <h7>รายละเอียด</h7>
                  </CCardHeader>
                  <CModalBody style="flex-grow: 1; overflow-y: auto">
                    <p><strong>ผู้แจ้ง:</strong> {{ selectedUserTab2.fullname }}</p>
                    <p><strong>ห้อง:</strong> {{ selectedUserTab2.roomNumber }}</p>
                    <p>
                      <strong>หัวข้อ:</strong> {{ selectedUserTab2.mainr_ProblemTitle }}
                    </p>
                    <p>
                      <strong>รายละเอียด:</strong>
                      {{ selectedUserTab2.mainr_ProblemDescription }}
                    </p>
                    <p><strong>ประเภท:</strong> {{ selectedUserTab2.Type }}</p>
                    <p><strong>สถานะ:</strong> {{ selectedUserTab2.status }}</p>

                    <div v-if="imageUrls.length > 0" class="mt-3">
                      <div
                        style="
                          display: flex;
                          flex-wrap: wrap;
                          gap: 10px;
                          justify-content: center;
                        "
                      >
                        <img
                          v-for="(url, index) in imageUrls"
                          :key="index"
                          :src="getImageUrl(url)"
                          alt="รูปภาพแจ้งซ่อม"
                          style="
                            max-width: 500px;
                            max-height: 500px;
                            object-fit: cover;
                            cursor: pointer;
                          "
                          @click="openImageModal(index)"
                        />
                      </div>
                    </div>
                  </CModalBody>
                </CCard>
              </CCol>

              <!-- การ์ดขวา -->
              <CCol :md="5" style="display: flex; flex-direction: column; height: 100%">
                <CCard style="flex-grow: 1">
                  <CCardHeader>
                    <h7>การประเมินงานซ่อมเบื้องต้น</h7>
                  </CCardHeader>
                  <CModalBody style="flex-grow: 1; overflow-y: auto">
                    <CRow>
                      <label for="" class="form-label">ประเมินงานซ่อมเบื้องต้น</label>
                      <div class="form-floating">
                        <textarea
                          class="form-control"
                          placeholder="กรอกประเมินงานซ่อมเบื้องต้น"
                          style="height: 100px"
                          disabled
                        ></textarea>
                      </div>
                    </CRow>

                    <CRow class="mt-3">
                      <CCol :md="10">
                        <label for="" class="form-label">วัสดุ</label>
                      </CCol>
                      <CCol :md="2">
                        <CButton color="primary" @click="addMaterialRow">เพิ่ม</CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>รหัส</th>
                            <th>ชื่อ</th>
                            <th>ยี่ห้อ</th>
                            <th>จำนวน</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(material, index) in materials" :key="index">
                            <td>{{ material.code }}</td>
                            <td>{{ material.name }}</td>
                            <td>{{ material.brand }}</td>
                            <td>{{ material.quantity }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>

                    <CRow class="mt-3">
                      <CCol :md="10">
                        <label for="" class="form-label"
                          >ยืม–คืนเครื่องมือและอุปกรณ์</label
                        >
                      </CCol>
                      <CCol :md="2">
                        <CButton color="primary" @click="addToolRow">เพิ่ม</CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>รหัส</th>
                            <th>ชื่อ</th>
                            <th>จำนวน</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(tool, index) in tools" :key="index">
                            <td>{{ tool.code }}</td>
                            <td>{{ tool.name }}</td>
                            <td>{{ tool.quantity }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>
                  </CModalBody>

                 
                </CCard>
              </CCol>
            </CRow>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" @click="closeModelDetailRequestTab2">ปิด</CButton>

            <CButton color="primary" @click="assessProblemReqTab2(selectedUserTab2)">
              รับเรื่องการแจ้งซ่อม
            </CButton>
          </CModalFooter>
        </CModal>
      </div>

      <vue-easy-lightbox
        :visible="visibleImageModal"
        :imgs="imageUrls.map((url) => getImageUrl(url))"
        :index="currentImageIndex"
        @hide="closeImageModalOnly"
        @prev="handlePreviousImage"
        @next="handleNextImage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueEasyLightbox from "vue-easy-lightbox";
import Swal from "sweetalert2";

export default {
  name: "macMgnReq",
  components: {
    VueEasyLightbox,
  },
  setup() {
    const activeTab = ref("1");
    const searchQueryTab1 = ref("");
    const searchQueryTab2 = ref("");
    const itemsTab1 = ref([]);
    const withdrawItems = ref([]);
    const rowsPerPageTab1 = ref(3);
    const rowsPerPageWithdraw = ref(3);
    const currentPageTab1 = ref(1);
    const currentPageWithdraw = ref(1);
    const visibleModelDetailRequestTab1 = ref(false);
    const visibleModelDetailRequestTab2 = ref(false);
    const visibleImageModal = ref(false);
    const selectedUserTab1 = ref({});
    const selectedUserTab2 = ref({});
    const imageUrls = ref([]);
    const currentImageIndex = ref(0);

    const fetchRequestsTab1 = async () => {
      try {
        const response = await axios.get(`/api/auth/getMacReq`);
        itemsTab1.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งซ่อม:", error);
      }
    };

    const fetchWithdrawRequestsTab2 = async () => {
      try {
        const userId = localStorage.getItem("userID");
        const response = await axios.get(`/api/auth/getMacReqById?id=${userId}`);
        withdrawItems.value = response.data;
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
      }
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
      if (tab === "2") {
        fetchWithdrawRequestsTab2();
      }
    };

    const paginatedItemsTab1 = computed(() => {
      const start = (currentPageTab1.value - 1) * rowsPerPageTab1.value;
      const end = start + rowsPerPageTab1.value;
      return itemsTab1.value.slice(start, end);
    });

    const totalPagesTab1 = computed(() => {
      return Math.ceil(itemsTab1.value.length / rowsPerPageTab1.value);
    });

    const paginatedWithdrawItems = computed(() => {
      const start = (currentPageWithdraw.value - 1) * rowsPerPageWithdraw.value;
      const end = start + rowsPerPageWithdraw.value;
      return withdrawItems.value.slice(start, end);
    });

    const totalWithdrawPages = computed(() => {
      return Math.ceil(withdrawItems.value.length / rowsPerPageWithdraw.value);
    });

    const showModalTab1 = (item) => {
      selectedUserTab1.value = item;
      fetchImages(item.mainr_ID);
      visibleModelDetailRequestTab1.value = true;
    };

    const showModalTab2 = (item) => {
      selectedUserTab2.value = item;
      fetchImages(item.mainr_ID);
      visibleModelDetailRequestTab2.value = true;
    };

    const closeModelDetailRequestTab1 = () => {
      visibleModelDetailRequestTab1.value = false;
      selectedUserTab1.value = {};
      imageUrls.value = [];
    };

    const closeModelDetailRequestTab2 = () => {
      visibleModelDetailRequestTab2.value = false;
      selectedUserTab2.value = {};
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

    const assessProblemReqTab1 = async (selectedUser) => {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "ประเมิณปัญหาเบื้องต้น",
        inputPlaceholder: "พิมพ์ข้อความของคุณที่นี่...",
        inputAttributes: {
          "aria-label": "พิมพ์ข้อความของคุณที่นี่",
        },
        showCancelButton: true,
      });

      if (text) {
        Swal.fire({
          title: "คุณแน่ใจหรือไม่ที่จะส่งการประเมิณปัญหา?",
          text: "การประเมิณนี้ไม่สามารถย้อนกลับได้!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ยืนยันส่งการประเมิณปัญหา",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const userId = localStorage.getItem("userID");
              await axios.post(`/api/auth/sendAssessProblemReq`, {
                mainr_ID: selectedUser.mainr_ID,
                assessProblemText: text,
                userID: userId,
              });

              Swal.fire({
                title: "ส่งการประเมิณปัญหาเรียบร้อย!",
                text: "บันทึกเรียบร้อย.",
                icon: "success",
              }).then(() => {
                window.location.reload();
              });

              closeModelDetailRequestTab1();
              fetchRequestsTab1();
            } catch (error) {
              console.error("เกิดข้อผิดพลาดในการส่งการประเมิณปัญหา:", error);
              Swal.fire({
                title: "เกิดข้อผิดพลาด!",
                text: "ไม่สามารถส่งการประเมิณปัญหาได้.",
                icon: "error",
              });
            }
          }
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกข้อมูลการประเมิณปัญหา.",
          icon: "error",
        });
      }
    };

    const assessProblemReqTab2 = async (selectedUser) => {};

    onMounted(() => {
      fetchRequestsTab1();
    });

    return {
      activeTab,
      searchQueryTab1,
      searchQueryTab2,
      paginatedItemsTab1,
      paginatedWithdrawItems,
      totalPagesTab1,
      totalWithdrawPages,
      rowsPerPageTab1,
      rowsPerPageWithdraw,
      currentPageTab1,
      currentPageWithdraw,
      visibleModelDetailRequestTab1,
      visibleModelDetailRequestTab2,
      closeModelDetailRequestTab1,
      closeModelDetailRequestTab2,
      showModalTab1,
      showModalTab2,
      selectedUserTab1,
      selectedUserTab2,
      imageUrls,
      getImageUrl,
      openImageModal,
      closeImageModalOnly,
      visibleImageModal,
      currentImageIndex,
      handlePreviousImage,
      handleNextImage,
      assessProblemReqTab1,
      assessProblemReqTab2,
      setActiveTab,
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
.frontwhite {
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
