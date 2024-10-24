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
          แจ้งเบิกวัสดุอุปกรณ์
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
                          v-model="selectedUserTab2.detail"
                          disabled
                        ></textarea>
                      </div>
                    </CRow>

                    <CRow class="mt-3">
                      <CCol :md="10">
                        <label for="" class="form-label">วัสดุ</label>
                      </CCol>
                      <CCol :md="2">
                        <CButton color="primary" @click="showModelStockWithdraw()"
                          >เพิ่ม</CButton
                        >
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

    <CModal
      alignment="center"
      :visible="visibleModelStockWithdraw"
      @close="closeModelStockWithdraw"
      aria-labelledby="VerticallyCenteredExample"
      size="xl"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle id="ModelStockWithdraw">เพิ่มวัสดุ</CModalTitle>
      </CModalHeader>

      <CModalBody style="max-height: 400px; overflow-y: auto">
        <CInputGroup style="margin-bottom: 10px">
          <CFormInput placeholder="ค้นหาวัสดุ..." v-model="searchQueryStock" />
          <CInputGroupText>
            <CIcon name="cil-magnifying-glass" />
          </CInputGroupText>
        </CInputGroup>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>รหัสสต็อก</th>
              <th>ชื่อวัสดุ</th>
              <th>จำนวนคงเหลือ</th>
              <th>หน่วย</th>
              <th>ประเภทวัสดุ</th>
              <th>เลือก</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, index) in paginatedStockItems" :key="index">
              <td>{{ stock.stockid }}</td>
              <td>{{ stock.stockname }}</td>
              <td>{{ stock.stockquantity }}</td>
              <td>{{ stock.unitname }}</td>
              <td>{{ stock.typestockname }}</td>
              <td>
                <CButton color="primary" @click="addSelectedStock(stock)">เลือก</CButton>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-between align-items-center">
          <CButton
            :disabled="currentPageStock === 1"
            @click="currentPageStock--"
            class="btn btn-secondary"
          >
            Previous
          </CButton>

          <span>Showing page {{ currentPageStock }} of {{ totalPagesStock }}</span>

          <CButton
            :disabled="currentPageStock === totalPagesStock"
            @click="currentPageStock++"
            class="btn btn-secondary"
          >
            Next
          </CButton>
        </div>

        <div class="d-flex align-items-center mt-3">
          <span>Show</span>
          <select
            v-model="rowsPerPageStock"
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

        <CRow>
          <h5>รายการวัสดุที่เลือก</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ชื่อวัสดุ</th>
                <th>จำนวนคงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in selectedStockItems" :key="index">
                <td>{{ item.stockid }}</td>
                <td>{{ item.stockname }}</td>
                <td>{{ item.stockquantity }}</td>
              </tr>
            </tbody>
          </table>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CButton color="primary" @click="submitStockSelection">เพิ่ม</CButton>
        <CButton color="secondary" @click="closeModelStockWithdraw">ปิด</CButton>
      </CModalFooter>
    </CModal>
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
    const searchQueryStock = ref(""); // เพิ่มฟิลด์นี้สำหรับการค้นหาสต็อก
    const itemsTab1 = ref([]);
    const withdrawItems = ref([]);
    const stockItems = ref([]); // เก็บข้อมูลสต็อก
    const selectedStockItems = ref([]); // เก็บวัสดุที่เลือก
    const rowsPerPageTab1 = ref(3);
    const rowsPerPageWithdraw = ref(3);
    const rowsPerPageStock = ref(5); // ตั้งค่าจำนวนรายการต่อหน้าในสต็อก
    const currentPageTab1 = ref(1);
    const currentPageWithdraw = ref(1);
    const currentPageStock = ref(1); // หน้าในตารางสต็อก
    const visibleModelDetailRequestTab1 = ref(false);
    const visibleModelDetailRequestTab2 = ref(false);
    const visibleModelStockWithdraw = ref(false); // Modal สต็อก
    const visibleImageModal = ref(false);
    const selectedUserTab1 = ref({});
    const selectedUserTab2 = ref({});
    const imageUrls = ref([]);
    const currentImageIndex = ref(0);

    const filteredItemsTab1 = computed(() => {
      return itemsTab1.value.filter((item) => {
        return (
          item.mainr_ID.toLowerCase().includes(searchQueryTab1.value.toLowerCase()) ||
          item.fullname.toLowerCase().includes(searchQueryTab1.value.toLowerCase()) ||
          item.roomNumber?.toLowerCase().includes(searchQueryTab1.value.toLowerCase()) ||
          item.mainr_ProblemTitle
            ?.toLowerCase()
            .includes(searchQueryTab1.value.toLowerCase())
        );
      });
    });

    const filteredWithdrawItems = computed(() => {
      return withdrawItems.value.filter((item) => {
        return (
          item.mainr_ID.toLowerCase().includes(searchQueryTab2.value.toLowerCase()) ||
          item.fullname.toLowerCase().includes(searchQueryTab2.value.toLowerCase()) ||
          item.roomNumber?.toLowerCase().includes(searchQueryTab2.value.toLowerCase()) ||
          item.mainr_ProblemTitle
            ?.toLowerCase()
            .includes(searchQueryTab2.value.toLowerCase())
        );
      });
    });

    const filteredStockItems = computed(() => {
      return stockItems.value.filter((stock) => {
        return (
          stock.stockname.toLowerCase().includes(searchQueryStock.value.toLowerCase()) ||
          stock.stockid?.toLowerCase().includes(searchQueryStock.value.toLowerCase()) ||
          stock.typestockname
            ?.toLowerCase()
            .includes(searchQueryStock.value.toLowerCase())
        );
      });
    });

    const paginatedStockItems = computed(() => {
      const start = (currentPageStock.value - 1) * rowsPerPageStock.value;
      const end = start + rowsPerPageStock.value;
      return filteredStockItems.value.slice(start, end);
    });

    const totalPagesStock = computed(() => {
      return Math.ceil(filteredStockItems.value.length / rowsPerPageStock.value);
    });

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

    const fetchStockData = async () => {
      try {
        const response = await axios.get(`/api/auth/getStock`);
        stockItems.value = response.data; // Save the stock data
        console.log("Fetched stock data:", stockItems.value); // Log the data to check
      } catch (error) {
        console.error("Error fetching stock data:", error);
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
      return filteredItemsTab1.value.slice(start, end);
    });

    const totalPagesTab1 = computed(() => {
      return Math.ceil(filteredItemsTab1.value.length / rowsPerPageTab1.value);
    });

    const paginatedWithdrawItems = computed(() => {
      const start = (currentPageWithdraw.value - 1) * rowsPerPageWithdraw.value;
      const end = start + rowsPerPageWithdraw.value;
      return filteredWithdrawItems.value.slice(start, end);
    });

    const totalWithdrawPages = computed(() => {
      return Math.ceil(filteredWithdrawItems.value.length / rowsPerPageWithdraw.value);
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

    const showModelStockWithdraw = () => {
      fetchStockData(); // ดึงข้อมูลสต็อก
      visibleModelStockWithdraw.value = true;
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

    const closeModelStockWithdraw = () => {
      visibleModelStockWithdraw.value = false;
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

    const addSelectedStock = (stock) => {
      selectedStockItems.value.push(stock);
    };

    const submitStockSelection = () => {
      console.log("วัสดุที่เลือก:", selectedStockItems.value);
      closeModelStockWithdraw();
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
      searchQueryStock, // เพิ่มฟิลด์นี้สำหรับการค้นหาสต็อก
      paginatedItemsTab1,
      paginatedWithdrawItems,
      totalPagesTab1,
      totalWithdrawPages,
      rowsPerPageTab1,
      rowsPerPageWithdraw,
      rowsPerPageStock, // จำนวนต่อหน้าของสต็อก
      currentPageTab1,
      currentPageWithdraw,
      currentPageStock, // หน้าในตารางสต็อก
      visibleModelDetailRequestTab1,
      visibleModelDetailRequestTab2,
      visibleModelStockWithdraw,
      closeModelDetailRequestTab1,
      closeModelDetailRequestTab2,
      closeModelStockWithdraw,
      showModalTab1,
      showModalTab2,
      showModelStockWithdraw,
      selectedUserTab1,
      selectedUserTab2,
      stockItems, // ข้อมูลสต็อก
      selectedStockItems, // วัสดุที่เลือก
      paginatedStockItems, // สต็อกที่แบ่งหน้า
      totalPagesStock, // จำนวนหน้าของสต็อก
      imageUrls,
      getImageUrl,
      openImageModal,
      closeImageModalOnly,
      visibleImageModal,
      currentImageIndex,
      handlePreviousImage,
      handleNextImage,
      addSelectedStock,
      submitStockSelection,
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
