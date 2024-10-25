<template>
    <div>
      <WidgetsStatsD class="mb-4" />
      <CRow>
        <CCol :md="12">
          <CCard class="mb-4">
            <CCardBody>
              <CForm
                class="row g-3 needs-validation"
                novalidate
                @submit="handleSubmitTooltip01"
              >
                <CCol md="12">
                  <CRow class="mb-3">
                    <CCol md="2">
                      <CFormLabel for="resId">รหัส</CFormLabel>
                      <CFormInput v-model="autoID" type="text" id="resId" disabled />
                    </CCol>
                    <CCol md="5" class="position-relative">
                      <CFormLabel for="roomName">เลขห้อง</CFormLabel>
                      <CFormInput v-model="roomName" type="text" id="roomName" disabled />
                    </CCol>
                    <CCol md="5">
                      <CFormLabel for="resLname">สถานะ</CFormLabel>
                      <CFormInput v-model="resLname" type="text" id="resLname" disabled />
                    </CCol>
                  </CRow>
                </CCol>
                <!-- <CButton type="submit" color="primary" disabled>บันทึก</CButton> -->
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
  import Datepicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  import { ref, computed, onMounted, watch } from "vue";
  
  export default {
    name: "modelViewRoomComponents",
    components: {

    },
    props: {
      selectedRoom: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const autoID = ref(props.selectedRoom?.rrom_ID || "");
      const roomName = ref(props.selectedRoom?.room_Name || "");
      const resStatus = ref(props.selectedRoom?.roomStaus_ID || "");
  
      watch(
        () => props.selectedRoom,
        (newRoom) => {
          console.log("New selectedRoom:", newRoom);
          autoID.value = newRoom?.room_ID || "";
          roomName.value = newRoom?.room_Name || "";
          resStatus.value = newRoom?.roomStaus_ID || "";
        },
        { immediate: true }
      );
  
      return {
        autoID,
        roomName,
        resStatus,
      };
    },
  };
  </script>