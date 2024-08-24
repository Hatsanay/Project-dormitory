<script setup>
 let token = localStorage.token;
</script>
<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>จัดการห้องพัก</CCardHeader>
          <CCardBody>
            <CForm class="row g-2 needs-validation"
              novalidate
              @submit="handleSubmitTooltip01"
              >
              <CCol md="12">
                <CRow class="mb-1">
                  <CFormLabel for="resRoomID" class="col-sm-2 col-form-label">Room ID</CFormLabel>
                  <CFormInput  
                    v-model="resRoomID"
                    type="text" 
                    id="resRoomID" 
                    style="width: 200px;" 
                    required
                      :class="{ 'is-invalid': isRoomIDInvalid }"
                      />
                    <CFormFeedback invalid>
                      {{ RoomIDErrorMessage }}
                </CFormFeedback>
                </CRow>
                <CFormInput v-if="visable" v-model="token" type="text" id="token" />
              </CCol>
              <CButton type="submit" color="primary" class="col-sm-2">บันทึก</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, computed} from "vue";
import axios from "axios";
export default {
  name: "RoomComponent",
  // computed: {
  //   userPermissions() {
  //     return JSON.parse(localStorage.getItem("permissions")) || [];
  //   },
  // },
  setup() {
    const resRoomID = ref("");
    const validatedTooltip01 = ref(false);

    const isRoomIDInvalid = computed(() => {
      return (
        validatedTooltip01.value &&
        (resRoomID.value.trim() === "" || !/^\d{3}$/.test(resRoomID.value))
      );
    });

    const RoomIDErrorMessage = computed(() => {
      if (resPhone.value.trim() === "") {
        return "กรุณากรอกเลขห้อง";
      } else if (!/^\d{3}$/.test(resRoomID.value)) {
        return "กรุณากรอกเลขห้องให้ถูกต้อง (3 หลัก)";
      }
      return "";
    });

    const handleSubmitTooltip01 = (event) => {
      validatedTooltip01.value = true;

      if (
        isRoomIDInvalid.value 
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    return {
      resRoomID,   //return id 
      handleSubmitTooltip01,
      isRoomIDInvalid,
      RoomIDErrorMessage,
    };
  }
};

</script>
