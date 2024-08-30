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
                <CRow class="mb-3">
                  <CCol md="2">
                  <CFormLabel for="resRoomID" class="">รหัสห้องพัก</CFormLabel>
                  <CFormInput  v-model="autoID" type="text" id="resRoomID" disabled />
                </CCol>
                <CCol md="5">
                    <CFormLabel for="resRoom_Name">เลขห้อง</CFormLabel>
                    <CFormInput
                      v-model="resRoom_Name"
                      type="text"
                      id="resRoom_Name"
                      required
                      :class="{ 'is-invalid': isRoomInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ RoomErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <!-- <CCol md="3">
                    <CFormLabel for="resTambons">สถานะห้องพัก</CFormLabel>
                      <CFormSelect v-model="resTambons" id="resStatus" required>
                        <option disabled value="">กรุณาเลือกสถานะห้องพัก</option>
                        <option
                        v-for="Tambon in Tambons"
                        :key="Tambon.id"
                        :value="Tambon.id"
                      >
                        {{ Tambon.name_th }}
                      </option>
                    </CFormSelect>
                  </CCol>-->
                </CRow>
                <CFormInput v-if="visable" v-model="token" type="text" id="token" />
              </CCol>
              <CButton type="submit" color="primary" class="">บันทึก</CButton>
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
    const autoID = ref("");
    const resRoomID = ref("");
    const validatedTooltip01 = ref(false);

    const isRoomNameInvalid = computed(() => {
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

const decodeJWTTH = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var payload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(payload);
};

const token = localStorage.getItem("token");

if (token) {
  const decodedPayload = decodeJWTTH(token);
  
  // console.log(decodedPayload);
  const user_ID = decodedPayload.user_ID;

  console.log("permissions:", user_ID);
} else {
  console.log("Token not found in localStorage");
}
</script>
