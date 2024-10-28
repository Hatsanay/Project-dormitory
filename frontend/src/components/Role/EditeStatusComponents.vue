<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>แก้ไขข้อมูลสถานะ</CCardHeader>
          <CCardBody>
            <CForm
              class="row g-3 needs-validation"
              novalidate
              @submit="handleSubmitTooltip01"
            >
              <CCol md="12">
                <CRow class="mb-3">
                  <CCol md="2">
                    <CFormLabel for="stat_ID">รหัส</CFormLabel>
                    <CFormInput v-model="stat_ID" type="text" id="stat_ID" disabled />
                  </CCol>
                  <CCol md="3" class="position-relative">
                    <CFormLabel for="stat_Name">ชื่อสถานะ</CFormLabel>
                    <CFormInput v-model="stat_Name" type="text" id="stat_Name"
                      required
                      :class="{ 'is-invalid': isstat_NameInvalid }"/>
                    <CFormFeedback invalid>
                      {{ roomErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="selectedType">ประเภทสถานะ</CFormLabel>
                    <CFormSelect v-model="selectedType" id="selectedType" required :class="{ 'is-invalid': isTypeInvalid }">
                      <option value="">กรุณาเลือกประเภทสถานะ</option>
                      <option v-for="type in types" :key="type.statTyp_ID" :value="type.statTyp_ID">{{ type.Name }}</option>
                    </CFormSelect>
                    <CFormFeedback invalid>{{ typeErrorMessage }}</CFormFeedback>
                  </CCol>
                </CRow>
              </CCol>
              <CButton type="submit" color="primary" :disabled="isstat_NameInvalid">บันทึก</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
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
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "EditRoomView",
  setup() {
    const route = useRoute();
    const stat_ID = ref(route.query.id || ""); // assuming ID comes from the query
    const stat_Name = ref("");
    const status = ref([]);
    const staRoom = ref("");
    const toasts = ref([]);
    
    const isstat_NameInvalid = computed(() => {
      return stat_Name.value.trim() === "" || !/^\d{3}$/.test(stat_Name.value);
    });

    const roomErrorMessage = computed(() => {
      if (stat_Name.value.trim() === "") {
        return "กรุณากรอกเลขห้อง";
      } else if (!/^\d{3}$/.test(stat_Name.value)) {
        return "กรุณากรอกเลขห้องให้ถูกต้อง (3 หลัก)";
      }
      return "";
    });

    const handleSubmitTooltip01 = async (event) => {
      event.preventDefault(); // Prevent default form submission
      if (isstat_NameInvalid.value) {
        return; // Stop if validation fails
      }else{

      try {
        const payload = {
          roomnumber: stat_Name.value,
        };
        await axios.put(`/api/auth/updateRoom?ID=${stat_ID.value}`, payload);
        toasts.value.push({
          title: "สำเร็จ",
          content: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
        });
        setTimeout(() => {
          this.$router.push("ViewRoomView");
        }, 1000);
      } catch (error) {
        toasts.value.push({
          title: "ข้อผิดพลาด",
          content: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        });
      }
    }
    };

    const fetchStatusByID = async (rid) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getStatusByID", {
          params: { ID: rid},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const statusData = response.data;
        stat_Name.value = statusData.room_Number || "";
        await fetchStatus();
        staRoom.value = statusData.room_stat_ID || "";
      } catch (error) {
        console.error("Error fetching room data:", error);
        toasts.value.push({
          title: "ข้อผิดพลาด",
          content: "ไม่สามารถดึงข้อมูลห้องได้",
        });
      }
    };

    const fetchStatusTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getStatusType", {
          headers: { Authorization: `Bearer ${token}` },
        });
        types.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลประเภทสถานะ:", error);
      }
    };


    onMounted(() => {
      fetchStatus();
      fetchStatusByID(stat_ID.value);
    });

    return {
      stat_ID,
      stat_Name,
      status,
      staRoom,
      toasts,
      handleSubmitTooltip01,
      isstat_NameInvalid,
      roomErrorMessage
    };
  },
};
</script>
