<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>เพิ่มข้อมูลสต็อก</CCardHeader>
          <CCardBody>
<<<<<<< HEAD
            <CForm class="row g-2 needs-validation" novalidate @submit="handleSubmitTooltip">
=======
            <CForm class="row g-2 needs-validation" novalidate @submit="handleSubmitTooltip01">
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
              <CCol md="12">
                <CRow class="mb-3">
                  <CCol md="2">
                    <CFormLabel for="autoID">รหัสสต็อก</CFormLabel>
                    <CFormInput v-model="autoID" type="text" id="autoID" disabled />
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="stockname">ชื่อวัสดุ</CFormLabel>
                    <CFormInput
                      v-model="stockname"
                      type="text"
                      id="stockname"
                      required
                      :class="{ 'is-invalid': isStockInvalid }"
                    />
                    <CFormFeedback invalid>{{ nameErrorMessage }}</CFormFeedback>
                  </CCol>
                  <CCol md="1">
                    <CFormLabel for="quantity">จำนวน</CFormLabel>
                    <CFormInput
                      v-model="quantity"
                      type="number"
                      id="quantity"
                      required
                      :class="{ 'is-invalid': isQuantityInvalid }"
                    />
                    <CFormFeedback invalid>{{ quantityErrorMessage }}</CFormFeedback>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="selectedType">ประเภท</CFormLabel>
                    <CFormSelect v-model="selectedType" id="selectedType" required :class="{ 'is-invalid': isTypeInvalid }">
                      <option value="">กรุณาเลือกประเภท</option>
<<<<<<< HEAD
                      <option v-for="type in types" :key="type.ID" :value="type.ID">{{ type.name }}</option>
=======
                      <option v-for="type in types" :key="type.ID" :value="type.ID">
                        {{ type.name }}
                      </option>
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
                    </CFormSelect>
                    <CFormFeedback invalid>{{ typeErrorMessage }}</CFormFeedback>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="selectedUnit">หน่วย</CFormLabel>
                    <CFormSelect v-model="selectedUnit" id="selectedUnit" required :class="{ 'is-invalid': isUnitInvalid }">
                      <option value="">กรุณาเลือกหน่วย</option>
<<<<<<< HEAD
                      <option v-for="unit in units" :key="unit.ID" :value="unit.ID">{{ unit.Name }}</option>
=======
                      <option v-for="unit in units" :key="unit.ID" :value="unit.ID">
                        {{ unit.Name }}
                      </option>
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
                    </CFormSelect>
                    <CFormFeedback invalid>{{ unitErrorMessage }}</CFormFeedback>
                  </CCol>
                </CRow>
              </CCol>
              <CButton type="submit" color="primary">บันทึก</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

<<<<<<< HEAD
    <!-- Toast notifications -->
=======
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "RegisStockComponent",
  setup() {
    const autoID = ref("");
    const stockname = ref("");
    const quantity = ref(0);
    const selectedType = ref("");
    const selectedUnit = ref("");
<<<<<<< HEAD
    const toasts = ref([]);
    const units = ref([]);
    const types = ref([]);
    const validatedTooltip = ref(false);

    // Validation Computed Properties
    const isStockInvalid = computed(() => validatedTooltip.value && !stockname.value);
    const isQuantityInvalid = computed(() => validatedTooltip.value && (isNaN(quantity.value) || quantity.value <= 0));
    const isTypeInvalid = computed(() => validatedTooltip.value && !selectedType.value);
    const isUnitInvalid = computed(() => validatedTooltip.value && !selectedUnit.value);
=======
    const validatedTooltip01 = ref(false);
    const toasts = ref([]);
    const units = ref([]);
    const types = ref([]);

    // Validation Computed Properties
    const isStockInvalid = computed(() => validatedTooltip01.value );
    const isQuantityInvalid = computed(() => validatedTooltip01.value && (isNaN(quantity.value) || quantity.value <= 0));
    const isTypeInvalid = computed(() => validatedTooltip01.value && !selectedType.value);
    const isUnitInvalid = computed(() => validatedTooltip01.value && !selectedUnit.value);
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b

    // Error Messages
    const nameErrorMessage = computed(() => (isStockInvalid.value ? "กรุณากรอกชื่อวัสดุ" : ""));
    const quantityErrorMessage = computed(() => (isQuantityInvalid.value ? "กรุณากรอกจำนวนให้ถูกต้อง" : ""));
    const typeErrorMessage = computed(() => (isTypeInvalid.value ? "กรุณาเลือกประเภท" : ""));
    const unitErrorMessage = computed(() => (isUnitInvalid.value ? "กรุณาเลือกหน่วย" : ""));

    // Handle Form Submission
<<<<<<< HEAD
    const handleSubmitTooltip = (event) => {
      validatedTooltip.value = true;
=======
    const handleSubmitTooltip01 = (event) => {
      validatedTooltip01.value = true;
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
      if (isStockInvalid.value || isQuantityInvalid.value || isTypeInvalid.value || isUnitInvalid.value) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleSubmit();
      }
    };

<<<<<<< HEAD
    // API Submit Function
    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");
=======
    const handleSubmit = async () => {
      try {
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        const response = await axios.post("/api/auth/registerStock", {
          name: stockname.value,
          quantity: quantity.value,
          stock_type_stock_ID: selectedType.value,
          stock_unit_id: selectedUnit.value,
<<<<<<< HEAD
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        createToast("Success", response.data.message);
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        createToast("Error", error.response?.data?.error || "เกิดข้อผิดพลาดในการลงทะเบียนวัสดุ");
=======
        });

        createToast("Success", response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        const errorMessage = error.response?.data?.error || "เกิดข้อผิดพลาดในการลงทะเบียนวัสดุ"; // Default error message
        createToast("Error", errorMessage);
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
        console.error("Error:", error);
      }
    };

    // Toast Notifications
    const createToast = (title, content) => {
      toasts.value.push({ title, content });
      setTimeout(() => toasts.value.shift(), 5000);
    };

<<<<<<< HEAD
    // Fetch Data Functions
=======
    // Fetch Data
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
    const fetchAutoID = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getAutotidStock", {
          headers: { Authorization: `Bearer ${token}` },
        });
        autoID.value = response.data;
      } catch (error) {
<<<<<<< HEAD
        createToast("Error", error.response?.data?.error || "เกิดข้อผิดพลาดในการดึงข้อมูล ID");
=======
        const errorMessage = error.response?.data?.error || "เกิดข้อผิดพลาดในการดึงข้อมูล ID";
        createToast("Error", errorMessage);
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
      }
    };

    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getUnit", {
          headers: { Authorization: `Bearer ${token}` },
        });
        units.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหน่วย:", error);
      }
    };

    const fetchStockTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getTypeStock", {
          headers: { Authorization: `Bearer ${token}` },
        });
        types.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลประเภทสต็อก:", error);
      }
    };

    onMounted(() => {
      fetchAutoID();
      fetchUnits();
      fetchStockTypes();
    });

    return {
      autoID,
      stockname,
      quantity,
      selectedType,
      selectedUnit,
<<<<<<< HEAD
      handleSubmitTooltip,
=======
      validatedTooltip01,
      handleSubmitTooltip01,
>>>>>>> 45ad983de95c8c2c2e4c37186f33d20b42af427b
      isStockInvalid,
      nameErrorMessage,
      isQuantityInvalid,
      quantityErrorMessage,
      isTypeInvalid,
      typeErrorMessage,
      isUnitInvalid,
      unitErrorMessage,
      toasts,
      types,
      units,
    };
  },
};
</script>
