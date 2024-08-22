<script setup>
 let token = localStorage.token;
</script>

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
                  <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                    >หมายเลขห้อง</CFormLabel
                  >
                  <div class="col-sm-10">
                    <CFormInput
                      type="text"
                      id="staticEmail"
                      value="001"
                      readonly
                      plain-text
                    />
                  </div>
                  <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                    >ชิ่อ-สกุล</CFormLabel
                  >
                  <div class="col-sm-10">
                    <CFormInput
                      type="text"
                      id="staticEmail"
                      value="หัสนัย หม้อยา"
                      readonly
                      plain-text
                    />
                  </div>
                </CRow>
              </CCol>
              <CCol md="12">
                <CFormLabel for="titleRepair">หัวข้อ</CFormLabel>
                <CFormInput v-model="titleRepair" type="text" id="titleRepair" />
              </CCol>
              <CCol md="12">
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="รายละเอียด"
                  rows="3"
                  text="กรุณากรอกปัญหาเบื้องต้น"
                ></CFormTextarea>
              </CCol>
              <CCol md="12">
                <CFormInput
                  type="file"
                  id="formFileMultiple"
                  label="กรุณาเลือกรูปภาพเบื้องต้น"
                  multiple
                />
                <CFormInput v-if="visable" v-model="token" type="text" id="token" />
              </CCol>
              <CButton type="submit" color="primary" >บันทึก</CButton>
            </CForm>
            <CForm> </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "ReqComponent",
  // computed: {
  //   userPermissions() {
  //     return JSON.parse(localStorage.getItem("permissions")) || [];
  //   },
  // },
};
</script>
