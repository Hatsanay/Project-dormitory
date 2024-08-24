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
<<<<<<< HEAD
                  <CCol md="2">
                    <CFormLabel for="">รหัสผู้ใช้งาน</CFormLabel>
                    <CFormInput type="text" id="" disabled />
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="">ชื่อ</CFormLabel>
                    <CFormInput type="text" id="inputPassword4" />
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="">นามสกุล</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="7">
                    <CFormLabel for="">อีเมล์</CFormLabel>
                    <CFormInput type="email" id="" />
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="">เบอร์โทร</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel for="">Username</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="6">
                    <CFormLabel for="">Password</CFormLabel>
                    <CFormInput type="password" id="" />
                  </CCol>

                  <CCol md="2">
                    <CFormLabel for="">เลขที่</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="2">
                    <CFormLabel for="">หมู่</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel for="">ซอย</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel for="">ถนน</CFormLabel>
                    <CFormInput type="text" id="" />
                  </CCol>


                  <CCol md="3">
                      <CFormLabel for="">ตำบล</CFormLabel>
                      <CFormSelect id="">
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md="3">
                      <CFormLabel for="">อำเภอ</CFormLabel>
                      <CFormSelect id="">
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md="3">
                      <CFormLabel for="">จังหวัด</CFormLabel>
                      <CFormSelect id="">
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md="3">
                      <CFormLabel for="">รหัสไปรษณีย์</CFormLabel>
                      <CFormSelect id="">
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                  <CCol md="6">
                    <CFormLabel for="">เลือกวันที่</CFormLabel>
                    <Datepicker v-model="selectedDate" :type="'date'" :format="'yyyy-MM-dd'"/>
                  </CCol>
                  <!-- <CCol md="3">
                      <CFormLabel for="">สิทธิ์การเข้าถึง</CFormLabel>
                      <CFormSelect id="" disabled>
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol> -->
                    <CCol md="3">
                      <CFormLabel for="">ห้องพัก</CFormLabel >
                      <CFormSelect id="">
                        <option>Choose...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                </CRow>
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
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';

export default {
  name: "RegisResComponents",
  components: {
    Datepicker
  },
  setup() {
    const selectedDate = ref(null);
    return {
      selectedDate
    };
  }
}
</script>
