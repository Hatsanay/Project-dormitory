<template>
  <div>
    <WidgetsStatsD class="mb-4" />
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>จัดการบทบาท</CCardHeader>
          <CCardBody>
            <CForm class="row g-2 needs-validation" novalidate @submit="handleSubmitRole">
              <CCol md="12">
                <CRow class="mb-3">
                  <CCol md="2">
                    <CFormLabel for="roleID">รหัสบทบาท</CFormLabel>
                    <CFormInput v-model="autoID" type="text" id="roleID" disabled />
                  </CCol>
                  <CCol md="5">
                    <CFormLabel for="roleName">ชื่อบทบาท</CFormLabel>
                    <CFormInput
                      v-model="roleName"
                      type="text"
                      id="roleName"
                      required
                      :class="{ 'is-invalid': isRoleInvalid }"
                    />
                    <CFormFeedback invalid>
                      {{ roleErrorMessage }}
                    </CFormFeedback>
                  </CCol>
                </CRow>

                <!-- Checkbox Permissions -->
                <CRow class="mb-3">
                  <CCol md="2">
                    <CFormLabel for="permission_name">รหัสบทบาท</CFormLabel>
                    <CFormInput v-model="autoIDPEr" type="text" id="permission_name" disabled />
                  </CCol>
                  <CCol md="12">
                    <CFormLabel>กำหนดสิทธิ์:</CFormLabel>
                    <CRow>
                      <template v-for="(permission, index) in permissionsList" :key="index">
                        <CCol md="3">
                          <CFormCheck
                            :id="'permission' + index"
                            :value="index"
                            v-model="selectedPermissions"
                            @change="updatePermissions"
                            :disabled="index < 2"
                            :checked="index < 2" 
                          />
                          <CFormLabel :for="'permission' + index">{{ permission }}</CFormLabel>
                        </CCol>
                      </template>
                    </CRow>
                  </CCol>
                </CRow>

                <CFormInput v-if="visible" v-model="token" type="text" id="token" />
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "RoleComponent",
  setup() {
    const autoID = ref("");
    const autoIDPEr = ref("");
    const roleName = ref("");
    const validatedTooltip = ref(false);
    const toasts = ref([]);
    const selectedPermissions = ref([0, 1]); // Default the first two bits to checked
    const permissionsBinary = ref(""); // Binary string representation of permissions
    const permissionsList = [
      "Create User", "Edit User", "Delete User", "View User",
      "Create Role", "Edit Role", "Delete Role", "View Role",
      "Permission 9", "Permission 10", "Permission 11", "Permission 12",
      "Permission 13", "Permission 14", "Permission 15", "Permission 16",
      "Permission 17", "Permission 18", "Permission 19", "Permission 20",
      "Permission 21", "Permission 22", "Permission 23", "Permission 24",
      "Permission 25", "Permission 26", "Permission 27", "Permission 28",
      "Permission 29", "Permission 30", "Permission 31", "Permission 32",
      "Permission 33", "Permission 34", "Permission 35", "Permission 36"
    ];

    // Validate the role name input
    const isRoleInvalid = computed(() => {
      return validatedTooltip.value && (roleName.value.trim() === "" || !/^[\u0E00-\u0E7F\s]+$/.test(roleName.value));
    });

    const roleErrorMessage = computed(() => {
      if (roleName.value.trim() === "") {
        return "กรุณากรอกชื่อบทบาท";
      } 
      return "";
    });

    const handleSubmitRole = (event) => {
      validatedTooltip.value = true;

      if (isRoleInvalid.value) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        handleSubmit();
      }
    };

    const handleSubmit = async () => {
      try {
        const response = await axios.post("/api/auth/registerRole", {
          role_Name: roleName.value,
          permission_name: permissionsBinary.value, // Send the binary string of permissions
        });

        createToast("Success", response.data.message);

        // Delay 1 second before refreshing the page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        let errorMessage = "เกิดข้อผิดพลาดในการลงทะเบียนบทบาท";

        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        }

        createToast("Error", errorMessage);
        console.error("Error:", error);
      }
    };

    const createToast = (title, content) => {
      toasts.value.push({ title, content });

      setTimeout(() => {
        toasts.value.shift();
      }, 5000);
    };

    const updatePermissions = () => {
      // Create a binary representation of the permissions
      let binary = Array(permissionsList.length).fill(0);
      selectedPermissions.value.forEach(index => {
        binary[index] = 1; // Set the corresponding index to 1
      });
      permissionsBinary.value = binary.join(''); // Convert array to string
    };

    // Fetch Auto ID for role and permissions
    const fetchAutoID = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getAutoRoleID", {
          headers: { Authorization: `Bearer ${token}` },
        });
        autoID.value = response.data;
      } catch (error) {
        handleFetchError(error, "ดึงข้อมูล ID เกิดข้อผิดพลาด:");
      }
    };

    const fetchAutoIDPer = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/auth/getAutoPermissionID", {
          headers: { Authorization: `Bearer ${token}` },
        });
        autoIDPEr.value = response.data;
      } catch (error) {
        handleFetchError(error, "ดึงข้อมูล ID เกิดข้อผิดพลาด:");
      }
    };

    const handleFetchError = (error, defaultMessage) => {
      let errorMessage = defaultMessage;
      if (error.response?.data?.error) {
        errorMessage += error.response.data.error;
      }
      console.error("Error:", errorMessage);
      createToast("Error", errorMessage);
    };

    onMounted(() => {
      fetchAutoID();
      fetchAutoIDPer();
      updatePermissions(); // Initialize binary string on component mount
    });

    return {
      autoID,
      autoIDPEr,
      roleName,
      validatedTooltip,
      handleSubmitRole,
      isRoleInvalid,
      roleErrorMessage,
      toasts,
      permissionsList,
      selectedPermissions,
      permissionsBinary,
      updatePermissions,
    };
  }
};
</script>
