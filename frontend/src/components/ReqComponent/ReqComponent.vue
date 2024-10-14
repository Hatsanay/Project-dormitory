<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>แจ้งซ่อมบำรุง</CCardHeader>
          <CCardBody>
            <CForm class="row g-3" @submit.prevent="submitForm">
              <CCol md="12">
                <CRow class="mb-3">
                  <div class="col-sm-10">
                    <CFormInput
                      v-model="roomID"
                      type="hidden"
                      id="roomID"
                      readonly
                      plain-text
                    />
                  </div>
                  <div class="col-sm-10">
                    <CFormInput
                      v-model="rentingID"
                      type="hidden"
                      id="rentingID"
                      readonly
                      plain-text
                    />
                  </div>
                </CRow>
                <CRow class="mb-3">
                  <CFormLabel for="roomNumber" class="col-sm-2 col-form-label"
                    >หมายเลขห้อง</CFormLabel
                  >
                  <div class="col-sm-10">
                    <CFormInput
                      v-model="roomNumber"
                      type="text"
                      id="roomNumber"
                      readonly
                      plain-text
                    />
                  </div>
                  <CFormLabel for="fullName" class="col-sm-2 col-form-label"
                    >ชื่อ-สกุล</CFormLabel
                  >
                  <div class="col-sm-10">
                    <CFormInput
                      v-model="fullName"
                      type="text"
                      id="fullName"
                      readonly
                      plain-text
                    />
                  </div>
                </CRow>
              </CCol>
              <CCol md="12">
                <CFormLabel for="reqPetitiontype">ประเภทการแจ้งซ่อม</CFormLabel>
                <CFormSelect v-model="reqPetitiontype" id="reqPetitiontype" required>
                  <option value="">กรุณาเลือกประเภทการแจ้งซ่อม</option>
                  <option
                    v-for="petitiontyp in petitiontype"
                    :key="petitiontyp.ID"
                    :value="petitiontyp.ID"
                  >
                    {{ petitiontyp.Type }}
                  </option>
                </CFormSelect>
              </CCol>
              <CCol md="12">
                <CFormLabel for="titleRepair">หัวข้อ</CFormLabel>
                <CFormInput v-model="titleRepair" type="text" id="titleRepair" required />
              </CCol>
              <CCol md="12">
                <CFormLabel for="reqDetail">รายละเอียด</CFormLabel>
                <CFormTextarea
                  id="reqDetail"
                  rows="3"
                  v-model="reqDetail"
                  placeholder="กรุณากรอกปัญหาเบื้องต้น"
                  required
                />
              </CCol>
              <CCol md="12">
                <CFormLabel for="reqImg">กรุณาเลือกรูปภาพเบื้องต้น</CFormLabel>
                <CFormInput
                  type="file"
                  id="reqImg"
                  accept=".jpg,.jpeg,.png,.gif"
                  multiple
                  @change="handleFileUpload"
                />
                <div
                  v-if="imagePreviews.length"
                  class="mt-3"
                  style="display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap"
                >
                  <div
                    v-for="(preview, index) in imagePreviews"
                    :key="index"
                    class="mb-2"
                  >
                    <img
                      :src="preview"
                      alt="Preview"
                      class="img-fluid"
                      style="max-width: 200px; max-height: 200px"
                    />
                  </div>
                </div>
              </CCol>
              <CButton type="submit" color="primary">บันทึก</CButton>
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
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ReqComponent",
  setup() {
    const userId = ref(localStorage.getItem("userID"));
    const rentingID = ref("");
    const roomNumber = ref("");
    const roomID = ref("");
    const fullName = ref("");
    const reqPetitiontype = ref("");
    const titleRepair = ref("");
    const reqDetail = ref("");
    const selectedFiles = ref([]);
    const imagePreviews = ref([]);
    const petitiontype = ref([]);
    const toasts = ref([]);

    const getUserByIdfromReq = async (uid) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getUserByIdfromReq", {
          params: { id: uid },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        rentingID.value = userData.renting_ID || "";
        roomID.value = userData.room_ID || "";
        roomNumber.value = userData.room_Number || "";
        fullName.value = userData.fullname || "";
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPetitiontype = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getPetitiontype", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        petitiontype.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลประเภทการแจ้งซ่อม:", error);
      }
    };

    const handleFileUpload = (event) => {
      const files = event.target.files;
      selectedFiles.value = files;
      imagePreviews.value = [];
      Array.from(files).forEach((file) => {
        const previewUrl = URL.createObjectURL(file);
        imagePreviews.value.push(previewUrl);
      });
    };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append("rentingID", rentingID.value);
      formData.append("reqPetitiontype", reqPetitiontype.value);
      formData.append("titleRepair", titleRepair.value);
      formData.append("reqDetail", reqDetail.value);

      Array.from(selectedFiles.value).forEach((file) => {
        formData.append("images", file);
      });

      try {
        const token = localStorage.getItem("token");
        await axios.post("/api/auth/submitRepairRequest", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "คำขอซ่อมบำรุงของคุณถูกบันทึกเรียบร้อยแล้ว!",
          confirmButtonText: "ตกลง",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        rentingID.value = "";
        reqPetitiontype.value = "";
        titleRepair.value = "";
        reqDetail.value = "";
        selectedFiles.value = [];
        imagePreviews.value = [];
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง!",
          confirmButtonText: "ตกลง",
        });
      }
    };

    onMounted(() => {
      if (userId.value) {
        getUserByIdfromReq(userId.value);
        fetchPetitiontype();
      }
    });

    return {
      userId,
      rentingID,
      roomID,
      roomNumber,
      fullName,
      reqPetitiontype,
      petitiontype,
      titleRepair,
      reqDetail,
      toasts,
      submitForm,
      handleFileUpload,
      imagePreviews,
    };
  },
};
</script>
