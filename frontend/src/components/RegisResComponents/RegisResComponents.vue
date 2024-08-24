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
