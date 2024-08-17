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
                      <CButton type="submit" color="primary" class="px-4">Login</CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginFormComponent',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios
        .post("/api/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          const { token, permissions } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("permissions", JSON.stringify(permissions)); // Store permissions as a JSON string
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("Login failed! Please check your credentials.");
        });
    },
  },
  //   login() {
  //     axios.post('/api/auth/login', {
  //       username: this.username,
  //       password: this.password
  //     })
  //     .then(response => {
  //       localStorage.setItem('token', response.data.token);
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  //       this.$router.push('/dashboard');
  //     })
  //     .catch(error => {
  //       console.error('Login error:', error);
  //       alert('Login failed! Please check your credentials.');
  //     });
  //   }
  // }
};
</script>
