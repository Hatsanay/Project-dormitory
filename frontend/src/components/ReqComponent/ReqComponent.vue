<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>แจ้งซ่อมบำรุง</CCardHeader>
          <CCardBody>
            <CForm class="row g-3">
              <CCol md="12">
                <CRow class="mb-3">
                  <CFormLabel for="roomNumber" class="col-sm-2 col-form-label">หมายเลขห้อง</CFormLabel>
                  <div class="col-sm-10">
                    <CFormInput v-model="roomNumber" type="text" id="roomNumber" readonly plain-text />
                  </div>
                  <CFormLabel for="fullName" class="col-sm-2 col-form-label">ชื่อ-สกุล</CFormLabel>
                  <div class="col-sm-10">
                    <CFormInput v-model="fullName" type="text" id="fullName" readonly plain-text />
                  </div>
                </CRow>
              </CCol>
              <CCol md="12">
                <CFormLabel for="titleRepair">หัวข้อ</CFormLabel>
                <CFormInput v-model="titleRepair" type="text" id="titleRepair" />
              </CCol>
              <CCol md="12">
                <CFormLabel for="reqDetail">รายละเอียด</CFormLabel>
                <CFormTextarea id="reqDetail" rows="3" v-model="reqDetail" placeholder="กรุณากรอกปัญหาเบื้องต้น">
                </CFormTextarea>
              </CCol>
              <CCol md="12">
                <CFormLabel for="formFileMultiple">กรุณาเลือกรูปภาพเบื้องต้น</CFormLabel>
                <CFormInput type="file" id="formFileMultiple" multiple />
              </CCol>
              <CButton type="submit" color="primary">บันทึก</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "ReqComponent",
  setup() {
    const userId =  ref(localStorage.getItem("localUserid"));
    const roomNumber = ref("");
    const fullName = ref("");
    const titleRepair = ref("");
    const reqDetail = ref("");



    // const fetchUserById = async (uid) => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get("/api/auth/getUserById", {
    //       params: { id: uid },
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     const userData = response.data;
    //     roomNumber.value = userData.user_Fname || "";
    //     fullName.value = userData.user_Lname || "";
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };


    onMounted(() => {
        console.log("User ID:", userId.value);
    });


    return {
      userId,
      roomNumber,
      fullName,
      titleRepair,
      reqDetail,
    };
  },
};
</script>

<style scoped></style>
