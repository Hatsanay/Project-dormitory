<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>จัดการผู้พักอาศัย</CCardHeader>
          <CCardBody>
            <CForm
              class="row g-3 needs-validation"
              novalidate
              @submit="handleSubmitTooltip01"
            >
              <CCol md="12">
                <CRow class="mb-3">
                  <CCol md="2">
                    <CFormLabel for="resId">รหัสผู้ใช้งาน</CFormLabel>
                    <CFormInput v-model="autoID" type="text" id="resId" disabled />
                  </CCol>
                  <CCol md="5" class="position-relative">
                    <CFormLabel for="resFname">ชื่อ</CFormLabel>
                    <CFormInput
                      v-model="resFname"
                      type="text"
                      id="resFname"
                      required
                      :class="{ 'is-invalid': isFnameInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ fnameErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="resLname">นามสกุล</CFormLabel>
                    <CFormInput
                      v-model="resLname"
                      type="text"
                      id="resLname"
                      required
                      :class="{ 'is-invalid': isLnameInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ lnameErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="7">
                    <CFormLabel for="resEmail">อีเมล์</CFormLabel>
                    <CFormInput
                      v-model="resEmail"
                      type="email"
                      id="resEmail"
                      required
                      :class="{ 'is-invalid': isEmailInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ emailErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="resPhone">เบอร์โทร</CFormLabel>
                    <CFormInput
                      v-model="resPhone"
                      type="text"
                      id="resPhone"
                      required
                      :class="{ 'is-invalid': isPhoneInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ phoneErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="6">
                    <CFormLabel for="resName">Username</CFormLabel>
                    <CFormInput
                      v-model="resName"
                      type="text"
                      id="resName"
                      required
                      :class="{ 'is-invalid': isNameInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ nameErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="6">
                    <CFormLabel for="resPassword">Password</CFormLabel>
                    <CFormInput
                      v-model="resPassword"
                      type="password"
                      id="resPassword"
                      required
                      :class="{ 'is-invalid': isPasswordInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ passwordErrorMessage }}
                    </CFormFeedback>
                  </CCol>

                  <CCol md="2">
                    <CFormLabel for="resHnumber">เลขที่</CFormLabel>
                    <CFormInput
                      v-model="resHnumber"
                      type="text"
                      id="resHnumber"
                      :class="{ 'is-invalid': isHnumberInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ HnumberErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                  <CCol md="2">
                    <CFormLabel for="resGroup">หมู่</CFormLabel>
                    <CFormInput
                      v-model="resGroup"
                      type="text"
                      id="resGroup"
                      required
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel for="resAlley">ซอย</CFormLabel>
                    <CFormInput
                      v-model="resAlley"
                      type="text"
                      id="resAlley"
                      required
                    />
                  </CCol>
                  <CCol md="4">
                    <CFormLabel for="resRoad">ถนน</CFormLabel>
                    <CFormInput
                      v-model="resRoad"
                      type="text"
                      id="resRoad"
                      required
                    />
                  </CCol>

                  <CCol md="3">
                    <CFormLabel for="resDistrict">ตำบล/แขวง</CFormLabel>
                    <CFormSelect v-model="resDistrict" id="resDistrict" required>
                      <option>Choose...</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="resArea">อำเภอ/เขต</CFormLabel>
                    <CFormSelect v-model="resArea" id="resArea" required>
                      <option>Choose...</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="resProvince">จังหวัด</CFormLabel>
                    <CFormSelect v-model="resProvince" id="resProvince" required>
                      <option>Choose...</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="resPost">รหัสไปรษณีย์</CFormLabel>
                    <CFormSelect v-model="resPost" id="resPost" required>
                      <option>Choose...</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md="6">
                    <CFormLabel for="resBdate">เลือกวันที่</CFormLabel>
                    <Datepicker
                      v-model="selectedDate"
                      :type="'date'"
                      :format="'yyyy-MM-dd'"
                      id="resBdate"
                      required
                    />
                  </CCol>
                  <CCol md="3">
                    <CFormLabel for="resRoom">ห้องพัก</CFormLabel>
                    <CFormSelect v-model="resRoom" id="resRoom" required>
                      <option>Choose...</option>
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  name: "RegisResComponents",
  components: {
    Datepicker,
  },

  setup() {
    const selectedDate = ref(null);
    const autoID = ref("");
    const resFname = ref("");
    const resLname = ref("");
    const resEmail = ref("");
    const resPhone = ref("");
    const resName = ref("");
    const resPassword = ref("");
    const resHnumber = ref("");
    const resGroup = ref("");
    const resAlley = ref("");
    const resRoad = ref("");
    const resDistrict = ref("");
    const resArea = ref("");
    const resProvince = ref("");
    const resPost = ref("");
    const resRoom = ref("");
    const validatedTooltip01 = ref(false);

    //Fname
    const isFnameInvalid = computed(() => {
      return validatedTooltip01.value && (resFname.value.trim() === "" || resFname.value.length < 2 || resFname.value.length > 50);
    });
    const fnameErrorMessage = computed(() => {
      if (resFname.value.trim() === "") {
        return "กรุณากรอกชื่อ";
      } else if (resFname.value.length < 2 || resFname.value.length > 50) {
        return "ชื่อควรมีความยาวระหว่าง 2 ถึง 50 ตัวอักษร";
      }
      return "";
    });

    //Lname
    const isLnameInvalid = computed(() => {
      return validatedTooltip01.value && (resLname.value.trim() === "" || resLname.value.length < 2 || resLname.value.length > 50);
    });
    const lnameErrorMessage = computed(() => {
      if (resLname.value.trim() === "") {
        return "กรุณากรอกนามสกุล";
      } else if (resLname.value.length < 2 || resLname.value.length > 50) {
        return "นามสกุลควรมีความยาวระหว่าง 2 ถึง 50 ตัวอักษร";
      }
      return "";
    });

    //Email
    const isEmailInvalid = computed(() => {
      return validatedTooltip01.value && (resEmail.value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resEmail.value));
    });
    const emailErrorMessage = computed(() => {
      if (resEmail.value.trim() === "") {
        return "กรุณากรอกอีเมล์";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resEmail.value)) {
        return "กรุณากรอกอีเมล์ให้ถูกต้อง";
      }else if (resEmail.value.length < 2 || resEmail.value.length > 30) {
        return "อีเมล์ควรมีความยาวระหว่าง 2 ถึง 50 ตัวอักษร";
      }
      return "";
    });

    //Phone
    const isPhoneInvalid = computed(() => {
      return validatedTooltip01.value && (resPhone.value.trim() === "" || !/^\d{10}$/.test(resPhone.value));
    });

    const phoneErrorMessage = computed(() => {
      if (resPhone.value.trim() === "") {
        return "กรุณากรอกเบอร์โทร";
      } else if (!/^\d{10}$/.test(resPhone.value)) {
        return "กรุณากรอกเบอร์โทรให้ถูกต้อง (10 หลัก)";
      }
      return "";
    });

    //username
    const isNameInvalid = computed(() => {
      return validatedTooltip01.value && (resName.value.trim() === "" || resName.value.length < 3 || resName.value.length > 50);
    });
    const nameErrorMessage = computed(() => {
      if (resName.value.trim() === "") {
        return "กรุณากรอกชื่อผู้ใช้";
      } else if (resName.value.length < 3 || resName.value.length > 30) {
        return "ชื่อผู้ใช้ควรมีความยาวระหว่าง 3 ถึง 30 ตัวอักษร";
      }
      return "";
    });

    //Password
    const isPasswordInvalid = computed(() => {
      return validatedTooltip01.value && (resPassword.value.trim() === "" || resPassword.value.length < 6);
    });
    const passwordErrorMessage = computed(() => {
      if (resPassword.value.trim() === "") {
        return "กรุณากรอกรหัสผ่าน";
      } else if (resPassword.value.length < 6) {
        return "รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร";
      }
      return "";
    });

    const isHnumberInvalid = computed(() => {
      return validatedTooltip01.value && (resHnumber.value.trim() === "");
    });
    const HnumberErrorMessage = computed(() => {
      if (resHnumber.value.trim() === "") {
        return "กรุณากรอกเลขที่";
      }
      return "";
    });

    const handleSubmitTooltip01 = (event) => {
      validatedTooltip01.value = true;

      if (isFnameInvalid.value || isLnameInvalid.value || isEmailInvalid.value || isPhoneInvalid.value || isNameInvalid.value || isPasswordInvalid.value || isHnumberInvalid.value) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const fetchAutoID = async () => {
      try {
        const response = await axios.get("/api/auth/getAutotid");
        autoID.value = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการทำ Auto id:", error);
      }
    };

    onMounted(() => {
      fetchAutoID();
    });

    return {
      selectedDate,
      autoID,
      resFname,
      resLname,
      resEmail,
      resPhone,
      resName,
      resPassword,
      resHnumber,
      resGroup,
      resAlley,
      resRoad,
      resDistrict,
      resArea,
      resProvince,
      resPost,
      resRoom,

      
      validatedTooltip01,
      handleSubmitTooltip01,

      isFnameInvalid,
      fnameErrorMessage,

      isLnameInvalid,
      lnameErrorMessage,

      isEmailInvalid,
      emailErrorMessage,

      isPhoneInvalid,
      phoneErrorMessage,

      isNameInvalid,
      nameErrorMessage,

      isPasswordInvalid,
      passwordErrorMessage,

      isHnumberInvalid,
      HnumberErrorMessage,
    };
  },
};
</script>

