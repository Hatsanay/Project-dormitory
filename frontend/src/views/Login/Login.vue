<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="username"
                      placeholder="Username"
                      autocomplete="username"
                      required
                    />
                  </CInputGroup>

                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                    />
                  </CInputGroup>

                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        type="submit"
                        color="primary"
                        class="px-4"
                        :disabled="isLoading"
                      >
                        <span v-if="isLoading"> <CSpinner size="sm" /> Loading... </span>
                        <span v-else>Login</span>
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <!-- Uncomment if you need the forgot password feature -->
                      <!-- <CButton color="link" class="px-0"> Forgot password? </CButton> -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>

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
import axios from "axios";

export default {
  name: "LoginFormComponent",
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      toasts: [],
    };
  },
  methods: {
    createToast(st, er) {
      this.toasts.push({ title: st, content: er });
      // Remove toast after 5 seconds
      setTimeout(() => {
        this.toasts.shift();
      }, 5000);
    },
    login() {
      this.isLoading = true;
      axios
        .post("/api/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          const { token, permissions, id } = response.data;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          // localStorage.setItem("permissions", JSON.stringify(permissions));
          // localStorage.setItem("userID", JSON.stringify(id));
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Login error:", error);
          const errorStatus = error.response
            ? `เกิดข้อผิดพลาด Status ${error.response.status}`
            : "An error occurred";
          const errorMessage = error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An error occurred during login. Please try again.";
          this.createToast(errorStatus, errorMessage);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
